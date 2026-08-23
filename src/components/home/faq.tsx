"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const items = [
  {
    question: "Which option is right for my team?",
    answer:
      "Choose inbound calls if someone can answer while the person is on the phone. Choose leads if your team has a consistent follow-up process. Choose appointments if you sell through scheduled conversations. If you are unsure, select ‘Help me decide’ in the pricing form.",
  },
  {
    question: "What affects pricing?",
    answer:
      "Pricing depends on the service, locations, receiving hours, requested amount, audience, where each call, lead, or appointment should go, and the applicable campaign terms. We confirm those details before sharing pricing.",
  },
  {
    question: "Can I choose when and where I receive calls, leads, or appointments?",
    answer:
      "You can request specific states, ZIP codes, days, hours, a time zone, and an amount your team can handle. We confirm availability for those details before the campaign moves forward.",
  },
  {
    question: "How are campaign items and credit requests reviewed?",
    answer:
      "Your campaign terms explain the information attached to each call, lead, or appointment, what counts as eligible, and how applicable credit requests are handled. Review those terms before approving a campaign.",
  },
  {
    question: "What happens after I request pricing?",
    answer:
      "Your request is saved for review. We confirm current availability and the applicable campaign details, then share the next step for pricing or scheduling. Submitting the website form does not launch a campaign.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div className="faq-item" key={item.question}>
            <button
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <Plus
                aria-hidden="true"
                className={expanded ? "is-open" : ""}
                size={20}
              />
            </button>
            {expanded && <p>{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
