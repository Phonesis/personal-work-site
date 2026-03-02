# Blog Post Authoring Prompt

Use the following in Copilot Chat when adding a new blog post:

```text
Add a new blog post to this site using the existing blog data structure in src/data/blogPosts.ts.

Post content (title/body/links/images) will be provided below.

Requirements:
1. Add the post as the newest entry in blogPosts.
2. Ensure all core post features are present:
   - title
   - excerpt
   - slug
   - tags (relevant, concise)
   - publish date set to today (both ISO date and formattedDate)
   - section subtitles (heading blocks) where helpful for readability
   - quote/callout blocks for especially insightful key lines
   - images and captions when image paths are provided
3. Keep wording faithful to my draft, but fix typos and grammar issues.
4. Preserve my tone and avoid over-rewriting.
5. Ensure links in the draft are added as markdown links in content blocks.
6. Run a build check after editing to confirm everything compiles.

Output expected:
- A short summary of what was added/changed
- Confirmation of build success

Blog post draft:
[PASTE DRAFT HERE]
```
