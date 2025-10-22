import { test, expect } from "@playwright/test";
import * as homeHeader from "../pages/homeheader.page";
import * as contactUs from "../pages/contact-us.page";

test("Contact Us Form", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify home page is visible and Click on Signnup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Click on 'Contact Us' button", async () => {
		const contactUsButton = page.getByRole("link", { name: " Contact us" });
		await contactUsButton.click();
	});

	await test.step("Verify 'GET IN TOUCH' is visible", async () => {
		const getInTouchText = page.getByRole("heading", { name: "Get In Touch" });
		await expect(getInTouchText).toBeVisible();
	});

	await test.step("Enter name, email, subject and message", async () => {
		await contactUs.fillContactUsForm(page);
	});

	await test.step("Upload file", async () => {
		const fileInput = page.locator('input[type="file"]');
		await fileInput.setInputFiles("./test-image.png");
	});

	await test.step("Click 'Submit' button", async () => {
		await page.waitForTimeout(500);
		page.once("dialog", (dialog) => {
			dialog.accept();
		});
		const submitButton = page.getByRole("button", { name: "Submit" });

		await submitButton.click();
		await page.waitForTimeout(1000);
	});

	// await test.step("Click OK button", async () => {
	// 	// dialog box, event listener added above
	// });

	await test.step("Verify success message 'Success! Your details have been submitted successfully.' is visible", async () => {
		const successText = page.locator(".status.alert-success");
		await expect(successText).toBeVisible();
	});

	await test.step("Click 'Home' button and verify that landed to home page successfully", async () => {
		const homeButton = page.getByRole("link", { name: " Home" }).first();
		await homeButton.click();
		await expect(page).toHaveURL("/");
	});
});
