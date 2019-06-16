process.env.NODE_ENV = "test"

const chai = require("chai")
const expect = require("chai").expect
const chaiHttp = require("chai-http")
chai.use(chaiHttp)

describe("API tests", function() {
	// setup server
	// const PORT = 3001
	// const BASE_URL = "http://localhost:" + PORT
	const app = require("../../app")
	// let server

	// Exercise 2.2
	// before(function(done) {
	// 	// start the server before running the tests
	// 	server = app.listen(PORT, done)
	// })

	// Exercise 2.3
	let knex
	before(async function() {
		const config = require("../../knexfile.js")[process.env.NODE_ENV]
		knex = require("knex")(config) // connect
		await knex.migrate.rollback(true) // rollback the schema, this will also destroy all data
		await knex.migrate.latest() // migrate the schema to the latest version
	})

	beforeEach(async function() {
		await knex.seed.run() // seed the test data
	})

	after(async function() {
		await knex.destroy() // close the connection
	})

	// after(function(done) {
	// 	// close the server after running the tests
	// 	server.close(function() {
	// 		done()
	// 	})
	// })

	// Exercise 2.1
	describe("/api/pokemons/add", function() {
		it("should add pokemon", async function() {
			const res = await chai
				.request(app)
				.post("/api/pokemons/add")
				.send({
					name: "MewThree",
					hp: "999",
					attack: "999",
					defense: "999",
					sp_attack: "999",
					sp_defense: "999",
					speed: "999",
					legendary: true
				})
			expect(res).to.have.status(200)
			expect(res).to.have.header("content-type", "application/json; charset=utf-8")
			expect(res).to.be.json
			expect(res.body.name).to.be.equal("MewThree")
		})
	})

	// Exercise 2.1
	describe("/api/pokemon/get", function() {
		it("should retrieve all pokemons (callback)", function(done) {
			// callback
			chai.request(app)
				.get("/api/pokemons")
				.send()
				.end(function(err, res) {
					expect(err).to.be.null
					expect(res).to.have.status(200)
					expect(res).to.have.header("content-type", "application/json; charset=utf-8")
					expect(res).to.be.json
					expect(res.body).to.be.a("Array")
					expect(res.body).to.have.lengthOf(151) // 151 pokemons
					expect(res.body[0].name).to.be.equal("Bulbasaur") // first pokemon should be bulbasaur
					return done(err)
				})
		})

		it("should retrieve all pokemons (promise)", function() {
			// promise
			return chai
				.request(app)
				.get("/api/pokemons")
				.send()
				.then(function(res) {
					expect(res).to.have.status(200)
					expect(res).to.have.header("content-type", "application/json; charset=utf-8")
					expect(res).to.be.json
					expect(res.body).to.be.a("Array")
					expect(res.body).to.have.lengthOf(151) // 151 pokemons
					expect(res.body[0].name).to.be.equal("Bulbasaur") // first pokemon should be bulbasaur
				})
				.catch(function(err) {
					throw err
				})
		})
	})
})
