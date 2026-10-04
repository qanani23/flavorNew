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
  { id: "acceptance",  label: "Acceptance of Terms" },
  { id: "website-use", label: "Website Use" },
  { id: "ip",          label: "Intellectual Property" },
  { id: "coffee-info", label: "Coffee Product Information" },
  { id: "inquiries",   label: "Business Inquiries" },
  { id: "export-info", label: "Export Information" },
  { id: "accuracy",    label: "Accuracy of Information" },
  { id: "ext-links",   label: "External Links" },
  { id: "liability",   label: "Limitation of Liability" },
  { id: "changes",     label: "Changes to Terms" },
  { id: "governing",   label: "Governing Principles" },
  { id: "contact",     label: "Contact Us" },
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
          <span style={{ color: EB, marginTop: 4, flexShrink: 0, fontSize: 8 }}>◆</span><span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function Note({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderLeft: `3px solid ${EB}`, padding: "20px 24px", marginBottom: 28, fontSize: 14, lineHeight: 1.8, color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontStyle: "italic" }}>{children}</div>;
}
function Divider() { return <div style={{ height: 1, background: "var(--border-color)", margin: "48px 0" }} />; }

export default function TermsOfServicePage({ setPage }: { setPage: (p: string) => void }) {
  const scrollY = useScrollY();
  const [heroReady, setHeroReady] = useState(false);
  const [active, setActive] = useState("acceptance");
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
          <img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1920&h=800&fit=crop&auto=format&q=85"
            alt="Coffee roastery" style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateY(${scrollY * 0.12}px)`, filter: "brightness(0.26)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(91,58,41,0.72) 0%,rgba(15,12,10,0.6) 60%,transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,12,10,0.96) 0%,transparent 55%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 5rem", width: "100%", opacity: heroReady ? 1 : 0, transform: heroReady ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.3s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: `1px solid ${EB}44`, background: "rgba(184,134,11,0.09)", borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: EB, display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: EB }}>Legal &amp; Compliance</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, color: "#FDFBF7", marginBottom: 20, maxWidth: 700 }}>Terms of<br /><em style={{ color: `${EB}ee` }}>Trade.</em></h1>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(253,251,247,0.62)", maxWidth: 540, marginBottom: 28 }}>General terms and principles governing website usage, coffee product information, and international export communications.</p>
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
          </aside>

          <article ref={body.ref} style={{ maxWidth: 720, opacity: body.vis ? 1 : 0, transform: body.vis ? "none" : "translateY(20px)", transition: "all 0.8s ease" }}>
            <SectionHeading id="acceptance" eyebrow="01 — Acceptance" title="Acceptance of Terms" />
            <Para>By accessing and browsing the Flavor Coffee PLC website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Trade and our Privacy Policy.</Para>
            <Para>If you are exploring our website on behalf of a company or commercial roastery, you represent that you have authority to bind that organization to these terms.</Para>
            <Divider />

            <SectionHeading id="website-use" eyebrow="02 — Usage" title="Website Purpose &amp; Use" />
            <Para>Our website is designed for brand discovery, coffee origin education, specialty lot information, and B2B inquiry submission. Permitted uses include:</Para>
            <Bullets items={["Reviewing coffee lot profiles, origin maps, and processing methods","Submitting sample kit requests and export inquiry forms","Reading market intelligence publications and company news","Downloading product specification sheets for commercial evaluation"]} />
            <Divider />

            <SectionHeading id="ip" eyebrow="03 — IP Rights" title="Intellectual Property" />
            <Para>All content on this website—including photography, trade names, logo marks, origin descriptions, and layout designs—is the property of Flavor Coffee PLC or licensed to us, and is protected by applicable copyright and trademark laws.</Para>
            <Note>Commercial partners and green coffee buyers may download specification sheets for internal procurement review. Reproduction of website content for public re-distribution requires prior written authorization.</Note>
            <Divider />

            <SectionHeading id="coffee-info" eyebrow="04 — Coffee Quality" title="Coffee Product Profiles &amp; Samples" />
            <Para>Cupping scores, flavor descriptors, and elevation ranges on this website represent sensory evaluations conducted by licensed Q Arabica Graders under standardized SCA protocols. Natural crop variation may occur between harvest seasons and lot batches.</Para>
            <Bullets items={["Pre-shipment samples are representative of the specific lot evaluated","Contractual specifications are established in formal export agreements","Quality claims are governed by ICO and GCA standard arbitration rules"]} />
            <Divider />

            <SectionHeading id="inquiries" eyebrow="05 — B2B Communication" title="Business Inquiries &amp; Offers" />
            <Para>Information on this website does not constitute a legally binding export offer. Commercial prices, container availability, and shipping timelines are confirmed through formal pro-forma invoices and export contracts.</Para>
            <Divider />

            <SectionHeading id="export-info" eyebrow="06 — Export Terms" title="Export Logistics &amp; Compliance" />
            <Para>Flavor Coffee PLC conducts international exports under ICO regulations and Ethiopian Coffee &amp; Tea Authority guidelines. Standard shipment terms (FOB Djibouti, CFR, or CIF) are agreed individually per contract.</Para>
            <Divider />

            <SectionHeading id="accuracy" eyebrow="07 — Information" title="Accuracy of Information" />
            <Para>We make every effort to maintain accurate product descriptions, harvest schedules, and certification data. However, market conditions and harvest timelines may change without prior notice.</Para>
            <Divider />

            <SectionHeading id="ext-links" eyebrow="08 — External Links" title="Third-Party Resources" />
            <Para>This website may contain links to external industry resources or certification bodies (such as the SCA or Rainforest Alliance). Flavor Coffee PLC is not responsible for the content or privacy practices of external websites.</Para>
            <Divider />

            <SectionHeading id="liability" eyebrow="09 — Liability" title="Limitation of Liability" />
            <Para>Flavor Coffee PLC shall not be liable for any direct or indirect damages resulting from your use of, or inability to use, this website or reliance on its informational content.</Para>
            <Divider />

            <SectionHeading id="changes" eyebrow="10 — Updates" title="Changes to Terms" />
            <Para>We reserve the right to modify these terms at any time. Updated terms become effective immediately upon posting to this website.</Para>
            <Divider />

            <SectionHeading id="governing" eyebrow="11 — Law" title="Governing Principles" />
            <Para>These website terms are governed by the laws of the Federal Democratic Republic of Ethiopia. International export contracts are governed by standard Incoterms and international coffee trade arbitration rules as specified in individual purchase agreements.</Para>
            <Divider />

            <SectionHeading id="contact" eyebrow="12 — Contact" title="Contact Information" />
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", padding: "28px 32px", borderRadius: 2, marginBottom: 32 }}>
              {[["Phone","+251922559021"],["Email","export@flavorcoffee.et"],["Address","Bole Flamingo, TG Building, 1st Floor, Addis Ababa, Ethiopia"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", gap: 20, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: EB, minWidth: 70, letterSpacing: "0.14em", textTransform: "uppercase", paddingTop: 2 }}>{k}</span>
                  <span style={{ fontSize: 14, color: "var(--text-main)", lineHeight: 1.6 }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}
              style={{ padding: "14px 32px", background: FC, color: "#FDFBF7", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Contact Export Team
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
