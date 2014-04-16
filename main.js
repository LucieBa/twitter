
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

	//Je récupère mes tweets
	client.ZREVRANGE(id+':tweets',-2,-1,'withscores',function(err,val)
	{	
		var time = 1;
		var message = 0;
		var myTweet = new Array();
		var taille = val.length/2;

		for (var i = 0; i < taille; i++) {
				myTweet[i] = new Array();
				myTweet[i]["id"] = id;
				myTweet[i]["message"] = val [message];
				myTweet[i]["time"] = val[time];
			time = time + 2 ;
			message = message + 2;
		};

		result.render('index.html.twig', myTweet);
	});

	//Je récupère les tweets des gens que je suis
	client.lrange(id+':following',-1000,+1000,function(err,val)
	{	
		var id;
		for (var i = 0; i < val.length; i++) {
			var id = val[i];
				client.ZREVRANGE(id[i]+':tweets',-2,-1,'withscores',function(err,val)
				{	
					var time = 1;
					var message = 0;
					var tweet = new Array();
					tweet[id] = new Array();
					var taille = val.length/2;

					for (var i = 0; i < taille; i++) {
							tweet[id][i] = new Array();
							tweet[id][i]["id"] = id;
							tweet[id][i]["message"] = val [message];
							tweet[id][i]["time"] = val[time];
						time = time + 2 ;
						message = message + 2;
					};

					result.render('index.html.twig', tweet);
				});
		}
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









