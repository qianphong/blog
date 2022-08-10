# TypeScript

## 判断两个类型相等

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
```

## `unknown` 和 `any`

`any` 和 `unknown` 都是 TypeScript 顶级类型，`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身。  
直观地说，这是有道理的：  
只有能够保存任意类型值的容器才能保存 `unknown` 类型的值。毕竟我们不知道变量 `value` 中存储了什么类型的值。`unknown` 和 `any` 都可以转化成任何类型，在静态编译的时候，`unknown` 不能调用任何方法，而 `any` 可以。

## 联合类型和交叉类型

任何类型联合上`never`类型，还是原来的类型

```ts
type Language = 'ts' | never
// Language 的类型还是 'ts'
```

## 泛型参数默认类型规则

1. 有默认类型的参数被认为是可选的；
2. 必选的类型参数不能在可选的类型参数后；
3. 如果类型参数有约束，类型参数的默认类型必须满足这个约束；
4. 当制定类型实参时，你只需要指定必选类型参数的类型实参。未指定的类型参数会被解析为它们的默认类型；
5. 如果指定了默认类型，且类型推断无法选择一个候选类型，那么将使用默认类型作为推断结果；
6. 一个被现有类或接口合并的类或者接口的生命可以为现有类型参数引入默认类型；
7. 一个被现有类或接口合并的类或者就接口的声明可以引入新的类型参数，只要它指定了默认类型。

## TypeScript 的文件作用域

默认情况下，当你在一个新的 `.ts`文件中写下代码时，它是处于全局命名空间中，要解决这个问题应该要是该文件的根级别包含`export`或者`import`，这是会创建一个本地的作用域。通过`declare global { /* global namespace */ }`可以在本地的作用域中向全局的作用域中添加类型声明。

## 判断 空对象类型 `{}`

```ts
type Falsy = { [key: string]: never } // Record<string, never>
type IsEmpty<T> = T extends Falsy ? true : false
```

## `T[number]` 获取的联合类型不会触发 distributive

```ts
type Equal<X, Y> = (<T>() => X extends T ? 1 : 2) extends <T>() => Y extends T
  ? 1
  : 2
  ? true
  : false
type Test1<T extends unknown[]> = T[number] extends 'a' | 'b' ? true : false
type Test2<T> = T extends 'a' | 'b' ? true : false

type Case = Equal<['a', '1'][number], 'a' | '1'> // true
type Case1 = Test1<['a', '1']> // false
type Case2 = Test2<'a' | '1'> // boolean
```

> [tsplaygroud](https://tsplay.dev/WPROJN)

## 元组和数组类型的区别

元组的长度是一个固定的数值（1、2、3 等），而数组的长度是 `number`

```ts
type T = [number, string, boolean] // T['length'] 类型是 3

type U = string[] // T['length'] 类型是 number
```

> https://juejin.cn/book/7047524421182947366/section/7048282437238915110

## 通过以下方法区分可选项

```ts
type Test = {} extends { a?: number } ? true : false
```

## `is` 关键字，用于判断一个变量是否属于某特接口/类型

```ts
interface SomeInterface {
  name: string
  length: number
}

interface SomeOtherInterface {
  questions: string[]
}

function isSomeInterface(x: any): x is SomeInterface {
  return typeof x.name === 'string' && typeof x.length === 'number'
}
function foo(x: SomeInterface | SomeOtherInterface) {
  if (isSomeInterface(x)) {
    console.log(x.length)
  }
}
```

## 关于函数重载

**函数实现签名**，它并不是重载的一部分

```ts
function createLog(message: string): number
function createLog(source: string, message?: string): number {
  return 0
}

createLog('message') // OK
createLog('source', 'message') // Error 应有 1 个参数，但获得 2 个。
```

当至少具有一个函数重载的签名时，只有重载是可见的，最后一个声明签名（也可以被称为签名的实现）对
签名的形状并没有贡献，因此，要获得所需的行为，你需要添加额外的重载；

```ts
function createLog(message: string): number
function createLog(source: string, message: string): number
function createLog(source: string, message?: string) {
  return 0
}
```

> [为什么我会得到 `Supplied parameters do not match any signature` 的错误？](https://jkchao.github.io/typescript-book-chinese/faqs/type-system-behavior.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%88%91%E4%BC%9A%E5%BE%97%E5%88%B0-supplied-parameters-do-not-match-any-signature-%E7%9A%84%E9%94%99%E8%AF%AF%EF%BC%9F)
