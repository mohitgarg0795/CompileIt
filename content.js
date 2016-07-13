lang_map = {
	'B': 'C',
	'C': 'C++',
	'O': 'CLOJURE',
	'S': 'C#',
	'A': 'JAVA',
	'J': 'JAVASCRIPT',
	'H': 'HASKELL',
	'L': 'PERL',
	'K': 'PHP',
	'P': 'PYTHON',
	'R': 'RUBY'
}

alt_pressed = false

$(document).keydown(function(event){
	var char = event.which || event.keyCode;
	if(char==18)
		alt_pressed = true;
	console.log(char);
	char = String.fromCharCode(char)
	console.log("key down" + char);
	if(alt_pressed && char in lang_map){
		alt_pressed = false;
		console.log("yes its copied");
		document.execCommand('copy');
		chrome.runtime.sendMessage({"message" : "open", "url" : "https://apnaide.herokuapp.com", "key" : char });		
	}
})

$(document).keyup(function(event){
	var char = event.which || event.keyCode;
	if(char==18)
		alt_pressed = false;
	console.log("key up" + char);
})

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		//console.log(request.message);
		document.execCommand('paste');
		console.log("here is the key" + request.key);
		var lang = lang_map[request.key];
		$('#lang option').filter(function () { return $(this).html() == lang; }).prop('selected', true)
		$("#submit").click();
		chrome.runtime.sendMessage({ "message" : "stop" });
})
