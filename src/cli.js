import fs from 'fs';
import path from 'path';
import arg from 'arg';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
const config = require('../webpack.config.js');

function parseArgumentsIntoOptions(rawArgs) {
	const args = arg(
		{
			'--port': Number,
			'-p': '--port',
		},
		{
			argv: rawArgs.slice(2),
		},
	);

	return {
		port: args['--port'] || 8080,
		data: args._[0],
	};
}

async function getElements(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
}
async function write(filePath, data) {
	return new Promise(function (resolve, reject) {
		fs.writeFile(filePath, data, 'utf-8', (err) => {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
}

export async function main(args) {
	const options = parseArgumentsIntoOptions(args);
	if (!options.data) {
		let message =
			'You must specify the path to the file containing the graph data.';
		throw new Error(message);
	}
	const data = await getElements(options.data);

	let filePath = path.join(__dirname, './graph/elements.json');
	await write(filePath, data);

	const server = new WebpackDevServer({ open: true }, webpack(config));
	await server.listen(
		options.port,
		'localhost',
		(err) => err && console.error(err),
	);
}
