
var http = require('http');
var express = require('express');

var app = express();

var mael = "face de quetsch";

app.use(express.static(__dirname));

app.get('/', function(request, result){
	result.render('index.html.twig', {
		mael:mael
	});
});

app.listen(8080);



/*
var redis = require('redis');
// sinon pour garantiadata
var client = redis.createClient({
  host: 'pub-redis-12644.us-east-1-3.2.ec2.garantiadata.com',
  port: 12644
}); 
var user = 3;
client.lpush(user+':tweets', "Je tweet");
*/


