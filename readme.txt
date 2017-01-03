Wikiminer is a wrapper for the Wikipedia API that provides data mining functionality. By simply providing the title of a Wikipedia article, Wikiminer will provide you an object that contains:

- the text of that article
- the text of that article stripped of stopwords
- the x amount of most common words
- the y amount of least common words

const wikiminer = require('wikiminer');
wikiminer('dogs', x, y); 

{	text: '',
	textMinusStop: '',
	top_words: [],
	least_words: []
}


