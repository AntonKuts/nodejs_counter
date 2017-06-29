var http = require("http");
var fs = require("fs");
let counter = 0;
var d = new Date();

http.createServer(function(request, response){
	var url = request.url;
	console.log(url);
	switch(url) {
			case '':
  		case '/main':
  		loadPage('main');
			break;
		case '/contacts':
  		loadPage('contacts');
			break;
		case '/about':
  		loadPage('about');
			break;
		case '/main.css':
		response.writeHead(200, {'Content-Type':'text/css'});
		fs.createReadStream('main.css').pipe(response);
		break;
  		default:
 			loadPage('404');
 		break;
}

function loadPage(filename){
	fs.readFile('Template/header.html', function(error, data){
		var h = data.toString();
		fs.readFile(filename+'.html', function(error, data){
			h = h + data.toString();
			if (url != "404" || url != "favicon.ico") {
				counter = counter + 1;
					fs.readFile('text.txt', (err, data) => {
						if (err) throw err;
						var text = data.toString();
							fs.writeFile('res.log', text + ' ' + counter + '. ' + d + ' ---- ' + url + ' ' + '\n', (err) => {
								if (err) throw err;
								console.log('The file has been saved!');
							});

					});
				}
			h = h.replace("{counter}", counter)
			fs.readFile('Template/footer.html', function(error, data){
				h = h + data.toString();
				response.end(h);
				console.log('url --- ' + url);

				return;
			});
		});
	});
}
}).listen(3000);
