"use client";

import {
  ArrowRight,
  Building2,
  ChevronDown,
  Link2,
  Menu,
  PhoneCall,
  Route,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { verticals } from "@/lib/verticals";

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
  {
    href: "/connected-apps",
    label: "Connected operations",
    detail: "Carry approved campaign data into downstream systems.",
    icon: Link2,
  },
];

const companyLinks = [
  { href: "/about", label: "About", icon: Building2 },
  { href: "/community", label: "Pay per call community", icon: Users },
  { href: "/brands", label: "Brand network", icon: Link2 },
  { href: "/careers", label: "Careers", icon: Route },
];

const verticalCategories = ["Insurance", "Home services", "Legal", "Financial"];

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
    <Link className="announcement-bar" href="/careers">
      <span>Help build the infrastructure behind live demand</span>
      <span className="announcement-link">
        Explore careers <ArrowRight aria-hidden="true" size={14} />
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
            <NavDropdown label="Verticals" wide>
              <div className="nav-vertical-mega">
                {verticalCategories.map((category) => (
                  <div key={category}>
                    <p>{category}</p>
                    {verticals
                      .filter((vertical) => vertical.category === category)
                      .map((vertical) => (
                        <Link
                          href={`/verticals/${vertical.slug}`}
                          key={vertical.slug}
                        >
                          {vertical.name}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
              <Link className="nav-view-all" href="/verticals">
                View all verticals
                <ArrowRight aria-hidden="true" size={14} />
              </Link>
            </NavDropdown>
            <Link className="nav-link" href="/blog">
              Resources
            </Link>
            <Link className="nav-link" href="/partners">
              Partners
            </Link>
            <NavDropdown label="Company">
              <div className="nav-product-grid">
                {companyLinks.map(({ href, label, icon: Icon }) => (
                  <Link className="nav-product-link" href={href} key={href}>
                    <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                    <span><strong>{label}</strong></span>
                  </Link>
                ))}
              </div>
            </NavDropdown>
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
            <Link href="/connected-apps">Connected operations</Link>
            <Link href="/#buying-models">Buying models</Link>
            <p className="mobile-nav-label">Verticals</p>
            <div className="mobile-vertical-grid">
              {verticals.map((vertical) => (
                <Link href={`/verticals/${vertical.slug}`} key={vertical.slug}>
                  {vertical.name}
                </Link>
              ))}
            </div>
            <Link href="/blog">Resources</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/about">About</Link>
            <Link href="/community">Pay per call community</Link>
            <Link href="/brands">Brand network</Link>
            <Link href="/careers">Careers</Link>
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
          <Link href="/connected-apps">Connected operations</Link>
          <Link href="/build-campaign">Build a campaign</Link>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/verticals">Verticals</Link>
          <Link href="/verticals/final-expense">Final Expense</Link>
          <Link href="/verticals/medicare">Medicare</Link>
          <Link href="/verticals/home-services">Home Services</Link>
          <Link href="/blog">Resources</Link>
          <Link href="/partners">Partners</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/customers">Customer experience</Link>
          <Link href="/about">About</Link>
          <Link href="/community">Pay per call community</Link>
          <Link href="/brands">Brand network</Link>
          <Link href="/careers">Careers</Link>
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
