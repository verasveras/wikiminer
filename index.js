const request = require('request');
const utils = require ('./utils');

// For markdown removal
const strip = require('strip-markdown');
const remark = require('remark');
const processor = remark().use(strip);

// Title of the page exactly as it appears!
let articleTitle = 'Dogs'; /* TODO Figure out how well this works */

request('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&titles=dog', function (error, response, body) {

  if (!error && response.statusCode == 200) {

  	/* TODO go through response header to see if you found one */

  // body = processor.process(body);
	// let finalBody = String(body);

	// let regExp = / {{.*}} /
	// let matches = finalBody.match(regExp);
	let json = JSON.parse(body);
	jsonPages = json.query.pages;

	for (var property in jsonPages) {
		let text = jsonPages[property].extract;
		text = processor.process(text);
		text = String(text);
    	console.log(utils.topWords(text));
		// console.log(text);
	}


	// let regExp = /dogs/
	// body = body.replace(regExp, '');
	// console.log(body);

  }

})
