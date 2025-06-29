import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the main header and About section", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(
      page.getByRole("heading", { name: /martin poole/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();
    await expect(
      page.getByText(/test automation specialist/i).first(),
    ).toBeVisible();
  });
});
