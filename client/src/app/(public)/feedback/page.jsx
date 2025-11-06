"use client";

export default function Feedback() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Feedback</h1>
      <p className="mb-10 text-gray-400">
        We value your feedback! Please let us know what you love, what could be
        improved, or any new features you'd like to see in Shelfu.
      </p>

      <section className="space-y-6">
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-400" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 rounded-md bg-[#1E1E1E] text-white border  focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-md bg-[#1E1E1E] text-white border focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-400" htmlFor="feedback">
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="5"
              className="w-full px-4 py-2 rounded-md bg-[#1E1E1E] text-white border  focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Write your feedback here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-accent hover:brightness-110 text-white font-medium px-6 py-2 rounded-md transition-colors"
          >
            Submit Feedback
          </button>
        </form>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Other Ways to Share Feedback
          </h2>
          <p className="text-gray-400">
            You can also reach out via email at{" "}
            <a
              href="mailto:feedback@shelfu.app"
              className="text-white underline hover:text-gray-300"
            >
              feedback@shelfu.app
            </a>{" "}
            or join our Discord community for discussions and suggestions.
          </p>
        </div>
      </section>
    </div>
  );
}
