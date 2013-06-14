function update_notelist() {
	$("#notelist_content").empty()
	for (key in localStorage) {
		if (key.search(/^note_/) == 0) {
			var title = key.substr(5);
			var content = localStorage[key];
			var editbtn = $(document.createElement("button"))
				.text("E")
				.click({note: title}, edit_note);
			var delbtn = $(document.createElement("button"))
				.text("-")
				.click({note: title}, delete_note);
			var link = $(document.createElement("a"))
				.text(title)
				.attr("href", "#")
				.click({note: title}, open_note)
			var line = $(document.createElement("div"))
				.append(delbtn)
				.append(editbtn)
				.append(" ")
				.append(link);
			$("#notelist_content").append(line);
		}
	}
}

function add_note() {
	localStorage["note_" + $("#noteadd_title").val()] = $("#noteadd_content").val();
	$(this).dialog("close");
	update_notelist();
	noteadd_clear();
}

function edit_note(e) {
	$("#noteadd_title").val(e.data.note);
	$("#noteadd_content").val(localStorage["note_" + e.data.note]);
	$("#noteadd").dialog("open");
}

function noteadd_clear() {
	$("#noteadd_title").val("");
	$("#noteadd_content").val("");
}

function noteadd_cancel() {
	$(this).dialog("close");
	noteadd_clear();
}

function open_note(e) {
	var title = e.data.note;
	var content = localStorage["note_" + title];
	$("#noteview_title").text(title);
	$("#noteview_content").html(content);
}

function delete_note(e) {
	localStorage.removeItem("note_" + e.data.note);
	update_notelist();
}

function clear_caches() {
	for (key in localStorage)
		if (key.search(/^cache_/) == 0)
			localStorage.removeItem(key);
}

function clear_ls() {
	localStorage.clear();
}

function execute_cmd() {
	if (res = /^#(.*?)###(.*)$/.exec(location.hash)) {
		localStorage["note_" + res[1]] = res[2];
	}
	window.location = "#";
}

function init() {
	execute_cmd();
	$("#notelist").dialog({
		title: "Note Overview",
		minHeight: 600,
		minWidth: 300,
		position: {
			my: "left top",
			at: "left top",
			of: "body"
		}
	});
	$("#noteview").dialog({
		title: "Note Viewer",
		minHeight: 600,
		minWidth: 600,
		position: {
			my: "center center",
			at: "center center",
			of: "body"
		}
	});
	$("#noteadd").dialog({
		title: "Add Note",
		autoOpen: false,
		modal: true,
		minHeight: 400,
		minWidth: 700,
		position: {
			my: "center center",
			at: "center center",
			of: "body"
		},
		buttons: {
			"Add": add_note,
			"Clear": noteadd_clear,
			"Cancel": noteadd_cancel
		}
	});
	$("#debugfunc").dialog({
		title: "Debug Functions",
		autoOpen: false,
		position: {
			my: "right bottom",
			at: "right bottom",
			of: "body"
		},
		buttons: {
			"Clear Caches": clear_caches,
			"Clear LocalStorage": clear_ls
		}
	});
	$("#banner").click(function() {
		$("#debugfunc").dialog("open");
	});
	$("#btn_add")
		.button()
		.click(function() {
			$("#noteadd").dialog("open");
		});
	update_notelist();
}

$(init);