import { Page, test, expect } from "@playwright/test";

export async function verifyHomePageAndClickSignupLoginButton(page: Page) {
	await expect(page).toHaveURL("/");
	const signupButton = page.getByRole("link", { name: " Signup / Login" });
	await signupButton.click();
}

export async function clickCartButton(page: Page) {
	const cartButton = page.getByRole("link", { name: " Cart" });
	await cartButton.click();
}
