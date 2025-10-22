import { Page, test, expect } from "@playwright/test";
import * as testData from "./test-data";

export async function fillAccountInfo(page: Page) {
	await page.getByRole("radio", { name: "Mr." }).click();
	await page.getByRole("textbox", { name: "Password *" }).fill(testData.registerValues.password);
	await page.locator('[data-qa="days"]').selectOption(testData.registerValues.dob.day);
	await page.locator('[data-qa="months"]').selectOption(testData.registerValues.dob.month);
	await page.locator('[data-qa="years"]').selectOption(testData.registerValues.dob.year);
	await page.getByRole("checkbox", { name: "Sign up for our newsletter!" }).check();
	await page.getByRole("checkbox", { name: "Receive special offers from our partners!" }).check();
}

export async function fillAddressInfo(page: Page) {
	await page
		.getByRole("textbox", { name: "First name *" })
		.fill(testData.registerValues.addressInformation.firstName);
	await page.getByRole("textbox", { name: "Last name *" }).fill(testData.registerValues.addressInformation.lastName);
	await page
		.getByRole("textbox", { name: "Company" })
		.first()
		.fill(testData.registerValues.addressInformation.company);
	await page
		.getByRole("textbox", { name: "Address * (Street address, P.O. Box, Company name, etc.)" })
		.fill(testData.registerValues.addressInformation.address);
	await page
		.getByRole("combobox", { name: "Country *" })
		.selectOption(testData.registerValues.addressInformation.country);
	await page.getByRole("textbox", { name: "State *" }).fill(testData.registerValues.addressInformation.state);
	await page.getByRole("textbox", { name: "City *" }).fill(testData.registerValues.addressInformation.city);
	await page.locator('[data-qa="zipcode"]').fill(testData.registerValues.addressInformation.zipcode);
	await page
		.getByRole("textbox", { name: "Mobile Number *" })
		.fill(testData.registerValues.addressInformation.mobileNumber);
}
