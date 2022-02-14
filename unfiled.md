# 待归档

- 网页引用的资源去掉协议部分（https:和 http）

```diff
- <script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>
- <script src="https://www.google-analytics.com/ga.js" type="text/javascript"></script>
+ <script src="//www.google-analytics.com/ga.js" type="text/javascript"></script>
```

以 `//` 开头的叫做相对 URL（protocal-relative URL），相关的标准可以看 [RFC 3986 Section 4.2](http://tools.ietf.org/html/rfc3986#section-4.2)。
浏览器遇到相对 URL ，则会根据当前的网络协议，自动在 `//` 前面加上相同的协议，如当前网页是 `http` 访问，那么所有的相对引用 `//` 都会变成 `http://`，`https`
同理。如果在本地查看，协议就会变成 `file://`。

相关链接：
[1] http://pandacafe.net/page/10?mktwly=whlmg1&ywparq=cg5tj3

---

- 正则匹配汉字

```js
const reg = /\p{Script=han}/u
```

相关链接：
[1] https://zhuanlan.zhihu.com/p/33335629
