<pre>

<?php

$sample = $_GET["sample"];
$target = $_GET["target"];
// sqlite3 test.db "SELECT * from blast_lookup WHERE query='MMGA_0002'"
$temp = "sqlite3 test.db " . " \"SELECT filename, start, length from blast_results WHERE filename = './blast_outputs/" . $sample .".fas.results.blastpOUT' AND query_id IN ( SELECT query_id FROM queryids WHERE sample = " . "'$sample'" . " AND target = " . "'$target')" . "\" ";

$out = shell_exec($temp);
// list($filename, $start, $length) = split('\|', $out);
$test = split("\n", $out);
exec("rm out.html");
exec("touch out.html");
for($i = 0; $i < count($test); $i++){
	$test[$i] = split("\|", $test[$i]);
	$start = $test[$i][1]; $filename = $test[$i][0]; $length = $test[$i][2];
	$temp = "tail -c +'$start' $filename | head -c $length >> out.html";
	echo($temp);
	exec($temp);
}

?>