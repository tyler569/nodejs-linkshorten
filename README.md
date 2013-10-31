Node.JS-Link-Generator
======================

<h4>A link generator made in Node.JS using RethinkDB as a backend</h4>

<h2><b>Install</b></h2>
Update settings.json with the IP of the machine Node.js is running on and a ip of a RethinkDB cluster

Run: <code>npm install rethinkdb</code> <code>npm install url</code> to install the dependencies

Then start the server with <code>node index.js</code>
<h2><b>How to use</b></h2>
To generate a link vist <code>http://HOST/url?=</code> and fill in the url.

<b>Example</b>

<code>http://HOST/shorten?=http://google.ca</code>

Will in this case generate a link with the id <code>291bc643-ad2a-46ea-a211-8d73db1c496f</code>

I can then use this to retrieve the url associated with that id.

<code>http://HOST/url?=291bc643-ad2a-46ea-a211-8d73db1c496f</code>

Will return with <code>http://google.ca</code>


<h2><b>Plans</b></h2>
<ul>
<li>Make the links shorter</li>
</ul>
