
// Variables
var http = require('http');
var express = require('express');
var async = require('async');

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

	//On récupère nos Infos
	client.hgetall(id+':user',function(err,val)
	{	
		var info = val;
		var tweets = Array();
		// Je récupère les infos
		//Nombre de tweets
		client.ZREVRANGE(id+':tweets',-2,-1,'withscores',function(err,val)
		{	
			var nombreTweet = val.length;
			//Nombre de following
			client.llen(id+':following',function(err,val)
			{	
				var nombreFollowing = val;
				//Nombre de followers
				client.llen(id+':followers',function(err,val)
				{	
					var nombreFollowers = val;

					// Affichage des tweets
					client.lrange(id+':following',-100,100,function(err,val)
					{
						var listeFollowers = val;
						listeFollowers.push(id);
						async.each(listeFollowers, function(followers, callback){
							client.hget(followers+':user','login',function(err,val){
								var login = val;
								client.ZREVRANGE(followers+':tweets',0,-1,'withscores',function(err,val){
									var listeTweetByUser = val;
									var j = 0;
									async.each(listeTweetByUser, function(tweet, callback){
										//Faire un tableau qui contient tous le tweet
									});

									console.log(tweets);
								});
							});
							callback();
						}, function(){
							result.render('index.html.twig',{
								nom : info.nom,
								prenom: info.prenom,
								login: info.login,
								nombreTweet: nombreTweet,
								nombreFollowers : nombreFollowers,
								nombreFollowing : nombreFollowing
							});
							
						});
					});
				});
			});
		});
	});
});


app.post('/publishtweet', function(request, result){
	//Pas réussi la récupération de la valeur contenu dans le champs texte
	client.zadd(id+':tweets',new Date().getTime(),"Test");
});

app.get('/following', function(request, result){
		result.render('liste.html.twig');
});

app.get('/followers', function(request, result){
		result.render('liste.html.twig');
});

app.listen(8080);
