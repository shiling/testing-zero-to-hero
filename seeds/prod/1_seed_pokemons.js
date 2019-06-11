const _ = require("lodash")
const fs = require("fs")
const csvParse = require("csv-parse/lib/sync")
const Pokemon = require("../../models/Pokemon")

function prepareUpdateObject(o) {
	let update = _.pick(o, ["id", "name", "types", "hp", "attack", "defense", "sp_attack", "sp_defense", "speed", "generation", "legendary"])
	update.types = JSON.stringify(update.types)
	let ts = new Date().getTime()
	update.created_at = update.created_at || ts
	update.updated_at = ts
	return update
}

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("pokemons")
		.del()
		.then(function() {
			let source = fs.readFileSync(__dirname + "/Pokemon.csv", { encoding: "utf8" })
			const records = csvParse(source, { columns: true })

			if (!records.length) {
				return Promise.resolve()
			}

			let pokemons = []
			records.forEach((r) => {

				r.id = parseInt(r.id)

				// skip duplicate ids (duplicates because of there are mega version of each pokemon)
				if(r.id === pokemons.length + 1){
					
					r.types = []
					if (r["type 1"]) {
						r.types.push(r["type 1"])
					}
					if (r["type 2"]) {
						r.types.push(r["type 2"])
					}
					r.legendary = r.legendary === "true"
					let pokemon = new Pokemon(r)
					pokemons.push(prepareUpdateObject(pokemon))

				}
				
			})
			
			// Inserts seed entries
			let deferred = Promise.resolve()

			for (var i = 0; i < pokemons.length; i++) {
				let pokemon = pokemons[i] // this must be outside the `then` clause
				deferred = deferred
					.then(() => {
						// console.log("Inserting... #" + pokemon.id + " " + pokemon.name + ", " + JSON.stringify(pokemon.types))
						return knex("pokemons").insert(pokemon)
					})
					.catch((e) => {
						console.error(e)
					})
			}
			return deferred
		})
}
