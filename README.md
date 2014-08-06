nodejs-linkshorten
======================

### A link shortener made in node.js using MySQL as a backend
Using Docker
------------
* Clone this repository and update your settings.json to fit your needs, then
* Run `docker build -t node-links .` in this directory
* Docker will then compile the image you will run the app from.
* When it is done, use `docker run` to run the image, making sure to link to a MySQL comtainer
* As an example, this is how I start this comtainer on my server: This may not work for everyone:
* `docker run -d --name node-links --link mysql:mysql node-links`

Manual Install
--------------
* Update settings.json to fit your needs
* Run: `npm install mysql` and  `npm install url` to install the dependencies
* Then start the server with `nodejs server.js`

How to use
----------
* To generate a link vist `http://HOST/?url=` and fill in the url.
* for instance, `http://HOST/?url=http://google.com`
* Which would perhaps generate a link with the id `2` for example
* I can then use this to retrieve the url associated with that id.
* `http://HOST/?id=2`
* Which will return with `http://google.com`, and redirect you to that site if possible.

