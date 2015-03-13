<?php

$sample = $_GET["sample"];
$target = $_GET["target"];
// sqlite3 test.db "SELECT * from blast_lookup WHERE query='MMGA_0002'"
$temp = "sqlite3 test.db " . " \"SELECT * from blast_lookup WHERE query = " . "'$query'" . "\" > out.txt";
echo $temp;
exec($temp);


?>