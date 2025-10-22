import { test, expect } from "@playwright/test";

test("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Scroll down page to bottom", async () => {
		const footer = page.locator('[id="footer"]');
		await footer.scrollIntoViewIfNeeded();
	});

	await test.step("Verify 'SUBSCRIPTION' is visible", async () => {
		const subscriptionText = page.getByRole("heading", { name: "Subscription" });
		await expect(subscriptionText).toBeVisible();
	});

	await test.step("Click on arrow at bottom right side to move upward", async () => {
		const scrollUpButton = page.locator('[id="scrollUp"]');
		await scrollUpButton.click();
	});

	await test.step("Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen", async () => {
		const fullFledgeText = page.getByRole("heading", {
			name: "Full-Fledged practice website for Automation Engineers",
		});
		await expect(fullFledgeText).toBeVisible();
	});
});

test("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Scroll down page to bottom", async () => {
		const footer = page.locator('[id="footer"]');
		await footer.scrollIntoViewIfNeeded();
	});

	await test.step("Verify 'SUBSCRIPTION' is visible", async () => {
		const subscriptionText = page.getByRole("heading", { name: "Subscription" });
		await expect(subscriptionText).toBeVisible();
	});

	await test.step("Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen", async () => {
		const fullFledgeText = page.getByRole("heading", {
			name: "Full-Fledged practice website for Automation Engineers",
		});
		await fullFledgeText.scrollIntoViewIfNeeded();
		await expect(fullFledgeText).toBeVisible();
	});
});
