"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ExperienceItem from "@/components/ExperienceItem";
import SkillSection from "@/components/SkillSection";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const start = Date.now();
    const minDelay = 450;
    const stopLoading = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(minDelay - elapsed, 0);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      stopLoading();
    } else {
      window.addEventListener("load", stopLoading);
    }

    const fallback = window.setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener("load", stopLoading);
      window.clearTimeout(fallback);
    };
  }, []);
  const programmingLanguages = [
    { name: "TypeScript/JavaScript", level: 10 },
    { name: "Java", level: 7 },
    { name: "C#/.NET", level: 6 },
    { name: "Python", level: 5 },
  ];

  const testingTools = [
    { name: "Playwright" },
    { name: "Cypress" },
    { name: "Selenium WebDriver" },
    { name: "Protractor" },
    { name: "SpecFlow" },
    { name: "Cucumber" },
    { name: "Jest" },
    { name: "Mocha" },
    { name: "Gherkin" },
    { name: "JMeter" },
    { name: "K6" },
    { name: "OWASP ZAP" },
    { name: "Stackhawk" },
    { name: "JUnit" },
    { name: "Maven" },
    { name: "Percy" },
    { name: "Applitools" },
    { name: "BrowserStack" },
    { name: "REST Assured" },
    { name: "Google Lighthouse" },
    { name: "Axe" },
  ];

  const ciTools = [
    { name: "GitHub Actions" },
    { name: "Bitbucket" },
    { name: "Jenkins" },
    { name: "CircleCI" },
    { name: "Azure Devops" },
    { name: "Git" },
    { name: "Datadog" },
    { name: "Snyk" },
    { name: "SonarCloud" },
  ];

  const webTech = [
    { name: "React" },
    { name: "Webpack" },
    { name: "Vite" },
    { name: "Node.js" },
    { name: "Vercel" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "Angular" },
    { name: "Storybook" },
    { name: "Vue.js" },
  ];

  const aiTools = [
    { name: "GitHub Copilot" },
    { name: "Claude Sonnet / Opus" },
    { name: "GPT-5" },
    { name: "Gemini Pro / Flash" },
    { name: "MCP (Playwright, Chrome, Jira)" },
    { name: "GitHub Coding Agents" },
  ];

  const experiences = [
    {
      title: "Lead Quality Engineer",
      company: "Legal & General",
      period: "October 2023 – Present",
      location: "Hove / London / Cardiff / Remote – UK",
      skills: [
        "Playwright",
        "Cucumber",
        "GitHub Actions",
        "Azure DevOps",
        "Applitools",
        "Percy",
        "TypeScript/JavaScript",
      ],
      responsibilities: [
        "Overseeing multiple project workstreams and architecting test automation strategies / approaches.",
        "Extensively using Playwright to further enhance and modernise existing UI and API based test automation frameworks.",
        "Implementing CI integration and applying optimised workflows using GitHub Actions and Azure DevOps for multiple projects.",
        "Incorporating Applitools integration for automated visual regression testing for department wide usage across several large UI based projects.",
        "Introducing a Playwright based API testing framework for regression testing activities which exposed multiple defects with GraphQL endpoints. Also used as a basis for a load test framework.",
        "Running regular training sessions and taking part in a 2024 testing conference where I ran a well-received session on Playwright usage.",
        "Leveraging AI Agents (GPT, Claude, Gemini) and MCP with GitHub Copilot to enhance and speed up the process of generating tests. Training others to work with AI to maximise their test coverage.",
        "Acting as a lead on a highly complex regulatory project overseeing the work of a team of graduates to ensure best practices adhered to within a large Playwright based framework.",
      ],
    },
    {
      title: "Senior Quality Engineer / SDET",
      company: "Matillion",
      period: "February 2022 – October 2023",
      location: "Remote / Manchester – UK",
      skills: [
        "Cypress",
        "Percy",
        "StackHawk",
        "K6",
        "CircleCI",
        "Datadog",
        "TypeScript/JavaScript",
      ],
      responsibilities: [
        "Worked as part of a front-end team to deliver a cutting-edge SaaS based ETL application called the Data Productivity Cloud – a first in the industry.",
        "Development and testing of React based websites and component libraries using tools such as Cypress, Percy, and Jest.",
        "Built and maintained a framework for load testing APIs using K6 as part of an integrated pipeline in CircleCI.",
        "Became a member of the Cy.pronauts programme, where Cypress experts from around the world were invited to join a closed community to gain access to Beta features and share feedback by the Cypress team.",
        "Devised solutions for testing Launch Darkly Feature Flags using Cypress and performing automated regression testing after regular deployments to multiple environments.",
        "Creation and maintenance of an NPM package for company-wide consumption of re-usable Cypress commands/functions across multiple front-end teams.",
        "Development of a bespoke framework utilising Cypress Component Testing and the Axe-core testing engine to check for accessibility violations against React based components used as part of multiple micro frontends (ensured a WCAG 2.1 AA standard).",
        "Setting up DAST scanning using Stackhawk and Cypress for comprehensive automated security testing within a CircleCI pipeline.",
        "Created an optimal approach for automated visual testing using Percy in conjunction with Cypress. This significantly reduced the need for many functional tests and dropped execution times in CI to minimal levels.",
        "Training fellow developers and testers in the usage of Cypress and building effective, robust integration tests via video conferencing sessions, face to face mentoring, and creation of Wiki/Confluence pages.",
        "Setting up CI pipelines (CircleCI, Bitbucket) and synthetic tests in Datadog for efficient 'shift left' and ‘shift right’ deployment and testing practices.",
      ],
    },
    {
      title: "Senior Test Automation Engineer / SDET",
      company: "Legal & General",
      period: "July 2018 – February 2022",
      location: "Hove / London / Remote – UK",
      skills: [
        "Playwright",
        "Cucumber",
        "Protractor",
        "Rest Assured",
        "JMeter",
        "Jenkins",
        "Github Actions",
        "Applitools",
        "TypeScript/JavaScript",
        "Java",
      ],
      responsibilities: [
        "Senior Automation Engineer embedded within scrum teams delivering Angular based web applications and associated REST and GraphQL backend microservices using tools such as Protractor, JMeter, and Cucumber in TypeScript / Node.js.",
        "Introduced Applitools to testing frameworks for driving automated visual testing. This saved countless hours of execution time and minimised the need for more conventional functional tests.",
        "Wrote a Java based BDD framework utilising dependency injection for automated testing of GraphQL APIs using Rest Assured, Maven, JUnit, Cucumber.",
        "Developed and ran load tests for regularly checking various endpoints to ensure they remained performant under stress (JMeter, JUnit, Java, Maven).",
        "Performed regular penetration testing with Open Web Application Security Project (OWASP) tools such as ZAP to test for vulnerabilities to common attack vectors and built a bespoke framework to use it alongside Selenium based scripts (Java, Selenium WebDriver, OWASP ZAP).",
        "Architecting new frameworks for department wide migration to Github/Github Actions using future proofed web automation libraries supporting the CDP (Chrome Devtools Protocol) such as Playwright and Cypress. These framework patterns were later used across multiple teams/departments within the company.",
      ],
    },
    {
      title: "Senior Test Developer / SDET",
      company: "Applied Systems",
      period: "July 2014 – July 2018",
      location: "Brighton / Belfast – UK",
      skills: ["SpecFlow", "Selenium WebDriver", "TeamCity", "C#"],
      responsibilities: [
        "Pioneered a bespoke automation framework written in C# using SpecFlow, Selenium WebDriver, MSTest, and Microsoft UIAutomation for a hybrid desktop/web-based insurance application.",
        "Adopted DRY and SOLID programming principles to test automation code to keep codebase modular and easy to maintain. This included converting many legacy tests to use a cleaner Page Object based pattern.",
        "Introduced BDD to test automation practices within the company and regularly trained testers in both the UK and US to use SpecFlow to write meaningful BDD Scenario steps and code them using best industry practices.",
        "Helped formalise a process for signing off testing as part of a Kanban based delivery model.",
      ],
    },
    {
      title: "Senior Automation Engineer / SDET",
      company: "Equiniti (formerly MGM Advantage)",
      period: "July 2011 – June 2014",
      location: "Worthing – UK",
      skills: ["HP QTP/UFT", "Visual Basic"],
      responsibilities: [
        "Planned and developed an effective data-driven automation framework using HP QuickTest Professional (QTP/UFT), which encapsulated virtually every facet of business operations including actuarial and underwriting regression testing.",
        "Oversaw the work of a team of external contract automation engineers during a large-scale regulatory project, acting as a tech lead and mentor.",
        "Manual UAT and technical / white-box testing of regulatory and strategic software releases.",
        "Regularly travelled to Dublin to work closely with Agile based development teams in order to identify and resolve defects during early stages of project test cycles.",
      ],
    },
    {
      title: "Senior Test Analyst",
      company: "Lloyds Banking Group",
      period: "August 2008 – June 2011",
      location: "Hove – UK",
      skills: ["UAT", "Test Planning"],
      responsibilities: [
        "Senior Test Analyst on one of the largest bank integration projects in UK history.",
        "Defined and executed a testing scope for data migration activities and oversaw defect resolution with offshore IT teams.",
        "Prepared metric / MI packs and progress reports for stakeholders.",
        "Identified business requirements to form a test basis, created and executed functional UAT test cases as part of regression testing activities.",
      ],
    },
  ];

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100"
      tabIndex={-1}
    >
      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 transition-opacity duration-500 ${
          isLoading ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isLoading}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/30 border-t-emerald-600" />

          <span className="text-sm font-semibold text-gray-600">Loading</span>
        </div>
      </div>
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* About */}
        <AnimatedSection className="mb-12">
          <h2
            className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4 scroll-mt-20 md:scroll-mt-72"
            id="about"
          >
            About Martin
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <p className="text-gray-700 text-lg leading-relaxed">
              An{" "}
              <a
                href="#education"
                className="font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
              >
                ISTQB CTAL–TAE
              </a>{" "}
              certified Lead Quality Engineer with over 12 years&apos;
              commercial experience designing, implementing, and maintaining
              both UI and API based automation frameworks from scratch for large
              scale greenfield projects. A code-focused technical tester, with
              extensive experience in the usage of{" "}
              <strong className="font-semibold text-gray-900">
                Playwright
              </strong>
              , <strong className="font-semibold text-gray-900">Cypress</strong>
              , and{" "}
              <strong className="font-semibold text-gray-900">
                Selenium WebDriver
              </strong>{" "}
              to build automated tests within Node.js / Java / .NET
              environments.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Passionate about the usage of{" "}
              <strong className="font-semibold text-gray-900">AI</strong> in
              testing and automation, I regularly leverage{" "}
              <strong className="font-semibold text-gray-900">LLMs</strong>{" "}
              (GPT, Claude, Gemini) with{" "}
              <strong className="font-semibold text-gray-900">MCP</strong>{" "}
              tooling to enhance and speed up the process of generating tests
              and train others to work in this way to maximise their test
              coverage.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Strong level of experience training, managing, and mentoring
              junior level testers new to coding and applying automation to
              testing processes.
            </p>
          </div>
        </AnimatedSection>

        {/* LinkedIn Posts */}
        <section className="mb-12 scroll-mt-20 md:scroll-mt-72" id="linkedin">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Latest LinkedIn Post
          </h2>
          <AnimatedSection className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col items-center w-full max-w-[560px] mx-auto">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7391066787909611521?collapsed=1"
              height="576"
              width="504"
              allowFullScreen={true}
              title="Embedded post"
              className="w-full max-w-[504px]"
            ></iframe>
          </AnimatedSection>
        </section>

        {/* Skills */}
        <section className="mb-12 scroll-mt-20 md:scroll-mt-72" id="skills">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Core Skills
          </h2>
          <SkillSection
            title="Programming Languages"
            items={programmingLanguages}
            index={0}
            fixedCardWidth
            fullWidthBars
          />
          <SkillSection
            title="Testing Tools/Libraries"
            items={testingTools}
            index={1}
          />
          <SkillSection
            title="CI/Source Control/Code Quality"
            items={ciTools}
            index={2}
          />
          <SkillSection title="Web Technologies" items={webTech} index={3} />
          <SkillSection title="AI Tools and LLMs" items={aiTools} index={4} />
        </section>

        {/* Notable Career Projects */}
        <section className="mb-12 scroll-mt-20 md:scroll-mt-72" id="projects">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Notable Career Projects
          </h2>
          <AnimatedSection className="bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-200 hover:shadow-xl transition-shadow">
            {/* Project 1 */}
            <div className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-bold text-emerald-600 mb-1">
                Playwright Test Results Dashboard
                <span className="text-gray-500 font-normal">(2025)</span>
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Description:</span> Utilised
                agents to partially prompt engineer a bespoke reporting website
                using Playwright&apos;s JSON output feature to gather metrics
                and test execution trends. Site uses Git remote fetches and
                commits in multiple CI systems to log test results to a
                centralised repository. A front end then displays the metrics
                along with trends and info on root causes around failures etc.
                The site ended up being used by multiple projects and
                departments within the company and completely removed any need to
                purchase third party reporting solutions.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> I devised and
                developed the site from the ground up, utilising agents to
                assist with the complex JSON parsing and metrics calculation
                logic. As part of the development, I also thoroughly tested the
                solution and rolled new features out iteratively.
              </p>
            </div>
            {/* Project 2 */}
            <div className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-bold text-emerald-600 mb-1">
                Retail Annuities - Agile Release Train (RA-ART)
                <span className="text-gray-500 font-normal">(2025)</span>
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Description:</span> A
                modernisation project with a scope to upgrade several core
                applications used by a large financial company for driving their
                annuities business. Applications were a mix of Angular based
                front ends and REST based endpoints.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> Acting as a Lead
                Quality Engineer overseeing a large team of engineers tasked
                with developing an automation framework from scratch supporting
                multiple applications and service layers. Introduced MCP and
                Agent usage to speed up creation of tests and encourage AI
                utilisation where appropriate.
              </p>
            </div>
            {/* Project 3 */}
            <div className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-bold text-emerald-600 mb-1">
                My Scheme Updates (MySU){" "}
                <span className="text-gray-500 font-normal">(2024)</span>
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Description:</span> Angular
                based site designed to allow pension fund managers to
                administrate schemes and contributions data.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> I successfully
                rewrote a fledgling framework from the ground up using
                Playwright. This turned around the quality of the product and
                ensured testing was mostly fully automated. It changed the
                culture around testing within the team, fostering a greater
                appreciation for quality and encouraging more developers to take
                ownership of testing.
              </p>
            </div>
            {/* Project 4 */}
            <div className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-bold text-emerald-600 mb-1">
                Data Productivity Cloud (DPC){" "}
                <span className="text-gray-500 font-normal">(2022-2023)</span>
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Description:</span> A SaaS based
                ETL solution built in a React frontend.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> I acted as the
                Senior SDET and built a testing framework from scratch covering
                all functional areas of the site using Cypress. This included
                visual testing, accessibility testing, and mocking capabilities.
                I also designed and implemented a load testing framework using
                K6 and integrated it into a CI pipeline.
              </p>
            </div>
            {/* Project 5 */}
            <div className="pb-8 border-b border-gray-200 last:border-b-0 last:pb-0">
              <h3 className="text-xl font-bold text-emerald-600 mb-1">
                Manage Your Account (MYA){" "}
                <span className="text-gray-500 font-normal">(2018-2021)</span>
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Description:</span> A customer
                facing Angular based web application for managing pension
                accounts and contributions.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> I designed and
                implemented a comprehensive testing strategy that included unit,
                integration, and end-to-end tests. This included automated
                penetration testing with OWASP ZAP and load testing using
                JMeter.
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Personal Web Development Projects */}
        <section
          className="mb-12 scroll-mt-20 md:scroll-mt-72"
          id="personal-projects"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Personal Web Development Projects
          </h2>
          <AnimatedSection className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-xl font-bold text-emerald-600 mb-3">
                Life with MND{" "}
                <span className="text-gray-500 font-normal">(2025)</span>
              </h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A personal website I designed and developed for my sister, who
                was diagnosed with Motor Neurone Disease in 2022. The site
                provides a platform for her to share her poetry covering the
                daily challenges and experiences of living with MND.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Technologies:</span>{" "}
                    Next.js, Tailwind CSS, React, TypeScript, Node.js
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Features:</span> Clean,
                    accessible design focused on readability, mobile-responsive
                    layout, and easy content management for sharing poetry and
                    personal reflections.
                  </p>
                </div>
                <a
                  href="https://www.lifewithmnd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all transform hover:-translate-y-0.5"
                >
                  Visit Site
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Experience */}
        <section className="mb-12 scroll-mt-20 md:scroll-mt-72" id="experience">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Work Experience
          </h2>
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} index={index} />
          ))}
        </section>

        {/* Education */}
        <section className="mb-12 scroll-mt-20 md:scroll-mt-72" id="education">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Education & Certifications
          </h2>
          <AnimatedSection className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900">
                  AIOps - Foundation Level
                </h4>
                <p className="text-gray-600">DevOps Institute</p>
                <p className="text-gray-500">October 2025</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900">
                  ISTQB - ISEB Certified Tester Advanced Level (CTAL–TAE)
                </h4>
                <p className="text-gray-500">
                  BCS (The Chartered Institute for IT)
                </p>
                <p className="text-gray-500">September 2024</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900">
                  ISTQB - ISEB Certified Tester Foundation Level (CTFL)
                </h4>
                <p className="text-gray-600">
                  BCS (The Chartered Institute for IT)
                </p>
                <p className="text-gray-500">July 2011</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900">
                  Law Degree LLB (Hons)
                </h4>
                <p className="text-gray-600">University of Sussex</p>
                <p className="text-gray-500">October 2005 – July 2008</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Interests */}
        <section className="scroll-mt-20 md:scroll-mt-72" id="interests">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-l-4 border-emerald-500 pl-4">
            Personal Interests
          </h2>
          <AnimatedSection className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <ul className="flex flex-wrap justify-center md:justify-start gap-2 text-gray-700">
              {[
                "Programming / website development",
                "Video editing",
                "Writing",
                "Bouldering / rock climbing",
                "Yoga",
                "Rambling",
              ].map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-emerald-300/60 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-800 shadow-sm"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </section>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 rounded-full bg-emerald-600 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${
          showBackToTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </main>
  );
}
