import { test, expect } from "@playwright/test";
import * as homeHeader from "../pages/homeheader.page";

test("Verify Test Cases Page", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify home page is visible and Click on Signnup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Click on 'Test Cases' button", async () => {
		const testCaseButton = page.getByRole("link", { name: " Test Cases" });
		await testCaseButton.click();
	});

	await test.step("Verify user is navigated to test cases page successfully", async () => {
		await expect(page).toHaveURL(/test_cases/);
	});
});
