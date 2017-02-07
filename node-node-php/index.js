/**
ERROR:
{ Error: spawn php-cgi ENOENT
    at exports._errnoException (util.js:1026:11)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:182:32)
    at onErrorNT (internal/child_process.js:348:16)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
  code: 'ENOENT',
  errno: 'ENOENT',
  syscall: 'spawn php-cgi',
  path: 'php-cgi',
  spawnargs: [] }

:
https://github.com/mkschreder/node-php/issues/17
**/

var express = require('express');
var php = require("node-php"); 
var path = require("path"); 

var app = express();

app.use("/", php.cgi("htdocs"));

app.listen(9090);

console.log("Server listening on 9090");