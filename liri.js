require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;


var command = process.argv[2];
var search = process.argv[3];

switch (command) {
    case "concert-this":
        concertSearch();
        break;
    case "spotify-this-song":
        if(search){
            spotifySearch(search);
        }
        else{
            spotifySearch("The Sign - Ace of Base");
        }
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-say":
        doStuff();
        break;
}


function concertSearch(bandName){
    

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

    axios
    .get(queryUrl)
    .then(function(response) {
        
        
    })
    .catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}


function spotifySearch(title){
    spotify.search({ type: 'track', query: title, limit: 1}, function(error, data){
        if(!error){
            var songData = data.tracks.items[0];
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song: " + songData.name);
            console.log("Preview URL: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
            console.log("-----------------------");
            
        } else {
        console.log('Warning, Error Found');
        }
    });
}