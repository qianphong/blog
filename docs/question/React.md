# React

## 常用 Hooks

1. `useState`
2. `useMemo`
3. `useReducer`
4. `useContext`
5. `useCallback`
6. `useEffect` - 组件初次渲染和更新时候都会执行，可以返回一个清除副作用的函数，在组件卸载时执行
7. `useRef`

## 常用的类型

1. `React.FC`
2. `KeyboardEvent`
3. `FormEvent`

## 关于 `useMemo`

`useMemo` 和 `useCallback` 要配合 `React.meme` 使用，在不确定是否要用时，那就不要用

## 函数式组件和类组件有何不同？

> [函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)

## React 中插入 HTML

```jsx
function renderHTML(html) {
  const html = '<div>hello</div>'

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```
