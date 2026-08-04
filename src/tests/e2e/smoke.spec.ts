import { test, expect } from "@playwright/test";

test("homepage loads with Tamil Nadu messaging", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tamil Nadu");
});

test("services index is reachable", async ({ page }) => {
  await page.goto("/services/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
