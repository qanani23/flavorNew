import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight, MapPin, Phone, Mail, Globe, Star, Quote, Instagram, Linkedin, Youtube, ChevronRight, ChevronLeft, Plus, Minus, Search, Play, Award, CheckCircle2 } from "lucide-react";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import { CoffeeAssistant } from "./components/chatbot";
import { VoiceAssistant } from "./components/voice";
import warehouseImg from "../imports/warehouse.jpg";
import cuppingFirstImg from "../imports/cupping-first.jpg";
import cuppingSecondImg from "../imports/cupping-second.jpg";
import flavorPackedImg from "../imports/flavor-coffee-packed.jpg";
import greenBeansImg from "../imports/green-beans.jpg";
import roastedMacroImg from "../imports/roasted-macro.jpg";
import lightRoastImg from "../imports/light-roast.jpg";
import mediumRoastImg from "../imports/medium-roast.jpg";
import mediumDarkRoastImg from "../imports/mediumdark-roast.jpg";
import darkRoastImg from "../imports/dark-roast.jpg";
import drumRoasterImg from "../imports/drum-roaster.jpg";
import coffeeCupperImg from "../imports/coffee-cupper.jpg";
import coffeeCupperNewImg from "../imports/coffee-cuppernew.jpg";
import exportReadyPackedImg from "../imports/export-ready-packed.jpg";
import wildImg from "../imports/wild.jpg";
import harvest1Img from "../imports/harvest1.jpg";
import highland2Img from "../imports/highland2.jpg";
import dryingCoffee07Img from "../imports/drying-coffee07.jpg";
import washedProcessImg from "../imports/washed-process.jpg";
import exportReadyLoadImg from "../imports/export-ready-load.jpg";
import coffeeCeremonyWithIncenseImg from "../imports/coffeeceremonywith-incense.jpg";
import coffeeCeremonyEthiopiaImg from "../imports/CoffeeCeremony_in-ethiopia.jpg";
import coffeeCeremony3Img from "../imports/coffeeceremony3.jpg";
import dryingImg from "../imports/drying.jpg";
import yirgachefeAtDawnImg from "../imports/yirgachefe-at-dawn.jpg";
import contactusBuyersImg from "../imports/contactusourbuyers.jpg";
import q1Img from "../imports/q1.png";
import q2Img from "../imports/q2.png";
import q3Img from "../imports/q3.png";
import q4Img from "../imports/q4.png";
import q5Img from "../imports/q5.png";
import q6Img from "../imports/q6.png";
import q7Img from "../imports/q7.png";
import q8Img from "../imports/q8.png";
import galleryPageBackgroundImg from "../imports/gallerypagebackground.jpg";
import og1Img from "../imports/og1.jpg";
import og2Img from "../imports/og2.jpg";
import gujiRangePanoramicImg from "../imports/gujirangepanoramic.jpg";
import t1Img from "../imports/t1.jpg";
import t2Img from "../imports/t2.jpg";
import t3Img from "../imports/t3.jpg";
import newImg from "../imports/new.jpg";
import w1Img from "../imports/w1.jpg";
import w2Img from "../imports/w2.jpg";
import roastedImg from "../imports/roasted.jpg";
import lastImg from "../imports/last.jpg";

import { ThemeProvider, useTheme, ThemeToggle } from "./theme";

type Page = "home" | "about" | "origins" | "roasting" | "gallery" | "contact" | "privacy" | "terms" | "cookies";

// ── Image helper ─────────────────────────────────────────────────────────────
function u(id: string, w = 1400, h = 900) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const COFFEES = [
  {
    name: "Yirgacheffe Grade 1",
    region: "Sidama Zone · SNNPR",
    flavor: "Jasmine · Bergamot · Peach",
    altitude: "1,750 – 2,200 m",
    process: "Washed",
    score: "91–93",
    img: "1447933601403-0c6688de566e",
  },
  {
    name: "Guji Natural",
    region: "Guji Zone · Oromia",
    flavor: "Blueberry · Dark Chocolate · Wine",
    altitude: "1,800 – 2,400 m",
    process: "Natural",
    score: "90–92",
    img: "1513530176992-0cf39c4cbed4",
  },
  {
    name: "Sidama Honey",
    region: "Sidama Region · SNNPR",
    flavor: "Honey · Apricot · Caramel",
    altitude: "1,500 – 2,000 m",
    process: "Honey",
    score: "89–91",
    img: "1561986810-4f3ba2f46ceb",
  },
];

const STATS = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 48, suffix: "", label: "Countries Served" },
  { value: 12, suffix: "K MT", label: "Annual Export Volume" },
  { value: 5200, suffix: "+", label: "Partner Farmers" },
];

const TESTIMONIALS = [
  {
    quote:
      "Flavor Coffee PLC has been our most reliable Ethiopian supplier for six consecutive years. The consistency of their Grade 1 lots and impeccable logistics sets them apart from every other exporter we work with.",
    name: "Marcus Weber",
    title: "Head of Green Procurement",
    company: "Rösterei Braun GmbH",
    country: "Germany",
  },
  {
    quote:
      "The traceability and transparency they offer is simply unmatched in the market. Our specialty roasters demand provenance documentation—Habesha delivers full lot traceability from GPS-tagged farm to container seal.",
    name: "Yuki Tanaka",
    title: "Director of Sourcing",
    company: "Tanaka Coffee Co.",
    country: "Japan",
  },
  {
    quote:
      "From Yirgacheffe to Guji, every lot exceeds our cupping committee's expectations. Finding a true partner in specialty coffee is rare—Habesha is exactly that.",
    name: "Sophie Laurent",
    title: "Head Green Buyer",
    company: "Café de l'Altitude",
    country: "France",
  },
];

const NEWS = [
  {
    date: "June 2026",
    category: "Certification",
    title: "Flavor Coffee PLC Achieves Rainforest Alliance Gold Status",
    excerpt:
      "Our commitment to sustainable farming practices earns top-tier environmental certification across all 47 partner farms in the highland regions.",
    img: "1549179228-4bc1e862c171",
  },
  {
    date: "May 2026",
    category: "Export",
    title: "Record Q2 Shipment to European Markets Breaks Annual Volume Target",
    excerpt:
      "Demand from specialty roasters across the EU drives a 34% year-on-year increase in premium Grade 1 exports to 22 European countries.",
    img: "1511537190424-bbbab87ac5eb",
  },
  {
    date: "April 2026",
    category: "Sustainability",
    title: "New Processing Facility Opens in Yirgacheffe Region",
    excerpt:
      "A state-of-the-art wet mill now serves over 2,400 smallholder farmers, improving yield quality, consistency, and full lot traceability.",
    img: "1722962883780-8806c3ab546b",
  },
];

const REGIONS = [
  { name: "Yirgacheffe", altitude: "1,750–2,200m", profile: "Floral & Bright", notes: "Jasmine, bergamot, lemon, peach", process: ["Washed", "Natural"], dot: { x: 38, y: 62 } },
  { name: "Sidama", altitude: "1,500–2,200m", profile: "Balanced & Fruity", notes: "Berry, stone fruit, chocolate, caramel", process: ["Washed", "Honey"], dot: { x: 40, y: 58 } },
  { name: "Guji", altitude: "1,800–2,400m", profile: "Bold & Complex", notes: "Blueberry, dark chocolate, wine, spice", process: ["Natural", "Washed"], dot: { x: 44, y: 60 } },
  { name: "Harrar", altitude: "1,400–2,100m", profile: "Wild & Exotic", notes: "Mocha, blueberry, wine, earthy", process: ["Natural"], dot: { x: 60, y: 42 } },
  { name: "Jimma", altitude: "1,400–1,800m", profile: "Spicy & Bold", notes: "Earthy, spice, dark chocolate, tobacco", process: ["Washed", "Natural"], dot: { x: 34, y: 50 } },
  { name: "Kaffa", altitude: "1,500–1,800m", profile: "Wild Forest", notes: "Forest fruit, herbs, spice, chocolate", process: ["Natural", "Washed"], dot: { x: 30, y: 52 } },
];

const VALUES = [
  { title: "Sustainability", desc: "Every farm partner adheres to regenerative agriculture practices protecting Ethiopia's highland ecosystems for future generations." },
  { title: "Traceability", desc: "GPS-tagged farms, lot-specific cupping scores, and blockchain documentation provide complete transparency from seed to container." },
  { title: "Partnership", desc: "Long-term relationships with over 5,200 smallholder farmers ensure fair pricing, capacity building, and shared prosperity." },
  { title: "Excellence", desc: "Grade 1 specialty lots only. Every shipment undergoes rigorous Q-grader evaluation by our team of seven licensed Q Arabica Graders." },
];

const TIMELINE = [
  { year: "1998", event: "Founded in Addis Ababa by Tadesse Bekele with a single washing station in the Yirgacheffe highlands." },
  { year: "2003", event: "First international export contract signed with a specialty roaster in Oslo. First shipment of 20MT to Europe." },
  { year: "2008", event: "Expanded to Sidama and Guji regions. ISO 9001 certification achieved. Team reaches 85 employees." },
  { year: "2013", event: "Opened state-of-the-art dry mill and roasting facility on the outskirts of Addis Ababa." },
  { year: "2018", event: "Reached milestone of 40 export countries. Rainforest Alliance certified across all partner farms." },
  { year: "2024", event: "Launched blockchain traceability platform, providing real-time lot tracking for international buyers worldwide." },
];

const TEAM = [
  { name: "Tadesse Bekele", role: "Founder & CEO", bio: "Third-generation coffee farmer turned global exporter. 30 years in Ethiopian specialty coffee.", img: "1597816760638-406d7271105c" },
  { name: "Dr. Almaz Girma", role: "Chief Quality Officer", bio: "Licensed Q Arabica Grader. PhD in Food Science. Led our ISO 22000 certification process.", img: "1670758611084-e216510c5433" },
  { name: "Samuel Tesfaye", role: "Head of Export Operations", bio: "15 years managing logistics across 48 countries. Specialist in EU and Japanese import compliance.", img: "1642613630414-1d9938f4fe02" },
];

const GALLERY_ITEMS = [
  { img: "1774284597431-49445d200674", label: "Yirgacheffe Highlands", cat: "Farm", desc: "Morning mist clings to the highland terraces of Yirgacheffe, where some of Ethiopia's finest Arabica is cultivated.", location: "Yirgacheffe, SNNPR" },
  { img: "1447933601403-0c6688de566e", label: "Grade 1 Green Beans", cat: "Processing", desc: "Hand-sorted green beans destined for specialty export, showing the uniform size and colour of a Grade 1 lot.", location: "Addis Ababa Dry Mill" },
  { img: "1722962883780-8806c3ab546b", label: "Harvest Season", cat: "Farm", desc: "Peak cherry season brings entire communities together for the selective hand-pick across the highland slopes.", location: "Sidama Zone, SNNPR" },
  { img: "1511537190424-bbbab87ac5eb", label: "Roasting Facility", cat: "Roasting", desc: "Our state-of-the-art Probat drum roasters achieve the precise thermal profiles required for each lot's character.", location: "Addis Ababa, Ethiopia" },
  { img: "1549179228-4bc1e862c171", label: "Guji Landscape", cat: "Farm", desc: "The sweeping highlands of Guji Zone reach elevations above 2,400m, producing coffees of extraordinary complexity.", location: "Guji Zone, Oromia" },
  { img: "1670758611084-e216510c5433", label: "Coffee Cherries", cat: "Processing", desc: "Ripe red cherries at the moment of picking — only fully mature fruit passes our selective harvest protocol.", location: "Yirgacheffe, SNNPR" },
  { img: "1513530176992-0cf39c4cbed4", label: "Sorting & Grading", cat: "Processing", desc: "Optical and hand sorting removes defects and ensures uniform density across every export container.", location: "Addis Ababa Dry Mill" },
  { img: "1780739203655-6e7481eb271e", label: "Cupping Session", cat: "Quality", desc: "Our seven licensed Q Arabica Graders evaluate each lot on a 100-point SCA scale before export approval.", location: "Flavor Coffee Lab, Addis Ababa" },
  { img: "1766163846502-bf26a2d40852", label: "Specialty Brew", cat: "Quality", desc: "A precision pour-over showcases the floral clarity and bright acidity that define a great Yirgacheffe washed lot.", location: "Tasting Room, Addis Ababa" },
  { img: "1782655654031-fb14a03576c5", label: "Sidama Morning", cat: "Farm", desc: "Early light over the Sidama terraces, where honey-process lots are carefully turned on raised African drying beds.", location: "Sidama Region, SNNPR" },
  { img: "1561986810-4f3ba2f46ceb", label: "Export Preparation", cat: "Export", desc: "GrainPro-lined jute bags are sealed and containerised at the Addis Ababa dry port ahead of Djibouti shipment.", location: "Addis Ababa Dry Port" },
  { img: "1597816760638-406d7271105c", label: "Farm Partnership", cat: "Farm", desc: "Tadesse Bekele visits partner farmers in the Yirgacheffe highlands — relationships built over more than 25 years.", location: "Yirgacheffe, SNNPR" },
];

const FAQS = [
  { q: "What is your minimum order quantity for export?", a: "Our standard minimum export order is 1 full container (approximately 17–18MT of green coffee in GrainPro-lined jute bags). We can accommodate smaller orders of 5–10MT for select buyers with whom we have an established relationship." },
  { q: "Do you provide cupping samples before purchase?", a: "Yes. We provide complimentary pre-shipment samples of up to 300g per lot, shipped via DHL Express worldwide. Samples include full cupping reports, processing notes, and farm-level traceability documentation." },
  { q: "What certifications does your coffee carry?", a: "We hold Rainforest Alliance Gold, Organic (USDA & EU), Fair Trade (FLO), and UTZ certifications across various lots. Specific certification availability varies by region and harvest season." },
  { q: "What are your standard payment terms?", a: "We work with Letter of Credit (L/C) at sight, Telegraphic Transfer (T/T) with 30% deposit and 70% against shipping documents, and for established buyers, open account terms with net-30 payment." },
  { q: "Can you provide private label or custom roasting services?", a: "Yes. Our roasting facility offers contract roasting with private label packaging to your exact specification—including custom bag design, roast profile development, and tamper-evident seals for retail-ready products." },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return val;
}

