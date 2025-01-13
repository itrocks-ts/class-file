import { baseType, isAnyType }   from '@itrocks/class-type'
import { decorate, decoratorOf } from '@itrocks/decorator/class'
import { normalize }             from 'node:path'
import { File, fileOf }          from './class-file'

const HAS_FILE = Symbol('hasFile')

const Module = require('module')
const superRequire: (...args: any) => typeof Module = Module.prototype.require

Module.prototype.require = function(file: string)
{
	const module = superRequire.call(this, ...arguments)

	if (file[0] === '.') {
		file = this.path + ((this.path[this.path.length - 1] === '/') ? '' : '/') + file
	}
	file = normalize(require.resolve(file))

	if (decoratorOf(module, HAS_FILE, false)) {
		return module
	}
	decorate(HAS_FILE, true)(module)

	for (const object of Object.values(module)) {
		if (isAnyType(object) && !fileOf(baseType(object))) {
			File(file)(baseType(object))
		}
	}
	return module
}
