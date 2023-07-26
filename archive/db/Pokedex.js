const _ = require("lodash")
const Pokemon = require("../models/Pokemon")

//-----------------------------------------------
// Helper methods
//-----------------------------------------------

/**
 * Create the update object
 * @param {*} o
 */
function prepareUpdateObject(o) {
	let update = _.pick(o, ["name", "types", "hp", "attack", "defense", "sp_attack", "sp_defense", "speed", "generation", "legendary"])
	update.types = JSON.stringify(update.types)
	let ts = new Date().getTime()
	update.created_at = update.created_at || ts
	update.updated_at = ts
	return update
}

/**
 * Create a Pokemon instance from record
 * @param {*} o
 */
function createPokemonFromRecord(o) {
	// initialse from given object
	let pokemon = new Pokemon()
	if (o.id) pokemon.setId(o.id)
	if (o.name) pokemon.setName(o.name)
	if (o.types) pokemon.setTypes(JSON.parse(o.types))
	if (o.hp) pokemon.setHp(o.hp)
	if (o.attack) pokemon.setAttack(o.attack)
	if (o.defense) pokemon.setDefense(o.defense)
	if (o.sp_attack) pokemon.setSpAttack(o.sp_attack)
	if (o.sp_defense) pokemon.setSpDefense(o.sp_defense)
	if (o.speed) pokemon.setSpeed(o.speed)
	if (o.generation) pokemon.setGeneration(o.generation)
	if (o.legendary) pokemon.setLegendary(o.legendary === 1)
	return pokemon
}

/**
 * Prepare filters for a query
 * @param {*} query
 * @param {*} filter
 */
function prepareFilters(query, filter) {
	let _filter = _.clone(filter)
	if (_filter.name) {
		query = query.where("name", "like", "%" + filter.name + "%")
		delete _filter.name
	}
	if(_filter.types && Array.isArray(_filter.types)){
		for(i in _filter.types){
			query = query.where("types", "like", "%" + _filter.types[i] + "%")
		}
		delete _filter.types
	}
	query = query.where(_filter)
	//console.log(query.toString())
}

class Pokedex {
	constructor() {
		this.table = "pokemons"
		this.knex = null
	}

	connect(storage) {
		return new Promise((resolve, reject) => {
			try {
				if (typeof storage === "undefined" || storage == null) {
					throw new Error("missing `storage` to initialise database connection")
				}

				// CONNECT TO DATABASE
				this.knex = require("knex")({
					client: "sqlite3",
					connection: {
						filename: storage
					},
					useNullAsDefault: true // sqlite does not support setting default values
				})

				return resolve()
				
			} catch (err) {
				return reject(err)
			}
		})
	}

	close() {
		return new Promise((resolve, reject) => {
			this.knex.destroy((err) => {
				this.knex = null
				if (err) {
					return reject(err)
				}
				return resolve()
			})
		})
	}
	save(o) {
		return new Promise((resolve, reject) => {
			try {
				if (typeof o === "undefined" && o == null) {
					throw new Error("argument 1 is required")
				}

				let getPokemon
				if (o.id) {
					getPokemon = this.knex(this.table)
						.where("id", o.id)
						.select()
				} else {
					getPokemon = Promise.resolve([])
				}

				getPokemon
					.then((result) => {
						if (result.length === 0) {
							// add pokemon
							return this.knex(this.table)
								.insert(prepareUpdateObject(o))
								.then((result) => {
									let id = result[0]
									o.setId(id) // update the id
								})
						} else {
							return this.knex(this.table)
								.update(prepareUpdateObject(o))
								.where({ id: o.id })
						}
					})
					.then(() => {
						return resolve(o)
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

	save_callback(o, callback) {
		return this.save(o)
			.then((result) => {
				return callback && callback(null, result)
			})
			.catch(callback)
	}

	get(id) {
		return new Promise((resolve, reject) => {
			try {
				if (typeof id === "undefined" || id == null) {
					return reject(new Error("id is required"))
				}
				this.knex(this.table)
					.where("id", id)
					.select()
					.then((results) => {
						if (results.length === 0) {
							return resolve(null)
						} else {
							return resolve(createPokemonFromRecord(results[0]))
						}
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

	getByName(name) {
		return new Promise((resolve, reject) => {
			try {
				if (typeof name === "undefined" || name == null) {
					return reject(new Error("name is required"))
				}
				this.knex(this.table)
					.where("name", name)
					.select()
					.then((results) => {
						if (results.length === 0) {
							return resolve(null)
						} else {
							return resolve(createPokemonFromRecord(results[0]))
						}
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

	find(opts = {}) {
		return new Promise((resolve, reject) => {
			try {
				// build query
				let query = this.knex(this.table)

				// add filter
				if (typeof opts.filter !== "undefined" && opts.filter !== null) {
					prepareFilters(query, opts.filter)
				}

				// todo: sort

				// execute query
				query
					.select()
					.then((results) => {
						return resolve(results.map((r) => createPokemonFromRecord(r)))
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

	count(opts = {}) {
		return new Promise((resolve, reject) => {
			try {
				// build query
				let query = this.knex(this.table)

				// add filter
				if (typeof opts.filter !== "undefined" && opts.filter != null) {
					prepareFilters(query, opts.filter)
				}

				// execute query
				query
					.count("id as count")
					.then((results) => {
						return resolve(results[0]["count"])
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			try {
				if (typeof id === "undefined" || id == null) {
					return reject(new Error("id is required"))
				}
				this.knex(this.table)
					.where("id", id)
					.delete()
					.then(() => {
						return resolve()
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

	deleteAll() {
		return new Promise((resolve, reject) => {
			try {
				this.knex(this.table)
					.delete()
					.then(() => {
						return resolve()
					})
					.catch(reject)
			} catch (err) {
				return reject(err)
			}
		})
	}

}

module.exports = Pokedex
