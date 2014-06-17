var sys = require("sys");
var fs = require("fs");
var request = require("supertest");
var filename = "dataLog.txt"
var stdin = process.openStdin();

console.log("Enter your address:")
stdin.addListener("data", function(d) {
    var address = d.toString().substring(0, d.length-1);
    var start = new Date().getTime();
    var googleAddress = address.replace(/ /g, "+");
    var googleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+googleAddress
	googleReq = request(googleURL);
	googleReq.get('/').expect(200, function(err, res){
		if (err){
			console.log('Something has gone wrong while contacting Google!\n Error: '+err);
		}else {
			var lat = res.body.results[0].geometry.viewport.northeast.lat;
			var lng = res.body.results[0].geometry.viewport.northeast.lng;

			console.log("Coordinates: "+lat+", "+lng);
			var forecastURL = 'https://api.forecast.io/forecast/138d58623b6d2fba8931d322cfc95612/'+lat+','+lng
			forecastReq = request(forecastURL);
			forecastReq.get('/').expect(200, function(err, res){
				if (err){
					console.log('Something has gone wrong while getting the forecast!\n Error: '+err);
				}else {
					var weather = res.body.currently.summary
					var end = new Date().getTime();
					var time = (end - start)/1000;
					console.log('Time taken to obtain coordinates and weather: '+time+' seconds');
					console.log("Current conditions:"+weather);
					var myDate = new Date(res.body.currently.time*1000);
					myDate = myDate.toLocaleString();
					console.log("Date and time: "+myDate);
					var text = address+'\n'+lat+', '+lng+'\n'+weather+'\n'+myDate+'\n\n'
					fs.appendFile(filename, text, function (err) {
						if (err){
							console.log('Something has gone wrong while writing!\n Error: '+err);
						}else {
							console.log('Data have been written to '+filename+'\n');
							console.log('Enter a new address or press cntrl C to exit:');
						}	
					});
				}
			});
		}
	});
});