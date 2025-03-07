
import { useState } from 'react';
import { ChevronDown, ChevronUp, Target } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-military-tan/50 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left font-heading font-medium text-military-navy hover:text-military-olive focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4 text-military-navy/70">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      question: "Do I need prior business experience to enroll?",
      answer: "No prior business experience is required. Our program is specifically designed for veterans transitioning to entrepreneurship and starts with the fundamentals. Your military training has already provided you with many transferable skills that will be valuable in business."
    },
    {
      question: "How much time do I need to commit each week?",
      answer: "The program requires approximately 10-15 hours per week. We understand that many participants may be balancing other responsibilities, so our materials are available on-demand, and the live sessions are recorded for those who cannot attend."
    },
    {
      question: "What types of businesses can I start with this training?",
      answer: "Our program focuses primarily on digital businesses including e-commerce, digital marketing agencies, coaching/consulting, online education, SaaS, and content creation. These models typically have lower startup costs and leverage online tools for efficient operations."
    },
    {
      question: "Is there financial assistance available?",
      answer: "Yes, we offer payment plans for all our programs. Additionally, the program may be eligible for VA education benefits or VR&E support. Our veteran liaison team can assist with the necessary documentation for your benefits application."
    },
    {
      question: "What support do I receive after completing the program?",
      answer: "Depending on your enrollment package, you'll have access to our private community, ongoing email support, monthly mastermind calls, and additional resources. Our goal is to support your long-term success beyond just the initial training period."
    },
    {
      question: "Can I get a refund if the program isn't right for me?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you complete the assignments, attend the coaching calls, and still don't find value in the program, we'll issue a full refund. We're confident in our program's effectiveness for veterans committed to the process."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-military-sand">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          MISSION BRIEFING: FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="section-subtitle">
          Get answers to common questions about our veteran business training
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <div className="space-y-1">
              {faqs.slice(0, 3).map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-sm">
            <div className="space-y-1">
              {faqs.slice(3).map((faq, index) => (
                <FAQItem
                  key={index + 3}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index + 3}
                  onClick={() => setOpenIndex(openIndex === index + 3 ? -1 : index + 3)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-military-navy p-8 text-center">
          <h3 className="font-heading text-2xl font-bold text-military-sand">
            STILL HAVE QUESTIONS?
          </h3>
          <p className="mt-2 mb-6 text-military-sand/80">
            Our veteran support team is standing by to provide you with more information
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-military-olive px-6 py-3 font-medium text-military-sand shadow-sm transition-colors hover:bg-military-olive/90"
          >
            <Target className="h-5 w-5" />
            <span>CONTACT COMMAND CENTER</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
