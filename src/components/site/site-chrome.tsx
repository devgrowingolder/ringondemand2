"use client";

import {
  ArrowRight,
  ChevronDown,
  Menu,
  PhoneCall,
  Route,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const productLinks = [
  {
    href: "/#how-it-works",
    label: "How it works",
    detail: "Define, route, and review every campaign.",
    icon: Route,
  },
  {
    href: "/agents",
    label: "Buyer workspace",
    detail: "One operating view for every live conversation.",
    icon: PhoneCall,
  },
];

const verticalLinks = [
  { href: "/verticals/final-expense", label: "Final expense" },
  { href: "/verticals/medicare", label: "Medicare" },
  { href: "/verticals/auto-insurance", label: "Auto insurance" },
  { href: "/verticals/home-services", label: "Home services" },
  { href: "/verticals/personal-injury", label: "Personal injury" },
  { href: "/verticals", label: "View every vertical" },
];

function NavDropdown({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="nav-dropdown">
      <button className="nav-link nav-dropdown-trigger" type="button">
        {label}
        <ChevronDown aria-hidden="true" size={14} strokeWidth={1.6} />
      </button>
      <div className={`nav-dropdown-panel ${wide ? "is-wide" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <Link className="announcement-bar" href="/agents">
      <span>Meet the new Ring On Demand buyer experience</span>
      <span className="announcement-link">
        Explore the platform <ArrowRight aria-hidden="true" size={14} />
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand-lockup" href="/" aria-label="Ring On Demand home">
            <Image
              alt="Ring On Demand"
              height={52}
              priority
              src="/brand/ring-on-demand-logo.png"
              width={250}
            />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavDropdown label="Product" wide>
              <div className="nav-product-grid">
                {productLinks.map(({ href, label, detail, icon: Icon }) => (
                  <Link className="nav-product-link" href={href} key={href}>
                    <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                    <span>
                      <strong>{label}</strong>
                      <small>{detail}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </NavDropdown>
            <Link className="nav-link" href="/#buying-models">
              Solutions
            </Link>
            <NavDropdown label="Verticals">
              <div className="nav-vertical-list">
                {verticalLinks.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </NavDropdown>
            <Link className="nav-link" href="/blog">
              Resources
            </Link>
            <Link className="nav-link" href="/partners">
              Partners
            </Link>
          </nav>

          <div className="desktop-actions">
            <a
              className="nav-link"
              href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
              rel="noreferrer"
              target="_blank"
            >
              Sign in
            </a>
            <Link className="nav-link" href="/build-campaign?intent=demo">
              Book a demo
            </Link>
            <Link className="button button-dark button-nav" href="/build-campaign">
              Build a campaign
            </Link>
          </div>

          <button
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-drawer">
          <nav aria-label="Mobile navigation">
            <p className="mobile-nav-label">Product</p>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/agents">Buyer workspace</Link>
            <Link href="/#buying-models">Buying models</Link>
            <Link href="/verticals">Verticals</Link>
            <Link href="/blog">Resources</Link>
            <Link href="/partners">Partners</Link>
          </nav>
          <div className="mobile-drawer-actions">
            <a
              className="button button-outline"
              href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
              rel="noreferrer"
              target="_blank"
            >
              Sign in
            </a>
            <Link className="button button-dark" href="/build-campaign">
              Build a campaign
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-cta">
        <div>
          <p className="section-code">[ READY WHEN YOU ARE ]</p>
          <h2>Build a campaign around the way your team closes.</h2>
          <p>
            Tell us your vertical, locations, hours, volume, and preferred
            delivery. We&apos;ll prepare one campaign brief for review.
          </p>
        </div>
        <div className="footer-cta-actions">
          <Link className="button button-light" href="/build-campaign">
            Start my campaign brief
          </Link>
          <Link className="button button-ghost-light" href="/build-campaign?intent=demo">
            Book a demo
          </Link>
        </div>
      </section>

      <div className="footer-grid">
        <div className="footer-brand">
          <Image
            alt="Ring On Demand"
            height={55}
            src="/brand/ring-on-demand-logo.png"
            width={270}
          />
          <p>
            Campaign infrastructure for inbound calls, exclusive leads, and
            appointments.
          </p>
        </div>
        <div>
          <h3>Product</h3>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/agents">Buyer workspace</Link>
          <Link href="/build-campaign">Build a campaign</Link>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/verticals">Verticals</Link>
          <Link href="/blog">Resources</Link>
          <Link href="/partners">Partners</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/customers">Customer experience</Link>
          <a href="mailto:hello@ringondemand.com">Contact</a>
          <a
            href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
            rel="noreferrer"
            target="_blank"
          >
            Sign in
          </a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Ring On Demand</span>
        <span>Privacy policy</span>
        <span>Terms of service</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
