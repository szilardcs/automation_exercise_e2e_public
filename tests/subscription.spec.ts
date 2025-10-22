import { test, expect } from "@playwright/test";
import * as testData from "../pages/test-data";

test("Verify Subscription in home page", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Scroll down to footer", async () => {
		const footer = page.locator('[id="footer"]');
		await expect(footer).toBeVisible();
		await footer.scrollIntoViewIfNeeded();
	});

	await test.step("Verify text 'SUBSCRIPTION'", async () => {
		const subscriptionText = page.getByRole("heading", { name: "Subscription" });
		await expect(subscriptionText).toBeVisible();
	});

	await test.step("Enter email address in input and click arrow button", async () => {
		const emailField = page.getByRole("textbox", { name: "Your email address", exact: true });
		const subSubmitButton = page.locator('[id="subscribe"]');
		await emailField.fill(testData.loginValues.loginEmail);
		await subSubmitButton.click();
	});

	await test.step("Verify success message 'You have been successfully subscribed!' is visible", async () => {
		const successMessage = page.getByText("You have been successfully subscribed!");
		await expect(successMessage).toBeVisible();
	});
});

test("Verify Subscription in Cart page", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click 'Cart' button", async () => {
		const cartButton = page.getByRole("link", { name: " Cart" });
		await cartButton.click();
	});

	await test.step("Scroll down to footer", async () => {
		const footer = page.locator('[id="footer"]');
		await expect(footer).toBeVisible();
		await footer.scrollIntoViewIfNeeded();
	});

	await test.step("Verify text 'SUBSCRIPTION'", async () => {
		const subscriptionText = page.getByRole("heading", { name: "Subscription" });
		await expect(subscriptionText).toBeVisible();
	});

	await test.step("Enter email address in input and click arrow button", async () => {
		const emailField = page.getByRole("textbox", { name: "Your email address", exact: true });
		const subSubmitButton = page.locator('[id="subscribe"]');
		await emailField.fill(testData.loginValues.loginEmail);
		await subSubmitButton.click();
	});

	await test.step("Verify success message 'You have been successfully subscribed!' is visible", async () => {
		const successMessage = page.getByText("You have been successfully subscribed!");
		await expect(successMessage).toBeVisible();
	});
});
