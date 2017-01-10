module.exports = function(){
	var request = require('request');
	const Promise = require("bluebird");
	const utils = require ('./utils');
	const strip = require('strip-markdown');
	const remark = require('remark');
	const processor = remark().use(strip);

	return function(title, topCount=20, leastCount=20){
		const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&format=json&titles=${title}`
		request = Promise.promisify(request);
		return request(url)
		.then((response) => {
			const jsonPages = JSON.parse(response.body).query.pages;
	 		let fullText = '';

	 		for (let property in jsonPages) {
	 			if (!jsonPages[property].extract && !fullText) throw new Error(`Unable to find page with title ${title}`);
				let text = jsonPages[property].extract;
				text = processor.process(text);
				fullText += ` ${text}`
			}

			const redirect = new RegExp(`${title} may refer to:`, 'i');
			const redirect2 = new RegExp(`${title} can refer to:`, 'i');
			if (redirect.test(fullText) || redirect2.test(fullText) ) throw new Error(`"${title}" may refer to multiple pages. Please enter a more specific title`)

			let noStopWords = utils.noStopwords(fullText)

			return {
				text: fullText,
				textMinusStop: noStopWords,
				topWords: utils.topWords(noStopWords, topCount),
				leastWords: utils.worstWords(noStopWords, leastCount)
			}
		})
		.catch(console.error)
	}
}();
