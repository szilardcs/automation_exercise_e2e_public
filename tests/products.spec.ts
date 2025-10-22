import { test, expect } from "@playwright/test";
import * as productPage from "../pages/products.page";
import * as loginPage from "../pages/login.page";

test("Verify All Products and product detail page", async ({ page }) => {
	await page.goto("/");

	const productsList = page.locator(".features_items"); // reused twice
	let productNameFromList = "";
	let productPriceFromList = "";

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click on 'Products' button", async () => {
		const productsButton = page.getByRole("link", { name: " Products" });
		await productsButton.click();
	});

	await test.step("Verify user is navigated to ALL PRODUCTS page successfully", async () => {
		await expect(page).toHaveURL(/products/);
	});

	await test.step("Verify that the products list is visible", async () => {
		const productsHeader = page.getByRole("heading", { name: "All Products" });
		await expect(productsHeader).toBeVisible();
		await expect(productsList).toBeVisible();
	});

	await test.step("Click on 'View Product' of first product", async () => {
		const firstProduct = productsList.locator(".col-sm-4").first();
		const firstProductViewButton = firstProduct.getByRole("link", { name: "View Product" });
		productNameFromList = (await firstProduct.locator(".productinfo p").textContent()) || "";
		productPriceFromList = (await firstProduct.locator(".productinfo h2").textContent()) || "";
		await firstProductViewButton.click();
	});

	await test.step("Verify that details are visible: product name, category, price, availability, condition, brand", async () => {
		// calls assertions for name, category, price, availability, condition, brand and catches product price, name
		const { productPriceFromDetails, productNameFromDetails } = await productPage.assertProductDetails(page);

		// asserts product price is same on the product details page as on the products page
		const rawProductPriceFromList = Number(productPriceFromList?.substring(4));
		const rawProductPriceFromDetails = Number(productPriceFromDetails?.substring(4));
		expect(rawProductPriceFromDetails).toBe(rawProductPriceFromList);

		//asserts product name is same on the product details page as on the products page
		expect(productNameFromDetails).toBe(productNameFromList);
	});
});

test("Search Product", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click on 'Products' button", async () => {
		const productsButton = page.getByRole("link", { name: " Products" });
		await productsButton.click();
	});

	await test.step("Verify user is navigated to ALL PRODUCTS page successfully", async () => {
		await expect(page).toHaveURL(/products/);
	});

	const searchedProductName: string = "Blue Top";

	await test.step("Enter product name in search input and click search button", async () => {
		const searchField = page.locator('[id="search_product"]');
		const searchSubmitButton = page.locator('[id="submit_search"]');
		await searchField.fill(searchedProductName);
		await searchSubmitButton.click();
	});

	await test.step("Verify 'SEARCHED PRODUCTS' is visible", async () => {
		const searchedProductsText = page.getByRole("heading", { name: "Searched Products" });
		await expect(searchedProductsText).toBeVisible();
	});

	await test.step("Verify all the products related to search are visible", async () => {
		const firstProduct = page.locator(".col-sm-4");
		const productName = (await firstProduct.locator(".productinfo p").textContent()) || "";

		expect(productName).toBe(searchedProductName);
	});
});

test("Add Products to Cart", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click 'Products' button", async () => {
		const productButton = page.getByRole("link", { name: " Products" });
		await productButton.click();
	});

	await test.step("Hover over first product and click 'Add to cart'", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').nth(1);

		await productPage.getFirstProductNameAndPrice(page, productWrapper);
		await productWrapper.hover();
		await addToCartButton.click();
	});

	await test.step("Click 'Continue Shopping' button", async () => {
		const continueButton = page.getByRole("button", { name: "Continue Shopping" });
		await continueButton.click();
	});

	await test.step("Hover over second product and click 'Add to cart'", async () => {
		const productWrapper = page.locator(".product-image-wrapper").nth(1);
		const addToCartButton = productWrapper.locator('[data-product-id="2"]').nth(1);

		await productPage.getSecondProductNameAndPrice(page, productWrapper);
		await productWrapper.hover();
		await addToCartButton.click();
	});

	await test.step("Click 'View Cart' button", async () => {
		const viewCartButton = page.getByText("View Cart");
		await viewCartButton.click();
	});

	// locators for cart page
	const cartWrapper = page.locator('[id="cart_info"]');
	const firstProductWrapper = cartWrapper.locator('[id="product-1"]');
	const secondProductWrapper = cartWrapper.locator('[id="product-2"]');

	await test.step("Verify both products are added to Cart", async () => {
		await productPage.getProductNamesInCart(page, firstProductWrapper, secondProductWrapper);
		await productPage.getProductPricesInCart(page, firstProductWrapper, secondProductWrapper);

		await expect(firstProductWrapper).toBeVisible();
		await expect(secondProductWrapper).toBeVisible();
	});

	await test.step("Verify their prices, quantity and total price", async () => {
		await productPage.rawListPrices(page);
		await productPage.rawCartPrices(page);

		await productPage.compareListPriceToCartPrice(page);
		await productPage.verifyProductQuantity(page, firstProductWrapper, secondProductWrapper);
		await productPage.verifyProductTotal(page, firstProductWrapper, secondProductWrapper);
	});
});

