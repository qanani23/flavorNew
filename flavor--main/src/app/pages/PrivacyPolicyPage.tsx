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
  { id: "introduction",   label: "Introduction" },
  { id: "company",        label: "Company Information" },
  { id: "data-collected", label: "Information We Collect" },
  { id: "how-we-use",     label: "How We Use Your Information" },
  { id: "data-security",  label: "Data Security" },
  { id: "third-party",    label: "Third-Party Services" },
  { id: "international",  label: "International Visitors" },
  { id: "your-rights",    label: "Your Rights" },
  { id: "policy-updates", label: "Policy Updates" },
  { id: "contact",        label: "Contact Us" },
];

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
          <span style={{ color: EB, marginTop: 4, flexShrink: 0, fontSize: 8 }}>◆</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function Divider() { return <div style={{ height: 1, background: "var(--border-color)", margin: "48px 0" }} />; }

export default function PrivacyPolicyPage({ setPage }: { setPage: (p: string) => void }) {
  const scrollY = useScrollY();
  const [heroReady, setHeroReady] = useState(false);
  const [active, setActive] = useState("introduction");
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
          <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=800&fit=crop&auto=format&q=85"
            alt="Ethiopian coffee" style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateY(${scrollY * 0.12}px)`, filter: "brightness(0.26) saturate(0.9)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(15,12,10,0.88) 0%,rgba(28,43,34,0.55) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,12,10,0.95) 0%,transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 5rem", width: "100%", opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.3s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: `1px solid ${EB}44`, background: "rgba(184,134,11,0.09)", borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: EB, display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: EB }}>Legal &amp; Compliance</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, color: "#FDFBF7", marginBottom: 20, maxWidth: 700 }}>Privacy<br /><em style={{ color: `${EB}ee` }}>Policy.</em></h1>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(253,251,247,0.62)", maxWidth: 540, marginBottom: 28 }}>How Flavor Coffee PLC collects, uses, and protects the personal information of visitors and business partners.</p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(253,251,247,0.4)" }}>Last Updated: July 1, 2026 · Effective: July 1, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: "var(--bg-main)", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "260px 1fr", gap: 60, alignItems: "start" }}>
          {/* TOC */}
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
          </aside>
          {/* Article */}
          <article ref={body.ref} style={{ maxWidth: 720, opacity: body.vis ? 1 : 0, transform: body.vis ? "none" : "translateY(20px)", transition: "all 0.8s ease" }}>
            <SectionHeading id="introduction" eyebrow="01 — Introduction" title="Our Commitment to Your Privacy" />
            <Para>Flavor Coffee PLC respects and is committed to protecting the privacy of everyone who visits our website. This Privacy Policy explains what information we collect, how we use it, and your rights with respect to your personal data.</Para>
            <Para>Our website primarily serves as a platform for brand discovery, coffee origin education, partnership inquiries, and business communication. We do not operate an e-commerce store or process payment information through this website.</Para>
            <Divider />

            <SectionHeading id="company" eyebrow="02 — Company Information" title="About Flavor Coffee PLC" />
            <Para>The data controller responsible for your personal information is:</Para>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", padding: "24px 28px", marginBottom: 28, borderLeft: `3px solid ${EB}` }}>
              {[["Company","Flavor Coffee PLC"],["Address","Bole Flamingo, in front of Dembel City Center, TG Building, 1st Floor, Addis Ababa, Ethiopia"],["Phone","+251922559021"],["Email","privacy@flavorcoffee.et"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 20, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "var(--text-mute)", minWidth: 80 }}>{k}</span>
                  <span style={{ fontSize: 14, color: "var(--text-main)" }}>{v}</span>
                </div>
              ))}
            </div>
            <Divider />

            <SectionHeading id="data-collected" eyebrow="03 — Data Collected" title="Information We Collect" />
            <Para>We collect information only when you actively provide it or when your browser transmits it as part of normal web browsing:</Para>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: EB, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Contact &amp; Inquiry Forms</p>
            <Bullets items={["Full name and company or organization name","Business email address and telephone number","Country of business operation","Estimated annual coffee purchase volume","Message content describing your requirements"]} />
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: EB, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, marginTop: 8 }}>Automatic Website Usage Data</p>
            <Bullets items={["IP address (anonymized where technically possible)","Browser type, version, and operating system","Pages visited and time spent on each page","General geographic region (country level)"]} />
            <Para>We do not collect sensitive personal data such as health information, financial account details, or government identification numbers.</Para>
            <Divider />

            <SectionHeading id="how-we-use" eyebrow="04 — Data Usage" title="How We Use Your Information" />
            <Bullets items={["Responding to business inquiries and partnership proposals","Sending market intelligence newsletters to subscribers who have opted in","Improving the content and usability of our website based on aggregated analytics","Maintaining website security and preventing fraudulent activity","Complying with applicable Ethiopian and international legal obligations"]} />
            <Divider />

            <SectionHeading id="data-security" eyebrow="05 — Data Security" title="How We Protect Your Information" />
            <Para>Flavor Coffee PLC implements appropriate technical and organizational measures to protect information against unauthorized access, accidental loss, alteration, or disclosure.</Para>
            <Bullets items={["All data transmitted between your browser and our website is encrypted using HTTPS/TLS","Access to personal data is restricted to authorized personnel only","Business inquiry data is retained only as long as necessary to fulfill the inquiry","Newsletter subscriber data is removed within 30 days of unsubscription"]} />
            <Divider />

            <SectionHeading id="third-party" eyebrow="06 — Third Parties" title="Third-Party Services" />
            <Bullets items={["Unsplash — Photography served from Unsplash's CDN; standard browser request headers may be transmitted","Google Fonts — Web fonts loaded from Google's servers; Google may log the request including your IP address","Website Hosting Provider — Server logs may be retained for a limited period for security purposes"]} />
            <Para>We do not sell, rent, or trade your personal information to any third party. We do not use advertising networks or remarketing services.</Para>
            <Divider />

            <SectionHeading id="international" eyebrow="07 — International Visitors" title="International Visitors &amp; Data Transfers" />
            <Para>Flavor Coffee PLC is headquartered in Addis Ababa, Ethiopia. By submitting information through our website, you consent to your data being processed in Ethiopia and potentially on servers in other countries. Where required by applicable law, we implement appropriate safeguards for cross-border data transfers.</Para>
            <Para>If you are a resident of the European Economic Area (EEA), you have additional rights under the GDPR, including the right to lodge a complaint with your national supervisory authority.</Para>
            <Divider />

            <SectionHeading id="your-rights" eyebrow="08 — Your Rights" title="Your Privacy Rights" />
            <Bullets items={["Right of Access — Request a copy of the personal data we hold about you","Right to Rectification — Ask us to correct inaccurate or incomplete information","Right to Erasure — Request deletion of your personal data, subject to legal retention obligations","Right to Object — Object to processing based on our legitimate interests","Right to Withdraw Consent — Withdraw consent (e.g., newsletter subscription) at any time"]} />
            <Para>To exercise any of these rights, contact us at <strong>privacy@flavorcoffee.et</strong>. We will respond within 30 days.</Para>
            <Divider />

            <SectionHeading id="policy-updates" eyebrow="09 — Updates" title="Changes to This Policy" />
            <Para>We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this page. Continued use of our website after any changes constitutes your acceptance of the updated policy.</Para>
            <Divider />

            <SectionHeading id="contact" eyebrow="10 — Contact" title="Get in Touch" />
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", padding: "28px 32px", borderRadius: 2, marginBottom: 32 }}>
              {[["Phone","+251922559021"],["Email","privacy@flavorcoffee.et"],["Address","Bole Flamingo, in front of Dembel City Center, TG Building, 1st Floor, Addis Ababa, Ethiopia"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 20, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: EB, minWidth: 70, letterSpacing: "0.14em", textTransform: "uppercase", paddingTop: 2 }}>{k}</span>
                  <span style={{ fontSize: 14, color: "var(--text-main)", lineHeight: 1.6 }}>{v}</span>
                </div>
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
