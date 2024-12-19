import { baseType, isAnyType } from '@itrocks/class-type'
import { SortedArray }         from '@itrocks/sorted-array'
import { normalize }           from 'node:path'
import File                    from './class-file'

const Module = require('module')

const already: string[] = new SortedArray<string>()

const superRequire: (...args: any) => typeof Module = Module.prototype.require

Module.prototype.require = function(file: string)
{
	const module = superRequire.call(this, ...arguments)

	if (file[0] === '.') {
		file = this.path + ((this.path[this.path.length - 1] === '/') ? '' : '/') + file
	}
	file = normalize(require.resolve(file))

	if (already.includes(file)) {
		return module
	}
	already.push(file)

	for (const object of Object.values(module)) {
		if (isAnyType(object)) {
			File(file)(baseType(object))
		}
	}
	return module
}
