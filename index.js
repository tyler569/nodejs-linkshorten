var http = require('http');
var url = require('url');
var mysql = require('mysql');

var settings = require('./settings.json');
sql = mysql.createConnection(settings.mysql);

sql.connect(function(err) {
	if (err) throw err;
});
sql.query('CREATE TABLE IF NOT EXISTS urls (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, url VARCHAR(100));');

http.createServer(function (req, res) {
	if (req.url === '/favicon.ico') {
		return;
	}
	var parsedURL = url.parse(req.url, true);
	var id = url.parse(req.url, true);
	var remoteIP = req.connection.remoteAddress
	if (parsedURL['pathname'] === '/'){
		var queryAsObject = parsedURL.query;
		var getURL = queryAsObject['url'];
		var getID = queryAsObject['id'];
		if (typeof getURL != 'undefined' && typeof getID === 'undefined') {
			sql.query('INSERT INTO urls VALUES (id, ?);', [getURL], function(err, result){
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'text/plain'})
				var idOut=result.insertId.toString();
				res.end('Your id is: '+idOut);
				console.log(getURL+' saved by '+remoteIP+' at id '+idOut);
			});
		} else if (typeof getID != 'undefined' && typeof getURL === 'undefined') {
			sql.query('SELECT url FROM urls WHERE id=?;', [getID], function(err, rows){
				if (err) throw err;
				urlOut=rows[0].url;
				if (url.parse(urlOut)['protocol'] === null){
					urlOut = 'http://'+urlOut;
				}
				res.writeHead(301, {'Location': urlOut});
				res.end();
				console.log(urlOut+' requested by '+remoteIP);
			});
		} else {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Landing page TBI here');
		}
	} else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end("File Not Found");
	}
}).listen(settings.nodejs_port, settings.nodejs_ip);
console.log('Server Running');

