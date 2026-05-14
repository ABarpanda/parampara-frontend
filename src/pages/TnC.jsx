import './TnC.css';

export default function TermsAndConditions() {
  return (
    <div className="tnc-page">
      <div className="tnc-container">

        <h1 className="tnc-title">
          Terms & Conditions
        </h1>

        <p className="tnc-last-updated">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="tnc-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Parampara, you agree to be bound by these
            Terms and Conditions. If you do not agree, please do not use the
            platform.
          </p>
        </section>

        <section className="tnc-section">
          <h2>2. User Responsibilities</h2>
          <ul className="tnc-list">
            <li>Provide accurate and truthful information</li>
            <li>Respect other users and their content</li>
            <li>Do not post harmful, illegal, or offensive content</li>
          </ul>
        </section>

        <section className="tnc-section">
          <h2>3. Content Ownership</h2>
          <p>
            You retain ownership of the content you post. By sharing content on
            Parampara, you grant us a non-exclusive license to display and
            distribute it within the platform.
          </p>
        </section>

        <section className="tnc-section">
          <h2>4. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms or misuse the platform.
          </p>
        </section>

        <section className="tnc-section">
          <h2>5. Limitation of Liability</h2>
          <p>
            Parampara is provided "as is". We are not responsible for any data
            loss, service interruptions, or damages arising from use of the
            platform.
          </p>
        </section>

        <section className="tnc-section">
          <h2>6. Changes to Terms</h2>
          <p>
            These terms may be updated periodically. Continued use of the
            platform implies acceptance of any changes.
          </p>
        </section>

        <section className="tnc-section">
          <h2>7. Contact</h2>
          <p>
            For any questions regarding these terms, contact us at:
            <br />
            <span className="font-medium">support@ourparampara.in</span>
          </p>
        </section>

      </div>
    </div>
  );
}
