var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();



var myFile = 'randFile.txt'
var text = chance.string()+'\n';
fs.appendFile(myFile, text, function (err) {
	if (err){
		console.log('Something has gone wrong while writing!\n Error: '+err);
	}
	console.log(myFile + ' has been added');
});


fs.readFile(myFile, 'utf8', function (err, data) {
	if (err){
		console.log('Something has gone wrong while reading!\n Error: '+err);
	}
	var numLines = data.split(/\r\n|\r|\n/).length;
	console.log("The program has been run "+numLines+" times since last creation/deletion.")
});