"use client";

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Cookie Policy</h1>
      <p className="mb-10 text-gray-400">
        <span className="font-semibold text-white">Last updated:</span> January
        2025
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. What Are Cookies?
          </h2>
          <p className="text-gray-400">
            Cookies are small text files that are stored on your device when you
            visit websites. They help enhance your experience, remember
            preferences, and enable certain site functions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. How Shelfu Uses Cookies
          </h2>
          <p className="text-gray-400">Shelfu uses cookies to:</p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>
              Remember whether you are logged in and maintain your session.
            </li>
            <li>
              Save your preferences, such as dark/light mode or layout choices.
            </li>
            <li>Analyze usage patterns to improve the website experience.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Types of Cookies We Use
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>
              <span className="text-white font-medium">Essential Cookies:</span>{" "}
              Required to provide the core functionality of the app, including
              login sessions.
            </li>
            <li>
              <span className="text-white font-medium">
                Preference Cookies:
              </span>{" "}
              Store user preferences, such as theme and language.
            </li>
            <li>
              <span className="text-white font-medium">Analytics Cookies:</span>{" "}
              Help us understand how users interact with Shelfu to improve
              performance and usability.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Managing Cookies
          </h2>
          <p className="text-gray-400">
            You can manage or disable cookies in your browser settings. However,
            disabling essential cookies may prevent you from using some
            features, including staying logged in.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Third-Party Cookies
          </h2>
          <p className="text-gray-400">
            Shelfu does not use third-party advertising cookies. Some analytics
            or authentication services may set cookies to provide their
            features.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Updates to This Policy
          </h2>
          <p className="text-gray-400">
            We may update this Cookie Policy from time to time. Any updates will
            appear on this page with a revised “Last updated” date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Contact Us
          </h2>
          <p className="text-gray-400">
            For questions about this Cookie Policy, you can contact us at{" "}
            <a
              href="mailto:support@shelfu.app"
              className="text-white underline hover:text-gray-300"
            >
              support@shelfu.app
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
