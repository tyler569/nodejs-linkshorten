var http = require('http');
var url = require('url');
var r = require('rethinkdb')
var settings = require('./settings.json');
r.connect({host: settings.rethinkdb_ip}, function(err, conn){
	http.createServer(function (req, ress) {
		if(req.url === '/favicon.ico'){
			return;
		}
		var parsedURL = url.parse(req.url)
		if(parsedURL['pathname'] === '/shorten'){
			var parsedUrl = url.parse(req.url, true);
			var queryAsObject = parsedUrl.query;
			var getURL = queryAsObject['url'];

			if (typeof getURL != 'undefined') {


				r.db('URL_Shortening').table('urls').insert({'url':queryAsObject['url']}).run(conn, function(err, res) {
					if(err) throw err;
					id = res['generated_keys'];
					console.log(id['0']);
					ress.writeHead(200, {'Content-Type': 'text/plain'});
					ress.end(id['0']);
				});

			}else{
				ress.writeHead(200, {'Content-Type': 'text/plain'});
				ress.end("Please insure you have included a URL");
			}

		}else if(parsedURL['pathname'] === '/url'){

			var parsedUrl = url.parse(req.url, true);
			var queryAsObject = parsedUrl.query;
			var id = queryAsObject['id'];
			if (typeof id != 'undefined') {


				r.db('URL_Shortening').table("urls").filter({"id": id}).pluck("url").limit(1).run(conn, function(err, res)  {
					if(err) throw err;
					res.toArray( function(error, results) {
						var urlData = results['0'];
						ress.writeHead(200, {'Content-Type': 'text/plain'});
						ress.end(urlData['url']);
					})
				});

			}else{
				ress.writeHead(200, {'Content-Type': 'text/plain'});
				ress.end("Please insure you have included a ID");
			}
		}else{

			ress.writeHead(404, {'Content-Type': 'text/plain'});
			ress.end("File Not Found");
		}
	}).listen(80, settings.nodejs_ip);
console.log('Server Running');

});
