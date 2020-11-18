<?php
require_once('config.inc.php');

$id = $_POST['id'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$gender = $_POST['gender'];
$birth_date = $_POST['birth_date'];

$query = "UPDATE back2_leden
          SET first_name='$first_name',
              last_name='$last_name',
              gender='$gender',
              birth_date='$birth_date'
          WHERE id=$id";
mysqli_query($mysqli, $query);