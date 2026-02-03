import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

test("Accessibility audit with axe-core", async ({ page }) => {
  await page.goto("https://oubvpd.sharepoint.com/sites/quality");

  const accessibilityResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();

  fs.writeFileSync(
    "axe-report.json",
    JSON.stringify(accessibilityResults, null, 2)
  );

  expect(accessibilityResults.violations).toEqual([]);
});