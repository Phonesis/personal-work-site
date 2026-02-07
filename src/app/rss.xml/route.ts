import { blogPosts } from "@/data/blogPosts";

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });

const toRfc822Date = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? new Date().toUTCString()
    : date.toUTCString();
};

const getLatestBuildDate = () => {
  if (blogPosts.length === 0) {
    return new Date().toUTCString();
  }

  const latest = blogPosts
    .map((post) => new Date(post.date).getTime())
    .filter((time) => !Number.isNaN(time))
    .sort((a, b) => b - a)[0];

  return latest ? new Date(latest).toUTCString() : new Date().toUTCString();
};

const buildRssFeed = (baseUrl: string) => {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const lastBuildDate = getLatestBuildDate();

  const items = sortedPosts
    .map((post) => {
      const link = `${baseUrl}/blog/${post.slug}`;
      const categories = (post.tags || [])
        .map((tag) => `    <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "  <item>",
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link>${escapeXml(link)}</link>`,
        `    <guid isPermaLink=\"true\">${escapeXml(link)}</guid>`,
        `    <pubDate>${toRfc822Date(post.date)}</pubDate>`,
        `    <description>${escapeXml(post.excerpt)}</description>`,
        categories,
        "  </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "  <title>Martin Poole Blog</title>",
    `  <link>${escapeXml(baseUrl)}/blog</link>`,
    "  <description>Thoughts, insights, and updates on my latest work projects and ideas I've been working on.</description>",
    "  <language>en-gb</language>",
    `  <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `  <atom:link href=\"${escapeXml(`${baseUrl}/rss.xml`)}\" rel=\"self\" type=\"application/rss+xml\" />`,
    items,
    "</channel>",
    "</rss>",
  ].join("\n");
};

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;
  const xml = buildRssFeed(baseUrl);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
    },
  });
}
