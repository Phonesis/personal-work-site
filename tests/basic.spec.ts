import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the main header and About section", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(
      page.getByRole("heading", { name: /martin poole/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
  });

  test("skill progress bars should have proper ARIA attributes", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");

    // Find all progress bars on the page
    const progressBars = page.locator('[role="progressbar"]');
    const count = await progressBars.count();

    // Verify at least one progress bar exists
    expect(count).toBeGreaterThan(0);

    // Check the first progress bar has all required ARIA attributes
    const firstProgressBar = progressBars.first();
    await expect(firstProgressBar).toHaveAttribute("role", "progressbar");
    await expect(firstProgressBar).toHaveAttribute("aria-valuenow");
    await expect(firstProgressBar).toHaveAttribute("aria-valuemin", "0");
    await expect(firstProgressBar).toHaveAttribute("aria-valuemax", "10");
    await expect(firstProgressBar).toHaveAttribute("aria-label");

    // Verify aria-label contains meaningful text
    const ariaLabel = await firstProgressBar.getAttribute("aria-label");
    expect(ariaLabel).toMatch(/proficiency/i);
    expect(ariaLabel).toMatch(/out of 10/i);
  });
});
