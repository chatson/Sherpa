<?php
$username = $_POST['username'];
$pass = $_POST['pass'];

// connect
$m = new Mongo();

$db = $m->sherpa_dherpa;

$collection = $db->users;

$cursor = $collection->find(array("username" => $username,"pass" => $pass));

$preverba = "false";
// iterate through the results
foreach ($cursor as $obj) {
    $preverba = "true";
}

$result = array("Status" => $preverba);

echo json_encode($result);

if($preverba == "true")
{
	session_start(); 
	$_SESSION['username'] = $_POST['username'];
	$_SESSION['pass'] = $_POST['pass'];
}
	
?>
