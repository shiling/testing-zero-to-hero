const express = require("express")
const router = express.Router()
const Pokemon = require("../models/Pokemon")
const Pokedex = require("../db/Pokedex")
const config = require("../config")[process.env.NODE_ENV || "development"]

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

	// type

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

module.exports = router
