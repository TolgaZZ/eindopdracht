<?php
require_once('config.inc.php');

$id = $_POST['id'];

$query = "DELETE FROM back2_leden WHERE id=$id";
mysqli_query($mysqli, $query);
