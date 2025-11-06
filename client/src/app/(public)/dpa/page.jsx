"use client";

export default function DataProcessingAgreement() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Data Processing Agreement (DPA)
      </h1>
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
            This Data Processing Agreement (“Agreement”) forms part of the Terms
            of Service between Shelfu (“we,” “our,” or “us”) and you (“the
            User”). It governs how we process personal data on your behalf when
            you use the Shelfu platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Definitions
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>
              <span className="font-semibold text-white">“Personal Data”</span>{" "}
              means any information relating to an identified or identifiable
              natural person.
            </li>
            <li>
              <span className="font-semibold text-white">“Processing”</span>{" "}
              means any operation performed on Personal Data, such as
              collection, storage, use, or deletion.
            </li>
            <li>
              <span className="font-semibold text-white">“Controller”</span>{" "}
              refers to the entity that determines the purposes and means of
              processing Personal Data.
            </li>
            <li>
              <span className="font-semibold text-white">“Processor”</span>{" "}
              refers to Shelfu, which processes data on behalf of the
              Controller.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Roles and Responsibilities
          </h2>
          <p className="text-gray-400">
            As the Controller, you are responsible for ensuring that your use of
            Shelfu complies with applicable data protection laws. Shelfu acts as
            a Processor and will only process Personal Data in accordance with
            your documented instructions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Data Processing and Purpose
          </h2>
          <p className="text-gray-400">
            Shelfu processes Personal Data solely for the purpose of providing
            and improving our services, managing user accounts, ensuring
            platform security, and offering user support.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Confidentiality
          </h2>
          <p className="text-gray-400">
            All employees and contractors of Shelfu who have access to Personal
            Data are bound by strict confidentiality obligations. Unauthorized
            disclosure or misuse of data is strictly prohibited and may result
            in disciplinary action.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Security Measures
          </h2>
          <p className="text-gray-400">
            Shelfu implements technical and organizational measures to ensure a
            level of security appropriate to the risk, including encryption,
            access control, and regular security reviews to protect against data
            breaches and unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Subprocessors
          </h2>
          <p className="text-gray-400">
            Shelfu may engage third-party subprocessors to assist in providing
            our services. Each subprocessor is carefully vetted and bound by
            equivalent data protection obligations to those set forth in this
            Agreement.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. International Data Transfers
          </h2>
          <p className="text-gray-400">
            If Personal Data is transferred outside your jurisdiction, Shelfu
            ensures that adequate safeguards (such as Standard Contractual
            Clauses) are in place to protect the data in compliance with
            applicable laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            9. Data Subject Rights
          </h2>
          <p className="text-gray-400">
            Shelfu assists the Controller in responding to data subject
            requests, including access, correction, and deletion of personal
            information, in accordance with applicable laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            10. Term and Termination
          </h2>
          <p className="text-gray-400">
            This Agreement remains in effect for as long as Shelfu processes
            Personal Data on behalf of the User. Upon termination, Shelfu will
            securely delete or return all Personal Data unless retention is
            required by law.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            11. Contact Information
          </h2>
          <p className="text-gray-400">
            For questions regarding this Data Processing Agreement or data
            privacy matters, contact us at{" "}
            <a
              href="mailto:privacy@shelfu.app"
              className="text-white underline hover:text-gray-300"
            >
              privacy@shelfu.app
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
