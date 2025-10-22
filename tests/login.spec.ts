import { test, expect } from "@playwright/test";
import * as login from "../pages/login.page";
import * as testData from "../pages/test-data";
import * as homeHeader from "../pages/homeheader.page";

test("Login User with correct email and password", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify home page is visible and Click on Signup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Verify 'Login to your account' is visible", async () => {
		const loginText = page.getByRole("heading", { name: "Login to your account" });
		await expect(loginText).toBeVisible();
	});

	await test.step("Enter correct email address and password", async () => {
		await login.fillLoginFields(page);
	});

	await test.step("Click 'login' button", async () => {
		await login.clickLoginButton(page);
	});

	await test.step("Verify that 'Logged in as username' is visible", async () => {
		const loggedInText = page.locator("li:has-text('Logged in as')");
		await expect(loggedInText).toContainText(testData.loginValues.userName);
	});
});

test("Login User with incorrect email and password", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify home page is visible and Click on Signup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Verify 'Login to your account' is visible", async () => {
		const loginText = page.getByRole("heading", { name: "Login to your account" });
		await expect(loginText).toBeVisible();
	});

	await test.step("Enter incorrect email address and password", async () => {
		await page.getByRole("textbox", { name: "Email Address" }).first().fill("incorrectuser@email");
		await page.getByRole("textbox", { name: "Password" }).fill("incorrectuserpassword");
	});

	await test.step("Click 'login' button", async () => {
		await login.clickLoginButton(page);
	});

	await test.step("Verify error 'Your email or password is incorrect!' is visible", async () => {
		const errorMessage = page.getByText("Your email or password is incorrect!");
		await expect(errorMessage).toBeVisible();
	});
});

test("Logout User", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify home page is visible and Click on Signup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Verify 'Login to your account' is visible", async () => {
		const loginText = page.getByRole("heading", { name: "Login to your account" });
		await expect(loginText).toBeVisible();
	});

	await test.step("Enter correct email address and password", async () => {
		await login.fillLoginFields(page);
	});

	await test.step("Click 'login' button", async () => {
		await login.clickLoginButton(page);
	});

	await test.step("Verify that 'Logged in as username' is visible", async () => {
		const loggedInText = page.locator("li:has-text('Logged in as')");
		await expect(loggedInText).toContainText(testData.loginValues.userName);
	});

	await test.step("Click 'Logout' button", async () => {
		const logoutButton = page.getByRole("link", { name: " Logout" });
		await logoutButton.click();
	});

	await test.step("Verify that user is navigated to login page", async () => {
		await expect(page).toHaveURL(/login/);
	});
});

test("Register User with existing email", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify home page is visible and Click on Signup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Verify 'New User Signup!' is visible", async () => {
		const signUpHeading = page.getByRole("heading", { name: "New User Signup!" });
		await expect(signUpHeading).toBeVisible();
	});

	await test.step("Enter name and already registered email address", async () => {
		const signUpNameField = page.getByRole("textbox", { name: "Name" });
		const signUpEmailField = page.getByRole("textbox", { name: "Email Address" }).nth(1);
		await signUpNameField.fill(testData.loginValues.userName);
		await signUpEmailField.fill(testData.loginValues.loginEmail);
	});

	await test.step("Click 'Signup' button", async () => {
		const signupButton = page.getByRole("button", { name: "Signup" });
		await signupButton.click();
	});

	await test.step("Verify error 'Email Address already exist!' is visible", async () => {
		const errorMessage = page.getByText("Email Address already exist!");
		await expect(errorMessage).toBeVisible();
	});
});
