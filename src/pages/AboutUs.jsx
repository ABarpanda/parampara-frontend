export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
        
        <h1 className="text-4xl font-bold text-slate-800 mb-6 text-center">
          About Parampara
        </h1>

        <p className="text-slate-700 leading-relaxed mb-6">
          For thousands of years, rituals and traditions have been passed down through generations.
          Our grandparents and ancestors preserved these practices not through books or digital
          archives, but through stories, memory, and lived experience. These traditions often
          existed long before anyone could trace their origins — sometimes spanning centuries.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          As we move deeper into the digital age, the way knowledge is shared has changed.
          Information now lives on screens instead of being passed through conversations.
          While this brings accessibility, it also distances us from the intimate,
          family-based transmission of culture that once defined us.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          Traditionally, rituals were sacred and closely guarded within families. However,
          modernization and globalization have softened these boundaries. As cultures blend and
          societies grow more interconnected, the uniqueness of age-old traditions risks being
          forgotten.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          India, in particular, is a land of immense cultural diversity. It is often said that
          every 100 kilometers brings a new language, a new custom, and a new way of life.
          Even when traditions appear similar, small differences make each family’s practices
          unique and deeply personal.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          <span className="font-semibold">Parampara</span> exists to honor and preserve that
          uniqueness. It is a space where traditions can be documented, shared, and rediscovered.
          You may even find that a ritual followed in your home mirrors one practiced elsewhere —
          a reminder that our roots may be more connected than we realize.
        </p>

        <p className="text-slate-700 leading-relaxed mb-6">
          In an era where nuclear families are common and children grow up far from their
          grandparents, stories and traditions risk fading away. Parampara is our effort to
          preserve these stories — not as relics of the past, but as living knowledge for future
          generations.
        </p>

        <p className="text-slate-700 leading-relaxed">
          For many, contributing to Parampara is an act of remembrance and respect.
          A way to safeguard the wisdom, values, and legacy of those who came before us —
          so their stories continue to live on.
        </p>

      </div>
    </div>
  );
}

// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// function Section({ title, children, defaultOpen = false }) {
//   const [open, setOpen] = useState(defaultOpen);

//   return (
//     <div className="border border-slate-200 rounded-lg overflow-hidden transition">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center px-6 py-4 bg-slate-100 hover:bg-slate-200 transition"
//       >
//         <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
//         <ChevronDown
//           className={`transition-transform duration-300 ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       <div
//         className={`transition-all duration-500 ease-in-out overflow-hidden ${
//           open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="p-6 text-slate-700 leading-relaxed space-y-4">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function AboutUs() {
//   return (
//     <div className="min-h-screen bg-slate-50 py-16 px-4">
//       <div className="max-w-4xl mx-auto space-y-6">

//         <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">
//           About Parampara
//         </h1>

//         <Section title="Our Origins" defaultOpen>
//           <p>
//             For thousands of years, rituals and traditions have been passed down
//             through generations. These were preserved not through books or
//             databases, but through memory, storytelling, and lived experience.
//           </p>

//           <p>
//             Our ancestors safeguarded culture through everyday life, ensuring
//             knowledge lived within families rather than institutions.
//           </p>
//         </Section>

//         <Section title="The Changing World">
//           <p>
//             As we enter a digital age, the way information flows has changed.
//             Culture is no longer passed down naturally — it is often lost in
//             translation.
//           </p>

//           <p>
//             Modernization and globalization have connected us, but they’ve also
//             diluted the uniqueness of family traditions that once defined
//             identity.
//           </p>
//         </Section>

//         <Section title="India’s Cultural Depth">
//           <p>
//             India is a land where culture shifts every few kilometers. Language,
//             customs, rituals — all transform subtly yet meaningfully.
//           </p>

//           <p>
//             Even when two traditions appear similar, small differences make each
//             family’s heritage unique and deeply personal.
//           </p>
//         </Section>

//         <Section title="Our Mission">
//           <p>
//             Parampara exists to preserve, document, and celebrate these traditions.
//             We aim to create a living archive where stories are not forgotten but
//             shared.
//           </p>

//           <p>
//             Our mission is to ensure that future generations inherit not just
//             memories, but meaning — a connection to where they come from.
//           </p>
//         </Section>

//         <Section title="Why Parampara Matters">
//           <p>
//             In an age of nuclear families and digital lives, traditions risk
//             disappearing silently.
//           </p>

//           <p>
//             Parampara is a bridge between generations — a place to safeguard
//             wisdom, honor ancestry, and keep culture alive.
//           </p>
//         </Section>

//       </div>
//     </div>
//   );
// }
