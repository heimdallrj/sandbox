var request = require('request');
var fs = require('fs');

// download zip file
var fileUrl = "https://wordpress.org/latest.zip";
var output = ".tmp/wp.zip";
request({url: fileUrl, encoding: null}, function(err, resp, body) {
  if(err) throw err;
  fs.writeFile(output, body, function(err) {
    console.log("file downloaded!");
  });
});