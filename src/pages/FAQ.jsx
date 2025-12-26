import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden transition">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 bg-slate-100 hover:bg-slate-200 transition"
      >
        <h3 className="text-lg font-medium text-slate-800">{question}</h3>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 text-slate-700 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
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