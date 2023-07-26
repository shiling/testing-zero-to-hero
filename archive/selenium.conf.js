module.exports = {
	drivers: {
		chrome: {
			version: "2.46" /* Supports testing Chrome v71 to v73 */,
			arch: process.arch,
			baseURL: "https://chromedriver.storage.googleapis.com"
		}
	}
}
