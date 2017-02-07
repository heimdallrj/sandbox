<?php

$con = @mysqli_connect('localhost:3306', 'root', 'root');

if(!$con) {
    die('failed to connect to the server: ' . mysqli_connect_error());
} else {
	print 'DB... connection .. established.';
}

if(!@mysqli_select_db($con, 'wptest')) {
    die('failed to connect to the database: ' . mysqli_error($con));
} else {
	print 'DB... connected.';
}

// eof.