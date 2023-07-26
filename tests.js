// CONFIGURATION

let server_base_url = "localhost:3000"

// CONFIGURE MOCHA
import { default as chai, expect } from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp)

// TEST SUITES

describe("UNIT tests", function(){

	// import pokemon
	// create a pokemon
	// call the growl function

	// import the pokedex

	// add a pokemon

	// get a pokemon

	// delete a pokemon

	// update a pokemon

	// list pokemons

})

describe("API tests", function(){

	// Todo: Exercise 1 - check if server is online
	it("server should be online", async function(){
		let res = await chai
				.request(server_base_url)
				.get("/")
				.send()
				expect(res).to.have.status(200)
		expect(res).to.have.header("content-type", "text/html; charset=utf-8")
		expect(res).to.be.html
	})

	// Todo: Exercise 2 - list all pokemons
	describe("/api/pokedex/list", function(){

		// Todo: 
		it("list all pokemons", async function(){
			let res = await chai
					.request(server_base_url)
					.get("/api/pokedex/list")
					.send()
					expect(res).to.have.status(200)
			expect(res).to.have.header("content-type", "application/json; charset=utf-8")
			expect(res).to.be.json
		})

		// Todo: Exercise 3 - filter pokemons that are bug type
		it("list bug-type pokemons", async function(){
			let res = await chai
					.request(server_base_url)
					.get("/api/pokedex/list")
					.send()
					expect(res).to.have.status(200)
			expect(res).to.have.header("content-type", "application/json; charset=utf-8")
			expect(res).to.be.json
			// todo: assert that the pokemons are bug type
		})

	})

	describe("/api/pokedex/get", function(){

		// Todo: get the pokemon #1; validate the the pokemon name is bulbasaur

		// Todo: get the pokemon by name; validate the pokemon name is same

		// Todo: get the pokemon #9999; validate status code 404, with error message "Pokemon not found"
		

	})

	// Todo: Exercise 4 - add a pokemon, then get the pokemon
	describe("/api/pokedex/add", function(){

		it("should add a pokemon", async function(){
			// first add the pokemon
			let res = await chai
				.request(server_base_url)
				.post("/api/pokedex/add")
				.send({
					index: 10,
					name: "Caterpie",
					types: ["bug"],
					stats: {
						hp: 45,
						attack: 30,
						defense: 35,
						specialAttack: 20,
						specialDefense: 20,
						speed: 45
					}
				})
			expect(res).to.have.status(200)
			expect(res).to.have.header("content-type", "application/json; charset=utf-8")
			expect(res).to.be.json

			// now get the pokemon
			res = await chai
					.request(server_base_url)
					.get("/api/pokedex/10")
					.send()
			expect(res).to.have.status(200)
			expect(res).to.have.header("content-type", "application/json; charset=utf-8")
			expect(res).to.be.json
			expect(res.body.name).to.be.equal("Caterpie") // caterpie should be in the pokedex now!

		})

		it("should update if pokemon already exists", async function(){

		})
		
	})
	

	// Todo: Exercise 4 - add a pokemon to the pokedex and the get the pokemon by name


})