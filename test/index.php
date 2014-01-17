<?php

/*

	So, here we're just joining all javascript files and put them into one script which is
	being loaded by HTML page.

*/

$outputFileName = 'kineticui.js';

$minify = false;
$compilation_level = 'SIMPLE_OPTIMIZATIONS'; // WHITESPACE_ONLY, SIMPLE_OPTIMIZATIONS or ADVANCED_OPTIMIZATIONS

$fileNameList = array('core.js','config.js');

$output = "";

$directory = dir('../src');
while (false !== ($entry = $directory->read())) {
	if (substr(strtoupper($entry),-3) == '.JS') {
		$fileNameList[] = $entry;
	}
}



foreach (array_unique($fileNameList) as $fileName) {
	$output .= file_get_contents('../src/' . $fileName) . "\r\n";
}

if ($minify) {
	$curl = curl_init('http://closure-compiler.appspot.com/compile');
	curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 15);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, 'language=ECMASCRIPT5&output_info=compiled_code&output_format=text&compilation_level=' . $compilation_level . '&js_code=' . urlencode($output));
	$output = trim(curl_exec($curl));
	curl_close($curl);
}

file_put_contents($outputFileName, $output);

?>
<!DOCTYPE html>
<html>
<head>
	<title>KineticUI test</title>
	<script type="text/javascript" src="./kinetic-v5.0.0.min.js"></script>
	<script type="text/javascript" src="./kineticui.js"></script>
</head>
<body>
	<div id="stage" style="display:block;height:100%;width:100%;"></div>

	<script type="text/javascript">
		KineticUI.enableTrace();
		var stage = new Kinetic.Stage({width : 640, height : 480, container : 'stage'});
		var layer = new Kinetic.Layer();
		var button = new KineticUI.Button({text:'Button'});
		stage.add(layer);
		layer.add(button);
		stage.batchDraw();
	</script>
</body>
</html>