import { Page } from 'playwright';

export class ShoppingPage {

    constructor(private page: Page) { }

    async navigateToShoppingPage() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }

    private cartCounterSelector = '.cart-qty'; // Selector for the cart quantity element

    private booksCategorySelector = 'a[href="/books"]';
    private computersCategorySelector = 'a[href="/computers"]';
    private notebooksSubCategorySelector = 'a[href="/notebooks"]';

    private addToCartButtonBook1 = '//input[@class="button-2 product-box-add-to-cart-button" and @value="Add to cart" and contains(@onclick, "/catalog/13")]';
    private addToCartButtonBook2 = '//input[@class="button-2 product-box-add-to-cart-button" and @value="Add to cart" and contains(@onclick, "/catalog/22")]';
    private addToCartButtonNotebook = '//input[@class="button-2 product-box-add-to-cart-button" and @value="Add to cart" and contains(@onclick, "/catalog/31")]';
    private searchBox = `//*[@id='small-searchterms']`;
    private buttonAddToCart = `//input[@value='Add to cart' and contains(@class, 'product-box-add-to-cart-button')]`;


    // Function to get the current cart count
    async getCartCount(): Promise<number> {
        await this.page.waitForSelector(this.cartCounterSelector); // Wait for the cart counter to appear
        const cartCountText = await this.page.textContent(this.cartCounterSelector);
        const cartCount = parseInt(cartCountText?.replace(/[()]/g, '') || '0', 10); // Convert "(3)" to 3
        return cartCount;
    }

    // Function to validate cart count after adding items
    async validateCartCount(expectedCount: number) {
        const currentCount = await this.getCartCount();
        if (currentCount !== expectedCount) {
            throw new Error(`Cart count validation failed! Expected: ${expectedCount}, but got: ${currentCount}`);
        }
        console.log(`Cart count is as expected: ${expectedCount}`);
    }

    // Function to add books to the cart
    async addBooksToCart() {
        console.log('Navigating to Books category...');
        await this.page.click(this.booksCategorySelector);
        await this.page.waitForTimeout(2000); // Waiting to ensure page is loaded

        console.log('Adding first book to cart...');
        await this.page.click(this.addToCartButtonBook1);
        await this.page.waitForTimeout(1000);

        console.log('Adding second book to cart...');
        await this.page.click(this.addToCartButtonBook2);
        await this.page.waitForTimeout(1000);
    }

    // Function to add notebooks to the cart
    async addNotebooksToCart() {
        console.log('Navigating to Computers category...');
        await this.page.click(this.computersCategorySelector);
        await this.page.waitForTimeout(2000);

        console.log('Navigating to Notebooks sub-category...');
        await this.page.click(this.notebooksSubCategorySelector);
        await this.page.waitForTimeout(2000);

        console.log('Adding a notebook to the cart...');
        await this.page.click(this.addToCartButtonNotebook);
        await this.page.waitForTimeout(1000);
    }

    async searchItemAndAddToCart(itemName: string) {
        console.log(`Searching ${itemName}`);

        // Click on the search box and type the item name
        await this.page.click(this.searchBox);
        await this.page.fill(this.searchBox, itemName);

        // Simulate pressing the 'Enter' key to trigger the search
        await this.page.press(this.searchBox, 'Enter');

        // Wait for either the "Add to Cart" button or the "No products found" message
        const noProductFoundSelector = 'strong.result';
        const addToCartButtonSelector = this.buttonAddToCart;

        const isNoProductFound = await this.page.locator(noProductFoundSelector).isVisible({ timeout: 5000 }).catch(() => false);

        if (isNoProductFound) {
            // Validate the "No products found" message
            const message = await this.page.textContent(noProductFoundSelector);
            if (message?.trim() !== 'No products were found that matched your criteria.') {
                throw new Error(`Validation failed! Expected: "No products were found that matched your criteria.", but got: "${message?.trim()}"`);
            }
            console.log('No products were found that matched your criteria.');
        } else {
            // If no "No products found" message, attempt to click "Add to Cart"
            await this.page.waitForSelector(addToCartButtonSelector, { timeout: 5000 });
            await this.page.click(addToCartButtonSelector);

            // Wait for a short duration to ensure the item is added to the cart
            await this.page.waitForTimeout(1000);
        }
    }

    async searchWithEmpty() {
        await this.page.click(this.searchBox);
        // Simulate pressing the 'Enter' key to trigger the search
        await this.page.press(this.searchBox, 'Enter');
        this.page.on('dialog', async (dialog) => {
            // Validate the alert message
            const message = dialog.message();
            if (message === 'Please enter some search keyword') {
                console.log('Correct alert message received.');
            } else {
                throw new Error(`Unexpected alert message: "${message}"`);
            }

            // Accept the dialog (click "OK")
            await dialog.accept();
        });
    }

    async validateSearchResult(searchTerm: string) {
        console.log(`Searching for: ${searchTerm}`);

        // Click on the search box and type the search term
        await this.page.click(this.searchBox);
        await this.page.fill(this.searchBox, searchTerm);

        // Simulate pressing the 'Enter' key to trigger the search
        await this.page.press(this.searchBox, 'Enter');

        // Selector for the product item
        const productSelector = '//h2[@class="product-title"]/a[contains(text(), "Laptop")]';

        // Wait for the product element to appear
        const isProductVisible = await this.page.locator(productSelector).isVisible({ timeout: 5000 });

        // Validate that the product is present
        if (isProductVisible) {
            console.log(`Product found for search term: "${searchTerm}"`);
        } else {
            throw new Error(`Product not found for search term: "${searchTerm}"`);
        }
    }

}
