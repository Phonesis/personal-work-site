"use client";

import { AnimatedSection } from "./AnimatedSection";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  location: string;
  skills: string[];
  responsibilities: string[];
  index: number;
}

export default function ExperienceItem({
  title,
  company,
  period,
  location,
  skills,
  responsibilities,
  index,
}: ExperienceItemProps) {
  return (
    <AnimatedSection
      delay={index * 0.1}
      className="mb-8 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="text-gray-600 mt-1">
        <span className="font-semibold">{company}</span>
        <span className="mx-2">•</span>
        <span>{period}</span>
      </div>
      <div className="text-gray-500 mb-4">{location}</div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {responsibilities.map((resp, i) => (
          <li key={i}>{resp}</li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
