exports.up = function(knex, Promise) {
	return knex.schema
		.createTable("pokemons", function(table) {
			table.increments("id")
			table.string("name").unique()
			table.json("types")
			table.integer("hp")
			table.integer("attack")
			table.integer("defense")
			table.integer("sp_attack")
			table.integer("sp_defense")
			table.integer("speed")
			table.integer("generation")
			table.boolean("legendary")
			table.timestamps()
		})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("pokemons")
}
