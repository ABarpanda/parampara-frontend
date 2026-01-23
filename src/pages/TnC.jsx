export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12 space-y-6">

        <h1 className="text-4xl font-bold text-slate-800 text-center">
          Terms & Conditions
        </h1>

        <p className="text-slate-600 text-center">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-700">
            By accessing or using Parampara, you agree to be bound by these
            Terms and Conditions. If you do not agree, please do not use the
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            2. User Responsibilities
          </h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Provide accurate and truthful information</li>
            <li>Respect other users and their content</li>
            <li>Do not post harmful, illegal, or offensive content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            3. Content Ownership
          </h2>
          <p className="text-slate-700">
            You retain ownership of the content you post. By sharing content on
            Parampara, you grant us a non-exclusive license to display and
            distribute it within the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            4. Account Termination
          </h2>
          <p className="text-slate-700">
            We reserve the right to suspend or terminate accounts that violate
            these terms or misuse the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-slate-700">
            Parampara is provided "as is". We are not responsible for any data
            loss, service interruptions, or damages arising from use of the
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            6. Changes to Terms
          </h2>
          <p className="text-slate-700">
            These terms may be updated periodically. Continued use of the
            platform implies acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            7. Contact
          </h2>
          <p className="text-slate-700">
            For any questions regarding these terms, contact us at:
            <br />
            <span className="font-medium">support@ourparampara.in</span>
          </p>
        </section>

      </div>
    </div>
  );
}
