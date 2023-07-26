import Pokemon from "../../src/models/Pokemon.js";
import assert from "assert"
import {expect} from "chai";

describe("Pokemon", function() {
	// module
	describe("#setName()", function() {
		// module

		// Exercise 1.1
		it("(assert) set name when value is present", function() {
			// test
			var pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			// Reference: https://nodejs.org/api/assert.html
			assert.equal(pokemon.name, "Pikachu")
		})

		// Exercise 1.2
		it("(expect) name to be set when value is present", function() {
			var pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			// Reference: https://www.chaijs.com/api/bdd/#method_equal
			expect(pokemon.name).to.equal("Pikachu")
		})

		// Exercise 1.3
		it("throw error when value is empty", function() {
			// test exception
			// Reference: https://www.chaijs.com/api/bdd/#method_throw
			expect(function() {
				var pokemon = new Pokemon()
				pokemon.setName("")
			}).to.throw("name cannot be empty")
		})
	})
})