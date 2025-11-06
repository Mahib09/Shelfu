"use client";

import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "Is Shelfu really free?",
      answer:
        "Yes! Shelfu is completely free. All features, including collection tracking, insights, and search, are available to every user without any cost.",
    },
    {
      question: "Do I need an account to use Shelfu?",
      answer:
        "Yes, creating an account lets you save and manage your manga collection securely across devices.",
    },
    {
      question: "Can I access Shelfu on mobile?",
      answer:
        "Absolutely! Shelfu is fully responsive and works on both desktop and mobile browsers.",
    },
    {
      question: "How do I track my manga collection?",
      answer:
        "You can add manga to your collection using the global search or manual entry, organize them into categories, and view stats and insights on your dashboard.",
    },
    {
      question: "Is my data safe?",
      answer:
        "We prioritize your privacy and security. Your login token is stored securely, and your collection data is protected according to our Privacy Policy and DPA.",
    },
    {
      question: "Can I suggest new features?",
      answer:
        "Yes! You can submit feedback via our Feedback page or email us at feedback@shelfu.app.",
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
              <span className="ml-4">{openIndex === idx ? "-" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 py-4 text-gray-400 border-t ">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
