"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const items = [
  {
    question: "What is the difference between calls, leads, and appointments?",
    answer:
      "Calls connect someone who is calling now. Leads provide contact details for follow-up. Appointments reserve a time on your calendar. Your campaign will state exactly what you are requesting.",
  },
  {
    question: "How does billing work?",
    answer:
      "Pricing and what counts as a billable delivery are confirmed before the campaign moves forward. The agreement also explains customer criteria and the applicable credit policy.",
  },
  {
    question: "Can I control when deliveries arrive?",
    answer:
      "Yes. You can request specific locations, delivery hours, volume limits, and a phone, system, or calendar destination.",
  },
  {
    question: "How are credit requests reviewed?",
    answer:
      "The applicable credit policy explains eligible reasons, required evidence, review timing, and the final decision process.",
  },
  {
    question: "What do you need to build a campaign?",
    answer:
      "Start with calls, leads, or appointments; the service you sell; your locations and hours; the volume your team can handle; your customer criteria; and where each delivery should go.",
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
