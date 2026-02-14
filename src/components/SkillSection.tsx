"use client";

import { AnimatedSection } from "./AnimatedSection";

interface SkillSectionProps {
  title: string;
  items: { name: string; level?: number }[];
  index: number;
  fixedCardWidth?: boolean;
  fullWidthBars?: boolean;
}

export default function SkillSection({
  title,
  items,
  index,
  fixedCardWidth = false,
  fullWidthBars = false,
}: SkillSectionProps) {
  return (
    <AnimatedSection delay={index * 0.1} className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`${
              fixedCardWidth ? "w-full sm:w-[220px] lg:w-[240px]" : ""
            } bg-white rounded-lg shadow-md px-5 py-3 border border-gray-200 hover:shadow-lg hover:border-emerald-300 transition-all transform hover:-translate-y-0.5`}
          >
            <span className="text-gray-800 font-medium">{item.name}</span>
            {item.level !== undefined && (
              <div
                className={`relative mt-2 ${
                  fullWidthBars ? "w-full" : "w-24"
                } group`}
              >
                <div
                  role="progressbar"
                  aria-valuenow={item.level}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-label={`${item.name} proficiency: ${item.level} out of 10`}
                  className="h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${Math.min(item.level, 10) * 10}%` }}
                  />
                </div>
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity duration-100 group-hover:opacity-100 group-focus-within:opacity-100">
                  {item.level}/10
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
