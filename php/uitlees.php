<?php
require_once('config.inc.php');

$query = "SELECT * FROM back2_leden";
$result = mysqli_query($mysqli, $query);

echo(json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC)));