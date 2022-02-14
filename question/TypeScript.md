# TypeScript

- 判断两个类型相等

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
```
