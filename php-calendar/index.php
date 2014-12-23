<?php
include_once 'calendar.php';
?>
<!DOCTYPE>
<html>

<head>
   
<link href="calendar.css" type="text/css" rel="stylesheet" />

</head>

<body>

<?php

	$calendar = new Calendar();

	print $calendar->show();

?>

</body>
</html>   