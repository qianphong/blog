# React 官方文档

## 记忆点

1. 组件内包含渲染函数、事件处理函数、Effect 处理函数
2. 用在 Effect 中的事件处理函数，不需要添加到依赖的，使用 `useEffectEvent()`

## React 哲学

- props 像是传递给函数的参数，state 像是组件的内存 [🔗](https://react.docschina.org/learn/thinking-in-react#props-vs-state)
- 哪些是 state？ [🔗](https://react.docschina.org/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state)
  - 随着事件推移 **保持不变**？
  - 通过 props **从父组件传递**？
  - 是否可以基于已存在与组件中的 state 或者 props 进行 **计算**？

## 关于 Render 的思考

### 有没有必要在乎组件的渲染次数?

> 正常情况下，无需过分在乎 React 组件的渲染，要理解执行 render 不等于真正的浏览器渲染视图，render 阶段执行的是在 JS 中，JS 中的代码运行远快于浏览器的 Rendering 和 Painting 的，更何况 React 还提供了 diff 算法等手段，去复用真实的 Dom。

### 什么时候需要注意渲染节流

- 大量数据渲染，如：列表渲染
- 表单数据渲染，如：输入框输入时候的实时渲染
- 越靠近跟组件的组件，越容易出现性能问题，因为跟组件的更新会导致所有子组件的更新，所以要尽量减少跟组件的更新

## Hook

函数组件，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量都会重新声明。为了让函数组件可以保存一些状态，执行一些副作用钩子，React Hooks 应运而生。

- 以 `use` 开头的函数被称为 Hook
- 只能在组件的顶层调用 Hook

## 组件间通信方式

1. `props` 和 `callback`
2. `ref` 方式
3. 状态管理库，如：Redux、MoBox
4. `Context`
5. EventBus

## 描述 UI

- 组件名称必须以大写字母开头
- 函数组件返回 JSX 标签
- 万物皆组件 [🔗](https://react.docschina.org/learn/your-first-component#components-all-the-way-down)
- 不要嵌套组件的定义 [🔗](https://react.docschina.org/learn/your-first-component#nesting-and-organizing-components)
- 默认导出还是具名导出? [🔗](https://react.docschina.org/learn/importing-and-exporting-components#default-vs-named-exports)

### JSX 规则 [🔗](https://react.docschina.org/learn/writing-markup-with-jsx#the-rules-of-jsx)

- 只能返回一个根元素
- 标签必须闭合
- 使用驼峰式命名法给属性命名
- 使用 `className` 添加类名

### JSX 中使用 JavaScript

- JSX 引号内的值会作为字符串传递给属性
- 大括号让你可以将 JavaScript 的逻辑和变量带入到标签中 [🔗](https://react.docschina.org/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world)
- 它们会在 JSX 标签中的内容区域或紧随属性的 `=` 后起作用
- `{{ }}` 并不是什么特殊的语法：它只是包在 JSX 大括号内的 JavaScript 对象。[🔗](https://react.docschina.org/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx)

### 将 props 传递给组件 [🔗](https://react.docschina.org/learn/passing-props-to-a-component)

- 属性传递任何 JavaScript 值，包括对象、数组和函数
- props 是不可变的（immutable），不要尝试修改 props
- props 是只读的时间快照：每次渲染都会收到新版本的 props

### 渲染列表 [🔗](https://react.docschina.org/learn/rendering-lists)

- 用 `key` 保持列表项的顺序；
- 列表返回多个节点，使用 `Fragment` 包裹 [🔗](https://react.docschina.org/learn/rendering-lists#displaying-several-dom-nodes-for-each-list-item)
- 为何以及如何给集合中的每个组件设置一个 key 值：它使 React 能追踪这些组件，即便后者的位置或数据发生了变化。

### 保持组件纯粹 [🔗](https://react.docschina.org/learn/keeping-components-pure)

- 使用严格模式检测不纯的计算，在严格模式下开发时，它将会调用每个组件函数两次。通过重复调用组件函数，严格模式有助于找到违反这些规则的组件。
- 一个组件必须是纯粹的，就意味着：
  - 只负责自己的任务：它不会更改在该函数调用前就已存在的对象或变量；
  - 输入相同，则输出相同：给定相同的输入，组件应该总是返回相同的 JSX
- 渲染随时可能发生，因此组件不应依赖于彼此的渲染顺序
- 你不应该改变任何用于组件渲染的输入。这包括 props、state 和 context。通过 “设置” state 来更新界面，而不要改变预先存在的对象
- 努力在你返回的 JSX 中表达你的组件逻辑。当你需要“改变事物”时，你通常希望在事件处理程序中进行。作为最后的手段，你可以使用 useEffect

### 将 UI 视为树

- 树是表示实体之间关系的常见方式，它们经常用于建模 UI
- 渲染树表示单次渲染中 React 组件之间的嵌套关系
- 使用条件渲染，渲染树可能会在不同的渲染过程中发生变化
- 使用不同的属性值，组件可能会渲染不同的子组件
- 渲染树有助于识别顶级组件和叶子组件
- 顶级组件会影响其下所有组件的渲染性能，而叶子组件通常会频繁重新渲染。识别它们有助于理解和调试渲染性能问题

## 添加交互

### 响应事件

- 事件处理函数是执行副作用的最佳位置，与渲染函数不同，事件处理函数不需要是纯函数，它是更改某些值的绝佳位置
- 事件处理函数在组件内部定义，所以它们可以访问 props
- 你可以在父组件中定义一个事件处理函数，并将其作为 prop 传递给子组件

### state: 组件的记忆 [🔗](https://react.docschina.org/learn/state-a-components-memory)

- 普通的变量无法满足时 [🔗](https://react.docschina.org/learn/state-a-components-memory#when-a-regular-variable-isnt-enough)
  - 为什么存在 state：
    - 局部变量无法在多次渲染中持久保存
    - 更改局部变量不会触发渲染
  - 使用新数据更新组件前提：
    - **保留** 渲染之前的数据。
    - **触发** React 使用新数据渲染组件（重新渲染）
  - `useState` 作用
    - **State 变量** 用于保存渲染间的数据。
    - **State setter 函数** 更新变量并触发 React 再次渲染组件
- State 是隔离且私有的 [🔗](https://react.docschina.org/learn/state-a-components-memory#state-is-isolated-and-private)
  - 如果你渲染同一个组件两次，每个副本都会有完全隔离的 state
  - state 完全私有于声明它的组件

### 渲染和提交 [🔗](https://react.docschina.org/learn/render-and-commit)

- 步骤
  1. 触发一次渲染
     - 组件的初次渲染
     - 组件（或者其祖先之一）的状态发生了改变
  2. 渲染组件 （调用渲染函数）
     - 在进行初次渲染时, React 会调用根组件
     - 对于后续的渲染, React 会调用内部状态更新触发了渲染的函数组件
  3. 提交到 DOM
     - 对于初次渲染， React 会使用 `appendChild()` DOM API 将其创建的所有 DOM 节点放在屏幕上
     - 对于重渲染， React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配
- React 仅在渲染之间存在差异时才会更改 DOM 节点，如果渲染结果与上次一样，那么 React 将不会修改 DOM
- 在渲染完成，并且 React 更新 DOM 之后，浏览器就会重新绘制屏幕

### state 如同一张快照 [🔗](https://react.docschina.org/learn/state-as-a-snapshot)

- 设置 state 请求一次新的渲染
- 正在渲染意味着 React 正在调用你的组件（一个函数），当 React 重新渲染一个组件时：
  1. React 会再次调用你的函数
  2. 函数返回新的 JSX 快照。（计算快照）
  3. React 会更新界面以匹配返回的快照
- React 将 state 存储在组件之外，就像在架子上一样
- 设置 state 只会为下一次渲染变更 state 的值，不会更改现有渲染中的变量
- 一个 state 变量的值永远不会在一次渲染的内部发生变化
- React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部
- 当你调用 `useState` 时，React 会为你提供该次渲染的一张 state 快照
- 变量和事件处理函数不会在重渲染中“存活”，每个渲染都有自己的事件处理函数
- 每个渲染（以及其中的函数）始终“看到”的是 React 提供给这个 渲染的 state 快照
- 你可以在心中替换事件处理函数中的 state，类似于替换渲染的 JSX
- 过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值

### 把一系列 state 更新加入队列 [🔗](https://react.docschina.org/learn/queueing-a-series-of-state-updates)

- React 会对 state 更新进行批处理
- React 会等到事件处理函数中的所有代码都运行完毕再处理你的 state 更新（批处理）。这就是为什么重新渲染只会发生在所有这些 `setState` 调用 之后 的原因。
- 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染
- 要在一个事件中多次更新某些 state，你可以使用 `setNumber(n => n + 1)` 更新函数

### 更新 state 中的对象

- 将 React 中所有的 state 都视为不可直接修改的。
- 当你在 state 中存放对象时，直接修改对象并不会触发重渲染，并会改变前一次渲染“快照”中 state 的值
- 不要直接修改一个对象，而要为它创建一个新版本，并通过把 state 设置成这个新版本来触发重新渲染
- 想要减少重复的拷贝代码，可以使用 Immer。

## 状态管理

### 使用 state 响应输入

- 删除任何不必要的 state 变量：
  - 这个 state 是否会导致矛盾？
  - 相同的信息是否已经在另外一个 state 变量中存在？
  - 你是否可以通过另外一个 state 变量中的相反值得到相同的信息？

### 选择 State 结构

- 构建 state 的原则
  - 合并关联的 state
  - 避免互相矛盾的 state
  - 避免冗余的 state
  - 避免重复的 state
  - 避免深度嵌套的 state
- 避免冗余和重复的 state，这样您就不需要保持同步
- 除非您特别想防止更新，否则不要将 props 放入 state 中

### 组件间共享状态

- 当你想要整合两个组件时，将它们的 state 移动到共同的父组件中
- 然后在父组件中通过 props 把信息传递下去
- 最后，向下传递事件处理程序，以便子组件可以改变父组件的 state
- 考虑该将组件视为“受控”（由 prop 驱动）或是“不受控”（由 state 驱动）是十分有益的

### 对 state 进行保留和重置 [🔗](https://react.docschina.org/learn/preserving-and-resetting-state)

- 各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。
- React 会为 UI 中的组件结构构建渲染树(UI 树)，状态与渲染树中的位置相关
- 对 React 来说重要的是组件在 UI 树中的位置，而不是在 JSX 中的位置
- 永远要将组件定义在最上层，不要嵌套组件的定义，否则你会意外地导致 state 被重置
- 当你在相同位置渲染不同的组件时，这个组件的整个子树都会被重置
- 如果你想在重新渲染时保留 state，几次渲染中的树形结构就应该相互“匹配”。结构不同就会导致 state 的销毁，因为 React 会在将一个组件从树中移除时销毁它的 state。
- 相同位置的相同组件会使得 state 被保留下来，相同位置的不同组件会使 state 重置
- 在相同位置重置 state
  - 将组件渲染在不同的位置
  - 使用 `key` 来重置 state (请记住 key 不是全局唯一的。它们只能指定**父组件内部**的顺序。)

### 迁移状态逻辑至 Reducer

对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 reducer。

- 为什么称之为 reducer? [🔗](https://react.docschina.org/learn/extracting-state-logic-into-a-reducer#why-are-reducers-called-this-way)
- useReducer 钩子接受 2 个参数：
  - 一个 reducer 函数
  - 一个初始的 state
- 返回如下
  - 一个有状态的值
  - 一个 dispatch 函数（用来“派发”用户操作给 reducer）
- 编写一个好的 reducers
  - reducers 必须是纯粹的
  - 每个 action 都描述了一个单一的用户交互，即使它会引发数据的多个变化。
- 使用示例

```jsx
import { useReducer } from 'react'

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'create':
      return [
        ...tasks,
        {
          id: tasks.length + 1,
          text: action.text,
        },
      ]
    case 'delete':
      return tasks.filter(t => t.id !== action.id)
    default:
      throw Error('未知 action:' + action.type)
  }
}

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, [
    {
      id: 1,
      text: '第一个任务',
    },
  ])

  return (
    <>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'create', text: '测试' })}>
        添加
      </button>
      <button onClick={() => dispatch({ type: 'delete', id: 1 })}>删除</button>
    </>
  )
}
```

- 实现一个 useReducer

```jsx
import { useState } from 'react'
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)

  function dispatch(action) {
    setState(s => reducer(s, action))
  }
  return [state, dispatch]
}
```

### 使用 Context 生成传递参数

通常来说，你会通过 props 将信息从父组件传递到子组件。但是，如果你必须通过许多中间组件向下传递 props，或是在你应用中的许多组件需要相同的信息，传递 props 会变的十分冗长和不便。Context 允许父组件向其下层无论多深的任何组件提供信息，而无需通过 props 显式传递。

- 使用前考虑
  - 传递 props 是否可行
  - 抽象组件并将 JSX 作为 children 传递给他们
- 使用方法
  - 通过 `export const MyContext = createContext(defaultValue)` 创建并导出 context
  - 在无论层级多深的任何子组件中，把 context 传递给 `useContext(MyContext)` Hook 来读取它
  - 在父组件中把 children 包在 `<MyContext.Provider value={...}>` 中来提供 context

## 脱围机制

### 使用 ref 引用值

当你希望组件“记住”某些信息，但又不想让这些信息**触发新的渲染**时，你可以使用 ref 。

- ref 是一种脱围机制，用于保留不用于渲染的值。你不会经常需要它们
- ref 是一个普通的 JavaScript 对象，具有一个名为 current 的属性，你可以对其进行读取或设置
- 与 state 一样，ref 允许你在组件的重新渲染之间保留信息
- 与 state 不同，设置 ref 的 current 值不会触发重新渲染
- 不要在渲染过程中读取或写入 ref.current。这使你的组件难以预测
- 像 state 一样，你可以让它指向任何东西：字符串、对象，甚至是函数
- 何时使用 ref
  - 存储 timeout ID
  - 存储和操作 DOM 元素
  - 存储不需要被用来计算 JSX 的其他对象。
- `useRef` 内部如何运行的

```js
import { useState } from 'react'

export function useRef(initialValue) {
  const [state, _] = useState({ current: initialValue })
  return state
}
```

- ref 和 state 的不同之处

  | ref                                                     | state                                                                                                                    |
  | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
  | `useRef(initialValue)`返回 `{ current: initialValue }`  | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`)                             |
  | 更改时不会触发重新渲染                                  | 更改时触发重新渲染。                                                                                                     |
  | 可变 —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。                                               |
  | 你不应在渲染期间读取（或写入） `current` 值。           | 你可以随时读取 state。但是，每次渲染都有自己不变的 state [快照](https://react.docschina.org/learn/state-as-a-snapshot)。 |

### 使用 ref 操作 DOM

由于 React 会自动处理更新 DOM 以匹配你的渲染输出，因此你在组件中通常不需要操作 DOM。但是，有时你可能需要访问由 React 管理的 DOM 元素 —— 例如，让一个节点获得焦点、滚动到它或测量它的尺寸和位置。在 React 中没有内置的方法来做这些事情，所以你需要一个指向 DOM 节点的 ref 来实现。

- 如何使用 ref 回调管理 ref 列表 [🔗](https://react.docschina.org/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback)
- 使用命令句柄暴露一部分 API [🔗](https://react.docschina.org/learn/manipulating-the-dom-with-refs#exposing-a-subset-of-the-api-with-an-imperative-handle)

```jsx
import { useRef, forwardRef, useImperativeHandel } from 'react'

export const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    },
  }))

  return <input {...props} ref={inputRef} />
})
```

> 通常，你不希望在渲染期间访问 refs。这也适用于保存 DOM 节点的 refs。在第一次渲染期间，DOM 节点尚未创建，因此 ref.current 将为 `null`。在渲染更新的过程中，DOM 节点还没有更新。所以读取它们还为时过早。
> React 在**提交阶段**设置 ref.current。在更新 DOM 之前，React 将受影响的 ref.current 值设置为 `null`。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。

- React 何时添加 refs [🔗](https://react.docschina.org/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs)
  - 在 渲染 阶段， React 调用你的组件来确定屏幕上应该显示什么。
  - 在 提交 阶段， React 把变更应用于 DOM。
- 使用 flushSync 同步更新 state [🔗](https://react.docschina.org/learn/manipulating-the-dom-with-refs#flushing-state-updates-synchronously-with-flush-sync)
- 避免更改由 React 管理的 DOM 节点

### 使用 `Effect` 同步

有些组件需要与外部系统同步。例如，你可能希望根据 React state 控制非 React 组件、设置服务器连接或在组件出现在屏幕上时发送分析日志。Effects 会在渲染后运行一些代码，以便可以将组件与 React 之外的某些系统同步。

- React 组件两种逻辑类型
  - **渲染逻辑代码**（在描述 UI 中有介绍）位于组件的顶层。你将在这里接收 props 和 state，并对它们进行转换，最终返回你想在屏幕上看到的 JSX。渲染的代码必须是纯粹的——就像数学公式一样，它只应该“计算”结果，而不做其他任何事情。
  - **事件处理程序**（在添加交互性中介绍）是嵌套在组件内部的函数，而不仅仅是计算函数。事件处理程序可能会更新输入字段、提交 HTTP POST 请求以购买产品，或者将用户导航到另一个屏幕。事件处理程序包含由特定用户操作（例如按钮点击或键入）引起的“副作用”（它们改变了程序的状态）。
- Effect 允许你指定由渲染本身，而不是特定事件引起的副作用
- 使用 `useEffect` 包裹副作用，把它分离到渲染逻辑的计算过程之外
- React 使用 `Object.is` 比较依赖项的值
- 默认情况下，Effect 在每次渲染（包括初始渲染）后运行，再次渲染会对比依赖项的值
- 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect
- 不能随意选择依赖项，它们是由 Effect 内部的代码决定的
- 空的依赖数组（`[]`）对应于组件“挂载”，即添加到屏幕上
- 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试
- 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数
- React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数。总是在执行下一轮渲染的 Effect 之前清理上一轮渲染的 Effect；
- 每一轮渲染都有自己的 Effect，只不过会对比依赖的差异确定执不执行副作用函数，也就是每次渲染都会重新生成 effect [🔗](https://react.docschina.org/learn/synchronizing-with-effects#each-render-has-its-own-effects)

### 你可能不需要 Effect

Effect 是 React 范式中的一种脱围机制。它们让你可以 “逃出” React 并使组件和一些外部系统同步，比如非 React 组件、网络和浏览器 DOM。如果没有涉及到外部系统（例如，你想根据 props 或 state 的变化来更新一个组件的 state），你就不应该使用 Effect。移除不必要的 Effect 可以让你的代码更容易理解，运行得更快，并且更少出错。

- 你不必使用 Effect 来处理用户事件
- 如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值
- 想要缓存昂贵的计算，请使用 useMemo 而不是 useEffect。会在渲染期间执行
- 想要重置整个组件树的 state，请传入不同的 key。`key` 不同的组件会被视为两个不应共享任何状态的不同组件
- 想要在 prop 变化时重置某些特定的 state，请在渲染期间处理。
- 组件**显示**时就需要执行的代码应该放在 Effect 中，否则应该放在事件处理函数中。
- 如果你需要更新多个组件的 state，最好在单个事件处理函数中处理。
- 当你尝试在不同组件中同步 state 变量时，请考虑状态提升。
- 你可以使用 Effect 获取数据，但你需要实现清除逻辑以避免[竞态条件](https://en.wikipedia.org/wiki/Race_condition)。
- 在渲染期间更新组件时，React 会丢弃已经返回的 JSX 并立即尝试重新渲染，为了避免非常缓慢的级联重试，React 只允许在渲染期间更新同一组件的状态。
- 当你不确定某些代码应该放在 Effect 中还是事件处理函数中时，先自问**为什么**要执行这些代码。Effect 只用来执行那些显示给用户时组件**需要执行**的代码
- 订阅外部 store ，使用 `useSyncExternalStore`

```js
function subscribe(cb) {
  window.addEventListener('online', cb)
  window.addEventListener('offline', cb)
  return () => {
    window.removeEventListener('online', cb)
    window.removeEventListener('offline', cb)
  }
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  )
}

function App() {
  const isOnline = useOnlineStatus()
}
```

- 实现一个`useSyncExternalStore`

```js
import { useState, useEffect } from 'react'
function useSyncExternalStore(subscribe, defaultValue) {
  const [state, setState] = useState(defaultValue())

  useEffect(() => {
    const clearEffectFn = subscribe(() => {
      setState(defaultValue())
    })
    return clearEffectFn
  }, [])
}
```

```jsx
import { useMemo } from 'react'
function TodoLis({ todos, filter }) {
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter)
  }, [todos, filter])
}
```

### 响应式 Effect 的生命周期

Effect 与组件有不同的生命周期。组件可以挂载、更新或卸载。Effect 只能做两件事：开始同步某些东西，然后停止同步它。如果 Effect 依赖于随时间变化的 props 和 state，这个循环可能会发生多次。React 提供了代码检查规则来检查是否正确地指定了 Effect 的依赖项，这能够使 Effect 与最新的 props 和 state 保持同步。

- React 组件的生命周期
  - 当组件被添加到屏幕上时，它会进行组件的挂载
  - 当组件接收到新的 props 或 state 时，通常是作为对交互的响应，它会进行组件的更新
  - 当组件从屏幕上移除时，它会进行组件的卸载
- 每个 Effect 表示一个独立的同步过程
- 从组件的角度来看，空的 `[]` 依赖数组意味着这个 Effect 仅在组件挂载时连接到聊天室，并在组件卸载时断开连接。
- 在组件主体中声明的所有变量都是响应式的，任何响应式值都可以在重新渲染时发生变化，所以需要将响应式值包括在 Effect 的依赖项中。
- 每个 Effect 描述了一个独立的同步过程，可以**开始**和**停止**。
- 在编写和读取 Effect 时，要独立地考虑每个 Effect（如何开始和停止同步），而不是从组件的角度思考（如何挂载、更新或卸载）。
- 依赖项必须包括 Effect 中读取的每个**响应式值**
  - 检查 Effect 是否表示了独立的同步过程。如果 Effect 没有进行任何同步操作，可能是不必要的。如果它同时进行了几个独立的同步操作，将其拆分为多个 Effect。
  - 如果想读取 props 或 state 的最新值，但又不想对其做出反应并重新同步 Effect，可以将 Effect 拆分为具有反应性的部分（保留在 Effect 中）和非反应性的部分（提取为名为 “Effect Event” 的内容）。阅读关于[将事件与 Effect 分离的内容](#将事件从-effect-中分开)。
  - 避免将对象和函数作为依赖项，如果在渲染过程中创建对象和函数，然后在 Effect 中读取它们，它们将在每次渲染时都不同。这将导致 Effect 每次都重新同步。阅读有关[从 Effect 中删除不必要依赖项](#移除-effect-依赖)

### 将事件从 Effect 中分开

事件处理函数只有在你再次执行同样的交互时才会重新运行。Effect 和事件处理函数不一样，它只有在读取的 props 或 state 值和上一次渲染不一样时才会重新同步。有时你需要这两种行为的混合体：即一个 Effect 只在响应某些值时重新运行，但是在其他值变化时不重新运行。

- 响应式值和响应式逻辑
  - 事件处理函数内部的逻辑是非响应式的。
  - Effect 内部的逻辑是响应式的，如果 Effect 要读取响应式值，你必须将它指定为依赖项。如果接下来的重新渲染引起那个值变化，React 就会使用新值重新运行 Effect 内的逻辑。
- Effect Event
  - 非响应式逻辑和周围响应式 Effect 隔离开来的方法
  - 它是 Effect 逻辑的一部分，但是其行为更像事件处理函数。它内部的逻辑不是响应式的，但是能一直“看见”最新的 props 和 state。
- Effect Event 看成和事件处理函数相似的东西。主要区别是事件处理函数只在响应用户交互的时候运行，而 Effect Event 是你在 Effect 中触发的。Effect Event 让你在 Effect 响应性和不应是响应式的代码间“打破链条”
- 为什么需要`useEffectEvent`，看这个[例子](https://react.docschina.org/learn/separating-events-from-effects#is-it-okay-to-suppress-the-dependency-linter-instead)
- 只在 Effect 内部调用 Effect Event。
- 不要将 Effect Event 传给其他组件或者 Hook。

### 移除 Effect 依赖

当编写 Effect 时，linter 会验证是否已经将 Effect 读取的每一个响应式值（如 props 和 state）包含在 Effect 的依赖中。这可以确保 Effect 与组件的 props 和 state 保持同步。不必要的依赖可能会导致 Effect 运行过于频繁，甚至产生无限循环。请按照本指南审查并移除 Effect 中不必要的依赖。

每当你调整 Effect 的依赖以适配代码时，请注意一下当前的依赖。当这些依赖发生变化时，让 Effect 重新运行是否有意义？有时，答案是“不”：

1. 你可能想在不同的条件下重新执行 Effect 的 不同部分。
2. 你可能想只读取某个依赖的 最新值，而不是对其变化做出“反应”。
3. 依赖可能会因为它的类型是对象或函数而 无意间 改变太频繁。

---

- 当要移除一个依赖时，请证明它不是一个依赖，注意，你不能“选择” Effect 的依赖。每个被 Effect 所使用的响应式值，必须在依赖中声明。依赖是由 Effect 的代码决定的
- 响应式值 包括 props 以及所有你直接在组件中声明的变量和函数。
- 依赖应始终与代码匹配。
- 当你对依赖不满意时，你需要编辑的是代码。
- 抑制 linter 会导致非常混乱的错误，你应该始终避免它。要移除依赖，你需要向 linter “证明”它不是必需的。
- 如果某些代码是为了响应特定交互，请将该代码移至事件处理的地方。
- 如果 Effect 的不同部分因不同原因需要重新运行，请将其拆分为多个 Effect。
- 如果你想根据以前的状态更新一些状态，传递一个更新函数（setState）。
- 如果你想读取最新值而不“反应”它，请从 Effect 中提取出一个 Effect Event。
- 避免 Effect 中有特定事件的逻辑 如`if(true) {// do something}`。
- 每个 Effect 应该代表一个独立的同步过程，删除一个 Effect 并不会影响到另一个 Effect 的逻辑。这意味着他们 同步不同的事情
- 对象和函数作为依赖，会使 Effect 比你需要的更频繁地重新同步，在 JavaScript 中，每个新创建的对象和函数都被认为与其他所有对象和函数不同。即使他们的值相同也没关系！解决方法
  - 将静态对象和函数移出组件
  - 将动态对象和函数移动到 Effect 中

### 使用自定义 Hook

React 有一些内置 Hook，例如 useState，useContext 和 useEffect。有时你需要一个用途更特殊的 Hook：例如获取数据，记录用户是否在线或者连接聊天室。虽然 React 中可能没有这些 Hook，但是你可以根据应用需求创建自己的 Hook。

- 自定义 Hook 让你可以在组件间共享逻辑。
- 自定义 Hook 命名必须以后跟一个大写字母的 use 开头。
- 自定义 Hook 共享的只是状态逻辑，不是状态本身。
- 你可以将响应值从一个 Hook 传到另一个，并且他们会保持最新。
- 每次组件重新渲染时，所有的 Hook 会重新运行。
- 自定义 Hook 的代码应该和组件代码一样保持纯粹。
- 把自定义 Hook 收到的事件处理函数包裹到 Effect Event。
- 不要创建像 useMount 这样的自定义 Hook。保持目标具体化。
- 如何以及在哪里选择代码边界取决于你。

```jsx
function useFadeIn(ref, duration) {
  const [isRunning, setIsRunning] = useState(false)

  useAnimationLoop(isRunning, timePassed => {
    const progress = Math.min(timePassed / duration, 1)
    ref.current.style.opacity = progress
    if (progress === 1) {
      setIsRunning(false)
    }
  })
}
function useAnimationLoop(isRunning, drawFrame) {
  const onFrame = useEffectEvent(drawFrame)
  useEffect(() => {
    if (!isRunning) {
      return
    }

    const startTime = performance.now()
    let frameId = null

    function tick(now) {
      const timePassed = now - startTime
      onFrame(timePassed)
      frameId = requestAnimationFrame(tick)
    }

    tick()

    return () => cancelAnimationFrame(frameId)
  }, [isRunning])
}
```
