# Webpack

## Webpack 路径中的 placeholder

1. `[id]`：返回 chunk id
1. `[path]`：返回文件路径
1. `[name]`：返回文件名
1. `[ext]`：返回文件扩展名
1. `[fullhash]`：返回本次构建的 hash，如果本次构建过程中有任何一部人发生变化，这个 hash 也会改变
1. `[chunkhash]`：返回每一个 entry chunk 的 hash，`[chunkhash]` 比 `[fullhash]` 粒度更细一点
1. `[contenthash]`：返回模块内容的 hash，从 webpack5 开始，这个 hash 值默认使用在生产模式

## Plugin 和 Loader

Webpack 中常用的 plugin 和 loader 见 [package#webpack](../package.md#webpack)
