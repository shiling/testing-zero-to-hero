import Pokemon from "../../src/models/Pokemon.js"
import assert from "assert"
import {expect} from "chai";

describe("Pokemon", function(){


	describe("setName()", function(){


		it("should set name if given a non-empty string", function(){

			let pokemon = new Pokemon()
			pokemon.setName("Pikachu")

			// assert.equal(pokemon.name, "Pikachu", "name of the pokemon should be 'Pikachu'")

			expect(pokemon.name).to.equal("Pikachu")
			
		})

		it("should throw error if given an empty string", function(){

			// expect(badFn).to.throw(err); 
			expect(function(){
				let pokemon = new Pokemon()
				pokemon.setName("") // this line should throw an error
			}).to.throw("name cannot be empty")
			
		})

	})


})