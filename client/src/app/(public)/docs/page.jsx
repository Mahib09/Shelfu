"use client";

export default function Docs() {
  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "search", label: "Search" },
    { id: "your-collection", label: "Your Collection" },
    { id: "dashboard", label: "Dashboard" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 flex gap-12">
      {/* Sticky sidebar nav */}
      <aside className="hidden md:block w-44 shrink-0">
        <nav className="sticky top-24 flex flex-col gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-gray-400 hover:text-white transition-colors py-1"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-16 text-gray-200">
        <div>
          <h1 className="text-4xl font-bold mb-3 text-white">Documentation</h1>
          <p className="text-gray-400 text-sm">Last updated: March 2026</p>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
          <p className="text-gray-400">
            Create an account with your email and password, or sign in with
            Google. Once you're in, you're ready to start building your
            collection.
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-400">
            <li>
              <span className="text-gray-200 font-medium">Create an account</span>{" "}
              — sign up with email/password or Google on the sign-up page.
            </li>
            <li>
              <span className="text-gray-200 font-medium">Search for a manga</span>{" "}
              — use the search bar and include the volume number (e.g.{" "}
              <span className="font-mono text-sm bg-[#1E1E1E] px-1 rounded">
                Berserk 1
              </span>
              ).
            </li>
            <li>
              <span className="text-gray-200 font-medium">Add it to your collection</span>{" "}
              — click a result to open the volume detail, choose a status, and
              click Add.
            </li>
            <li>
              <span className="text-gray-200 font-medium">Check your dashboard</span>{" "}
              — your stats update automatically as your collection grows.
            </li>
          </ol>
          <p className="text-gray-400">
            Your collection is saved to your account and syncs across devices.
          </p>
        </section>

        {/* Search */}
        <section id="search" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Search</h2>
          <p className="text-gray-400">
            Search is powered by ISBNDB, a database of book ISBNs. A few things
            to know before you start searching:
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-400">
            <li>
              <span className="text-gray-200 font-medium">
                Include the volume number.
              </span>{" "}
              Searching{" "}
              <span className="font-mono text-sm bg-[#1E1E1E] px-1 rounded">
                One Piece
              </span>{" "}
              won't return results —{" "}
              <span className="font-mono text-sm bg-[#1E1E1E] px-1 rounded">
                One Piece 1
              </span>{" "}
              will.
            </li>
            <li>
              <span className="text-gray-200 font-medium">
                English editions only.
              </span>{" "}
              Results are filtered to English-language prints. A French or German
              edition of the same title won't appear.
            </li>
            <li>
              <span className="text-gray-200 font-medium">
                Some formats are excluded.
              </span>{" "}
              Art books, box sets, coloring books, and a few other formats are
              filtered out automatically.
            </li>
          </ul>
          <p className="text-gray-400">
            If a volume isn't showing up, double-check the title spelling and
            make sure you've included a volume number.
          </p>
        </section>

        {/* Your Collection */}
        <section id="your-collection" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Your Collection</h2>
          <p className="text-gray-400">
            Every volume in your collection has a status. There are three:
          </p>
          <ul className="space-y-3 text-gray-400">
            <li>
              <span className="text-gray-200 font-semibold">Owned</span> — you
              have this volume on your shelf.
            </li>
            <li>
              <span className="text-gray-200 font-semibold">Want to Buy</span> —
              it's on your wishlist.
            </li>
            <li>
              <span className="text-gray-200 font-semibold">For Sale</span> — you
              have it and you're looking to sell it.
            </li>
          </ul>
          <p className="text-gray-400">
            You can change a volume's status at any time by opening it from your
            collection. You can also add a personal note to any volume — useful
            for condition notes, where you bought it, or anything else.
          </p>
          <p className="text-gray-400">
            To remove a volume, open it from your collection and click Delete.
          </p>
        </section>

        {/* Dashboard */}
        <section id="dashboard" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
          <p className="text-gray-400">
            The dashboard gives you a quick snapshot of your collection. At the
            top you'll see four stat cards:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Total Volumes Owned</li>
            <li>Total Manga Series</li>
            <li>Volumes to Buy</li>
            <li>Volumes For Sale</li>
          </ul>
          <p className="text-gray-400">
            Below the cards there are two panels: a bar chart showing how many
            Owned volumes you added each month over the last six months, and a
            Recent Addition list showing the last 10 items you added to your
            collection across all statuses.
          </p>
          <p className="text-gray-400">
            On your first visit, the theme defaults to your OS preference
            automatically. To change it, use the icon in the header for a quick
            Light/Dark toggle. For more control — including a System option that
            follows your OS preference — go to Settings → Appearance.
          </p>
        </section>
      </div>
    </div>
  );
}
