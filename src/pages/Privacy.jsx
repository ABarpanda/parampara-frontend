import './Privacy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">

        <h1 className="privacy-title">
          Privacy Policy
        </h1>

        <p className="privacy-last-updated">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            At Parampara, your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you use our platform.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <ul className="privacy-list">
            <li>Name, email address, and optional region details</li>
            <li>Content you share such as rituals, stories, or traditions</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Information</h2>
          <ul className="privacy-list">
            <li>To provide and improve our services</li>
            <li>To manage user accounts and authentication</li>
            <li>To enhance user experience and platform safety</li>
            <li>To communicate important updates</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to
            protect your data. However, no system is completely secure.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data at any time.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Changes will be
            reflected on this page.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Contact Us</h2>
          <p>
            For questions or concerns, contact us at:
            <br />
            <span className="font-medium">support@ourparampara.in</span>
          </p>
        </section>

      </div>
    </div>
  );
}
