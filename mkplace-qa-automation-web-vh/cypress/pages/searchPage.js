class SearchPage {
    elements = {
        searchButton: () => cy.getByTestId("search-header-button"),
        searchInput: () => cy.getByTestId("search-input-field"),
        searchOpenFilterButton: () => cy.getByTestId('search-open-filters-button'),
        searchFilterLargeButton: () => cy.getByTestId('search-filter-Acetato-checkbox'),
        searchFilterResultsButton: () => cy.getByTestId('search-filter-results-button'),
        
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
        this.elements.searchFilterLargeButton().click()
        cy.wait(1000)
        this.elements.searchFilterResultsButton().click()
        cy.wait(3000)
    }
}

export const searchPage = new SearchPage();