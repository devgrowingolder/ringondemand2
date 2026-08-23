"use client";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Inbox,
  LayoutDashboard,
  MapPinned,
  MessageSquareText,
  PhoneCall,
  Route,
  Settings2,
  SlidersHorizontal,
  UsersRound,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

const receivingOptions = [
  {
    id: "calls",
    label: "Inbound calls",
    sourceLabel: "Customer calls",
    sourceTitle: "A customer calls about your service.",
    destinationLabel: "Your phone line",
    destinationTitle: "The call goes to the phone line you selected.",
    SourceIcon: PhoneCall,
    DestinationIcon: PhoneCall,
    rules: ["Location", "Hours", "Volume", "Customer criteria", "Phone line"],
  },
  {
    id: "leads",
    label: "Real-time leads",
    sourceLabel: "Customer details",
    sourceTitle: "A customer shares their contact information.",
    destinationLabel: "Your workflow",
    destinationTitle: "The details go to the workflow you selected.",
    SourceIcon: UsersRound,
    DestinationIcon: Inbox,
    rules: ["Location", "Hours", "Volume", "Customer criteria", "Workflow"],
  },
  {
    id: "appointments",
    label: "Booked appointments",
    sourceLabel: "Customer books",
    sourceTitle: "A customer chooses an available time.",
    destinationLabel: "Your calendar",
    destinationTitle: "The appointment goes to the calendar you selected.",
    SourceIcon: Clock3,
    DestinationIcon: CalendarDays,
    rules: ["Location", "Schedule", "Volume", "Customer criteria", "Calendar"],
  },
] as const;

const workspaceItems = [
  {
    id: "setup",
    label: "Your setup",
    title: "Your setup",
    copy: "View and manage your locations, hours, volume, criteria, and destination.",
    Icon: ClipboardCheck,
  },
  {
    id: "incoming",
    label: "Calls, leads, appointments",
    title: "Incoming items",
    copy: "Items will appear here when they match the setup your team approved.",
    Icon: Inbox,
  },
  {
    id: "details",
    label: "Review details",
    title: "Review details",
    copy: "See the details you reviewed and what your team is confirming.",
    Icon: FileCheck2,
  },
  {
    id: "notes",
    label: "Team notes",
    title: "Team notes",
    copy: "Add notes and share updates with your team in one place.",
    Icon: MessageSquareText,
  },
] as const;

function focusTab(tabList: HTMLDivElement, nextIndex: number) {
  const tabs = Array.from(tabList.querySelectorAll<HTMLButtonElement>("[role='tab']"));
  tabs[nextIndex]?.focus();
}

