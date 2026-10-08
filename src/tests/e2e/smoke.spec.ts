import { test, expect } from "@playwright/test";

test("homepage loads with Chennai messaging", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Chennai");
});

test("services index is reachable", async ({ page }) => {
  await page.goto("/services/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
