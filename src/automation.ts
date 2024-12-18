import { normalize } from 'node:path'
import File          from './class-file'

function isAnyType(object: any): object is new (...args: any[]) => object
{
	return ((typeof object)[0] === 'f') && ((object + '')[0] === 'c');
}

const Module = require('module')
const superRequire: (...args: any) => typeof Module = Module.prototype.require
Module.prototype.require = function(file: string)
{
	let normalizedFile: string | undefined = undefined
	const module = superRequire.call(this, ...arguments)
	for (const object of Object.values(module)) {
		if (!isAnyType(object)) continue
		normalizedFile ??= normalize(require.resolve(file))
		File(normalizedFile)(object)
	}
	return module
}
