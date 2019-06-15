const express = require("express")
const router = express.Router()
const Pokemon = require("../../models/Pokemon")
const Pokedex = require("../../db/Pokedex")
const config = require("../../config")[process.env.NODE_ENV || "development"]

// init database
let pokedex = new Pokedex()
pokedex.connect(config.database.filename)

/* GET pokemons listing. */
router.get("/", function(req, res, next) {
	let filter = {}

	// name
	if (req.query.name) {
		filter.name = req.query.name
	}

	// types
	

	// generation
	if (req.query.generation) {
		filter.generation = Number.parseInt(req.query.generation)
	}

	// legendary
	if (req.query.legendary) {
		filter.legendary = req.query.legendary === "1"
	}

	pokedex
		.find({
			filter: filter
		})
		.then((results) => {
			res.send(results)
		})
		.catch(next) // pass errors to expressjs to handle
})

/* ADD a pokemon */
router.post("/add", function(req, res, next) {
	
	let pokemon = new Pokemon(req.body)
		
	pokedex
		.save(pokemon)
		.then(() => {
			res.send(pokemon)
		})
		.catch(next)
})

/* GET a pokemon */
router.get("/:id", function(req, res, next) {

	pokedex
		.get(req.params.id)
		.then((pokemon) => {
			res.send(pokemon)
		})
		.catch(next)

})

/* UPDATE a pokemon */
router.post("/:id/update", function(req, res, next) {

	let pokemon = new Pokemon(req.body)
	pokemon.setId(req.params.id)

	pokedex
		.save(pokemon)
		.then(() => {
			res.send(pokemon)
		})
		.catch(next)

})

/* DELETE a pokemon */
router.post("/:id/delete", function(req, res, next) {
	let id = req.params.id

	pokedex
		.delete(id)
		.then(() => {
			res.statusCode = 204
			res.send()
		})
		.catch(next)

})

module.exports = router
