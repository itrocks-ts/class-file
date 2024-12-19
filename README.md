[![npm version](https://img.shields.io/npm/v/@itrocks/class-file?logo=npm)](https://www.npmjs.org/package/@itrocks/class-file)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/class-file)](https://www.npmjs.org/package/@itrocks/class-file)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/class-file?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/class-file)
[![issues](https://img.shields.io/github/issues/itrocks-ts/class-file)](https://github.com/itrocks-ts/class-file/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://discord.gg/RZYhmhgrCk)

# class-file

Retrieve the absolute file path of an imported class:
- Automatic for your CommonJS-compiled projects,
- Using a `@File` decorator in ESM-compiled projects.

## Installation

```bash
npm install @itrocks/class-file
```

## Activation

This library associates each imported class with the absolute file path where it is defined.
Its behavior differs depending on the module compilation mode:

**CommonJS:** Recommended for most use cases.\
Add this line to the very start of your main file:
```ts
import '@itrocks/class-file/automation'
```
or:
```ts
require('@itrocks/class-file/automation')
```
This enables automatic file path resolution for all subsequently imported classes.

**ESModule:** Requires manual setup.\
Due to the limitation of ESM, you must explicitly decorate classes with the `@File(import.meta.filename)` decorator
to enable file path resolution. Without this decorator, `fileOf()` will return `undefined`.

## Example

Given a file `my-class.js`:
```ts
export default class MyClass {}
```

Retrieving the file path:
```ts
import { fileOf } from '@itrocks/class-file'
import MyClass    from './my-class.js'

console.log(fileOf(MyClass))       // Returns the absolute file path
console.log(fileOf(new MyClass))   // Also returns the absolute file path
```
