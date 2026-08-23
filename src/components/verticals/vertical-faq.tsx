"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { VerticalFaqItem } from "@/lib/verticals";

export function VerticalFAQ({ items }: { items: readonly VerticalFaqItem[] }) {
  const [open, setOpen] = useState(0);

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
