# ts-transform-const-enum
TypeScript transformer to convert const enums to regular enums in declaration files

## Install

```sh
npm install --save-dev ts-transform-const-enum
# or
yarn add -D ts-transform-const-enum
```

## Usage

I wrote this transformer for use with [`ttypescript`](https://github.com/cevek/ttypescript).

You can configure it in your `tsconfig.json`:

```js
{
  "compilerOptions": {
    "declaration": true,
    "preserveConstEnums": true, // make sure you enable 'preserveConstEnums'
    "plugins": [
      { "transform": "ts-transform-const-enum", "afterDeclarations": true, "type": "raw" },
    ]
  }
}
```

Afterwards you run `ttsc` as you would run `tsc`.

You still need to enable `preserveConstEnums` in `compilerOptions` to make those enums available at runtime.

## Why

Using `const enum` inside your app or library is totally fine. It's good for performance as the enum's values are inlined.

However, exposing a `const enum` in the public API of your library is problematic. Everytime you change the value of an enum member, all consumers of your library need to compile for the new version and no longer work with an older one.
In addition TypeScript refuses to compile a project with `isolatedModules` enabled if it encounters a `const enum` in any declaration file.

Therefore you typically want the benefits of `const enum` inside your project and treat it as regular enum for everyone else.
To achieve this, you need to enable `preserveConstEnums` in `compilerOptions` and use this transformer to modify the emitted declaration files.
