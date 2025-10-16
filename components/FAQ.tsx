'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { faqData, categoryNames, type FAQItem } from '@/lib/faq-data';

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;

    const query = searchQuery.toLowerCase();
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categorizedFAQs = useMemo(() => {
    return {
      general: filteredFAQs.filter((faq) => faq.category === 'general'),
      users: filteredFAQs.filter((faq) => faq.category === 'users'),
      hosting: filteredFAQs.filter((faq) => faq.category === 'hosting'),
    };
  }, [filteredFAQs]);

  const handleQuestionClick = (faq: FAQItem) => {
    setSelectedFAQ(faq);
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    if (selectedFAQ && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedFAQ]);

  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How can we help?
          </h2>
          <p className="text-lg text-neutrals-copy max-w-3xl mx-auto">
            Search our knowledge base for answers to all your questions about Platformless AI
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutrals-copy" />
          <Input
            type="text"
            placeholder="Start typing your question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-primary-dark border-neutrals-border text-foreground placeholder:text-neutrals-copy focus:border-primary-light transition-colors"
          />
        </div>

        {/* Three Column FAQ Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {(Object.keys(categorizedFAQs) as Array<keyof typeof categorizedFAQs>).map((category) => (
            <Card
              key={category}
              className="p-6 border-neutrals-border hover:border-primary-light/50 transition-colors bg-background/50 backdrop-blur"
            >
              <h3 className="text-xl font-bold text-primary-content mb-4">
                {categoryNames[category]}
              </h3>
              <ul className="space-y-3">
                {categorizedFAQs[category].length > 0 ? (
                  categorizedFAQs[category].map((faq) => (
                    <li key={faq.id}>
                      <button
                        onClick={() => handleQuestionClick(faq)}
                        className="text-left text-primary-light hover:text-secondary hover:underline transition-colors w-full group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform">
                          {faq.question}
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-neutrals-copy italic">No matching questions</li>
                )}
              </ul>
            </Card>
          ))}
        </div>

        {/* FAQ Answer Display */}
        {selectedFAQ && (
          <div
            ref={answerRef}
            className="mt-12 scroll-mt-20 animate-fade-in"
          >
            <Card className="p-8 border-primary/30 bg-primary-dark/20 backdrop-blur">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {selectedFAQ.question}
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                  {selectedFAQ.answer.split('\n\n').map((paragraph, idx) => {
                    // Handle bullet points
                    if (paragraph.startsWith('•')) {
                      const items = paragraph.split('\n').filter((line) => line.trim());
                      return (
                        <ul key={idx} className="space-y-2 text-neutrals-copy-light">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item.replace('•', '').trim()}</li>
                          ))}
                        </ul>
                      );
                    }

                    // Handle bold text
                    const parts = paragraph.split('**');
                    const formatted = parts.map((part, i) =>
                      i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                    );

                    return (
                      <p key={idx} className="text-neutrals-copy-light leading-relaxed">
                        {formatted}
                      </p>
                    );
                  })}
                </div>

                <button
                  onClick={() => setSelectedFAQ(null)}
                  className="text-primary-light hover:text-secondary transition-colors flex items-center gap-2 mt-4"
                >
                  ↑ Back to questions
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
