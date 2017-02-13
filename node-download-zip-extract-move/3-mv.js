var mv = require('mv');

// move unziped file to parent folder
mv('.tmp/wordpress', '.tmp/wp', {mkdirp: true}, function(err) {
  console.log(err);
  console.log("moved!");
});