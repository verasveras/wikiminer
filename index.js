var request = require('request');
const Promise = require("bluebird");
const utils = require ('./utils');

// For markdown removal
const strip = require('strip-markdown');
const remark = require('remark');
const processor = remark().use(strip);


module.exports = function(){


	return function(title, topCount, leastCount){

		const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&titles=${title}`
		request = Promise.promisify(request);
		return request(url)
		.then((response) => {

			console.log(response);	

			let json = JSON.parse(response.body);
	 		let jsonPages = json.query.pages;
	 		let fullText = ''; 

	 		for (var property in jsonPages) {
				let text = jsonPages[property].extract;
				text = processor.process(text);
				fullText += ` ${text}`
			}

			let noStopWords = utils.noStopwords(fullText)

			return {
				text: fullText, 
				noStopWords: noStopWords,
				topWords: utils.topWords(noStopWords), 
				leastWords: utils.worstWords(noStopWords) 
			}
		})
		.catch((error) =>{
			/* Soon!!! */
		})


	}
}();