test("Verify Product quantity in Cart", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click 'View Product' for any product on home page", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const viewProductButton = productWrapper.getByRole("link", { name: "View Product" });
		await viewProductButton.click();
	});

	await test.step("Verify product detail is opened", async () => {
		await expect(page).toHaveURL(/product_details/);
	});

	const quantity = "4";

	await test.step("Increase quantity to 4", async () => {
		const quantitySpinButton = page.locator('[id="quantity"]');
		await quantitySpinButton.clear();
		await quantitySpinButton.fill(quantity);
	});

	await test.step("Click 'Add to cart' button", async () => {
		const addToCartButton = page.getByRole("button", { name: " Add to cart" });
		await addToCartButton.click();
	});

	await test.step("Click 'View Cart' button", async () => {
		const viewCartButton = page.getByText("View Cart");
		await viewCartButton.click();
	});

	await test.step("Verify that product is displayed in cart page with exact quantity", async () => {
		const firstProductWrapper = page.locator('[id="product-1"]');
		const productQuantity = await firstProductWrapper.locator(".cart_quantity .disabled").textContent();
		expect(productQuantity).toBe(quantity);
	});
});

test("Remove Products From Cart", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Add products to cart", async () => {
		const productWrapper = page.locator(".product-image-wrapper").first();
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').nth(1);

		await productWrapper.hover();
		await addToCartButton.click();
	});

	await test.step("Click 'Cart' button", async () => {
		const viewCartButton = page.getByText("View Cart");
		await viewCartButton.click();
	});

	await test.step("Verify that cart page is displayed", async () => {
		await expect(page).toHaveURL(/view_cart/);
	});

	await test.step("Click 'X' button corresponding to particular product", async () => {
		const productWrapper = page.locator('[id="product-1"]');
		const deleteButton = productWrapper.locator(".cart_quantity_delete");
		await deleteButton.click();
	});

	await test.step("Verify that product is removed from the cart", async () => {
		const emptyCartMessage = page.getByText("Cart is empty!");
		await expect(emptyCartMessage).toBeVisible();
	});
});

test("View Category Products", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	const leftSideBar = page.locator(".left-sidebar");
	const categoryWrapper = leftSideBar.locator('[id="accordian"]');
	const womenCategoryButton = categoryWrapper.getByRole("link", { name: " Women " });

	await test.step("Verify that categories are visible on left side bar", async () => {
		await expect(womenCategoryButton).toBeVisible();
	});

	await test.step("Click on 'Women' category", async () => {
		await womenCategoryButton.click();
	});

	await test.step("Click on any category link under 'Women' category, for example: Dress", async () => {
		const womenSubCategoryWrapper = categoryWrapper.locator('[id="Women"]');
		const dressSubCat = womenSubCategoryWrapper.getByRole("link", { name: "Dress" });
		await dressSubCat.click();
	});

	await test.step("Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'", async () => {
		const categoryHeading = page.getByRole("heading", { name: "Women - Dress Products" });
		await expect(page).toHaveURL(/category_products/);
		await expect(page).toHaveURL(/1/);
		await expect(categoryHeading).toBeVisible();
	});

	await test.step("On left side bar, click on any sub-category link of 'Men' category", async () => {
		const tShirtSubCat = categoryWrapper.getByRole("link", { name: "Tshirts" });
		const menCategoryButton = categoryWrapper.getByRole("link", { name: " Men " }).nth(1);
		await menCategoryButton.click();
		await tShirtSubCat.click();
	});

	await test.step("Verify that user is navigated to that category page", async () => {
		const categoryHeading = page.getByRole("heading", { name: "Men - Tshirts Products" });
		await expect(page).toHaveURL(/category_products/);
		await expect(page).toHaveURL(/3/);
		await expect(categoryHeading).toBeVisible();
	});
});

test("View & Cart Brand Products", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click on 'Products' button", async () => {
		const productsButton = page.getByRole("link", { name: " Products" });
		await productsButton.click();
	});

	const brandsWrapper = page.locator(".brands_products");

	await test.step("Verify that Brands are visible on left side bar", async () => {
		const brandsHeading = brandsWrapper.getByRole("heading", { name: "Brands" });
		await expect(brandsHeading).toBeVisible();
	});

	await test.step("Click on any brand name", async () => {
		const poloButton = brandsWrapper.getByRole("link", { name: "(6) Polo" });
		await poloButton.click();
	});

	await test.step("Verify that user is navigated to brand page and brand products are displayed", async () => {
		await expect(page).toHaveURL(/brand_products/);
		await expect(page).toHaveURL(/Polo/);
	});

	await test.step("On left side bar, click on any other brand link", async () => {
		const hnmButton = brandsWrapper.getByRole("link", { name: "(5) H&M" });
		await hnmButton.click();
	});

	await test.step("Verify that user is navigated to that brand page and can see products", async () => {
		await expect(page).toHaveURL(/brand_products/);
		await expect(page).toHaveURL(/H&M/);
	});
});

