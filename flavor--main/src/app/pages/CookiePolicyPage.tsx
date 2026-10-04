import { useState, useEffect, useRef } from "react";

const FC = "var(--primary)", EB = "var(--accent)";

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

const TOC = [
  { id: "what-are",    label: "What Are Cookies" },
  { id: "why-we-use",  label: "Why We Use Cookies" },
  { id: "categories",  label: "Cookie Categories" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "managing",    label: "Managing Cookies" },
  { id: "updates",     label: "Policy Updates" },
  { id: "contact",     label: "Contact Us" },
];

const COOKIE_TYPES = [
  { id: "essential",   icon: "◉", label: "Essential Cookies",    badge: "Always Active", badgeColor: EB,  accentColor: EB, canDisable: false, retention: "Session or up to 1 year",
    desc: "Strictly necessary for the website to function. They enable page navigation, security, and form submission. The website cannot operate properly without them.",
    examples: ["Session management — maintaining your browsing session","Security tokens — protecting forms from cross-site request forgery","Cookie notice acknowledgement storage"] },
  { id: "analytics",   icon: "◈", label: "Analytics Cookies",    badge: "Optional",      badgeColor: FC,  accentColor: FC, canDisable: true,  retention: "Up to 13 months",
    desc: "Help us understand how visitors interact with our website in aggregate. No personally identifiable profiles are created.",
    examples: ["Page view counts — which coffee origin profiles attract the most interest","Session duration — how long visitors explore our collection","Traffic sources — whether visitors arrive via search or referrals"] },
  { id: "performance", icon: "◇", label: "Performance Cookies",  badge: "Optional",      badgeColor: FC,  accentColor: "#5B8FBF", canDisable: true, retention: "Up to 30 days",
    desc: "Help us monitor and improve the technical operation of our website, including load times and image delivery.",
    examples: ["CDN routing for optimized image loading (e.g., Unsplash photography)","Error logging — identifying JavaScript errors or broken features","Load time monitoring — detecting slow-loading pages"] },
  { id: "preference",  icon: "◫", label: "Preference Cookies",   badge: "Optional",      badgeColor: FC,  accentColor: EB, canDisable: true,  retention: "Up to 12 months",
    desc: "Allow the website to remember choices you have made during your visit for a more consistent experience on return visits.",
    examples: ["Interactive tool state — such as last-selected roast level","Newsletter subscription acknowledgement"] },
];

function CookieCard({ type }: { type: typeof COOKIE_TYPES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid var(--border-color)", borderLeft: `3px solid ${type.accentColor}`, background: "var(--bg-surface)", marginBottom: 12, overflow: "hidden" }}>
      <button onClick={() => setOpen(x => !x)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18, color: type.accentColor }}>{type.icon}</span>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 500, color: "var(--text-main)", marginBottom: 2 }}>{type.label}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FDFBF7", background: type.badgeColor, padding: "2px 7px", borderRadius: 1 }}>{type.badge}</span>
              <span style={{ fontSize: 11, color: "var(--text-mute)", fontFamily: "'JetBrains Mono',monospace" }}>Retention: {type.retention}</span>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 16, color: "var(--text-mute)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>↓</span>
      </button>
      <div style={{ maxHeight: open ? 500 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ padding: "0 22px 22px" }}>
          <p style={{ fontSize: 14, lineHeight: 1.82, color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>{type.desc}</p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: EB, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Examples</p>
          <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 12 }}>
            {type.examples.map((ex, i) => (
              <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.7, color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 6 }}>
                <span style={{ color: type.accentColor, flexShrink: 0, fontSize: 7, marginTop: 5 }}>◆</span><span>{ex}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 12, color: type.canDisable ? FC : "var(--text-mute)" }}>{type.canDisable ? "Can be disabled via browser settings" : "Required — cannot be disabled without breaking website functionality"}</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} style={{ paddingTop: 8, marginBottom: 28 }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.26em", textTransform: "uppercase", color: FC, marginBottom: 10 }}>{eyebrow}</p>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, lineHeight: 1.2, color: "var(--text-main)" }}>{title}</h2>
      <div style={{ width: 40, height: 1, background: `linear-gradient(to right,${EB},transparent)`, marginTop: 16 }} />
    </div>
  );
}
function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, lineHeight: 1.88, color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 20 }}>{children}</p>;
}
function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ marginBottom: 20, paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.8, color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 10 }}>
          <span style={{ color: EB, marginTop: 4, flexShrink: 0, fontSize: 8 }}>◆</span><span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function Divider() { return <div style={{ height: 1, background: "var(--border-color)", margin: "48px 0" }} />; }

