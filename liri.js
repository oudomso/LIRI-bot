require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment");


var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;


var command = process.argv[2];
var search = process.argv[3];

switch (command) {
    case "concert-this":
        concertSearch(search);
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
        if(!search){
            movieSearch("Mr Nobody");
        }
        else{
            movieSearch(search);
        }
        break;
    case "do-what-it-say":
        doStuff();
        break;
}
function doStuff(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        var instruction =dataArr[0];
      var things = dataArr[1];
      switch (instruction) {
        case "concert-this":
            concertSearch(things);
            break;
        case "spotify-this-song":
            if(things){
                spotifySearch(things);
            }
            else{
                spotifySearch("The Sign - Ace of Base");
            }
            break;
        case "movie-this":
            if(!things){
                movieSearch("Mr Nobody");
            }
            else{
                movieSearch(things);
            }
            break;
    }
      
      });
      
      
}
function movieSearch(title){
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    axios
    .get(queryUrl)
    .then(function(response) {
        var movie = response.data;
        console.log("******************************");
        console.log("Result for "+ title + " is: ");
        console.log(movie.Title);
        // * Title of the movie.
        console.log(movie.Year);
        // * Year the movie came out.
        console.log(movie.imdbRating);
        // * IMDB Rating of the movie.
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Country of Production: "+ movie.Country)
        // * Country where the movie was produced.
        console.log("Language: " + movie.Language);
        // * Language of the movie.
        console.log(movie.Plot);
        // * Plot of the movie.
        console.log("Actors and Actress: "+ movie.Actors);
        // * Actors in the movie.
        console.log("******************************");
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

function concertSearch(bandName){
    

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

    axios
    .get(queryUrl)
    .then(function(response) {
        var details = response.data[0];
       
        console.log("Result for "+ bandName + " Concert: ");
        console.log(details.venue.name);
        console.log(details.venue.city + ", " + details.venue.country);

        var date = moment(details.datetime).format("MM/DD/YYYY");
        console.log(date);
        console.log("*******************************");
        
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
            console.log("*******************************");
            
        } else {
        console.log('Warning, Error Found');
        }
    });
}