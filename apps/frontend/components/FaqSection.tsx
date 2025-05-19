"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { faqs } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FaqSection() {
  return (
    <section className="py-14 mb-4 bg-muted/50">
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn(
                "border rounded-lg transition-shadow hover:shadow-sm",
                index === faqs.length - 1
                  ? "overflow-visible"
                  : "overflow-hidden"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "px-4 py-3 text-left text-base font-medium transition-colors",
                  "hover:bg-gray-100 hover:no-underline",
                  "data-[state=open]:bg-gray-50"
                )}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-muted-foreground transition-all duration-300 ease-in-out">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
