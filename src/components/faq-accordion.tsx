type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

type FaqCategory = {
  readonly title: string;
  readonly items: readonly FaqItem[];
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq-bubble-list">
      {items.map((faq) => (
        <details key={faq.question}>
          <summary>
            <span>{faq.question}</span>
            <strong aria-hidden="true">⌄</strong>
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqCategoryList({ categories }: { categories: readonly FaqCategory[] }) {
  return (
    <div className="faq-category-list">
      {categories.map((category) => (
        <section className="faq-category" key={category.title}>
          <h2>{category.title}</h2>
          <FaqAccordion items={category.items} />
        </section>
      ))}
    </div>
  );
}
