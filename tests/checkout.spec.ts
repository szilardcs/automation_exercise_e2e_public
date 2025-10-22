import { test, expect, Locator } from "@playwright/test";
import * as homeHeader from "../pages/homeheader.page";
import * as productPage from "../pages/products.page";
import * as signUp from "../pages/signup.page";
import * as login from "../pages/login.page";
import * as testData from "../pages/test-data";
import * as checkout from "../pages/checkout.page";

test("Place Order: Register while Checkout", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	let productNameFromList: string | null;
	let productPriceFromList: string | null;

	await test.step("Add products to cart", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').first();
		productNameFromList = await productWrapper.locator(".productinfo p").textContent();
		productPriceFromList = await productWrapper.getByRole("heading").first().textContent();
		await addToCartButton.click();
	});

	await test.step("Click 'Cart' button", async () => {
		const viewCartButton = page.getByText("View Cart");
		await viewCartButton.click();
	});

	await test.step("Verify that cart page is displayed", async () => {
		await expect(page).toHaveURL(/view_cart/);
	});

	await test.step("Click Proceed To Checkout", async () => {
		const checkoutButton = page.getByText("Proceed to checkout");
		await checkoutButton.click();
	});

	await test.step("Click 'Register / Login' button", async () => {
		const registerWrapper = page.locator(".modal-body");
		const registerLoginButton = registerWrapper.getByText("Register / Login").nth(1);
		await registerLoginButton.click();
	});

	await test.step("Fill all details in Signup and create account", async () => {
		const createAccountButton = page.getByRole("button", { name: "Create Account" });

		await login.fillSignupFields(page);
		await signUp.fillAccountInfo(page);
		await signUp.fillAddressInfo(page);
		await createAccountButton.click();
	});

	await test.step("Verify 'ACCOUNT CREATED!' and click 'Continue' button", async () => {
		const accountCreateHeading = page.getByText("Account Created!");
		const continueButton = page.getByRole("link", { name: "Continue" });
		await expect(accountCreateHeading).toBeVisible();
		await continueButton.click();
	});

	await test.step("Verify ' Logged in as username' at top", async () => {
		const loggedInText = page.locator("li:has-text('Logged in as')");
		await expect(loggedInText).toContainText(testData.registerValues.userName);
	});

	await test.step("Click 'Cart' button", async () => {
		const cartButton = page.getByRole("link", { name: " Cart" });
		await cartButton.click();
	});

	await test.step("Click 'Proceed To Checkout' button", async () => {
		const checkoutButton = page.getByText("Proceed to checkout");
		await checkoutButton.click();
	});

	await test.step("Verify Address Details and Review Your Order", async () => {
		const orderWrapper = page.locator('[id="cart_info"]');
		const productNameInCart = await orderWrapper.locator(".cart_description h4").textContent();
		const productPriceInCart = await orderWrapper
			.getByRole("row", { name: "Total Amount Rs." })
			.getByRole("paragraph")
			.textContent();

		await checkout.assertDeliverAddress(page);
		await checkout.assertBillingAddress(page);

		// assert product name and price
		await productPage.pricesCompare(page, productPriceFromList, productPriceInCart);
		await productPage.namesCompare(page, productNameFromList, productNameInCart);
	});

	await test.step("Enter description in comment text area and click 'Place Order'", async () => {
		const placeOrderButton = page.getByText("Place Order");
		const commentField = page.locator('[name="message"]');

		await commentField.fill("Test comment");
		await placeOrderButton.click();
	});

	await test.step("Enter payment details: Name on Card, Card Number, CVC, Expiration date", async () => {
		await checkout.enterPaymentDetails(page);
	});

	await test.step("Click 'Pay and Confirm Order' button", async () => {
		const payAndConfirmButton = page.getByRole("button", { name: "Pay and Confirm Order" });
		await payAndConfirmButton.click();
	});

	await test.step("Verify success message 'Your order has been placed successfully!'", async () => {
		await expect(page).toHaveURL(/payment_done/);
	});

	await test.step("Click 'Delete Account' button", async () => {
		const deleteAccountButton = page.getByRole("link", { name: " Delete Account" });
		await deleteAccountButton.click();
	});

	await test.step("Verify 'ACCOUNT DELETED!' and click 'Continue' button", async () => {
		const accountDeletionText = page.getByText("Account Deleted!");
		await expect(accountDeletionText).toBeVisible();
	});
});

