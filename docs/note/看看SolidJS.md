# Solid-js

## 基础

### Signal

Solid 的 Signal 是一个函数，它返回一个数组，数组的第一个元素是当前的值，第二个元素是一个函数，用来更新这个值。

```ts
import { createSignal } from 'solid-js'

const [count, setCount] = createSignal(0)

setInterval(() => {
  setCount(count() + 1)
}, 1000)
```

Solid 的 Signal 也可以接受一个函数，你可以在其中使用前一个值来设置下一个值。

```ts
setCount(prev => prev + 1)
```

### Effect

Signal 是可追踪的值，但它们只是等式的一半。另一半是观察者，也就是计算。最基本的计算称为 Effect，它产生副作用 —— 我们系统的输出。**所有的渲染都只是响应式系统的副作用**

## Flow 流程控制

### Show

Show 是一个组件，它接受一个 Signal 作为参数，当这个 Signal 的值为真时，它会渲染它的子组件。

```tsx
import { Show } from 'solid-js'

const [show, setShow] = createSignal(true)

<Show when={show()}>
  <div>hello</div>
</Show>
```

### For

### Index

### Switch

### Dynamic

### Portal

### ErrorBoundary

## 生命周期

### onMount

### onCleanup

## 绑定

### 事件

### 样式

Solid 的 style 属性接受样式字符串或对象，然而，对象形式不同于 `Element.prototype.style`，Solid 通过调用 style.setProperty 的封装来进行样式设置。这意味着键需要采用破折号的形式，如 background-color 而不是 backgroundColor。 但这意味着我们可以设置 CSS 变量。

```tsx
<div
  style={{
    '--my-custom-color': themeColor(),
    'background-color': 'red',
  }}
/>
```

### ClassList

### Ref

### 扩展

```tsx
const pkg = {
  name: 'solid-js',
  version: 1,
  speed: '⚡️',
  website: 'https://solidjs.com',
}
<Info {...pkg} />
```

### 指令

## Props

### 默认值

```tsx
import { mergeProps } from 'solid-js'

function App(props: { name?: string }) {
  const mergedProps = mergeProps({ name: 'solid' }, props)
  return <div>Hello {mergedProps.name}</div>
}
```

### 分离 Props

```tsx
import { splitProps } from 'solid-js'

function App(props: { name?: string }) {
  const [local, others] = splitProps(props, ['name'])
  return <div {...others}>Hello {local.name}</div>
}
```

### Children

```tsx
function App(props: { children: JSX.Element }) {
  return <div>{props.children}</div>
}
```
