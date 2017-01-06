##Wikiminer
***

###About
Wikiminer is a wrapper for the Wikipedia API that provides data mining functionality. By simply providing the title of a Wikipedia article, Wikiminer returns a promise, passing through an object that contains:

- the text of that article
- the text of that article stripped of stopwords
- an array containing the most common words in the article and their occurences
- an array containing the least common words in the article and their occurences

###Usage
```
npm install wikiminer
```


``` javascript
const wikiminer = require('wikiminer');
wikiminer(*title*, *topCount*, *leastCount*);
```

- **title**: String, must be a valid title of a Wikipedia page.
- **topCount**: Number, number of words to include in most common words list. Default: 20
- **leastCount**: Number, number of words to include in least common words list. Default: 20

**result structure**
{	text: '',
	textMinusStop: '',
	topWords: [],
	leastWords: []
}

###Example

The following example

``` javascript
const wikiminer = require('wikiminer');

wikiminer('dog', 5, 5)
.then(function(result){
  console.log(result)
})
```

Will print to the console:

``` javascript
{
  text: /*the text of the dog article*/,
  textMinusStop: /*the text of the dog article without stop words */ ,
  topWords:[ { word: 'dog', count: 345 },
     { word: 'human', count: 60 },
     { word: 'wolf', count: 48 },
     { word: 'breed', count: 47 },
     { word: 'pet', count: 40 } ],
  leastWords: [ { word: 'inadequate', count: 1 },
     { word: 'taxa', count: 1 },
     { word: 'colour', count: 1 },
     { word: 'sobriquet', count: 1 },
     { word: 'etymology', count: 1 } ]
}
```

