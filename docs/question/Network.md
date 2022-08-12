# 网络

[HTTP - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

## HTTP 8 种请求方法

1. GET
2. POST
3. PUT
4. DELETE
5. HEAD - 向服务器索与 GET 请求相一致的响应，只不过响应体将不会被返回。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。
6. OPTIONS - 它用于获取当前 URL 所支持的方法。如果请求成功，会有一个 Allow 的头包含类似“GET,POST”这样的信息
7. TRACE - 回显服务器收到的请求，主要用于测试或诊断
8. CONNNECT

## URL 解析

### 传输协议

- HTTP
- HTTPS
- FTP

### 域名

### 端口号

0 ~ 65535 之间

- HTTP - 默认 80
- HTTPS - 默认 443
- FTP - 默认 21
- SFTP - 默认 22

### 网址中的 HASH

- 锚点定位
- HASH 路由

### 编码问题

- encodeURI/decodeURI - 假定一个 URI 是完整的 URI，那么无需对那些保留的并且在 URI 中有特殊意思的字符进行编码。
- encodeURIComponent/decodeURICompnent - 仅仅用来对查询参数编码

```ts
const test = 'https://测试.com?q=关键字'

encodeURI(test) //'https://%E6%B5%8B%E8%AF%95.com?q=%E5%85%B3%E9%94%AE%E5%AD%97'
encodeURIComponent(test) // 'https%3A%2F%2F%E6%B5%8B%E8%AF%95.com%3Fq%3D%E5%85%B3%E9%94%AE%E5%AD%97'
```

## 几个常用 HTTP 状态码

几个大类：

- `1xx` - 信息响应
- `2xx` - 成功响应
- `3xx` - 重定向消息
- `4xx` - 客户端错误响应
- `5xx` - 服务端错误响应

具体的：

- `101` - Switching Protocols 切换请求协议
- `200` - OK 请求成功，有响应体，服务器成功返回网页
- `301` - Moved Permanently 永久重定向：会缓存，
- `302` - Found 临时重定向：不会缓存
- `304` - Not Modified 自从上次请求后，请求的网页未修改过，协商缓存命中
- `400` - Bad Request 由于被认为是客户端错误（例如，错误的请求语法、无效的请求消息帧或欺骗性的请求路由），服务器无法或不会处理请求。
- `401` - Unauthorized 请求未授权
- `403` - Forbidden 禁止访问
- `404` - Not Found 资源未找到，请求的网页不存在
- `500` - Internal Server Error 最常见的服务器端错误
- `503` - Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）

## HTTP 缓存机制

### 缓存分为两种：强缓存和协商缓存

#### 强缓存

不会向服务器发送请求，直接从缓存中读取资源，在 Chrome 浏览器的控制台的 Network 选中可以看到该请求返回 200 状态码，并且 size 显示 `from disk cache` 或者 `from memory cache` 两种（灰色表示缓存）

#### 协商缓存

向服务器发送请求，服务器会根据这个请求的 request header 的一些参数来判断是否命中协商缓存，如果命中，则返回 304 状态码，并带上新的 response header 通知浏览器从缓存种读取资源

共同点：都是从客户端缓存种读取资源
不同点：强缓存不会发请求，协商缓存会发送请求

### 相关 Header：

#### 强缓存

1. Expires: response header 里的过期时间，浏览器在加载资源是，如果在这个过期时间内则命中强缓存。
2. Cache-Control: 当值设为 `max-age=300`，则代表在这个请求正确返回时间（浏览器也会记录下来）的 300 秒内再次加载资源，就会命中缓存。

_区别：Expires 是 http1.0 的产物，Cache-Control 是 http1.1 的产物，两者同时存在的话，Cache-Control 的优先级高于 Expires，Expires 其实是过期的产物，现阶段它的存在只是一种兼容的写法_

#### 协商缓存

1. ETag 和 If-None-Match  
   ETag 是上一次加载资源时，服务器返回的 response header，是对该资源的一种**唯一标识**，只要资源有变化，ETag 就会重新生成。  
   浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的 ETag 值放在 request header 的 If-None-Match 中，服务器接受到 If-None-Match 的值后，会拿来跟该资源的 ETag 值做比较，如果相同，则表示资源文件没有发生改变，命中协商缓存。

2. Last-Modified 和 If-Modified-Since
   Last-Modified 是该资源文件最后一次更改时间，服务器会在 response header 里返回，同时浏览器会将这个值保存起来，下一次发送请求时，放在 reques-header 里的 If-Modified-Since 里，服务器在接收到后也会做对比，如果相同则命中协商缓存。

   _在精确度上，ETag 要优与 Last-Modified，Last-Modified 的时间单位是秒，如果某个文件在 1 秒内改变了多次，那么他们的 Last-Modified 其实并没有体现出来修改，但是 ETag 每次都会改变确保了精度，在性能上，ETag 要逊于 Last-Modified，毕竟 Last-Modified 只需要记录时间，而 ETag 需要服务器通过算法来计算出一个 hash 值，在优先级上，服务器校验优先考虑 ETag。_

**强缓存 VS 协商缓存**：最好是配合在一起用，争取最大化的减少请求，利用缓存，节省流量。

> [HTTP 缓存机制 - 寒冬里一的文章 - 知乎](https://zhuanlan.zhihu.com/p/58685072)

## 输入 URL 到显示页面的步骤

1. 输入
   输入的过程中，浏览器的 UI 线程会实时捕捉输入的内容，如果输入的内容不是网址或者协议不合法的话，就会使用浏览器默认的搜索引擎，来和成新的带搜索关键字的 URL，准备进行搜索，
   这里还会检查有没有出现非法字符，有的话会对非法字符进行转义，
   如果没有问题，在回车之前还会执行一次当前页面的 beforeunload 事件，可以让页面退出之前执行一些数据清理工作，或者，有表单没有确认提交的情况提示用户是否确认离开，然后下一步浏览器进程会通过 IPC 白 URL 发送给网络进程，然后网络进程要先找本地缓存。
2. 检查缓存
3. URL 解析
4. DNS 解析
5. 建立 TCP 连接
6. 连接之后

> [(建议精读)输入 URL 到页面显示的前端体系知识](https://juejin.cn/post/6994066112203718686)  
> [TCP 的三次握手与四次挥手详解 - 慕课网的文章 - 知乎](https://zhuanlan.zhihu.com/p/51560184)
