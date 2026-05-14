import { useState } from "react";
import { ChevronDown } from "lucide-react";
import './FAQ.css';

function FAQItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        className="faq-question-btn"
      >
        <h3 className="faq-question">{question}</h3>
        <ChevronDown
          className={`chevron-icon ${open ? "open" : ""}`}
        />
      </button>

      <div
        className={`faq-answer-container ${open ? "open" : "closed"}`}
      >
        <div className="faq-answer">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="faq-page">
      <div className="faq-container">

        <h1 className="faq-title">
          Frequently Asked Questions
        </h1>

        <FAQItem
          question="What is Parampara?"
          answer={
            <>
              Parampara is a digital platform designed to preserve, document,
              and share cultural rituals and traditions passed down through
              generations. It helps keep heritage alive in the digital age.
            </>
          }
          defaultOpen
        />

        <FAQItem
          question="Who can use Parampara?"
          answer={
            <>
              Anyone interested in preserving or learning about cultural
              traditions can use Parampara. You can browse publicly shared
              rituals or create an account to contribute your own.
            </>
          }
        />

        <FAQItem
          question="Is Parampara free to use?"
          answer={
            <>
              Yes. Parampara is free to use. All core features including browsing
              and sharing rituals are available without charge.
            </>
          }
        />

        <FAQItem
          question="Can I edit or delete my rituals?"
          answer={
            <>
              Yes. You can edit or delete any ritual that you have created from
              your profile or the ritual page itself.
            </>
          }
        />

        <FAQItem
          question="Who can see my rituals?"
          answer={
            <>
              By default, rituals are visible to the community. Future updates
              may include privacy controls to limit visibility.
            </>
          }
        />

        <FAQItem
          question="How is my data protected?"
          answer={
            <>
              We use secure authentication, encrypted connections, and access
              control mechanisms to protect your data. We never sell personal
              information.
            </>
          }
        />

        <FAQItem
          question="Can I delete my account?"
          answer={
            <>
              Yes. You can permanently delete your account from your profile
              settings. This will remove your personal data from our systems.
            </>
          }
        />

        <FAQItem
          question="How can I contact support?"
          answer={
            <>
              You can reach us at{" "}
              <span className="font-medium">support@ourparampara.in</span> for any
              questions, issues, or feedback.
            </>
          }
        />
      </div>
    </div>
  );
}
