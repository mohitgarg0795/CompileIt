stop = 1;
key = '';
tabId = 0;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		//console.log(request.message);
		if(request.message == "open"){
			chrome.tabs.create({"url" : request.url}, function(tab){
				tabId = tab.id;
				key = request.key;
				stop = 0;
			})
		}
})

chrome.tabs.onUpdated.addListener(
	function(tabId, info){
		if(info.status == "complete" && stop==0)
			{
				chrome.tabs.sendMessage(tabId, {"message" : "check", "key" : key});
				stop = 1;
			}
})