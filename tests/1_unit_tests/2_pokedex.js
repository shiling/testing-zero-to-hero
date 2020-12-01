const Pokemon = require("../../models/Pokemon")
const Pokedex = require("../../db/Pokedex")
const expect = require("chai").expect

describe("Pokedex", function() {

    // connect to the database
    let pokedex = new Pokedex()
    pokedex.connect("./storage/test.sqlite3")

    describe("#save()", function() {
	   
		// # Exercise 1.5 - test the the save() method to add a pokemon to the pokedex and make sure that the pokemon's ID is set afterwards

	})

	// # Exercise 1.6 - test the save_callback() method

	// # Excecise 1.7 - use hooks to setup and teardown the test database
	
})