# ☕ Flavor Coffee Roasters — International Specialty Coffee Exporter

A digital platform and backend API built for **Flavor Coffee PLC** — one of Addis Ababa’s premier specialty coffee exporters and roasting partners. Serving **105+ cafés, specialty roasters, importers, and hospitality groups** across Tokyo, Hamburg, Amsterdam, New York, and worldwide.

---

## 📜 The Story of Flavor Coffee

Rooted in the high-altitude forests of Ethiopia — the birthplace of all Arabica coffee — **Flavor Coffee** bridges traditional Ethiopian coffee culture with modern specialty roasting and international export standards.

From wild landrace forest varieties in **Kaffa Reserve** to high-altitude washed micro-lots in **Yirgacheffe, Guji, Sidama, and Harrar**, Flavor Coffee delivers 100% traceable Grade 1 and Specialty Grade (85+ SCA Score) green and roasted coffee beans.

### Why 105+ Cafés Choose Flavor Coffee Every Day
- **Merit & Quality:** Every micro-lot is cupped and scored by certified Q-graders.
- **Precision Roasting Atelier:** State-of-the-art commercial roasters monitoring development time ratios (DTR) and rates of rise (RoR).
- **Export Integrity:** Full ECX certification, ICO certificates of origin, phytosanitary clearance, and GrainPro-lined export packaging shipped via FOB Djibouti.

---

## 🌐 Platform Architecture & Experience

### 1. Interactive Home Page
- **Hero Atelier Experience:** Immersive visual presentation showcasing high-altitude coffee cultivation.
- **"Why Flavor Coffee" Feature:** Animated statistical metrics, interactive partnership highlights, and fluid dual-card photo collage.
- **Interactive Roast Spectrum:** SVG-animated coffee bean showcasing Light, Medium, Medium-Dark, and Dark roast profiles with real-time sensory readouts.
- **Origins Carousel:** Smooth interactive slider covering major Ethiopian terroir regions.

### 2. Origins & Regional Terroir Atlas
- **Highland Region Explorer:** Deep dive into Yirgacheffe (Floral/Citrus), Guji (Jasmine/Peach), Sidama (Berries/Cane Sugar), and Harrar (Blueberry/Dark Chocolate).
- **Terroir Matrix:** Comparative breakdown of altitudes (1,800m–2,200m+), soil composition, rainfall, and harvest calendars.

### 3. Roasting Science & Quality Protocols
- **Thermal Science:** Real-time tracking of roast development curves, Agtron color spectrums, and post-roast degas cycles.
- **3-Stage Cupping Protocol:** Blind cupping evaluation adhering strictly to SCA standards (86+ export stamp).

### 4. Part 01 – Part 10 Curated Gallery
- High-resolution editorial documentation of harvesting, spring-water washing channels, raised African drying beds, warehouse grading, cupping labs, and traditional coffee ceremonies.

### 5. Export Portfolio & Direct Inquiries
- **Export Categories:** Grade 1 Arabica, Specialty Lots, Green Beans (Unroasted), Wholesale Bulk (FCL/LCL), Private Label (OEM), and Heirloom Forest Varieties.
- **Wholesale Contact Form:** Connected to a hardened Node.js backend API supporting custom inquiries and sample kit requests.

---

## 🛠️ Technology Stack

### Front-End (Client)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6.3.5 (configured with `sourcemap: false` and production `console` stripping)
- **Styling:** Tailwind CSS v4 + Custom Theme CSS (`src/styles/theme.css`)
- **Icons:** Lucide React
- **Design System:** Responsive fluid typography (`clamp()`), custom animations, zero horizontal overflow.

### Back-End (Hardened API)
- **Runtime:** Node.js 22 LTS with Express
- **Network Security:** Localhost binding (`127.0.0.1:3001` — never exposed directly to the public internet)
- **Input Validation:** Server-side schema validation via **Zod**
- **Sanitization:** HTML/XSS payload sanitization via `sanitize-html`
- **Anti-Bot Defenses:** Dual-layer defense via hidden Honeypot fields (`website_url_hp`) and Cloudflare Turnstile token server verification
- **Rate Limiting:** Dual-layer rate limiting (Nginx `limit_req` + Express `express-rate-limit`: 3 requests / 10 minutes per IP)
- **Email Delivery:** Transactional email dispatch via **Resend API**

### Production Reverse Proxy & VPS Hardening
- **Reverse Proxy:** Nginx with HTTP to HTTPS 301 redirects, SSL/TLS 1.3, `server_tokens off`, and static asset caching
- **HTTP Security Headers:** Complete CSP (Content-Security-Policy), HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`
- **Process Manager:** PM2 with automatic restart (`ecosystem.config.cjs`) and `pm2-logrotate`
- **VPS Hardening:** UFW firewall, Fail2Ban SSH jail, `unattended-upgrades`, and automated 30-day backups (`deploy/backup.sh`)

---

## 🚀 Local Development Setup

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Start Development Server
```bash
# Start Vite development server (http://localhost:5173)
npm run dev
```

### 3. Build for Production
```bash
# Compile production static bundle to dist/
npm run build
```

---

## ☁️ EthioTelecom Cloud VPS Deployment

Deploying on an EthioTelecom Cloud VPS is streamlined with included automation scripts in `deploy/`:

1. **VPS Hardening:** Run `sudo bash deploy/setup-vps.sh` (installs Nginx, UFW firewall, Fail2Ban, Node.js 22 LTS, and PM2).
2. **SSH Security:** Run `sudo bash deploy/harden-ssh.sh` (enforces SSH key authentication and disables root password login).
3. **Nginx Setup:** Copy `deploy/nginx.conf` to `/etc/nginx/sites-available/flavorcoffee.conf` and issue SSL certs via Certbot.
4. **Backend API Launch:** Create `/var/www/flavorcoffee/server/.env` with your Resend & Turnstile secrets, then start PM2:
   ```bash
   pm2 start ecosystem.config.cjs --env production
   pm2 save
   ```
5. **Backups & Key Rotation:** Automated backups run via `deploy/backup.sh`. Refer to `deploy/rotate-keys.md` for secret rotation procedures.

---

## 📄 License & Ownership

© Flavor Coffee PLC. All rights reserved. Addis Ababa, Ethiopia.