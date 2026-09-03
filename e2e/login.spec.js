import { test, expect } from "@playwright/test";

test("användaren kan logga in", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("E-postadress").fill("test@test.se");
  await page.getByPlaceholder("Lösenord").fill("test123");

  await page.getByRole("button", { name: "Logga in" }).click();

  await expect(page).toHaveURL("http://localhost:5173/");
  await expect(page.getByText("Mina uppgifter")).toBeVisible();
});
