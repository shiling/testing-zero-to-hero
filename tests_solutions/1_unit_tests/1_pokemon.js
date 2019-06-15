const Pokemon = require("../../models/Pokemon")

const assert = require("assert")
const should = require("chai").should() // actually call the function
const expect = require("chai").expect
const assert2 = require("chai").assert

describe("Pokemon", function() {
	// module
	describe("#setName()", function() {
		// module

		// Exercise 1: using NodeJS's assertion library
		it("(assert) set name when value is present", function() {
			// test
			var pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			assert.equal(pokemon.name, "Pikachu")
		})

		// Exercise 1: Using "should" BDD-style assertion library
		it("(should) set name when value is present", function() {
			var pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.should.have.property("name", "Pikachu")
		})

		// Exercise 1: Using "expect" BDD-style assertion library
		it("(expect) name to be set when value is present", function() {
			var pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			expect(pokemon.name).to.equal("Pikachu")
		})

		// Exercise 2: Negative testing
		it("throw error when value is empty", function() {
			// test exception
			assert2.throws(function() {
				var pokemon = new Pokemon()
				pokemon.setName("")
			}, "name cannot be empty")
		})
	})
})