export function RoutingStage() {
  const [activeId, setActiveId] = useState<(typeof receivingOptions)[number]["id"]>("calls");
  const tabsId = useId();
  const activeIndex = receivingOptions.findIndex((option) => option.id === activeId);
  const active = receivingOptions[activeIndex];
  const SourceIcon = active.SourceIcon;
  const DestinationIcon = active.DestinationIcon;

  return (
    <section className="operating-routing" id="how-it-works" aria-labelledby={`${tabsId}-title`}>
      <div className="operating-routing-frame">
        <div className="operating-section-kicker"><span>How it works</span></div>
        <h2 id={`${tabsId}-title`}>From customer interest to your team.</h2>

        <div
          aria-label="Choose what your team wants to receive"
          className="operating-routing-tabs"
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const direction = event.key === "ArrowRight" ? 1 : -1;
            const nextIndex = (activeIndex + direction + receivingOptions.length) % receivingOptions.length;
            setActiveId(receivingOptions[nextIndex].id);
            focusTab(event.currentTarget, nextIndex);
          }}
          role="tablist"
        >
          {receivingOptions.map((option) => (
            <button
              aria-controls={`${tabsId}-panel`}
              aria-selected={activeId === option.id}
              id={`${tabsId}-${option.id}`}
              key={option.id}
              onClick={() => setActiveId(option.id)}
              role="tab"
              tabIndex={activeId === option.id ? 0 : -1}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`${tabsId}-${active.id}`}
          className="operating-route-flow"
          id={`${tabsId}-panel`}
          role="tabpanel"
        >
          <Image
            alt=""
            aria-hidden="true"
            className="operating-route-signal"
            fill
            sizes="(max-width: 800px) 100vw, 900px"
            src="/media/rid/signal-room-hero.png"
          />
          <article className="operating-route-endpoint">
            <p>{active.sourceLabel}</p>
            <span className="operating-route-icon"><SourceIcon aria-hidden="true" /></span>
            <strong>{active.sourceTitle}</strong>
          </article>

          <div className="operating-route-rules">
            <p>Your approved details</p>
            <div>
              {active.rules.map((rule, index) => {
                const Icon = [MapPinned, Clock3, Volume2, SlidersHorizontal, Route][index];
                return (
                  <span key={rule}>
                    <Icon aria-hidden="true" />
                    {rule}
                    <i aria-hidden="true" />
                  </span>
                );
              })}
            </div>
          </div>

          <article className="operating-route-endpoint">
            <p>{active.destinationLabel}</p>
            <span className="operating-route-icon"><DestinationIcon aria-hidden="true" /></span>
            <strong>{active.destinationTitle}</strong>
          </article>
        </div>

        <p className="operating-route-note">
          You choose the details. We confirm current options, pricing, and what counts before anything starts.
        </p>

        <div className="operating-dark-workspace" aria-label="Illustrative buyer workspace">
          <div className="operating-dark-workspace-bar">
            <Image alt="Ring On Demand" height={25} src="/brand/ring-on-demand-logo.png" width={176} />
            <span>Illustrative buyer workspace</span>
          </div>
          <div className="operating-dark-workspace-body">
            <aside aria-label="Workspace preview navigation">
              {[
                [LayoutDashboard, "Overview"],
                [Settings2, "Setup"],
                [Inbox, "Incoming items"],
                [FileCheck2, "Review details"],
                [UsersRound, "Team"],
              ].map(([Icon, label], index) => {
                const MenuIcon = Icon as typeof LayoutDashboard;
                return <span className={index === 0 ? "is-active" : ""} key={String(label)}><MenuIcon aria-hidden="true" />{String(label)}</span>;
              })}
            </aside>
            <div className="operating-dark-workspace-main">
              <div className="operating-dark-workspace-heading">
                <div><small>Your setup</small><h3>{active.label} setup</h3></div>
                <button type="button">Edit setup</button>
              </div>
              <div className="operating-dark-workspace-tabs" aria-hidden="true">
                <span className="is-active">Your setup</span>
                <span>Calls, leads, appointments</span>
                <span>Review details</span>
                <span>Team notes</span>
              </div>
              <div className="operating-dark-workspace-grid">
                <article>
                  <h4>Your setup</h4>
                  {[
                    ["What you want", active.label],
                    ["Where", "Your selected locations"],
                    ["When", "Your selected hours and time zone"],
                    ["How many", "Your daily or weekly limit"],
                    ["Who you want to reach", "Your customer criteria"],
                    ["Where it should go", active.destinationLabel],
                  ].map(([label, value]) => <p key={label}><span>{label}</span><strong>{value}</strong></p>)}
                </article>
                <article className="operating-empty-state">
                  <span><Inbox aria-hidden="true" /></span>
                  <h4>No incoming items yet.</h4>
                  <p>Once items arrive, you’ll see them here.</p>
                </article>
                <article className="operating-empty-state">
                  <span><FileCheck2 aria-hidden="true" /></span>
                  <h4>Your details will appear here.</h4>
                  <p>Review your setup first. We’ll confirm options and what counts before you start.</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkspaceOverview() {
  const [activeId, setActiveId] = useState<(typeof workspaceItems)[number]["id"]>("setup");
  const tabsId = useId();
  const activeIndex = workspaceItems.findIndex((item) => item.id === activeId);

  return (
    <section className="operating-workspace" aria-labelledby={`${tabsId}-heading`}>
      <div className="operating-centered-copy">
        <h2 id={`${tabsId}-heading`}>Keep every item—and every next step—in view.</h2>
        <p>Review your setup, incoming items, details, and team notes in one place.</p>
      </div>
      <div className="operating-workspace-shell">
        <div
          aria-label="Buyer workspace preview"
          className="operating-workspace-tabs"
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const direction = event.key === "ArrowRight" ? 1 : -1;
            const nextIndex = (activeIndex + direction + workspaceItems.length) % workspaceItems.length;
            setActiveId(workspaceItems[nextIndex].id);
            event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[nextIndex]?.focus();
          }}
        >
          {workspaceItems.map((item) => (
            <button
              aria-pressed={activeId === item.id}
              key={item.id}
              onClick={() => setActiveId(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="operating-workspace-grid">
          {workspaceItems.map((item) => {
            const Icon = item.Icon;
            const selected = item.id === activeId;
            return (
              <article
                className={selected ? "is-active" : ""}
                key={item.id}
              >
                <h3>{item.title}</h3>
                <span><Icon aria-hidden="true" /></span>
                <p>{item.copy}</p>
                {selected && <small><CheckCircle2 aria-hidden="true" /> Selected view</small>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
