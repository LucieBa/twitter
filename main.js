
var http = require('http');
var express = require('express');

var app = express();

var redis = require('redis');
// sinon pour garantiadata
var client = redis.createClient({
  host: 'pub-redis-12644.us-east-1-3.2.ec2.garantiadata.com',
  port: 12644
}); 

var id = 1; // Connecté en tant que Marie Noiret

var tweet = new Array();
	tweet["pseudo"] = "Lucie";
	tweet["timestamp"] = 8;
	tweet["message"] = "Coucou bande de nouilles";

app.use(express.static(__dirname));

app.get('/', function(request, result){
	result.render('index.html.twig', tweet);
	/*var name;
	client.hgetall(id+':user',function(err,val)
		{	
			result.render('index.html.twig', {
				nom:val.nom,
				prenom:val.prenom
			});
		});*/

});

/*app.post('/publishtweet', function(request, result){
	client.zadd(id+':tweets',new Date().getTime(),request.query.champTweet);
});*/

app.listen(8080);






