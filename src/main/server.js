var http = require("http");
var url = require("url");
function start (route,handle) {
	

	http.createServer(function(request,response) {
		var pathname = url.parse(request.url).pathname;
		
		if(pathname != '/favicon.ico'){
			console.log("Request for "+pathname+" recieved ");
			route(handle,pathname,response,request);
			
			
		}
		
		
	}).listen(8888, function(){
		console.log('Server started at port 8888');
	});
}
exports.start = start;
