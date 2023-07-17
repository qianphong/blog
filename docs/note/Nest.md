# [《Nest 通关秘籍》](https://juejin.cn/book/7226988578700525605)

## 数据传输方式

包含在 URL 中的

1. url param
2. query

body 中的

1. form urlencoded
2. form data
3. json

## IOC (Inversion of Control) 控制反转

后端开发中很多对象

- Controller : 接受请求，调用 Service，返回响应
- Service : 处理业务逻辑
- Repository : 操作数据库

这些对象之间的依赖关系错综复杂，如果手动管理，会非常麻烦，所以需要一个容器来帮我们管理这些对象之间的依赖关系，这个容器就是 IOC 容器。

## Decorator 装饰器

1. `@Module` : 定义一个模块
2. `@Controller` : 声明模块里的 controller
3. `@Injectable` : 声明模块里可以注入的 provider

4. `@Inject` : 注入依赖
5. `@Optional` : 可选依赖
6. `@Global` : 全局模块
7. `@Catch` : 声明 exception filter 处理的 exception 类型

8. `@UseGuards` : 守卫
9. `@UseInterceptors` : 拦截器
10. `@UsePipes` : 管道
11. `@UseFilters` : 过滤器

12. `@Param` : 获取 url param
13. `@Query` : 获取 query
14. `@Body` : 获取 body

15. `@Get` : get 请求
16. `@Post` : post 请求
17. `@Put` : put 请求
18. `@Delete` : delete 请求
19. `@Patch` : patch 请求
20. `@Options` : options 请求
21. `@Head` : head 请求

22. `@SetMetadata` : 设置元数据

23. `@Headers` : 获取 headers
24. `@Ip` : 获取 ip
25. `@Session` : 获取 session
26. `@HostParam` : 获取 host param
27. `@Req` : 获取 request (或者 `@Requset`)

28. `@Res` : 获取 response
29. `@Next` : 获取 next
30. `@HttpCode` : 设置 http code
31. `@Header` : 设置 header
32. `@Redirect` : 重定向

33. `@Render` : 渲染模板
