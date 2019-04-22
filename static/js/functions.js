let typewriter = document.getElementById('svgContainer')
let editor = document.getElementById('editor')
let inputsRange = document.getElementsByClassName('input_range')
let globalNav = document.getElementById('global_nav')
let btn_inkscape = document.getElementsByClassName('inkscape'); 
let btn_refresh = document.getElementsByClassName('refresh'); 
let btn_all = document.getElementById('btn_all'); 
let imgs = document.getElementsByClassName('imgChar')	

var sentence = editor.value

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function readJson(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

function loadSvg(key) {
	xhr = new XMLHttpRequest()
	xhr.open("GET", "files/output-svg/" + key + ".svg?random=" + getRandomInt(3000), false)
	xhr.overrideMimeType("image/svg+xml")
	xhr.send("")
	toolsBar = '<span class="tools_bar"  data-key="' + key + '" ><span class="inkscape" >inkscape</span> <span class="refresh" id="refresh_' + key + '" >-> mpost</span></span>'
	p = '<span data-key="' + key + '" id="i_' + key + '" class="cadratin" >' + toolsBar + xhr.responseXML.documentElement.outerHTML + '</span>'
	typewriter.innerHTML += p	
}

function inputBuild(variablesTable, i) {
	var table = variablesTable[i]

	var p = []
	for (u in table){
		if(table[u].type) {
			var input = document.createElement("input")
			input.type = table[u].type;
			input.className = "input_" + table[u].type 
			input.id = "input_" + u
			input.setAttribute('title', table[u].description)
			input.setAttribute('data-var', u)
			if (table[u].type == 'range') {
				input.setAttribute('min', table[u].range[0])
				input.setAttribute('max', table[u].range[1])
				input.setAttribute('step', table[u].range[2])
				input.setAttribute('value', table[u].value)
			}
			p += '<div class="block_input" ><label>' + table[u].description + ' | <span id="span_' + u + '" class="valueBox">' + table[u].value + '</span></label>' + input.outerHTML + '</div>'
		}
	}
	globalNav.innerHTML += '<div class="items" id="' + i + '" ><h1>' + i + '</h1>' + p + '</div>'

}

function buildNav(data) {
	var glob = data.variables
	for (i in glob){
		inputBuild(glob, i)
	}
}

function writeJson(data){
	typewriter.innerHTML = ''
	typewriter.className = "loading"

	if (data == false) {
		data = false
		var sentence = '-all'
	}else {
		var sentence = editor.value
	}
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4)
		{
			var sentence = editor.value
			writeValue(sentence)	
			if (data == false) {
				for(img in imgs) {
					var re = imgs[img].src
					imgs[img].src = re + '2'
				}
			}
			typewriter.classList.remove("loading")
		}
	}
	xmlhttp.open('POST', '/write', true);
	xmlhttp.send('json=' + JSON.stringify(data,  null, 4) + '&set=' + sentence);
}

function changeValue(data){
	for (var i = 0, len = inputsRange.length; i < len; i++) {
		inputsRange[i].addEventListener('change', function() {
			var val = this.value
			var vari = this.getAttribute('data-var')
			var cat = this.closest('.items').id
			sp = document.getElementById('span_' + vari)
			sp.innerHTML = val
			data.variables[cat][vari].value = val
			console.log(data)
			writeJson(data, false)
		});
	}
}

function writeValue(stn) {
	typewriter.innerHTML = ""
	stn = sentence.split('')
	stn.forEach(function(entry) {
		code = entry.charCodeAt(0)
		loadSvg(code)
	});
	var l = location.hash

	if (l.substring(0, 6) == '#edit-') {
		l = l.split("-")
		var act = document.getElementById('i_' + l[1]); 
		act.classList.add('activeInks')
	}
	activeInks()
	refreshInks()
}

function activeInks() {
	for (var i = 0, len = btn_inkscape.length; i < len; i++) {
		btn_inkscape[i].addEventListener('click', function(){
			var key = this.parentElement.getAttribute('data-key')
			var xmlhttp = new XMLHttpRequest()
			xmlhttp.onreadystatechange = function()
			{
				if (xmlhttp.readyState == 4)
				{
					console.log('yes')
				}
			}
			xmlhttp.open('POST', '/inkscape', true)
			xmlhttp.send('key=' + key)

			var cadra = this.parentElement.parentElement
			cadra.classList.add('activeInks')
			location.hash = 'edit-' + key

		}, false)
	}
}

function refreshInks() {
	for (var i = 0, len = btn_refresh.length; i < len; i++) {
		btn_refresh[i].addEventListener('click', function(){
			var key = this.parentElement.getAttribute('data-key')
			var xmlhttp = new XMLHttpRequest()
			xmlhttp.onreadystatechange = function()
			{
				if (xmlhttp.readyState == 4)
				{
					sentence = editor.value
					writeValue(sentence)
				}
			}
			xmlhttp.open('POST', '/updateMp', true)
			xmlhttp.send('key=' + key)
		}, false)
	}
}

window.addEventListener('DOMContentLoaded', function(){
	readJson("files/global-1.json", function(text){
		var data = JSON.parse(text)
		buildNav(data)
		changeValue(data)
	})

	editor.addEventListener('input', function() {
		sentence = this.value
		writeValue(sentence)
	})

	writeValue(sentence);
	activeInks()
	refreshInks()
	btn_all.addEventListener('click',function(e){	
		writeJson(data, true)
	})

})

