import { baseType, isAnyType } from '@itrocks/class-type'
import { normalize }           from 'node:path'
import File                    from './class-file'

const already = new Set<string>()

const Module = require('module')
const superRequire: (...args: any) => typeof Module = Module.prototype.require

Module.prototype.require = function(file: string)
{
	const module = superRequire.call(this, ...arguments)

	if (file[0] === '.') {
		file = this.path + ((this.path[this.path.length - 1] === '/') ? '' : '/') + file
	}
	file = normalize(require.resolve(file))
	if (file[0] !== '/') {
		return module
	}

	if (already.has(file)) {
		return module
	}
	already.add(file)

	for (const object of Object.values(module)) {
		if (isAnyType(object)) {
			File(file)(baseType(object))
		}
	}

	return module
}
