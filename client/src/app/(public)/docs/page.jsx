"use client";

export default function Docs() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Documentation</h1>
      <p className="mb-10 text-gray-400">
        <span className="font-semibold text-white">Last updated:</span> November
        2025
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Introduction
          </h2>
          <p className="text-gray-400">
            Welcome to the official Shelfu documentation. Here, you'll find
            everything you need to understand how Shelfu works — from managing
            your manga collection to customizing your layouts and tracking
            insights. Our goal is to make it simple, visual, and intuitive.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Getting Started
          </h2>
          <p className="text-gray-400">
            Start by creating an account or logging in. Once you’re in, you can
            add manga to your collection manually or through our global search.
            Your collection is automatically saved and synced across sessions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Collections</h2>
          <p className="text-gray-400">
            Shelfu lets you organize your manga into custom categories like
            “Reading,” “Completed,” or “Wishlist.” You can edit, move, and sort
            titles within your collection at any time.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Insights & Dashboard
          </h2>
          <p className="text-gray-400">
            Get a quick overview of your reading progress and collection stats.
            Track completion rates, favorite genres, and total volumes collected
            through data-driven insights.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Dark Mode</h2>
          <p className="text-gray-400">
            Shelfu supports both light and dark themes. The theme automatically
            adapts to your system preferences, but you can also toggle it
            manually in the settings menu.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Data & Privacy
          </h2>
          <p className="text-gray-400">
            Shelfu does not sell or share your data. Any login data stored in
            your browser is solely for authentication and session management.
            For more details, check our Privacy Policy and Cookie Policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Support & Feedback
          </h2>
          <p className="text-gray-400">
            Found a bug or have an idea? Visit our{" "}
            <a href="/feedback" className="text-[#E6E6E6] underline">
              Feedback
            </a>{" "}
            page — we’d love to hear from you. Shelfu continues to evolve based
            on community suggestions and real-world use.
          </p>
        </div>
      </section>
    </div>
  );
}
