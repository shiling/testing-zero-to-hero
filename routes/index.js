var express = require("express")
var router = express.Router()
const Pokemon = require("../models/Pokemon")
const Pokedex = require("../db/Pokedex")
const config = require("../config")[process.env.NODE_ENV || "development"]

// init database
let pokedex = new Pokedex()
pokedex.connect(config.database.filename)

router.get("/", async function(req, res, next) {

	// get all pokemons
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

	let pokemons = await pokedex.find({filter: filter})

	res.render("index", {
		title: "Pokedex",
		pokemons: pokemons
	})

})

module.exports = router
