# ts-transform-const-enum

TypeScript transformer to convert const enums to regular enums in declaration files and preserve their runtime values in emitted JS code.

## Why

Using `const enum` inside your app or library is totally fine. It's good for performance as the enum's values are inlined.

However, exposing a `const enum` in the public API of your library is problematic. Everytime you change the value of an enum member, all consumers of your library need to compile for the new version and no longer work with an older one.
In addition TypeScript refuses to compile a project with `isolatedModules` enabled if it encounters a `const enum` in any declaration file.

Therefore you typically want the benefits of `const enum` inside your project and treat it as regular enum for everyone else.
You can use this transformer to modify the emitted declaration files.
In addition you can use it to only preserve `const enum` that are actually exported from your code. That avoids useless runtime code for enums that are not intended for public use, which `preserveConstEnums` would generate.

## Usage with `ttypescript`

I wrote this transformer for use with [`ttypescript`](https://github.com/cevek/ttypescript).

You can configure it in your `tsconfig.json`:

```js
{
  "compilerOptions": {
    "declaration": true,
    "plugins": [
      { "transform": "ts-transform-const-enum" }, // replaces 'compilerOptions.preserveConstEnums'
      { "transform": "ts-transform-const-enum", "afterDeclarations": true }, // modifies declaration files
    ]
  }
}
```

Note that you can use any `"type"` for the transformer: the default is `"type": "program"`, but it also works with `"type": "raw"` for example.

Afterwards you run `ttsc` as you would run `tsc`.

## Usage with `ts-loader`, `rollup`, and TypeScript's API

This package exports the necessary factory function to create the transformer. You can use this function to plug this transformer in any major TypeScript compilation pipeline.
Please refer to the API documentation of the tool you are using. Alternatively you can use [`ttypescript`](https://github.com/cevek/ttypescript) in most tools.