test("Place Order: Register before Checkout", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Verify page is visible and Click on Signnup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Enter name and address, click signup button", async () => {
		await login.fillSignupFields(page);
	});

	await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
		await expect(page.getByText("Enter Account Information")).toBeVisible();
	});

	await test.step("Fill accound details and address info", async () => {
		const createAccountButton = page.getByRole("button", { name: "Create Account" });

		// await login.fillSignupFields(page);
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

	let productNameFromList: string | null;
	let productPriceFromList: string | null;

	await test.step("Add products to cart", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').first();
		productNameFromList = await productWrapper.locator(".productinfo p").textContent();
		productPriceFromList = await productWrapper.getByRole("heading").first().textContent();
		await addToCartButton.click();
	});

	await test.step("Click 'Cart' button", async () => {
		const cartButton = page.getByRole("link", { name: " Cart" });
		await cartButton.click();
	});

	await test.step("Verify that cart page is displayed", async () => {
		await expect(page).toHaveURL(/view_cart/);
	});

	await test.step("Click Proceed To Checkout", async () => {
		const checkoutButton = page.getByText("Proceed to checkout");
		await checkoutButton.click();
	});

	await test.step("Verify Address Details and Review Your Order", async () => {
		const orderWrapper = page.locator('[id="cart_info"]');
		const productNameInCart = await orderWrapper.locator(".cart_description h4").textContent();
		const productPriceInCart = await orderWrapper
			.getByRole("row", { name: "Total Amount Rs." })
			.getByRole("paragraph")
			.textContent();

		await checkout.assertDeliverAddress(page);
		await checkout.assertBillingAddress(page);

		// assert product name and price
		await productPage.pricesCompare(page, productPriceFromList, productPriceInCart);
		await productPage.namesCompare(page, productNameFromList, productNameInCart);
	});

	await test.step("Enter description in comment text area and click 'Place Order'", async () => {
		const placeOrderButton = page.getByText("Place Order");
		const commentField = page.locator('[name="message"]');

		await commentField.fill("Test comment");
		await placeOrderButton.click();
	});

	await test.step("Enter payment details: Name on Card, Card Number, CVC, Expiration date", async () => {
		await checkout.enterPaymentDetails(page);
	});

	await test.step("Click 'Pay and Confirm Order' button", async () => {
		const payAndConfirmButton = page.getByRole("button", { name: "Pay and Confirm Order" });
		await payAndConfirmButton.click();
	});

	await test.step("Verify success message 'Your order has been placed successfully!'", async () => {
		await expect(page).toHaveURL(/payment_done/);
	});

	await test.step("Click 'Delete Account' button", async () => {
		const deleteAccountButton = page.getByRole("link", { name: " Delete Account" });
		await deleteAccountButton.click();
	});

	await test.step("Verify 'ACCOUNT DELETED!' and click 'Continue' button", async () => {
		const accountDeletionText = page.getByText("Account Deleted!");
		await expect(accountDeletionText).toBeVisible();
	});
});

test("Place Order: Login before Checkout", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click 'Signup / Login' button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Fill email, password and click 'Login' button", async () => {
		await login.fillLoginFields(page);
		await login.clickLoginButton(page);
	});

	await test.step("Verify 'Logged in as username' at top", async () => {
		const loggedInText = page.locator("li:has-text('Logged in as')");
		await expect(loggedInText).toContainText(testData.loginValues.userName);
	});

	let productNameFromList: string | null;
	let productPriceFromList: string | null;

	await test.step("Add products to cart", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').first();
		productNameFromList = await productWrapper.locator(".productinfo p").textContent();
		productPriceFromList = await productWrapper.getByRole("heading").first().textContent();
		await addToCartButton.click();
	});

	await test.step("Click 'Cart' button", async () => {
		await homeHeader.clickCartButton(page);
	});

	await test.step("Verify that cart page is displayed", async () => {
		await expect(page).toHaveURL(/view_cart/);
	});

	await test.step("Click Proceed To Checkout", async () => {
		const checkoutButton = page.getByText("Proceed to checkout");
		await checkoutButton.click();
	});

	await test.step("Verify Address Details and Review Your Order", async () => {
		const orderWrapper = page.locator('[id="cart_info"]');
		const productNameInCart = await orderWrapper.locator(".cart_description h4").textContent();
		const productPriceInCart = await orderWrapper.locator(".cart_price").getByRole("paragraph").textContent();

		await checkout.assertDeliverAddressForLoggedInUser(page);
		await checkout.assertBillingAddressForLoggedInUser(page);

		// assert product name and price
		await productPage.pricesCompare(page, productPriceFromList, productPriceInCart);
		await productPage.namesCompare(page, productNameFromList, productNameInCart);
	});

	await test.step("Enter description in comment text area and click 'Place Order'", async () => {
		const placeOrderButton = page.getByText("Place Order");
		const commentField = page.locator('[name="message"]');

		await commentField.fill("Test comment");
		await placeOrderButton.click();
	});

	await test.step("Enter payment details: Name on Card, Card Number, CVC, Expiration date", async () => {
		await checkout.enterPaymentDetails(page);
	});

	await test.step("Click 'Pay and Confirm Order' button", async () => {
		const payAndConfirmButton = page.getByRole("button", { name: "Pay and Confirm Order" });
		await payAndConfirmButton.click();
	});

	await test.step("Verify success message 'Your order has been placed successfully!'", async () => {
		await expect(page).toHaveURL(/payment_done/);
	});

	await test.step("Click 'Delete Account' button", async () => {
		// skip
	});

	await test.step("Verify 'ACCOUNT DELETED!' and click 'Continue' button", async () => {
		// skip
	});
});

