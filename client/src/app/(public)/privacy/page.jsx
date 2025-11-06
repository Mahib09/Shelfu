"use client";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
      <p className="mb-10 text-gray-400">
        <span className="font-semibold text-white">Last updated:</span> January
        2025
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-400">
            Shelfu (“we,” “our,” or “us”) values your privacy and is committed
            to protecting your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your data when you use
            our website and services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Information We Collect
          </h2>
          <p className="text-gray-400 mb-2">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>
              Personal information you provide during account creation (such as
              name and email).
            </li>
            <li>
              Usage data, including how you interact with our features and
              pages.
            </li>
            <li>
              Device and browser information to improve performance and
              security.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-400">
            We use your information to provide, improve, and personalize Shelfu.
            This includes managing user accounts, maintaining security, and
            analyzing usage trends to enhance the experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Data Sharing and Disclosure
          </h2>
          <p className="text-gray-400">
            We do not sell or rent your data. Information may only be shared
            with trusted service providers who assist in operating our platform,
            subject to strict confidentiality agreements and data protection
            measures.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Data Security
          </h2>
          <p className="text-gray-400">
            We implement appropriate security measures to protect your
            information against unauthorized access, alteration, disclosure, or
            destruction. However, no online service can guarantee absolute
            security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Your Rights
          </h2>
          <p className="text-gray-400">
            You have the right to access, update, or delete your personal data
            within your account settings. If you wish to make a data request or
            have privacy concerns, please contact us directly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-400">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for legal reasons. The revised version
            will be posted here with an updated “Last updated” date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. Contact Us
          </h2>
          <p className="text-gray-400">
            For any questions or concerns about this Privacy Policy or your data
            rights, please reach out to us at{" "}
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
