"use client";

const updates = [
  {
    date: "Feb 2026",
    type: "Fix",
    description: "Dashboard chart Y-axis no longer shows decimal values",
  },
  {
    date: "Feb 2026",
    type: "Feature",
    description: "Google sign-in added alongside email/password auth",
  },
  {
    date: "Feb 2026",
    type: "Feature",
    description:
      "Collection status tracking — Owned, Want to Buy, and For Sale",
  },
  {
    date: "Feb 2026",
    type: "Feature",
    description: "Volume notes — add personal notes to any collection entry",
  },
  {
    date: "Jan 2026",
    type: "Feature",
    description:
      "Global manga search via ISBNDB with volume-level filtering",
  },
  {
    date: "Jan 2026",
    type: "Feature",
    description: "User dashboard with collection stats and charts",
  },
];

const typeBadge = {
  Feature: "bg-blue-500/20 text-blue-300",
  Fix: "bg-green-500/20 text-green-300",
  Improvement: "bg-yellow-500/20 text-yellow-300",
};

export default function Updates() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-3 text-white">Updates</h1>
      <p className="mb-12 text-gray-400">
        What's changed in Shelfu, most recent first.
      </p>

      <ul className="space-y-6">
        {updates.map((entry, idx) => (
          <li key={idx} className="flex gap-6 items-start">
            <span className="text-gray-500 text-sm w-20 shrink-0 pt-0.5">
              {entry.date}
            </span>
            <div className="flex items-start gap-3 flex-1">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                  typeBadge[entry.type]
                }`}
              >
                {entry.type}
              </span>
              <span className="text-gray-300">{entry.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
