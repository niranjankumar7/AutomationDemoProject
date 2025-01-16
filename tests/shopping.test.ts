import { test, expect } from '@playwright/test';
import { ShoppingPage } from '../pages/shoppingPage';
import { LoginPage } from '../pages/loginPage';

test.describe('Shopping Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage(); // Navigate to the login page
        await loginPage.fillLoginForm('john11.doe@example.com', 'password123'); // Fill the login form
        await loginPage.login(); // Perform the login
    });

    test('Add books to cart and validate cart count', async ({ page }) => {
        const shoppingPage = new ShoppingPage(page);
        await shoppingPage.navigateToShoppingPage();
        // Initial cart count
        const initialCartCount = await shoppingPage.getCartCount();
        console.log(`Initial cart count: ${initialCartCount}`);

        // Add books to cart
        await shoppingPage.addBooksToCart();

        // Validate cart count incremented by 2 (since 2 books were added)
        await shoppingPage.validateCartCount(initialCartCount + 2);
    });

    test('Add notebook to cart and validate cart count', async ({ page }) => {
        const shoppingPage = new ShoppingPage(page);
        await shoppingPage.navigateToShoppingPage();
        // Initial cart count
        const initialCartCount = await shoppingPage.getCartCount();
        console.log(`Initial cart count: ${initialCartCount}`);

        // Add notebook to cart
        await shoppingPage.addNotebooksToCart();

        // Validate cart count incremented by 1 (since 1 notebook was added)
        await shoppingPage.validateCartCount(initialCartCount + 1);
    });

    test('Search and add the item to the cart', async ({ page }) => {
        const shoppingPage = new ShoppingPage(page);
        await shoppingPage.navigateToShoppingPage();
        // Initial cart count
        const initialCartCount = await shoppingPage.getCartCount();
        console.log(`Initial cart count: ${initialCartCount}`);
        // Search and add jeans to the cart
        await shoppingPage.searchItemAndAddToCart();
        // Validate cart count incremented by 1 (since 1 notebook was added)
        await shoppingPage.validateCartCount(initialCartCount + 1);
    })
});
