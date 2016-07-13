stop = 1;
key = ''

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		//console.log(request.message);
		if(request.message == "open"){
			chrome.tabs.create({"url" : request.url})
			chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
				if(stop){
					key = request.key
					stop = 0;
					isItLive(tabs[0].id);
				}
			})
		}
		if(request.message == "stop"){
			stop = 1;
		}
})

function isItLive(tab){
	if(!stop){
		//console.log(tab);
		chrome.tabs.sendMessage(tab, {"message" : "check", "key" : key});
		setTimeout(function(){isItLive(tab)},1000);
	}
}