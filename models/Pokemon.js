const _ = require("lodash")

class Pokemon {
	constructor(o) {
		// defaults
		this._id = null
		this._name = ""
		this._types = []
		this._hp = -1
		this._attack = -1
		this._defense = -1
		this._sp_attack = -1
		this._sp_defense = -1
		this._speed = -1
		this._generation = -1
		this._legendary = false

		if (typeof o === "object") {
			if (o.id) this.setId(o.id)
			if (o.name) this.setName(o.name)
			if (o.types) this.setTypes(o.types)
			if (o.hp) this.setHp(o.hp)
			if (o.attack) this.setAttack(o.attack)
			if (o.defense) this.setDefense(o.defense)
			if (o.sp_attack) this.setSpAttack(o.sp_attack)
			if (o.sp_defense) this.setSpDefense(o.sp_defense)
			if (o.speed) this.setSpeed(o.speed)
			if (o.generation) this.setGeneration(o.generation)
			if (o.legendary) this.setLegendary(o.legendary)
		}

	}

	get id() {
		return this._id
	}

	setId(value) {
		return (this._id = value)
	}

	get name() {
		return this._name
	}

	setName(value) {
		if (typeof value !== "string") {
			throw new Error("name must be a string")
		}
		value = value.trim()
		if (value === "") {
			throw new Error("name cannot be empty")
		}
		this._name = value
	}

	get types() {
		return this._types
	}

	setTypes(value) {
		if (!Array.isArray(value)) {
			throw new Error("types must be an array")
		}

		value.forEach((t) => {
			if (typeof t !== "string") {
				throw new Error("types contains invalid elements")
			}
		})

		value = value
			.map((v) => v.trim()) // trim trialing and leading spaces
			.filter((v) => v !== "") // remove empty elements

		this._types = value
	}

	get hp() {
		return this._hp
	}

	setHp(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("hp must be an integer")
		}
		this._hp = value_int
	}

	get attack() {
		return this._attack
	}

	setAttack(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("attack must be an integer")
		}
		this._attack = value_int
	}

	get defense() {
		return this._defense
	}

	setDefense(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("defense must be an integer")
		}
		this._defense = value_int
	}

	get sp_attack() {
		return this._sp_attack
	}

	setSpAttack(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("sp_attack must be an integer")
		}
		this._sp_attack = value_int
	}

	get sp_defense() {
		return this._sp_defense
	}

	setSpDefense(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("sp_defense must be an integer")
		}
		this._sp_defense = value_int
	}

	get speed() {
		return this._speed
	}

	setSpeed(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("speed must be an integer")
		}
		this._speed = value_int
	}

	get generation() {
		return this._generation
	}

	setGeneration(value) {
		let value_int = parseInt(value)
		if (Number.isNaN(value_int)) {
			throw new Error("generation must be an integer")
		}
		this._generation = value_int
	}

	get legendary() {
		return this._legendary
	}

	setLegendary(value) {
		if (typeof value !== "boolean") {
			throw new Error("legendary must be a boolean, got " + typeof value + " instead")
		}
		this._legendary = value
	}

	toJSON(){
		return _.pick(this, ["id","name","types","hp","attack","defense","sp_attack","sp_defense","speed","generation","legendary"])
	}
}

module.exports = Pokemon
