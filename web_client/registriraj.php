<?php

	$uporabnik = $_POST['uporabnik'];
	$geslo = md5($_POST['geslo']);
	$ime = $_POST['ime'];
	$priimek = $_POST['priimek'];
	$naslov = $_POST['naslov'];
	$starost = $_POST['starost'];
	$email = $_POST['email'];
	$slika = $_POST['urlSlike'];

	$m = new Mongo();

	$db = $m->webchat;
	
	$collection = $db->uporabniki;
	
	$obj = array( "uporabnik" => $uporabnik, 
				  "geslo" => $geslo,
				  "ime" => $ime,
				  "priimek" => $priimek,
				  "naslov" => $naslov,
				  "starost" => $starost,
				  "email" => $email,
				  "slika" => $slika,
				  "komentar" => "Komentar..." );
	
	$collection->insert($obj);

?>