function CountUp({ target, active, duration = 1800, delay = 0 }: { target: number; active: boolean; duration?: number; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const steps = 60;
      const inc = target / steps;
      let cur = 0;
      const iv = setInterval(() => {
        cur = Math.min(cur + inc, target);
        setVal(Math.floor(cur));
        if (cur >= target) clearInterval(iv);
      }, duration / steps);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, duration, delay]);
  return <>{val}</>;
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about" },
    { label: "Origins", page: "origins" },
    { label: "Roasting", page: "roasting" },
    { label: "Gallery", page: "gallery" },
    { label: "Contact Us", page: "contact" },
  ];

  const go = (p: Page) => { setPage(p); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const FC = "var(--primary)";
  const EB = "var(--accent)";

  return (
    <>
      <style>{`
        @keyframes navShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .nav-cta { background: var(--primary); transition: all 0.25s cubic-bezier(0.16,1,0.3,1); }
        .nav-cta:hover { background: linear-gradient(90deg, var(--primary), var(--primary-hover), var(--primary)); background-size: 200% auto; animation: navShimmer 1.2s linear infinite; box-shadow: 0 8px 24px rgba(200,82,39,0.35); transform: translateY(-1px); }
        .nav-link { position: relative; transition: all 0.2s ease; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: var(--primary); opacity: 0; transition: opacity 0.2s ease; }
        .nav-link.active::after { opacity: 1; }
      `}</style>

      {/* Glassmorphism pill nav */}
      <nav className="fixed left-0 right-0 z-50 flex justify-center" style={{ top: 20, pointerEvents: "none" }}>
        <div className="flex items-center justify-between px-6 py-3 rounded-full fc-nav-pill"
          style={{
            maxWidth: 1100,
            width: "calc(100% - 48px)",
            pointerEvents: "all",
            background: "var(--nav-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--nav-border)",
            boxShadow: "0 20px 40px var(--shadow-color)",
            transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          }}>

          {/* Left: wordmark + leaf */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5 shrink-0 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C7 2 4 7 4 12C4 14 5 16 7 17L12 22L17 17C19 16 20 14 20 12C20 7 17 2 12 2Z" fill="var(--accent)" opacity="0.9" />
              <path d="M12 2C12 2 8 8 12 14C16 8 12 2 12 2Z" fill="var(--nav-text)" opacity="0.3" />
            </svg>
            <span className="text-sm font-medium tracking-[0.18em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--nav-text)", letterSpacing: "0.2em", fontSize: "0.9rem" }}>
              FLAVOR
            </span>
          </button>

          {/* Center: nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className={`nav-link px-4 py-1.5 text-xs tracking-wide rounded-full cursor-pointer ${page === l.page ? "active" : ""}`}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: page === l.page ? "var(--primary)" : "var(--text-sub)",
                  fontWeight: page === l.page ? 600 : 400,
                  background: page === l.page ? "var(--nav-active-bg)" : "transparent",
                  transition: "all 0.2s ease",
                }}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Right: theme toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => go("contact")}
              className="nav-cta px-5 py-2 rounded-full text-xs font-medium tracking-wide cursor-pointer"
              style={{ color: "var(--primary-foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Request Sample Kit
            </button>
          </div>

          {/* Hamburger — mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="p-1 cursor-pointer" style={{ color: "var(--nav-text)" }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col" style={{ background: "var(--bg-main)", color: "var(--text-main)", paddingTop: 80 }}>
          <div className="flex flex-col p-8 gap-5">
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: "var(--border-color)" }}>
              <span className="text-xs uppercase font-mono tracking-widest" style={{ color: "var(--text-mute)" }}>Theme Mode</span>
              <ThemeToggle />
            </div>
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className="text-left text-2xl font-light border-b pb-4 cursor-pointer"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: page === l.page ? FC : "var(--text-main)", borderColor: "var(--border-color)" }}>
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="mt-4 text-sm px-8 py-3 w-fit rounded-sm cursor-pointer"
              style={{ background: FC, color: "var(--primary-foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Request Sample Kit
            </button>
          </div>
        </div>
      )}
    </>
  );
}


// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer style={{ background: "var(--bg-surface)", color: "var(--text-main)", borderTop: "1px solid var(--border-color)", transition: "background-color 0.35s ease, color 0.35s ease" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <div className="text-2xl font-bold tracking-widest uppercase mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-main)" }}>FLAVOR</div>
              <div className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>Coffee Roasters and Exporter</div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ethiopia's premier specialty coffee exporter. Connecting highland farms to global roasters.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "var(--accent)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Navigation</div>
            {(["home", "about", "origins", "roasting", "gallery", "contact"] as Page[]).map((p) => (
              <button key={p} onClick={() => go(p)}
                className="block text-sm mb-3 capitalize transition-colors hover:text-amber-500"
                style={{ color: "var(--text-sub)", fontFamily: "'Plus Jakarta Sans', sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {p === "origins" ? "Coffee Origins" : p === "about" ? "About Us" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: "var(--accent)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact</div>
            <div className="space-y-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <div className="flex gap-3 text-sm" style={{ color: "var(--text-sub)" }}>
                <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                <span>+251922559021</span>
              </div>
              <div className="flex gap-3 text-sm" style={{ color: "var(--text-sub)" }}>
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                <span>Bole Flamingo, in front of Dembel City Center,<br />TG Building, 1st Floor,<br />Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border-color)" }}>
          <div>
            <p className="text-xs" style={{ color: "var(--text-mute)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              © 2026 Flavor Coffee PLC. All rights reserved. Addis Ababa, Ethiopia.
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-mute)", opacity: 0.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Developed by{" "}
              <a href="https://t.me/Huda_technologies" target="_blank" rel="noopener noreferrer"
                className="hover:text-amber-500 transition-colors"
                style={{ color: "var(--accent)", textDecoration: "none" }}>
                Huda Technologies
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <button onClick={() => go("privacy")} style={{ color: "var(--text-mute)", background: "none", border: "none", cursor: "pointer" }} className="hover:text-amber-500 transition-colors">Privacy Policy</button>
            <button onClick={() => go("terms")} style={{ color: "var(--text-mute)", background: "none", border: "none", cursor: "pointer" }} className="hover:text-amber-500 transition-colors">Terms of Service</button>
            <button onClick={() => go("cookies")} style={{ color: "var(--text-mute)", background: "none", border: "none", cursor: "pointer" }} className="hover:text-amber-500 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Section reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── SHARED ETHIOPIAN COFFEE ORIGINS DATA (SINGLE SOURCE OF TRUTH) ────────────
export type CoffeeOriginData = {
  id: string;
  label: string;
  regionName: string;
  cx: number;
  cy: number;
  elev: string;
  rain: string;
  soil: string;
  climate: string;
  notes: string[];
  sca: string;
  process: string;
  grade: string;
  img: string;
  body: string;
};

export const COFFEE_ORIGINS_DATA: CoffeeOriginData[] = [
  {
    id: "yirg",
    label: "Yirgacheffe",
    regionName: "Gedeo Zone, Southern Nations",
    cx: 394, cy: 560,
    elev: "1,750–2,200m", rain: "1,600mm/yr", soil: "Red laterite clay loam", climate: "Cool misty highland",
    notes: ["Lemon Verbena", "Bergamot", "Tea Flower", "Wild Honey"],
    sca: "88–92", process: "Washed", grade: "Golden Morning Light",
    img: "1774284597431-49445d200674",
    body: "The world gold standard for washed elegance. Delicate high-altitude terraces produce coffees of extraordinary floral clarity — each cup a portrait of mountain air and morning dew."
  },
  {
    id: "guji",
    label: "Guji",
    regionName: "Guji Zone, Oromia Region",
    cx: 418, cy: 577,
    elev: "1,800–2,400m", rain: "1,400mm/yr", soil: "Dark volcanic nitisol", climate: "Highland equatorial",
    notes: ["Wild Blueberry", "Jasmine", "Bergamot", "Peach"],
    sca: "87–92", process: "Natural / Washed", grade: "Warm Mist-Emerald",
    img: "1549179228-4bc1e862c171",
    body: "The wild high forests of Guji produce coffees of extraordinary complexity. Elevations above 2,000m, cold nights, and ancient heirloom genetics create jasmine-dominant aromatics and intense blueberry sweetness."
  },
  {
    id: "sidama",
    label: "Sidama",
    regionName: "Sidama Regional State",
    cx: 405, cy: 530,
    elev: "1,500–2,200m", rain: "1,300mm/yr", soil: "Rich volcanic loam", climate: "Subtropical highland",
    notes: ["Sweet Apricot", "Milk Chocolate", "Allspice", "Honey"],
    sca: "86–91", process: "Washed / Honey", grade: "Volcanic Red-Earth",
    img: "1782655654031-fb14a03576c5",
    body: "Fertile rolling highlands with deep volcanic soils produce coffees of remarkable body and sweetness. Sidama's gentle terraces deliver balanced, approachable complexity."
  },
  {
    id: "kaffa",
    label: "Kaffa",
    regionName: "Kaffa Biosphere Reserve",
    cx: 310, cy: 515,
    elev: "1,500–1,800m", rain: "1,800mm/yr", soil: "Forest humus clay", climate: "Humid forest equatorial",
    notes: ["Wild Honey", "Herbal Wine", "Cedar", "Sweet Spice"],
    sca: "85–88", process: "Natural / Washed", grade: "Lush Jungle Emerald",
    img: "1586095516671-d085ff58cdd4",
    body: "The birthplace of all coffee. In Kaffa's UNESCO-protected cloud forests, wild Arabica grows uncultivated — the most genetically diverse coffee gene pool on earth."
  },
  {
    id: "limu",
    label: "Limu",
    regionName: "Jimma Zone, Western Highlands",
    cx: 328, cy: 480,
    elev: "1,400–2,000m", rain: "1,500mm/yr", soil: "Clay-loam nitisol", climate: "Western highland",
    notes: ["Spiced Citrus", "Sweet Wine", "Floral Honey", "Herbal"],
    sca: "85–89", process: "Washed", grade: "Warm Forest Amber",
    img: "1670758611084-e216510c5433",
    body: "Limu's cooperative-managed western highland estates produce washed coffees of remarkable spice and citrus complexity — often overlooked, always exceptional."
  },
  {
    id: "harrar",
    label: "Harrar",
    regionName: "Eastern Hararghe Highlands",
    cx: 563, cy: 433,
    elev: "1,400–2,100m", rain: "900mm/yr", soil: "Sandy red clay loam", climate: "Semi-arid highland",
    notes: ["Dried Fig", "Dark Chocolate", "Winey Berry", "Molasses"],
    sca: "85–89", process: "Natural", grade: "Sun-Baked Terracotta",
    img: "1722962883780-8806c3ab546b",
    body: "The ancient Longberry Harrar — sun-dried on raised beds in Ethiopia's eastern highlands. Centuries of natural processing produce wines of the coffee world: bold, complex, and irreplaceable."
  },
  {
    id: "jimma",
    label: "Jimma",
    regionName: "Jimma Zone Trading Hub",
    cx: 336, cy: 499,
    elev: "1,400–1,800m", rain: "1,800mm/yr", soil: "Forest clay loam", climate: "Humid forest equatorial",
    notes: ["Dark Chocolate", "Cardamom", "Wild Forest", "Tobacco"],
    sca: "85–88", process: "Natural / Washed", grade: "Deep Jungle Mahogany",
    img: "1654815439629-5e93cb7f74a1",
    body: "The trading capital of Ethiopia's coffee belt sits at the gateway to wild forest origins. Jimma's lowland coffees carry deep spice, bittersweet chocolate, and earthy complexity shaped by ancient forest soils."
  }
];

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage, setTargetRegion }: { setPage: (p: Page) => void; setTargetRegion: (r: string) => void }) {
  const [roastPos, setRoastPos]   = useState(1);
  const [hovPin,   setHovPin]     = useState<string | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [bentoHov, setBentoHov]   = useState<number | null>(null);
  const [emailSub, setEmailSub]   = useState("");
  const [subDone,  setSubDone]    = useState(false);
  const [hovPillar,setHovPillar]  = useState<number | null>(null);
  const statsRef  = useRef<HTMLDivElement>(null);
  const [statsVis, setStatsVis]   = useState(false);
  const scrollY   = useScrollY();
  const [magPos,   setMagPos]     = useState({ x: 0, y: 0 });
  const magRef    = useRef<HTMLButtonElement>(null);
  const [cherryPhase, setCherryPhase] = useState<"cherry"|"beans"|"roasted">("cherry");
  const roastSectionRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const [whyVis, setWhyVis] = useState(false);

  // Leaf particle data — fixed so they don't regenerate each render
  const leafParticles = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      x: 5 + (i * 7) % 88, delay: i * 0.7, dur: 8 + (i % 5) * 1.5,
      size: 5 + (i % 4) * 2, sway: (i % 2 ? 1 : -1) * (20 + (i % 3) * 10),
    }))
  ).current;

  useEffect(() => {
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWhyVis(true); }, { threshold: 0.15 });
    if (whyRef.current) obs2.observe(whyRef.current);
    return () => obs2.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.25 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setCherryPhase("beans"), 300);
        setTimeout(() => setCherryPhase("roasted"), 1800);
      }
    }, { threshold: 0.3 });
    if (roastSectionRef.current) obs.observe(roastSectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMagPos({ x: (e.clientX - rect.left - rect.width/2) * 0.35, y: (e.clientY - rect.top - rect.height/2) * 0.35 });
  };
  const resetMag = () => setMagPos({ x: 0, y: 0 });

  const c0 = useCounter(2200, statsVis, 1600);
  const c1 = useCounter(885, statsVis, 1800);

  // 4 roast levels with SVG bean data
  const ROASTS = [
    { label: "Light Roast",      sub: "Cinnamon · City Light",  beanColor: "#C8906A", hiColor: "#E8B090", crease: "rgba(140,80,40,0.35)", gloss: 0,    shadow: "rgba(200,144,106,0.25)", readout: "Preserves maximum floral jasmine aromatics, tea-like body, and vibrant citric acidity.", notes: "Jasmine · Lemon Blossom · Bergamot" },
    { label: "Medium Roast",     sub: "City · Full City",       beanColor: "#8B5A2B", hiColor: "#B07840", crease: "rgba(80,40,15,0.5)",   gloss: 0.18, shadow: "rgba(139,90,43,0.3)",  readout: "Balances stone-fruit sweetness with caramelized sugars, milk chocolate, and smooth body.", notes: "Caramel · Stone Fruit · Dark Chocolate" },
    { label: "Dark Roast",       sub: "Vienna · Espresso",      beanColor: "#3A1E0A", hiColor: "#6A3A18", crease: "rgba(30,10,0,0.7)",    gloss: 0.38, shadow: "rgba(58,30,10,0.45)",  readout: "Emphasizes dark cocoa, toasted spice, heavy mouthfeel, and low acidity.", notes: "Dark Cocoa · Toasted Spice · Smoke" },
    { label: "Extra Dark Roast", sub: "French · Italian",       beanColor: "#180A02", hiColor: "#3A1808", crease: "rgba(10,0,0,0.85)",    gloss: 0.55, shadow: "rgba(24,10,2,0.6)",   readout: "Maximum Maillard development with bittersweet chocolate, charred oak, and dense body.", notes: "Bittersweet · Charred Oak · Dense Body" },
  ];

  const PINS = [
    { id: "kaffa",   label: "Kaffa",       x:  93, y: 422, elev: "1,500–1,800m", soil: "Forest clay loam",    flavor: "Wild, earthy and spiced with rustic complexity." },
    { id: "jimma",   label: "Jimma",       x: 126, y: 397, elev: "1,400–1,800m", soil: "Forest clay loam",    flavor: "Dark chocolate, cardamom, forest floor, tobacco." },
    { id: "limu",    label: "Limu",        x: 153, y: 374, elev: "1,400–2,000m", soil: "Clay-loam nitosoil",  flavor: "Sweet spice, wild honey, nectarine, creamy body." },
    { id: "yirg",    label: "Yirgacheffe", x: 164, y: 465, elev: "1,750–2,200m", soil: "Red laterite clay",   flavor: "Jasmine, bergamot, lemon — the world's gold standard." },
    { id: "sidama",  label: "Sidama",      x: 180, y: 442, elev: "1,500–2,200m", soil: "Rich volcanic loam",  flavor: "Passion fruit, citrus, caramel, bright and balanced." },
    { id: "guji",    label: "Guji",        x: 147, y: 481, elev: "1,800–2,400m", soil: "Dark volcanic clay",  flavor: "Wild blueberry, stone fruit, jasmine, wine-like." },
    { id: "harrar",  label: "Harrar",      x: 341, y: 326, elev: "1,400–2,100m", soil: "Sandy clay loam",     flavor: "Blackberry wine, dried fig, dark cocoa, aged spice." },
  ];

  const ORIGINS = [
    { name: "Guji",        tagline: "Wild, floral, and intensely fruity.",                  img: "1549179228-4bc1e862c171",    meta: "Oromia · 1,800–2,400m" },
    { name: "Yirgacheffe", tagline: "The world gold standard for washed elegance.",          img: "1774284597431-49445d200674",  meta: "SNNPR · 1,750–2,200m" },
    { name: "Sidama",      tagline: "Deep sweetness, citrus brightness, and complex spice.", img: "1782655654031-fb14a03576c5",  meta: "Sidama Region · 1,500–2,200m" },
    { name: "Harrar",      tagline: "Sun-dried natural heritage with rich berry notes.",     img: "1722962883780-8806c3ab546b",  meta: "Harari Region · 1,400–2,100m" },
  ];

  const PILLARS = [
    { num: "01", title: "Direct Trade",      body: "Direct economic stability for farm partners through transparent, above-market pricing and long-term purchasing agreements." },
    { num: "02", title: "Precision Roasting", body: "Data-logged roast profiles ensure consistency and repeatability across every batch, lot, and season." },
    { num: "03", title: "Ecological Care",    body: "Eco-friendly washing, zero-plastic packaging, and regenerative farm practices protect highland ecosystems for future generations." },
    { num: "04", title: "Global Reach",       body: "Export-ready GrainPro eco-barrier shipping to 48 countries, with full regulatory compliance for EU, US, and Japanese markets." },
  ];

  const BENTO_EDITORIAL = [
    { img: "1670758611084-e216510c5433", alt: "Farmer's hands selectively picking ripe crimson cherries at dawn",       label: "The Harvest" },
    { img: "1586095516671-d085ff58cdd4", alt: "Ancient highland canopy over wild Arabica, Kaffa biosphere reserve",     label: "The Terroir" },
    { img: "1782655654031-fb14a03576c5", alt: "Ripe crimson cherries glistening in forest-filtered morning light",      label: "The Cherry" },
    { img: "1774284597431-49445d200674", alt: "Golden sunrise over undulating Guji coffee plantation ridgelines",        label: "The Landscape" },
    { img: "1631166092772-d07aed54b9a0", alt: "Traditional Ethiopian buna ceremony — clay jebena, finjal cups, incense, fresh green grass",  label: "The Ceremony" },
    { img: "1722962883780-8806c3ab546b", alt: "Licensed Q-Grader breaking the crust and evaluating Yirgacheffe aroma",  label: "The Craft" },
    { img: "1652249018603-fa071069fcba", alt: "Master roaster withdrawing brass trier at 187°C, evaluating bean development", label: "The Roaster" },
    { img: "1624976921221-4478954a4bc9", alt: "Freshly roasted Guji Arabica cascading into the rapid-quench cooling tray", label: "The Cooling" },
    { img: "1520209759809-a9bcb6cb3241", alt: "Premium parchment coffee spread on raised African wire drying beds — Yirgacheffe", label: "The Drying" },
    { img: "1447933601403-0c6688de566e", alt: "Women sorting export-grade green Arabica parchment by hand under canopy shade", label: "The Sorting" },
  ];

  const FC = "var(--primary)"; const EB = "var(--accent)"; const HF = "var(--bg-dark-section)";
  const WI = "var(--bg-main)"; const PC = "var(--bg-surface)"; const AE = "var(--text-main)";
  const CD = "var(--card-bg)"; const CB = "var(--card-border)";
  const TS = "var(--text-sub)"; const TM = "var(--text-mute)";
  const TW = "var(--text-on-dark, #FDFBF7)"; const TWS = "var(--text-on-dark-sub, rgba(253,251,247,0.78))";

  const r = ROASTS[roastPos];

  return (
    <div style={{ background: WI, color: AE, fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden", transition: "background-color 0.35s ease, color 0.35s ease" }}>
      <style>{`
        @keyframes hpZoom      { from { transform: scale(1.0); } to { transform: scale(1.06); } }
        @keyframes hpFloat     { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-16px) rotate(2deg); } }
        @keyframes hpFadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hpPulse     { 0%,100% { opacity:0.55; transform:scale(1); } 50% { opacity:1; transform:scale(1.45); } }
        @keyframes hpSlide     { from { opacity:0; transform:translateX(-18px); } to { opacity:1; transform:translateX(0); } }
        @keyframes hpScrollDot { 0% { transform:translateY(0); opacity:1; } 70% { opacity:0.8; } 100% { transform:translateY(36px); opacity:0; } }
        @keyframes hpLeafDrift { 0% { transform:translateY(-20px) rotate(0deg); opacity:0; } 10% { opacity:0.6; } 85% { opacity:0.45; } 100% { transform:translateY(110vh) rotate(var(--sway,20deg)); opacity:0; } }
        @keyframes hpSunPatch  { 0%,100% { opacity:0.06; } 50% { opacity:0.12; } }
        @keyframes hpRoastGlow { 0%,100% { box-shadow: 0 0 20px var(--bean-shadow); } 50% { box-shadow: 0 0 48px var(--bean-shadow); } }
        @keyframes hpBeanPop   { from { transform:scale(0.85); opacity:0.6; } to { transform:scale(1); opacity:1; } }
        @keyframes hpBorderPulse { 0%,100% { border-color: rgba(184,134,11,0.18); } 50% { border-color: rgba(184,134,11,0.55); } }
        .mag-btn { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, background 0.2s ease; }
        .mag-btn:hover { box-shadow: 0 14px 36px rgba(200,82,39,0.4); }
        .pin-ring { animation: hpPulse 2.6s ease-in-out infinite; }
        .hp-card-hover { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease; }
        .hp-card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 52px rgba(15,12,10,0.18); }
        *, *::before, *::after { box-sizing: border-box; }
        html, body { overflow-x: hidden; max-width: 100vw; }
        img, svg, video { max-width: 100%; }
        @media (max-width: 767px) {
          svg[viewBox="0 0 400 400"] { width: 100% !important; height: auto !important; }
          .gp-lightbox-wrap { flex-direction: column !important; }
          .gp-lightbox-exif { width: 100% !important; max-height: 50vh !important; overflow-y: auto !important; }
          .cp-buyers-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cp-form-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cp-form-2col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1023px) {
          .rs-grid-2col { grid-template-columns: 1fr !important; }
          .cp-buyers-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cp-form-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,82,39,0.28); border-radius: 2px; }
      `}</style>

      {/* ── Floating Cherry Scroll Element (unchanged behaviour) ────────────────── */}
      <div className="fixed pointer-events-none z-20"
        style={{ right: "3rem", top: `calc(30vh + ${Math.min(scrollY * 0.4, 600)}px)`, transition: "top 0.1s linear", opacity: scrollY > 100 ? Math.max(0, 1 - (scrollY - 100) / 1200) : 0 }}>
        {cherryPhase === "cherry" && (
          <div style={{ animation: "hpFloat 5s ease-in-out infinite" }}>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <defs>
                <radialGradient id="cherryGrad" cx="35%" cy="30%"><stop offset="0%" stopColor="#FF6B6B" /><stop offset="50%" stopColor="#C0392B" /><stop offset="100%" stopColor="#7B0D1E" /></radialGradient>
                <radialGradient id="cherrySheen" cx="28%" cy="22%"><stop offset="0%" stopColor="rgba(255,255,255,0.58)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
              </defs>
              <ellipse cx="26" cy="30" rx="20" ry="18" fill="url(#cherryGrad)" />
              <ellipse cx="26" cy="30" rx="20" ry="18" fill="url(#cherrySheen)" />
              <path d="M26 12 Q30 4 38 2 Q34 8 28 10Z" fill="#2d5a27" />
              <circle cx="19" cy="23" r="5" fill="rgba(255,255,255,0.12)" />
            </svg>
          </div>
        )}
        {cherryPhase === "beans" && (
          <div className="flex gap-1" style={{ animation: "hpFadeUp 0.6s both" }}>
            {["-6deg","6deg"].map((rot, i) => (
              <svg key={i} width="22" height="28" viewBox="0 0 22 28" style={{ transform: `rotate(${rot})` }}>
                <defs><radialGradient id={`bG${i}`} cx="40%" cy="30%"><stop offset="0%" stopColor="#D4C5A9" /><stop offset="100%" stopColor="#A89070" /></radialGradient></defs>
                <ellipse cx="11" cy="14" rx="8" ry="12" fill={`url(#bG${i})`} />
                <line x1="11" y1="4" x2="11" y2="24" stroke="rgba(100,70,40,0.45)" strokeWidth="1.2" />
              </svg>
            ))}
          </div>
        )}
        {cherryPhase === "roasted" && (
          <div style={{ animation: "hpFadeUp 0.6s both" }}>
            <svg width="42" height="42" viewBox="0 0 42 42">
              <defs><radialGradient id="roastedGrad" cx="35%" cy="30%"><stop offset="0%" stopColor="#4A2810" /><stop offset="100%" stopColor="#1A0A04" /></radialGradient></defs>
              <ellipse cx="21" cy="21" rx="17" ry="15" fill="url(#roastedGrad)" />
              <ellipse cx="21" cy="21" rx="17" ry="15" fill="rgba(180,120,50,0.1)" />
              <line x1="21" y1="8" x2="21" y2="34" stroke="rgba(180,120,50,0.38)" strokeWidth="1.3" />
              <circle cx="14" cy="17" r="3" fill="rgba(180,120,50,0.06)" />
            </svg>
          </div>
        )}
      </div>

      {/* ══ HERO — Cinematic Cherry Forest ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#080C08" }}>
        {/* Parallax botanical background — forest canopy / cherry on tree */}
        <div className="absolute inset-0" style={{ transform: `scale(1.08) translateY(${scrollY * 0.12}px)`, animation: "hpZoom 32s ease-in-out infinite alternate" }}>
          <img loading="lazy" src={u("1586095516671-d085ff58cdd4", 1920, 1080)} alt="Ripe crimson Ethiopian coffee cherries on the tree in highland forest canopy"
            className="w-full h-full object-cover" style={{ filter: "brightness(0.38) saturate(1.4) hue-rotate(-5deg)" }} />
        </div>

        {/* Floating botanical leaf particles */}
        {leafParticles.map((p, i) => (
          <div key={i} className="absolute pointer-events-none"
            style={{ left: `${p.x}%`, top: 0, width: p.size, height: p.size * 1.5, borderRadius: "50% 0 50% 0",
              background: "rgba(100,160,80,0.45)", filter: "blur(0.5px)",
              animationName: "hpLeafDrift", animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
              animationIterationCount: "infinite", animationTimingFunction: "linear",
              ["--sway" as string]: `${p.sway}deg` }} />
        ))}

        {/* Sunbeam shaft — slow golden light through canopy */}
        {[18, 42, 68].map((x, i) => (
          <div key={i} className="absolute top-0 pointer-events-none"
            style={{ left: `${x}%`, width: 4, height: "100%", background: "linear-gradient(to bottom, rgba(255,200,80,0.22) 0%, transparent 65%)", transform: `rotate(${-6 + i * 4}deg) translateX(-50%)`, transformOrigin: "top", animation: `hpSunPatch ${6 + i * 2}s ${i * 1.5}s ease-in-out infinite`, filter: "blur(10px)" }} />
        ))}

        {/* Atmospheric depth layers */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(8,12,8,0.85) 0%, rgba(8,12,8,0.45) 50%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,8,0.9) 0%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 72% 38%, rgba(184,134,11,0.1) 0%, transparent 65%)" }} />
        {/* Warm mist at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(253,251,247,0.02))" }} />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16 pt-28 pb-24 md:pt-36">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
            style={{ borderColor: `${EB}55`, background: "rgba(184,134,11,0.1)", animation: "hpFadeUp 0.8s 0.2s both" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: EB }} />
            <span className="text-xs tracking-[0.22em] uppercase" style={{ color: EB }}>Ethiopian Arabica · Origin Flagship</span>
          </div>

          <h1 className="font-light leading-[1.04] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 7vw, 5.8rem)", color: "var(--text-on-dark, #F5EDE4)", maxWidth: 780, animation: "hpFadeUp 0.9s 0.35s both" }}>
            From the Birthplace<br />
            <em style={{ color: `${EB}ee` }}>of Coffee</em><br />
            to the World.
          </h1>

          <p className="mb-10 leading-relaxed font-light"
            style={{ color: "rgba(253,251,247,0.68)", fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)", lineHeight: 1.9, maxWidth: 560, animation: "hpFadeUp 0.9s 0.5s both" }}>
            Flavor Coffee PLC transforms Ethiopia's finest micro-lots into masterfully roasted Arabica. Crafted with precision for specialty connoisseurs, engineered for global export.
          </p>

          <div className="flex flex-wrap gap-4" style={{ animation: "hpFadeUp 0.9s 0.65s both" }}>
            <button ref={magRef} onClick={() => setPage("origins")} onMouseMove={handleMagMove} onMouseLeave={resetMag}
              className="mag-btn px-7 py-3.5 rounded-sm text-sm font-medium tracking-wide cursor-pointer"
              style={{ background: FC, color: "var(--primary-foreground)", transform: `translate(${magPos.x}px,${magPos.y}px)` }}>
              Explore Collection
            </button>
            <button onClick={() => setPage("about")}
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.3}px,${(e.clientY - r.top - r.height/2)*0.3}px)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
              className="mag-btn px-7 py-3.5 rounded-sm text-sm font-medium border cursor-pointer"
              style={{ borderColor: "rgba(253,251,247,0.35)", color: "var(--text-on-dark, #F5EDE4)", background: "rgba(253,251,247,0.06)", backdropFilter: "blur(10px)" }}>
              Discover Our Story
            </button>
          </div>
        </div>

        {/* Smooth bottom fade to page background */}
        <div className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent, var(--bg-main))` }} />
      </section>

      {/* Warm cinematic transition strip */}
      <div className="h-20 -mt-1" style={{ background: `linear-gradient(to bottom, #080C08, var(--bg-main))` }} />

      {/* ══ WHY CONTINUE COFFEE ═══════════════════════════════════════════════════ */}
      <section ref={whyRef} style={{ background: WI, padding: "0 0 120px", position: "relative", overflow: "hidden" }}>
        {/* Background decorative layers */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Radial warm glow */}
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,82,39,0.055) 0%, transparent 70%)" }}/>
          <div style={{ position: "absolute", bottom: "0%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,11,0.06) 0%, transparent 70%)" }}/>
          {/* Subtle grain texture overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")", opacity: 0.6 }}/>
          {/* Drifting bean silhouettes */}
          {[
            { x: "8%",  y: "18%", r: 18, delay: 0 },
            { x: "91%", y: "30%", r: 13, delay: 1.2 },
            { x: "3%",  y: "72%", r: 10, delay: 2.1 },
            { x: "88%", y: "80%", r: 16, delay: 0.7 },
            { x: "48%", y: "6%",  r: 9,  delay: 1.8 },
          ].map((b, i) => (
            <div key={i} style={{
              position: "absolute", left: b.x, top: b.y, width: b.r * 2, height: b.r * 1.3,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              border: `1.5px solid rgba(184,134,11,0.18)`,
              animation: `hpFloat ${5 + i}s ease-in-out ${b.delay}s infinite alternate`,
            }}/>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: Enhanced Typography & Story ── */}
            <div>
              {/* Eyebrow badge with glowing pulse */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-6 border"
                style={{
                  background: "rgba(200,82,39,0.06)", borderColor: "rgba(200,82,39,0.2)",
                  opacity: whyVis ? 1 : 0, transform: whyVis ? "translateY(0)" : "translateY(16px)",
                  transition: "all 0.7s ease",
                }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ background: FC }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FC, textTransform: "uppercase", fontWeight: 600 }}>
                  Addis Ababa's Premier Roast Partner
                </p>
              </div>

              {/* EYE-CATCHING HERO HEADLINE WITH ANIMATION & GRADIENT ACCENT */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 300, lineHeight: 1.15, color: AE, marginBottom: 28,
                opacity: whyVis ? 1 : 0, transform: whyVis ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}>
                Why More Than <span style={{ color: FC, fontWeight: 500 }}>105 Cafés</span> Choose<br/>
                <span style={{
                  fontStyle: "italic",
                  background: `linear-gradient(135deg, ${FC} 0%, #D86334 40%, ${EB} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                  display: "inline-block",
                  position: "relative",
                  paddingRight: 4,
                }}>
                  Flavor Coffee
                </span> Every Day.
              </h2>

              {/* Body copy */}
              <p style={{
                fontSize: 15, lineHeight: 1.88, color: `${AE}aa`, marginBottom: 36,
                opacity: whyVis ? 1 : 0, transform: whyVis ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s ease 0.2s",
              }}>
                Flavor Coffee has become one of Addis Ababa's most trusted roasting partners — not through marketing, but through merit. More than 105 cafés, restaurants, hotels, and specialty coffee businesses across the city proudly serve coffee roasted in our facility. That trust is earned daily through consistent quality, precision roasting, carefully selected Ethiopian Arabica, dependable supply, and long-term partnerships built on transparency.
              </p>

              {/* Animated stats row */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-10"
                style={{ opacity: whyVis ? 1 : 0, transform: whyVis ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.3s" }}>
                {[
                  { num: whyVis ? 105 : 0, suffix: "+", label: "Partner Cafés", accent: FC },
                  { num: 100, suffix: "%", label: "Ethiopian Arabica", accent: EB },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-sm transition-transform duration-300 hover:-translate-y-1" style={{ background: PC, border: `1px solid ${s.accent}22`, boxShadow: "0 4px 20px rgba(15,12,10,0.04)" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 600, color: s.accent, lineHeight: 1 }}>
                      <CountUp target={s.num} active={whyVis} duration={1800} delay={i * 200} />{s.suffix}
                    </p>
                    <p style={{ fontSize: 11, letterSpacing: "0.16em", color: `${AE}77`, textTransform: "uppercase", marginTop: 6, fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: "◉", title: "105+ Partner Cafés",
                    desc: "Supplying premium roasted coffee to cafés, hotels, restaurants, and businesses throughout Addis Ababa.",
                    delay: "0.35s", accent: FC,
                  },
                  {
                    icon: "◎", title: "Precision Roasting",
                    desc: "Advanced commercial roasting technology lets each origin reach its ideal profile with exceptional consistency.",
                    delay: "0.45s", accent: EB,
                  },
                  {
                    icon: "◈", title: "Expert Roast Masters",
                    desc: "Experienced roasting professionals monitor every cycle — ensuring flavor, aroma, body, and balance.",
                    delay: "0.55s", accent: HF,
                  },
                  {
                    icon: "❋", title: "Arabica Excellence",
                    desc: "Carefully selected Ethiopian Arabica from renowned regions, preserving unique regional characteristics.",
                    delay: "0.65s", accent: FC,
                  },
                ].map((card, i) => (
                  <div key={i}
                    className="why-card group p-5 rounded-sm cursor-default"
                    style={{
                      background: CD, border: `1px solid ${CB}`,
                      backdropFilter: "blur(12px)", boxShadow: "0 4px 20px rgba(15,12,10,0.06)",
                      transition: "all 0.3s ease",
                      opacity: whyVis ? 1 : 0, transform: whyVis ? "translateY(0)" : "translateY(24px)",
                      transitionDelay: card.delay, transitionDuration: "0.7s",
                    }}>
                    <div style={{ fontSize: 22, color: card.accent, marginBottom: 8, transition: "transform 0.3s" }}>{card.icon}</div>
                    <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: AE, marginBottom: 5 }}>{card.title}</p>
                    <p style={{ fontSize: 12, lineHeight: 1.65, color: TS }}>{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Perfectly Aligned, Responsive Luxury Image Architecture ── */}
            <div className="relative" style={{
              opacity: whyVis ? 1 : 0, transform: whyVis ? "scale(1)" : "scale(0.97)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s"
            }}>
              {/* Primary Image Wrapper — Straight, Crisp, Perfectly Proportioned */}
              <div className="relative rounded-sm overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5", background: PC }}>
                <img
                  src={u("1447933601403-0c6688de566e", 800, 1000)}
                  alt="Flavor Coffee roasting facility in Addis Ababa"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                  style={{ filter: "brightness(0.92) saturate(1.08)" }}
                />
                {/* Bottom Overlay Label */}
                <div style={{
                  position: "absolute", bottom: 20, left: 20, padding: "10px 18px", borderRadius: 2,
                  background: "rgba(15,12,10,0.85)", backdropFilter: "blur(12px)",
                  border: `1px solid ${EB}44`, boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", color: EB, textTransform: "uppercase" }}>Roasting Excellence</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: TW, fontStyle: "italic", marginTop: 2 }}>Craft in every batch.</p>
                </div>
              </div>

              {/* Secondary Inset Image — Unroasted Green Beans (Straight, No Weird Angles) */}
              <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 w-[55%] sm:w-[52%] rounded-sm overflow-hidden shadow-2xl border-4" style={{
                aspectRatio: "3/4", borderColor: WI, zIndex: 10, background: PC
              }}>
                <img
                  src={greenBeansImg}
                  alt="Raw green Ethiopian coffee beans prior to roasting"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: "brightness(0.94) saturate(1.1)" }}
                />
              </div>

              {/* Top Floating Badge — 105+ Partners (Clean Alignment) */}
              <div className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 p-4 rounded-sm border shadow-xl z-20" style={{
                background: "rgba(15,12,10,0.92)", borderColor: `${FC}44`, backdropFilter: "blur(16px)",
                minWidth: 140
              }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: FC }} />
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.22em", color: FC, textTransform: "uppercase" }}>Addis Ababa</p>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: TW, lineHeight: 1 }}>105+</p>
                <p style={{ fontSize: 10, color: TWS, marginTop: 3 }}>Trusted Roasting Partners</p>
              </div>
              {/* Decorative gold ring */}
              <div style={{
                position: "absolute", top: "42%", left: "52%", zIndex: 0,
                width: 120, height: 120, borderRadius: "50%",
                border: `1.5px solid ${EB}30`,
              }}/>
            </div>

          </div>
        </div>
        <style>{`
          .why-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(15,12,10,0.1) !important; }
          @keyframes hpFloat { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-12px) rotate(6deg); } }
        `}</style>
      </section>

      {/* ══ BRAND INTRODUCTION ════════════════════════════════════════════════════ */}
      <section style={{ background: WI, padding: "80px 0 100px" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-5 font-medium" style={{ color: FC }}>Our Heritage</p>
              <h2 className="font-light leading-tight mb-7" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: AE }}>
                Honoring An Ancient Lineage Through Modern Precision.
              </h2>
              <p className="leading-relaxed mb-10" style={{ color: TS, fontSize: "1rem", lineHeight: 1.92 }}>
                Coffee was born in the wild high-altitude forests of Ethiopia. At Flavor Coffee PLC, we respect this heritage by preserving the raw, bio-diverse character of heirloom varieties while employing modern roasting science. Every bean we select passes through rigorous physical inspection and cupping protocols in Addis Ababa, ensuring that only world-class grades leave our roastery.
              </p>
              <div ref={statsRef} className="grid grid-cols-3 gap-0 border-t" style={{ borderColor: `${AE}18` }}>
                {[
                  { val: `${c0.toLocaleString()}m+`, label: "Harvest Elevation" },
                  { val: `${(c1 / 10).toFixed(1)}+`,  label: "Avg SCA Score" },
                  { val: "100%",                        label: "Single-Origin" },
                ].map((s, i) => (
                  <div key={i} className={`pt-6 pr-4 ${i < 2 ? "border-r" : ""}`} style={{ borderColor: `${AE}18` }}>
                    <div className="font-light leading-none mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: AE }}>{s.val}</div>
                    <div className="text-xs tracking-wide uppercase" style={{ color: TM }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stacked editorial photos — fully framed */}
            <div className="relative mt-4 lg:mt-0">
              <div className="rounded-sm overflow-hidden" style={{ aspectRatio: "3/4", background: PC }}>
                <img loading="lazy" src={u("1670758611084-e216510c5433", 900, 1200)} alt="Ethiopian coffee sorter at Guji washing station"
                  className="w-full h-full object-cover" style={{ filter: "saturate(1.1)" }} />
              </div>
              {/* Overlapping macro shot — carefully positioned to stay responsive */}
              <div className="absolute rounded-sm overflow-hidden border-2 sm:border-4" style={{ bottom: "0.25rem", left: "0.25rem", width: "clamp(100px, 35vw, 180px)", background: PC, borderColor: WI, boxShadow: "0 12px 40px rgba(15,12,10,0.22)", aspectRatio: "1/1" }}>
                <img loading="lazy" src={u("1447933601403-0c6688de566e", 400, 400)} alt="Raw green Arabica beans in cupping bowl" className="w-full h-full object-cover" />
              </div>
              {/* Bronze badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-sm border"
                style={{ background: "rgba(15,12,10,0.72)", borderColor: `${EB}44`, backdropFilter: "blur(6px)" }}>
                <span className="text-xs tracking-wide" style={{ color: EB, fontFamily: "'JetBrains Mono', monospace", fontSize: 9 }}>Addis Ababa · Est. 2001</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY ETHIOPIA ══════════════════════════════════════════════════════════ */}
      <section style={{ background: PC, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: FC }}>The World's Most Complex Coffee Terroir</p>
            <h2 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: AE }}>
              Where Genetics, Altitude,<br />and Soil Converge.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="space-y-0">
              {[
                { num: "01", title: "Wild Heirloom Diversity",     body: "Thousands of naturally occurring, uncatalogued wild Arabica cultivars thrive across Ethiopia's highland forests — a genetic treasury found nowhere else on earth." },
                { num: "02", title: "High-Altitude Slow Ripening", body: "Cold mountain nights between 1,800m and 2,400m slow cherry maturation, concentrating complex floral sugars and preserving delicate acidity in every bean." },
                { num: "03", title: "Artisanal Processing",        body: "Sun-drying on raised African bamboo beds and mountain spring washing stations — time-honored methods that define each region's flavor identity." },
              ].map((c, i) => (
                <div key={i} className="flex gap-6 py-7 border-b" style={{ borderColor: `${AE}12` }}>
                  <span className="text-xs font-medium pt-1 shrink-0" style={{ color: FC }}>{c.num}</span>
                  <div>
                    <h3 className="font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: AE }}>{c.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: `${AE}88`, lineHeight: 1.9 }}>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ETHIOPIA COFFEE REGIONS MAP ── */}
            <div className="relative rounded-sm overflow-hidden"
              style={{ background: "#1A130F", border: "1px solid rgba(198,161,91,0.2)" }}>
              <svg viewBox="0 0 900 810" style={{ width: "100%", height: "auto", display: "block" }}
                xmlns="http://www.w3.org/2000/svg">
                {/* background */}
                <rect width="100%" height="100%" fill="#1A130F"/>
                {/* neighbor countries */}
                <g id="countries" opacity="0.6">
                  <path d="M 805.26,485.88 L 684.15,607.43 L 628.32,609.22 L 590.13,637.77 L 562.65,638.52 L 550.93,651.28 L 521.65,651.28 L 504.36,637.59 L 465.21,654.53 L 452.55,671.41 L 423.96,668.22 L 414.48,663.55 L 404.44,664.67 L 390.9,664.26 L 336.65,629.86 L 306.82,629.86 L 292.18,616.53 L 292.18,593.8 L 269.91,587.01 L 244.59,542.93 L 225.01,533.54 L 217.5,517.35 L 195.78,497.61 L 169.46,494.71 L 184.06,471.64 L 206.81,470.64 L 213.21,458.28 L 212.64,421.87 L 225.32,379.48 L 245.62,368.14 L 249.93,351.58 L 268.31,320.64 L 294.16,300.58 L 311.58,260.69 L 318.41,225.9 L 368.3,234.37 L 381.69,204.14 L 407.7,222.53 L 432.83,213.0 L 443.17,221.47 L 472.55,221.96 L 509.85,238.2 L 520.94,252.18 L 539.94,265.19 L 557.56,288.93 L 572.21,302.04 L 557.14,319.95 L 542.65,338.94 L 545.98,350.12 L 546.67,362.44 L 570.61,363.11 L 580.93,360.24 L 590.44,367.46 L 581.09,381.81 L 596.92,404.11 L 612.73,423.61 L 629.09,438.07 L 769.21,486.13 L 805.26,485.88 Z" fill="#233527" stroke="#C6A15B" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M 318.41,225.9 L 313.85,209.69 L 332.31,150.18 L 336.54,123.26 L 350.03,110.84 L 381.6,104.18 L 403.29,81.07 L 428.17,127.95 L 439.98,165.13 L 463.47,184.86 L 521.97,223.11 L 545.78,246.2 L 569.01,269.57 L 582.41,283.48 L 603.48,295.66 L 590.56,305.56 L 572.21,302.04 L 557.56,288.93 L 539.94,265.19 L 520.94,252.18 L 509.85,238.2 L 472.55,221.96 L 443.17,221.47 L 432.83,213.0 L 407.7,222.53 L 381.69,204.14 L 368.3,234.37 L 318.41,225.9 Z" fill="none" stroke="#8C8579" strokeWidth="1" opacity="0.5" strokeLinejoin="round"/>
                  <path d="M -189.97,476.72 L -222.61,459.01 L -237.47,447.35 L -240.22,434.76 L -233.26,417.91 L -233.39,401.39 L -258.11,376.06 L -262.96,358.73 L -262.45,348.92 L -278.2,336.99 L -278.67,313.46 L -287.66,297.83 L -302.71,300.18 L -298.39,285.3 L -287.29,268.42 L -292.14,251.65 L -278.06,239.23 L -286.99,229.76 L -275.66,204.76 L -256.09,174.93 L -219.13,177.76 L -221.24,16.99 L -220.71,0.0 L -171.43,-0.12 L -171.43,-81.0 L 0.86,-81.0 L 167.14,-81.0 L 337.12,-81.0 L 350.95,-41.26 L 341.55,-33.92 L 347.77,7.78 L 363.51,56.13 L 379.83,66.1 L 403.29,81.07 L 381.6,104.18 L 350.03,110.84 L 336.54,123.26 L 332.31,150.18 L 313.85,209.69 L 318.41,225.9 L 311.58,260.69 L 294.16,300.58 L 268.31,320.64 L 249.93,351.58 L 245.62,368.14 L 225.32,379.48 L 212.64,421.87 L 213.21,458.28 L 212.72,426.7 L 206.78,425.9 L 207.52,405.73 L 202.37,391.83 L 180.3,375.84 L 175.15,346.63 L 180.3,316.74 L 160.43,313.96 L 157.49,322.99 L 131.74,325.08 L 142.04,336.9 L 145.72,361.23 L 122.17,383.48 L 100.84,412.69 L 78.76,416.86 L 42.71,393.22 L 26.53,401.56 L 22.11,413.38 L 0.04,421.03 L -1.43,429.37 L -44.1,429.37 L -49.99,421.03 L -80.89,419.64 L -96.34,426.59 L -108.11,423.11 L -130.19,399.47 L -137.54,388.35 L -168.45,393.91 L -180.22,412.69 L -191.25,448.84 L -205.97,456.49 L -219.13,460.9 L -189.97,476.72 Z" fill="none" stroke="#8C8579" strokeWidth="1" opacity="0.4" strokeLinejoin="round"/>
                  <path d="M 78.59,667.88 L 40.86,640.97 L 30.69,623.67 L 6.82,632.23 L -13.0,629.57 L -24.47,636.37 L -43.72,631.46 L -69.68,598.03 L -76.57,585.19 L -108.6,569.16 L -119.42,544.86 L -137.29,527.34 L -166.11,506.25 L -166.5,493.08 L -189.97,476.72 L -219.13,460.9 L -205.97,456.49 L -191.25,448.84 L -180.22,412.69 L -168.45,393.91 L -137.54,388.35 L -130.19,399.47 L -108.11,423.11 L -96.34,426.59 L -80.89,419.64 L -49.99,421.03 L -44.1,429.37 L -1.43,429.37 L 0.04,421.03 L 22.11,413.38 L 26.53,401.56 L 42.71,393.22 L 78.76,416.86 L 100.84,412.69 L 122.17,383.48 L 145.72,361.23 L 142.04,336.9 L 131.74,325.08 L 157.49,322.99 L 160.43,313.96 L 180.3,316.74 L 175.15,346.63 L 180.3,375.84 L 202.37,391.83 L 207.52,405.73 L 206.78,425.9 L 212.72,426.7 L 213.21,458.28 L 206.81,470.64 L 184.06,471.64 L 169.46,494.71 L 195.78,497.61 L 217.5,517.35 L 225.01,533.54 L 244.59,542.93 L 269.91,587.01 L 240.87,613.69 L 214.5,637.88 L 188.14,656.5 L 157.99,656.41 L 123.49,665.89 L 96.24,656.83 L 78.59,667.88 Z" fill="none" stroke="#8C8579" strokeWidth="1" opacity="0.4" strokeLinejoin="round"/>
                  <path d="M 572.21,302.04 L 590.56,305.56 L 603.48,295.66 L 613.62,308.2 L 612.27,325.02 L 587.82,334.71 L 606.23,345.79 L 590.44,367.46 L 580.93,360.24 L 570.61,363.11 L 546.67,362.44 L 545.98,350.12 L 542.65,338.94 L 557.14,319.95 L 572.21,302.04 Z" fill="none" stroke="#8C8579" strokeWidth="1" opacity="0.4" strokeLinejoin="round"/>
                  <path d="M 854.92,347.87 L 830.52,349.29 L 815.21,356.68 L 793.96,359.35 L 756.23,371.93 L 709.58,376.73 L 669.18,387.09 L 647.91,386.96 L 628.57,370.0 L 620.17,353.25 L 606.23,345.79 L 590.44,367.46 L 596.92,404.11 L 612.73,423.61 L 629.09,438.07 L 769.21,486.13 L 805.26,485.88 L 835.15,452.08 L 854.49,427.2 L 854.5,406.07 L 854.51,365.22 L 854.66,348.53 L 854.92,347.87 Z" fill="none" stroke="#8C8579" strokeWidth="1" opacity="0.4" strokeLinejoin="round"/>
                </g>
                {/* neighbor labels */}
                <g fontFamily="'Plus Jakarta Sans', Arial, sans-serif" letterSpacing="1.5">
                  <text x="107.14" y="283.5" fill="#8C8579" fontSize="12" textAnchor="middle">SUDAN</text>
                  <text x="120.0" y="546.75" fill="#8C8579" fontSize="11" textAnchor="middle">S. SUDAN</text>
                  <text x="420.0" y="170.1" fill="#8C8579" fontSize="12" textAnchor="middle">ERITREA</text>
                  <text x="612.86" y="336.15" fill="#8C8579" fontSize="10" textAnchor="middle">DJIBOUTI</text>
                  <text x="792.86" y="567.0" fill="#8C8579" fontSize="12" textAnchor="middle">SOMALIA</text>
                  <text x="321.43" y="708.75" fill="#8C8579" fontSize="12" textAnchor="middle">KENYA</text>
                </g>
                {/* Addis Ababa capital */}
                <rect x="413.43" y="440.29" width="8" height="8" fill="#7A4A2B" stroke="#F7F3EC" strokeWidth="1" transform="rotate(45 417.43 444.29)"/>
                <text x="429.43" y="448.29" fill="#F7F3EC" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontStyle="italic">Addis Ababa</text>
                {/* title */}
                <text x="450.0" y="42" fill="#C6A15B" fontFamily="'Cormorant Garamond', serif" fontSize="20" letterSpacing="4" textAnchor="middle">ETHIOPIA COFFEE REGIONS</text>
                {/* Interactive region pins */}
                {COFFEE_ORIGINS_DATA.map((pin) => (
                  <g key={pin.id} style={{ cursor: "pointer" }}
                    onClick={() => { setTargetRegion(pin.id); setPage("origins"); window.scrollTo({ top: 0 }); }}
                    onMouseEnter={(e) => { (e.currentTarget.querySelector("circle:nth-of-type(3)") as SVGCircleElement)?.setAttribute("r","8"); }}
                    onMouseLeave={(e) => { (e.currentTarget.querySelector("circle:nth-of-type(3)") as SVGCircleElement)?.setAttribute("r","5.5"); }}>
                    <circle cx={pin.cx} cy={pin.cy} r="18" fill="transparent"/>
                    <circle cx={pin.cx} cy={pin.cy} r="11" fill="none" stroke="#C6A15B" strokeWidth="1" opacity="0.35"/>
                    <circle cx={pin.cx} cy={pin.cy} r="5.5" fill="#C6A15B" stroke="#1A130F" strokeWidth="1.5"/>
                    <text x={pin.cx + 14} y={pin.cy + 4} fill="#F7F3EC"
                      fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="600">{pin.label}</text>
                  </g>
                ))}
                {/* Non-interactive display pins for other regions */}
                {[
                  { cx: 323.57, cy: 441.86, label: "Wollega" },
                  { cx: 282.0,  cy: 526.9,  label: "Bench Maji" },
                  { cx: 471.43, cy: 521.64, label: "Bale" },
                  { cx: 434.14, cy: 488.03, label: "Arsi" },
                ].map((pin) => (
                  <g key={pin.label}>
                    <circle cx={pin.cx} cy={pin.cy} r="5.5" fill="#8C8579" stroke="#1A130F" strokeWidth="1.5"/>
                    <text x={pin.cx + 10} y={pin.cy + 4} fill="#8C8579"
                      fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11">{pin.label}</text>
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-3 left-3 flex items-center gap-3 px-3 py-2 rounded-sm"
                style={{ background: "rgba(26,19,15,0.82)", backdropFilter: "blur(8px)", border: "1px solid rgba(198,161,91,0.2)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#C6A15B" }}/>
                  <span style={{ fontSize: 10, color: "#C6A15B", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.18em" }}>CLICK TO EXPLORE</span>
                </div>
                <div className="w-px h-3" style={{ background: "rgba(198,161,91,0.25)" }}/>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#8C8579" }}/>
                  <span style={{ fontSize: 10, color: "#8C8579", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.12em" }}>OTHER REGIONS</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ══ FEATURED COLLECTION ═══════════════════════════════════════════════════ */}
      <section style={{ background: PC, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: FC }}>Exceptional Micro-Lots</p>
              <h2 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: AE }}>
                Featured Collection.
              </h2>
            </div>
            <button onClick={() => setPage("origins")} className="text-sm flex items-center gap-2 pb-1 border-b cursor-pointer" style={{ color: TS, borderColor: `${AE}25` }}>
              View all origins <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { lot: "Micro-Lot 01", name: "Guji Natural",          grade: "Grade 1",   sca: "89.5", notes: ["Wild Blueberry","Rose Water","Bergamot"],      process: "Sun-Dried Natural", alt: "2,150m", roast: "Light-Medium", img: "1549179228-4bc1e862c171" },
              { lot: "Lot 04",       name: "Yirgacheffe Washed",    grade: "Grade 1",   sca: "88.5", notes: ["Peach Blossom","Lemon Verbena","Earl Grey"],    process: "Mountain Washed",   alt: "2,050m", roast: "Light",        img: "1765144815892-1925a0def4a2" },
              { lot: "Batch 09",     name: "Sidama Special Reserve", grade: "Anaerobic", sca: "90.0", notes: ["Passionfruit","Wild Honey","Cacao Nib"],        process: "72hr Anaerobic",    alt: "2,250m", roast: "Medium",       img: "1782655654031-fb14a03576c5" },
            ].map((prod, i) => (
              <div key={i} className="hp-card-hover group relative overflow-hidden rounded-sm" style={{ background: CD, border: `1px solid ${CB}`, boxShadow: "0 10px 30px rgba(15,12,10,0.06)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img loading="lazy" src={u(prod.img, 700, 525)} alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.75) saturate(1.1)" }} />
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-sm border"
                    style={{ background: "rgba(15,12,10,0.75)", borderColor: `${EB}66`, backdropFilter: "blur(8px)" }}>
                    <Star size={10} fill={EB} color={EB} />
                    <span className="text-xs font-medium" style={{ color: EB }}>SCA {prod.sca}</span>
                  </div>
                  <div className="absolute top-4 left-4 px-2 py-1 rounded-sm text-xs" style={{ background: "rgba(15,12,10,0.75)", color: TWS }}>{prod.lot}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: AE }}>{prod.name}</h3>
                  <p className="text-xs mb-4 font-mono" style={{ color: TM }}>{prod.grade}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {prod.notes.map(n => <span key={n} className="px-2 py-0.5 rounded-full text-xs border" style={{ borderColor: `${FC}30`, color: AE, background: `${FC}10` }}>{n}</span>)}
                  </div>
                  <div className="grid grid-cols-3 gap-0 border-t pt-4" style={{ borderColor: `${AE}14` }}>
                    {[["Process", prod.process],["Altitude", prod.alt],["Roast", prod.roast]].map(([k,v]) => (
                      <div key={k}><p className="text-xs mb-0.5" style={{ color: TM }}>{k}</p><p className="text-xs font-medium" style={{ color: AE }}>{v}</p></div>
                    ))}
                  </div>
                  <button className="mt-5 w-full py-2.5 text-sm flex items-center justify-center gap-2 rounded-sm border transition-colors duration-200 cursor-pointer hover:bg-[var(--primary)]/10"
                    style={{ borderColor: `${FC}55`, color: FC, background: `${FC}08` }}>
                    View Spec Sheet <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ROASTING EXCELLENCE — Craft Focus (No machine imagery) ═══════════════ */}
      <section ref={roastSectionRef} style={{ background: HF, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Copy */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: "rgba(253,251,247,0.55)" }}>The Craft</p>
              <h2 className="font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: TW }}>
                Where Thermal Science Meets Sensory Intuition.
              </h2>
              <p className="leading-relaxed mb-8 text-sm" style={{ color: TWS, lineHeight: 1.92 }}>
                Craftsmanship is measured in details invisible to most people. Our roast masters monitor temperature climb rates, development time ratios, and sensory aroma cues simultaneously — adjusting airflow and drum speed in real time to achieve a perfect profile for each micro-lot.
              </p>
              {/* Roast science facts */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[["DTR", "18–22%","Development Time Ratio"],["RoR","12°C/min","Rate of Rise target"],["Crack","196°C","First crack threshold"],["Rest","48 hrs","Post-roast degas period"]].map(([k,v,d])=>(
                  <div key={k} className="p-4 rounded-sm border" style={{ borderColor: "rgba(253,251,247,0.12)", background: "rgba(253,251,247,0.05)" }}>
                    <p className="text-xs mb-1" style={{ color: "rgba(253,251,247,0.5)" }}>{k}</p>
                    <p className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: TW }}>{v}</p>
                    <p className="text-xs" style={{ color: "rgba(253,251,247,0.6)", fontSize: 9 }}>{d}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage("roasting")} className="mag-btn px-8 py-3.5 rounded-sm text-sm font-medium cursor-pointer" style={{ background: FC, color: "#FFFFFF" }}>
                Explore Roasting Process
              </button>
            </div>

            {/* Interactive Roast Spectrum — SVG animated bean */}
            <div className="p-7 sm:p-8 rounded-sm" style={{ background: "rgba(15,12,10,0.65)", border: "1px solid rgba(253,251,247,0.12)" }}>
              <p className="text-xs tracking-wide uppercase mb-5" style={{ color: "rgba(253,251,247,0.5)" }}>Interactive Roast Spectrum</p>

              {/* 4-level selector */}
              <div className="flex gap-1 mb-8">
                {ROASTS.map((ro, i) => (
                  <button key={i} onClick={() => setRoastPos(i)} className="flex-1 py-2.5 text-center text-xs font-medium transition-all duration-300 rounded-sm cursor-pointer"
                    style={{ background: roastPos === i ? `${ro.beanColor}44` : "transparent", color: roastPos === i ? TW : "rgba(253,251,247,0.5)", borderBottom: `2px solid ${roastPos === i ? ro.beanColor : "transparent"}` }}>
                    {ro.label.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* SVG animated coffee bean — changes color, texture, and gloss */}
              <div className="flex justify-center mb-7">
                <div key={roastPos} style={{ animation: "hpBeanPop 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
                  <svg width="120" height="150" viewBox="0 0 120 150" style={{ filter: `drop-shadow(0 8px 32px ${r.shadow})`, ["--bean-shadow" as string]: r.shadow, animation: "hpRoastGlow 3s ease-in-out infinite" }}>
                    <defs>
                      <radialGradient id={`beanFill${roastPos}`} cx="35%" cy="28%" r="70%">
                        <stop offset="0%" stopColor={r.hiColor} />
                        <stop offset="45%" stopColor={r.beanColor} />
                        <stop offset="100%" stopColor={r.crease.replace("rgba","").replace(/,[\d.]+\)/, ",1)").replace("(","rgba(")} />
                      </radialGradient>
                      {/* Oil sheen for dark roasts */}
                      <radialGradient id={`beanGloss${roastPos}`} cx="30%" cy="25%" r="45%">
                        <stop offset="0%" stopColor={`rgba(255,255,255,${r.gloss})`} />
                        <stop offset="100%" stopColor="transparent" />
                      </radialGradient>
                    </defs>
                    {/* Bean body */}
                    <ellipse cx="60" cy="75" rx="42" ry="62" fill={`url(#beanFill${roastPos})`} />
                    {/* Oil sheen overlay (increases with roast) */}
                    <ellipse cx="60" cy="75" rx="42" ry="62" fill={`url(#beanGloss${roastPos})`} />
                    {/* Bean crease */}
                    <path d={`M60 18 Q${60 - 6} 50 ${60 - 4} 75 Q${60 - 2} 100 60 132`} fill="none" stroke={r.crease} strokeWidth={2.5 - roastPos * 0.3} strokeLinecap="round" />
                    {/* Subtle surface texture marks (lighter for light roast, less visible for dark) */}
                    {roastPos < 2 && [
                      `M40 45 Q50 48 48 58`, `M72 38 Q80 44 76 54`, `M38 90 Q48 96 46 105`
                    ].map((d, i) => (
                      <path key={i} d={d} fill="none" stroke={r.crease} strokeWidth="1" strokeLinecap="round" opacity={0.5 - roastPos * 0.15} />
                    ))}
                    {/* Highlight dot */}
                    <ellipse cx="44" cy="46" rx={8 - roastPos} ry={5 - roastPos * 0.5} fill={`rgba(255,255,255,${0.18 - roastPos * 0.03})`} />
                  </svg>
                </div>
              </div>

              <div className="text-center mb-3">
                <p className="font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: TW }}>{r.label}</p>
                <p className="text-xs mb-3 font-semibold" style={{ color: FC }}>{r.notes}</p>
              </div>
              <p className="text-sm leading-relaxed text-center" style={{ color: TWS, lineHeight: 1.85 }}>{r.readout}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ROAST CRAFT EDITORIAL (replaces the machine-bg quote section) ════════ */}
      <section style={{ background: PC, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: large macro photo */}
            <div className="md:col-span-2 relative rounded-sm overflow-hidden group aspect-[4/3] sm:aspect-[16/9]">
              <img loading="lazy" src={u("1600396538702-d234dbb79139", 1200, 675)} alt="Macro of freshly roasted mahogany beans releasing aromatic steam"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                style={{ filter: "brightness(0.62) saturate(1.2) sepia(0.1)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.85) 0%, transparent 55%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-light italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: TW, lineHeight: 1.6 }}>
                  &ldquo;A computer tracks the temperature curve. The roaster listens for the first crack.&rdquo;
                </p>
                <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: TWS }}>— The Flavor Coffee Roast Master</p>
              </div>
            </div>
            {/* Right: 2 craft cards — responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-4 sm:gap-6">
              {[
                { img: "1549179228-4bc1e862c171", cap: "Golden-hour bean cooling tray — aromatic degas visible in the mist", label: "Post-Roast" },
                { img: "1782655654031-fb14a03576c5", cap: "Precision sample roast evaluation against Agtron color chart", label: "Quality Check" },
              ].map((c, i) => (
                <div key={i} className="relative rounded-sm overflow-hidden group flex-1" style={{ minHeight: 160 }}>
                  <img loading="lazy" src={u(c.img, 600, 400)} alt={c.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.58) saturate(1.1)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.85) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs mb-1 font-semibold" style={{ color: FC }}>{c.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: TWS }}>{c.cap}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORIGINS PREVIEW — horizontal carousel ════════════════════════════════ */}
      <section style={{ background: WI, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16 mb-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: FC }}>Coffee Origins</p>
              <h2 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: AE }}>
                Interactive Highland Regions.
              </h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCarouselIdx(Math.max(0, carouselIdx - 1))} className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-100" style={{ borderColor: `${AE}22` }}>
                <ChevronLeft size={16} color={AE} />
              </button>
              <button onClick={() => setCarouselIdx(Math.min(ORIGINS.length - 1, carouselIdx + 1))} className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-100" style={{ borderColor: `${AE}22` }}>
                <ChevronRight size={16} color={AE} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 px-4 sm:px-8" style={{ transform: `translateX(calc(-${carouselIdx} * clamp(260px, 75vw, 360px)))`, gap: "1.25rem" }}>
            {ORIGINS.map((o, i) => (
              <div key={i} className="group shrink-0 rounded-sm overflow-hidden cursor-pointer hp-card-hover" style={{ width: "clamp(260px, 75vw, 360px)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img loading="lazy" src={u(o.img, 600, 800)} alt={o.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.68) saturate(1.1)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.9) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs mb-1" style={{ color: "rgba(253,251,247,0.65)" }}>{o.meta}</p>
                    <h3 className="font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: TW }}>{o.name}</h3>
                    <p className="text-xs" style={{ color: TWS }}>{o.tagline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16 mt-10 flex justify-center">
          <button onClick={() => setPage("origins")} className="mag-btn px-8 py-3 rounded-sm text-sm font-medium border cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary)]"
            style={{ borderColor: `${AE}25`, color: AE }}>
            Explore All Origins
          </button>
        </div>
      </section>

      {/* ══ PILLARS OF INTEGRITY — Premium hover cards ═══════════════════════════ */}
      <section style={{ background: PC, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="mb-12">
            <p className="text-xs tracking-[0.2em] uppercase mb-4 font-medium" style={{ color: FC }}>Pillars of Integrity</p>
            <h2 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: AE }}>
              Building Partnerships That Endure Across Generations.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((v, i) => (
              <div key={i}
                onMouseEnter={() => setHovPillar(i)} onMouseLeave={() => setHovPillar(null)}
                className="relative overflow-hidden rounded-sm border p-7 cursor-default"
                style={{
                  background: hovPillar === i ? CD : WI,
                  borderColor: hovPillar === i ? `${EB}55` : CB,
                  transform: hovPillar === i ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hovPillar === i ? `0 20px 48px rgba(15,12,10,0.12), 0 0 0 1px ${EB}22` : "none",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease",
                }}>
                {/* Bronze top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t transition-all duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${EB}, transparent)`, opacity: hovPillar === i ? 1 : 0 }} />

                {/* Premium thin-line SVG icon */}
                <div className="mb-5 transition-transform duration-300" style={{ transform: hovPillar === i ? "scale(1.15)" : "scale(1)" }}>
                  {([
                    <svg key="trade" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke={hovPillar === i ? FC : EB} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.35s ease" }}><path d="M3 10 L10 6 L15 9 L20 6 L27 10"/><path d="M3 20 L10 24 L15 21 L20 24 L27 20"/><line x1="15" y1="9" x2="15" y2="21"/><circle cx="3" cy="10" r="1.5" fill={hovPillar === i ? FC : EB}/><circle cx="3" cy="20" r="1.5" fill={hovPillar === i ? FC : EB}/><circle cx="27" cy="10" r="1.5" fill={hovPillar === i ? FC : EB}/><circle cx="27" cy="20" r="1.5" fill={hovPillar === i ? FC : EB}/></svg>,
                    <svg key="roast" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke={hovPillar === i ? FC : EB} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.35s ease" }}><rect x="11" y="4" width="8" height="14" rx="4"/><circle cx="15" cy="22" r="4"/><line x1="15" y1="14" x2="15" y2="22"/><line x1="21" y1="8" x2="24" y2="8"/><line x1="22" y1="11" x2="25" y2="11"/><line x1="21" y1="14" x2="23" y2="14"/></svg>,
                    <svg key="leaf" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke={hovPillar === i ? FC : EB} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.35s ease" }}><path d="M5 25 Q7 15 17 7 Q24 4 26 4 Q26 11 19 19 Q14 25 5 25Z"/><line x1="5" y1="25" x2="16" y2="14"/><path d="M9 21 Q11 18 13 16"/></svg>,
                    <svg key="globe" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke={hovPillar === i ? FC : EB} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.35s ease" }}><circle cx="15" cy="15" r="11"/><line x1="4" y1="15" x2="26" y2="15"/><path d="M15 4 Q11 9 11 15 Q11 21 15 26"/><path d="M15 4 Q19 9 19 15 Q19 21 15 26"/><line x1="5.5" y1="9" x2="24.5" y2="9"/><line x1="5.5" y1="21" x2="24.5" y2="21"/></svg>,
                  ])[i]}
                </div>

                {/* Number */}
                <p className="text-xs font-medium mb-4 transition-colors duration-200" style={{ color: hovPillar === i ? EB : FC }}>{v.num}</p>

                {/* Title */}
                <h3 className="font-medium mb-3 transition-all duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: hovPillar === i ? "1.3rem" : "1.18rem", color: AE }}>
                  {v.title}
                </h3>

                {/* Animated divider */}
                <div className="h-px mb-3 transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${EB}, transparent)`, width: hovPillar === i ? "80%" : "0%" }} />

                <p className="text-sm leading-relaxed" style={{ color: TS, lineHeight: 1.88 }}>{v.body}</p>

                {/* Subtle corner glow */}
                {hovPillar === i && (
                  <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${EB}18 0%, transparent 70%)` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ B2B EXPORT CTA ════════════════════════════════════════════════════════ */}
      <section style={{ background: WI, padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="relative overflow-hidden p-10 md:p-16 text-center rounded-sm" style={{ background: "#1C2B22", border: "1px solid rgba(184,134,11,0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
            {/* Topographic overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
              {[60,100,140,180,220,260].map(y => (
                <path key={y} d={`M0 ${y} Q100 ${y-12} 200 ${y+8} Q300 ${y-6} 400 ${y+10} Q500 ${y-8} 600 ${y+6} Q700 ${y-10} 800 ${y+4}`} fill="none" stroke="#B8860B" strokeWidth="0.8" />
              ))}
            </svg>
            <div className="relative z-10">
              <p className="text-xs tracking-[0.24em] uppercase mb-4 font-semibold" style={{ color: "#FF9E1B" }}>B2B Export Partnership</p>
              <h2 className="font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#FDFBF7" }}>
                Partner with Ethiopia's Premier Specialty Exporter.
              </h2>
              <p className="mb-10 max-w-xl mx-auto leading-relaxed text-sm" style={{ color: "rgba(253,251,247,0.88)", lineHeight: 1.92 }}>
                Whether you require custom roasted micro-lots for specialty café chains or direct green coffee container shipments for international roasteries, Flavor Coffee PLC provides seamless, fully certified export supply chains.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setPage("contact")} className="mag-btn px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wide" style={{ background: "#C85227", color: "#FDFBF7", border: "none" }}>Request Green Coffee Sample Kit</button>
                <button onClick={() => setPage("contact")} className="mag-btn px-8 py-3.5 rounded-sm text-sm font-medium border" style={{ borderColor: "rgba(253,251,247,0.35)", color: "#FDFBF7", background: "rgba(253,251,247,0.06)", backdropFilter: "blur(8px)" }}>Schedule Private Cupping Session</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const WI = "var(--bg-main)"; const PC = "var(--bg-surface)"; const AE = "var(--text-main)";
  const HF = "var(--bg-dark-section)"; const FC = "var(--primary)"; const EB = "var(--accent)";
  const RC = "#5B3A29"; const FL = "var(--accent)";
  const CD = "var(--card-bg)"; const CB = "var(--card-border)";
  const TS = "var(--text-sub)"; const TM = "var(--text-mute)";
  const TW = "var(--text-on-dark, #FDFBF7)"; const TWS = "var(--text-on-dark-sub, rgba(253,251,247,0.78))";

  const u = (id: string, w: number, h: number) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

  const scrollY = useScrollY();
  const [heroReady, setHeroReady] = useState(false);
  const [sectVis, setSectVis] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const secRef = (k: string) => (el: HTMLElement | null) => { sectionRefs.current[k] = el; };
  const vis = (k: string) => !!sectVis[k];

  useEffect(() => { setTimeout(() => setHeroReady(true), 300); }, []);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    ["mission", "story", "values", "team", "certifications", "cta"].forEach(k => {
      const el = sectionRefs.current[k];
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setSectVis(v => ({ ...v, [k]: true }));
      }, { threshold: 0.08 });
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const TIMELINE = [
    { year: "2024", event: "Founded in Addis Ababa by Tadesse Bekele with a vision to connect Ethiopia's finest specialty micro-lots directly with global buyers." },
    { year: "2024", event: "Established state-of-the-art dry milling and precision roasting facilities in the capital, attaining ISO quality certifications." },
    { year: "2025", event: "Expanded direct-trade partnerships across Guji, Yirgacheffe, Sidama, Harrar, Kaffa, and Limu highland farming communities." },
    { year: "2026", event: "Established supply chains serving 12 export countries with fully traceable, Q-graded specialty Arabica green and roasted coffee." },
  ];

  const VALUES = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={EB} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8 L10 5 L14 8 L18 5 L24 8"/><path d="M4 18 L10 21 L14 18 L18 21 L24 18"/>
          <line x1="14" y1="8" x2="14" y2="18"/>
          <circle cx="4" cy="8" r="1.5" fill={EB}/><circle cx="4" cy="18" r="1.5" fill={EB}/>
          <circle cx="24" cy="8" r="1.5" fill={EB}/><circle cx="24" cy="18" r="1.5" fill={EB}/>
        </svg>
      ),
      title: "Direct Trade",
      body: "We work directly with over 5,200 smallholder farmers, paying above-market prices and building relationships that span generations. No intermediaries. No compromises.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={EB} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 24 Q5 14 14 7 Q23 14 24 24"/><path d="M14 7 L14 24"/>
          <path d="M8 14 Q14 11 20 14"/><path d="M6 19 Q14 15 22 19"/>
        </svg>
      ),
      title: "Ecological Stewardship",
      body: "Regenerative agriculture, zero-plastic packaging, and eco-friendly washing stations protect Ethiopia's highland ecosystems for the next harvest and the generation after that.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={EB} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="14" r="10"/><circle cx="14" cy="14" r="4"/>
          <line x1="14" y1="4" x2="14" y2="10"/><line x1="14" y1="18" x2="14" y2="24"/>
          <line x1="4" y1="14" x2="10" y2="14"/><line x1="18" y1="14" x2="24" y2="14"/>
        </svg>
      ),
      title: "Full Traceability",
      body: "Every lot we export carries GPS-tagged farm coordinates, cupping scores, lot numbers, and processing documentation — from cherry to container seal.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke={EB} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3 L17 10 L24 10 L18.5 14.5 L20.5 22 L14 18 L7.5 22 L9.5 14.5 L4 10 L11 10 Z"/>
        </svg>
      ),
      title: "Grade 1 Only",
      body: "We do not compromise on quality. Every export lot is cupped by licensed Q Arabica Graders and must score 85+ SCA points before it earns the Flavor Coffee stamp.",
    },
  ];

  const TEAM = [
    {
      name: "Tadesse Bekele",
      role: "Founder & CEO",
      bio: "Third-generation coffee farmer turned global exporter. Building Ethiopia's specialty export infrastructure with deep roots in Yirgacheffe.",
      img: "1597816760638-406d7271105c",
    },
    {
      name: "Dr. Almaz Girma",
      role: "Chief Quality Officer",
      bio: "Licensed Q Arabica Grader. PhD in Food Science from AAU. Led our ISO 22000 certification and built the cupping lab protocol used across all partner farms.",
      img: "1670758611084-e216510c5433",
    },
    {
      name: "Samuel Tesfaye",
      role: "Head of Export Operations",
      bio: "15 years managing green coffee logistics across 12 countries. Specialist in EU, Japanese, and US import compliance and GrainPro cold-chain protocols.",
      img: "1642613630414-1d9938f4fe02",
    },
    {
      name: "Kibrom Haile",
      role: "Head Roastmaster",
      bio: "20 years at the drum. Developed all roast profiles in our flagship lineup. His ear for first crack and his eye for colour define what Flavor Coffee tastes like.",
      img: "1652249018603-fa071069fcba",
    },
  ];

  const CERTS = [
    { name: "Rainforest Alliance Gold", desc: "Top-tier environmental certification across all partner farms." },
    { name: "ISO 9001 · ISO 22000", desc: "Quality management and food safety systems certified." },
    { name: "ECX Certified", desc: "Ethiopian Commodity Exchange grade compliance on every export lot." },
    { name: "ICO Member", desc: "International Coffee Organization documentation on all shipments." },
    { name: "USDA & EU Organic", desc: "Certified organic lots available from select Kaffa and Limu regions." },
    { name: "Fair Trade FLO", desc: "Farmer-first pricing models certified by Fairtrade International." },
  ];

  return (
    <div style={{ background: WI, color: AE, fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden", transition: "background-color 0.35s ease, color 0.35s ease" }}>
      <style>{`
        @keyframes abFadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes abZoom   { from { transform:scale(1.0); } to { transform:scale(1.07); } }
        @keyframes abPulse  { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.5)} }
        @keyframes abFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .ab-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .ab-reveal.vis { opacity:1; transform:translateY(0); }
        .ab-card { transition:transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .ab-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(15,12,10,0.2); }
        .ab-team-img { transition:transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .ab-team-card:hover .ab-team-img { transform:scale(1.05); }
        .ab-timeline-dot { transition:transform 0.3s ease, background 0.3s ease; }
        .ab-timeline-row:hover .ab-timeline-dot { transform:scale(1.5); background:${FC}; }
        .ab-cert-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease; cursor: default; }
        .ab-cert-card:hover { transform: translateY(-5px); background: rgba(253,251,247,0.08) !important; border-color: rgba(184,134,11,0.3) !important; border-left-color: #FF9E1B !important; box-shadow: 0 16px 36px rgba(0,0,0,0.35); }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#0F0C0A" }}>
        <div className="absolute inset-0" style={{ animation: "abZoom 38s ease-in-out infinite alternate" }}>
          <img loading="eager"
            src={u("1549179228-4bc1e862c171", 1920, 1080)}
            alt="Flavor Coffee PLC — Ethiopian highland coffee origin"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.35) saturate(1.1)", transform: `translateY(${scrollY * 0.1}px)` }} />
        </div>
        {/* layered gradients for depth */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.97) 0%, rgba(15,12,10,0.45) 50%, rgba(15,12,10,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(15,12,10,0.85) 0%, transparent 60%)" }} />
        {/* amber sun glow */}
        <div className="absolute pointer-events-none" style={{ top: "22%", right: "28%", width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle, ${EB}28 0%, transparent 70%)`, filter: "blur(32px)", animation: "abPulse 7s ease-in-out infinite" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pb-20 pt-36">
          <div style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.7s 0.2s ease", marginBottom: 20 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border" style={{ borderColor: `${EB}44`, background: "rgba(184,134,11,0.09)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: EB }} />
              <span className="text-xs tracking-[0.25em] uppercase" style={{ color: EB }}>Flavor Coffee PLC · Est. 2024 · Addis Ababa</span>
            </div>
          </div>
          <h1 className="font-light leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--text-on-dark, #F5EDE4)", maxWidth: 780, opacity: heroReady ? 1 : 0, transition: "opacity 0.9s 0.45s ease, transform 0.9s 0.45s ease", transform: heroReady ? "none" : "translateY(20px)" }}>
            Ethiopia's Finest.<br />
            <em style={{ color: `${EB}ee` }}>Our Life's Work.</em>
          </h1>
          <p className="max-w-xl leading-relaxed mb-10"
            style={{ color: "rgba(253,251,247,0.65)", fontSize: "clamp(0.95rem,1.5vw,1.1rem)", lineHeight: 1.9, opacity: heroReady ? 1 : 0, transition: "opacity 0.9s 0.7s ease" }}>
            Since our foundation in 2024, we have connected Ethiopia's extraordinary highland coffee farms to the world's most discerning roasters — one traceable lot at a time.
          </p>
          {/* stat strip */}
          <div className="flex flex-wrap gap-10" style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.9s 0.9s ease" }}>
            {[["2024", "Established"], ["105+", "Cafés & Restaurants"], ["12", "Export Countries"], ["Grade 1", "Arabica Only"]].map(([v, l]) => (
              <div key={l}>
                <p className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", color: FL, lineHeight: 1 }}>{v}</p>
                <p className="text-xs mt-1 tracking-[0.18em] uppercase" style={{ color: "rgba(253,251,247,0.55)", fontFamily: "'JetBrains Mono', monospace" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* scroll hint */}
        <div className="absolute" style={{ bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: heroReady ? 0.5 : 0, transition: "opacity 1s 1.2s ease" }}>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${EB}88)` }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: EB }} />
        </div>
      </section>

      {/* ── MISSION ── */}
      <section ref={secRef("mission")} style={{ background: WI, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`ab-reveal ${vis("mission") ? "vis" : ""}`}>
              <p className="text-xs tracking-[0.24em] uppercase mb-4" style={{ color: FC }}>Our Mission</p>
              <h2 className="font-light leading-tight mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.4rem)", color: AE }}>
                Connecting the World<br />to Ethiopia's<br /><em style={{ color: FC }}>Highland Heritage.</em>
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: TS, fontSize: "1rem", lineHeight: 1.92 }}>
                Flavor Coffee PLC was built on a single conviction: that the world's finest coffee grows in Ethiopia's wild highland forests, and that the farmers who cultivate it deserve transparency, respect, and lasting economic partnership.
              </p>
              <p className="leading-relaxed mb-10" style={{ color: TS, fontSize: "1rem", lineHeight: 1.92 }}>
                We are an export company, a roastery, and a direct-trade partner — all in one. Every decision we make is measured against one question: does this honor the farm, the bean, and the buyer?
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setPage("contact")}
                  className="px-7 py-3.5 rounded-sm text-sm font-medium"
                  style={{ background: FC, color: "#FFFFFF", border: "none", cursor: "pointer", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 36px ${FC}44`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                  Start a Partnership
                </button>
                <button onClick={() => setPage("origins")}
                  className="px-7 py-3.5 rounded-sm text-sm font-medium border"
                  style={{ borderColor: CB, color: AE, background: "transparent", cursor: "pointer", transition: "all 0.25s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = FC; (e.currentTarget as HTMLElement).style.color = FC; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = CB; (e.currentTarget as HTMLElement).style.color = AE; }}>
                  Explore Our Origins
                </button>
              </div>
            </div>
            <div className={`ab-reveal ${vis("mission") ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img loading="lazy"
                  src={u("1586095516671-d085ff58cdd4", 900, 1125)}
                  alt="Wild Arabica coffee growing in Kaffa forest, Ethiopia"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.88) saturate(1.1)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.6) 0%, transparent 55%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="italic text-sm leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.88)", fontSize: 15 }}>
                    "Coffee was born in these forests. We are simply its custodians."
                  </p>
                  <p className="text-xs mt-2 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: `${EB}cc` }}>
                    Kaffa Biosphere Reserve · 1,700m
                  </p>
                </div>
                {/* floating badge */}
                <div className="absolute top-5 right-5 px-3 py-2 rounded-sm border" style={{ background: "rgba(15,12,10,0.78)", borderColor: `${EB}44`, backdropFilter: "blur(10px)" }}>
                  <p className="text-xs tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace", color: EB, fontSize: 9 }}>Est. Addis Ababa · 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKET REACH & HOSPITALITY TRUST ── */}
      <section style={{ background: PC, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="rounded-sm border p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: CD, borderColor: CB, boxShadow: "0 16px 40px rgba(15,12,10,0.06)" }}>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center justify-center shrink-0 w-28 h-28 rounded-full"
                style={{ background: "rgba(200,82,39,0.08)", border: "2px solid #C85227" }}>
                <span className="font-bold text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C85227", lineHeight: 1 }}>105+</span>
                <span className="text-xs font-semibold tracking-wider uppercase mt-1" style={{ color: "#B8860B", fontSize: 9 }}>Partners</span>
              </div>
              <div>
                <p className="text-xs tracking-[0.24em] uppercase font-semibold mb-1" style={{ color: EB, fontFamily: "'JetBrains Mono', monospace" }}>Current Hospitality Reach</p>
                <h3 className="font-light text-2xl md:text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: AE }}>
                  Cafés &amp; Restaurants Currently Using Our Coffee.
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: TS, maxWidth: 620, lineHeight: 1.85 }}>
                  More than 105 specialty cafés, boutique hotel espresso bars, and fine dining establishments currently serve and use Flavor Coffee PLC beans every single day.
                </p>
              </div>
            </div>
            <button onClick={() => setPage("contact")} className="shrink-0 px-7 py-3.5 rounded-sm text-sm font-semibold tracking-wide border transition-all duration-300"
              style={{ background: FC, color: "#FFFFFF", border: "none" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "")}>
              Serve Our Coffee
            </button>
          </div>
        </div>
      </section>

      {/* ── OUR STORY — TIMELINE ── */}
      <section ref={secRef("story")} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`ab-reveal ${vis("story") ? "vis" : ""} mb-16`}>
            <p className="text-xs tracking-[0.24em] uppercase mb-4" style={{ color: FC }}>Our Story</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.4rem)", color: AE }}>
              From Seed<br />to Container.
            </h2>
            <p className="text-sm max-w-lg" style={{ color: TS, lineHeight: 1.9 }}>
              What began as a commitment to Ethiopian coffee excellence has grown into a vertically integrated specialty export operation serving 12 countries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Timeline */}
            <div className="relative">
              {/* vertical spine */}
              <div className="absolute left-3 top-2 bottom-2 w-px" style={{ background: `linear-gradient(to bottom, ${EB}44, ${EB}22)` }} />
              {TIMELINE.map((t, ti) => (
                <div key={t.year + ti}
                  className={`ab-reveal ab-timeline-row ${vis("story") ? "vis" : ""} flex gap-8 mb-10`}
                  style={{ transitionDelay: `${ti * 0.1}s` }}>
                  <div className="relative flex flex-col items-center" style={{ width: 24, flexShrink: 0 }}>
                    <div className="ab-timeline-dot w-2 h-2 rounded-full mt-1.5 z-10" style={{ background: EB }} />
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: EB }}>{t.year}</p>
                    <p className="text-sm leading-relaxed" style={{ color: TS, lineHeight: 1.85 }}>{t.event}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Story image stack */}
            <div className={`ab-reveal ${vis("story") ? "vis" : ""} relative`} style={{ transitionDelay: "0.2s" }}>
              <div className="rounded-sm overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img loading="lazy"
                  src={u("1774284597431-49445d200674", 800, 1067)}
                  alt="Ethiopian highland coffee terraces at dawn"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.78) saturate(1.15)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.8) 0%, transparent 45%)" }} />
              </div>
              {/* floating stat card */}
              <div className="absolute -bottom-6 -left-6 p-5 rounded-sm border" style={{ background: CD, borderColor: CB, boxShadow: "0 20px 48px rgba(15,12,10,0.18)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 700, color: FL, lineHeight: 1 }}>12</p>
                <p className="text-xs mt-1 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", color: TM }}>Export Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section ref={secRef("values")} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`ab-reveal ${vis("values") ? "vis" : ""} mb-14`}>
            <p className="text-xs tracking-[0.24em] uppercase mb-4" style={{ color: FC }}>What We Stand For</p>
            <h2 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.4rem)", color: AE }}>
              Four Principles.<br />Every Decision.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, vi) => (
              <div key={v.title}
                className={`ab-reveal ab-card ${vis("values") ? "vis" : ""} rounded-sm border p-7`}
                style={{ transitionDelay: `${vi * 0.1}s`, background: CD, borderColor: CB }}>
                <div className="mb-5">{v.icon}</div>
                {/* thin gold accent */}
                <div className="mb-5" style={{ height: 1, width: 32, background: `linear-gradient(to right, ${EB}, transparent)` }} />
                <h3 className="font-medium mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: AE }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TS, lineHeight: 1.88 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ── */}
      <section ref={secRef("team")} style={{ background: WI, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`ab-reveal ${vis("team") ? "vis" : ""} mb-14`}>
            <p className="text-xs tracking-[0.24em] uppercase mb-4" style={{ color: FC }}>The People Behind the Cup</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem,4vw,3.4rem)", color: AE }}>
              Our Leadership Team.
            </h2>
            <p className="text-sm max-w-lg" style={{ color: TS, lineHeight: 1.9 }}>
              Built from the farm up. Our team combines deep Ethiopian coffee knowledge with world-class export, quality, and roasting expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((person, pi) => (
              <div key={person.name}
                className={`ab-reveal ab-team-card ${vis("team") ? "vis" : ""}`}
                style={{ transitionDelay: `${pi * 0.1}s` }}>
                <div className="relative rounded-sm overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
                  <img loading="lazy"
                    src={u(person.img, 600, 800)}
                    alt={person.name}
                    className="ab-team-img w-full h-full object-cover"
                    style={{ filter: "brightness(0.82) saturate(1.05)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.88) 0%, transparent 45%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: TW }}>{person.name}</p>
                    <p className="text-xs mt-1 tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace", color: EB, letterSpacing: "0.12em" }}>{person.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: TS, lineHeight: 1.82 }}>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section ref={secRef("certifications")} style={{ background: HF, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`ab-reveal ${vis("certifications") ? "vis" : ""} mb-12`}>
            <p className="text-xs tracking-[0.24em] uppercase mb-4" style={{ color: FC }}>Standards & Certifications</p>
            <h2 className="font-light leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4vw,3rem)", color: TW }}>
              Verified at Every Stage.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map((c, ci) => (
              <div key={c.name}
                className={`ab-reveal ab-cert-card ${vis("certifications") ? "vis" : ""}`}
                style={{ transitionDelay: `${ci * 0.08}s`, padding: "28px 28px", background: "rgba(253,251,247,0.05)", border: "1px solid rgba(253,251,247,0.12)", borderLeft: `2px solid ${EB}` }}>
                <p className="font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: TW }}>{c.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: TWS, lineHeight: 1.75 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTATION SECTION — HIGH CONTRAST & VISUAL BALANCE ── */}
      <section style={{ position: "relative", minHeight: 450, padding: "100px 2rem", display: "flex", alignItems: "center", justifyContent: "center", background: "#0F0C0A", overflow: "hidden" }}>
        {/* Background image with high-contrast darkening */}
        <div className="absolute inset-0">
          <img loading="lazy"
            src={u("1549179228-4bc1e862c171", 1920, 1080)}
            alt="Ethiopian highland forest coffee origin"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(1.1)", transform: `translateY(${scrollY * 0.04}px)` }} />
        </div>
        {/* Dual overlay gradients for total contrast and warm lighting */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,12,10,0.88) 0%, rgba(28,43,34,0.78) 50%, rgba(15,12,10,0.92) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(184,134,11,0.16) 0%, transparent 70%)" }} />

        {/* Quotation text container */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4.5rem", color: "#B8860B", lineHeight: 0.4, marginBottom: 20, userSelect: "none" }}>“</div>
          <blockquote className="italic font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#FDFBF7", lineHeight: 1.35, textShadow: "0 4px 20px rgba(0,0,0,0.7)" }}>
            "Great coffee is not grown in a factory. It is discovered in a forest, nurtured by a family, and earned through trust."
          </blockquote>
          <p className="text-xs mt-8 tracking-[0.24em] uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FF9E1B" }}>
            Tadesse Bekele · Founder, Flavor Coffee PLC
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={secRef("cta")} style={{ background: WI, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`ab-reveal ${vis("cta") ? "vis" : ""} relative overflow-hidden rounded-sm p-12 md:p-16`}
            style={{ background: "#1C2B22", border: "1px solid rgba(184,134,11,0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
            {/* topographic overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
              {[60, 100, 140, 180, 220, 260].map(y => (
                <path key={y} d={`M0 ${y} Q100 ${y - 12} 200 ${y + 8} Q300 ${y - 6} 400 ${y + 10} Q500 ${y - 8} 600 ${y + 6} Q700 ${y - 10} 800 ${y + 4}`} fill="none" stroke="#B8860B" strokeWidth="0.8" />
              ))}
            </svg>
            <div className="relative z-10 text-center">
              <p className="text-xs tracking-[0.24em] uppercase mb-5 font-semibold" style={{ color: "#FF9E1B" }}>Begin the Conversation</p>
              <h2 className="font-light leading-tight mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#FDFBF7" }}>
                Partner with Ethiopia's<br />Premier Specialty Exporter.
              </h2>
              <p className="text-sm mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(253,251,247,0.88)", lineHeight: 1.9 }}>
                Whether you need traceable single-origin green coffee, contract roasting, or a private label program — our team is ready to build something lasting with you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}
                  className="px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wide"
                  style={{ background: "#C85227", color: "#FDFBF7", border: "none", cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(200,82,39,0.4)`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                  Contact Our Export Team
                </button>
                <button onClick={() => { setPage("gallery"); window.scrollTo({ top: 0 }); }}
                  className="px-8 py-3.5 rounded-sm text-sm font-medium border"
                  style={{ borderColor: "rgba(253,251,247,0.35)", color: "#FDFBF7", background: "rgba(253,251,247,0.06)", cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#B8860B"; (e.currentTarget as HTMLElement).style.color = "#FF9E1B"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(253,251,247,0.35)"; (e.currentTarget as HTMLElement).style.color = "#FDFBF7"; }}>
                  View the Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
function useAnimatedNumber(target: number, duration = 300) {
  const [val, setVal] = useState(target);
  const prevTarget = useRef(target);
  const startVal = useRef(val);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (prevTarget.current !== target) {
      startVal.current = val;
      prevTarget.current = target;
      startTime.current = performance.now();

      let animId: number;
      const step = (now: number) => {
        const elapsed = now - (startTime.current || now);
        const progress = Math.min(1, elapsed / duration);
        const current = Math.round(startVal.current + (target - startVal.current) * progress);
        setVal(current);
        if (progress < 1) {
          animId = requestAnimationFrame(step);
        }
      };
      animId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animId);
    }
  }, [target, duration]);

  return val;
}

function OriginsPage({ setPage, targetRegion, onRegionReached }: { setPage: (p: Page) => void; targetRegion?: string | null; onRegionReached?: () => void }) {
  // ── palette
  const WI = "var(--bg-main)"; const PC = "var(--bg-surface)"; const AE = "var(--text-main)";
  const HF = "var(--bg-dark-section)"; const FC = "var(--primary)"; const EB = "var(--accent)";
  const SB = "rgba(184,134,11,0.08)"; // Accent tint
  const CD = "var(--card-bg)"; const CB = "var(--card-border)";
  const TS = "var(--text-sub)"; const TM = "var(--text-mute)";
  const TW = "var(--text-on-dark, #FDFBF7)"; const TWS = "var(--text-on-dark-sub, rgba(253,251,247,0.78))";

  // ── state
  const scrollY = useScrollY();
  const [selectedOriginId, setSelectedOriginId] = useState<string>(targetRegion || "yirg");
  const [activeRegion, setActiveRegion]       = useState<string | null>(null);
  const [hovFlavor,    setHovFlavor]          = useState<string | null>(null);
  const [hovMatrixCol, setHovMatrixCol]       = useState<string | null>(null);
  const [altitude,     setAltitude]           = useState(1900);
  const [rainfall,     setRainfall]           = useState<"wet"|"dry">("wet");
  const [soilRich,     setSoilRich]           = useState(true);
  const [processMode,  setProcessMode]        = useState<"washed"|"natural"|"anaerobic">("washed");
  const [heroReady,    setHeroReady]          = useState(false);
  const [sectVis,      setSectVis]            = useState<Record<string,boolean>>({});
  const [flavorSel,    setFlavorSel]          = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const selectedOrigin = COFFEE_ORIGINS_DATA.find(o => o.id === selectedOriginId) || COFFEE_ORIGINS_DATA[0];
  const REGIONS = COFFEE_ORIGINS_DATA;

  const totalH = typeof document !== "undefined"
    ? (document.documentElement.scrollHeight - window.innerHeight) || 1
    : 1;
  const S = Math.min(1, scrollY / totalH);

  useEffect(() => { setTimeout(() => setHeroReady(true), 400); }, []);

  useEffect(() => {
    if (!targetRegion) return;
    setSelectedOriginId(targetRegion);
    const el = document.getElementById("climate");
    if (el) {
      setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }); onRegionReached?.(); }, 500);
    }
  }, [targetRegion]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    Object.keys(sectionRefs.current).forEach(key => {
      const el = sectionRefs.current[key];
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setSectVis(prev => ({ ...prev, [key]: true }));
      }, { threshold: 0.12 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const secRef = (key: string) => (el: HTMLElement | null) => { sectionRefs.current[key] = el; };
  const vis = (key: string) => sectVis[key] ?? false;

  // ── flavor explorer data
  const ORIGINS_FE = [
    { id:"guji",        label:"Guji",        sca:"89.5", notes:["Wild Blueberry","Jasmine","Bergamot","Peach"],          flavors:["Berry","Floral"] },
    { id:"yirgacheffe", label:"Yirgacheffe", sca:"91.0", notes:["Tea Flowers","Lemon Blossom","Wild Honey","Bergamot"],   flavors:["Floral","Citrus"] },
    { id:"sidama",      label:"Sidama",      sca:"88.75",notes:["Dark Chocolate","Dried Apricot","Brown Sugar","Spice"],  flavors:["Chocolate","Sweet Spice"] },
    { id:"harrar",      label:"Harrar",      sca:"87.5", notes:["Blackberry Wine","Dark Cocoa","Cardamom","Dried Fig"],   flavors:["Berry","Wine & Ferment","Chocolate"] },
    { id:"jimma",       label:"Jimma",       sca:"84.5", notes:["Dark Chocolate","Cardamom","Forest Floor","Molasses"],   flavors:["Spice","Chocolate","Earth"] },
    { id:"limu",        label:"Limu",        sca:"88.0", notes:["Sweet Spice","Wild Honey","Nectarine","Creamy Body"],    flavors:["Sweet Spice","Citrus"] },
  ];
  const WHEEL_NODES_FE = [
    { id:"Berry",          color:"#9B2335" },
    { id:"Floral",         color:"#A084CA" },
    { id:"Citrus",         color:"#E8A838" },
    { id:"Chocolate",      color:"#5C3317" },
    { id:"Wine & Ferment", color:"#722F37" },
    { id:"Sweet Spice",    color:"#C8702A" },
  ];

  // ── derived terroir science values
  const altFraction = (altitude - 1400) / 1000; // 0–1
  const density  = Math.round(60 + altFraction * 35 + (soilRich ? 5 : 0));
  const sugarPct = Math.round(14 + altFraction * 8 + (rainfall === "wet" ? 2 : -1));
  const acidity  = Math.round(50 + altFraction * 30 + (processMode === "washed" ? 10 : processMode === "anaerobic" ? -5 : 0));
  const scaScore = Math.round(84 + altFraction * 7 + (soilRich ? 1 : 0) + (rainfall === "wet" ? 1 : 0));
  const complexityTarget = Math.round(altFraction * 60 + (soilRich ? 20 : 0) + (rainfall === "wet" ? 20 : 0));

  // ── animated terroir science values
  const animSugar = useAnimatedNumber(sugarPct);
  const animAcidity = useAnimatedNumber(acidity);
  const animSca = useAnimatedNumber(scaScore);
  const animComplexity = useAnimatedNumber(complexityTarget);

  // ── data (using shared COFFEE_ORIGINS_DATA)

  const FLAVOR_NODES = [
    { id: "floral",    angle: 0,   label: "Floral",       color: "#F8C8D4", sub: "Jasmine · Rose Water · Tea Flower",      region: "Guji & Yirgacheffe",  elev: "1,900m+",     process: "Washed" },
    { id: "berry",     angle: 30,  label: "Berry",        color: "#7B3FA0", sub: "Wild Blueberry · Blackcurrant · Cherry", region: "Guji Natural",        elev: "2,100m+",     process: "Natural" },
    { id: "citrus",    angle: 60,  label: "Citrus",       color: "#F6C833", sub: "Lemon Verbena · Bergamot · Grapefruit",  region: "Yirgacheffe",         elev: "1,900–2,200m", process: "Washed" },
    { id: "stone",     angle: 90,  label: "Stone Fruit",  color: "#E8906A", sub: "Peach · Apricot · Nectarine",            region: "Guji & Sidama",       elev: "1,700–2,000m", process: "Natural/Honey" },
    { id: "spice",     angle: 120, label: "Spice",        color: "#C85227", sub: "Cardamom · Allspice · Cinnamon",         region: "Sidama & Limu",       elev: "1,500–1,800m", process: "Natural" },
    { id: "winey",     angle: 150, label: "Winey",        color: "#8B1A4A", sub: "Red Wine · Dried Fig · Port",            region: "Harrar",              elev: "1,400–2,000m", process: "Natural" },
    { id: "chocolate", angle: 180, label: "Chocolate",    color: "#4A2810", sub: "Milk Chocolate · Dark Cocoa · Malt",     region: "Sidama & Harrar",     elev: "1,500–1,900m", process: "Dark Roast" },
    { id: "honey",     angle: 210, label: "Honey",        color: "#D4A84B", sub: "Wild Honey · Caramel · Brown Sugar",     region: "Kaffa & Limu",        elev: "1,600–1,900m", process: "Honey" },
    { id: "caramel",   angle: 240, label: "Caramel",      color: "#C47B3E", sub: "Toffee · Butterscotch · Praline",        region: "Sidama Medium Roast", elev: "1,600m+",      process: "Honey/Washed" },
    { id: "herbal",    angle: 270, label: "Herbal",       color: "#5A8A3C", sub: "Wild Herbs · Cedar · Sage",              region: "Kaffa Forest",        elev: "1,500–1,800m", process: "Natural" },
    { id: "nutty",     angle: 300, label: "Nutty",        color: "#8B7355", sub: "Hazelnut · Almond · Walnut",             region: "Harrar Dark",         elev: "1,700m+",      process: "Dark Roast" },
    { id: "sweettea",  angle: 330, label: "Sweet Tea",    color: "#A8D8EA", sub: "White Tea · Earl Grey · Osmanthus",      region: "Yirgacheffe Light",   elev: "2,000m+",      process: "Light Washed" },
  ];

  const MATRIX_DATA = [
    { region: "Guji",       elev: "1,800–2,400m", process: "Natural",       body: "Medium-Full", acidity: "Bright",   sweet: "Very High", sca: "87–92", brew: "Pour-Over / Chemex" },
    { region: "Yirgacheffe",elev: "1,750–2,200m", process: "Washed",        body: "Light-Med",   acidity: "Very High",sweet: "High",      sca: "88–92", brew: "Pour-Over / V60" },
    { region: "Sidama",     elev: "1,500–2,200m", process: "Washed / Honey",body: "Medium",      acidity: "Medium",   sweet: "High",      sca: "86–91", brew: "AeroPress / Drip" },
    { region: "Harrar",     elev: "1,400–2,100m", process: "Natural",       body: "Full",        acidity: "Low-Med",  sweet: "Medium",    sca: "85–89", brew: "French Press / Espresso" },
    { region: "Limu",       elev: "1,400–2,000m", process: "Washed",        body: "Light-Med",   acidity: "Medium",   sweet: "Med-High",  sca: "85–89", brew: "Pour-Over / Chemex" },
  ];

  const FARMERS = [
    { name: "Abebe W.", role: "Smallholder Farmer · Guji Zone", quote: "My grandfather planted these trees. I tend them. My children will harvest them. Coffee here is not a crop — it is a relationship.", img: "1597816760638-406d7271105c" },
    { name: "Tigist A.", role: "Washing Station Supervisor · Yirgacheffe", quote: "Every cherry we sort is someone's livelihood. We owe precision to the farmer, to the bean, and to the cup it becomes.", img: "1670758611084-e216510c5433" },
    { name: "Mulugeta B.", role: "Forest Garden Keeper · Kaffa Biosphere", quote: "In Kaffa, we say the forest teaches the coffee how to grow. We only listen and protect what it already knows.", img: "1642613630414-1d9938f4fe02" },
  ];

  // Flavor wheel geometry
  const wheelR = 220;
  const cx = 260, cy = 260;
  const nodeR = 30;
  const flavorNodes = FLAVOR_NODES.map(f => {
    const rad = (f.angle - 90) * Math.PI / 180;
    return { ...f, nx: cx + wheelR * Math.cos(rad), ny: cy + wheelR * Math.sin(rad) };
  });
  const activeFlavorData = flavorNodes.find(f => f.id === hovFlavor);

  return (
    <div style={{ background: WI, color: AE, fontFamily: `'Plus Jakarta Sans', sans-serif`, overflowX: "hidden", transition: "background-color 0.35s ease, color 0.35s ease" }}>
      <style>{`
        @keyframes opFadeUp  { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes opDrift   { 0%,100% { transform:translateX(0) translateY(0); } 33% { transform:translateX(12px) translateY(-8px); } 66% { transform:translateX(-8px) translateY(6px); } }
        @keyframes opPulse   { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.55); } }
        @keyframes opPulseRing { 0% { transform:scale(1); opacity:0.8; } 100% { transform:scale(1.8); opacity:0; } }
        @keyframes opCardSlideIn { from { opacity:0; transform:translateY(18px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes opSway    { 0%,100% { transform:rotate(-1.5deg); } 50% { transform:rotate(1.5deg); } }
        @keyframes opSun     { 0%,100% { opacity:0.18; transform:scale(1); } 50% { opacity:0.28; transform:scale(1.06); } }
        @keyframes opSlideR  { from { transform:translateX(100%); } to { transform:translateX(0); } }
        @keyframes opGlow    { 0%,100% { box-shadow:0 0 0 rgba(200,82,39,0); } 50% { box-shadow:0 0 20px rgba(200,82,39,0.5); } }
        .op-reveal { opacity:0; transform:translateY(30px); transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .op-reveal.vis { opacity:1; transform:translateY(0); }
        .op-mag { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease; }
        .op-mag:hover { transform:translateY(-2px) scale(1.015); box-shadow:0 14px 36px rgba(200,82,39,0.38); }
        .op-pin { cursor:pointer; }
        .op-pin .ring { animation: opPulse 2.6s ease-in-out infinite; }
        .op-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .op-card:hover { transform:translateY(-5px); box-shadow:0 24px 48px rgba(15,12,10,0.18); }
        .op-farmer-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease; }
        .op-farmer-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(15,12,10,0.22); border-color: rgba(200,82,39,0.4) !important; }
        .op-matrix-tr { transition: background-color 0.25s ease; }
        .op-matrix-tr:hover { background-color: rgba(255, 255, 255, 0.05) !important; }
        .op-matrix-td { transition: background-color 0.25s ease; }
        .op-matrix-td.col-active { background-color: rgba(200, 82, 39, 0.12) !important; }
        .terroir-card { cursor: pointer; transition: all 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease; }
        .terroir-card:hover { transform: translateY(-6px) scale(1.012); box-shadow: 0 24px 56px rgba(200,82,39,0.22), 0 0 0 1px rgba(184,134,11,0.28); border-color: rgba(184,134,11,0.4) !important; }
        .terroir-card:hover h3 { color: #B8860B !important; }
        .terroir-card:hover .terroir-num { transform: scale(1.3); color: #FF9E1B !important; }
        .terroir-num { transition: all 0.4s ease; display: inline-block; }
        input[type=range] { -webkit-appearance:none; appearance:none; height:4px; border-radius:2px; outline:none; cursor:ew-resize; transition: background 0.15s ease; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:#C85227; cursor:pointer; box-shadow:0 0 10px rgba(200,82,39,0.6); transition: transform 0.15s ease, background-color 0.15s ease; }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.18); background:#FF9E1B; }
      `}</style>

      {/* ══ 01 HERO — THE BIRTHPLACE ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: "#0D0A08" }}>
        {/* Parallax sky */}
        <div className="absolute inset-0 scale-110" style={{ transform: `scale(1.1) translateY(${scrollY * 0.3}px)` }}>
          <img loading="lazy" src={u("1774284597431-49445d200674", 1920, 1080)} alt="Ethiopian highland dawn"
            className="w-full h-full object-cover" style={{ filter: "brightness(0.3) saturate(1.1) hue-rotate(8deg)" }} />
        </div>
        {/* Sun pulse */}
        <div className="absolute" style={{ top: "18%", right: "30%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,180,60,0.35) 0%, transparent 70%)", animation: "opSun 6s ease-in-out infinite", filter: "blur(20px)" }} />
        {/* Mist layers */}
        {[0,1,2].map(i => (
          <div key={i} className="absolute left-0 right-0 pointer-events-none"
            style={{ bottom: `${12 + i*10}%`, height: 80, background: `linear-gradient(to right, transparent, rgba(253,251,247,${0.04 + i*0.02}), transparent)`, filter: "blur(12px)", animation: `opDrift ${8 + i*3}s ${i*2}s ease-in-out infinite` }} />
        ))}
        {/* Wild branch silhouette */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: "38%", overflow: "hidden" }}>
          <svg viewBox="0 0 1440 280" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ opacity: heroReady ? 0.18 : 0, transition: "opacity 2.4s 1s ease" }}>
            <path d="M0 200 Q120 160 240 180 Q360 200 480 150 Q600 100 720 140 Q840 180 960 130 Q1080 80 1200 110 Q1320 140 1440 100 L1440 280 L0 280Z" fill="#0D0A08" />
            {[[220,178],[300,132],[480,148],[560,102],[740,138],[820,92],[1020,128],[1100,82]].map(([bx,by],i) => (
              <g key={i}>
                <line x1={bx} y1={by} x2={bx+(i%2?-30:30)} y2={by-45} stroke="rgba(253,251,247,0.22)" strokeWidth="1.2" />
                <circle cx={bx+(i%2?-30:30)} cy={by-50} r="4.5" fill={FC} opacity="0.65" style={{ animation: `opSway ${3+i*0.4}s ${i*0.3}s ease-in-out infinite` }} />
              </g>
            ))}
          </svg>
        </div>
        {/* Atmospheric gradient */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #0D0A08 0%, rgba(15,12,10,0.4) 45%, transparent 70%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(130deg, rgba(15,12,10,0.65) 0%, transparent 55%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-16 pb-20">
          <div style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.8s 0.5s ease" }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 border rounded-sm"
              style={{ borderColor: `${EB}44`, background: "rgba(184,134,11,0.09)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: EB }} />
              <span className="text-xs tracking-[0.25em] uppercase" style={{ color: EB }}>Chapter Three — Origins &amp; Terroir</span>
            </div>
          </div>
          <h1 className="font-light leading-[1.06] mb-6"
            style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.8rem, 7vw, 5.6rem)", color: TW, maxWidth: 820, opacity: heroReady ? 1 : 0, transition: "opacity 0.9s 0.7s ease, transform 0.9s 0.7s ease", transform: heroReady ? "none" : "translateY(20px)" }}>
            One Country.<br /><em style={{ color: `${EB}ee` }}>Infinite Expressions.</em>
          </h1>
          <p className="max-w-2xl leading-relaxed mb-10" style={{ color: TWS, fontSize: "1.05rem", lineHeight: 1.88, opacity: heroReady ? 1 : 0, transition: "opacity 0.9s 1s ease" }}>
            Every Ethiopian region grows coffee differently. Altitude, rainfall, volcanic soil, heirloom genetics, and generations of farming tradition combine to produce flavor profiles found nowhere else on Earth.
          </p>
          <div className="flex items-center gap-3" style={{ opacity: heroReady ? 0.5 : 0, transition: "opacity 0.8s 1.4s ease" }}>
            <div className="w-8 h-px" style={{ background: `linear-gradient(to right, ${EB}, transparent)` }} />
            <span className="text-xs tracking-[0.22em] uppercase" style={{ color: EB }}>Scroll to explore the atlas</span>
          </div>
        </div>

        {/* Scroll progress ticker */}
        <div className="absolute bottom-8 right-8 z-10 text-right">
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(253,251,247,0.45)" }}>{Math.round(S * 100)}%</p>
          <div className="w-12 h-px mt-1 ml-auto" style={{ background: `linear-gradient(to right, transparent, ${FC})`, transform: `scaleX(${S})`, transformOrigin: "right" }} />
        </div>
      </section>

      {/* ══ 02 THE LANDSCAPE — WHY ETHIOPIA? ══════════════════════════════════════ */}
      <section ref={secRef("landscape")} style={{ background: WI, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
            <div className={`op-reveal ${vis("landscape") ? "vis" : ""}`}>
              <p className="text-xs tracking-[0.22em] uppercase mb-4 font-medium" style={{ color: FC }}>02 · The Landscape</p>
              <h2 className="font-light leading-tight mb-8" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", color: AE }}>
                Coffee Was Born Here.<br />In Wild Shade Canopies,<br />Not Cultivated Plantations.
              </h2>
              {[
                ["10,000+ Wild Landraces", "Ethiopia harbors over 10,000 uncatalogued wild Arabica varieties — more genetic coffee diversity than the rest of the world combined. Each landrace carries a unique chemical signature shaped by millennia of natural selection."],
                ["Ancient Forest Ecosystems", "Wild Arabica evolved under dense forest canopy shade in Kaffa and Bale — a radically different stress environment from plantation monoculture. Forest shade forces slow cherry maturation, concentrating sugars and aromatic precursors."],
                ["High-Altitude Volcanic Soils", "Ethiopian highlands sit atop some of the world's most mineral-rich volcanic nitisol soils — formed from ancient lava flows and naturally rich in iron, phosphorus, and nitrogen that feed extraordinary complexity."],
                ["UNESCO Cultural Coffee Heritage", "The coffee ceremony — Buna — is listed as UNESCO Intangible Cultural Heritage. For Ethiopian farming communities, coffee is not commerce. It is cosmology, community, and daily ritual."],
              ].map(([title, body], i) => (
                <div key={i} className={`op-reveal ${vis("landscape") ? "vis" : ""} flex gap-5 mb-6`}
                  style={{ transitionDelay: `${i * 150}ms` }}>
                  <span className="text-xs font-medium shrink-0 mt-1" style={{ color: FC }}>0{i+1}</span>
                  <div>
                    <p className="font-medium mb-1" style={{ color: AE }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: TS, lineHeight: 1.88 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium green beans photograph */}
            <div className={`op-reveal ${vis("landscape") ? "vis" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "3/4", background: HF }}>
                <img
                  src={u("1765144815892-1925a0def4a2", 1200, 1600)}
                  alt="Premium raw Ethiopian green Arabica coffee beans macro photograph"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.88) saturate(1.1)" }}
                />
                {/* Subtle dark vignette */}
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,8,6,0.45) 100%)" }} />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(to top, rgba(10,8,6,0.78) 0%, transparent 100%)" }}>
                  <p className="text-xs italic" style={{ fontFamily: `'Cormorant Garamond', serif`, color: "rgba(253,251,247,0.72)", lineHeight: 1.7 }}>
                    Grade 1 raw Arabica — the beginning of the journey from forest floor to cup.
                  </p>
                  <p className="text-xs mt-1" style={{ color: `${FC}cc`, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Ethiopian Highlands · Pre-export green
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 THE CLIMATE — GEOGRAPHICALLY ACCURATE ETHIOPIA ATLAS MAP ═══════════ */}
      <section ref={secRef("climate")} id="climate" style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`op-reveal ${vis("climate") ? "vis" : ""} mb-12`}>
            <p className="text-xs tracking-[0.24em] uppercase mb-4 font-semibold" style={{ color: FC }}>03 · Interactive Coffee Origin Atlas</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: AE }}>
              Seven Micro-Climates.<br /><em style={{ color: EB }}>Seven Flavor Worlds.</em>
            </h2>
            <p className="text-sm max-w-xl" style={{ color: TS, lineHeight: 1.9 }}>
              Select any regional origin marker on the official map of Ethiopia below to inspect its elevation, volcanic soil profile, growing micro-climate, and Q-graded sensory characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            {/* Geographically Authentic Ethiopia SVG Map Container (7 Columns) */}
            <div className={`op-reveal ${vis("climate") ? "vis" : ""} lg:col-span-7 rounded-sm overflow-hidden shadow-2xl relative`}
              style={{ background: "#16100B", border: "1px solid rgba(184,134,11,0.25)", transitionDelay: "0.1s" }}>
              <div className="relative w-full" style={{ paddingBottom: "88%" }}>
                <svg viewBox="0 0 900 810" className="absolute inset-0 w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
                  {/* Map background grid */}
                  <rect width="100%" height="100%" fill="#16100B"/>
                  
                  {/* Geographically Authentic Ethiopia Boundary Path */}
                  <g id="ethiopia-land">
                    <path d="M 805.26,485.88 L 684.15,607.43 L 628.32,609.22 L 590.13,637.77 L 562.65,638.52 L 550.93,651.28 L 521.65,651.28 L 504.36,637.59 L 465.21,654.53 L 452.55,671.41 L 423.96,668.22 L 414.48,663.55 L 404.44,664.67 L 390.9,664.26 L 336.65,629.86 L 306.82,629.86 L 292.18,616.53 L 292.18,593.8 L 269.91,587.01 L 244.59,542.93 L 225.01,533.54 L 217.5,517.35 L 195.78,497.61 L 169.46,494.71 L 184.06,471.64 L 206.81,470.64 L 213.21,458.28 L 212.64,421.87 L 225.32,379.48 L 245.62,368.14 L 249.93,351.58 L 268.31,320.64 L 294.16,300.58 L 311.58,260.69 L 318.41,225.9 L 368.3,234.37 L 381.69,204.14 L 407.7,222.53 L 432.83,213.0 L 443.17,221.47 L 472.55,221.96 L 509.85,238.2 L 520.94,252.18 L 539.94,265.19 L 557.56,288.93 L 572.21,302.04 L 557.14,319.95 L 542.65,338.94 L 545.98,350.12 L 546.67,362.44 L 570.61,363.11 L 580.93,360.24 L 590.44,367.46 L 581.09,381.81 L 596.92,404.11 L 612.73,423.61 L 629.09,438.07 L 769.21,486.13 L 805.26,485.88 Z" fill="#1C2B22" stroke="#B8860B" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M 318.41,225.9 L 313.85,209.69 L 332.31,150.18 L 336.54,123.26 L 350.03,110.84 L 381.6,104.18 L 403.29,81.07 L 428.17,127.95 L 439.98,165.13 L 463.47,184.86 L 521.97,223.11 L 545.78,246.2 L 569.01,269.57 L 582.41,283.48 L 603.48,295.66 L 590.56,305.56 L 572.21,302.04 L 557.56,288.93 L 539.94,265.19 L 520.94,252.18 L 509.85,238.2 L 472.55,221.96 L 443.17,221.47 L 432.83,213.0 L 407.7,222.53 L 381.69,204.14 L 368.3,234.37 L 318.41,225.9 Z" fill="none" stroke="#8C8579" strokeWidth="1" opacity="0.35" strokeLinejoin="round"/>
                  </g>

                  {/* Neighbor country labels */}
                  <g fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="1.5">
                    <text x="110" y="280" fill="#8C8579" fontSize="12" textAnchor="middle" opacity="0.6">SUDAN</text>
                    <text x="120" y="550" fill="#8C8579" fontSize="11" textAnchor="middle" opacity="0.6">S. SUDAN</text>
                    <text x="420" y="165" fill="#8C8579" fontSize="12" textAnchor="middle" opacity="0.6">ERITREA</text>
                    <text x="615" y="335" fill="#8C8579" fontSize="10" textAnchor="middle" opacity="0.6">DJIBOUTI</text>
                    <text x="790" y="570" fill="#8C8579" fontSize="12" textAnchor="middle" opacity="0.6">SOMALIA</text>
                    <text x="320" y="710" fill="#8C8579" fontSize="12" textAnchor="middle" opacity="0.6">KENYA</text>
                  </g>

                  {/* Addis Ababa Landmark */}
                  <g transform="translate(417, 444)">
                    <rect x="-4" y="-4" width="8" height="8" fill="#B8860B" stroke="#FDFBF7" strokeWidth="1" transform="rotate(45)"/>
                    <text x="12" y="4" fill="#FDFBF7" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="600">Addis Ababa (Headquarters)</text>
                  </g>

                  {/* Map Header Title */}
                  <text x="450" y="45" fill="#FF9E1B" fontFamily="'Cormorant Garamond', serif" fontSize="22" letterSpacing="4" textAnchor="middle" fontWeight="300">ETHIOPIA SPECIALTY COFFEE ATLAS</text>

                  {/* Interactive Pins */}
                  {COFFEE_ORIGINS_DATA.map((pin) => {
                    const isSelected = selectedOrigin.id === pin.id;
                    const isHov = activeRegion === pin.id;
                    return (
                      <g key={pin.id} style={{ cursor: "pointer" }}
                        onClick={() => setSelectedOriginId(pin.id)}
                        onMouseEnter={() => setActiveRegion(pin.id)}
                        onMouseLeave={() => setActiveRegion(null)}>
                        {/* Animated Keyframe Pulse Ring */}
                        <circle cx={pin.cx} cy={pin.cy} r="18" fill="none"
                          stroke={isSelected ? "#FF9E1B" : "#C85227"} strokeWidth={isSelected ? "2" : "1"}
                          style={{
                            transformOrigin: `${pin.cx}px ${pin.cy}px`,
                            animation: "opPulseRing 2s cubic-bezier(0, 0, 0.2, 1) infinite"
                          }} />
                        {/* Outer Ring */}
                        <circle cx={pin.cx} cy={pin.cy} r={isSelected ? "18" : isHov ? "15" : "11"}
                          fill="none" stroke={isSelected ? "#FF9E1B" : "#C85227"}
                          strokeWidth={isSelected ? "2" : "1"}
                          opacity={isSelected ? "0.9" : isHov ? "0.7" : "0.35"}
                          style={{ transition: "all 0.3s ease" }} />
                        {/* Glow Fill */}
                        <circle cx={pin.cx} cy={pin.cy} r={isSelected ? "9" : isHov ? "7" : "5.5"}
                          fill={isSelected ? "#FF9E1B" : isHov ? "#C85227" : "#B8860B"}
                          stroke="#16100B" strokeWidth="1.5"
                          style={{ transition: "all 0.3s ease", filter: isSelected || isHov ? "drop-shadow(0 0 8px #FF9E1B)" : "none" }} />
                        {/* Label */}
                        <text x={pin.cx + 14} y={pin.cy + 4}
                          fill={isSelected ? "#FF9E1B" : isHov ? "#FDFBF7" : "rgba(253,251,247,0.85)"}
                          fontFamily="'Plus Jakarta Sans', sans-serif"
                          fontSize={isSelected ? "14" : "12"}
                          fontWeight={isSelected ? "700" : "600"}
                          style={{ transition: "all 0.2s ease" }}>
                          {pin.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Map Footer Legend */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-sm"
                  style={{ background: "rgba(15,12,10,0.88)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,134,11,0.25)" }}>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF9E1B" }}/>
                    <span className="text-xs tracking-wider uppercase font-semibold" style={{ color: "#FF9E1B", fontSize: 10 }}>Active Coffee Origin</span>
                  </div>
                  <span className="text-xs" style={{ color: "rgba(253,251,247,0.5)", fontSize: 10 }}>Click marker to inspect terroir</span>
                </div>
              </div>
            </div>

            {/* Selected Origin Detail Card (5 Columns) with smooth animated entrance */}
            <div key={selectedOrigin.id} className={`op-reveal ${vis("climate") ? "vis" : ""} lg:col-span-5 rounded-sm overflow-hidden shadow-2xl relative flex flex-col`}
              style={{ background: "#1C2B22", border: "1px solid rgba(184,134,11,0.3)", animation: "opCardSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both", minHeight: 520 }}>
              
              {/* Origin Photo Banner */}
              <div className="relative" style={{ height: 210, overflow: "hidden" }}>
                <img src={u(selectedOrigin.img, 800, 500)} alt={selectedOrigin.label}
                  className="w-full h-full object-cover" style={{ filter: "brightness(0.72) saturate(1.15)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1C2B22 0%, transparent 60%)" }} />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-sm text-xs font-semibold" style={{ background: "rgba(15,12,10,0.82)", color: "#FF9E1B", border: "1px solid rgba(184,134,11,0.3)", backdropFilter: "blur(6px)" }}>
                    {selectedOrigin.grade}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-sm text-xs font-bold" style={{ background: "#C85227", color: "#FDFBF7" }}>
                    SCA {selectedOrigin.sca}
                  </span>
                </div>

                <div className="absolute bottom-3 left-6">
                  <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: "#FF9E1B" }}>{selectedOrigin.regionName}</p>
                  <h3 className="font-light text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FDFBF7" }}>{selectedOrigin.label}</h3>
                </div>
              </div>

              {/* Origin Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(253,251,247,0.85)", lineHeight: 1.85 }}>
                  {selectedOrigin.body}
                </p>

                {/* Terroir Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[["Elevation", selectedOrigin.elev], ["Rainfall", selectedOrigin.rain], ["Soil Profile", selectedOrigin.soil], ["Micro-Climate", selectedOrigin.climate]].map(([k, v]) => (
                    <div key={k} className="p-3 rounded-sm border" style={{ borderColor: "rgba(253,251,247,0.1)", background: "rgba(253,251,247,0.04)" }}>
                      <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: "rgba(253,251,247,0.45)", fontSize: 9 }}>{k}</p>
                      <p className="text-xs font-semibold" style={{ color: "#FDFBF7" }}>{v}</p>
                    </div>
                  ))}
                </div>

                {/* Flavor Notes */}
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase mb-2.5 font-semibold" style={{ color: "#B8860B", fontSize: 10 }}>Key Sensory Notes</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrigin.notes.map(n => (
                      <span key={n} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: "rgba(200,82,39,0.45)", color: "#FDFBF7", background: "rgba(200,82,39,0.12)" }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button to scroll down to chapter */}
                <button onClick={() => {
                  const el = document.getElementById(selectedOrigin.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }} className="w-full py-3 rounded-sm text-sm font-semibold tracking-wide border transition-all duration-300"
                  style={{ borderColor: "#B8860B", color: "#FF9E1B", background: "rgba(184,134,11,0.08)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C85227"; (e.currentTarget as HTMLElement).style.color = "#FDFBF7"; (e.currentTarget as HTMLElement).style.borderColor = "#C85227"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(184,134,11,0.08)"; (e.currentTarget as HTMLElement).style.color = "#FF9E1B"; (e.currentTarget as HTMLElement).style.borderColor = "#B8860B"; }}>
                  Explore {selectedOrigin.label} Region Chapter ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 THE REGIONS — Cinematic Chapters ═══════════════════════════════════ */}
      <section style={{ background: WI }}>
        {REGIONS.map((r, i) => (
          <div key={r.id} id={r.id} className="relative overflow-hidden"
            style={{ minHeight: "70vh", display: "flex", alignItems: "center", background: i % 2 === 0 ? WI : PC }}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-20 gap-12 ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}
              style={{ direction: i % 2 !== 0 ? "rtl" : "ltr" }}>
              {/* Image */}
              <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/3", direction: "ltr" }}>
                <img loading="lazy" src={u(r.img, 900, 675)} alt={r.label}
                  className="w-full h-full object-cover" style={{ filter: "brightness(0.82) saturate(1.15)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.65) 0%, transparent 50%)" }} />
                {/* Grade badge */}
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-sm border text-xs" style={{ background: "rgba(15,12,10,0.72)", borderColor: `${EB}44`, color: EB, backdropFilter: "blur(8px)" }}>
                  {r.grade}
                </div>
                {/* SCA badge */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs" style={{ background: "rgba(15,12,10,0.72)", borderColor: `${FC}44`, color: FC, backdropFilter: "blur(8px)" }}>
                  <Star size={10} fill={FC} color={FC} /> SCA {r.sca}
                </div>
                {/* Notes at bottom */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex flex-wrap gap-2">
                    {r.notes.map(n => (
                      <span key={n} className="px-2 py-0.5 rounded-full text-xs border" style={{ borderColor: "rgba(253,251,247,0.2)", color: "rgba(253,251,247,0.88)", background: "rgba(15,12,10,0.5)" }}>{n}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Content */}
              <div style={{ direction: "ltr" }} className="flex flex-col justify-center">
                <p className="text-xs font-medium tracking-[0.22em] uppercase mb-4" style={{ color: FC }}>{String(i+1).padStart(2,"0")} · {r.regionName || r.label}</p>
                <h2 className="font-light leading-tight mb-5" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2rem, 4vw, 3rem)", color: AE }}>
                  {r.label}.
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: TS, lineHeight: 1.92 }}>{r.body}</p>
                {/* Terrain metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[["Elevation", r.elev], ["Rainfall", r.rain], ["Soil", r.soil], ["Process", r.process]].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-xs mb-0.5" style={{ color: TM }}>{k}</p>
                      <p className="text-xs font-medium" style={{ color: AE }}>{v}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setSelectedOriginId(r.id); const el = document.getElementById("climate"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className="op-mag inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm border w-fit"
                  style={{ borderColor: `${FC}44`, color: FC }}>
                  Inspect Terroir on Atlas Map ↑ <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ══ 05 THE FARMERS — Human Documentary ════════════════════════════════════ */}
      <section ref={secRef("farmers")} style={{ background: WI, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`op-reveal ${vis("farmers") ? "vis" : ""} mb-14`}>
            <p className="text-xs tracking-[0.22em] uppercase mb-4 font-medium" style={{ color: FC }}>05 · The Farmers</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: AE }}>
              Stewardship Over Centuries.
            </h2>
            <p className="text-sm max-w-xl" style={{ color: TS, lineHeight: 1.9 }}>
              Every cup begins not with a machine, but with a hand — carefully sorting cherries at dawn, turning beans on raised beds under the afternoon sun, or reading the sky for signs of the next rain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FARMERS.map((f, i) => (
              <div key={i} className={`op-reveal ${vis("farmers") ? "vis" : ""} op-farmer-card group p-3 rounded-sm border`}
                style={{ transitionDelay: `${i * 0.12}s`, borderColor: CB, background: CD }}>
                <div className="relative rounded-sm overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
                  <img loading="lazy" src={u(f.img, 600, 800)} alt={f.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    style={{ filter: "brightness(0.78) saturate(1.05)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,10,0.85) 0%, transparent 45%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Quote size={16} className="mb-3" style={{ color: `${FC}88` }} />
                    <p className="font-light italic leading-relaxed text-sm" style={{ fontFamily: `'Cormorant Garamond', serif`, color: TW, lineHeight: 1.75 }}>
                      &ldquo;{f.quote}&rdquo;
                    </p>
                  </div>
                </div>
                <p className="font-medium px-1" style={{ color: AE }}>{f.name}</p>
                <p className="text-xs mt-0.5 px-1 pb-1" style={{ color: FC }}>{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ JIMMA — COFFEE ORIGIN ═══════════════════════════════════════════ */}
      <section style={{ background: "#1C2B22", padding: "100px 0" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-4 sm:px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: "#FF9E1B", textTransform: "uppercase", marginBottom: 16 }}>Origin — Kaffa Zone</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300, color: "#FDFBF7", lineHeight: 1.1, marginBottom: 24 }}>
                Jimma.<br /><em style={{ color: "#FF9E1B" }}>Where Coffee Began.</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(253,251,247,0.7)", marginBottom: 32 }}>
                Jimma, in Kaffa Zone, is considered the birthplace of coffee — the forest origin of Coffea arabica. 
                Wild coffee trees grow in semi-forest conditions, yielding bold, spicy, and deeply earthy cups unlike any other Ethiopian origin.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                {[
                  { label: "Altitude", val: "1,400–1,800m" },
                  { label: "Rainfall", val: "1,800mm/yr" },
                  { label: "Processing", val: "Natural & Washed" },
                  { label: "Profile", val: "Spice · Chocolate · Earth" },
                ].map(item => (
                  <div key={item.label} style={{ borderLeft: "2px solid rgba(200,82,39,0.4)", paddingLeft: 14 }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(253,251,247,0.4)", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#FDFBF7" }}>{item.val}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Dark Chocolate", "Cardamom", "Forest Floor", "Tobacco", "Aged Wood", "Molasses"].map(note => (
                  <span key={note} style={{ padding: "6px 14px", border: "1px solid rgba(200,82,39,0.35)", color: "rgba(253,251,247,0.75)", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em" }}>{note}</span>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img loading="lazy" src={u("1654815439629-5e93cb7f74a1", 800, 1000)} alt="Jimma coffee forest — Kaffa Zone, Ethiopia"
                style={{ width: "100%", height: 500, objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px", background: "rgba(15,12,10,0.75)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: "#FDFBF7" }}>"In Kaffa, the forest is the farm. Coffee grows as nature intended — wild, shaded, ancient."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 06 THE SCIENCE — TERROIR VISUALIZER ════════════════════════════════════ */}
      <section ref={secRef("science")} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`op-reveal ${vis("science") ? "vis" : ""} mb-12`}>
            <p className="text-xs tracking-[0.22em] uppercase mb-4 font-medium" style={{ color: FC }}>06 · The Science</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: AE }}>
              Interactive Terroir Simulator.
            </h2>
            <p className="text-sm max-w-lg" style={{ color: `${AE}77`, lineHeight: 1.9 }}>
              Adjust altitude, rainfall, soil composition, and processing method to see how each variable shapes the final cup chemistry and SCA score potential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10">
            {/* Controls */}
            <div className="space-y-6">
              {/* Altitude */}
              <div className="p-6 rounded-sm border" style={{ background: CD, borderColor: CB }}>
                <div className="flex justify-between mb-3">
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: AE }}>Altitude</p>
                  <p className="text-xs font-medium" style={{ color: FC }}>{altitude.toLocaleString()}m</p>
                </div>
                <input type="range" min="1400" max="2400" value={altitude} onChange={e => setAltitude(+e.target.value)}
                  className="w-full" style={{ background: `linear-gradient(to right, ${FC} ${((altitude-1400)/1000)*100}%, rgba(184,134,11,0.2) ${((altitude-1400)/1000)*100}%)` }} />
                <div className="flex justify-between mt-1">
                  <span className="text-xs" style={{ color: TM }}>1,400m</span>
                  <span className="text-xs" style={{ color: TM }}>2,400m</span>
                </div>
              </div>
              {/* Rainfall toggle */}
              <div className="p-6 rounded-sm border" style={{ background: CD, borderColor: CB }}>
                <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: AE }}>Micro-Climate</p>
                <div className="flex gap-2">
                  {(["wet","dry"] as const).map(r => (
                    <button key={r} onClick={() => setRainfall(r)}
                      className="flex-1 py-2 text-xs rounded-sm border transition-all duration-200 capitalize font-medium"
                      style={{ background: rainfall === r ? FC : "transparent", color: rainfall === r ? "#FFFFFF" : TS, borderColor: rainfall === r ? FC : CB }}>
                      {r === "wet" ? "🌧️ Wet Forest" : "☀️ Dry Highland"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Soil */}
              <div className="p-6 rounded-sm border" style={{ background: CD, borderColor: CB }}>
                <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: AE }}>Soil Composition</p>
                <button onClick={() => setSoilRich(p => !p)}
                  className="w-full py-2.5 text-xs rounded-sm border transition-all duration-200 font-medium"
                  style={{ background: soilRich ? FC : "transparent", color: soilRich ? "#FFFFFF" : TS, borderColor: soilRich ? FC : CB }}>
                  {soilRich ? "✓ Volcanic Nitisol (Rich)" : "Sandy Clay Loam (Basic)"}
                </button>
              </div>
              {/* Processing */}
              <div className="p-6 rounded-sm border" style={{ background: CD, borderColor: CB }}>
                <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: AE }}>Processing Method</p>
                <div className="flex flex-col gap-2">
                  {(["washed","natural","anaerobic"] as const).map(m => (
                    <button key={m} onClick={() => setProcessMode(m)}
                      className="py-2 text-xs rounded-sm border transition-all duration-200 capitalize font-medium"
                      style={{ background: processMode === m ? FC : "transparent", color: processMode === m ? "#FFFFFF" : TS, borderColor: processMode === m ? FC : CB }}>
                      {m === "washed" ? "💧 Washed" : m === "natural" ? "☀️ Sun-Dried Natural" : "⚗️ Anaerobic"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic output */}
            <div className="space-y-6">

              {/* Metrics grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Sugar Conc.", val: `${animSugar}%`, desc: "Brix index", color: "#D4A84B" },
                  { label: "Acidity Index", val: `${animAcidity}`, desc: "Phosphoric pH", color: EB },
                  { label: "SCA Potential", val: `${animSca}+`, desc: "Cup score est.", color: FC },
                  { label: "Complexity", val: `${animComplexity}/100`, desc: "Flavor layers", color: EB },
                ].map(m => (
                  <div key={m.label} className="p-5 rounded-sm border text-center" style={{ background: CD, borderColor: CB }}>
                    <p className="font-light text-3xl mb-1" style={{ fontFamily: `'Cormorant Garamond', serif`, color: m.color, transition: "all 0.3s ease" }}>{m.val}</p>
                    <p className="text-xs font-medium mb-0.5" style={{ color: AE }}>{m.label}</p>
                    <p className="text-xs" style={{ color: TM }}>{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Flavor prediction */}
              <div className="p-6 rounded-sm border" style={{ background: CD, borderColor: CB }}>
                <p className="text-xs font-medium uppercase tracking-wide mb-4" style={{ color: AE }}>Predicted Flavor Profile</p>
                <div className="flex flex-wrap gap-2">
                  {(altitude > 2000 && rainfall === "wet" ? ["Jasmine", "Bergamot", "Lemon Verbena", "Tea Flower"] :
                    altitude > 1800 && processMode === "natural" ? ["Wild Blueberry", "Stone Fruit", "Rose Water", "Honey"] :
                    altitude > 1600 && soilRich ? ["Stone Fruit", "Milk Chocolate", "Caramel", "Spice"] :
                    ["Dark Chocolate", "Dried Fig", "Winey", "Molasses"]
                  ).map(note => (
                    <span key={note} className="px-3 py-1.5 rounded-full border text-xs font-medium" style={{ borderColor: `${FC}55`, color: FC, background: `${FC}12` }}>{note}</span>
                  ))}
                </div>
              </div>

              {/* ── Infographic Data Cards ─────────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Card 1 — Altitude Ranges */}
                <div className="p-5 rounded-sm border" style={{ background: CD, borderColor: CB, borderTop: `2px solid ${EB}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1 L14 14 H2 Z" stroke={EB} strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
                      <line x1="8" y1="6" x2="8" y2="11" stroke={EB} strokeWidth="1" strokeDasharray="1.5 1.5"/>
                    </svg>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: AE }}>Altitude Ranges</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { region: "Guji",        range: "1,800 – 2,400m", width: "100%" },
                      { region: "Yirgacheffe", range: "1,750 – 2,200m", width: "92%"  },
                      { region: "Sidama",      range: "1,500 – 2,200m", width: "88%"  },
                      { region: "Harrar",      range: "1,400 – 2,100m", width: "82%"  },
                      { region: "Kaffa",       range: "1,500 – 1,900m", width: "72%"  },
                    ].map(r => (
                      <div key={r.region}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs font-medium" style={{ color: AE }}>{r.region}</span>
                          <span className="text-xs" style={{ color: TS }}>{r.range}</span>
                        </div>
                        <div className="h-1 rounded-full" style={{ background: `${CB}` }}>
                          <div className="h-full rounded-full" style={{ width: r.width, background: `linear-gradient(to right, ${EB}, ${FC})`, transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mt-3" style={{ color: TM }}>Above 2,000m MASL produces the highest cup scores.</p>
                </div>

                {/* Card 2 — Soil Composition */}
                <div className="p-5 rounded-sm border" style={{ background: CD, borderColor: CB, borderTop: `2px solid ${FC}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke={FC} strokeWidth="1.2" fill="none"/>
                      <path d="M2 8 Q5 5 8 8 Q11 11 14 8" stroke={FC} strokeWidth="1" fill="none"/>
                    </svg>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: AE }}>Soil Composition</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { type: "Volcanic Nitisol",   pct: 60, color: FC,  note: "Deep red clay · High iron & phosphorus · Ideal for arabica" },
                      { type: "Chromic Luvisol",    pct: 25, color: EB,  note: "Brown forest soil · Strong drainage · Kaffa & Limu highlands" },
                      { type: "Sandy Clay Loam",    pct: 15, color: TS,   note: "Harrar lowlands · Fast-drain · Dry-process suited" },
                    ].map(s => (
                      <div key={s.type}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium" style={{ color: AE }}>{s.type}</span>
                          <span className="text-xs font-medium" style={{ color: s.color }}>{s.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full mb-1" style={{ background: `${CB}` }}>
                          <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color, transition: "width 0.6s ease" }} />
                        </div>
                        <p className="text-xs" style={{ color: TM, lineHeight: 1.5 }}>{s.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3 — Washed vs Natural Timeline */}
                <div className="p-5 rounded-sm border" style={{ background: CD, borderColor: CB, borderTop: `2px solid ${HF}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="6" width="14" height="3" rx="1.5" stroke={FC} strokeWidth="1.2" fill="none"/>
                      <circle cx="4"  cy="7.5" r="1.5" fill={FC}/>
                      <circle cx="12" cy="7.5" r="1.5" fill={FC}/>
                    </svg>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: AE }}>Processing Timeline</p>
                  </div>
                  {[
                    {
                      method: "Washed",
                      color: "#5B8FBF",
                      steps: [
                        { label: "Cherry Intake",  days: "Day 1" },
                        { label: "Pulping",        days: "Day 1" },
                        { label: "Fermentation",   days: "24–48 hrs" },
                        { label: "Washing",        days: "Day 2–3" },
                        { label: "Drying (Raised)", days: "9–12 days" },
                        { label: "Milling / Export",days: "Day 14+" },
                      ],
                    },
                    {
                      method: "Natural / Sun-Dried",
                      color: FC,
                      steps: [
                        { label: "Cherry Intake",  days: "Day 1" },
                        { label: "Sorting",        days: "Day 1" },
                        { label: "Drying Beds",    days: "21–30 days" },
                        { label: "Hulling",        days: "Day 25–32" },
                        { label: "Sorting & Grade",days: "Day 33–35" },
                        { label: "Milling / Export",days: "Day 36+" },
                      ],
                    },
                  ].map(proc => (
                    <div key={proc.method} className="mb-4 last:mb-0">
                      <p className="text-xs font-medium mb-2" style={{ color: proc.color }}>{proc.method}</p>
                      <div className="relative">
                        <div className="absolute left-1.5 top-0 bottom-0 w-px" style={{ background: `${proc.color}30` }} />
                        {proc.steps.map((s, si) => (
                          <div key={si} className="flex items-start gap-3 mb-1.5">
                            <div className="w-3 h-3 rounded-full shrink-0 mt-0.5 border-2 z-10" style={{ background: CD, borderColor: proc.color }} />
                            <div className="flex justify-between flex-1">
                              <span className="text-xs" style={{ color: AE }}>{s.label}</span>
                              <span className="text-xs" style={{ color: TM }}>{s.days}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 07 THE FLAVOR — SENSORY WHEEL ════════════════════════════════════════ */}
      <section ref={secRef("flavor")} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`op-reveal ${vis("flavor") ? "vis" : ""} mb-14 text-center`}>
            <p className="text-xs tracking-[0.22em] uppercase mb-4 font-medium" style={{ color: FC }}>07 · The Flavor</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: AE }}>
              Multi-Dimensional Sensory Wheel.
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: TS, lineHeight: 1.9 }}>
              Hover any flavor node to reveal the exact regional micro-lot, processing method, and roast profile that unlocks that note.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-10 items-center">
            {/* Wheel SVG */}
            <div className="flex justify-center">
              <svg viewBox="0 0 520 520" width="520" height="520" style={{ maxWidth: "100%", overflow: "visible" }}>
                {/* Spokes */}
                {flavorNodes.map(f => (
                  <line key={f.id} x1={cx} y1={cy} x2={f.nx} y2={f.ny}
                    stroke={hovFlavor === f.id ? `${f.color}` : "var(--card-border)"} strokeWidth={hovFlavor === f.id ? 2 : 1}
                    style={{ transition: "stroke 0.2s ease" }} />
                ))}
                {/* Concentric guide rings */}
                {[80, 150, 220].map(r => (
                  <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="var(--card-border)" strokeWidth="0.8" strokeDasharray={r > 150 ? "none" : "4 4"} opacity="0.6" />
                ))}
                {/* Center — photorealistic green coffee bean image */}
                <defs>
                  <clipPath id="beanClip">
                    <ellipse cx={cx} cy={cy} rx="30" ry="42" />
                  </clipPath>
                  <radialGradient id="beanGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4A7A3A" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#4A7A3A" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                {/* Glow halo behind bean */}
                <ellipse cx={cx} cy={cy} rx="48" ry="60" fill="url(#beanGlow)" />
                {/* Actual green coffee bean photo */}
                <image
                  href="https://images.unsplash.com/photo-1514432379894-c96e5e3f5cde?w=120&h=160&fit=crop&auto=format&q=90"
                  x={cx - 30} y={cy - 42} width="60" height="84"
                  clipPath="url(#beanClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
                {/* Bean crease line */}
                <path d={`M${cx} ${cy-38} Q${cx-5} ${cy} ${cx-5} ${cy+14} Q${cx-5} ${cy+32} ${cx} ${cy+38}`}
                  stroke="rgba(0,0,0,0.35)" fill="none" strokeWidth="1.8" clipPath="url(#beanClip)" />
                {/* Bean outline */}
                <ellipse cx={cx} cy={cy} rx="30" ry="42" fill="none" stroke={`${EB}88`} strokeWidth="1.5" />
                {/* Flavor nodes */}
                {flavorNodes.map(f => (
                  <g key={f.id} className="op-pin"
                    onMouseEnter={() => setHovFlavor(f.id)} onMouseLeave={() => setHovFlavor(null)}>
                    {hovFlavor === f.id && <circle cx={f.nx} cy={f.ny} r={nodeR + 10} fill={`${f.color}25`} />}
                    <circle cx={f.nx} cy={f.ny} r={nodeR} fill={hovFlavor === f.id ? f.color : `${f.color}35`}
                      stroke={hovFlavor === f.id ? f.color : `${f.color}99`} strokeWidth="2"
                      style={{
                        transformOrigin: `${f.nx}px ${f.ny}px`,
                        transform: hovFlavor === f.id ? "scale(1.08)" : "scale(1)",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        filter: hovFlavor === f.id ? `drop-shadow(0 0 12px ${f.color})` : "none"
                      }} />
                    <text x={f.nx} y={f.ny + 4} textAnchor="middle"
                      style={{ fontSize: 7.5, fill: hovFlavor === f.id ? (["floral","citrus","sweettea"].includes(f.id) ? "#0F0C0A" : "#FFFFFF") : AE, fontFamily: `'Plus Jakarta Sans', sans-serif`, fontWeight: 700, pointerEvents: "none", letterSpacing: "0.02em" }}>
                      {f.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Detail panel */}
            <div className="p-8 rounded-sm border min-h-56 transition-all duration-300"
              style={{ background: CD, borderColor: hovFlavor ? `${(activeFlavorData?.color ?? EB)}77` : CB }}>
              {activeFlavorData ? (
                <div key={activeFlavorData.id} style={{ animation: "opFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-4 h-4 rounded-full shrink-0" style={{ background: activeFlavorData.color, boxShadow: `0 0 10px ${activeFlavorData.color}88` }} />
                    <p className="font-light text-2xl" style={{ fontFamily: `'Cormorant Garamond', serif`, color: AE }}>{activeFlavorData.label}</p>
                  </div>
                  <p className="text-sm italic mb-5" style={{ fontFamily: `'Cormorant Garamond', serif`, color: TS }}>{activeFlavorData.sub}</p>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {[["Region", activeFlavorData.region], ["Elevation", activeFlavorData.elev], ["Process", activeFlavorData.process]].map(([k,v]) => (
                      <div key={k} className="p-3 rounded-sm border" style={{ borderColor: CB, background: WI }}>
                        <p className="text-xs mb-1" style={{ color: TM }}>{k}</p>
                        <p className="text-xs font-semibold" style={{ color: AE }}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setPage("contact")}
                    className="op-mag px-5 py-2.5 rounded-sm text-xs font-medium border"
                    style={{ borderColor: FC, color: FC, background: "transparent" }}>
                    Request this profile →
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full" style={{ minHeight: 200 }}>
                  <p className="text-sm" style={{ color: TM }}>Hover a flavor node to explore its origin signature</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 08 THE CHOICE — COMPARISON MATRIX ════════════════════════════════════ */}
      <section ref={secRef("matrix")} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`op-reveal ${vis("matrix") ? "vis" : ""} mb-12`}>
            <p className="text-xs tracking-[0.22em] uppercase mb-4 font-medium" style={{ color: FC }}>08 · The Choice</p>
            <h2 className="font-light leading-tight mb-4" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: AE }}>
              Origin Comparison Matrix.
            </h2>
            <p className="text-sm max-w-lg" style={{ color: `${AE}77`, lineHeight: 1.9 }}>
              A luxury editorial guide to selecting the right Ethiopian origin for your cup, your roast, or your export program.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4" style={{ WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", minWidth: 700, borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="text-left py-3 pr-6 text-xs font-medium uppercase tracking-wide" style={{ color: `${AE}66`, width: 140 }}>Attribute</th>
                  {MATRIX_DATA.map(col => (
                    <th key={col.region}
                      onMouseEnter={() => setHovMatrixCol(col.region)}
                      onMouseLeave={() => setHovMatrixCol(null)}
                      className={`py-3 px-4 text-xs font-medium uppercase tracking-wide text-center op-matrix-td ${hovMatrixCol === col.region ? "col-active" : ""}`}
                      style={{ color: FC, borderBottom: `2px solid ${FC}44`, minWidth: 130, cursor: "pointer" }}>
                      {col.region}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Elevation", key: "elev" },
                  { label: "Primary Process", key: "process" },
                  { label: "Body", key: "body" },
                  { label: "Acidity", key: "acidity" },
                  { label: "Sweetness", key: "sweet" },
                  { label: "SCA Score", key: "sca" },
                  { label: "Ideal Brew", key: "brew" },
                ].map((row, ri) => (
                  <tr key={row.key} className="op-matrix-tr" style={{ background: ri % 2 === 0 ? "transparent" : "rgba(15,12,10,0.025)" }}>
                    <td className="py-4 pr-6 text-xs font-medium" style={{ color: `${AE}77`, borderBottom: `1px solid ${AE}08` }}>{row.label}</td>
                    {MATRIX_DATA.map(col => (
                      <td key={col.region}
                        onMouseEnter={() => setHovMatrixCol(col.region)}
                        onMouseLeave={() => setHovMatrixCol(null)}
                        className={`py-4 px-4 text-xs text-center op-matrix-td ${hovMatrixCol === col.region ? "col-active" : ""}`}
                        style={{ color: AE, borderBottom: `1px solid ${AE}08`, cursor: "pointer" }}>
                        {row.key === "sca" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border" style={{ borderColor: `${EB}44`, color: EB }}>
                            <Star size={8} fill={EB} color={EB} /> {(col as any)[row.key]}
                          </span>
                        ) : (col as any)[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ 09 THE SILENCE — Reflective Pause ════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "75vh" }}>
        <div className="absolute inset-0">
          <img loading="lazy" src={u("1633437805600-2c58bf56663c", 1920, 1080)} alt="Golden hour over the Ethiopian Rift Valley"
            className="w-full h-full object-cover" style={{ filter: "brightness(0.3) saturate(1.05) hue-rotate(5deg)" }} />
        </div>
        <div className="absolute inset-0" style={{ background: "rgba(15,12,10,0.55)" }} />
        {/* Sun glow at horizon */}
        <div className="absolute" style={{ bottom: "28%", left: "50%", transform: "translateX(-50%)", width: 400, height: 200, background: "radial-gradient(ellipse, rgba(255,170,50,0.2) 0%, transparent 70%)", filter: "blur(30px)" }} />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
          <div className="w-8 h-px mx-auto mb-10 opacity-40" style={{ background: EB }} />
          <blockquote className="font-light italic leading-relaxed"
            style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: WI }}>
            "The diversity of Ethiopian coffee is not measured by geography alone — it is measured by the stories carried within every harvest."
          </blockquote>
          <div className="w-8 h-px mx-auto mt-10 opacity-40" style={{ background: EB }} />
        </div>
      </section>

      {/* ══ FLAVOR EXPLORER ══════════════════════════════════════════════════════ */}
      <section style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="text-center mb-14">
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: FC, marginBottom: 10 }}>Flavor Explorer</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 400, color: AE, lineHeight: 1.1, marginBottom: 12 }}>
              What Do You Crave?
            </h2>
            <p style={{ fontSize: 14, color: TS, lineHeight: 1.75 }}>Move your cursor over a sensory category to reveal its origins.</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-16 justify-center">
            <div style={{ flexShrink: 0 }}>
              <svg viewBox="0 0 340 340" width="340" height="340" style={{ display: "block", overflow: "visible", pointerEvents: "all" }}>
                {WHEEL_NODES_FE.map((node, ni) => {
                  const totalNodes = WHEEL_NODES_FE.length;
                  const sliceAngle = (2 * Math.PI) / totalNodes;
                  const startAngle = (ni / totalNodes) * 2 * Math.PI - Math.PI / 2 - sliceAngle / 2;
                  const endAngle   = startAngle + sliceAngle;
                  const wcx = 170; const wcy = 170;
                  const outerR = 140; const innerR = 52;
                  const x1 = wcx + innerR * Math.cos(startAngle); const y1 = wcy + innerR * Math.sin(startAngle);
                  const x2 = wcx + outerR * Math.cos(startAngle); const y2 = wcy + outerR * Math.sin(startAngle);
                  const x3 = wcx + outerR * Math.cos(endAngle);   const y3 = wcy + outerR * Math.sin(endAngle);
                  const x4 = wcx + innerR * Math.cos(endAngle);   const y4 = wcy + innerR * Math.sin(endAngle);
                  const midAngle = startAngle + sliceAngle / 2;
                  const isActive = flavorSel === node.id;
                  const textR = (outerR + innerR) / 2 + 4;
                  return (
                    <g key={node.id} style={{ cursor: "pointer", pointerEvents: "all" }}
                      onMouseEnter={() => setFlavorSel(node.id)}
                      onMouseLeave={() => setFlavorSel(null)}
                      onClick={() => setFlavorSel((f: string | null) => f === node.id ? null : node.id)}>
                      <path
                        d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`}
                        fill={isActive ? node.color : `${node.color}35`}
                        stroke={isActive ? node.color : `${node.color}77`}
                        strokeWidth="1.2"
                        style={{ transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", transform: isActive ? "scale(1.06)" : "scale(1)", transformOrigin: `${wcx}px ${wcy}px` }}
                      />
                      <text x={wcx + textR * Math.cos(midAngle)} y={wcy + textR * Math.sin(midAngle)}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="9" fontWeight="700" letterSpacing="0.06em"
                        fill={isActive ? "#FFFFFF" : AE}
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        style={{ transition: "fill 0.3s", pointerEvents: "none", userSelect: "none" }}>
                        {node.id}
                      </text>
                    </g>
                  );
                })}
                <circle cx="170" cy="170" r="45" fill="var(--bg-main)" stroke={CB} strokeWidth="1"/>
                <text x="170" y="166" textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill={TM} fontFamily="'JetBrains Mono', monospace">SENSORY</text>
                <text x="170" y="178" textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="0.14em" fill={TM} fontFamily="'JetBrains Mono', monospace">LEXICON</text>
              </svg>
            </div>
            <div className="flex flex-col gap-4" style={{ minWidth: 280, maxWidth: 360 }}>
              {flavorSel ? (
                <>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: FC, letterSpacing: "0.2em", marginBottom: 4 }}>
                    ORIGINS MATCHING · {flavorSel.toUpperCase()}
                  </p>
                  {ORIGINS_FE.filter(o => o.flavors.some(f => f === flavorSel)).map(o => (
                    <div key={o.id}
                      style={{ padding: "18px 20px", background: CD, border: `1px solid ${CB}`, borderRadius: 2, cursor: "pointer", transition: "all 0.3s ease" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = FC; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = CB; }}
                      onClick={() => { const el = document.getElementById(o.id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: AE }}>{o.label}</p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: EB, fontWeight: 600 }}>SCA {o.sca}</p>
                      </div>
                      <p style={{ fontSize: 12, color: TS, lineHeight: 1.5 }}>{o.notes.join(" · ")}</p>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ padding: "32px 24px", textAlign: "center", border: `1px dashed ${CB}`, borderRadius: 2 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: TM, lineHeight: 1.6 }}>
                    Select a flavor category to reveal matching origins.
                  </p>
                </div>
              )}
              {flavorSel && (
                <button onClick={() => setFlavorSel(null)}
                  style={{ padding: "8px 16px", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", background: "transparent", border: `1px solid ${CB}`, color: TS, cursor: "pointer", transition: "all 0.3s", marginTop: 4 }}>
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10 THE INVITATION — Final CTA ════════════════════════════════════════ */}
      <section style={{ background: WI, padding: "80px 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="relative overflow-hidden rounded-sm p-12 md:p-16"
            style={{ background: "#1C2B22", border: "1px solid rgba(184,134,11,0.3)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}>
            {/* Bronze topographic overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
              {[80,120,160,200,240,280].map(y => (
                <path key={y} d={`M0 ${y} Q100 ${y-15} 200 ${y+10} Q300 ${y-8} 400 ${y+12} Q500 ${y-10} 600 ${y+8} Q700 ${y-12} 800 ${y+5}`}
                  fill="none" stroke="#B8860B" strokeWidth="0.8" />
              ))}
            </svg>
            <div className="relative z-10 text-center">
              <p className="text-xs tracking-[0.24em] uppercase mb-5 font-semibold" style={{ color: "#FF9E1B" }}>10 · The Invitation</p>
              <h2 className="font-light leading-tight mb-5" style={{ fontFamily: `'Cormorant Garamond', serif`, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#FDFBF7" }}>
                Find the Origin That Speaks to You.
              </h2>
              <p className="text-sm mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(253,251,247,0.88)", lineHeight: 1.9 }}>
                Experience Ethiopia's extraordinary micro-climates through our freshly roasted single-origin collection, or inquire about direct export sample sets for wholesale buyers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}
                  className="op-mag px-8 py-3.5 rounded-sm text-sm font-semibold tracking-wide" style={{ background: "#C85227", color: "#FDFBF7" }}>
                  Explore Coffee Collection
                </button>
                <button onClick={() => { setPage("contact"); window.scrollTo({ top: 0 }); }}
                  className="op-mag px-8 py-3.5 rounded-sm text-sm font-medium border"
                  style={{ borderColor: "rgba(253,251,247,0.35)", color: "#FDFBF7", background: "rgba(253,251,247,0.06)", backdropFilter: "blur(10px)" }}>
                  Request Wholesale Samples
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// ── ROASTING PAGE ─────────────────────────────────────────────────────────────
function RoastingPage({ setPage }: { setPage: (p: Page) => void }) {
  const WI = "var(--bg-main)"; const PC = "var(--bg-surface)"; const AE = "var(--text-main)";
  const HF = "var(--bg-dark-section)"; const RC = "#5B3A29"; const FC = "var(--primary)";
  const EB = "var(--accent)"; const FL = "var(--accent)"; const GF = "#D4AF37";
  const CD = "var(--card-bg)"; const CB = "var(--card-border)";
  const TS = "var(--text-sub)"; const TM = "var(--text-mute)";
  const TW = "var(--text-on-dark, #FDFBF7)"; const TWS = "var(--text-on-dark-sub, rgba(253,251,247,0.78))";
  const u = (id: string, w: number, h: number) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

  const [activeRoast, setActiveRoast] = useState(2);
  const [scrollY, setScrollY] = useState(0);
  const [visPhil, setVisPhil] = useState(false);
  const [visSpectrum, setVisSpectrum] = useState(false);
  const [visRoastery, setVisRoastery] = useState(false);
  const [visQuality, setVisQuality] = useState(false);
  const [visMasterRoaster, setVisMasterRoaster] = useState(false);
  const [cuppingSlide, setCuppingSlide] = useState(0);
  const [cuppingPaused, setCuppingPaused] = useState(false);
  const philRef = useRef<HTMLElement>(null);
  const spectrumRef = useRef<HTMLElement>(null);
  const roasteryRef = useRef<HTMLElement>(null);
  const qualityRef = useRef<HTMLElement>(null);
  const masterRoasterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisPhil(true); }, { threshold: 0.15 });
    if (philRef.current) obs.observe(philRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisSpectrum(true); }, { threshold: 0.1 });
    if (spectrumRef.current) obs.observe(spectrumRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisRoastery(true); }, { threshold: 0.1 });
    if (roasteryRef.current) obs.observe(roasteryRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisQuality(true); }, { threshold: 0.1 });
    if (qualityRef.current) obs.observe(qualityRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisMasterRoaster(true); }, { threshold: 0.1 });
    if (masterRoasterRef.current) obs.observe(masterRoasterRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Cupping ritual carousel auto-advance
  const CUPPING_IMAGES = [
    { src: coffeeCupperNewImg, alt: "Professional coffee cupper evaluating fragrance and aroma" },
    { src: cuppingFirstImg,    alt: "Dry and wet grounds evaluation — cupping bowls" },
    { src: cuppingSecondImg,   alt: "Cupping spoon evaluation — breaking the crust" },
  ];
  useEffect(() => {
    if (cuppingPaused) return;
    const t = setInterval(() => setCuppingSlide(s => (s + 1) % CUPPING_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, [cuppingPaused]);

  const roasts = [
    {
      level: "Light", code: "L", temp: "196–205°C", color: "#C8956C",
      tagline: "Origin Clarity",
      notes: ["Jasmine", "Bergamot", "Bright Citrus", "Green Tea"],
      body: "Light", acidity: "High",
      brew: ["Filter / Pour-Over", "Chemex", "Aeropress", "Jebena (Ethiopian Pot)"],
      img: lightRoastImg,
      detail: "First crack complete, oils sealed inside. Maximum terroir expression — the bean speaks without interference. Bright, tea-like, wine-forward with floral lift."
    },
    {
      level: "Medium-Light", code: "ML", temp: "205–215°C", color: "#A0673A",
      tagline: "Sweetness Forward",
      notes: ["Meyer Lemon", "Peach", "Honey", "Brown Sugar"],
      body: "Medium-Light", acidity: "Medium-High",
      brew: ["Americano", "Batch Brew", "Light Espresso", "Steam Coffee"],
      img: mediumRoastImg,
      detail: "Caramelization begins. Sweetness blooms while acidity softens into elegance. The balance point between origin brightness and roast complexity."
    },
    {
      level: "Medium-Dark", code: "MD", temp: "225–230°C", color: "#D47234",
      tagline: "Bittersweet Depth",
      notes: ["Dark Cocoa", "Molasses", "Toasted Almond", "Spice"],
      body: "Full", acidity: "Low",
      brew: ["Cortado", "Macchiato", "Flat White", "Moka Pot"],
      img: mediumDarkRoastImg,
      detail: "Second crack territory. Oils emerge, creating richness and body. Bittersweet depth with a long, resonant finish that lingers."
    },
    {
      level: "Dark", code: "D", temp: "230–240°C", color: "#B8860B",
      tagline: "Bold & Smoky",
      notes: ["Dark Smoke", "Espresso", "Charred Cedar", "Black Pepper"],
      body: "Full-Heavy", acidity: "Very Low",
      brew: ["Traditional Espresso", "Cappuccino", "Latte", "Iced Macchiato"],
      img: darkRoastImg,
      detail: "Deep into second crack. Bold and unapologetic. Smoke weaves through dark chocolate; a cup of commanding presence and lingering intensity."
    }
  ];

  const ar = roasts[activeRoast];

  return (
    <div style={{ background: WI, color: AE, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background-color 0.35s ease, color 0.35s ease" }}>

      {/* ══ HERO ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img loading="eager" fetchPriority="high"
            src={u("1511537190424-bbbab87ac5eb", 1920, 1080)}
            alt="Commercial Probat drum roaster operating in dark roastery studio"
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateY(${scrollY * 0.15}px)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,10,0.98) 0%, rgba(15,12,10,0.55) 50%, rgba(15,12,10,0.2) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(91,58,41,0.3) 0%, transparent 60%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 7rem", width: "100%" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.22em", color: `${FL}`, textTransform: "uppercase", marginBottom: 28 }}>
            The Art of Transformation
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3rem, 8vw, 7.5rem)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: 32, maxWidth: 900 }}>
            Fire, Time,<br />
            <em style={{ color: FL }}>Mastery.</em>
          </h1>
          <p style={{ maxWidth: 560, lineHeight: 1.8, color: "rgba(253,251,247,0.7)", fontSize: 16, marginBottom: 48 }}>
            Ethiopian Arabica elevated through precision roasting. Each batch is a negotiation between bean and flame — 
            a craft refined since 2024 in our Addis Ababa atelier.
          </p>
          <div style={{ display: "flex", gap: 40 }}>
            {[["Since 2024", "ROASTING ATELIER"], ["60 kg", "PROBAT DRUM"], ["Grade 1", "ARABICA ONLY"]].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: FL, lineHeight: 1, letterSpacing: "0.02em", textShadow: `0 0 24px ${FL}55` }}>{v}</p>
                <p style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(253,251,247,0.5)", textTransform: "uppercase", marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, right: 48, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(253,251,247,0.3)", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${FL}66, transparent)` }} />
        </div>
      </section>

      {/* ══ PHILOSOPHY ═════════════════════════════════════════════════════════════ */}
      <section ref={philRef} style={{ background: HF, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ opacity: visPhil ? 1 : 0, transform: visPhil ? "none" : "translateY(32px)", transition: "all 0.8s ease", marginBottom: 72 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FL, textTransform: "uppercase", marginBottom: 16 }}>Our Roasting Philosophy</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1.1, color: TW, maxWidth: 700 }}>
              Every Bean Holds a Story.<br /><em>Roasting Reveals It.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              {
                num: "01", title: "The Maillard Reaction", color: "#A0673A",
                body: "At 150°C, amino acids and sugars undergo Maillard browning — hundreds of volatile compounds emerge, creating the complex aromatics that define specialty coffee. Temperature ramp rate determines which compounds prevail.",
                icon: "🌡"
              },
              {
                num: "02", title: "Caramelization", color: FC,
                body: "Above 170°C, sucrose converts into caramel compounds. This is where sweetness is forged. We control this stage with surgical precision — too fast and the sugars burn; too slow and the cup falls flat.",
                icon: "✦"
              },
              {
                num: "03", title: "Development Time", color: FL,
                body: "Post-first-crack, the Development Time Ratio (DTR) — typically 20–24% of total roast time — determines the depth and integration of flavors. Our target DTR varies by origin, elevation, and processing method.",
                icon: "◎"
              }
            ].map((p, i) => (
              <div key={p.num} className={`roast-phil-card ${visPhil ? "vis" : ""}`} style={{
                background: "rgba(253,251,247,0.06)", padding: "40px",
                border: `1px solid rgba(253,251,247,0.12)`,
                borderRadius: 2,
                opacity: visPhil ? 1 : 0,
                transform: visPhil ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                transition: "opacity 0.75s ease-out, transform 0.75s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.3s ease",
                transitionDelay: `${i * 0.12}s`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: p.color, fontWeight: 700 }}>{p.num}</span>
                  <div style={{ flex: 1, height: 1, background: `${p.color}33` }} />
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: TW, marginBottom: 20, lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: TWS }}>{p.body}</p>
              </div>
            ))}
          </div>
          <style>{`
            .roast-phil-card:hover { transform: translateY(-5px) scale(1.015) !important; box-shadow: 0 20px 48px rgba(15,12,10,0.5) !important; border-color: rgba(255,158,27,0.3) !important; }
            @media (prefers-reduced-motion: reduce) {
              .roast-phil-card { transition: none !important; transform: none !important; opacity: 1 !important; }
            }
          `}</style>
        </div>
      </section>


      {/* ══ MASTER ROASTER ═══════════════════════════════════════════════════════ */}
      <section ref={masterRoasterRef} style={{ background: "#0F0C0A", padding: "80px 0", borderTop: "1px solid rgba(253,251,247,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="master-roaster-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "rgba(255,158,27,0.04)", border: "1px solid rgba(255,158,27,0.15)", borderRadius: 2, overflow: "hidden" }}>
              {[
                { label: "Batch Size", val: "60 kg", note: "Probat drum capacity" },
                { label: "Roast Time", val: "11–14 min", note: "Origin-dependent" },
                { label: "DTR Target", val: "20–24%", note: "Development time ratio" },
                { label: "Charge Temp", val: "190°C", note: "Drum entry temperature" },
              ].map((stat, idx, arr) => (
                <div key={stat.label}
                  className="roaster-metric-card"
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "22px 28px",
                    borderBottom: idx < arr.length - 1 ? "1px solid rgba(255,158,27,0.12)" : "none",
                    borderLeft: "3px solid rgba(255,158,27,0.45)",
                    opacity: visMasterRoaster ? 1 : 0,
                    transform: visMasterRoaster ? "translateY(0) scale(1)" : "translateY(35px) scale(0.96)",
                    transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease",
                    transitionDelay: `${idx * 0.1}s`,
                    willChange: "transform, opacity",
                  }}>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.22em", color: "rgba(253,251,247,0.55)", textTransform: "uppercase", marginBottom: 4 }}>{stat.label}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(253,251,247,0.35)" }}>{stat.note}</p>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 700, color: FL, letterSpacing: "0.01em" }}>{stat.val}</p>
                </div>
              ))}
            </div>
            <div className="master-roaster-quote-col" style={{ borderLeft: "1px solid rgba(253,251,247,0.06)", paddingLeft: 60 }}>
              <div style={{ width: 40, height: 1, background: "#FF9E1B", marginBottom: 32, opacity: 0.6 }} />
              <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.8rem)", fontWeight: 300, color: "#FDFBF7", lineHeight: 1.35, fontStyle: "italic", marginBottom: 32 }}>
                "The drum does not lie. Every variable — temperature, airflow, time — tells you exactly what the bean needs. My job is to listen."
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(200,82,39,0.2)", border: "1px solid rgba(200,82,39,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C85227", fontSize: 16 }}>T</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, color: "#FDFBF7", fontWeight: 500 }}>Tadesse Bekele</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(253,251,247,0.35)", textTransform: "uppercase" }}>Head Roastmaster · Master Craftsman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .roaster-metric-card:hover {
            background: rgba(255,158,27,0.12) !important;
            border-left-color: #FF9E1B !important;
          }
          @media (max-width: 768px) {
            .master-roaster-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .master-roaster-quote-col {
              border-left: none !important;
              padding-left: 0 !important;
              border-top: 1px solid rgba(253,251,247,0.08) !important;
              padding-top: 32px !important;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .roaster-metric-card {
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </section>

      {/* ══ ROAST SPECTRUM ════════════════════════════════════════════════════════ */}
      <section ref={spectrumRef} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ opacity: visSpectrum ? 1 : 0, transform: visSpectrum ? "none" : "translateY(28px)", transition: "all 0.7s ease", marginBottom: 60 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FL, textTransform: "uppercase", marginBottom: 16 }}>The Roast Spectrum</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 300, color: AE, lineHeight: 1.1 }}>
              Four Acts of Transformation.<br /><em>One Ethiopian Soul.</em>
            </h2>
          </div>

          {/* Spectrum bar */}
          <div style={{ display: "flex", gap: 3, marginBottom: 48, borderRadius: 2, overflow: "hidden" }}>
            {roasts.map((r, i) => (
              <button key={r.level} onClick={() => setActiveRoast(i)}
                style={{
                  flex: 1, height: 8, background: activeRoast === i ? r.color : `${r.color}55`,
                  border: "none", cursor: "pointer", transition: "all 0.3s ease",
                  transform: activeRoast === i ? "scaleY(2)" : "none"
                }} />
            ))}
          </div>

          {/* Level tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 52, flexWrap: "wrap" }}>
            {roasts.map((r, i) => (
              <button key={r.level} onClick={() => setActiveRoast(i)}
                style={{
                  padding: "11px 24px",
                  border: `1px solid ${activeRoast === i ? r.color : CB}`,
                  background: activeRoast === i ? r.color : "transparent",
                  color: activeRoast === i ? "#FFFFFF" : TS,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: activeRoast === i ? 11 : 10,
                  fontWeight: activeRoast === i ? 700 : 500,
                  letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer",
                  transition: "all 0.25s ease", borderRadius: 100,
                  boxShadow: activeRoast === i ? `0 4px 20px ${r.color}55` : "none",
                }}>
                {r.level}
              </button>
            ))}
          </div>

          {/* Active roast detail */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2,
            opacity: visSpectrum ? 1 : 0, transition: "opacity 0.6s ease 0.2s"
          }}>
            {/* Left — visual + identity */}
            <div style={{ background: CD, border: `1px solid ${CB}`, padding: "56px 48px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", background: ar.color,
                  boxShadow: `0 0 48px ${ar.color}66`, transition: "all 0.4s ease"
                }} />
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: TM, textTransform: "uppercase", marginBottom: 6 }}>{ar.temp}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: AE, lineHeight: 1 }}>{ar.level}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, fontStyle: "italic", color: ar.level === "Medium-Dark" ? "#FF9E1B" : ar.color, textShadow: "0 2px 10px rgba(0,0,0,0.15)", marginTop: 4 }}>{ar.tagline}</p>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: TS, marginBottom: 36 }}>{ar.detail}</p>
              <div style={{ display: "flex", gap: 32, marginBottom: 36 }}>
                {[["Body", ar.body], ["Acidity", ar.acidity]].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: TM, textTransform: "uppercase", marginBottom: 6 }}>{k}</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: AE }}>{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: TM, textTransform: "uppercase", marginBottom: 12 }}>Best Brewed As</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ar.brew.map(b => (
                    <span key={b} style={{
                      padding: "7px 16px",
                      border: `1px solid ${ar.color}66`,
                      color: AE,
                      background: `${ar.color}15`,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, letterSpacing: "0.12em",
                      borderRadius: 2,
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — tasting notes */}
            <div style={{ background: CD, border: `1px solid ${CB}`, borderLeft: "none", padding: "56px 48px" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.25em", color: TM, textTransform: "uppercase", marginBottom: 32 }}>Tasting Notes</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
                {ar.notes.map((n, idx) => (
                  <span key={n} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px",
                    border: `1px solid ${ar.color}55`,
                    borderRadius: 100,
                    background: `${ar.color}12`,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18, fontWeight: 400, color: AE,
                    letterSpacing: "0.02em",
                    boxShadow: `inset 0 0 0 1px ${ar.color}22`,
                    opacity: visSpectrum ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.3 + idx * 0.08}s`,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: ar.color, flexShrink: 0, display: "inline-block" }} />
                    {n}
                  </span>
                ))}
              </div>
              {/* Dynamic roast image — updates on tab change */}
              <div style={{ marginTop: 32, position: "relative", height: 240, overflow: "hidden", borderRadius: 2 }}>
                <img
                  key={ar.level}
                  loading="lazy"
                  src={ar.img}
                  alt={`${ar.level} roast — ${ar.tagline}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    animation: "roastFadeIn 0.5s ease",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to top, rgba(15,12,10,0.65) 0%, transparent 55%)`,
                  pointerEvents: "none",
                }} />
                <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: ar.level === "Medium-Dark" ? "#FF9E1B" : ar.color,
                    background: "rgba(15,12,10,0.85)",
                    border: "1px solid rgba(253,251,247,0.15)",
                    backdropFilter: "blur(6px)", padding: "5px 12px", borderRadius: 1,
                  }}>{ar.level} Roast — {ar.tagline}</span>
                </div>
                <style>{`@keyframes roastFadeIn { from { opacity:0; transform:scale(1.04); } to { opacity:1; transform:scale(1); } }`}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INSIDE THE ROASTERY ════════════════════════════════════════════════════ */}
      <section ref={roasteryRef} style={{ background: PC, padding: "clamp(50px, 8vw, 100px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>

          {/* Section header — compact, no wasted space */}
          <div style={{
            marginBottom: 40,
            opacity: visRoastery ? 1 : 0, transform: visRoastery ? "none" : "translateY(24px)",
            transition: "all 0.7s ease"
          }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: RC, textTransform: "uppercase", marginBottom: 10 }}>Documentary Archive</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 3.5rem)", fontWeight: 300, color: AE, lineHeight: 1.1, margin: 0 }}>
                Inside the <em>Roastery.</em>
              </h2>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: `${AE}88`, maxWidth: 420, fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0 }}>
                From raw green intake to finished specialty grade — every stage of our Addis Ababa atelier, documented.
              </p>
            </div>
          </div>

          {/* 2×2 grid — all 4 cards fill space evenly */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "340px 340px", gap: 4 }}>
            {[
              { src: drumRoasterImg,  caption: "Drum Roaster — 60 kg Probat",      alt: "60 kg Probat drum roaster in operation at Flavor Coffee atelier" },
              { src: greenBeansImg,   caption: "Green Bean Intake Inspection",      alt: "Hands inspecting unroasted green Arabica coffee beans" },
              { src: roastedMacroImg, caption: "Post-Roast Macro — Yirgacheffe",   alt: "Close-up macro shot of single-origin roasted Yirgacheffe Arabica beans" },
              { src: flavorPackedImg, caption: "Batch Output — Grade 1 Arabica",   alt: "Grade 1 Arabica batch output from Flavor Coffee roastery" },
            ].map((img, i) => (
              <div key={i} style={{
                position: "relative", overflow: "hidden", background: AE, borderRadius: 2,
                opacity: visRoastery ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.1}s`,
              }}>
                <img loading="lazy"
                  src={img.src} alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Glassmorphism gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(15,12,10,0.82) 0%, rgba(15,12,10,0.2) 45%, transparent 100%)",
                  pointerEvents: "none",
                }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(253,251,247,0.85)", textTransform: "uppercase", margin: 0 }}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ QUALITY ASSURANCE ═════════════════════════════════════════════════════ */}
      <section ref={qualityRef} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ opacity: visQuality ? 1 : 0, transform: visQuality ? "none" : "translateX(-28px)", transition: "all 0.8s ease" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FL, textTransform: "uppercase", marginBottom: 20 }}>Quality Protocol</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.8rem)", fontWeight: 300, color: AE, lineHeight: 1.1, marginBottom: 32 }}>
                The Cupping<br /><em>Ritual.</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: TS, marginBottom: 40 }}>
                Every batch is cupped against SCA protocols before it leaves our roastery. We score on fragrance, aroma, flavor, aftertaste, acidity, body, balance, and overall. Minimum score: 85 points.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  ["Fragrance / Aroma", "Dry and wet grounds evaluated separately"],
                  ["Flavor & Aftertaste", "First sip and lingering impression"],
                  ["Acidity", "Intensity and quality of bright notes"],
                  ["Body & Balance", "Tactile weight and harmonic integration"],
                  ["Uniformity & Cleanness", "Six cups per sample, all must align"],
                ].map(([step, desc], idx) => (
                  <div key={step} style={{ padding: "18px 0", borderBottom: `1px solid ${CB}`, display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{
                      minWidth: 32, height: 32, borderRadius: "50%",
                      background: `${FL}18`, border: `1px solid ${FL}44`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: FL, letterSpacing: "0.05em" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, color: AE, fontWeight: 500, marginBottom: 2 }}>{step}</p>
                      <p style={{ fontSize: 12, color: TS, lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ opacity: visQuality ? 1 : 0, transform: visQuality ? "none" : "translateX(28px)", transition: "all 0.8s ease 0.2s" }}>
              {/* ── Crossfade Carousel ─────────────────────────────────────── */}
              <div
                style={{ position: "relative", width: "100%", height: 600, overflow: "hidden", cursor: "pointer", borderRadius: 2 }}
                onMouseEnter={() => setCuppingPaused(true)}
                onMouseLeave={() => setCuppingPaused(false)}
              >
                <style>{`
                  @keyframes kenBurns {
                    0%   { transform: scale(1.0) translate(0%, 0%); }
                    100% { transform: scale(1.08) translate(-2%, -1%); }
                  }
                  .cupping-slide { position: absolute; inset: 0; transition: opacity 0.8s ease; }
                  .cupping-slide.active img { animation: kenBurns 8s ease-in-out infinite alternate; }
                `}</style>
                {CUPPING_IMAGES.map((img, i) => (
                  <div key={i} className={`cupping-slide ${i === cuppingSlide ? "active" : ""}`}
                    style={{ opacity: i === cuppingSlide ? 1 : 0 }}>
                    <img
                      loading="lazy"
                      src={img.src}
                      alt={img.alt}
                      style={{ width: "100%", height: 600, objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))}
                {/* Progress dots */}
                <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
                  {CUPPING_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCuppingSlide(i)}
                      style={{
                        width: i === cuppingSlide ? 28 : 8,
                        height: 4,
                        borderRadius: 2,
                        background: i === cuppingSlide ? FL : "rgba(253,251,247,0.35)",
                        border: "none", cursor: "pointer", padding: 0,
                        transition: "all 0.35s ease",
                        boxShadow: i === cuppingSlide ? `0 0 8px ${FL}88` : "none",
                      }}
                    />
                  ))}
                </div>
                {/* Pause indicator */}
                {cuppingPaused && (
                  <div style={{ position: "absolute", top: 12, right: 14, background: "rgba(15,12,10,0.6)", backdropFilter: "blur(6px)", padding: "4px 10px", borderRadius: 2 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.18em", color: "rgba(253,251,247,0.5)", textTransform: "uppercase" }}>paused</span>
                  </div>
                )}
              </div>

              {/* ── Stats bar ─────────────────────────────────────────────── */}
              <div style={{ background: CD, border: `1px solid ${CB}`, borderTop: "none", display: "flex", justifyContent: "space-between" }}>
                {[["85+", "Minimum SCA Score", true], ["100%", "Batches Cupped", false], ["Grade 1", "Arabica Only", false]].map(([v, l, accent]) => (
                  <div key={String(l)} style={{
                    flex: 1, padding: "22px 24px",
                    background: accent ? `linear-gradient(135deg, ${FL}22, rgba(28,43,34,0) 70%)` : "transparent",
                    borderLeft: accent ? `3px solid ${FL}` : "none",
                    borderRight: `1px solid ${CB}`,
                    position: "relative",
                  }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: accent ? 32 : 26,
                      fontWeight: accent ? 700 : 400,
                      color: accent ? FL : AE,
                      textShadow: accent ? `0 0 20px ${FL}55` : "none",
                    }}>{String(v)}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: accent ? FL : TM, textTransform: "uppercase", marginTop: 4 }}>{String(l)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: RC, padding: "100px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: `${FL}`, textTransform: "uppercase", marginBottom: 20 }}>Ready to Order</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: 300, color: TW, lineHeight: 1.05, marginBottom: 24 }}>
            Request Your<br /><em>Sample Roast.</em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: TWS, marginBottom: 48 }}>
            We ship roasted-to-order samples to buyers worldwide. Select your roast level, origin, and quantity — we handle the rest.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("contact")} style={{
              padding: "18px 48px", background: FL, color: "#FFFFFF",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", border: "none", cursor: "pointer",
              fontWeight: 700, borderRadius: 1,
              boxShadow: `0 8px 32px ${FL}55`,
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 40px ${FL}77`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 32px ${FL}55`; }}
            >
              Request Sample
            </button>
            <button onClick={() => setPage("origins")} style={{
              padding: "18px 48px", background: "transparent", color: TW,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", border: `1px solid rgba(253,251,247,0.35)`, cursor: "pointer",
              borderRadius: 1,
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = `${FL}88`; (e.currentTarget as HTMLButtonElement).style.color = FL; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(253,251,247,0.35)"; (e.currentTarget as HTMLButtonElement).style.color = TW; }}
            >
              View Collection
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}


// ── GALLERY PAGE ──────────────────────────────────────────────────────────────
function GalleryPage({ setPage }: { setPage: (p: Page) => void }) {

  /* PALETTE */
  const WI = "var(--bg-main)"; const PC = "var(--bg-surface)"; const AE = "var(--text-main)";
  const HF = "var(--bg-dark-section)"; const FC = "var(--primary)"; const EB = "var(--accent)";
  const RC = "#5B3A29"; const FL = "var(--accent)";
  const CD = "var(--card-bg)"; const CB = "var(--card-border)";
  const TS = "var(--text-sub)"; const TM = "var(--text-mute)";
  const TW = "var(--text-on-dark, #FDFBF7)"; const TWS = "var(--text-on-dark-sub, rgba(253,251,247,0.78))";

  /* STATE */
  const [forestSlide, setForestSlide]   = useState(0);
  const [audioOn, setAudioOn]           = useState(false);
  const [sectVis, setSectVis]           = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const secRef = (k: string) => (el: HTMLElement | null) => { sectionRefs.current[k] = el; };
  const vis = (k: string) => !!sectVis[k];


  const GP_HUBS = [
    { city:"London",   x:92,  y:19 },
    { city:"Tokyo",    x:165, y:28 },
    { city:"New York", x:36,  y:24 },
    { city:"Sydney",   x:175, y:74 },
  ];

  /* EFFECTS */
  useEffect(() => {
    const t = setInterval(() => setForestSlide(s => (s + 1) % 2), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    ["highlands","forests","harvest","processing","roasting","quality","packaging","moments"].forEach(k => {
      const el = sectionRefs.current[k];
      if (!el) return;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setSectVis(v => ({ ...v, [k]: true }));
      }, { threshold: 0.06 });
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);


  /* RENDER */
  return (
    <div style={{ background: WI, color: AE, fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden", transition: "background-color 0.35s ease, color 0.35s ease" }}>
      <style>{`
        @keyframes gpFadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes gpZoom     { from { transform:scale(1.0); } to { transform:scale(1.07); } }
        @keyframes gpLeaf     { 0%{transform:translateY(-24px) rotate(0deg);opacity:0} 8%{opacity:0.6} 88%{opacity:0.42} 100%{transform:translateY(112vh) rotate(290deg);opacity:0} }
        @keyframes gpEmber    { 0%{transform:translateY(0) scale(1);opacity:0.55} 100%{transform:translateY(-36px) scale(0.3);opacity:0} }
        @keyframes gpPulse    { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.55)} }
        @keyframes gpDash     { to { stroke-dashoffset:-80; } }
        @keyframes gpScrollDot{ 0%{transform:translateY(0);opacity:1} 70%{opacity:0.6} 100%{transform:translateY(40px);opacity:0} }
        @keyframes gpShimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        .gp-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1); }
        .gp-reveal.vis { opacity:1; transform:translateY(0); }
        .gp-card { content-visibility:auto; contain-intrinsic-size:1px 400px; will-change:transform; transform:translateZ(0); }
        .gp-skeleton { background:linear-gradient(90deg,#1a1a1a 25%,#2a2620 50%,#1a1a1a 75%); background-size:600px 100%; animation:gpShimmer 1.6s infinite linear; }
        .gp-filter-btn { padding:7px 18px; font-size:9px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; border-radius:100px; cursor:pointer; transition:background 0.22s ease, color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease; will-change:transform; transform:translateZ(0); }
        .gp-filter-btn:hover { transform:translateY(-1px) translateZ(0); }
        .gp-filter-btn.active { box-shadow:0 4px 18px rgba(184,134,11,0.35); }
        .gp-img { transition:transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease; will-change:transform; }
        .gp-img:hover { transform:scale(1.055) translateZ(0); }
      `}</style>

      {/* Film grain fixed overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex:99 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="gpGrain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
          <rect width="100%" height="100%" filter="url(#gpGrain)" opacity="0.032"/>
        </svg>
      </div>

      {/* ── CH01: HERO ──────────────────────────────────────────────────────── */}
      <section style={{ position:"relative", height:"100vh", minHeight:700, overflow:"hidden", display:"flex", alignItems:"center", background:"#0B0E14" }}>
        <div className="absolute inset-0" style={{ animation:"gpZoom 42s ease-in-out infinite alternate" }}>
          <img loading="lazy" src={galleryPageBackgroundImg} alt="Every Harvest Has a Face - Ethiopian coffee background" className="w-full h-full object-cover" style={{ filter:"brightness(0.65) saturate(1.05)" }}/>
        </div>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(11,14,20,0.12) 0%, transparent 30%, rgba(11,14,20,0.65) 100%)" }}/>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right, rgba(11,14,20,0.9) 0%, transparent 65%)" }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 w-full">
          <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.32em", textTransform:"uppercase", color:EB, marginBottom:22, animation:"gpFadeUp 0.9s ease 0.3s both" }}>
            Chapter Five // Through the Lens
          </p>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(44px, 8vw, 80px)", fontWeight:700, lineHeight:1.02, letterSpacing:"-0.025em", color:WI, maxWidth:640, marginBottom:22, animation:"gpFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}>
            Every Harvest<br />Has a Face.
          </h1>
          <p style={{ fontSize:"clamp(14px,1.5vw,18px)", fontWeight:300, lineHeight:1.85, color:"rgba(253,251,247,0.6)", maxWidth:560, animation:"gpFadeUp 1s ease 0.8s both" }}>
            Behind every bean is a mountain. A family. A season. A sunrise. A careful hand. This is the visual story of Ethiopian coffee — from its birthplace to your cup.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute" style={{ bottom:48, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", opacity:1, alignItems:"center", gap:5, zIndex:10, animation:"gpFadeUp 1s ease 1.2s both" }}>
          <div style={{ width:1, height:54, background:`linear-gradient(to bottom, transparent, ${EB}88)` }}/>
          <div style={{ width:5, height:5, borderRadius:"50%", background:EB, animation:"gpScrollDot 1.9s ease-in-out infinite" }}/>
        </div>

        {/* Audio toggle */}
        <button onClick={() => setAudioOn(a => !a)}
          style={{ position:"absolute", top:28, right:28, zIndex:20, padding:"8px 16px", fontSize:9, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", background:"rgba(15,12,10,0.55)", border:`1px solid ${audioOn ? EB : "rgba(184,134,11,0.22)"}`, color:audioOn ? EB : "rgba(253,251,247,0.36)", backdropFilter:"blur(12px)", cursor:"pointer", transition:"all 0.3s ease" }}>
          ◉ Exhibition Sound: {audioOn ? "On" : "Off"}
        </button>
      </section>

      {/* ── SECTION 01: ORIGINS GALLERY ──────────────────────────────────────── */}
      <section style={{ background:PC, padding:"80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className="mb-10">
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>01 — Origins Gallery</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:AE, marginBottom:16 }}>Where Coffee Begins</h2>
            <p style={{ fontSize:15, lineHeight:1.88, color:TS, maxWidth:580 }}>
              From wild forests to highland terraces, these landscapes define Ethiopian coffee's extraordinary character.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { img:harvest1Img,  cap:"Selective hand-picking at peak harvest season",        meta:"Highland Terraces · 1,950m" },
              { img:og1Img,       cap:"Morning light illuminates the ancient highlands",        meta:"Guji Zone · 2,100m" },
              { img:og2Img,       cap:"Wild Arabica in its natural forest habitat",             meta:"Kaffa Reserve · 1,700m" },
            ].map((item, idx) => (
              <div key={idx} className="relative rounded-sm overflow-hidden group" style={{ aspectRatio:"4/5" }}>
                <img loading="lazy" src={item.img} alt={item.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.88) saturate(1.05)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.85) 0%, transparent 55%)" }}/>
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:14, color:`#F5EBE6`, lineHeight:1.45, marginBottom:4 }}>{item.cap}</p>
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:9, color:EB, letterSpacing:"0.14em" }}>{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CH02: HIGHLANDS ─────────────────────────────────────────────────── */}
      <section ref={secRef("highlands")} style={{ background:WI, paddingTop:0, paddingBottom:100 }}>
        <div style={{ width:"100%", aspectRatio:"739 / 415", overflow:"hidden" }}>
          <img loading="lazy" src={gujiRangePanoramicImg} alt="Guji mountain ranges panoramic" className="w-full h-full object-cover" style={{ filter:"brightness(0.95) saturate(1.05)" }}/>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 pt-16">
          <div className={`gp-reveal ${vis("highlands") ? "vis" : ""} mb-12`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>02 — The Highlands</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:AE, marginBottom:16 }}>The Topography of Taste</h2>
            <p style={{ fontSize:15, lineHeight:1.88, color:TS, maxWidth:580 }}>
              Coffee cannot be separated from the landscape that shapes it. In the high altitudes of Southern Ethiopia, cool nights slow bean development, concentrating natural sugars and complex organic acids within every cherry.
            </p>
          </div>
          <div className={`gp-reveal ${vis("highlands") ? "vis" : ""} grid grid-cols-1 md:grid-cols-3 gap-4`} style={{ transitionDelay:"0.14s" }}>
            {[
              { img:t1Img, cap:"Morning fog rolling over coffee valleys", meta:"6°9′N 38°12′E · 2,150m elevation" },
              { img:t2Img, cap:"Ancient river flowing through untouched mountain forests", meta:"Jimma Zone · 1,750m" },
              { img:t3Img, cap:"Volcanic soil texture with morning dew droplets", meta:"Bale Mountains · 2,400m" },
            ].map((fr, fi) => (
              <div key={fi} className="relative rounded-sm overflow-hidden group" style={{ aspectRatio:"4/5" }}>
                <img loading="lazy" src={fr.img} alt={fr.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.88) saturate(1.05)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.85) 0%, transparent 55%)" }}/>
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:14, color:`#F5EBE6`, lineHeight:1.45, marginBottom:4 }}>{fr.cap}</p>
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:9, color:EB, letterSpacing:"0.14em" }}>{fr.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CH03: FORESTS ───────────────────────────────────────────────────── */}
      <section ref={secRef("forests")} style={{ background:HF, padding:"100px 0", position:"relative", overflow:"hidden" }}>
        {Array.from({length:14}, (_,i) => (
          <div key={i} className="absolute pointer-events-none" style={{ left:`${(i*7.1+3)%96}%`, top:"-24px", width:5+(i%4)*2, height:8+(i%3)*3, background:`rgba(${34+i*3},${90+i*2},${48+i*2},${0.38+i%3*0.12})`, borderRadius:"38% 62% 58% 42%", animation:`gpLeaf ${4.5+i*0.6}s ${i*0.7}s linear infinite`, transform:`rotate(${i*26}deg)` }}/>
        ))}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`gp-reveal ${vis("forests") ? "vis" : ""} mb-10`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>03 — Forests of Origin</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:TW }}>The Wild Ancestry</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-center">
            <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio:"3/2", background:"rgba(253,251,247,0.06)" }}>
              {[
                { img:"1586095516671-d085ff58cdd4", local:false, cap:"Moss-covered tree trunks with wild coffee cherries growing in dense shade", meta:"Kaffa Forest Reserve · 1,720m" },
                { img:newImg,                       local:true,  cap:"Filtered sunlight illuminating the damp forest floor and leaf litter",        meta:"Kaffa Reserve · 1,680m" },
              ].map((sl, si) => (
                <div key={si} className="absolute inset-0" style={{ opacity:forestSlide===si ? 1 : 0, transition:"opacity 1.3s ease" }}>
                  <img loading="lazy" src={sl.local ? (sl.img as string) : u(sl.img as string, 1200, 800)} alt={sl.cap} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.82) 0%, transparent 55%)" }}/>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:14, color:`#F5EBE6`, lineHeight:1.5, marginBottom:4 }}>{sl.cap}</p>
                    <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:9, color:EB, letterSpacing:"0.14em" }}>{sl.meta}</p>
                  </div>
                </div>
              ))}
              <div className="absolute top-4 right-4 flex gap-2">
                {[0,1].map(si => (
                  <button key={si} onClick={() => setForestSlide(si)} style={{ width:6, height:6, borderRadius:"50%", background:forestSlide===si ? EB : "rgba(253,251,247,0.28)", border:"none", cursor:"pointer", padding:0, transition:"background 0.3s" }}/>
                ))}
              </div>
            </div>
            <div className={`gp-reveal ${vis("forests") ? "vis" : ""}`} style={{ transitionDelay:"0.2s" }}>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(17px,2.2vw,22px)", lineHeight:1.65, color:TW, marginBottom:20, fontStyle:"italic" }}>
                "Ethiopia harbors over 10,000 uncatalogued wild Arabica varieties — more genetic coffee diversity than the rest of the world combined."
              </p>
              <p style={{ fontSize:13, lineHeight:1.88, color:TWS, marginBottom:20 }}>
                Wild Arabica evolved under dense forest canopy shade in Kaffa and Bale — a radically different stress environment from plantation monoculture. Forest shade forces slow cherry maturation, concentrating sugars and aromatic precursors.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:16, borderTop:`1px solid rgba(253,251,247,0.12)` }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:FC, flexShrink:0 }}/>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:8, color:`rgba(253,251,247,0.45)`, letterSpacing:"0.12em" }}>UNESCO INTANGIBLE CULTURAL HERITAGE · BUNA CEREMONY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CH05: HARVEST ───────────────────────────────────────────────────── */}
      <section ref={secRef("harvest")} style={{ background:PC, padding:"100px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`gp-reveal ${vis("harvest") ? "vis" : ""} mb-12`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>05 — The Harvest</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:AE }}>Drying and Wild Coffee</h2>
          </div>
          <div className={`gp-reveal ${vis("harvest") ? "vis" : ""} grid grid-cols-1 md:grid-cols-2 gap-4`} style={{ transitionDelay:"0.1s" }}>
            {[
              { img:dryingImg,  cap:"Raised African wire beds drying crimson cherries under mountain sun", meta:"Natural Process · Day 12" },
              { img:q8Img,      cap:"Ethically harvested cherries sorted by hand on African wire drying beds", meta:"Kaffa Reserve · 1,700m" },
            ].map((frame, fi) => (
              <div key={fi} className="relative rounded-sm overflow-hidden group" style={{ aspectRatio:"3/2" }}>
                <img loading="lazy" src={frame.img} alt={frame.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.88) saturate(1.1)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.82) 0%, transparent 55%)" }}/>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:14, color:`#F5EBE6`, lineHeight:1.4, marginBottom:3 }}>{frame.cap}</p>
                  <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:9, color:EB, letterSpacing:"0.12em" }}>{frame.meta}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Premium Editorial Storytelling Card */}
          <div className={`gp-reveal ${vis("harvest") ? "vis" : ""} mt-10 rounded-sm border p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-1`}
            style={{
              transitionDelay: "0.22s",
              background: "linear-gradient(135deg, #1C2B22 0%, #0F0C0A 100%)",
              borderColor: "rgba(184,134,11,0.28)",
              boxShadow: "0 16px 40px rgba(15,12,10,0.22)"
            }}>
            {/* Topography vector accent lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 800 200" preserveAspectRatio="none">
              <path d="M0 40 Q200 10 400 60 Q600 110 800 30" fill="none" stroke="#B8860B" strokeWidth="1" />
              <path d="M0 120 Q200 170 400 100 Q600 40 800 130" fill="none" stroke="#C85227" strokeWidth="1" />
            </svg>

            <div className="relative z-10">
              {/* Process Flow Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C85227]" />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF9E1B", fontWeight: 600 }}>
                    Harvest Journey · Origin Philosophy
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50">
                  <span>FOREST</span>
                  <span>→</span>
                  <span>HARVEST</span>
                  <span>→</span>
                  <span>SUN DRYING</span>
                  <span>→</span>
                  <span style={{ color: "#B8860B" }}>CUP</span>
                </div>
              </div>

              {/* Main Editorial Statement */}
              <blockquote className="font-light leading-relaxed mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)", color: "#FDFBF7" }}>
                From <em style={{ fontStyle: "italic", color: "#FF9E1B", fontWeight: 400 }}>wild forest origins</em> to precision sun drying, every stage honors the <em style={{ fontStyle: "italic", color: "#C85227", fontWeight: 400 }}>natural character</em> of Ethiopian coffee.
              </blockquote>

              {/* Storytelling progression nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-[#B8860B]/40 text-xs font-mono text-[#B8860B]" style={{ background: "rgba(184,134,11,0.12)" }}>01</div>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(253,251,247,0.45)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Stage One</p>
                    <p className="text-xs font-medium text-white/90">Wild Forest Origins</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-[#C85227]/40 text-xs font-mono text-[#C85227]" style={{ background: "rgba(200,82,39,0.12)" }}>02</div>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(253,251,247,0.45)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Stage Two</p>
                    <p className="text-xs font-medium text-white/90">Precision Sun Drying</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-emerald-500/40 text-xs font-mono text-emerald-400" style={{ background: "rgba(16,185,129,0.12)" }}>03</div>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(253,251,247,0.45)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Stage Three</p>
                    <p className="text-xs font-medium text-white/90">Natural Character</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CH06: PROCESSING ────────────────────────────────────────────────── */}
      <section ref={secRef("processing")} style={{ background:WI, padding:"100px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`gp-reveal ${vis("processing") ? "vis" : ""} mb-14`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>06 — Processing</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:AE }}>The Art of Transformation</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { method:"Washed", dot:"#4A9FBF", items:[
                { img:lastImg,                      local:true,  cap:"Fresh spring water flowing through granite washing channels" },
                { img:"1587734195503-904fca47e0e9", local:false, cap:"Clean parchment beans undergoing controlled 36-hour underwater fermentation" },
                { img:"1447933601403-0c6688de566e", local:false, cap:"Grade 1 parchment after precision washed processing" },
              ]},
              { method:"Natural", dot:FC, items:[
                { img:w2Img,                        local:true,  cap:"Whole crimson cherries laid in thin single layers on raised African wire beds" },
                { img:"1774284597431-49445d200674", local:false, cap:"Sunset shadows cast over long rows of drying beds stretching to the horizon" },
                { img:"1670758611084-e216510c5433", local:false, cap:"Workers hand-turning drying fruit every 30 minutes to prevent over-fermentation" },
              ]},
            ].map((col, ci) => (
              <div key={ci} className={`gp-reveal ${vis("processing") ? "vis" : ""}`} style={{ transitionDelay:`${ci*0.12}s` }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, paddingBottom:12, borderBottom:`1px solid ${AE}12` }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:col.dot }}/>
                  <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:`${AE}60` }}>{col.method} Process</p>
                </div>
                <div className="flex flex-col gap-3">
                  {col.items.map((ph, pi) => (
                    <div key={pi} className="relative rounded-sm overflow-hidden group" style={{ aspectRatio:"16/9" }}>
                      <img loading="lazy" src={ph.local ? (ph.img as string) : u(ph.img as string, 900, 500)} alt={ph.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.88) saturate(1.05)" }}/>
                      <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.72) 0%, transparent 55%)" }}/>
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:12, color:`#F5EBE6`, lineHeight:1.4 }}>{ph.cap}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CH08: ROASTING ──────────────────────────────────────────────────── */}
      <section ref={secRef("roasting")} style={{ background:"#0F0C0A", padding:"100px 0", position:"relative", overflow:"hidden" }}>
        {Array.from({length:20}, (_,i) => (
          <div key={i} className="absolute pointer-events-none rounded-full" style={{ left:`${(i*5.3+8)%92}%`, bottom:`${20+(i*4.7)%50}%`, width:2+(i%3), height:2+(i%3), background:i%3===0?FL:(i%3===1?FC:EB), animation:`gpEmber ${2.2+i*0.35}s ${i*0.25}s ease-in-out infinite alternate`, opacity:0.5 }}/>
        ))}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 relative z-10">
          <div className={`gp-reveal ${vis("roasting") ? "vis" : ""} mb-12`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>08 — Roasting</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:TW }}>Fire, Copper, and Precision</h2>
          </div>
          <div className={`gp-reveal ${vis("roasting") ? "vis" : ""} grid grid-cols-2 md:grid-cols-4 gap-3`} style={{ transitionDelay:"0.14s" }}>
            {[
              { img:"1513530176992-0cf39c4cbed4", local:false, cap:"Polished copper roasting drum rotating over open gas flame" },
              { img:"1652249018603-fa071069fcba", local:false, cap:"Master roaster withdrawing brass trier to evaluate roast colour and bean expansion" },
              { img:"1624976921221-4478954a4bc9", local:false, cap:"Rapid quench cooling bed tray with sweeping stainless steel arm at 25 RPM" },
              { img:roastedImg,                 local:true,  cap:"Fresh mahogany beans releasing delicate wisps of aromatic steam" },
            ].map((frame, fi) => (
              <div key={fi} className="relative rounded-sm overflow-hidden group" style={{ aspectRatio:"3/4" }}>
                <img loading="lazy" src={frame.local ? (frame.img as string) : u(frame.img as string, 600, 800)} alt={frame.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.7) saturate(1.15)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.9) 0%, transparent 55%)" }}/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" style={{ boxShadow:`inset 0 0 0 1.5px ${EB}44` }}/>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:11, color:TWS, lineHeight:1.4 }}>{frame.cap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CH09: QUALITY ───────────────────────────────────────────────────── */}
      <section ref={secRef("quality")} style={{ background:PC, padding:"100px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`gp-reveal ${vis("quality") ? "vis" : ""} mb-12`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>09 — Quality & Cupping</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:AE }}>The Laboratory Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { img:coffeeCupperNewImg, local:true, cap:"Professional coffee cupper evaluating fragrance and wet aroma" },
              { img:cuppingFirstImg,    local:true, cap:"Dry and wet grounds evaluation — cupping bowls at the station" },
              { img:cuppingSecondImg,   local:true, cap:"Breaking the crust and inhaling the aroma bloom — SCA protocol" },
            ].map((fr, fi) => (
              <div key={fi} className={`gp-reveal ${vis("quality") ? "vis" : ""} relative rounded-sm overflow-hidden group`} style={{ transitionDelay:`${0.1+fi*0.12}s`, aspectRatio:"4/3" }}>
                <img loading="lazy" src={fr.img} alt={fr.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.88)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.82) 0%, transparent 55%)" }}/>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:13, color:`#F5EBE6`, lineHeight:1.4 }}>{fr.cap}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Signature Quality Control Feature Card */}
          <div className={`gp-reveal ${vis("quality") ? "vis" : ""} rounded-sm border p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-1`}
            style={{
              transitionDelay: "0.3s",
              background: CD,
              borderColor: CB,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)"
            }}>
            {/* Header / Protocol badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b" style={{ borderColor: CB }}>
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ background: FC }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: FC, fontWeight: 600 }}>
                  Quality Protocol · Guarantee of Excellence
                </span>
              </div>
              <div className="px-3 py-1 rounded-full text-[10px] uppercase font-semibold border" style={{ borderColor: `${EB}44`, color: EB, background: `${EB}14`, letterSpacing: "0.14em" }}>
                Verified Origin Certification
              </div>
            </div>

            {/* 3-Stage Quality Progression Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Stage 1: 3+ Blind Cupping */}
              <div className="p-5 rounded-sm border relative group transition-all duration-300 hover:border-[#C85227]" style={{ background: PC, borderColor: CB }}>
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TM, letterSpacing: "0.14em" }}>STAGE 01</span>
                  <span className="text-xs" style={{ color: FC }}>☕</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4vw, 3.2rem)", fontWeight: 300, color: FC, lineHeight: 1 }}>
                  3<span className="text-xl font-normal" style={{ color: EB }}>+</span>
                </p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: AE, marginTop: 6, letterSpacing: "0.02em" }}>
                  Blind Cupping Rounds
                </p>
                <p className="text-xs mt-1.5" style={{ color: TS, lineHeight: 1.5 }}>
                  Rigorous multi-stage blind evaluation by certified Q-graders.
                </p>
              </div>

              {/* Stage 2: SCA Standards */}
              <div className="p-5 rounded-sm border relative group transition-all duration-300 hover:border-[#B8860B]" style={{ background: PC, borderColor: CB }}>
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TM, letterSpacing: "0.14em" }}>STAGE 02</span>
                  <Award size={14} style={{ color: EB }} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4vw, 3.2rem)", fontWeight: 400, color: EB, lineHeight: 1, letterSpacing: "0.04em" }}>
                  SCA
                </p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: AE, marginTop: 6, letterSpacing: "0.02em" }}>
                  Scoring Standards
                </p>
                <p className="text-xs mt-1.5" style={{ color: TS, lineHeight: 1.5 }}>
                  Strict sensory analysis of aroma, acidity, body, and balance.
                </p>
              </div>

              {/* Stage 3: 86+ Export Stamp */}
              <div className="p-5 rounded-sm border relative group transition-all duration-300 hover:border-[#C85227]" style={{ background: PC, borderColor: CB }}>
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: FC, letterSpacing: "0.14em" }}>STAGE 03</span>
                  <CheckCircle2 size={14} style={{ color: FC }} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 4vw, 3.2rem)", fontWeight: 300, color: AE, lineHeight: 1 }}>
                  86<span className="text-xl font-normal" style={{ color: FC }}>+</span>
                </p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: AE, marginTop: 6, letterSpacing: "0.02em" }}>
                  Export Grade Stamp
                </p>
                <p className="text-xs mt-1.5" style={{ color: TS, lineHeight: 1.5 }}>
                  Only micro-lots scoring 86+ points earn export certification.
                </p>
              </div>
            </div>

            {/* Supporting statement quote */}
            <div className="p-4 rounded-sm border flex items-start gap-4" style={{ background: "rgba(200,82,39,0.05)", borderColor: CB }}>
              <div className="w-1 h-8 rounded-full shrink-0 mt-0.5" style={{ background: FC }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 1.4vw, 16px)", fontStyle: "italic", lineHeight: 1.7, color: TS }}>
                &ldquo;Every lot undergoes minimum 3 blind cupping rounds scored according to strict SCA standards. Only lots scoring 86+ points earn the Flavor Coffee export stamp.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CH10: PACKAGING ─────────────────────────────────────────────────── */}
      <section ref={secRef("packaging")} style={{ background:RC, padding:"100px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`gp-reveal ${vis("packaging") ? "vis" : ""} mb-12`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:TWS, marginBottom:8 }}>10 — Packaging & Export</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:TW }}>Ready for the World</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`gp-reveal ${vis("packaging") ? "vis" : ""} flex flex-col gap-3`} style={{ transitionDelay:"0.1s" }}>
              {[
                { img:exportReadyLoadImg,   local:true,  cap:"Export-ready coffee bags loaded for international shipment" },
                { img:exportReadyPackedImg, local:true,  cap:"Premium Flavor Coffee specialty grade sealed and certified" },
                { img:"1526778548025-fa2f459cd5c1", local:false, cap:"Ethiopian export routes connecting highlands to global markets" },
              ].map((card, ci) => (
                <div key={ci} className="relative rounded-sm overflow-hidden group" style={{ aspectRatio:"16/7" }}>
                  <img loading="lazy" src={card.local ? card.img : u(card.img as string, 900, 400)} alt={card.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.72) saturate(1.1)" }}/>
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.82) 0%, transparent 50%)" }}/>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:13, color:`#F5EBE6`, lineHeight:1.4 }}>{card.cap}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`gp-reveal ${vis("packaging") ? "vis" : ""}`} style={{ transitionDelay:"0.2s" }}>
              <div className="rounded-sm overflow-hidden" style={{ background:"rgba(15,12,10,0.42)", border:"1px solid rgba(253,251,247,0.12)", padding:"24px 20px 14px" }}>
                <svg viewBox="0 0 200 100" className="w-full" style={{ opacity:0.92 }}>
                  {[20,40,60,80].map(y=><line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(253,251,247,0.06)" strokeWidth="0.4"/>)}
                  <path d="M14 8 L26 8 L34 14 L32 26 L22 32 L14 26 L12 14Z" fill="rgba(253,251,247,0.055)" stroke="rgba(253,251,247,0.14)" strokeWidth="0.35"/>
                  <path d="M22 36 L30 36 L32 50 L26 56 L18 52 L16 40Z" fill="rgba(253,251,247,0.045)" stroke="rgba(253,251,247,0.12)" strokeWidth="0.35"/>
                  <path d="M88 10 L104 10 L106 20 L100 24 L88 22 L84 16Z" fill="rgba(253,251,247,0.055)" stroke="rgba(253,251,247,0.14)" strokeWidth="0.35"/>
                  <path d="M92 26 L112 24 L116 40 L110 62 L98 62 L88 52 L86 34Z" fill="rgba(253,251,247,0.07)" stroke="rgba(253,251,247,0.16)" strokeWidth="0.4"/>
                  <path d="M104 34 L112 36 L114 42 L108 46 L100 42Z" fill="rgba(200,82,39,0.15)" stroke="rgba(200,82,39,0.3)" strokeWidth="0.38"/>
                  <path d="M114 8 L168 6 L170 22 L158 28 L130 26 L112 16Z" fill="rgba(253,251,247,0.055)" stroke="rgba(253,251,247,0.14)" strokeWidth="0.35"/>
                  <path d="M152 68 L176 66 L178 84 L164 88 L150 82Z" fill="rgba(253,251,247,0.045)" stroke="rgba(253,251,247,0.12)" strokeWidth="0.35"/>
                  <circle cx="108" cy="42" r="2.4" fill={FC}/>
                  <circle cx="108" cy="42" r="5" fill={FC} opacity="0.18" style={{ animation:"gpPulse 2.2s ease-in-out infinite" }}/>
                  <text x="112" y="39" style={{ fontSize:3.2, fill:"#FFFFFF", fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:600 }}>Addis Ababa</text>
                  {GP_HUBS.map((h,hi) => (
                    <g key={h.city}>
                      <line x1="108" y1="42" x2={h.x} y2={h.y} stroke={EB} strokeWidth="0.65" strokeDasharray="2.5 2" opacity="0.72" style={{ animation:`gpDash ${3+hi*0.5}s ${hi*0.3}s linear infinite` }}/>
                      <circle cx={h.x} cy={h.y} r="2" fill={EB} opacity="0.9"/>
                      <circle cx={h.x} cy={h.y} r="4" fill={EB} opacity="0.16" style={{ animation:"gpPulse 3s ease-in-out infinite" }}/>
                      <text x={h.x+2.5} y={h.y+1} style={{ fontSize:2.8, fill:"rgba(255,255,255,0.85)", fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{h.city}</text>
                    </g>
                  ))}
                </svg>
                <p style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:8, color:"rgba(255,255,255,0.6)", textAlign:"center", marginTop:8, letterSpacing:"0.14em" }}>GLOBAL EXPORT NETWORK · 48 MARKETS · GrainPro ECO-BARRIER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CH11: MOMENTS ───────────────────────────────────────────────────── */}
      <section ref={secRef("moments")} style={{ background:PC, padding:"100px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div className={`gp-reveal ${vis("moments") ? "vis" : ""} mb-12`}>
            <p style={{ fontSize:9, fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:FC, marginBottom:8 }}>11 — Moments</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px,4vw,44px)", fontWeight:400, lineHeight:1.1, color:AE }}>The Culture of Connection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { img:coffeeCeremonyEthiopiaImg, cap:"Traditional Ethiopian coffee ceremony with clay jebena, fresh green grass, frankincense smoke, and small finjal cups", aspect:"3/4" },
              { img:coffeeCeremonyWithIncenseImg, cap:"The sacred buna ceremony — frankincense smoke rising around the traditional coffee ritual", aspect:"4/5" },
              { img:coffeeCeremony3Img, cap:"Community gathering over the morning coffee ceremony — coffee as the language of togetherness", aspect:"3/4" },
            ].map((moment, mi) => (
              <div key={mi} className={`gp-reveal ${vis("moments") ? "vis" : ""} relative rounded-sm overflow-hidden group`} style={{ transitionDelay:`${0.1+mi*0.12}s`, aspectRatio:moment.aspect }}>
                <img loading="lazy" src={moment.img} alt={moment.cap} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:"brightness(0.85) saturate(1.05)" }}/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(15,12,10,0.88) 0%, transparent 50%)" }}/>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" style={{ boxShadow:`inset 0 0 0 1.5px ${EB}44` }}/>
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:14, color:`#F5EBE6`, lineHeight:1.5 }}>{moment.cap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}



// ── Country Selector ─────────────────────────────────────────────────────────
const COUNTRIES: { code: string; name: string; flag: string }[] = [
  {code:"AF",name:"Afghanistan",flag:"🇦🇫"},{code:"AL",name:"Albania",flag:"🇦🇱"},{code:"DZ",name:"Algeria",flag:"🇩🇿"},{code:"AD",name:"Andorra",flag:"🇦🇩"},{code:"AO",name:"Angola",flag:"🇦🇴"},{code:"AG",name:"Antigua and Barbuda",flag:"🇦🇬"},{code:"AR",name:"Argentina",flag:"🇦🇷"},{code:"AM",name:"Armenia",flag:"🇦🇲"},{code:"AU",name:"Australia",flag:"🇦🇺"},{code:"AT",name:"Austria",flag:"🇦🇹"},
  {code:"AZ",name:"Azerbaijan",flag:"🇦🇿"},{code:"BS",name:"Bahamas",flag:"🇧🇸"},{code:"BH",name:"Bahrain",flag:"🇧🇭"},{code:"BD",name:"Bangladesh",flag:"🇧🇩"},{code:"BB",name:"Barbados",flag:"🇧🇧"},{code:"BY",name:"Belarus",flag:"🇧🇾"},{code:"BE",name:"Belgium",flag:"🇧🇪"},{code:"BZ",name:"Belize",flag:"🇧🇿"},{code:"BJ",name:"Benin",flag:"🇧🇯"},{code:"BT",name:"Bhutan",flag:"🇧🇹"},
  {code:"BO",name:"Bolivia",flag:"🇧🇴"},{code:"BA",name:"Bosnia and Herzegovina",flag:"🇧🇦"},{code:"BW",name:"Botswana",flag:"🇧🇼"},{code:"BR",name:"Brazil",flag:"🇧🇷"},{code:"BN",name:"Brunei",flag:"🇧🇳"},{code:"BG",name:"Bulgaria",flag:"🇧🇬"},{code:"BF",name:"Burkina Faso",flag:"🇧🇫"},{code:"BI",name:"Burundi",flag:"🇧🇮"},{code:"CV",name:"Cabo Verde",flag:"🇨🇻"},{code:"KH",name:"Cambodia",flag:"🇰🇭"},
  {code:"CM",name:"Cameroon",flag:"🇨🇲"},{code:"CA",name:"Canada",flag:"🇨🇦"},{code:"CF",name:"Central African Republic",flag:"🇨🇫"},{code:"TD",name:"Chad",flag:"🇹🇩"},{code:"CL",name:"Chile",flag:"🇨🇱"},{code:"CN",name:"China",flag:"🇨🇳"},{code:"CO",name:"Colombia",flag:"🇨🇴"},{code:"KM",name:"Comoros",flag:"🇰🇲"},{code:"CG",name:"Congo",flag:"🇨🇬"},{code:"CR",name:"Costa Rica",flag:"🇨🇷"},
  {code:"HR",name:"Croatia",flag:"🇭🇷"},{code:"CU",name:"Cuba",flag:"🇨🇺"},{code:"CY",name:"Cyprus",flag:"🇨🇾"},{code:"CZ",name:"Czech Republic",flag:"🇨🇿"},{code:"DK",name:"Denmark",flag:"🇩🇰"},{code:"DJ",name:"Djibouti",flag:"🇩🇯"},{code:"DM",name:"Dominica",flag:"🇩🇲"},{code:"DO",name:"Dominican Republic",flag:"🇩🇴"},{code:"EC",name:"Ecuador",flag:"🇪🇨"},{code:"EG",name:"Egypt",flag:"🇪🇬"},
  {code:"SV",name:"El Salvador",flag:"🇸🇻"},{code:"GQ",name:"Equatorial Guinea",flag:"🇬🇶"},{code:"ER",name:"Eritrea",flag:"🇪🇷"},{code:"EE",name:"Estonia",flag:"🇪🇪"},{code:"SZ",name:"Eswatini",flag:"🇸🇿"},{code:"ET",name:"Ethiopia",flag:"🇪🇹"},{code:"FJ",name:"Fiji",flag:"🇫🇯"},{code:"FI",name:"Finland",flag:"🇫🇮"},{code:"FR",name:"France",flag:"🇫🇷"},{code:"GA",name:"Gabon",flag:"🇬🇦"},
  {code:"GM",name:"Gambia",flag:"🇬🇲"},{code:"GE",name:"Georgia",flag:"🇬🇪"},{code:"DE",name:"Germany",flag:"🇩🇪"},{code:"GH",name:"Ghana",flag:"🇬🇭"},{code:"GR",name:"Greece",flag:"🇬🇷"},{code:"GD",name:"Grenada",flag:"🇬🇩"},{code:"GT",name:"Guatemala",flag:"🇬🇹"},{code:"GN",name:"Guinea",flag:"🇬🇳"},{code:"GW",name:"Guinea-Bissau",flag:"🇬🇼"},{code:"GY",name:"Guyana",flag:"🇬🇾"},
  {code:"HT",name:"Haiti",flag:"🇭🇹"},{code:"HN",name:"Honduras",flag:"🇭🇳"},{code:"HU",name:"Hungary",flag:"🇭🇺"},{code:"IS",name:"Iceland",flag:"🇮🇸"},{code:"IN",name:"India",flag:"🇮🇳"},{code:"ID",name:"Indonesia",flag:"🇮🇩"},{code:"IR",name:"Iran",flag:"🇮🇷"},{code:"IQ",name:"Iraq",flag:"🇮🇶"},{code:"IE",name:"Ireland",flag:"🇮🇪"},{code:"IL",name:"Israel",flag:"🇮🇱"},
  {code:"IT",name:"Italy",flag:"🇮🇹"},{code:"JM",name:"Jamaica",flag:"🇯🇲"},{code:"JP",name:"Japan",flag:"🇯🇵"},{code:"JO",name:"Jordan",flag:"🇯🇴"},{code:"KZ",name:"Kazakhstan",flag:"🇰🇿"},{code:"KE",name:"Kenya",flag:"🇰🇪"},{code:"KI",name:"Kiribati",flag:"🇰🇮"},{code:"KW",name:"Kuwait",flag:"🇰🇼"},{code:"KG",name:"Kyrgyzstan",flag:"🇰🇬"},{code:"LA",name:"Laos",flag:"🇱🇦"},
{code:"LV",name:"Latvia",flag:"🇱🇻"},{code:"LB",name:"Lebanon",flag:"🇱🇧"},{code:"LS",name:"Lesotho",flag:"🇱🇸"},{code:"LR",name:"Liberia",flag:"🇱🇷"},{code:"LY",name:"Libya",flag:"🇱🇾"},{code:"LI",name:"Liechtenstein",flag:"🇱🇮"},{code:"LT",name:"Lithuania",flag:"🇱🇹"},{code:"LU",name:"Luxembourg",flag:"🇱🇺"},{code:"MG",name:"Madagascar",flag:"🇲🇬"},{code:"MW",name:"Malawi",flag:"🇲🇼"},
  {code:"MY",name:"Malaysia",flag:"🇲🇾"},{code:"MV",name:"Maldives",flag:"🇲🇻"},{code:"ML",name:"Mali",flag:"🇲🇱"},{code:"MT",name:"Malta",flag:"🇲🇹"},{code:"MH",name:"Marshall Islands",flag:"🇲🇭"},{code:"MR",name:"Mauritania",flag:"🇲🇷"},{code:"MU",name:"Mauritius",flag:"🇲🇺"},{code:"MX",name:"Mexico",flag:"🇲🇽"},{code:"FM",name:"Micronesia",flag:"🇫🇲"},{code:"MD",name:"Moldova",flag:"🇲🇩"},
  {code:"MC",name:"Monaco",flag:"🇲🇨"},{code:"MN",name:"Mongolia",flag:"🇲🇳"},{code:"ME",name:"Montenegro",flag:"🇲🇪"},{code:"MA",name:"Morocco",flag:"🇲🇦"},{code:"MZ",name:"Mozambique",flag:"🇲🇿"},{code:"MM",name:"Myanmar",flag:"🇲🇲"},{code:"NA",name:"Namibia",flag:"🇳🇦"},{code:"NR",name:"Nauru",flag:"🇳🇷"},{code:"NP",name:"Nepal",flag:"🇳🇵"},{code:"NL",name:"Netherlands",flag:"🇳🇱"},
  {code:"NZ",name:"New Zealand",flag:"🇳🇿"},{code:"NI",name:"Nicaragua",flag:"🇳🇮"},{code:"NE",name:"Niger",flag:"🇳🇪"},{code:"NG",name:"Nigeria",flag:"🇳🇬"},{code:"NO",name:"Norway",flag:"🇳🇴"},{code:"OM",name:"Oman",flag:"🇴🇲"},{code:"PK",name:"Pakistan",flag:"🇵🇰"},{code:"PW",name:"Palau",flag:"🇵🇼"},{code:"PA",name:"Panama",flag:"🇵🇦"},{code:"PG",name:"Papua New Guinea",flag:"🇵🇬"},
  {code:"PY",name:"Paraguay",flag:"🇵🇾"},{code:"PE",name:"Peru",flag:"🇵🇪"},{code:"PH",name:"Philippines",flag:"🇵🇭"},{code:"PL",name:"Poland",flag:"🇵🇱"},{code:"PT",name:"Portugal",flag:"🇵🇹"},{code:"QA",name:"Qatar",flag:"🇶🇦"},{code:"RO",name:"Romania",flag:"🇷🇴"},{code:"RU",name:"Russia",flag:"🇷🇺"},{code:"RW",name:"Rwanda",flag:"🇷🇼"},{code:"KN",name:"Saint Kitts and Nevis",flag:"🇰🇳"},
  {code:"LC",name:"Saint Lucia",flag:"🇱🇨"},{code:"VC",name:"Saint Vincent and the Grenadines",flag:"🇻🇨"},{code:"WS",name:"Samoa",flag:"🇼🇸"},{code:"SM",name:"San Marino",flag:"🇸🇲"},{code:"ST",name:"Sao Tome and Principe",flag:"🇸🇹"},{code:"SA",name:"Saudi Arabia",flag:"🇸🇦"},{code:"SN",name:"Senegal",flag:"🇸🇳"},{code:"RS",name:"Serbia",flag:"🇷🇸"},{code:"SC",name:"Seychelles",flag:"🇸🇨"},{code:"SL",name:"Sierra Leone",flag:"🇸🇱"},
  {code:"SG",name:"Singapore",flag:"🇸🇬"},{code:"SK",name:"Slovakia",flag:"🇸🇰"},{code:"SI",name:"Slovenia",flag:"🇸🇮"},{code:"SB",name:"Solomon Islands",flag:"🇸🇧"},{code:"SO",name:"Somalia",flag:"🇸🇴"},{code:"ZA",name:"South Africa",flag:"🇿🇦"},{code:"SS",name:"South Sudan",flag:"🇸🇸"},{code:"ES",name:"Spain",flag:"🇪🇸"},{code:"LK",name:"Sri Lanka",flag:"🇱🇰"},{code:"SD",name:"Sudan",flag:"🇸🇩"},
  {code:"SR",name:"Suriname",flag:"🇸🇷"},{code:"SE",name:"Sweden",flag:"🇸🇪"},{code:"CH",name:"Switzerland",flag:"🇨🇭"},{code:"SY",name:"Syria",flag:"🇸🇾"},{code:"TW",name:"Taiwan",flag:"🇹🇼"},{code:"TJ",name:"Tajikistan",flag:"🇹🇯"},{code:"TZ",name:"Tanzania",flag:"🇹🇿"},{code:"TH",name:"Thailand",flag:"🇹🇭"},{code:"TL",name:"Timor-Leste",flag:"🇹🇱"},{code:"TG",name:"Togo",flag:"🇹🇬"},
  {code:"TO",name:"Tonga",flag:"🇹🇴"},{code:"TT",name:"Trinidad and Tobago",flag:"🇹🇹"},{code:"TN",name:"Tunisia",flag:"🇹🇳"},{code:"TR",name:"Turkey",flag:"🇹🇷"},{code:"TM",name:"Turkmenistan",flag:"🇹🇲"},{code:"TV",name:"Tuvalu",flag:"🇹🇻"},{code:"UG",name:"Uganda",flag:"🇺🇬"},{code:"UA",name:"Ukraine",flag:"🇺🇦"},{code:"AE",name:"United Arab Emirates",flag:"🇦🇪"},{code:"GB",name:"United Kingdom",flag:"🇬🇧"},
  {code:"US",name:"United States",flag:"🇺🇸"},{code:"UY",name:"Uruguay",flag:"🇺🇾"},{code:"UZ",name:"Uzbekistan",flag:"🇺🇿"},{code:"VU",name:"Vanuatu",flag:"🇻🇺"},{code:"VA",name:"Vatican City",flag:"🇻🇦"},{code:"VE",name:"Venezuela",flag:"🇻🇪"},{code:"VN",name:"Vietnam",flag:"🇻🇳"},{code:"YE",name:"Yemen",flag:"🇾🇪"},{code:"ZM",name:"Zambia",flag:"🇿🇲"},{code:"ZW",name:"Zimbabwe",flag:"🇿🇼"},
].sort((a, b) => a.name.localeCompare(b.name));

function CountrySelector({ value, onChange, inputStyle, FL, isDark }: {
  value: string; onChange: (v: string) => void;
  inputStyle: React.CSSProperties; FL: string; isDark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const surfBg   = "var(--card-bg, #FFFFFF)";
  const surfBorder = "var(--card-border, rgba(0,0,0,0.1))";
  const surfText = "var(--text-main, #0F0C0A)";
  const selected = COUNTRIES.find(c => c.name === value);
  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => { if (open && searchRef.current) searchRef.current.focus(); }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", zIndex: open ? 200 : 1 }}>
      <button type="button"
        onClick={() => { setOpen(o => !o); setSearch(""); }}
        aria-haspopup="listbox" aria-expanded={open}
        style={{
          ...inputStyle, display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
          textAlign: "left", border: open ? `1px solid ${FL}` : (inputStyle.border as string),
          background: "var(--input-bg)",
          color: selected ? surfText : "var(--text-mute)",
        }}>
        {selected
          ? <><span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{selected.flag}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: surfText, fontSize: 14 }}>{selected.name}</span></>
          : <span style={{ flex: 1, color: "var(--text-mute)", fontSize: 14 }}>Select country...</span>}
        <span style={{ fontSize: 10, opacity: 0.6, flexShrink: 0, color: surfText }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: surfBg,
          border: `1px solid ${surfBorder}`,
          borderRadius: 2, overflow: "hidden", zIndex: 300,
          boxShadow: "0 20px 48px rgba(0,0,0,0.25)", maxHeight: 260,
        }}>
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${surfBorder}` }}>
            <input ref={searchRef} type="text" value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search countries..."
              style={{
                width: "100%", padding: "8px 12px", fontSize: 13,
                background: "var(--input-bg)",
                border: `1px solid var(--input-border)`,
                color: surfText, outline: "none", borderRadius: 1, boxSizing: "border-box",
              }} />
          </div>
          <div style={{ overflowY: "auto", maxHeight: 200 }} role="listbox">
            {filtered.length === 0
              ? <div style={{ padding: "12px 14px", fontSize: 13, color: "var(--text-mute)" }}>No results</div>
              : filtered.map(c => (
                <button key={c.code} type="button" role="option" aria-selected={value === c.name}
                  onClick={() => { onChange(c.name); setOpen(false); setSearch(""); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    width: "100%", padding: "9px 14px",
                    background: value === c.name ? "rgba(200,82,39,0.15)" : "transparent",
                    border: "none", cursor: "pointer", textAlign: "left",
                    color: value === c.name ? "var(--primary)" : surfText,
                    fontSize: 13, transition: "background 0.12s ease",
                  }}
                  onMouseEnter={e => { if (value !== c.name) (e.currentTarget as HTMLElement).style.background = "var(--bg-surface)"; }}
                  onMouseLeave={e => { if (value !== c.name) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{c.flag}</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
function ContactPage() {
  const WI = "var(--bg-main)"; const PC = "var(--bg-surface)"; const AE = "var(--text-main)";
  const HF = "var(--bg-dark-section)"; const RC = "#5B3A29"; const FC = "var(--primary)";
  const EB = "var(--accent)"; const FL = "var(--accent)"; const GF = "#D4AF37";
  const CD = "var(--card-bg)"; const CB = "var(--card-border)";
  const TS = "var(--text-sub)"; const TM = "var(--text-mute)";
  const TW = "var(--text-on-dark, #FDFBF7)"; const TWS = "var(--text-on-dark-sub, rgba(253,251,247,0.78))";
  const u = (id: string, w: number, h: number) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;
  const [isDark, setIsDark] = useState(() => document.documentElement.getAttribute("data-theme") === "dark");
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.documentElement.getAttribute("data-theme") === "dark"));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const [form, setForm] = useState({ name: "", company: "", country: "", email: "", phone: "", volume: "", coffeeType: "", greenBeanRegion: "", message: "", website_url_hp: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [visExport, setVisExport] = useState(false);
  const [visBuyers, setVisBuyers] = useState(false);
  const [visForm, setVisForm] = useState(false);
  const exportRef = useRef<HTMLElement>(null);
  const buyersRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisExport(true); }, { threshold: 0.1 });
    if (exportRef.current) obs.observe(exportRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisBuyers(true); }, { threshold: 0.1 });
    if (buyersRef.current) obs.observe(buyersRef.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisForm(true); }, { threshold: 0.1 });
    if (formRef.current) obs.observe(formRef.current);
    return () => obs.disconnect();
  }, []);

  const exportCategories = [
    { icon: "◫", title: "Private Label", sub: "OEM Available", desc: "Custom roast profiles, packaging design, and brand labeling for wholesale buyers." },
    { icon: "⬤", title: "Wholesale Bulk", sub: "FCL / LCL", desc: "Full and partial container loads. Minimum 1 MT green coffee or 500 kg roasted." },
    { icon: "❋", title: "Heirloom Varieties", sub: "Wild & Forest", desc: "Uncatalogued wild Arabica landraces from Kaffa and Bale forests — genetically unique, available in limited micro-lots." },
  ];

  const buyers = [
    { type: "Specialty Roasters", markets: "Europe · Japan · USA · Australia", desc: "Direct relationships with micro-roasters and specialty houses seeking traceable single-origin lots." },
    { type: "Coffee Importers", markets: "Hamburg · Amsterdam · New York", desc: "FOB Djibouti export documentation, phytosanitary certificates, ICO certificates of origin." },
    { type: "Distributors", markets: "Middle East · Southeast Asia", desc: "Regional distribution partners for branded Ethiopian specialty coffee in retail and HoReCa." },
    { type: "Hotels & Airlines", markets: "Global", desc: "Bespoke blends and private label programs for premium hospitality groups." },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    // Client-side validation
    if (!form.name.trim()) { setSendError("Please enter your full name."); return; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setSendError("Please enter a valid email address."); return; }
    if (!form.country) { setSendError("Please select your country."); return; }
    if (!form.coffeeType) { setSendError("Please select a coffee type."); return; }
    if (form.coffeeType.startsWith("Green Beans") && !form.greenBeanRegion) { setSendError("Please select your preferred Ethiopian origin/region."); return; }
    
    // Anti-bot honeypot check
    if (form.website_url_hp) {
      setSubmitted(true);
      return;
    }

    setSending(true);
    setSendError("");
    try {
      // Connect to production hardened backend API endpoint
      const apiUrl = import.meta.env.VITE_API_URL || "/api/contact";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company || "",
          country: form.country,
          email: form.email,
          phone: form.phone || "",
          coffeeType: form.coffeeType,
          greenBeanRegion: form.greenBeanRegion || "",
          volume: form.volume || "",
          message: form.message || "",
          website_url_hp: form.website_url_hp || "",
        }),
      });

      const data = await res.json();
      if (res.ok && (data.success === true || data.status === "ok")) {
        setSubmitted(true);
        setForm({ name: "", company: "", country: "", email: "", phone: "", volume: "", coffeeType: "", greenBeanRegion: "", message: "", website_url_hp: "" });
      } else {
        setSendError(data.error || data.message || "Submission failed. Please try again.");
      }
    } catch {
      setSendError("Could not send your inquiry. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    background: "var(--input-bg)", border: "1px solid var(--border-color)",
    color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14,
    outline: "none", transition: "border-color 0.2s ease, background 0.2s ease", boxSizing: "border-box",
  };

  return (
    <div style={{ background: WI, color: AE, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background-color 0.35s ease, color 0.35s ease" }}>

      {/* ══ HERO ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "90vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", background: "#0F0C0A" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img loading="eager" fetchPriority="high"
            src={u("1492619375914-8a7a2c48e2ef", 1920, 1080)}
            alt="Ethiopian specialty coffee export"
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateY(${scrollY * 0.12}px)` }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,12,10,0.92) 0%, rgba(91,58,41,0.65) 60%, rgba(15,12,10,0.5) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 2rem", width: "100%" }}>
          <div style={{ maxWidth: 780 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.25em", color: FL, textTransform: "uppercase", marginBottom: 28 }}>
              Flavor Coffee PLC · Addis Ababa, Ethiopia
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: 28, color: "var(--text-on-dark, #F5EDE4)" }}>
              Exporting Ethiopia{"’"}s Finest<br />
              <em style={{ color: FL }}>Specialty Coffee</em><br />
              To The World.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(253,251,247,0.72)", marginBottom: 52, maxWidth: 520 }}>
              Grade 1 Arabica. Traceable origins. SCA-certified. We partner with specialty roasters, importers, and distributors across six continents.
            </p>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[["30+", "Export Destinations"], ["Grade 1", "Arabica Only"], ["ECX", "Certified"], ["85+", "SCA Score"]].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, color: FL, lineHeight: 1 }}>{v}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(253,251,247,0.45)", textTransform: "uppercase", marginTop: 6 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT WE EXPORT ════════════════════════════════════════════════════════ */}
      <section ref={exportRef} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ opacity: visExport ? 1 : 0, transform: visExport ? "none" : "translateY(28px)", transition: "all 0.7s ease", marginBottom: 60 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FC, textTransform: "uppercase", marginBottom: 16 }}>Export Portfolio</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300, color: AE, lineHeight: 1.1 }}>
              What We Export.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportCategories.map((cat, i) => (
              <div key={cat.title}
                style={{
                  background: CD, padding: "36px 32px",
                  border: `1px solid ${CB}`,
                  borderLeft: `3px solid ${i % 2 === 0 ? FC : EB}`,
                  opacity: visExport ? 1 : 0,
                  transform: visExport ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease`,
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = `0 20px 48px rgba(0,0,0,0.12), inset 0 1px 0 ${i % 2 === 0 ? FC : EB}44`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}>
                <span style={{ fontSize: 24, display: "block", marginBottom: 18, color: i % 2 === 0 ? FC : EB }}>{cat.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: AE, marginBottom: 4, lineHeight: 1.2 }}>{cat.title}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: FC, textTransform: "uppercase", marginBottom: 12 }}>{cat.sub}</p>
                <div style={{ height: 1, background: CB, marginBottom: 12 }} />
                <p style={{ fontSize: 13, lineHeight: 1.8, color: TS }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHO WE SERVE ══════════════════════════════════════════════════════════ */}
      <section ref={buyersRef} style={{ background: WI, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="cp-buyers-grid grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16 items-start">
            <div style={{ opacity: visBuyers ? 1 : 0, transform: visBuyers ? "none" : "translateX(-24px)", transition: "all 0.7s ease" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FC, textTransform: "uppercase", marginBottom: 20 }}>Our Buyers</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.8rem)", fontWeight: 300, color: AE, lineHeight: 1.1, marginBottom: 28 }}>
                Trusted by the<br /><em>World{"’"}s Best</em><br />Roasters.
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: TS, maxWidth: 380 }}>
                From micro-roasters in Tokyo to specialty importers in Hamburg — we serve buyers who demand provenance, precision, and partnership.
              </p>
              <div style={{ marginTop: 48 }}>
                <img loading="lazy"
                  src={contactusBuyersImg}
                  alt="Flavor Coffee PLC buyers — specialty roasters and importers worldwide"
                  style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: visBuyers ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
              {buyers.map((b, i) => (
                <div key={b.type} style={{ background: CD, padding: "36px 32px", border: `1px solid ${CB}`, borderLeft: `3px solid ${i % 2 === 0 ? FC : EB}` }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: AE, marginBottom: 4 }}>{b.type}</h3>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: FC, textTransform: "uppercase", marginBottom: 14 }}>{b.markets}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: TS }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ INQUIRY FORM ══════════════════════════════════════════════════════════ */}
      <section ref={formRef} style={{ background: PC, padding: "clamp(60px, 9vw, 120px) 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="cp-form-grid grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">

            {/* Left — contact info */}
            <div style={{ opacity: visForm ? 1 : 0, transform: visForm ? "none" : "translateX(-24px)", transition: "all 0.7s ease" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FC, textTransform: "uppercase", marginBottom: 20 }}>Get In Touch</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.8rem)", fontWeight: 300, color: AE, lineHeight: 1.1, marginBottom: 32 }}>
                Start Your<br /><em style={{ color: FC }}>Export Inquiry.</em>
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: TS, marginBottom: 52 }}>
                Fill in the form and a member of our export team will respond within 24 hours. For urgent inquiries, reach us directly on WhatsApp.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { icon: "📍", label: "Office", value: "Bole Flamingo, in front of Dembel City Center, TG Building, 1st Floor, Addis Ababa" },
                  { icon: "✉", label: "Email", value: "flavorcoffee.team@gmail.com" },
                  { icon: "☎", label: "Phone / WhatsApp", value: "+251922559021" },
                ].map(item => (
                  <div key={item.label} style={{ padding: "20px 0", borderBottom: `1px solid ${CB}`, display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: TM, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</p>
                      {item.label === "Email" ? (
                        <a href={`mailto:${item.value}`} style={{ fontSize: 14, color: AE, textDecoration: "none" }}>{item.value}</a>
                      ) : item.label === "Phone / WhatsApp" ? (
                        <a href={`tel:${item.value}`} style={{ fontSize: 14, color: AE, textDecoration: "none" }}>{item.value} <span style={{ fontSize: 11, color: "#25D366" }}>· WhatsApp</span></a>
                      ) : (
                        <p style={{ fontSize: 14, color: AE }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 12 }}>
                {/* WhatsApp — opens directly in WhatsApp app / web */}
                <a
                  href="https://wa.me/251922559021?text=Hello%20Flavor%20Coffee%20PLC%2C%20I%20would%20like%20to%20inquire%20about%20your%20coffee%20export%20services."
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 12,
                    padding: "14px 28px", background: "#25D366", color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    letterSpacing: "0.16em", textDecoration: "none", textTransform: "uppercase",
                    transition: "all 0.25s ease", borderRadius: 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#1ebe5d"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#25D366"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
                {/* Also show the number as a tel link for mobile dialing */}
                <a href="tel:+251922559021"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: FC, letterSpacing: "0.14em", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>☎</span> +251922559021
                </a>
              </div>

              {/* Ethiopia location visual */}
              <div style={{ marginTop: 52, position: "relative" }}>
                <img loading="lazy"
                  src={u("1497935586351-b67a49e012d2", 600, 400)}
                  alt="Ethiopian coffee highland landscape"
                  style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 2 }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(15,12,10,0.5)", borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#FFFFFF", fontStyle: "italic" }}>Ethiopia, Horn of Africa</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: FC, textTransform: "uppercase", marginTop: 8 }}>9.1450° N, 40.4897° E</p>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div style={{ opacity: visForm ? 1 : 0, transform: visForm ? "none" : "translateX(24px)", transition: "all 0.7s ease 0.15s" }}>
              {submitted ? (
                <div style={{ background: CD, border: `1px solid ${CB}`, padding: "64px 48px", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${FC}22`, border: `2px solid ${FC}`, color: FC, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 28 }}>✓</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: AE, marginBottom: 16 }}>Inquiry Sent</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: TS, maxWidth: 360 }}>
                    Thank you. Your inquiry has been sent successfully. Our team will get back to you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* Anti-Bot Honeypot Field — hidden from humans */}
                  <input
                    type="text"
                    name="website_url_hp"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website_url_hp}
                    onChange={e => setForm(prev => ({ ...prev, website_url_hp: e.target.value }))}
                  />
                  <div className="cp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { key: "name", label: "Full Name", type: "text", required: true },
                      { key: "company", label: "Company / Organization", type: "text", required: true },
                    ].map(f => (
                      <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: TM, textTransform: "uppercase" }}>{f.label}{f.required && " *"}</label>
                        <input type={f.type} required={f.required}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = FC)}
                          onBlur={e => (e.target.style.borderColor = "var(--input-border)")} />
                      </div>
                    ))}
                  </div>
                  <div className="cp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {/* Country selector */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: TM, textTransform: "uppercase" }}>Country *</label>
                      <CountrySelector
                        value={form.country}
                        onChange={v => setForm(prev => ({ ...prev, country: v }))}
                        inputStyle={inputStyle}
                        FL={FC}
                        isDark={isDark}
                      />
                    </div>
                    {/* Email */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: TM, textTransform: "uppercase" }}>Business Email *</label>
                      <input type="email" required
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = FC)}
                        onBlur={e => (e.target.style.borderColor = "var(--input-border)")} />
                    </div>
                  </div>
                  <div className="cp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { key: "phone", label: "Phone / WhatsApp", type: "tel", required: false },
                      { key: "volume", label: "Estimated Volume (MT/mo)", type: "text", required: false },
                    ].map(f => (
                      <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: TM, textTransform: "uppercase" }}>{f.label}</label>
                        <input type={f.type}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = FC)}
                          onBlur={e => (e.target.style.borderColor = "var(--input-border)")} />
                      </div>
                    ))}
                  </div>

                  {/* Coffee Type */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: TM, textTransform: "uppercase" }}>Coffee Type</label>
                    <select value={form.coffeeType}
                      onChange={e => setForm(prev => ({ ...prev, coffeeType: e.target.value, greenBeanRegion: "" }))}
                      style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", background: "var(--input-bg)", color: "var(--text-main)", cursor: "pointer" }}>
                      <option value="" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Select type...</option>
                      <option value="Green Beans — Unroasted" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Green Beans (Unroasted)</option>
                      <option value="Roasted Coffee" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Roasted Coffee</option>
                      <option value="Single-Origin Traceable Lot" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Single-Origin Traceable Lot</option>
                      <option value="Private Label Program" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Private Label Program</option>
                      <option value="Wholesale Bulk (FCL/LCL)" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Wholesale Bulk (FCL / LCL)</option>
                    </select>
                  </div>

                  {/* Green Bean Region — only when Green Beans selected */}
                  {form.coffeeType.startsWith("Green Beans") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, animation: "cpFadeUp 0.35s ease both" }}>
                      <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: FC, textTransform: "uppercase" }}>Preferred Origin / Region *</label>
                      <select value={form.greenBeanRegion} required
                        onChange={e => setForm(prev => ({ ...prev, greenBeanRegion: e.target.value }))}
                        style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", background: "var(--input-bg)", color: "var(--text-main)", cursor: "pointer", borderColor: `${FC}88` }}>
                        <option value="" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Select Ethiopian origin...</option>
                        <option value="Bench Maji" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Bench Maji</option>
                        <option value="Guji" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Guji</option>
                        <option value="Harrar" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Harrar</option>
                        <option value="Limu" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Limu</option>
                        <option value="Yirgacheffe" style={{ background: "var(--card-bg)", color: "var(--text-main)" }}>Yirgacheffe</option>
                      </select>
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: TM, textTransform: "uppercase" }}>Message</label>
                    <textarea rows={5} placeholder="Tell us about your requirements, preferred origins, and timeline..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                      onFocus={e => (e.target.style.borderColor = FC)}
                      onBlur={e => (e.target.style.borderColor = "var(--input-border)")} />
                  </div>

                  {/* Error message */}
                  {sendError && (
                    <p style={{ fontSize: 13, color: "#FF6B6B", padding: "12px 16px", background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", lineHeight: 1.6 }}>
                      {sendError}
                    </p>
                  )}

                  <button type="submit" disabled={sending}
                    style={{
                      padding: "18px 40px", background: sending ? "rgba(200,82,39,0.5)" : FC, color: "#FFFFFF",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
                      textTransform: "uppercase", border: "none", cursor: sending ? "not-allowed" : "pointer",
                      transition: "opacity 0.2s, background 0.2s", alignSelf: "flex-start",
                      display: "flex", alignItems: "center", gap: 10, borderRadius: 2,
                    }}
                    onMouseEnter={e => { if (!sending) (e.currentTarget.style.opacity = "0.9"); }}
                    onMouseLeave={e => { (e.currentTarget.style.opacity = "1"); }}>
                    {sending ? (
                      <>
                        <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#FFFFFF", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                        Sending…
                      </>
                    ) : "Submit Inquiry →"}
                  </button>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: TM, marginTop: 8 }}>
                    We respond within 24 business hours. Your information is kept strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GLOBAL DESTINATIONS ═══════════════════════════════════════════════════ */}
      <section style={{ background: RC, padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start lg:items-center">
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FC, textTransform: "uppercase", marginBottom: 12 }}>We Export To</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: TW }}>30+</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: TWS, textTransform: "uppercase" }}>Countries</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Germany", "Japan", "United States", "South Korea", "Australia", "Netherlands", "United Kingdom", "France", "Canada", "UAE", "Singapore", "Sweden", "Denmark", "Norway", "Switzerland", "Belgium", "Italy", "Saudi Arabia", "China", "Taiwan"].map(c => (
                <span key={c} style={{
                  padding: "7px 16px", border: "1px solid rgba(255,255,255,0.22)",
                  background: "rgba(255,255,255,0.07)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.12em",
                  color: "#FFFFFF", borderRadius: 2
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PREMIUM EXPORT STATEMENT ════════════════════════════════════════════ */}
      <section style={{ background: "#1C2B22", padding: "100px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", color: FC, textTransform: "uppercase", marginBottom: 20 }}>Our Export Promise</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.8rem)", fontWeight: 300, color: "#FDFBF7", lineHeight: 1.1, marginBottom: 28 }}>
                From Origin<br />to <em style={{ color: FC }}>Destination.</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.95, color: "rgba(253,251,247,0.85)", marginBottom: 40 }}>
                We proudly export Ethiopia's finest Grade 1 Specialty Arabica Coffee to partners around the world. 
                Every shipment reflects our commitment to quality, traceability, sustainability, and excellence 
                from origin to destination.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  ["Quality", "Grade 1 Arabica · SCA 85+ Cupped"],
                  ["Traceability", "Farm-to-port documentation"],
                  ["Sustainability", "Smallholder partnership model"],
                  ["Logistics", "FOB Djibouti · GrainPro lined"],
                  ["Certification", "ECX · ICO · Phytosanitary"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 24, padding: "16px 0", borderBottom: "1px solid rgba(253,251,247,0.12)" }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: FC, minWidth: 120, textTransform: "uppercase" }}>{k}</p>
                    <p style={{ fontSize: 13, color: "rgba(253,251,247,0.82)", lineHeight: 1.6 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img loading="lazy" src={warehouseImg} alt="Flavor Coffee PLC — green coffee jute sacks stacked for export" style={{ width: "100%", height: 520, objectFit: "cover", objectPosition: "center", borderRadius: 2 }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(91,58,41,0.3) 0%, transparent 60%)", borderRadius: 2 }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                <div style={{ background: "rgba(15,12,10,0.88)", padding: "20px 24px", backdropFilter: "blur(8px)", borderRadius: 2 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#FDFBF7", fontStyle: "italic", marginBottom: 8 }}>
                    "Every bag that leaves Ethiopia carries the story of the farmer, the land, and our craft."
                  </p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: FC, textTransform: "uppercase" }}>Flavor Coffee PLC · Export Division</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

