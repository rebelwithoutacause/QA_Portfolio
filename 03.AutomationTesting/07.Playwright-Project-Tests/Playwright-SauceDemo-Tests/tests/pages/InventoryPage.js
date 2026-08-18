export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  addToCartByTestId(productTestId) {
    return this.page.locator(`[data-test="add-to-cart-${productTestId}"]`).click();
  }

  // приема видимия label от dropdown-a, напр. 'Price (low to high)'
  sortBy(label) {
    return this.sortDropdown.selectOption({ label });
  }

  async getAllPrices() {
    const texts = await this.productPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  getFirstProductName() {
    return this.productNames.first().textContent();
  }

  getFirstProductPrice() {
    return this.productPrices.first().textContent();
  }
}
