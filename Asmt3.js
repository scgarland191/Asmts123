var sys = require("sys");
var fs = require("fs");
var request = require("supertest");


/*
var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");
  });
 */
var googleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=320+SE+3rd+St,+Gainesville,+FL'
googleReq = request(googleURL);
googleReq.get('/').expect(200, function(err, res){
	var lat = res.body.results[0].geometry.viewport.northeast.lat;
	var lng = res.body.results[0].geometry.viewport.northeast.lng;
	console.log(lat+", "+lng);
	var forecastURL = 'https://api.forecast.io/forecast/138d58623b6d2fba8931d322cfc95612/'+lat+','+lng
	forecastReq = request(forecastURL);
		forecastReq.get('/').expect(200, function(err, res){
			console.log(res.body.currently.summary)
			console.log(res.body.currently.time)
		});
});