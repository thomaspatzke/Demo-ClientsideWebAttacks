function jsload(url) {
	if (localStorage["cache_" + url] == undefined) {
		console.info("Cache miss for " + url);
		updatecache(url);
	} else {
		console.info("Cache hit for " + url);
		insertscript(url);
	}
}

function storecache(url, content) {
	localStorage["cache_" + url] = content;
}

function insertscript(url) {
	var script = document.createElement("script");
	script.innerHTML = localStorage["cache_" + url];
	document.head.appendChild(script);
}

function updatecache(url) {
	console.info("Loading for cache: " + url);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.onerror = function() {
		console.error("Error while loading " + url + ": " + xhr.statusText);
	}
	xhr.onload = function() {
		console.info("Succesfully loaded " + url);
		storecache(url, xhr.responseText);
		insertscript(url);
	}
	try {
		xhr.send(null);
	} catch(e) {
		console.error("Error while cache load: " + e);
	}
}