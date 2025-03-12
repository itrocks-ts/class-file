import { baseType, ObjectOrType, typeOf } from '@itrocks/class-type'
import { decorate, ownDecoratorOf }       from '@itrocks/decorator/class'

const FILE = Symbol('file')

export default File
export function File(file: string)
{
	return decorate(FILE, file)
}

export function fileOf(target: ObjectOrType)
{
	return ownDecoratorOf(baseType(typeOf(target)), FILE, '')
}
