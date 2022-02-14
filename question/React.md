# React

## 常用 Hooks

1. `useState`
2. `useMemo`
3. `useReduce`
4. `useContext`
5. `useCallback`
6. `useEffect` - 组件初次渲染和更新时候都会执行，可以返回一个清楚副作用的函数，在组件卸载时执行
7. `useRef`

## 常用的类型

1. `React.FC`
2. `KeyboardEvent`
3. `FormEvent`

## 关于 `useMemo`

`useMemo` 和 `useCallback` 要配合 `React.meme` 使用，在不确定是否要用时，那就不要用
