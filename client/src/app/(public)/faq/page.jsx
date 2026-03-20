"use client";

import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "How do I add a manga to my collection?",
      answer:
        "Search for the title using the search bar — include the volume number (e.g. \"Demon Slayer 1\"). Click the result you want, choose a status (Owned, Want to Buy, or For Sale), and click Add. It'll appear in your collection right away.",
    },
    {
      question: "What do Owned, Want to Buy, and For Sale mean?",
      answer:
        "These are the three ways to categorise a volume. Owned means you have it. Want to Buy is your wishlist — volumes you're planning to get. For Sale means you have it and you're looking to sell it. You can change a volume's status at any time from your collection.",
    },
    {
      question: "Why can't I find a manga in search?",
      answer:
        "A few reasons: you need to include a volume number (e.g. \"Naruto 1\" not just \"Naruto\"). Search only returns English-language editions — a French or German print of the same title won't appear. Art books, box sets, and certain collector editions are also filtered out automatically.",
    },
    {
      question: "Can I add notes to a volume?",
      answer:
        "Yes. Open any volume from your collection and you'll find a notes field you can type into. Useful for things like condition notes, where you bought it, or anything else you want to remember.",
    },
    {
      question: "How do I remove a volume from my collection?",
      answer:
        "Open the volume from your collection and click Delete. It'll be removed immediately.",
    },
    {
      question: "Is my data saved if I log out?",
      answer:
        "Yes. Your collection is stored in a database on our servers, not in your browser. Logging out doesn't touch your data — it'll all be there when you log back in.",
    },
    {
      question: "Is Shelfu free?",
      answer:
        "Yes, completely free. All features — collection tracking, search, and the dashboard — are available to every user with no cost and no plans.",
    },
    {
      question: "Can I use it on mobile?",
      answer:
        "Yes, Shelfu is fully responsive and works on desktop and mobile browsers.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Frequently Asked Questions
      </h1>

      <section className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#1E1E1E] rounded-lg border overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-white font-semibold focus:outline-none"
            >
              {faq.question}
              <span className="ml-4">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 py-4 text-gray-400 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