test("Search Products and Verify Cart After Login", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click on 'Products' button", async () => {
		const productsButton = page.getByRole("link", { name: " Products" });
		await productsButton.click();
	});

	await test.step("Verify user is navigated to ALL PRODUCTS page successfully", async () => {
		await expect(page).toHaveURL(/products/);
	});

	await test.step("Enter product name in search input and click search button", async () => {
		const porductSearchField = page.getByRole("textbox", { name: "Search Product" });
		const searchButton = page.locator('[id="submit_search"]');
		await porductSearchField.fill("Blue Top");
		await searchButton.click();
	});

	await test.step("Verify 'SEARCHED PRODUCTS' is visible", async () => {
		const searchedProductHeading = page.getByRole("heading", { name: "Searched Products" });
		await expect(searchedProductHeading).toBeVisible();
	});

	const productWrapper = page.locator(".product-image-wrapper").first();

	await test.step("Verify all the products related to search are visible", async () => {
		await expect(productWrapper).toBeVisible();
	});

	await test.step("Add those products to cart", async () => {
		const addToCartButton = productWrapper.locator('[data-product-id="1"]').nth(1);

		await productWrapper.hover();
		await addToCartButton.click();
	});

	const cartWrapper = page.locator('[id="cart_info_table"]');
	const productNameField = cartWrapper.locator(".cart_description");

	await test.step("Click 'Cart' button and verify that products are visible in cart", async () => {
		const viewCartButton = page.getByText("View Cart");
		await viewCartButton.click();
		await expect(productNameField).toContainText("Blue Top");
	});

	await test.step("Click 'Signup / Login' button and submit login details", async () => {
		const loginSignupButton = page.getByRole("link", { name: " Signup / Login" });
		await loginSignupButton.click();

		await loginPage.fillLoginFields(page);
		await loginPage.clickLoginButton(page);
	});

	await test.step("Again, go to Cart page", async () => {
		const cartButton = page.getByRole("link", { name: " Cart" });
		await cartButton.click();
	});

	await test.step("Verify that those products are visible in cart after login as well", async () => {
		await expect(productNameField).toContainText("Blue Top");
	});
});

test("Add review on product", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Click on 'Products' button", async () => {
		const productsButton = page.getByRole("link", { name: " Products" });
		await productsButton.click();
	});

	await test.step("Verify user is navigated to ALL PRODUCTS page successfully", async () => {
		await expect(page).toHaveURL(/products/);
	});

	const productWrapper = page.locator(".product-image-wrapper").first();

	await test.step("Click on 'View Product' button", async () => {
		const viewProductButton = productWrapper.getByRole("link", { name: "View Product" });
		await viewProductButton.click();
	});

	await test.step("Verify 'Write Your Review' is visible", async () => {
		const writeYourReviewText = page.getByText("Write Your Review");
		await expect(writeYourReviewText).toBeVisible();
	});

	await test.step("Enter name, email and review", async () => {
		const reviewWrapper = page.locator('[id="reviews"]');
		const nameField = reviewWrapper.getByRole("textbox", { name: "Your Name" });
		const emailField = reviewWrapper.getByRole("textbox", { name: "Email Address" });
		const reviewField = reviewWrapper.getByRole("textbox", { name: "Add Review Here!" });

		await nameField.fill("Test name");
		await emailField.fill("test@test.com");
		await reviewField.fill("test review");
	});

	await test.step("Click 'Submit' button", async () => {
		const submitButton = page.getByRole("button", { name: "Submit" });
		await submitButton.click();
	});

	await test.step("Verify success message 'Thank you for your review.'", async () => {
		const reviewMessage = page.getByText("Thank you for your review.");
		await expect(reviewMessage).toBeVisible();
	});
});

test("Add to cart from Recommended items", async ({ page }) => {
	await page.goto("/");

	await test.step("Verify that home page is visible successfully", async () => {
		await expect(page).toHaveURL("/");
	});

	await test.step("Scroll to bottom of page", async () => {
		const footer = page.locator('[id="footer"]');
		await footer.scrollIntoViewIfNeeded();
	});

	await test.step("Verify 'RECOMMENDED ITEMS' are visible", async () => {
		const recommendedItemsText = page.getByRole("heading", { name: "recommended items" });
		await expect(recommendedItemsText).toBeVisible();
	});

	await test.step("Click on 'Add To Cart' on Recommended product", async () => {
		const recommenedWrapper = page.locator('[id="recommended-item-carousel"]');
		const firstProductWrapper = recommenedWrapper.locator(".col-sm-4").first();
		const addToCartButton = firstProductWrapper.locator('[data-product-id="1"]');
		await addToCartButton.scrollIntoViewIfNeeded();
		await addToCartButton.click();
	});

	await test.step("Click on 'View Cart' button", async () => {
		const viewCartButton = page.getByText("View Cart");
		await viewCartButton.click();
	});

	await test.step("Verify that product is displayed in cart page", async () => {
		const cartWrapper = page.locator('[id="cart_info_table"]');
		const productNameField = cartWrapper.locator(".cart_description");
		await expect(productNameField).toContainText("Blue Top");
	});
});
