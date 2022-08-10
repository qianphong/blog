# 框架设计概览

## 权衡的艺术

### 命令式和声明式

**声明式代码的性能不优与命令式代码的性能。**  
声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗  
命令时代码的更新性能消耗 = 直接修改的性能消耗

### 运行时和编译时

Vue.js 是一个编译时 + 运行时的框架

> 1. [关于运行时和编译时](https://www.cnblogs.com/xhyccc/p/16349481.html)

## 框架设计的核心要素

### 控制框架代码体积

使用环境变量 `__DEV__` 判断，生成 dead code（_永远不会执行的代码_），它不会出现在最终产物中，在构建资源的时候就会被移除。

### 框架要做到良好的 Tree-Shaking

简单地说，Tree-Shaking 指的就是消除那些永远不会执行的代码，也就排除 dead code，想要实现 Tree-Shaking，模块必须是 ESM。

```ts
// input.ts
import { foo } from './utils.ts'

foo()

// utils.ts
export function foo(obj: { foo: any }) {
  obj && obj.foo
}
export function bar(obj: { bar: any }) {
  obj && obj.bar
}
```

使用 `Rollup` 构建

```bash
npx rollup input.js -f esm -o bundle.js
```

```js
// bundle.js
function foo(obj) {
  obj && obj.foo
}
foo()
```

Tree-Shaking 第二个关键点 - 副作用，如果一个函数调用会产生副作用，那么就不能将其移除，什么是副作用？简单地说，副作用就是当调用函数的时候会对外部产生影响，例如修改了全局变量。上面的代码虽然只是读取对象的值，但是如果 `obj` 是一个通过 `proxy` 创建的代理对象，那么当我们读取对象的属性是，就会触发代理对象的 `get` 夹子（trap），在 `get` 夹子中式可能产生副作用的。到底会不会产生副作用，只有代码真正运行的时候才能知道，JavaScript 本身是动态语言。

因为静态的分析 JavaScript 代码很困难，所以可以使用 `/*#__PURE__*/` 注释代码告诉构建工具，这部分代码不会产生副作用，可以放心的对其进行 Tree-Shaking。

## Vue.js 3 的设计思路

### 渲染器和编译器

渲染器的作用就是把虚拟 DOM 渲染成真实 DOM，

编译器和渲染器一样，只是一段程序而已，不过工作内容不同，编译器的作用是将模板编译成渲染函数，对于编译器来说，模板就是一个普通的字符串，它会分析该字符串并生成一个功能与之相同的渲染函数。

# 响应式系统

## 响应式系统的作用与实现

### 响应式数据与副作用函数

副作用函数是指会产生副作用的函数，如下面代码所示：

```ts
function effect() {
  document.body.innerText = 'hello world'
}
```
