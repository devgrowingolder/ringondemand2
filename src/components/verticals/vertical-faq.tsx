"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

export function VerticalFAQ({ vertical }: { vertical: string }) {
  const [open, setOpen] = useState(0);
  const items = [
    {
      question: `What should my ${vertical} campaign details include?`,
      answer:
        "Start with what you want to receive, target locations, delivery hours, expected volume, customer criteria, and destination.",
    },
    {
      question: "Can the campaign target specific states or ZIP codes?",
      answer:
        "Yes. Add the states and ZIP codes you want, then review them before you submit.",
    },
    {
      question: "Can my team control delivery hours and volume?",
      answer:
        "Yes. Confirm your timezone, delivery windows, and daily, weekly, or monthly volume before the campaign moves forward.",
    },
    {
      question: "How do pricing and demo requests work?",
      answer:
        "Both actions use the same reviewed campaign details and contact info, so you do not need to enter everything again.",
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