function AppInner() {
  const [page, setPage] = useState<Page>("home");
  const [targetRegion, setTargetRegion] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div style={{ background: "var(--bg-main)", color: "var(--text-main)", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background-color 0.35s ease, color 0.35s ease", minHeight: "100vh" }}>
      <style>{`
        /* Focus rings */
        [data-theme="dark"] :focus-visible,
        .dark :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        :focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }

        @keyframes scrollBar {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fcZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        @keyframes fcFadeUp {
          0%   { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fcScroll {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes fcFloat {
          0%   { transform: translateY(0px) scale(1); opacity: 0.4; }
          100% { transform: translateY(-18px) scale(1.22); opacity: 0.85; }
        }
        @keyframes mistDrift {
          0%   { transform: translateX(-8%) scaleX(1.06); opacity: 0.12; }
          100% { transform: translateX(6%) scaleX(1); opacity: 0.26; }
        }
        @keyframes dashFlow {
          0%   { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.72); opacity: 0.7; }
          60%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,82,39,0.25); border-radius: 2px; }
        * { scroll-behavior: smooth; }
        .group:hover .group-hover\\:scale-108 { transform: scale(1.08); }
      `}</style>

      <Nav page={page} setPage={setPage} />

      <main>
        {page === "home" && <HomePage setPage={setPage} setTargetRegion={setTargetRegion} />}
        {page === "about" && <AboutPage setPage={setPage} />}
        {page === "origins" && <OriginsPage setPage={setPage} targetRegion={targetRegion} onRegionReached={() => setTargetRegion(null)} />}
        {page === "roasting" && <RoastingPage setPage={setPage} />}
        {page === "gallery" && <GalleryPage setPage={setPage} />}
        {page === "contact" && <ContactPage />}
        {page === "privacy" && <PrivacyPolicyPage setPage={setPage} />}
        {page === "terms" && <TermsOfServicePage setPage={setPage} />}
        {page === "cookies" && <CookiePolicyPage setPage={setPage} />}
      </main>

      <Footer setPage={setPage} />

      {/* Floating Realtime Gemini Voice Assistant (Beside Chatbot) */}
      <VoiceAssistant
        onNavigatePage={(targetPage) => {
          setPage(targetPage as Page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Floating Coffee Assistant (Bottom-Right) */}
      <CoffeeAssistant
        onNavigatePage={(targetPage) => {
          setPage(targetPage as Page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
