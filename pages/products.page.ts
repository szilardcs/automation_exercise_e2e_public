import { Page, test, expect, Locator } from "@playwright/test";
import { exitCode } from "process";

interface ProductData {
	nameOnList: string | null;
	priceOnList: string | null;
	rawPriceOnList: number | null;
	nameInCart: string | null;
	priceInCart: string | null;
	rawPriceInCart: number | null;
}

export const firstProduct: ProductData = {
	nameOnList: null,
	priceOnList: null,
	rawPriceOnList: null,
	nameInCart: null,
	priceInCart: null,
	rawPriceInCart: null,
};

export const secondProduct: ProductData = {
	nameOnList: null,
	priceOnList: null,
	rawPriceOnList: null,
	nameInCart: null,
	priceInCart: null,
	rawPriceInCart: null,
};

export async function assertProductDetails(page: Page) {
	const productWrapper = page.locator(".product-information");
	const productName = productWrapper.locator("h2");
	const productPrice = productWrapper.locator("span span").first();
	const productCategory = productWrapper.getByText("Category:");
	const productAvailability = productWrapper.getByText("Availability:");
	const productCondition = productWrapper.getByText("Condition:");
	const productBrand = productWrapper.getByText("Brand:");

	await expect(productName).toBeVisible();
	await expect(productName).not.toBeEmpty();

	await expect(productCategory).toBeVisible();
	await expect(productCategory).not.toBeEmpty();

	await expect(productPrice).toBeVisible();
	await expect(productPrice).not.toBeEmpty();

	await expect(productAvailability).toBeVisible();
	await expect(productAvailability).not.toBeEmpty();

	await expect(productCondition).toBeVisible();
	await expect(productCondition).not.toBeEmpty();

	await expect(productBrand).toBeVisible();
	await expect(productBrand).not.toBeEmpty();

	const productPriceFromDetails = await productPrice.textContent();
	const productNameFromDetails = await productName.textContent();

	return {
		productPriceFromDetails,
		productNameFromDetails,
	};
}

// add one more class locator
export async function getFirstProductNameAndPrice(page: Page, productWrapper: Locator) {
	firstProduct.nameOnList = await productWrapper.locator("p").first().textContent();
	firstProduct.priceOnList = await productWrapper.locator("h2").first().textContent();
}

export async function getSecondProductNameAndPrice(page: Page, productWrapper: Locator) {
	secondProduct.nameOnList = await productWrapper.locator("p").first().textContent();
	secondProduct.priceOnList = await productWrapper.locator("h2").first().textContent();
}

export async function getProductNamesInCart(page: Page, firstProductWrapper: Locator, secondProductWrapper: Locator) {
	firstProduct.nameInCart = await firstProductWrapper.locator("p").first().textContent();
	secondProduct.nameInCart = await secondProductWrapper.locator("p").first().textContent();
}

export async function getProductPricesInCart(page: Page, firstProductWrapper: Locator, secondProductWrapper: Locator) {
	firstProduct.priceInCart = await firstProductWrapper.locator("p").nth(1).textContent();
	secondProduct.priceInCart = await secondProductWrapper.locator("p").nth(1).textContent();
}

export async function rawListPrices(page: Page) {
	firstProduct.rawPriceOnList = Number(firstProduct.priceOnList?.substring(4));
	secondProduct.rawPriceOnList = Number(secondProduct.priceOnList?.substring(4));
}

export async function rawCartPrices(page: Page) {
	firstProduct.rawPriceInCart = Number(firstProduct.priceInCart?.substring(4));
	secondProduct.rawPriceInCart = Number(secondProduct.priceInCart?.substring(4));
}

export async function compareListPriceToCartPrice(page: Page) {
	expect(firstProduct.rawPriceOnList).toBe(firstProduct.rawPriceInCart);
	expect(secondProduct.rawPriceOnList).toBe(secondProduct.rawPriceInCart);
}

export async function verifyProductTotal(page: Page, firstProductWrapper: Locator, secondProductWrapper: Locator) {
	const firstProductTotal = await firstProductWrapper.locator(".cart_total_price").textContent();
	const secondProductTotal = await secondProductWrapper.locator(".cart_total_price").textContent();
	const rawFirstProductToal = Number(firstProductTotal?.substring(4));
	const rawSecondProductToal = Number(secondProductTotal?.substring(4));

	expect(rawFirstProductToal).toBe(firstProduct.rawPriceInCart);
	expect(rawSecondProductToal).toBe(secondProduct.rawPriceInCart);
}

export async function verifyProductQuantity(page: Page, firstProductWrapper: Locator, secondProductWrapper: Locator) {
	const firstProductQuantity = firstProductWrapper.locator(".cart_quantity");
	const secondProductQuantity = secondProductWrapper.locator(".cart_quantity");

	await expect(firstProductQuantity).toContainText("1");
	await expect(secondProductQuantity).toContainText("1");
}

export async function pricesCompare(page: Page, firstPrice: string | null, secondPrice: string | null) {
	const rawFirstPrice = Number(firstPrice?.substring(4));
	const rawSecondPrice = Number(secondPrice?.substring(4));

	expect(rawSecondPrice).toBe(rawFirstPrice);
}

export async function namesCompare(page: Page, firstName: string | null, secondName: string | null) {
	expect(firstName).toBe(secondName);
}
