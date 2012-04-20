<?php

$uporabnik = $_POST['uporabnik'];
$geslo = md5($_POST['geslo']);
$preverba = false;
$tmp = "";

/**********************************************/

$m = new Mongo();

$db = $m->webchat;

$collection = $db->uporabniki;

$obj = array( "uporabnik" => $uporabnik, "geslo" => $geslo );

$cursor = $collection->find($obj);

$id = "";

foreach ($cursor as $c) {
    $preverba = true;
	$id = $c["_id"];
}

$rezultat = array("stanje" => $preverba, "id" => $id);

echo json_encode($rezultat);

?>