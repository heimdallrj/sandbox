var express    = require("express");
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'enter-mysql-host-here',
  user     : 'enter-mysql-user-name-here',
  password : 'enter-mysql-password-here',
  database : 'enter-db-name-here'
});

var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected...");    
} else {
    console.log("Error connecting database...");    
}
});

app.get("/",function(req,res){
connection.query('SELECT * from tbltest LIMIT 2', function(err, rows, fields) {
connection.end();
  if (!err)
    console.log('Results--\r\n', rows);
  else
    console.log('Error while performing Query.');
  });
});

app.listen(3000);
