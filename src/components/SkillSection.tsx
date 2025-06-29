'use client';

import { AnimatedSection } from './AnimatedSection';

interface SkillSectionProps {
  title: string;
  items: { name: string; level?: number }[];
  index: number;
}

export default function SkillSection({ title, items, index }: SkillSectionProps) {
  return (
    <AnimatedSection
      delay={index * 0.1}
      className="mb-8"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow px-4 py-2"
          >
            <span className="text-gray-800">{item.name}</span>
            {item.level && (
              <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${item.level * 20}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
