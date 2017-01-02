module.exports = {
  topWords: function(text){
    let seen = {};
    let words = text.toLowerCase().replace(/\W/, '').split(/\s+/);

    words.forEach(word =>{
      seen[word] = seen[word]? seen[word] + 1: 1;

    })



  }

}
