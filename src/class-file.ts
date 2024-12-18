import { ObjectOrType }          from '@itrocks/class-type'
import { decorate, decoratorOf } from '@itrocks/decorator/class'

const FILE = Symbol('file')

export default File
export function File(file: string)
{
	return decorate(FILE, file)
}

export function fileOf(target: ObjectOrType)
{
	return decoratorOf(target, FILE, '')
}