var fs = require('fs');
var unzip = require('unzip');

// unzip downloaded file
var stream = fs.createReadStream('wp.zip')
	.pipe(unzip.Extract({ path: './' }));

console.log("!--1");

stream.on('finish', function () {
	console.log("finished");
});