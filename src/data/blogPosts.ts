export interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "image"
    | "code"
    | "list"
    | "embed"
    | "callout";
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  embedType?: "linkedin";
  embedUrl?: string;
  height?: number | string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  coverImage?: string;
  coverImageCaption?: string;
  tags?: string[];
  content: ContentBlock[];
}

// Add your blog posts here
export const blogPosts: BlogPost[] = [
  {
    slug: "playwright-locator-handler",
    title: "The Power of Playwright's Locator Handler",
    excerpt:
      "How to gracefully handle unpredictable popups and modals in Playwright using the powerful locator handler feature.",
    date: "2026-02-01",
    formattedDate: "February 1, 2026",
    coverImage: "/blog/locator-handler-1.png",
    coverImageCaption:
      "The classic scenario. Cookie consent popup randomly appears. Here, we handle it gracefully via a locator handler.",
    tags: [
      "Playwright",
      "Test Automation",
      "Error Handling",
      "Locator Handler",
    ],
    content: [
      {
        type: "paragraph",
        text: "In Playwright, a particularly useful (but relatively unknown) feature shipped to little fanfare in [version 1.42](https://playwright.dev/docs/release-notes#version-142) early in 2025.",
      },
      {
        type: "paragraph",
        text: "At first glance, it seems like an obscure concept. But for those who have experience in UI-based test automation, the brilliance of this function soon becomes apparent.",
      },
      {
        type: "heading",
        text: "The Old Ways",
      },
      {
        type: "paragraph",
        text: "In the old days of test automation there was a concept known as a **Disaster Recovery**. You'd specifically code a routine that kicked into life given a particular set of circumstances. Unpredictable events would be gracefully handled by such fallback scripts, or at least that was the idea.",
      },
      {
        type: "paragraph",
        text: "For example, in **QTP (QuickTest Professional) / Micro Focus UFT (Unified Functional Testing)** you'd need to set up a 'Trigger Event' to define the unexpected scenario. This would usually be something like a rogue popup on a website that, unless clicked, would prevent the tool from interacting with other elements.",
      },
      {
        type: "paragraph",
        text: "In 2012, I remember attending a course in London on this very subject. A weeklong dive into QTP (which was all driven by VBScript) where a whole day was spent on this very subject. I still own the course notes!",
      },
      {
        type: "paragraph",
        text: "There were many limitations back then when it came to actually applying this. It massively slowed down your test execution for one thing. This was probably because it worked by spinning up dedicated threads to run and trigger as your test pack executed. More frequently than not, you'd simply handle it in code instead by introducing horrendous blocks of if statements, or the 'on error resume next' pattern of VB.",
      },
      {
        type: "paragraph",
        text: "In the world of browser/website automation, the scenario you needed to cater for was, and continues to almost always be, related to the handling of unexpected elements aka popups/modals/prompts. The classic example is a cookie banner. Or perhaps even a particularly intrusive ad you can't block (or need to test!).",
      },
      {
        type: "paragraph",
        text: "Surprisingly, I personally never found a neat way of handling these pesky elements during my days working with **Selenium WebDriver** in C#. I also never found a neat way to deal with them when working with **Cypress** in TypeScript as recently as 2023.",
      },
      {
        type: "paragraph",
        text: "The reality was always a painful case of applying if statements and conditional logic around clicking an element if it is visible. This often involves introducing hard-coded waits and it is almost always inherently flaky.",
      },
      {
        type: "callout",
        text: "The reality was always a painful case of applying if statements and conditional logic. This often involves introducing hard-coded waits and it is almost always inherently flaky.",
      },
      {
        type: "paragraph",
        text: "It is easy to forget in 2026 that Playwright has been going now since 2020. That's close to 6 whole years as I type this! And for at least 4 of those the same issue around handling unpredictable elements existed. I recall hitting it in 2024 when working on a horrendously legacy website. Playwright was a huge leap forward but still lacked the magic touches.",
      },
      {
        type: "paragraph",
        text: "Then in early 2025 along came locator handlers…",
      },
      {
        type: "heading",
        text: "Implementing Locator Handlers",
      },
      {
        type: "paragraph",
        text: "The concept is rather simple and eloquent in code. It's also ultimately doing precisely what QTP's Disaster Recoveries did back in the day:",
      },
      {
        type: "list",
        items: [
          "You call the locator handler function, which is part of the page fixture, and pass in a locator as the first parameter. This is the locator you have identified as a troublesome, unpredictable fly in your framework's carefully crafted ointment.",
          "You then pass in the desired action to take when/if this locator is encountered during test execution in the form of an anonymous function (lambda). For example: click OK on the popup, wait 1 second, console log it, move on.",
        ],
      },
      {
        type: "paragraph",
        text: "That's it! The crucial part is registering this handler early on in your test. In my experience, you should set them up in your **beforeEach** hooks. This ensures you register them before the locator(s) are first likely to be encountered.",
      },
      {
        type: "code",
        text: "test.beforeEach(async ({ page, dcjPage }) => {\n  await page.addLocatorHandler(\n    page.getByRole('heading', { name: \"Sorry, there's been a problem\" }),\n    async () => {\n      assert.fail(\n        `Sorry, there's been a problem pop up encountered on page - ${await page.url()}`,\n      );\n    },\n  );\n});",
      },
      {
        type: "paragraph",
        text: "You don't need to handle the locator at all either. In the above example, I fail a test there and then when an uncaught application error is thrown and displayed in the UI. This ensures the test halts immediately and we receive feedback as quickly as possible instead of letting a test hang until a timeout is hit.",
      },
      {
        type: "paragraph",
        text: "It is worth noting that the locatorHandler function is not asynchronous. Therefore, you do not use the await keyword when calling it. This is because of the nature of what it is doing. Once called, it runs synchronously alongside your test execution. It is also capable of working when you run in parallel using multiple workers. It essentially is applied to each worker.",
      },
      {
        type: "paragraph",
        text: "However, the function/routine you pass to it as the action to take must be asynchronous in order to work nicely with the rest of your Playwright code.",
      },
      {
        type: "paragraph",
        text: "What I would like to see next from the Playwright team is the ability to add network handlers. For example, fail the test if a particular network response is something other than a 200 status code.",
      },
      {
        type: "heading",
        text: "Wrap Up",
      },
      {
        type: "callout",
        text: "Utilising the locator handler where appropriate is a key way to ensure your framework is as robust as possible.",
      },
      {
        type: "paragraph",
        text: "Utilising the locator handler where appropriate is a key way to ensure your framework is as robust as possible. If you have any issues with unpredictable elements causing flaky results and blocking your tests from resuming their flows then this is likely the answer.",
      },
      {
        type: "paragraph",
        text: "Once applied, you can remove all that messy conditional logic if you've resorted to that up until now.",
      },
      {
        type: "paragraph",
        text: "Generally, it is best to apply simple actions (like click OK in a popup) as your recoveries. Using it to perform more involved flows is perhaps best avoided. This really does depend on your specific use case though.",
      },
      {
        type: "embed",
        embedType: "linkedin",
        embedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:share:7426239417369034752?collapsed=1",
        caption: "Join the discussion on LinkedIn",
        height: "262",
      },
    ],
  },
  {
    slug: "playwright-test-results-dashboard",
    title: "Prompt Engineering a Playwright Test Results Dashboard",
    excerpt:
      "Prompt engineering a bespoke centralised dashboard to visualise Playwright test results effectively.",
    date: "2026-01-24",
    formattedDate: "January 24, 2026",
    coverImage: "/blog/dashboard-1.jpeg",
    tags: [
      "Prompt Engineering",
      "Playwright",
      "Results",
      "Automation",
      "Dashboard",
      "JavaScript",
      "GitHub Pages",
    ],
    content: [
      {
        type: "paragraph",
        text: "In modern web development, automated testing is crucial for ensuring application reliability. **Playwright** has emerged as a powerful tool for end-to-end testing, but visualising test results in a meaningful way can be challenging. Particularly to non technical stakeholders. To address this, I embarked on a journey to create a custom dashboard that centralises and displays Playwright test results effectively across multiple projects and teams.",
      },
      {
        type: "image",
        src: "/blog/dashboard-4.png",
        alt: "Playwright Test Results Dashboard showing results and duration trends",
        caption:
          "The dashboard provides a comprehensive view of test metrics including pass rates, test counts, and execution times.",
      },
      {
        type: "heading",
        text: "The Requirement",
      },
      {
        type: "paragraph",
        text: `In 2025, I was involved in a large scale project acting as a **Lead Quality Engineer**. I was overseeing the work of a team of fellow Quality Engineers responsible for building and maintaining a Playwright based automation framework.
        `,
      },
      {
        type: "paragraph",
        text: `After a lot of hard work, we had it all set up and working great. Daily scheduled runs on our CI server. Fast, reliable API based health checks. Visual tests. Even schema validation and post deployment smoke tests.`,
      },
      {
        type: "paragraph",
        text: "We were covering three separate applications, multiple back end services, and running these tests against up to ten different test environments on a daily basis.",
      },
      {
        type: "paragraph",
        text: "Although our tests were capable of the task, **we were struggling with reporting**. Having to hunt through CI logs and stack traces for errors reported by failing tests became a serious burden. Downloading Playwright's native HTML reports as CI artifacts was also a slow process. The files are often large, easily sometimes exceeding 200MB, and no one could do this unless they were versed with the CI pipelines and had the appropriate access level.",
      },
      {
        type: "callout",
        text: "We were struggling with reporting. Having to hunt through CI logs and stack traces for errors became a serious burden.",
      },
      {
        type: "paragraph",
        text: "I had an idea forming; one I had pondered on for many months even before being a part of this particular project. I knew the answer to our reporting and general debugging woes was some form of centralised solution. A **results dashboard** where all our daily run results were fed into.",
      },
      {
        type: "paragraph",
        text: "At first, the approach seemed clear. To purchase a turnkey solution to the problem. There are many on the market such as BrowserStack’s [recent offering](https://www.browserstack.com/improve-test-automation-with-browserstack-observability). However, none come for free and, when working at large enterprise companies, procurement is often a slow, draining process for all concerned. There was also the inevitable problem of project budgets and managing to secure the funds needed for such a product.",
      },
      {
        type: "paragraph",
        text: "Ultimately, I wanted to devise an in-house solution.",
      },
      {
        type: "paragraph",
        text: "It wasn’t until midway into 2025 that a potential route to achieving this became clear…",
      },
      {
        type: "heading",
        text: "A Prompt Engineering Approach",
      },
      {
        type: "image",
        src: "/blog/dashboard-2.png",
        alt: "Test Run History section of the dashboard",
        caption:
          "A detailed view of individual test runs, showcasing pass/fail status, direct link to the CI run, and execution duration.",
      },
      {
        type: "paragraph",
        text: "**It started with a prompt**. An experiment. I have been working with LLMs as part of my role now on a daily basis. They have changed the landscape of test automation entirely.",
      },
      {
        type: "paragraph",
        text: "I got into a conversation about the problem I had. The solution I wanted to achieve and the context behind it.",
      },
      {
        type: "paragraph",
        text: "Ideas flowed, many got discarded early on. But one stuck: **Use the JSON output** you can enable Playwright to generate as a means to log results into a centralised location. Once the JSON is available, the rest is simply a matter of working with the data. I say simply...",
      },
      {
        type: "callout",
        text: "Use the JSON output you can enable Playwright to generate as a means to log results into a centralised location.",
      },
      {
        type: "paragraph",
        text: "I had another major limitation to deal with. How to host such a centralised repo. The conventional way would be to host a site, create a database, and then integrate an API for the calling code to send its JSON to.",
      },
      {
        type: "paragraph",
        text: "I couldn’t do this due to the constraints I was working with within the company. No means to spin up such a solution without months of deliberation with the powers that be.",
      },
      {
        type: "paragraph",
        text: "What I did have access to was an internally hosted GitHub instance and I knew I could easily spin up a repo there. Not only that. I also knew GitHub allowed you to host static webpages via **GitHub Pages**.",
      },
      {
        type: "paragraph",
        text: "However, our particular project was using Azure DevOps. It is never straightforward!",
      },
      {
        type: "paragraph",
        text: "Then the LLM struck gold (**Claude Sonnet 4.5** in case you wondered). It suggested a static website, hosted in GitHub Pages, within a repo that stored the JSON and then used JavaScript to parse, inspect, and display the data within the JSON files.",
      },
      {
        type: "paragraph",
        text: "Playwright’s JSON reporter output structure is similar to JUnit or other test runner output structures. It contains all the metadata associated with a particular test run. It is easy to enable it in Playwright’s config file.",
      },
      {
        type: "paragraph",
        text: "So, the answer to our first piece of the puzzle was identified. **Host a repo and static site for storing and displaying the JSON results files.**",
      },
      {
        type: "paragraph",
        text: "But then came the next challenge. How to get the JSON from multiple different CI servers, pipelines, and projects into the centralised repo after they get generated post test run.",
      },
      {
        type: "paragraph",
        text: "Sonnet was quick on the draw: **git remote pushes**.",
      },
      {
        type: "paragraph",
        text: "Instead of using an API, I could use **Git** to remotely push the JSON to the repository. The only requirement to achieve this was to ensure the calling repos had a **PAT token** setup granting them access to the dashboard's repo. Voila!",
      },
      {
        type: "code",
        text: `node ./.github/scripts/process-report.js
# Stage and commit the regenerated changes
git add .
$stagedFiles = git diff --staged --name-only
if ($stagedFiles) {
  $fullCommitMessage = "Update test results for commit $CommitSha - $CommitMessage"
  git commit -m $fullCommitMessage
  Write-Host "[OK] Successfully regenerated and committed report"
  return $true
}`,
      },
      {
        type: "paragraph",
        text: "And so the work started. I prompted, conversed, tested. For many weeks. A vibe-coded solution was formed. Quirky at first. Not really good enough, yet.",
      },
      {
        type: "paragraph",
        text: "I took the driving seat for a while. Played with the CSS, and fiddled with the increasingly complex JavaScript functions responsible for inspecting the JSON and figuring out the test metrics.",
      },
      {
        type: "code",
        text: `async renderSummaryCards() {
  const totalRuns = this.filteredData.length;
  const passedRuns = this.filteredData.filter(
    (run) => run.status === "passed",
  ).length;
  const successRate =
    totalRuns > 0 ? Math.round((passedRuns / totalRuns) * 100) : 0;
  const avgDuration =
    totalRuns > 0
      ? Math.round(
          this.filteredData.reduce((sum, run) => sum + run.duration, 0) /
            totalRuns,
        )
      : 0;
  const totalTests = this.filteredData.reduce(
    (sum, run) => sum + run.passed + run.failed + run.skipped,
    0,
  );
  const totalFlakyTests = this.filteredData.reduce(
    (sum, run) => sum + (run.flaky || 0),
    0,
  );
}`,
      },
      {
        type: "paragraph",
        text: "At times, it seemed like it was going to prove a little too ambitious. I just couldn’t get things to work reliably. Metrics were not calculated correctly. Performance was also sluggish.",
      },
      {
        type: "paragraph",
        text: "**But I persevered**. Within a month, I had a proof-of-concept site hosted in GitHub Pages, some test JSON to play with, and a working pipeline job from our test automation repo sending its JSON result file to the GitHub repo via a git remote push.",
      },
      {
        type: "paragraph",
        text: "The LLMs evolved too. 2025 was a wild ride in this regard. All of a sudden, **Gemini 3** hit along with **Claude Opus 4.5**.",
      },
      {
        type: "paragraph",
        text: "Things started to seriously take shape.",
      },
      {
        type: "heading",
        text: "Iterating the Solution",
      },
      {
        type: "paragraph",
        text: "I burned GitHub Copilot credits well into the night. Then countless hours of testing followed. Then one day in early November 2025 I had something I felt was good enough.",
      },
      {
        type: "paragraph",
        text: "It let me post JSON to it from multiple projects (some using **Azure Devops**, others using **GitHub Actions**). It displayed the results. It was performant. It looked… good.",
      },
      {
        type: "paragraph",
        text: "There is a lot of detail here I haven’t covered. The innards of this solution are rather intricate. For example, the actual JSON analysis is done within a JavaScript file that resides in the centralised repo. **That first gets pulled by the calling repos' pipeline jobs, then gets executed via Node.js as a command**. The script then finds the results JSON for that run, inspects it, and spits out the summarised data into a **manifest file**. Think of that as a log of all the test runs over time. It timestamps the run, provides high level info, and the project etc associated with that particular run. It then pushes that manifest file (along with the JSON) to the central dashboard repo.",
      },
      {
        type: "paragraph",
        text: "There are also weekly **GitHub Actions scheduled jobs** within the dashboard repo that compress the JSON files and cleanup the non compressed files. This keeps the repo size as small as possible.",
      },
      {
        type: "paragraph",
        text: "So many other things! But ultimately, I did it. Using a lot of iteration, prompting, and good old fashioned testing.",
      },
      {
        type: "paragraph",
        text: "The **Playwright Test Results Dashboard** is now several months old and is being used by five separate projects within the company. There are thousands of JSON files now and many weeks worth of test run data available for trends etc to be identified and displayed. Data can be filtered by project, too, meaning teams can opt to only see the metrics specific to the tests they own and run.",
      },
      {
        type: "paragraph",
        text: "I’ve also been able to encourage others within the company to contribute to the dashboard. Someone had a nice idea of adding **DORA** metrics and a section for identifying the slowest running tests for each suite/run. They successfully raised a PR for these features and we merged the changes after a series of unit test and merge checks verified no regression issues were likely to sneak in. And yes, we use Playwright to test the dashboard too!",
      },
      {
        type: "paragraph",
        text: "Most importantly, it hasn’t fallen over.. yet! And we use it daily. In fact, a colleague even thought it was part of Playwright. Job done.",
      },
      {
        type: "image",
        src: "/blog/dashboard-3.png",
        alt: "Advanced analytics view of the dashboard",
        caption:
          "Filtering by project allows teams to focus specifically on the metrics and trends that matter to them. ROI metrics help quantify the value of automated testing efforts.",
      },
      {
        type: "heading",
        text: "Key Features",
      },
      {
        type: "list",
        items: [
          "Centralised reporting solution with multi-project / team support",
          "Clean, fresh UI detailing test metrics, trends, graphs, and a history of runs with links to the CI runs.",
          "DORA, ROI metrics (ROI can be configured by setting hourly rates, manual test time equivalents, etc)",
          "Failure trends, root cause analysis",
          "Dark mode!",
        ],
      },
      {
        type: "heading",
        text: "Takeaway",
      },
      {
        type: "callout",
        text: "Prompt engineering enables you to build the tools you need but probably only dreamt of up until now.",
      },
      {
        type: "paragraph",
        text: "Prompt engineering enables you to build the tools you need but probably only dreamt of up until now. It can also enable you to save your company money in the long run by having the ability to **take on a build-it-yourself mindset**.",
      },
      {
        type: "paragraph",
        text: "The dashboard I built would have taken months of full time work to create without leveraging LLMs and utilising effective prompting.",
      },
      {
        type: "paragraph",
        text: "However, it is not magic. You still need to understand the code and architecture behind what the LLMs create. You need to **test it** and apply an iterative approach to feature releases and feedback. Early discussions are also key. Don’t waste time (and tokens) building something that ends up being unsuitable. Get it right first-time by entering into discussions around the problem, the context, and any constraints you might face.",
      },
      {
        type: "paragraph",
        text: "Happy prompting.",
      },
      {
        type: "embed",
        embedType: "linkedin",
        embedUrl:
          "https://www.linkedin.com/embed/feed/update/urn:li:share:7421305729635991552?collapsed=1",
        caption: "Join the discussion on LinkedIn",
      },
    ],
  },
];
