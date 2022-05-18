# Node

## 使用依赖，具体导入的文件

```ts
import { func } from 'moduleA'

const { func } = require('moduleA')
```

1. 从 `node@14.x`版本开始，`package.json`里支持了`exports`属性，当它存在时，它的优先级最高

```json
{
  "exports": "main.js",
  // or
  "exports": {
    "default": "es/index.js",
    "import": "es/index.js", // ESM
    "require": "cjs/index.js" // CommonJS
  }
}
```

2. 当`exports`属性不存在，而`module`属性存在时，构建工具（如`webpack`、`rollup`）会把`module`属性当作`ESM`的入口来使用

```json
{
  "module": "es/index.js"
}
```

在`webpack`/`rollup`项目中：

```ts
import xx from 'moduleA'
// 入口会被指向 node_modules/moduleA/es/index.js
```
