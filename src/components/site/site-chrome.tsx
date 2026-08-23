"use client";

import {
  ArrowRight,
  Blocks,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Menu,
  PhoneCall,
  Route,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { verticalCategories } from "@/lib/verticals";

const productLinks = [
  {
    href: "/products/inbound-calls",
    label: "Inbound calls",
    detail: "Talk with people while they are on the phone.",
    icon: PhoneCall,
  },
  {
    href: "/products/real-time-leads",
    label: "Real-time leads",
    detail: "Receive contact details for your team to follow up with.",
    icon: FileText,
  },
  {
    href: "/products/booked-appointments",
    label: "Booked appointments",
    detail: "Begin with time already set aside for a conversation.",
    icon: CalendarDays,
  },
];

const platformLinks = [
  {
    href: "/platform",
    label: "Buyer workspace",
    detail: "Keep setup details, incoming items, and next steps together.",
    icon: LayoutDashboard,
  },
  {
    href: "/platform/campaign-setup",
    label: "Setup",
    detail: "Choose what you want, where, when, how many, and who.",
    icon: ClipboardCheck,
  },
  {
    href: "/platform/delivery",
    label: "Receiving options",
    detail: "Tell us where your team wants each item sent.",
    icon: Route,
  },
  {
    href: "/platform/quality-review",
    label: "Review details",
    detail: "Keep item details, outcomes, and review steps together.",
    icon: ShieldCheck,
  },
];

const resourceLinks = [
  {
    href: "/resources",
    label: "Resource center",
    detail: "Straightforward guides for buying calls, leads, and appointments.",
    icon: Blocks,
  },
  {
    href: "/blog",
    label: "Articles",
    detail: "Practical setup, pricing, and operations guidance.",
    icon: FileText,
  },
  {
    href: "/customers",
    label: "What to expect",
    detail: "See how the buying process is designed to work.",
    icon: Users,
  },
  {
    href: "/trust",
    label: "Trust center",
    detail: "Understand our proof, privacy, and review standards.",
    icon: ShieldCheck,
  },
];

const companyLinks = [
  ["/company/about", "About", "How Ring On Demand helps teams buy calls, leads, and appointments.", CircleHelp],
  ["/careers", "Careers", "Help build the infrastructure behind live customer conversations.", BriefcaseBusiness],
  ["/community", "Community", "Meet buyers, operators, and partners in pay per call.", Users],
  ["/brands", "Our brands", "Explore the consumer properties in our network.", Blocks],
] as const;

type DropdownLink = {
  href: string;
  label: string;
  detail: string;
  icon: typeof PhoneCall;
};

function DropdownCards({ links }: { links: readonly DropdownLink[] }) {
  return (
    <div className="signal-nav-card-grid">
      {links.map(({ href, label, detail, icon: Icon }) => (
        <Link className="signal-nav-card" href={href} key={href}>
          <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
          <span>
            <strong>{label}</strong>
            <small>{detail}</small>
          </span>
          <ArrowRight aria-hidden="true" size={14} />
        </Link>
      ))}
    </div>
  );
}

function NavDropdown({
  id,
  label,
  open,
  onOpen,
  onClose,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const panelId = `nav-panel-${id}`;

  return (
    <div
      className={`nav-dropdown ${open ? "is-open" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onClose();
        }
      }}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="nav-link nav-dropdown-trigger"
        onClick={onOpen}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowDown" ||
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            onOpen();
          }
          if (event.key === "Escape") {
            onClose();
          }
        }}
        type="button"
      >
        {label}
        <ChevronDown aria-hidden="true" size={13} strokeWidth={1.7} />
      </button>
      {open && (
        <div
          className={`nav-dropdown-panel ${wide ? "is-wide" : ""}`}
          id={panelId}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <Link className="announcement-bar" href="/get-pricing">
      <span>Looking for calls, leads, or appointments?</span>
      <span className="announcement-link">
        Start your pricing request <ArrowRight aria-hidden="true" size={14} />
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    if (!mobileOpen) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <>
      <header className="site-header signal-site-header">
        <div className="site-header-inner signal-header-inner">
          <Link className="brand-lockup signal-brand-lockup" href="/" aria-label="Ring On Demand home">
            <Image
              alt="Ring On Demand"
              height={36}
              priority
              src="/brand/ring-on-demand-logo.png"
              width={252}
            />
          </Link>

          <nav
            className="desktop-nav signal-desktop-nav"
            aria-label="Primary navigation"
          >
            <NavDropdown
              id="products"
              label="Products"
              open={activeDropdown === "products"}
              onClose={closeDropdown}
              onOpen={() => setActiveDropdown("products")}
              wide
            >
              <div className="signal-menu-heading">
                <span>Choose what fits your sales process</span>
                <Link href="/how-it-works">How it works <ArrowRight aria-hidden="true" size={13} /></Link>
              </div>
              <DropdownCards links={productLinks} />
            </NavDropdown>

            <NavDropdown
              id="verticals"
              label="Industries"
              open={activeDropdown === "verticals"}
              onClose={closeDropdown}
              onOpen={() => setActiveDropdown("verticals")}
              wide
            >
              <div className="signal-menu-heading">
                <span>Browse by industry</span>
                <Link href="/verticals">View all industries <ArrowRight aria-hidden="true" size={13} /></Link>
              </div>
              <div className="signal-vertical-menu">
                {verticalCategories.map((category) => (
                  <Link href={`/verticals#category-${category.slug}`} key={category.slug}>
                    <span>
                      <strong>{category.name}</strong>
                      <small>Explore</small>
                    </span>
                    <p>{category.description}</p>
                  </Link>
                ))}
              </div>
            </NavDropdown>

            <Link className="nav-link" href="/how-it-works">How it works</Link>

            <NavDropdown
              id="platform"
              label="Buyer workspace"
              open={activeDropdown === "platform"}
              onClose={closeDropdown}
              onOpen={() => setActiveDropdown("platform")}
              wide
            >
              <div className="signal-menu-heading">
                <span>From request to next step</span>
                <Link href="/platform/reporting">Reporting <ChartNoAxesCombined aria-hidden="true" size={13} /></Link>
              </div>
              <DropdownCards links={platformLinks} />
            </NavDropdown>

            <NavDropdown
              id="resources"
              label="Resources"
              open={activeDropdown === "resources"}
              onClose={closeDropdown}
              onOpen={() => setActiveDropdown("resources")}
              wide
            >
              <DropdownCards links={resourceLinks} />
            </NavDropdown>

            <Link className="nav-link" href="/partners">Partners</Link>

            <NavDropdown
              id="company"
              label="Company"
              open={activeDropdown === "company"}
              onClose={closeDropdown}
              onOpen={() => setActiveDropdown("company")}
              wide
            >
              <DropdownCards
                links={companyLinks.map(([href, label, detail, icon]) => ({ href, label, detail, icon }))}
              />
            </NavDropdown>
          </nav>

          <div className="desktop-actions signal-desktop-actions">
            <a
              className="nav-link"
              href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
              rel="noreferrer"
              target="_blank"
            >
              Buyer login
            </a>
            <Link className="button button-purple button-nav" href="/get-pricing">
              Get pricing
            </Link>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="mobile-menu-button signal-mobile-menu-button"
            onClick={() => setMobileOpen((value) => !value)}
            ref={menuButtonRef}
            type="button"
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="mobile-drawer signal-mobile-drawer"
          id="mobile-navigation"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setMobileOpen(false);
            }
          }}
          ref={drawerRef}
        >
          <nav aria-label="Mobile navigation">
            <p className="mobile-nav-label">Products</p>
            {productLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/how-it-works">How it works</Link>
            <p className="mobile-nav-label">Platform</p>
            {platformLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <p className="mobile-nav-label">Explore</p>
            <Link href="/verticals">All industries</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/company/about">About</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/community">Pay per call community</Link>
            <Link href="/brands">Our brands</Link>
            <Link href="/company/contact">Contact</Link>
          </nav>
          <div className="mobile-drawer-actions">
            <a
              className="button button-outline"
              href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
              rel="noreferrer"
              target="_blank"
            >
              Buyer login
            </a>
            <Link className="button button-purple" href="/get-pricing">
              Get pricing
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="site-footer signal-site-footer">
      {showCta && (
        <section className="footer-cta signal-footer-cta">
          <div>
            <p className="section-code">Ready to get started?</p>
            <h2>Tell us what your team needs.</h2>
            <p>
              Share what you want to receive, where your team works, when you
              can respond, and how much you can handle.
            </p>
          </div>
          <div className="footer-cta-actions">
            <Link className="button button-light" href="/get-pricing">Get pricing</Link>
            <Link className="button button-ghost-light" href="/book-a-call">Talk to our team</Link>
          </div>
        </section>
      )}

      <div className="footer-grid">
        <div className="footer-brand">
          <Image alt="Ring On Demand" height={55} src="/brand/ring-on-demand-logo.png" width={270} />
          <p>
            Ring On Demand helps sales teams plan inbound calls, real-time
            leads, and booked appointments around the way they work.
          </p>
        </div>
        <div>
          <h3>Products</h3>
          <Link href="/products/inbound-calls">Inbound calls</Link>
          <Link href="/products/real-time-leads">Real-time leads</Link>
          <Link href="/products/booked-appointments">Booked appointments</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/get-pricing">Get pricing</Link>
        </div>
        <div>
          <h3>Platform</h3>
          <Link href="/platform">Overview</Link>
          <Link href="/platform/campaign-setup">Setup</Link>
          <Link href="/platform/delivery">Receiving options</Link>
          <Link href="/platform/quality-review">Review details</Link>
          <Link href="/platform/reporting">Reporting</Link>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/verticals">All industries</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/customers">Customer experience</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/trust">Trust center</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/company/about">About</Link>
          <Link href="/community">Community</Link>
          <Link href="/brands">Our brands</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/company/contact">Contact</Link>
          <a href="https://ring-on-demand.proaxis.ai/cx/buyer/login" rel="noreferrer" target="_blank">Buyer login</a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Ring On Demand</span>
        <Link href="/legal/privacy">Privacy policy</Link>
        <Link href="/legal/terms">Terms of service</Link>
        <Link href="/legal/accessibility">Accessibility</Link>
      </div>
    </footer>
  );
}

export function SiteShell({
  children,
  showFooterCta = true,
}: {
  children: React.ReactNode;
  showFooterCta?: boolean;
}) {
  return (
    <div className="page-shell signal-page-shell">
      <SiteHeader />
      {children}
      <SiteFooter showCta={showFooterCta} />
    </div>
  );
}
