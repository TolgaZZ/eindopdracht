<?php
require_once('config.inc.php');

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$gender = $_POST['gender'];
$birth_date = $_POST['birth_date'];
$member_since = date("Y/m/d");

$query = "INSERT INTO back2_leden (first_name, last_name, gender, birth_date, member_since)
          VALUES ('$first_name', '$last_name', '$gender', '$birth_date', '$member_since')";
mysqli_query($mysqli, $query);

$query = "SELECT * FROM back2_leden
          WHERE first_name='$first_name' AND
                last_name='$last_name' AND
                gender='$gender' AND
                birth_date='$birth_date' AND
                member_since='$member_since'";
$result = mysqli_query($mysqli, $query);

echo(json_encode(mysqli_fetch_array($result, MYSQLI_ASSOC)));