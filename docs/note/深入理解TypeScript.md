# 深入理解 TypeScript

[链接](https://jkchao.github.io/typescript-book-chinese/)

## 写在前面

TypeScript 已经成为大型项目的标配，其提供的静态类型系统，大大增强了代码的可读性以及可维护性，提供最新和不断发展的 JavaScript 特性，能让我们建立更健壮的组件。

## tsconfig.json

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.
    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}
```

## 声明空间

### 类型声明空间

1. 定义的类型如 `interface Bar {}` ， `Bar`  并不能作为一个变量来使用，因为它并没有定义在变量声明空间中。

### 变量声明空间

1. 类可以作为一个变量使用，而接口或者其他类型声明并不能作为一个变量；
1. 声明的变量不能作为类型注解使用。

## 模块

### 全局模块

1. 默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中；
1. 使用全局变量空间是危险的，因为它会与文件内的代码命名冲突。

### 文件模块

1. 如果 TS 文件根级别位置不含有 `import`  和 `export` ，那么这个文件中的内容是处于全局变量中，如果含有 `import`  或者 `export` ，那么它会在这个文件中创建一个本地作用域；
1. 模块类型 CommonJS、 AMD、 ES modules 和其他，AMD 仅能在浏览器工作；
1. 在项目中可以通过 `declare module 'somePath'`  声明一个全局模块的方式，来解决查找模块路径的问题。

```ts
// global.d.ts
declare module 'foo' {
  // some variable declarations
  export var bar: number
}

// 其他的.ts文件中
import * as foo from 'foo'
// Typescript 将假设（在没有其他查找的情况下）
// foo 是 { bar: number }
```

## 命名空间

## 动态导入表达式

## 类型系统

1. 在类型声明空间中可用的任何内容都可用作类型注解；
1. 变量、函数参数和函数返回值的类型注解；
1. 接口可以合并众多类型声明至一个类型声明；
1. 特殊类型包括 `any`、 `null`、 `undefined`  以及  `void`；
1. `any`  能够兼容所有类型（包括它自己），使用 `any` TypeScript 将关闭类型检查，必须减少对 `any`  的依赖，确保类型安全；
1. `null` `undefined`  和其他被标注了 `any`  类型的变量一样，都能够被赋值给任意类型，需要关闭 ` strictNullChecks: false` ；
1. `:void`  标识函数没有一个返回值；
1. 属性为多种类型之一时候需要使用联合类型，用 `|`  标记；
1. 交叉类型、元组类型、类型别名。

## 环境声明

1. 如果一个文件有 `.d.ts` ，这意味着每个根级别的声明都必须以 `declare`  关键字作为前缀。

## 接口

1. 接口运行时的影响为 0；
1. 注解方式分为内联注解和接口形式；
1. 接口是开放式的；
1. 类实现接口 `implements` ，类必须遵循接口的对象结构。

## 枚举

## lib.d.ts

1. 可以通过使用`declare global { /* global namespace */ }` 从文件模块中进入全局命名空间。

## 函数

1. 可选参数使用 `?`  标记；
1. 多次声明函数头可实现函数重载；
1. ts 中的函数重载没有任何运行时开销，只允许你记录希望调用函数的方式。

## 可调用的

1. 可以使用类型别名或者接口来表示一个可被调用的类型注解；

```ts
interface ReturnString {
  (): string
}

declare const foo: ReturnString
const bar = foo() //bar 会被推断成一个字符串
```

2. 可实例化是可调用的一种特殊情况，它使用`new`作为前缀，这意味着你要使用`new`关键字去调用它。

```ts
interface CallMeWithNewToGetString {
  new (): string
}
declare const Foo: CallMeWithNewToGetString
const bar = new Foo()
```

## 类型断言

1. ts 允许你覆盖它的断言，类型断言用来告诉编译器你比它更了解这个类型。

## Freshness

1. Freshness 更严格的对象字面量检查，用来确保对象字面量在结构上类型兼容；
1. 函数参数传入对象字面量时会使用强校验；

```ts
function fn(obj: { name: string }) {
  return obj.name
}

//变量结构类型
const user_1 = { name: '1', age: 2 }
fn(user_1) //通过校验

//对象字面量传入函数
fn({ name: '1', age: 2 }) //提示错误 'age' does not exist in type '{ name: string; }'
```

3. 变量结构类型会误导你认为某些东西接受的数据比它实际的多；
4. 对象字面量传参只能指定已知的属性，不包含的属性会报错。

## 类型保护

1. typeof；
1. instanceof；
1. in；
1. 字面量类型保护。

## 字面量类型

1. 可以使用一个字符串字面量作为一个类型。

```ts
const foo: 'hello'
foo = 'bar' //error 'bar'不能赋值给类型 'hello'
```

## Readonly

1. 可以在 `interface` 、 `type`  和 `class`  里使用 `readonly` ;
1. `Readonly`  映射类型，接受一个泛型 `T` ，用它来把所有属性标记为只读类型；

```ts
type Foo = {
  bar: number
  bas: number
}

type FooReadonly = Readonly<Foo>

const foo: Foo = { bar: 123, bas: 456 }
const fooReadonly = { bar: 123, bas: 456 }

foo.bar = 456 //ok
fooReadonly.bar = 456 //Error: bar 属性只读
```

3. 在 `class` 中如果只有一个含有 `getter`  但是没有 `setter`  的属性，那么这个属性能被推断成只读的；
4. `readonly` 与 `const` 的区别：

`const`

1.  用于变量
1.  变量不能重新赋值给其他任何事物

`readonly`

1.  用于属性
1.  用于别名，可以修改属性

## 泛型

1. 设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：
   - 类的实例成员
   - 类的方法
   - 函数参数
   - 函数返回值
2. 如果仅用于单个参数的位置，那么完全没必要使用泛型

```ts
declare function foo<T>(arg: T): void //仅在一个地方用到了泛型，没必要使用

//改为

declare function foo(arg: any): void
```

## 类型推断

## 类型兼容性

1. TypeScript 对象是一种结构类型，这意味着只要结构匹配，名称也就无关紧要了；
1. 枚举与数字类型相互兼容，而来自不同枚举的枚举变量是不兼容的；
1. 类的兼容性，仅仅会对实例的成员和方法相比较，构造函数和静态类型不会被检查；
1. 类中私有的和受保护的成员必须来自相同的类；
1. 泛型，当类型参数在被一个成员使用时才会影响兼容性。

## Never

1. `never` 表示永远不存在的值的类型，而 `void` 表示没有任何类型
1. 当一个函数返回空值时，它的返回值为 `void` 类型，但是当一个函数永远不返回时（或者总时抛出错误），它的返回值为 `never` 类型

## 辨识联合类型

1. 当类或接口中含有字面量成员时，我们可以用该类的属性来辨析联合类型；

```ts
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

type Shape = Square | Rectangle

/*如果使用类型保护风格的检查（）或者使用具有判断性的属性（在这里是kind），TypeScript
将会认为你会使用的对象类型一定拥有特使字面量的，并且它会为你自动把类型范围变小*/

function area(s: Shape) {
  if (s.kind === 'square') {
    //现在 TypeScript 知道 s 的类型是 Square
    //所以你现在能安全的使用它
    return s.size * s.size
  } else {
    // 不是一个 square 因此 TypeScript 将会推算出 s 一定是Rectangle
    return s.width * s.height
  }
```

## 索引签名

1. 索引签名中的名称（如： `{ [ index: string ]: { message: string } }`  里的 `index` ）除了可读性外，并没有什么意义；
1. 当你声明一个索引签名时，所有明确的成员都必须符合索引签名。
