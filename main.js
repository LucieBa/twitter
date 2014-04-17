
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

/*app.get('/', function(request, result){

	//On récupère nos Infos
	client.hgetall(id+':user',function(err,val)
		{	
			result.render('index.html.twig', {
				nom:val.nom,
				prenom:val.prenom,
				pseudo:val.login
			});
		});

	//Je récupère mes tweets
	client.ZREVRANGE(id+':tweets',-2,-1,'withscores',function(err,val)
	{	
		var time = 1;
		var message = "";
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
		/*var myTweet = new Array();
		myTweet[0] = new Array("id"=>1, "message"=> "test", "time" => "123456");
		myTweet[1] = new Array("id"=>2, "message"=> "prout", "time" => "123456");*/
		/*myTweet.forEach(console.log(myTweet));*/
		result.render('index.html.twig', myTweet);
	});

	//Je récupère les tweets des gens que je suis
	/*client.lrange(id+':following',-1000,+1000,function(err,val)
	{	

	});*/

	// Je récupère les infos
	//Nombre de tweets
	client.ZREVRANGE(id+':tweets',-2,-1,'withscores',function(err,val)
	{	
		var nombreTweet = val.length;
		result.render('index.html.twig', nombreTweet);
	});
	//Nombre de following
	client.llen(id+':following',function(err,val)
	{	
		var nombreFollowing = val;
		result.render('index.html.twig', nombreFollowing);
	});
	//Nombre de followers
	client.llen(id+':following',function(err,val)
	{	
		var nombreFollowers = val;
		result.render('index.html.twig', nombreFollowers);
	});



});*/

app.post('/publishtweet', function(request, result){
	client.zadd(id+':tweets',new Date().getTime(),"Test");
});

app.get('/following', function(request, result){
		result.render('liste.html.twig');
});

app.get('/followers', function(request, result){
		result.render('liste.html.twig');
});

app.listen(8080);









