import { test, expect } from "@playwright/test";
import * as signUp from "../pages/signup.page";
import * as login from "../pages/login.page";
import * as testData from "../pages/test-data";
import * as homeHeader from "../pages/homeheader.page";

test("Register flow", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify page is visible and Click on Signnup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Verify 'New User Signup!' is visible", async () => {
		const signUpHeading = page.getByRole("heading", { name: "New User Signup!" });
		await expect(signUpHeading).toBeVisible();
	});

	await test.step("Enter name and address, click signup button", async () => {
		await login.fillSignupFields(page);
	});

	await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
		await expect(page.getByText("Enter Account Information")).toBeVisible();
	});

	await test.step("Fill accound details and address info", async () => {
		const createAccountButton = page.getByRole("button", { name: "Create Account" });
		await signUp.fillAccountInfo(page);
		await signUp.fillAddressInfo(page);
		await createAccountButton.click();
	});

	await test.step("Verify that 'ACCOUNT CREATED!' is visible and Click 'Continue' button", async () => {
		const accountCreateHeading = page.getByText("Account Created!");
		await expect(accountCreateHeading).toBeVisible();
		const continueButton = page.getByRole("link", { name: "Continue" });
		await continueButton.click();
	});

	await test.step("Verify that 'Logged in as username' is visible", async () => {
		const loggedInText = page.locator("li:has-text('Logged in as')");
		await expect(loggedInText).toContainText(testData.registerValues.userName);
	});

	await test.step("Click 'Delete Account' button", async () => {
		const deleteAccountButton = page.getByRole("link", { name: " Delete Account" });
		await deleteAccountButton.click();
	});

	await test.step("Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button", async () => {
		const accountDeletionText = page.getByText("Account Deleted!");
		await expect(accountDeletionText).toBeVisible();
	});
});
