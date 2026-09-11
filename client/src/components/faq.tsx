import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be tech-savvy to work with you?",
    answer:
      "Not at all. We explain everything in plain English and start wherever you are today. If you can send an email, you can learn to use AI in your business.",
  },
  {
    question: "Is my business too small for AI?",
    answer:
      "No. Small businesses often benefit the most, because every hour saved goes straight back to the owner and the team. Whether you're a solo operator or have a team of 50, there are practical ways to use AI.",
  },
  {
    question: "Will AI replace my employees?",
    answer:
      "That's not our approach. We help you use AI to take repetitive work off your team's plate so they can spend more time on customers, quality, and the work that actually grows your business.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every business is different, so we start with a free strategy call. Once we understand your goals, we'll give you a clear proposal with transparent pricing and no surprises.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Quick wins, like using AI to draft emails or summarize documents, can start saving time right away. Larger automations take longer, and we'll give you a realistic timeline up front.",
  },
  {
    question: "Is it safe to put my business information into AI tools?",
    answer:
      "It can be, when it's done right. We help you choose reputable tools, configure privacy settings, and set clear guidelines for what should and shouldn't be shared.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Straight answers for small business owners who are curious about AI.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
