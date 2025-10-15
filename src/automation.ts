import { baseType }  from '@itrocks/class-type'
import { isAnyType } from '@itrocks/class-type'
import { normalize } from 'node:path'
import { File }      from './class-file'
import { fileOf }    from './class-file'

const already = new Set<string>()
const recurse = new Set<string>()

const Module = require('module')
const superRequire: (...args: any) => typeof Module = Module.prototype.require

Module.prototype.require = function(file: string)
{
	if (file[0] === '.') {
		file = this.path + ((this.path[this.path.length - 1] === '/') ? file : ('/' + file))
	}
	file = normalize(require.resolve(file))

	const recurses = recurse.has(file)
	recurse.add(file)
	const module = superRequire.call(this, ...arguments)
	recurse.delete(file)

	if (recurses || ((file[0] !== '/') && (file[1] !== ':')) || already.has(file)) {
		return module
	}
	already.add(file)

	for (const object of Object.values(module)) {
		if (isAnyType(object)) {
			const type = baseType(object)
			if (!fileOf(type)) {
				File(file)(type)
			}
		}
	}

	return module
}
