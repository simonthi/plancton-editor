<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="/static/css/style.css" title="" type="text/css">
</head>
<body>
	<nav>
		<h1>P L A N C T O N</h1>
		<hr>
		
		<div id="interface_nav">
		</div>
		<div id="global_nav">
		</div>
	</nav>

	<section id="content" class="set">
		<div id="typewriter">
			<input type="text" data-sentence="Aabcdefghy" name="" id="editor" value="Aa">
			<input type="button" onclick="writeJson(false);" name="" id="btn_all" value="all">
			<div id="svgContainer"></div>	
		</div>
		<div id="editor_mp">
		</div>
		<div id="setchart">
		% for chart in setchart:
		<div class="chart">
			<div class="info">
				<span class="key">key : {{ chart }}</span>
			</div>
				<img class="imgChar" src="files/output-svg/{{ chart }}.svg?random={{ rand }}" />
		</div>
		% end
		</div>
	</section>
</body>
	<script charset="utf-8" src="static/js/functions.js" ></script>
	<script charset="utf-8" src="static/js/main.js" ></script>
	<script charset="utf-8" src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.01/ace.js" ></script>
	<script>
		var editor_mp = ace.edit("editor_mp");
			editor_mp.getSession().setMode("ace/mode/java");
	</script>
</html>
