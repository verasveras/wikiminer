module.exports = function(){
  const pluralize = require('pluralize');
  const stopword = require('stopword');
  function getWordCount(text){
      let seen = {};
      let words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\"\d]/g,"").split(/\s+/);
      words.forEach(word =>{
        let singularWord = pluralize.singular(word);
        seen[singularWord] = seen[singularWord] ? seen[singularWord] + 1 : 1;
      })

      return seen;
  }

  function makeDict(words, counts){
    let dict = [];
    words.forEach(function(word, idx){
      dict.push({word: word, count: counts[idx]})
    })
    dict.sort((a,b) => a.count - b.count)
    return dict;
  }

  return {
    topWords: function(text, count){
      const seen = getWordCount(text)
      let topWords = [];
      let topCounts = [];
      for (let word in seen){
        if (topWords.length < count) {
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
      return makeDict(topWords, topCounts);
    },

    noStopwords: function(text){

      text = (' ' + text).slice(1);
      text = text.split(/\s+/);
      return stopword.removeStopwords(text).join(' ');

    },

    worstWords: function(text, count){
      const seen = getWordCount(text);
      let worstWords = [];
      let worstCounts = [];

      for (let word in seen){
        if (worstWords.length < count) {
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
}();
