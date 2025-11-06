export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Terms of Service</h1>
      <p className="mb-10 text-gray-400">
        <span className="font-semibold text-white">Last updated:</span> January
        2025
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-400">
            By accessing or using Shelfu (“the Service”), you agree to be bound
            by these Terms of Service. If you do not agree, you may not access
            or use the Service. Shelfu reserves the right to update these terms
            at any time, and continued use constitutes acceptance of those
            changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Description of Service
          </h2>
          <p className="text-gray-400">
            Shelfu is a digital platform designed to help users track, organize,
            and showcase their manga collections. The Service may include
            additional features, analytics, or community tools that enhance your
            experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Account Registration
          </h2>
          <p className="text-gray-400">
            To access certain features, you must create an account and provide
            accurate, complete information. You are responsible for maintaining
            the confidentiality of your login credentials and for all activities
            under your account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Acceptable Use
          </h2>
          <p className="text-gray-400">
            You agree not to misuse Shelfu. This includes but is not limited to:
          </p>
          <ul className="list-disc ml-6 text-gray-400">
            <li>
              Copying, modifying, or redistributing content without
              authorization.
            </li>
            <li>Uploading harmful code or attempting to breach security.</li>
            <li>Using the Service for unlawful or abusive purposes.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Content Ownership
          </h2>
          <p className="text-gray-400">
            You retain ownership of any content you upload or input into Shelfu.
            By using the Service, you grant Shelfu a limited, non-exclusive
            license to display and process that content for providing app
            functionality.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Termination
          </h2>
          <p className="text-gray-400">
            Shelfu may suspend or terminate your account if you violate these
            Terms or engage in activities that harm the Service or other users.
            You may also delete your account at any time from your profile
            settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Limitation of Liability
          </h2>
          <p className="text-gray-400">
            Shelfu and its creators are not liable for any indirect, incidental,
            or consequential damages resulting from your use of the Service. The
            Service is provided “as is” without warranties of any kind.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">8. Privacy</h2>
          <p className="text-gray-400">
            Your privacy is important to us. Please review our{" "}
            <a href="/privacy" className="text-blue-400 underline">
              Privacy Policy
            </a>{" "}
            to understand how we collect and use your information.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            9. Changes to These Terms
          </h2>
          <p className="text-gray-400">
            We may update these Terms periodically. Any major changes will be
            communicated through the app or via email. Continued use after
            updates means you agree to the revised Terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            10. Contact Us
          </h2>
          <p className="text-gray-400">
            If you have any questions about these Terms, contact us at{" "}
            <a
              href="mailto:support@shelfu.app"
              className="text-blue-400 underline"
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
