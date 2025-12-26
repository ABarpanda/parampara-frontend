export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12 space-y-6">

        <h1 className="text-4xl font-bold text-slate-800 text-center">
          Privacy Policy
        </h1>

        <p className="text-slate-600 text-center">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            1. Introduction
          </h2>
          <p className="text-slate-700">
            At Parampara, your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>Name, email address, and optional region details</li>
            <li>Content you share such as rituals, stories, or traditions</li>
            {/* <li>Usage data like device type, IP address, and interaction logs</li> */}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2">
            <li>To provide and improve our services</li>
            <li>To manage user accounts and authentication</li>
            <li>To enhance user experience and platform safety</li>
            <li>To communicate important updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            4. Data Security
          </h2>
          <p className="text-slate-700">
            We implement reasonable technical and organizational measures to
            protect your data. However, no system is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            5. Your Rights
          </h2>
          <p className="text-slate-700">
            You have the right to access, update, or delete your personal data at any time.
            {/* You may also request account deletion from your profile. */}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            6. Changes to This Policy
          </h2>
          <p className="text-slate-700">
            We may update this Privacy Policy occasionally. Changes will be
            reflected on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            7. Contact Us
          </h2>
          <p className="text-slate-700">
            For questions or concerns, contact us at:
            <br />
            <span className="font-medium">support@parampara.com</span>
          </p>
        </section>

      </div>
    </div>
  );
}
