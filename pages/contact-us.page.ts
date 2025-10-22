import { Page, expect } from "@playwright/test";
import * as testData from "../pages/test-data";

export async function fillContactUsForm(page: Page) {
	const nameField = page.getByRole("textbox", { name: "Name" });
	const emailFiled = page.getByRole("textbox", { name: "Email" }).first();
	const subject = page.getByRole("textbox", { name: "Subject" });
	const yourMessage = page.getByRole("textbox", { name: "Your Message Here" });

	await nameField.fill(testData.registerValues.userName);
	await emailFiled.fill(testData.loginValues.loginEmail);
	await subject.fill("Test subject");
	await yourMessage.fill("Test message");
}
