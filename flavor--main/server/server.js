import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "production";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://flavorcoffee.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TO_EMAIL = process.env.TO_EMAIL || "flavorcoffee.team@gmail.com";

// ── 1. SECURITY & NETWORK BINDING ─────────────────────────────────────────────
// Disallow X-Powered-By header disclosure
app.disable("x-powered-by");

// Restrict JSON payload size to 20KB to prevent memory exhaustion / DoS
app.use(express.json({ limit: "20kb" }));

// Restrict CORS to authorized frontend origin only
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like internal health checks or curl from localhost)
      if (!origin) return callback(null, true);
      const allowedOrigins = [CLIENT_ORIGIN, "http://localhost:5173", "http://localhost:3000"];
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV === "development") {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation: Origin not allowed"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

// ── 2. RATE LIMITING ──────────────────────────────────────────────────────────
// Layer 2 Express Rate Limiter — 3 contact form submissions per 10 mins per IP
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "Too Many Requests",
    message: "Rate limit exceeded. Please wait 10 minutes before sending another inquiry.",
  },
});

// ── 3. ZOD SCHEMA VALIDATION ─────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").max(150, "Email is too long"),
  company: z.string().max(150).optional().default(""),
  country: z.string().min(2, "Country is required").max(100),
  phone: z.string().max(50).optional().default(""),
  coffeeType: z.string().min(2, "Coffee selection is required").max(100),
  greenBeanRegion: z.string().max(100).optional().default(""),
  volume: z.string().max(100).optional().default(""),
  message: z.string().max(2000, "Message is too long").optional().default(""),
  website_url_hp: z.string().optional().default(""),
  turnstileToken: z.string().optional().default(""),
});

// ── 4. HEALTH CHECK ENDPOINT ──────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Flavor Coffee API",
    timestamp: new Date().toISOString(),
  });
});

// Reject non-POST requests to /api/contact with 405 Method Not Allowed
app.all("/api/contact", (req, res, next) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      status: 405,
      error: "Method Not Allowed",
      message: `HTTP ${req.method} method is not allowed on /api/contact`,
    });
  }
  next();
});

// ── 5. CONTACT FORM API ENDPOINT ──────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    // A. Parse & Validate JSON payload via Zod
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      const issue = result.error.issues[0];
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: issue ? `${issue.path.join(".")}: ${issue.message}` : "Invalid form payload",
      });
    }

    const {
      name,
      email,
      company,
      country,
      phone,
      coffeeType,
      greenBeanRegion,
      volume,
      message,
      website_url_hp,
      turnstileToken,
    } = result.data;

    // B. Anti-Bot Honeypot Trap
    if (website_url_hp && website_url_hp.trim().length > 0) {
      // Silently discard bot submission with 200 OK so bots think it succeeded
      return res.status(200).json({ status: "ok", success: true });
    }

    // C. Server-Side Cloudflare Turnstile Verification (if configured)
    if (TURNSTILE_SECRET_KEY && turnstileToken) {
      try {
        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: req.ip || "",
          }),
        });
        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          return res.status(403).json({
            status: 403,
            error: "Forbidden",
            message: "Bot protection verification failed. Please try again.",
          });
        }
      } catch (err) {
        console.error("Turnstile verification error:", err);
      }
    }

    // D. Sanitize inputs to prevent HTML/XSS injection
    const cleanName = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} });
    const cleanEmail = sanitizeHtml(email, { allowedTags: [], allowedAttributes: {} });
    const cleanCompany = sanitizeHtml(company, { allowedTags: [], allowedAttributes: {} });
    const cleanCountry = sanitizeHtml(country, { allowedTags: [], allowedAttributes: {} });
    const cleanPhone = sanitizeHtml(phone, { allowedTags: [], allowedAttributes: {} });
    const cleanCoffeeType = sanitizeHtml(coffeeType, { allowedTags: [], allowedAttributes: {} });
    const cleanRegion = sanitizeHtml(greenBeanRegion, { allowedTags: [], allowedAttributes: {} });
    const cleanVolume = sanitizeHtml(volume, { allowedTags: [], allowedAttributes: {} });
    const cleanMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });

    // E. Construct Transactional Email Payload
    const emailSubject = `☕ New Coffee Inquiry — ${cleanName}${cleanRegion ? ` | ${cleanRegion}` : ` | ${cleanCoffeeType}`}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #0F0C0A; max-width: 600px; padding: 20px; border: 1px solid #C85227;">
        <h2 style="color: #C85227; margin-bottom: 5px;">Flavor Coffee PLC — Export Inquiry</h2>
        <p style="font-size: 12px; color: #B8860B; text-transform: uppercase; letter-spacing: 2px;">Addis Ababa, Ethiopia</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
        <p><strong>Company:</strong> ${cleanCompany || "—"}</p>
        <p><strong>Country:</strong> ${cleanCountry}</p>
        <p><strong>Phone / WhatsApp:</strong> ${cleanPhone || "—"}</p>

        <h3>Order Specifications</h3>
        <p><strong>Coffee Type:</strong> ${cleanCoffeeType}</p>
        ${cleanRegion ? `<p><strong>Preferred Region:</strong> ${cleanRegion}</p>` : ""}
        <p><strong>Estimated Volume:</strong> ${cleanVolume || "—"}</p>

        <h3>Message / Details</h3>
        <blockquote style="background: #F4EFE6; padding: 15px; border-left: 3px solid #C85227;">
          ${cleanMessage.replace(/\n/g, "<br/>") || "—"}
        </blockquote>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 10px; color: #888;">Sent securely via Flavor Coffee Production API Server.</p>
      </div>
    `;

    // F. Send Email via Resend API (or log in dev mode)
    if (RESEND_API_KEY) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Flavor Coffee API <export@flavorcoffee.com>",
          to: [TO_EMAIL],
          reply_to: cleanEmail,
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (!emailRes.ok) {
        const errData = await emailRes.json();
        console.error("Resend API error:", errData);
        throw new Error("Failed to send email via Resend API");
      }
    } else {
      console.log("----------------------------------------------------");
      console.log("[DEV MODE] EMAIL WOULD BE SENT TO:", TO_EMAIL);
      console.log("SUBJECT:", emailSubject);
      console.log("----------------------------------------------------");
    }

    return res.status(200).json({
      status: "ok",
      success: true,
      message: "Your inquiry has been received and logged successfully.",
    });
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An error occurred while processing your request. Please try again later.",
    });
  }
});

// ── 6. PRODUCTION ERROR HANDLING (NO STACK TRACES) ───────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled Application Error:", err.message);
  res.status(500).json({
    status: 500,
    error: "Internal Server Error",
    message: NODE_ENV === "production" ? "A server error occurred." : err.message,
  });
});

// ── 7. BIND TO LOCALHOST ONLY (127.0.0.1) ────────────────────────────────────
// Crucial: Bind to 127.0.0.1 so the Node process is NOT exposed directly to public internet
app.listen(PORT, "127.0.0.1", () => {
  console.log(`🔒 Flavor Coffee Hardened API listening internally on 127.0.0.1:${PORT}`);
});
