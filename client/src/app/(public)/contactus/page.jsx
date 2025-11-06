"use client";

export default function ContactUs() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>
      <p className="mb-10 text-gray-400">
        We’d love to hear from you! Whether you have questions, feedback, or
        need support, reach out to us.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Email</h2>
          <p className="text-gray-400">
            You can email us directly at{" "}
            <a
              href="mailto:support@shelfu.app"
              className="text-white underline hover:text-gray-300"
            >
              support@shelfu.app
            </a>
            . We aim to respond within 24–48 hours.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Support Form
          </h2>
          <p className="text-gray-400 mb-2">
            Or fill out the form below and we’ll get back to you as soon as
            possible.
          </p>
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
                className="w-full px-4 py-2 rounded-md bg-[#1E1E1E] text-white border  focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-400" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-2 rounded-md bg-[#1E1E1E] text-white border  focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-accent hover:brightness-110 text-white font-medium px-6 py-2 rounded-md transition-all ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
