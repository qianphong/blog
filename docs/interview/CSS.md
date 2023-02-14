# CSS

[链接](https://www.yuque.com/cuggz/interview/evfmq3)

## `link` 和 `@import` 的区别

两者都可以用于加载 CSS 样式表，区别如下：

- `link` 是 HTML 标签，除了可以加载 CSS 外，还可以定义 RSS 等其他事务；`@import` 是 CSS 语法，只能加载 CSS；
- `link` 引入的 CSS 样式表在页面加载时同时加载，`@import` 引入的 CSS 样式表在页面加载完毕后加载；
- `link` 引入的 CSS 样式表可以通过 JS 操作 DOM 去改变样式，`@import` 引入的 CSS 样式表不可以；
- `link` 引入的 CSS 样式表的权重高于 `@import` 引入的 CSS 样式表。
