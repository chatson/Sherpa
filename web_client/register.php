<?php

$username = $_POST['username'];
$pass = $_POST['pass'];

// connect
$m = new Mongo();

$db = $m->sherpa_dherpa;

$collection = $db->users;

$obj = array( "username" => $username , "pass" => $pass );
$collection->insert($obj);

?>
