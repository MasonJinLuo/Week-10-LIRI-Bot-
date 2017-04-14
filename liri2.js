var key = require('./key.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs'); 

 	function tweets (){
		var params = {screen_name: 'masonjinluo'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (i = 0; i < 20; i++) {
		  	console.log("Screen name: " + tweets[i].user.screen_name);
		    console.log(tweets[i].created_at);
		    console.log("tweeted: " + tweets[i].text);
		    console.log("-----------------------------------------------------")
			}
		  }
		});
	}

	function spotifySong(){
		spotify.search({ type:'track', query: input }, function(err, data) {

		    var trackInfo = data.tracks.items[0]

		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 
		    console.log("Artist: " + JSON.stringify(trackInfo.artists[0].name))
		    console.log("Song: " + JSON.stringify(trackInfo.name))
		    console.log("Preview Link: " + JSON.stringify(trackInfo.preview_url))
		    console.log("Album: " + JSON.stringify(trackInfo.album.name))
		});
	}


	function movie(){
		request(queryUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
			console.log('Title: ', JSON.parse(body).Title);
			console.log('Year: ', JSON.parse(body).Year);
			console.log('IMDB Rating: ', JSON.parse(body).imdbRating); 
			console.log('Country: ', JSON.parse(body).Country);
			console.log('Language: ', JSON.parse(body).Language);
			console.log('Plot: ', JSON.parse(body).Plot);
			console.log('Actors: ', JSON.parse(body).Actors);
			console.log('Rotten Tomatoes Rating: ', JSON.parse(body).tomatoRating);
			console.log('Rotten Tomatoes URL: ', JSON.parse(body).tomatoURL);
			console.log('Rotten Tomatoes URL: ', JSON.parse(body).Ratings)
			}

		});

	}


if(process.argv[2] === "my-tweets"){
	var client = new Twitter({
	  consumer_key: key.twitterKeys.consumer_key,
	  consumer_secret: key.twitterKeys.consumer_secret,
	  access_token_key: key.twitterKeys.access_token_key,
	  access_token_secret: key.twitterKeys.access_token_secret
	});
 
	tweets();
}

if(process.argv[2] === "spotify-this-song"){

	
	var spotify = require('spotify');
	var input = process.argv.splice(3).join(" ");

	if(input === ""){
		input = "The Sign";
	}
	else{
		input = input
		}

	spotifySong();
}

if(process.argv[2] === "movie-this"){

var movieName = process.argv.slice(3).join(" ");

if(process.argv[3] === undefined){
	movieName = "Mr. Nobody"
}else{
	movieName = movieName
}


var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "}&y=&i=&plot=short&tomatoes=true&r=json";

 movie();
		

}

if(process.argv[2] === "do-what-it-says"){

 fs.readFile('random.txt', "utf8", function(error, data){
    var splitData = data.split(',');
	input = splitData[1];
    spotifySong();
  });

}
