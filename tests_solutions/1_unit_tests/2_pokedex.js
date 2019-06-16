process.env.NODE_ENV = "test"

var Pokemon = require("../../models/Pokemon")
var Pokedex = require("../../db/Pokedex")

var assert = require("assert")
var should = require("chai").should() // actually call the function
var expect = require("chai").expect
var assert2 = require("chai").assert

describe("Pokedex", function() {
	let pokedex = new Pokedex()

	// Exercise 1.7
	before(function() {
		return pokedex.connect("./storage/test.sqlite3")
	})

	beforeEach(function() {
		return pokedex.deleteAll()
	})

	after(function() {
		return pokedex.close()
	})

	// Exercise 1.5
	describe("#save()", function() {
		it("should add pokemon", async function() {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			await pokedex.save(pokemon)
			expect(pokemon.id).to.be.a("number")
		})

		it("should update existing pokemon", async function() {
			let pokemon = new Pokemon()
			pokemon.setId(1)
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])
			pokemon = await pokedex.save(pokemon) // add

			// update
			pokemon.setHp(100)
			pokemon = await pokedex.save(pokemon) // update

			// todo: assertion
		})
	})

	// Exercise 1.6
	describe("#save_callback()", function() {
		it("should add pokemon", function(done) {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			pokedex.save_callback(pokemon, function(err) {
				if (err) {
					return done(err)
				}
				expect(pokemon.id).to.be.a("number")
				return done()
			})
		})
	})

	describe("#get()", function() {
		it("retrieve pokemon from database by id", async function() {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			// save to database
			await pokedex.save(pokemon)

			// get from database
			let pokemon2 = await pokedex.get(pokemon.id)
			expect(pokemon2).to.exist
			expect(pokemon2.name).to.equal("Pikachu")
		})
	})

	describe("#getByName()", function() {
		it("retrieve pokemon from database by name", async function() {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			// save to database
			await pokedex.save(pokemon)

			// get from database
			let pokemon2 = await pokedex.getByName("Pikachu")
			expect(pokemon2).to.exist
			expect(pokemon2.name).to.equal("Pikachu")
			expect(JSON.stringify(pokemon2.types)).to.equal(JSON.stringify(["Electric"]))
		})
	})

	describe("#find()", function() {
		it("retrieve pokemon from database by name", async function() {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			// save to database
			await pokedex.save(pokemon)

			// get from database
			let results = await pokedex.find({ name: "Pikachu" })
			expect(results).to.have.length(1)
			expect(results[0].name).to.equal("Pikachu")
		})
	})

	describe("#count()", function() {
		it("count pokemons", async function() {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			let pokemon2 = new Pokemon()
			pokemon.setName("Raichu")
			pokemon.setTypes(["Electric"])

			// save to database
			await pokedex.save(pokemon)
			await pokedex.save(pokemon2)

			// get from database
			let count = await pokedex.count()
			expect(count).to.equal(2)
		})
	})

	describe("#delete()", function() {
		it("delete pokemon by id", async function() {
			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")
			pokemon.setTypes(["Electric"])

			// save to database
			await pokedex.save(pokemon)

			// delete from database
			await pokedex.delete(pokemon.id)

			// get from database
			let pokemon2 = await pokedex.get(pokemon.id)
			expect(pokemon2).to.not.exist
		})
	})
})

// Exercise 5: Testing APIs with chakram
