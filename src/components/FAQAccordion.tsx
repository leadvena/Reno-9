import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen 
                ? "bg-slate-50 border-orange-500 shadow-md" 
                : "bg-white border-gray-150 hover:border-gray-300"
            }`}
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full py-5 px-6 flex items-center justify-between text-left font-display font-semibold text-navy-900 gap-4"
            >
              <span className="flex items-center gap-3 text-sm md:text-base leading-snug">
                <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-orange-500" : "text-gray-400"}`} />
                {item.question}
              </span>
              <span className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                isOpen ? "bg-orange-500 text-white rotate-180" : "bg-slate-105 text-gray-500"
              }`}>
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-60 opacity-100 border-t border-gray-150" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6 text-sm text-gray-650 leading-relaxed bg-white">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
