# 深入浅出 Node.js

## 第一章 Node 简介

### Chrome 和 Node

![chrome&node](/images/chrome-node.png)
除了 HTML、WebKit 和显卡这些 UI 相关的没有支持外，Node 的结构和 Chrome 非常相似，都是基于事件驱动的异步架构，浏览器通过事件驱动来服务界面上的交互，Node 通过事件驱动来服务。

---

## 第二章 模块机制

1. Browser、Node、W3C 和 CommonJS 之间的关系。![](/images/relationship.png)

2. 文件扩展名分析。`require()` 在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。CommonJS 模块规范页允许在标识符中不包含文件扩展名，这种情况下，Node 会按 `.js` 、`.json`、`.node` 的次序补足扩展名，依次尝试。

3. 在编译过程中，Node 对获取的 JavaScript 文件内容进行头尾包装，如下

```js
;(function (exports, require, module, __filename, __dirname) {
  // JavaScript文件内容
  module.exports
})
```

4. `npm install xxxx -g` 进行全局模块安装，需要注意的是，全局模式并不是将一个模块包安装为一个全局包的意思，它并不意味着可以从任何地方通过 `require()` 来引用得到它，全局模式这个称谓其实并不精确，存在诸多误导，实际上，`-g` 是将一个包安装为全局可用的可执行命令，它根据包描述文件中的 `bin` 字段配置，将实际脚本链接到 Node 可执行文件相同的路径下。

5 兼容多种模块规范

```js
;(function (name, definition) {
  // 监测上下文环境是否未AMD或CMD
  const hasDefine = typeof define === 'function'
  const hasExports = typeof module !== 'undefined' && module.exports

  if (hasDefine) {
    // AMD环境或CMD环境
    define(definition)
  } else if (hasExports) {
    // 定义为普通Node环境
    module.exports = definition()
  } else {
    this[name] = definition()
  }
})('hello', function () {
  return function hello() {
    console.log('hello')
  }
})
```

## 第三章 异步 I/O

利用单线程，远离多线程死锁、状态同步等问题，利用异步 I/O，让单线程原理阻塞，以更好地使用 CPU。为了弥补单线程无法利用多核 CPU 的缺点，Node 提供了 `child_process` 的子进程
