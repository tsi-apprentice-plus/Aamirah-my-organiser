import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
test("navigate to My Library page", async ({ page }) => {
  await page.goto(`${BASE_URL}`);
  await page.click("text=My Library");
  await expect(page).toHaveURL(`${BASE_URL}/my-library`);
  await expect(page.locator("h2")).toHaveText("My Library");
});

test("navigate to To-do List page", async ({ page }) => {
  await page.goto(`${BASE_URL}`);
  await page.click("text=To-do List");
  await expect(page).toHaveURL(`${BASE_URL}/to-do`);
  await expect(page.locator("h2")).toHaveText("To-do List");
});

test("navigate to My Recipes page", async ({ page }) => {
  await page.goto(`${BASE_URL}`);
  await page.click("text=My Recipes");
  await expect(page).toHaveURL(`${BASE_URL}/my-recipes`);
  await expect(page.locator("h2")).toHaveText("My Recipes");
});
