require('../cjs/automation')
const fileOf = require('../cjs/class-file').fileOf
const { Class1, Class2 } = require('./classes')

let pass  = 0
let total = 0
function equals(actual: any, expect: any)
{
	total ++
	if (actual !== expect) {
		console.log('Expected', expect)
		console.log('Received', actual)
		return false
	}
	pass ++
	return true
}

equals(fileOf(Class1), __dirname + '/classes.js')
equals(fileOf(Class2), __dirname + '/classes.js')

if (pass === total) {
	console.log('All', total, 'tests passed')
}
else {
	console.log(pass, 'out of', total, 'tests passed')
}
