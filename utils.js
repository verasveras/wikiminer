const pluralize = require('pluralize');
const stopword = require('stopword');

function getWordCount(text){
    let seen = {};
    //let words = text.toLowerCase().replace(/\W/, '').split(/\s+/);
    let words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\d]/g,"").split(/\s+/);

    // go through each word, singularizing them.
    words.forEach(word =>{
      let singularWord = pluralize.singular(word);
      seen[singularWord] = seen[singularWord] ? seen[singularWord] + 1 : 1;
    })

    return seen;
}

function makeDict(words, counts){
  let dict = {};
  words.forEach(function(word, idx){
    dict[word] = counts[idx];
  })
  return dict;
}

module.exports = {
  topWords: function(text){

    const seen = getWordCount(text)

    let topWords = [];
    let topCounts = [];

    for (let word in seen){
      if (topWords.length < 20) {
        topWords.push(word)
        topCounts.push(seen[word]);
      }
      else {
        let min = Math.min(... topCounts);
        if (seen[word] > min){
          let index = topCounts.indexOf(min);
          topWords[index] = word;
          topCounts[index] = seen[word];
        }
      }
    }

    return makeDict(topCounts, topWords);

  },

  noStopwords: function(text){
    text = text.split(/\s+/);
    return stopword.removeStopwords(text).join(' ');

  },

  getWordCount: function(text){

  },

  worstWords: function(text){
    const seen = getWordCount(text);
    let worstWords = [];
    let worstCounts = [];

    for (let word in seen){
      if (worstWords.length < 20) {
        worstWords.push(word)
        worstCounts.push(seen[word]);
      }
      else {
        let max = Math.max(... worstCounts);
        if (seen[word] < max){
          let index = worstCounts.indexOf(max);
          worstWords[index] = word;
          worstCounts[index] = seen[word];
        }
      }
    }

    return makeDict(worstWords, worstCounts);
  }

}
