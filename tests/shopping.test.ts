import { test, expect } from '@playwright/test';
import { ShoppingPage } from '../pages/shoppingPage';
import { LoginPage } from '../pages/loginPage';

test.describe('Shopping Cart Tests', () => {
    let shoppingPage: ShoppingPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        shoppingPage = new ShoppingPage(page);

        // Navigate to login page and perform login
        await loginPage.navigateToLoginPage();
        await loginPage.fillLoginForm('john11.doe@example.com', 'password123');
        await loginPage.login();
    });

    // Positive Scenarios
    test.describe('Positive Shopping Scenarios', () => {
        test('Add books to cart and validate cart count', async () => {
            await shoppingPage.navigateToShoppingPage();

            // Get initial cart count
            const initialCartCount = await shoppingPage.getCartCount();
            console.log(`Initial cart count: ${initialCartCount}`);

            // Add books to cart
            await shoppingPage.addBooksToCart();

            // Validate cart count incremented by 2 (since 2 books were added)
            await shoppingPage.validateCartCount(initialCartCount + 2);
        });

        test('Add notebook to cart and validate cart count', async () => {
            await shoppingPage.navigateToShoppingPage();

            // Get initial cart count
            const initialCartCount = await shoppingPage.getCartCount();
            console.log(`Initial cart count: ${initialCartCount}`);

            // Add notebook to cart
            await shoppingPage.addNotebooksToCart();

            // Validate cart count incremented by 1
            await shoppingPage.validateCartCount(initialCartCount + 1);
        });

        test('Search and add jeans and music to the cart', async () => {
            await shoppingPage.navigateToShoppingPage();

            // Get initial cart count
            const initialCartCount = await shoppingPage.getCartCount();
            console.log(`Initial cart count: ${initialCartCount}`);

            // Search and add "Jeans" to the cart
            await shoppingPage.searchItemAndAddToCart('Jeans');
            await shoppingPage.validateCartCount(initialCartCount + 1);

            // Search and add "Music" to the cart
            await shoppingPage.searchItemAndAddToCart('Music');
            await shoppingPage.validateCartCount(initialCartCount + 2);
        });
    });

    // Negative Scenarios
    test.describe('Negative Shopping Scenarios', () => {
        test('Search for an invalid item in the shopping list', async () => {
            await shoppingPage.navigateToShoppingPage();

            // Attempt to search for a non-existent item
            await shoppingPage.searchItemAndAddToCart('apple');
            console.log('Verified: No products found message displayed.');
        });

        test('Search with empty in search bar in the shopping list', async () => {
            await shoppingPage.navigateToShoppingPage();

            // Search with empty keyword
            await shoppingPage.searchWithEmpty();
            console.log('Verified: Alert message displayed for empty search.');
        });

        test('Validate search results for laptop and LAPTOP', async () => {
            await shoppingPage.navigateToShoppingPage();

            // Validate case-insensitive search for "laptop" and "LAPTOP"
            await shoppingPage.validateSearchResult('laptop');
            await shoppingPage.validateSearchResult('LAPTOP');
        });
    });
});