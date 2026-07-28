"use client";

import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  Link2,
  Menu,
  PhoneCall,
  Route,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  catalogVerticals,
  verticalCategories,
} from "@/lib/verticals";

const productLinks = [
  {
    href: "/#how-it-works",
    label: "How it works",
    detail: "Choose a service, set your rules, and review the details.",
    icon: Route,
  },
  {
    href: "/agents",
    label: "Buyer workspace",
    detail: "See deliveries, campaign settings, and follow-up in one place.",
    icon: PhoneCall,
  },
  {
    href: "/connected-apps",
    label: "Connected operations",
    detail: "Send calls, leads, and appointments to the right destination.",
    icon: Link2,
  },
  {
    href: "/onboarding",
    label: "Getting started",
    detail: "See the simple information we need to get started.",
    icon: ClipboardList,
  },
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
    <Link className="announcement-bar" href="/build-campaign">
      <span>Pay per call, pay per lead, or pay per appointment</span>
      <span className="announcement-link">
        Get pricing <ArrowRight aria-hidden="true" size={14} />
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (!open) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
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
            <NavDropdown label="Services" wide>
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
            <NavDropdown label="Verticals" wide>
              <div className="nav-vertical-summary">
                <span>Explore all {catalogVerticals.length} verticals</span>
                <small>{verticalCategories.length} markets</small>
              </div>
              <div className="nav-category-mega">
                {verticalCategories.map((category) => (
                  <Link
                    className="nav-category-link"
                    href={`/verticals#category-${category.slug}`}
                    key={category.slug}
                  >
                    <span>
                      <strong>{category.name}</strong>
                      <span>
                        {String(
                          catalogVerticals.filter(
                            (vertical) => vertical.category === category.name,
                          ).length,
                        ).padStart(2, "0")}
                      </span>
                    </span>
                    <small>{category.description}</small>
                  </Link>
                ))}
              </div>
              <Link className="nav-view-all" href="/verticals">
                View all verticals
                <ArrowRight aria-hidden="true" size={14} />
              </Link>
            </NavDropdown>
            <Link className="nav-link" href="/about">
              About
            </Link>
            <Link className="nav-link" href="/blog">
              Resources
            </Link>
            <Link className="nav-link" href="/partners">
              Partners
            </Link>
            <Link className="nav-link" href="mailto:hello@ringondemand.com">
              Contact
            </Link>
          </nav>

          <div className="desktop-actions">
            <a
              className="nav-link"
              href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
              aria-label="Open the Ring On Demand buyer portal in a new tab"
              rel="noreferrer"
              target="_blank"
            >
              Buyer login
            </a>
            <Link className="nav-link" href="/build-campaign?intent=demo">
              Book a call
            </Link>
            <Link className="button button-dark button-nav" href="/build-campaign">
              Get pricing
            </Link>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            ref={menuButtonRef}
            type="button"
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open && (
        <div
          className="mobile-drawer"
          id="mobile-navigation"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) {
              setOpen(false);
            }
          }}
          ref={drawerRef}
        >
          <nav aria-label="Mobile navigation">
            <p className="mobile-nav-label">Services</p>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/agents">Buyer workspace</Link>
            <Link href="/connected-apps">Connected operations</Link>
            <Link href="/onboarding">Getting started</Link>
            <Link href="/#buying-models">Calls, leads, and appointments</Link>
            <p className="mobile-nav-label">
              Vertical categories · {catalogVerticals.length} programs
            </p>
            <div className="mobile-vertical-catalog">
              {verticalCategories.map((category) => (
                <Link
                  className="mobile-vertical-category"
                  href={`/verticals#category-${category.slug}`}
                  key={category.slug}
                >
                  <span>
                    {category.name}
                    <span>
                      {String(
                        catalogVerticals.filter(
                          (vertical) => vertical.category === category.name,
                        ).length,
                      ).padStart(2, "0")}
                    </span>
                  </span>
                  <small>{category.description}</small>
                </Link>
              ))}
            </div>
            <Link className="mobile-view-all" href="/verticals">
              Browse the vertical directory
            </Link>
            <Link href="/blog">Resources</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/about">About</Link>
            <Link href="/community">Pay per call community</Link>
            <Link href="/brands">Brand network</Link>
            <Link href="/careers">Careers</Link>
            <a href="mailto:hello@ringondemand.com">Contact</a>
          </nav>
          <div className="mobile-drawer-actions">
            <a
              className="button button-outline"
              href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
              aria-label="Open the Ring On Demand buyer portal in a new tab"
              rel="noreferrer"
              target="_blank"
            >
              Buyer login
            </a>
            <Link className="button button-dark" href="/build-campaign">
              Get pricing
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
          <h2>Tell us what your team wants to receive.</h2>
          <p>
            Choose calls, leads, or appointments. Then add your service,
            locations, hours, volume, and customer criteria.
          </p>
        </div>
        <div className="footer-cta-actions">
          <Link className="button button-light" href="/build-campaign">
            Get pricing
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
            Inbound calls, new leads, and booked appointments built around
            your service area, schedule, and capacity.
          </p>
        </div>
        <div>
          <h3>Product</h3>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/agents">Buyer workspace</Link>
          <Link href="/connected-apps">Connected operations</Link>
          <Link href="/onboarding">Getting started</Link>
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
            aria-label="Open the Ring On Demand buyer portal in a new tab"
            rel="noreferrer"
            target="_blank"
          >
            Buyer login
          </a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Ring On Demand</span>
        <a href="https://ringondemand.com/legal/privacy-policy">
          Privacy policy
        </a>
        <a href="https://ringondemand.com/legal/terms-of-service">
          Terms of service
        </a>
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
