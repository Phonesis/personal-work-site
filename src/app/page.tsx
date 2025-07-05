"use client";
import Header from "@/components/Header";
import ExperienceItem from "@/components/ExperienceItem";
import SkillSection from "@/components/SkillSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const programmingLanguages = [
    { name: "JavaScript/TypeScript", level: 9 },
    { name: "Java", level: 3 },
    { name: "C#/.NET", level: 3 },
    { name: "Python", level: 2 },
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
    { name: "HTML" },
    { name: "CSS" },
    { name: "Angular" },
    { name: "Storybook" },
    { name: "Vue.js" },
  ];

  const experiences = [
    {
      title: "Automation Test Lead / Lead Quality Engineer",
      company: "Legal & General",
      period: "October 2023 – Present",
      location: "Hove / London / Cardiff / Remote – UK",
      skills: [
        "Playwright",
        "Cucumber",
        "GitHub Actions",
        "Azure DevOps",
        "Applitools",
        "TypeScript/JavaScript",
      ],
      responsibilities: [
        "Overseeing multiple project workstreams and architecting test automation strategies / approaches.",
        "Extensively using Playwright to further enhance and modernise existing UI and API based test automation frameworks.",
        "Implementing CI integration and applying optimised workflows using GitHub Actions and Azure DevOps for multiple projects.",
        "Incorporating Applitools integration for automated visual regression testing for department wide usage across several large UI based projects.",
        "Introducing a Playwright based API testing framework for regression testing activities which exposed multiple defects with GraphQL endpoints. Also used as a basis for a load test framework.",
        "Running regular training sessions and taking part in a 2024 testing conference where I ran a well-received session on Playwright usage.",
        "Leveraging AI (GPT, Claude 3.5/3.7) with GitHub Copilot to enhance and speed up the process of generating tests. Training others to work with AI to maximise their test coverage.",
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
    <main className="min-h-screen bg-gray-100" tabIndex={-1}>
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* About */}
        <AnimatedSection className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900" id="about">
            About Martin
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            A certified Lead Quality Engineer / SDET with over 12 years&apos;
            commercial experience designing, implementing, and maintaining both
            UI and API based automation frameworks from scratch for large scale
            greenfield projects. A code-focused technical tester, with extensive
            experience in the usage of Playwright, Cypress, and Selenium
            WebDriver to build automated tests within Node.js / Java / .NET
            environments.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Strong level of experience training, managing, and mentoring junior
            level testers new to coding and applying automation to testing
            processes.
          </p>
        </AnimatedSection>

        {/* LinkedIn Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Latest LinkedIn Posts
          </h2>
          <AnimatedSection className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="w-full max-w-xl flex flex-col items-center">
              <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  aria-label="Enlarge LinkedIn post preview"
                  className="w-full sm:w-1/2 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
                  onClick={() => setShowModal(true)}
                  style={{ background: "none", border: "none", padding: 0 }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setShowModal(true);
                    }
                  }}
                >
                  <Image
                    src="/linkedin-post-preview.png"
                    alt="LinkedIn post preview. Click to enlarge."
                    width={400}
                    height={180}
                    className="rounded-lg border border-gray-200 w-full object-contain bg-black"
                    style={{ minHeight: "120px", maxHeight: "220px" }}
                    priority
                  />
                </button>
                <div className="flex-1 flex flex-col items-center sm:items-start">
                  <p className="text-gray-100 text-lg font-semibold mb-2 text-center sm:text-left">
                    Check out my latest post on LinkedIn about some advanced
                    Playwright techniques I&apos;ve recently been working on
                  </p>
                  <a
                    href="https://www.linkedin.com/feed/update/urn:li:activity:7346988033499430912/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 mt-2 bg-emerald-600 text-white font-bold rounded shadow hover:bg-emerald-700 transition-colors text-lg"
                  >
                    View on LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center"></p>
            {/* Modal overlay for enlarged image */}
            {showModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-zoom-out transition-opacity duration-200"
                onClick={() => setShowModal(false)}
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                aria-label="Enlarged LinkedIn post preview. Click anywhere to close."
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowModal(false);
                }}
              >
                <Image
                  src="/linkedin-post-preview.png"
                  alt="Enlarged LinkedIn post preview. Click anywhere to close."
                  width={800}
                  height={360}
                  className="rounded-lg border-4 border-white shadow-2xl max-w-full max-h-[80vh] object-contain bg-black"
                  style={{ background: "black" }}
                  priority
                />
                <span className="sr-only">
                  Click anywhere to close the enlarged image.
                </span>
              </div>
            )}
          </AnimatedSection>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Core Skills</h2>
          <SkillSection
            title="Programming Languages"
            items={programmingLanguages}
            index={0}
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
        </section>

        {/* Notable Career Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Notable Career Projects
          </h2>
          <AnimatedSection className="bg-white rounded-lg shadow-lg p-6 space-y-8">
            {/* Project 1 */}
            <div>
              <h3 className="text-xl font-bold text-emerald-700 mb-1">
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
            {/* Project 2 */}
            <div>
              <h3 className="text-xl font-bold text-emerald-700 mb-1">
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
            {/* Project 3 */}
            <div>
              <h3 className="text-xl font-bold text-emerald-700 mb-1">
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

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Work Experience
          </h2>
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} index={index} />
          ))}
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Education & Certifications
          </h2>
          <AnimatedSection className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Law Degree LL.B. (HONS)
              </h3>
              <p className="text-gray-600">University of Sussex</p>
              <p className="text-gray-500">October 2005 – July 2008</p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">
                  ISTQB - Certified Tester Advanced Level
                </h4>
                <p className="text-gray-600">
                  Test Automation Engineer (CTAL – TAE)
                </p>
                <p className="text-gray-500">
                  BCS (The Chartered Institute for IT) - September 2024
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  ISTQB - ISEB Certified Tester Foundation Level (CTFL)
                </h4>
                <p className="text-gray-600">
                  BCS (The Chartered Institute for IT)
                </p>
                <p className="text-gray-500">July 2011</p>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Personal Interests
          </h2>
          <AnimatedSection className="bg-white rounded-lg shadow-lg p-6">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
              <li>• Programming / website development</li>
              <li>• Video editing</li>
              <li>• Writing</li>
              <li>• Bouldering/rock climbing</li>
              <li>• Yoga</li>
              <li>• Rambling</li>
            </ul>
          </AnimatedSection>
        </section>
      </div>
    </main>
  );
}
