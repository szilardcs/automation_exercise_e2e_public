import { Page, test, expect } from "@playwright/test";
import * as testData from "./test-data";

export async function assertDeliverAddress(page: Page) {
	const addressWrapper = page.locator('[id="address_delivery"]');
	const firstNameLastName = addressWrapper.locator(".address_firstname, .address_lastname"); //firstName lastName
	const company = addressWrapper.locator(".address_address1, .address_address2").first(); // company
	const address = addressWrapper.locator(".address_address1, .address_address2").nth(1); // address
	const city = addressWrapper.locator(".address_city"); // city
	const state = addressWrapper.locator(".address_state_name"); // state
	const zipcode = addressWrapper.locator(".address_postcode"); // zip
	const country = addressWrapper.locator(".address_country_name"); // country
	const phoneNumber = addressWrapper.locator(".address_phone"); // phone number

	await expect(firstNameLastName).toContainText(testData.registerValues.addressInformation.firstName);
	await expect(firstNameLastName).toContainText(testData.registerValues.addressInformation.lastName);
	await expect(company).toContainText(testData.registerValues.addressInformation.company);
	await expect(address).toContainText(testData.registerValues.addressInformation.address);
	await expect(city).toContainText(testData.registerValues.addressInformation.city);
	await expect(state).toContainText(testData.registerValues.addressInformation.state);
	await expect(zipcode).toContainText(testData.registerValues.addressInformation.zipcode);
	await expect(country).toContainText(testData.registerValues.addressInformation.country);
	await expect(phoneNumber).toContainText(testData.registerValues.addressInformation.mobileNumber);
}

export async function assertBillingAddress(page: Page) {
	const billingWrapper = page.locator('[id="address_invoice"]');
	const firstNameLastName = billingWrapper.locator(".address_firstname, .address_lastname"); //firstName lastName
	const company = billingWrapper.locator(".address_address1, .address_address2").first(); // company
	const address = billingWrapper.locator(".address_address1, .address_address2").nth(1); // address
	const city = billingWrapper.locator(".address_city"); // city
	const state = billingWrapper.locator(".address_state_name"); // state
	const zipcode = billingWrapper.locator(".address_postcode"); // zip
	const country = billingWrapper.locator(".address_country_name"); // country
	const phoneNumber = billingWrapper.locator(".address_phone"); // phone number

	await expect(firstNameLastName).toContainText(testData.registerValues.addressInformation.firstName);
	await expect(firstNameLastName).toContainText(testData.registerValues.addressInformation.lastName);
	await expect(company).toContainText(testData.registerValues.addressInformation.company);
	await expect(address).toContainText(testData.registerValues.addressInformation.address);
	await expect(city).toContainText(testData.registerValues.addressInformation.city);
	await expect(state).toContainText(testData.registerValues.addressInformation.state);
	await expect(zipcode).toContainText(testData.registerValues.addressInformation.zipcode);
	await expect(country).toContainText(testData.registerValues.addressInformation.country);
	await expect(phoneNumber).toContainText(testData.registerValues.addressInformation.mobileNumber);
}

export async function enterPaymentDetails(page: Page) {
	const nameOnCardField = page.locator('[data-qa="name-on-card"]');
	const cardNumberField = page.locator('[data-qa="card-number"]');
	const cvcField = page.getByRole("textbox", { name: "ex. 311" });
	const monthExpirationField = page.getByRole("textbox", { name: "MM" });
	const yearExpirationField = page.getByRole("textbox", { name: "YYYY" });

	await nameOnCardField.fill(testData.cardData.nameOnCard);
	await cardNumberField.fill(testData.cardData.cardNumber);
	await cvcField.fill(testData.cardData.cvc);
	await monthExpirationField.fill(testData.cardData.expMonth);
	await yearExpirationField.fill(testData.cardData.expYear);
}

export async function assertDeliverAddressForLoggedInUser(page: Page) {
	const addressWrapper = page.locator('[id="address_delivery"]');
	const firstNameLastName = addressWrapper.locator(".address_firstname, .address_lastname"); //firstName lastName
	const company = addressWrapper.locator(".address_address1, .address_address2").first(); // company
	const address = addressWrapper.locator(".address_address1, .address_address2").nth(1); // address
	const city = addressWrapper.locator(".address_city"); // city
	const state = addressWrapper.locator(".address_state_name"); // state
	const zipcode = addressWrapper.locator(".address_postcode"); // zip
	const country = addressWrapper.locator(".address_country_name"); // country
	const phoneNumber = addressWrapper.locator(".address_phone"); // phone number

	await expect(firstNameLastName).toContainText(testData.loggedInData.firstNamelastName);
	await expect(company).toContainText(testData.loggedInData.company);
	await expect(address).toContainText(testData.loggedInData.address);
	await expect(city).toContainText(testData.loggedInData.city);
	await expect(state).toContainText(testData.loggedInData.state);
	await expect(zipcode).toContainText(testData.loggedInData.zipcode);
	await expect(country).toContainText(testData.loggedInData.country);
	await expect(phoneNumber).toContainText(testData.loggedInData.mobileNumber);
}

export async function assertBillingAddressForLoggedInUser(page: Page) {
	const billingWrapper = page.locator('[id="address_invoice"]');
	const firstNameLastName = billingWrapper.locator(".address_firstname, .address_lastname"); //firstName lastName
	const company = billingWrapper.locator(".address_address1, .address_address2").first(); // company
	const address = billingWrapper.locator(".address_address1, .address_address2").nth(1); // address
	const city = billingWrapper.locator(".address_city"); // city
	const state = billingWrapper.locator(".address_state_name"); // state
	const zipcode = billingWrapper.locator(".address_postcode"); // zip
	const country = billingWrapper.locator(".address_country_name"); // country
	const phoneNumber = billingWrapper.locator(".address_phone"); // phone number

	await expect(firstNameLastName).toContainText(testData.loggedInData.firstNamelastName);
	await expect(company).toContainText(testData.loggedInData.company);
	await expect(address).toContainText(testData.loggedInData.address);
	await expect(city).toContainText(testData.loggedInData.city);
	await expect(state).toContainText(testData.loggedInData.state);
	await expect(zipcode).toContainText(testData.loggedInData.zipcode);
	await expect(country).toContainText(testData.loggedInData.country);
	await expect(phoneNumber).toContainText(testData.loggedInData.mobileNumber);
}
