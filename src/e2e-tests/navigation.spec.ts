import { test, expect } from "@playwright/test";

test("navigate to My Library page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=My Library");
  await expect(page).toHaveURL("/my-library");
  await expect(page.locator("h2")).toHaveText("My Library");
});

test("navigate to To-do List page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=To-do List");
  await expect(page).toHaveURL("/to-do");
  await expect(page.locator("h2")).toHaveText("To-do List");
});

test("navigate to My Recipes page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=My Recipes");
  await expect(page).toHaveURL("/my-recipes");
  await expect(page.locator("h2")).toHaveText("My Recipes");
});
