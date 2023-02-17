# JavaScript

## 数据类型

基本数据类型

- Number
- String
- Boolean
- Null
- Undefined
- Symbol
- BigInt

引用数据类型

- Object

## `null` 和 `undefined` 的区别

- `null` 是一个表示"空"的对象，转为数值时为 `0`；
- `undefined` 是一个表示"未定义"的原始值，转为数值时为 `NaN`；
- `null` 是一个表示"空"的对象，转为布尔值时为 `false`；
- `undefined` 是一个表示"未定义"的原始值，转为布尔值时为 `false`；
- `typeof null` 为 `object`；
- `typeof undefined` 为 `undefined`；
- `null` 不能转为对象，`undefined` 可以转为对象。

## `instanceof` 的原理

`instanceof` 的原理是通过判断对象的原型链中是不是能找到类型的 `prototype`。

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

## `0.1+0.2!==0.3` 的原因

因为浮点数的存储方式是以二进制的形式存储的，而二进制的小数转换为十进制的小数时，会出现无限循环的情况，所以会出现精度丢失的情况。

## 如何获得安全的`undefined`

```js
const undefined = void 0
```

## `isNaN` 和 `Number.isNaN` 的区别

- `isNaN` 会将参数转为数值，再进行判断，所以 `isNaN('1')` 为 `false`；
- `Number.isNaN` 不会将参数转为数值，所以 `Number.isNaN('1')` 为 `false`。

## `==` 和 `===` 的区别

- `==` 会进行类型转换，`===` 不会进行类型转换；
- `==` 会将 `null` 和 `undefined` 转为 `0`，`===` 不会；
- `==` 会将 `true` 和 `false` 转为 `1` 和 `0`，`===` 不会；
- `==` 会将 `string` 和 `number` 转为 `number`，`===` 不会。

## 其他值转换成数字的规则

- `undefined` 转为 `NaN`；
- `null` 转为 `0`；
- `true` 转为 `1`；
- `false` 转为 `0`；
- `string` 转为 `number`，如果不能转为 `number`，则转为 `NaN`；
- `object` 转为 `number`，先调用 `valueOf` 方法，如果返回的不是原始值，则调用 `toString` 方法，如果返回的不是原始值，则报错。

## 什么是尾调用

尾调用是指函数的最后一步是调用另一个函数。

```js
function f(x) {
  return g(x)
}
```
