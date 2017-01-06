const wikiminer = require('./index.js')

// wikiminer('dog').then((response) => {
// 	console.log(response);
// })

wikiminer('dog', 5, 5).then((response) => {
	console.log(response);
})
