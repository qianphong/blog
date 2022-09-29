# 待归档

## 网页引用的资源去掉协议部分（ https: 和 http ）

```diff
- <script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>
- <script src="https://www.google-analytics.com/ga.js" type="text/javascript"></script>
+ <script src="//www.google-analytics.com/ga.js" type="text/javascript"></script>
```

以 `//` 开头的叫做相对 URL（protocal-relative URL），相关的标准可以看 [RFC 3986 Section 4.2](http://tools.ietf.org/html/rfc3986#section-4.2)。
浏览器遇到相对 URL ，则会根据当前的网络协议，自动在 `//` 前面加上相同的协议，如当前网页是 `http` 访问，那么所有的相对引用 `//` 都会变成 `http://`，`https`
同理。如果在本地查看，协议就会变成 `file://`。

> [关于 URL 中协议的省略](http://pandacafe.net/post/231)

## 正则匹配汉字

```js
const reg = /\p{Script=han}/u
```

> [JavaScript 正则表达式匹配汉字 - 黄俊亮的文章 - 知乎](https://zhuanlan.zhihu.com/p/33335629)

## 为什么使用 `TailwindCSS`

总体上比上一代 css 框架进步了很多。上一代 css 框架是提供完整的设计输出，是组件级别。例如一个 input 组件，框架已经帮你写好了所有样式，你只要把类名丢进去，一个 input 就被美化了。当然 bootstrap 还提供了 sass 版本，你可以通过修改变量来实现自定义，但毕竟自定义空间不大。Tailwind 提供的是设计规范，相当于理念层面的素材。比如还是 input 组件，你需要首先对 input 进行拆解，它的边框、字体、阴影、圆角等等，你要从框架里面把这些元素挑出来进行组合。这样做极大的激发了设计师的创作想象力，也为设计师编程提供可能。工程化也是趋势，通过构建工具，可以干很多事，甚至发明新语法。可以说，未来的 css 框架一定是这个趋势：更细化，更工程化。它的美化效果不一定是最好的。但是它的这种工作方式，一定会在不同公司得到发挥，特别是有统一设计团队，要统一 UI 的公司。对于这些公司而言，写好设计规范，接下来就是拼凑。如何设计师直接通过组合得出效果，对研发人员来说也节省了时间。

> [如何评价 CSS 框架 TailwindCSS？ - 知乎](https://www.zhihu.com/question/337939566)

## Vitepress build 成功后进程还挂起

因为在 SFC 的 `<script setup>` 中使用了 `setInterval`，导致进程一直被挂起，解决方案就是将定时器包裹在 `if(typeof window !== 'undefined')` 或者在 `onMounted` 中。

> [vuejs/vitepress#562](https://github.com/vuejs/vitepress/issues/562)
