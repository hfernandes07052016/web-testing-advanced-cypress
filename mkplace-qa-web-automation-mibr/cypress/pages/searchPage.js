class SearchPage {
    elements = {
        searchButton: () => cy.getByTestId("button-header-search"),
        searchInput: () => cy.getByTestId("search-input-field"),
        searchOpenFilterButton: () => cy.getByTestId('button-filter-menu'),
        searchFilterColorButton: () => cy.xpath('//a[@data-testid="filter-item-checkbox" and @title="Azul"]'),
        searchFilterResultsButton: () => cy.getByTestId('filter-results'),

    };

    makeSearch(produto) {
        this.elements.searchButton().click()
        this.elements.searchInput().type(produto)
    }

    searchFilter() {
        this.elements.searchButton().click()
        cy.wait(1000)
        this.elements.searchOpenFilterButton().click()
        cy.wait(1000)
        this.elements.searchFilterColorButton().click()
        cy.wait(1000)
        this.elements.searchFilterResultsButton().click()
        cy.wait(3000)
    }
}

export const searchPage = new SearchPage();