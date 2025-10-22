import { Page, test, expect } from "@playwright/test";
import * as testData from "./test-data";

export async function fillLoginFields(page: Page) {
	const loginEmailField = page.getByRole("textbox", { name: "Email Address" }).first();
	const loginPasswordField = page.getByRole("textbox", { name: "Password" });
	await loginEmailField.fill(testData.loginValues.loginEmail);
	await loginPasswordField.fill(testData.loginValues.password);
}

export async function fillSignupFields(page: Page) {
	const signUpNameField = page.getByRole("textbox", { name: "Name" });
	const signUpEmailField = page.getByRole("textbox", { name: "Email Address" }).nth(1);
	await signUpNameField.fill(testData.registerValues.userName);
	await signUpEmailField.fill(testData.registerValues.userEmail);
	await page.getByRole("button", { name: "Signup" }).click();
}

export async function clickLoginButton(page: Page) {
	const loginButton = page.getByRole("button", { name: "Login" });
	await loginButton.click();
}
