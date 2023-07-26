// Update with your config settings.

module.exports = {
	development: {
		database: {
			filename: "./storage/dev.sqlite3"
		}
	},
	test: {
		database: {
			filename: "./storage/test.sqlite3"
		}
	},
	production: {
		database: {
			filename: "./storage/prod.sqlite3"
		}
	}
}
