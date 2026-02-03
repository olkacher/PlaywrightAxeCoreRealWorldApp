import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

test("Accessibility audit with axe-core", async ({ page }) => {
    await page.goto('http://frontend-ta-realworldapp.apps.os-prod.lab.proficom.de/');
    await page.fill('#username', 'Solon_Robel60');
    await page.fill('#password', 's3cret');
    await page.click('[data-test="signin-submit"]');
    await page.waitForSelector('[data-test="sidenav-signout"]');

    const accessibilityResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();

  fs.writeFileSync(
    "axe-report.json",
    JSON.stringify(accessibilityResults, null, 2)
  );
});