var request = require('request');
var fs = require('fs');

var unzip = require('unzip');

var mv = require('mv');

// ReferenceError: stream is not defined

// download zip file
var fileUrl = "https://wordpress.org/latest.zip";
var output = ".tmp/wp.zip";
request({url: fileUrl, encoding: null}, function(err, resp, body) {
  	if(err) throw err;

    fs.writeFile(output, body, function(err) {
    console.log("file downloaded!");

	// unzip downloaded file
	var stream = fs.createReadStream(output)
		.pipe(unzip.Extract({ path: '.tmp/' }));
  	});

	stream.on('finish', function () {
		console.log("unziped.")
		// move unziped file to parent folder
		mv('.tmp/wordpress', './public', {mkdirp: true}, function(err) {
		  console.log(err);
		  console.log("moved!");
		});
	});
});
