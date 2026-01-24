"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-white">Comments</h2>
      <Giscus
        id="comments"
        repo="Phonesis/personal-work-site"
        repoId="R_kgDOPD-mrA"
        category="Blog Comments"
        categoryId="DIC_kwDOPD-mrM4C1VqM"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="dark_dimmed"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