test("Download Invoice after purchase order", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Verify page is visible and Click on Signnup / Login button", async () => {
		await homeHeader.verifyHomePageAndClickSignupLoginButton(page);
	});

	await test.step("Enter name and address, click signup button", async () => {
		await login.fillSignupFields(page);
	});

	await test.step("Verify that 'ENTER ACCOUNT INFORMATION' is visible", async () => {
		await expect(page.getByText("Enter Account Information")).toBeVisible();
	});

	await test.step("Fill accound details and address info", async () => {
		const createAccountButton = page.getByRole("button", { name: "Create Account" });

		// await login.fillSignupFields(page);
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

	let productNameFromList: string | null;
	let productPriceFromList: string | null;

	await test.step("Add products to cart", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').first();
		productNameFromList = await productWrapper.locator(".productinfo p").textContent();
		productPriceFromList = await productWrapper.getByRole("heading").first().textContent();
		await addToCartButton.click();
	});

	await test.step("Click 'Cart' button", async () => {
		const cartButton = page.getByRole("link", { name: " Cart" });
		await cartButton.click();
	});

	await test.step("Verify that cart page is displayed", async () => {
		await expect(page).toHaveURL(/view_cart/);
	});

	await test.step("Click Proceed To Checkout", async () => {
		const checkoutButton = page.getByText("Proceed to checkout");
		await checkoutButton.click();
	});

	await test.step("Verify Address Details and Review Your Order", async () => {
		const orderWrapper = page.locator('[id="cart_info"]');
		const productNameInCart = await orderWrapper.locator(".cart_description h4").textContent();
		const productPriceInCart = await orderWrapper
			.getByRole("row", { name: "Total Amount Rs." })
			.getByRole("paragraph")
			.textContent();

		await checkout.assertDeliverAddress(page);
		await checkout.assertBillingAddress(page);

		// assert product name and price
		await productPage.pricesCompare(page, productPriceFromList, productPriceInCart);
		await productPage.namesCompare(page, productNameFromList, productNameInCart);
	});

	await test.step("Enter description in comment text area and click 'Place Order'", async () => {
		const placeOrderButton = page.getByText("Place Order");
		const commentField = page.locator('[name="message"]');

		await commentField.fill("Test comment");
		await placeOrderButton.click();
	});

	await test.step("Enter payment details: Name on Card, Card Number, CVC, Expiration date", async () => {
		await checkout.enterPaymentDetails(page);
	});

	await test.step("Click 'Pay and Confirm Order' button", async () => {
		const payAndConfirmButton = page.getByRole("button", { name: "Pay and Confirm Order" });
		await payAndConfirmButton.click();
	});

	await test.step("Verify success message 'Your order has been placed successfully!'", async () => {
		await expect(page).toHaveURL(/payment_done/);
	});

	await test.step("Click 'Download Invoice' button and verify invoice is downloaded successfully.", async () => {
		const downloadInvoiceButton = page.getByRole("link", { name: "Download Invoice" });

		// download even listener
		const downloadPromise = page.waitForEvent("download");
		await downloadInvoiceButton.click();
		const download = await downloadPromise;

		expect(download.suggestedFilename()).toMatch(/\.(pdf|txt|doc|xls)$/i);
	});

	await test.step("Click 'Delete Account' button", async () => {
		const deleteAccountButton = page.getByRole("link", { name: " Delete Account" });
		await deleteAccountButton.click();
	});

	await test.step("Verify 'ACCOUNT DELETED!' and click 'Continue' button", async () => {
		const accountDeletionText = page.getByText("Account Deleted!");
		await expect(accountDeletionText).toBeVisible();
	});
});
