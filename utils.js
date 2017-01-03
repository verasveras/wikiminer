const pluralize = require('pluralize');
const stopword = require('stopword');

module.exports = {
  topWords: function(text){
    let seen = {};

    //let words = text.toLowerCase().replace(/\W/, '').split(/\s+/);
    let words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);

    // go through each word, singularizing them and capitalize.
    words.forEach(word =>{
      let singularWord = pluralize.singular(word);
      seen[singularWord] = seen[singularWord] ? seen[singularWord] + 1 : 1;
    })

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

    return [topCounts, topWords];

  },

  noStopwords: function(text){
    return stopword.removeStopwords(text);

  }

}
