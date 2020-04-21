window.addEventListener('DOMContentLoaded', function(){
	// _KEY_ = document.getElementsByClassName('tools_bar')[0].getAttribute('data-key')
	_KEY_ = 65 
	// toogle('#editorBox .btn_file', ['active', 'desactive'])
	// toogle('nav .btn_file', ['active', 'desactive'])
	write_sentence(sentence);
	activeInks()
	shortcuts()

	stn = get_session('sentence')
	inputWrite.value = stn 
	write_sentence(stn)

	for (var i = 0, len = editors.length; i < len; i++) {
		aceEditor[i] = ace.edit(editors[i]);
		aceEditor[i].getSession().setMode("ace/mode/javascript");	
		loadMp(aceEditor[i], editors[i])
		refreshInks(aceEditor[i])
	}

	readJson("/projects/" + projectName + "/global.json?rand=" + getRandomInt(3000), function(text){
		var data = JSON.parse(text)
		buildNav(data)
		changeValue(data)
	})

	inputWrite.addEventListener('input', function() {
		sentence = this.value
		write_sentence(sentence)
	})

	svgContainer.style.transform = 'scale('+get_session('zoom')+')'
	inputZoom.addEventListener('change', function(i,item){
		svgContainer.style.transform = 'scale('+this.value+')'
		set_session('zoom', this.value)
	})

})
