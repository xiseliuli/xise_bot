const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const modules = {};

fs.readdirSync("./plugins")
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
      file !== 'index.js' &&
			file.slice(-3) === ".js"
	)
	.map((file) => {
		modules[file.slice(0, -3)] = require(path.join(__dirname, file));
	});

module.exports = modules;
