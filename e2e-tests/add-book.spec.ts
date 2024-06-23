import { test, expect } from "@playwright/test";

test("should add a book to the Read category", async ({ page }) => {
  await page.goto("/my-library");

  await page.click("div.Add1 >> button.button");

  const modalSelector = ".modal";

  await page.fill(`${modalSelector} input[name="title"]`, "Test Book");
  await page.fill(`${modalSelector} input[name="author"]`, "Test Author");
  await page.fill(`${modalSelector} input[name="genre"]`, "Fiction");
  await page.fill(`${modalSelector} input[name="pages"]`, "300");
  await page.fill(`${modalSelector} input[name="rating"]`, "5");

  await page.click(`${modalSelector} button:has-text("Add")`);

  await page.waitForSelector('div.table1 table:has-text("Test Book")');

  expect(page.locator('div.table1 table:has-text("Test Book")')).toBeTruthy();
  expect(page.locator('div.table1 table:has-text("Test Author")')).toBeTruthy();
  expect(page.locator('div.table1 table:has-text("Fiction")')).toBeTruthy();
  expect(page.locator('div.table1 table:has-text("300")')).toBeTruthy();
  expect(page.locator('div.table1 table:has-text("5")')).toBeTruthy();
});

test("should add a book to the currently-reading category", async ({
  page,
}) => {
  await page.goto("/my-library");

  await page.click("div.Add2 >> button.button");

  const modalSelector = ".modal";

  await page.fill(`${modalSelector} input[name="title"]`, "Test Book");
  await page.fill(`${modalSelector} input[name="author"]`, "Test Author");
  await page.fill(`${modalSelector} input[name="genre"]`, "Fiction");
  await page.fill(`${modalSelector} input[name="pages"]`, "300");
  await page.fill(`${modalSelector} input[name="progress"]`, "0");

  await page.click(`${modalSelector} button:has-text("Add")`);

  await page.waitForSelector('div.table2 table:has-text("Test Book")');

  expect(page.locator('div.table2 table:has-text("Test Book")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("Test Author")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("Fiction")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("300")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("0")')).toBeTruthy();
});

test("should add a book to the want-to-read category", async ({ page }) => {
  await page.goto("/my-library");

  await page.click("div.Add3 >> button.button");

  const modalSelector = ".modal";

  await page.fill(`${modalSelector} input[name="title"]`, "Test Book");
  await page.fill(`${modalSelector} input[name="author"]`, "Test Author");
  await page.fill(`${modalSelector} input[name="genre"]`, "Fiction");
  await page.fill(`${modalSelector} input[name="pages"]`, "300");

  await page.click(`${modalSelector} button:has-text("Add")`);

  await page.waitForSelector('div.table3 table:has-text("Test Book")');

  expect(page.locator('div.table2 table:has-text("Test Book")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("Test Author")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("Fiction")')).toBeTruthy();
  expect(page.locator('div.table2 table:has-text("300")')).toBeTruthy();
});

test("delete the book with author 'Test Author' from the Read category", async ({
  page,
}) => {
  await page.goto("/my-library");

  const bookRow = page.locator("div.table1 table tr", {
    hasText: "Test Author",
  });

  await expect(bookRow).toBeVisible();

  await bookRow.locator('button:has-text("Delete")').click();
  await page.waitForTimeout(1000);

  expect(
    await page.isVisible('div.table1 table:has-text("Test Author")')
  ).toBeFalsy();
});

test("delete the book with author 'Test Author' from the currently reading category", async ({
  page,
}) => {
  await page.goto("/my-library");

  const bookRow = page.locator("div.table2 table tr", {
    hasText: "Test Author",
  });

  await expect(bookRow).toBeVisible();

  await bookRow.locator('button:has-text("Delete")').click();
  await page.waitForTimeout(1000);

  expect(
    await page.isVisible('div.table2 table:has-text("Test Author")')
  ).toBeFalsy();
});

test("delete the book with author 'Test Author' from the want to read category", async ({
  page,
}) => {
  await page.goto("/my-library");

  const bookRow = page.locator("div.table3 table tr", {
    hasText: "Test Author",
  });

  await expect(bookRow).toBeVisible();

  await bookRow.locator('button:has-text("Delete")').click();
  await page.waitForTimeout(1000);

  expect(
    await page.isVisible('div.table3 table:has-text("Test Author")')
  ).toBeFalsy();
});
