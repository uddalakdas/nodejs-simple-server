var exec = require("child_process").exec,
    querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


function start(response,postData){
	console.log("Request handler 'start' was called");
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" method="post" enctype = "multipart/form-data">'+
	'<input type="file" name="upload" />'+
	'<input type="submit" value="Upload File" />'+
	'</form>'+
	'</body>'+
	'</html>';
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

	

function upload(response,request){
	console.log("Request handler 'upload' was called");
	var form = formidable.IncomingForm();
	
	form.parse(request,function(error,fields,files){
		fs.rename(files.upload.path,"C:/Users/Rishi/Documents/git/nodejs-simple-server/tmp/Penguins.jpg",function(error){
			if(error){
				fs.unlink("C:/Users/Rishi/Documents/git/nodejs-simple-server/tmp/Penguins.jpg");
				fs.rename(files.upload.path,"C:/Users/Rishi/Documents/git/nodejs-simple-server/tmp/Penguins.jpg");
			}
		});
	});
	
	response.writeHead(200,{"Content-Type":"text/html"});
		response.write("<h1>Recieved image: <br/>");
		response.write("<image src = '/show'/>")
		response.end();
}

function show(response,postData){
	console.log("Request handler 'show' was called");
	fs.readFile("C:/Users/Rishi/Documents/git/nodejs-simple-server/tmp/Penguins.jpg","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"text/plain"});
			response.write("Error :"+error);
			response.end();
		}else{
			response.writeHead(200,{"Content-Type":"image/jpeg"});
			response.write(file,"binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;