import chai from "chai"
import chaiHttp from "chai-http"
chai.use(chaiHttp)
import { expect } from "chai"

describe("/api/pokedex", function(){

	it("should return a list of pokemon as a json array using /list", async function(){

		let res = await chai.request("localhost:3000").get("/api/pokedex/list").send()

		// console.log("response is: ", res)

		// 1: check status code is 200
		// expect(res.statusCode).to.equal(404)
		expect(res).to.have.status(200);

		// 2: check that response content is a json array
		expect(res).to.be.json;
		expect(res.body).to.be.an('array')

		// 3: check that first item in the array is "Bulbasaur"
		expect(res.body[0].name).to.equal("Bulbasaur")

	})

	it("can add a pokemon using /add and then retrieve it using /:name", async function(){

		// add a pokemon
		let res = await chai.request("localhost:3000").post("/api/pokedex/add").send({
			id: 172,
			name: "Pichu"
		})

		// then get the pokemon using it's name
		res = await chai.request("localhost:3000").get("/api/pokedex/pichu").send()

		// todo: validate that the response is 200 and the pokemon name is pichu
		expect(res).to.have.status(200);
		expect(res).to.be.json;
		expect(res.body.name).to.equal("Pichu")

	})

	it("can add a pokemon using /add and then retrieve it using /:id", async function(){

		// add a pokemon
		let res = await chai.request("localhost:3000").post("/api/pokedex/add").send({
			id: 25,
			name: "Pikachu"
		})

		// then get the pokemon using it's id
		res = await chai.request("localhost:3000").get("/api/pokedex/14").send()

		// todo: validate that the response is 200 and the pokemon name is pichu
		expect(res).to.have.status(200);
		expect(res).to.be.json;
		expect(res.body.name).to.equal("Pikachu")

	})

	it("should return 404 if pokemon not found using /:id", async function(){

		// then get the pokemon using it's id
		let res = await chai.request("localhost:3000").get("/api/pokedex/1000").send()

		// todo: validate that the response is 200 and the pokemon name is pichu
		expect(res).to.have.status(404);
		expect(res).to.be.json;
		expect(res.body.error).to.equal("Pokemon not found")

	})

})