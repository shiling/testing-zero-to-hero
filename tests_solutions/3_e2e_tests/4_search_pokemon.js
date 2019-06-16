// Exercise 3.2
describe("End-to-end acceptance tests", function() {
	
	it("Search for Pikachu", function() {
		browser.url("http://localhost:3000")
		let title = browser.getTitle()
		
		// enter search input
		let nameField = $("#pokemon-search-form-name-input")
		nameField.setValue("Pikachu")
		
		// click search button
		let searchButton = $("#pokemon-search-form-submit-btn")
		searchButton.click()
		
		// wwait for the pikachu card title to exist
		let pokemonCardTitle = $(".pokemon-card:first-child .pokemon-card-title")
		pokemonCardTitle.waitForExist(500)

		// assert if pokemon card has the word pikachu
		let pokemonName = pokemonCardTitle.getText()
		expect(pokemonName).to.equal("Pikachu")

	})

	// it("List pokemons", function() {})

	// it("Search pokemons", function() {})

	// it("Pokemon card", function() {})
})
