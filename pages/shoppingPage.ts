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
    private buttonAddToCartJeans = `//input[@value='Add to cart' and contains(@class, 'product-box-add-to-cart-button')]`;

    private searchBox = `//*[@id='small-searchterms']`;

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

    async searchItemAndAddToCart() {
        console.log('Searching Jeans')
        await this.page.click(this.searchBox);
        // Fill the search term in the search box
        await this.page.fill(this.searchBox, 'Jeans');

        // Simulate pressing the 'Enter' key to trigger the search
        await this.page.press(this.searchBox, 'Enter');
        await this.page.click(this.buttonAddToCartJeans);
        await this.page.waitForTimeout(1000)
    }
}
