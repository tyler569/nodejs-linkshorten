var http = require('http');
var url = require('url');
var mysql = require('mysql');
var settings = require('./settings.json');

sql = mysql.createConnection({
	"host": "localhost",
	"user": "root",
	"password": "root",
	"database": "URL_Shortening"
});
sql.connect(function(err) {
	if (err) throw err;
})
sql.query('CREATE TABLE IF NOT EXISTS urls (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, url VARCHAR(100));')

http.createServer(function (req, ress) {
	if (req.url === '/favicon.ico') {
		return;
	}
	var parsedURL = url.parse(req.url)
	if (parsedURL['pathname'] === '/shorten'){
		var parsedUrl = url.parse(req.url, true);
		var queryAsObject = parsedUrl.query;
		var getURL = queryAsObject['url'];

		if (typeof getURL != 'undefined') {
			sql.query('INSERT INTO urls VALUES (id, ?);', [getURL], function(err, result){
				if (err) throw err;
				ress.writeHead(200, {'Content-Type': 'text/plain'})
				ress.end('Your key is: '+result.insertId.toString());
			});

		} else {
			ress.writeHead(200, {'Content-Type': 'text/plain'});
			ress.end("Please insure you have included a URL");
		}

	} else if(parsedURL['pathname'] === '/url') {

		var parsedUrl = url.parse(req.url, true);
		var queryAsObject = parsedUrl.query;
		var id = queryAsObject['id'];
		if (typeof id != 'undefined') {
			sql.query('SELECT url FROM urls WHERE id=?;', [id], function(err, rows){
				if (err) throw err;
				ress.writeHead(200, {'Content-Type': 'text/plain'});
				ress.end(rows[0].url);
			});

		} else {
			ress.writeHead(200, {'Content-Type': 'text/plain'});
			ress.end("Please insure you have included a ID");
		}
	} else {

		ress.writeHead(404, {'Content-Type': 'text/plain'});
		ress.end("File Not Found");
	}
}).listen(8081, settings.nodejs_ip);
console.log('Server Running');

