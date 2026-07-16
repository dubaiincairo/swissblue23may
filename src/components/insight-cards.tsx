import { Award, Building2, Clock3, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { rich } from "@/components/rich-text";

const insightIcons = [Building2, Users, Clock3, Award];

export function InsightCards({
  items,
}: {
  items: Array<{ value: string; label: string; text: string }>;
}) {
  return (
    <div className="insight-grid">
      {items.map((item, index) => {
        const Icon = insightIcons[index % insightIcons.length];

        return (
          <article className="insight-card" key={item.label}>
            <div className="insight-card-head">
              <span className="insight-card-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2} />
              </span>
              <strong>
                <AnimatedCounter value={item.value} />
              </strong>
            </div>
            <div className="insight-card-copy">
              <span>{rich(item.label)}</span>
              <p>{rich(item.text)}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
