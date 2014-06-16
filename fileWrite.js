var fs = require('fs');
var myFile = 'newFile.txt'
var text = 'Hello World!\n'
fs.appendFile(myFile, text, function (err) {
	if (err){
		console.log('Something has gone wrong!');
		throw err;
	}
	console.log('Hello World! has been added');
});
