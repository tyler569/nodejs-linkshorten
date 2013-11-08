Node.JS-Link-Generator
======================

<h4>A link shortener made in node.js using MySQL as a backend</h4>
<h2><b>Install</b></h2>
Update settings.json with the IP of the machine Node.js is running on and a ip of a MySQL (or equivalent) server.
Update the SQL connection info in index.js to match your MySQL server's password and database name<br>
Run: <code>npm install mysql</code> <code>npm install url</code> to install the dependencies
Then start the server with <code>nodejs index.js</code>
<h2><b>How to use</b></h2>
To generate a link vist <code>http://HOST/?url=</code> and fill in the url.
<b>Example</b>
<code>http://HOST/?url=http://google.com</code><br>
Will in this case generate a link with the id <code>2</code>
I can then use this to retrieve the url associated with that id.
<code>http://HOST/?id=2</code><br>
Will return with <code>http://google.com</code>

