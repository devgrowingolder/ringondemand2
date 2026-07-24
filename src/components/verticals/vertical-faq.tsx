"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export function VerticalFAQ({ vertical }: { vertical: string }) {
  const [open, setOpen] = useState(0);
  const items = [
    {
      question: `What should a ${vertical} campaign brief include?`,
      answer:
        "Start with the delivery model, target locations, delivery hours, expected volume, buyer-approved qualification rules, and destination.",
    },
    {
      question: "Can the campaign target specific states or ZIP codes?",
      answer:
        "The campaign schema supports states and ZIP codes. Every location remains visible in the buyer-approved summary.",
    },
    {
      question: "Can my team control delivery hours and volume?",
      answer:
        "Schedule windows, timezone, volume, and period are confirmed before submission and carried into the canonical record.",
    },
    {
      question: "How do pricing and demo requests work?",
      answer:
        "Both actions use the same approved campaign and contact record, so the buyer does not need to enter campaign details again.",
    },
  ];

  return (
    <div className="vertical-faq">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
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
