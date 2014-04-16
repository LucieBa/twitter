
function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}



// Variables
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

app.use(express.static(__dirname));

app.get('/', function(request, result){
	client.ZREVRANGE(id+':tweets',-2,-1,'withscores',function(err,val)
	{	
		var time = 1;
		var tweet = 0;
		var taille = val.length/2;

		for (var i = 0; i < taille; i++) {
			var tweet = new Array();
				tweet[i]["timestamp"] = val[time];
				tweet[i]["message"] = val [tweet];
			time = time + 2 ;
			tweet = tweet + 2;
		};
		result.render('index.html.twig', tweet);
	});
	client.hgetall(id+':user',function(err,val)
		{	
			result.render('index.html.twig', {
				nom:val.nom,
				prenom:val.prenom,
				pseudo:val.login
			});
		});

});

app.post('/publishtweet', function(request, result){
	client.zadd(id+':tweets',new Date().getTime(),"Test");
});

app.listen(8080);









