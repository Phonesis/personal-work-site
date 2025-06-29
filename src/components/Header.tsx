'use client';

import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
          <Image
            src="/profile-placeholder.png"
            alt="Martin Poole profile photo"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-700 shadow-lg"
            priority
          />
        </div>
        <AnimatedSection className="text-center md:text-left w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Martin Poole</h1>
          <h2 className="text-xl md:text-2xl text-gray-300">
            Test Automation Specialist / Lead SDET / Lead Quality Engineer
          </h2>
          <div className="mt-4 text-gray-400">
            <p>LL.B. (HONS), CTAL TAE</p>
            <p className="mt-2">
              <a href="tel:+4407814621246" className="hover:text-white transition-colors">
                +44 07814 621246
              </a>
              {' • '}
              <a href="mailto:martin_poole@hotmail.com" className="hover:text-white transition-colors">
                martin_poole@hotmail.com
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </header>
  );
}
