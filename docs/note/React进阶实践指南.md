# React 实践进阶指南

[掘金小册](https://juejin.cn/book/6945998773818490884)

## 认识 JSX

## Component

函数组件和类组件

> 对于类组件来说，底层只需要实例化一次，实例中保存了组件的 `state` 等状态，对于每一次更新只需要调用 `render` 方法以及对应的声明周期即可。但是在函数组件中，**每一次更新都是一次新的函数执行**，一次函数组件的更新，里面的变量都会重新声明。  
> 为了让函数组件可以保存一些状态，执行一些副作用钩子，React Hooks 应运而生。

组件间通信方式

1. props 和 callback
2. ref 方式
3. 状态管理库，如：Redux、Mobx
4. Context
5. eventBus

## State

## Memo

React 对 `Memo` 类型的数据会比较其 `props`，而不是引用地址不一样就重新渲染

## 函数组件 Ref

通过 `useRef` 来获取函数组件的 `ref`，组件中使用 `forwardRef` 来获取父组件传递的 `ref`，组件内部使用 `useImperativeHandle` 来暴露 `ref`。

```tsx
import React from 'react'

type ChildProps = {}
type ChildRef = {
  setName: (name: string) => void
}

const Child = React.forwardRef<ChildRef, ChildProps>((props, ref) => {
  const [name, setName] = useState('')

  React.useImperativeHandle(ref, () => ({ setName }))

  return (
    <div>
      <div>{props.name}</div>
      <button onClick={props.handleClick}>click</button>
    </div>
  )
})

const Parent = () => {
  const childRef = useRef<ChildRef>(null)

  const handleClick = () => {
    childRef.current?.setName('new name')
  }

  return (
    <div>
      <Child ref={childRef} />
    </div>
  )
}
```

## 关于 render 的思考

1.有没有必要在乎组件的渲染次数？
在正常情况下，无须过分在乎 React 组件的渲染，要理解执行 render 不等于真正的浏览器渲染视图，render 阶段执行是在 js 当中，js 中运行代码远快于浏览器的 Rendering 和 Painting 的，更何况 React 还提供了 diff 算法等手段，去复用真实 DOM。 2. 什么时候需要注意渲染节流。

- 大量数据渲染，如：列表渲染
- 表单数据渲染，如：输入框输入时候的实时渲染
- 越靠近跟组件的组件，越容易出现性能问题，因为跟组件的更新会导致所有子组件的更新，所以要尽量减少跟组件的更新

## 渲染调优

1. 从 diff children 看 key 的使用

合理的使用 key 有助于能精确的找到用于新节点复用的老节点。