export default function CookiePolicyPage({ setPage }: { setPage: (p: string) => void }) {
  const scrollY = useScrollY();
  const [heroReady, setHeroReady] = useState(false);
  const [active, setActive] = useState("what-are");
  const body = useFadeIn();

  useEffect(() => { setTimeout(() => setHeroReady(true), 300); }, []);
  useEffect(() => {
    const h = () => {
      for (const item of [...TOC].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 160) { setActive(item.id); break; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ background: "var(--bg-main)", fontFamily: "'Plus Jakarta Sans',sans-serif", overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "52vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#0F0C0A" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1549179228-4bc1e862c171?w=1920&h=800&fit=crop&auto=format&q=85"
            alt="Ethiopian highland coffee landscape" style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateY(${scrollY * 0.12}px)`, filter: "brightness(0.26) saturate(0.9)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(28,43,34,0.82) 0%,rgba(15,12,10,0.55) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,12,10,0.96) 0%,transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 5rem", width: "100%", opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.3s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: `1px solid ${EB}44`, background: "rgba(184,134,11,0.09)", borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: EB, display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: EB }}>Legal &amp; Compliance</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, color: "#FDFBF7", marginBottom: 20, maxWidth: 700 }}>Cookie<br /><em style={{ color: `${EB}ee` }}>Policy.</em></h1>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(253,251,247,0.62)", maxWidth: 540, marginBottom: 28 }}>A transparent explanation of how and why Flavor Coffee PLC uses cookies on this website, and how you can control them.</p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)" }}>Last Updated: July 1, 2026 · Effective: July 1, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: "var(--bg-main)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "260px 1fr", gap: 60, alignItems: "start" }}>
          <aside style={{ position: "sticky", top: 100 }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-mute)", marginBottom: 20 }}>On This Page</p>
            <nav>
              {TOC.map(item => (
                <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", marginBottom: 4, fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif", color: active === item.id ? FC : "var(--text-sub)", background: active === item.id ? `${FC}12` : "transparent", border: "none", cursor: "pointer", borderLeft: `2px solid ${active === item.id ? FC : "transparent"}`, transition: "all 0.2s ease" }}>
                  {item.label}
                </button>
              ))}
            </nav>
            {/* Status panel */}
            <div style={{ marginTop: 28, padding: "16px 18px", background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: "var(--text-mute)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Cookie Status</p>
              {[{ label: "Essential", active: true },{ label: "Analytics", active: true },{ label: "Performance", active: true },{ label: "Preference", active: false }].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--text-sub)" }}>{s.label}</span>
                  <span style={{ fontSize: 8, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.1em", color: s.active ? EB : "var(--text-mute)", background: s.active ? `${EB}14` : "var(--border-color)", padding: "2px 7px" }}>{s.active ? "Active" : "Inactive"}</span>
                </div>
              ))}
            </div>
          </aside>

          <article ref={body.ref} style={{ maxWidth: 720, opacity: body.vis ? 1 : 0, transform: body.vis ? "none" : "translateY(20px)", transition: "all 0.8s ease" }}>
            <SectionHeading id="what-are" eyebrow="01 — Cookies Explained" title="What Are Cookies?" />
            <Para>Cookies are small text files that a website places on your device when you visit it. They are used to make websites work efficiently, remember your preferences, and provide information to website owners about how their site is being used. Cookies can be session cookies (deleted when you close your browser) or persistent cookies (stored for a set period).</Para>
            <Divider />

            <SectionHeading id="why-we-use" eyebrow="02 — Purpose" title="Why We Use Cookies" />
            <Bullets items={["To ensure core website functionality works reliably for all visitors","To understand in aggregate how visitors navigate our website and which content is most valuable","To measure and improve the performance and loading speed of our pages","To remember preferences so returning visitors have a consistent experience","To maintain the security and integrity of our contact forms and inquiry submissions"]} />
            <Para>We do not use cookies for behavioral advertising, cross-site visitor tracking, or building personal profiles for third-party marketing purposes.</Para>
            <Divider />

            <SectionHeading id="categories" eyebrow="03 — Categories" title="Cookie Categories" />
            <Para>We use four categories of cookies. Click any category to see full details, including examples, data retention periods, and whether it can be disabled.</Para>
            {COOKIE_TYPES.map(type => <CookieCard key={type.id} type={type} />)}
            <Divider />

            <SectionHeading id="third-party" eyebrow="04 — Third Parties" title="Third-Party Services &amp; Cookies" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { service: "Google Fonts",   purpose: "Typography delivery",    note: "May set a temporary cookie as part of font request handling",          optional: false },
                { service: "Unsplash CDN",   purpose: "Photography delivery",   note: "Standard CDN request headers; may set performance cookies",            optional: false },
                { service: "Analytics Tool", purpose: "Aggregated statistics",  note: "Anonymized session identifier; no cross-site tracking",               optional: true  },
                { service: "Hosting Provider",purpose: "Infrastructure & security", note: "Load balancing and security session tokens",                      optional: false },
              ].map(item => (
                <div key={item.service} style={{ padding: "16px 18px", background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderTop: `2px solid ${item.optional ? FC : EB}` }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 500, color: "var(--text-main)", marginBottom: 3 }}>{item.service}</p>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: item.optional ? FC : EB, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{item.purpose}</p>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: "var(--text-sub)" }}>{item.note}</p>
                </div>
              ))}
            </div>
            <Para>We do not permit third-party advertising networks, social media platforms, or data brokers to set cookies through our Website.</Para>
            <Divider />

            <SectionHeading id="managing" eyebrow="05 — Your Control" title="Managing &amp; Disabling Cookies" />
            <Para>Most web browsers allow you to view, manage, delete, and block cookies through their settings:</Para>
            <Bullets items={["Google Chrome — Settings → Privacy and Security → Cookies and other site data","Mozilla Firefox — Settings → Privacy & Security → Cookies and Site Data","Apple Safari — Preferences → Privacy → Manage Website Data","Microsoft Edge — Settings → Cookies and site permissions → Cookies and site data"]} />
            <Para>If you choose to block all cookies, please be aware that some parts of our Website — including contact forms and interactive features — may not function as intended.</Para>
            <Divider />

            <SectionHeading id="updates" eyebrow="06 — Updates" title="Changes to This Cookie Policy" />
            <Para>We may update this Cookie Policy from time to time to reflect changes in the technologies we use or applicable regulations. We will update the "Last Updated" date at the top of this page when changes are made. Continued use of this Website after any update constitutes acceptance of the revised policy.</Para>
            <Divider />

            <SectionHeading id="contact" eyebrow="07 — Contact" title="Questions About Cookies" />
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", padding: "28px 32px", borderRadius: 2, marginBottom: 28 }}>
              {[["Phone","+251922559021"],["Email","privacy@flavorcoffee.et"],["Address","Bole Flamingo, in front of Dembel City Center, TG Building, 1st Floor, Addis Ababa, Ethiopia"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 20, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: EB, minWidth: 70, letterSpacing: "0.14em", textTransform: "uppercase", paddingTop: 2 }}>{k}</span>
                  <span style={{ fontSize: 14, color: "var(--text-main)", lineHeight: 1.6 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              {[{ label: "Privacy Policy", page: "privacy" },{ label: "Terms of Trade", page: "terms" }].map(link => (
                <button key={link.page} onClick={() => { setPage(link.page); window.scrollTo({ top: 0 }); }}
                  style={{ padding: "11px 24px", background: "transparent", border: "1px solid var(--border-color)", color: "var(--text-sub)", cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {link.label} →
                </button>
              ))}
            </div>
            <button onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}
              style={{ padding: "14px 32px", background: FC, color: "#FDFBF7", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Contact Our Team
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
