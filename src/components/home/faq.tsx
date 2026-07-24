"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const items = [
  {
    question: "Are calls and leads exclusive?",
    answer:
      "Campaign terms state whether each delivery is exclusive and how exclusivity is defined for that buying model.",
  },
  {
    question: "How does billing work?",
    answer:
      "Pricing and the billable event are defined before launch. Your agreement explains the service type, qualification rules, billing threshold, and credit policy.",
  },
  {
    question: "Can I control when deliveries arrive?",
    answer:
      "Campaign settings can define locations, schedules, availability, destination, and volume limits.",
  },
  {
    question: "How are credit requests reviewed?",
    answer:
      "The applicable credit policy explains eligible reasons, required evidence, review timing, and the final decision process.",
  },
  {
    question: "What do you need to build a campaign?",
    answer:
      "Start with the service type, vertical, locations, delivery hours, expected volume, qualification rules, and destination.",
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
