<?php
// connect
$m = new Mongo();

$db = $m->sherpa_dherpa;

$collection = $db->globalLogs;

$cursor = $collection->find();

$logs = array();
$i = 0;
// iterate through the results
foreach ($cursor as $obj) {
    $logs[$i] = $obj["time"].'||'.$obj['username'].'||'.$obj['msg'];
    $i++;
}

echo json_encode($logs);

?>

