// 答题期间允许随时查阅文档，一共 180 分钟，系统会自动交卷
// 允许在本地编辑器中编写后提交，某些题代码量较大可以不用编写具体的逻辑，将实现方案的部分代码体现出即可
// 越靠前的题目越重要，期间有问题，可以在右下角的聊天工具进行提问,若面试人不在线，可联系招聘者反馈
// 注意：答案请直接在在线编辑器对应的题目下作答，不要通过聊天窗口发送，否则视为机试不通过

// 1、对以下数组去重

const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
const uniqueArr = [...new Set(arr)]

// 2、对以下数据进行排序，按照年龄从小到大排序
const data = [
{ name: '张三', age: 18 },
{ name: '李四', age: 20 },
{ name: '王五', age: 19 },
{ name: '赵六', age: 21 }
]
const sortedData = data.sort((a, b) => a.age - b.age)

// 3、写 2 个函数
// 第一个：从 url 中的获取参数
// 例如：http://www.alibb.com?name=张三&age=18
// 期望输出：{ name: '张三', age: 18 }
// 第二个：向 url 中的添加参数,要求传递对象后解析成参数到 url 上。
// 如：传参{name:'张三',age：18}，得到http://www.alibb.com?name=张三&age=18

const getUrlParam = (url, param) => {
const urlObj = new URL(url)
return urlObj.searchParams.get(param)
}

const addUrlParam = (url, params) => {
const query = new URLSearchParams(params).toString()
return `${url}?${query}`
}

// 4、在以下组件中，补充逻辑，实时显示当前时间,格式为：2020-01-01 12:00:00
function Demo1() {
const [currentTime, setCurrentTime] = useState('')

    return <div>当前时间：{currentTime}</div>

}

// 5、在以下组件中，补充逻辑，监听页面（非题中 div 元素）鼠标点击事件，点击后 点击次数+1 并在页面上弹窗显示点击次数
function Demo2() {
const [count, setCount] = useState(0)

    return <div>点击次数：{count}</div>

}

// 6、通过 css 实现一个长宽 300 像素的 div 在屏幕上下左右居中（不考虑任何 API 兼容性，只修改 div 的样式，不可以添加额外的节点）

   <style>
   #div {
     width: 300px;
     height: 300px;
   }
   </style>
   <body>
     <div id="div"></div>
   </body>

// 7. 实现一个 React Function Component，不需要写 import 语句，要求：
// a. 监听组件中的 iframe onload 时发送的 message
// b. 用户鼠标滚动使 iframe 在页面中曝光时，向 iframe 发送 message
// c. 不可使用 useRef 或者 createRef，禁用 iframe 的 onLoad 事件，不可使用 document.getElementByxxx 或 querySelector 等；提示：使用 callback ref 绑定元素

function FC() {
return (

  <div style={{ height: '100vh', overflowY: 'scroll' }}>
    <div style={{ height: '1000vh' }} />
    <iframe src="https://test.xyz" style={{ border: 0 }} />
  </div>
  )
}

// iframe 中的 js 代码如下所示（题目的一部分，不需要改）

 <script>
{/* // 接收 FC 发送的 message */}
  window.onmessage = (event) => {
    if (event.data === 'appear') {
      window.parent.postmessage('appear callback');
    }
  };

  window.onload = () => {
    window.parent.postmessage('load');
  };
</script>

// 8. React 实战题
// 使用 antd 提供的组件（Table，Form 等），实现一个 Todo-List。
// 要求：
// - 一个任务包含自动生成的任务 id、标题、描述、创建时间、计划完成时间
// - 具备创建任务
// - 具备状态的修改、内容的修改、任务的删除
// antd apis： https://ant.design/components/table-cn

import React from 'react'

function App() {
return <></>
}

// 9、请改造以下 2 个组件，完成父子组件之间的互相通信（通过 ref），请注意是双向通信 在子组件中展示当前人姓名和状态，并且可以通过父组件的按钮修改姓名和状态
// 在不改变 2 个状态归属组件的前提下（即 name 状态必须在父组件内维护，status 状态必须在子组件内维护）
function Parent() {
const [name, setName] = useState('张三')
const childRef = useRef(null)
const changeName = name => {
setName(name)
}
const handleandleChangeStatus = status => {
childRef.current?.changeStatus(status)
}
return (
<div>
{/_ 以下2个按钮点击可以修改姓名 _/}
<button onClick={() => changeName('李四')}>改名为李四</button>
<button onClick={() => changeName('王五')}>改名为王五</button>
{/_ 以下2个按钮点击可以修改状态 _/}
<button onClick={() => handleandleChangeStatus('在线')}>我要上线</button>
<button onClick={() => handleandleChangeStatus('离线')}>我要下线</button>
<Child ref={childRef} name={name}/>
</div>
)

}

// 子组件 展示姓名，并显示当前状态
function Child({name,status}) {
const [status, setStatus] = useState('在线')
const handleChangeStatus = status => {
setStatus(status)
}
useImperativeHandle(ref, () => ({
changeStatus: handleChangeStatus
}))
return (
<div>
<div>姓名：{name}</div>
<div>当前状态：{status}</div>
</div>
)

}

// 10. 实现防抖或节流函数（二选一）
function throttle() {}

function debounce(fn, delay, immediate) {
let timeout = null
let result = null

return function (...args) {
const self = this
if(timeout) clearTimeout(timeout)

    if(immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if(callNow) result = fn.apply(self, args)
    } else {
      timeout = setTimeout(() => {
        fn.apply(self, args)
      }, delay)
    }

}
return result
}

// 11. 实现一个 Promise 类或对象，要求包含 then、catch、resolve、reject 方法以及构造函数，要求使用 class 语法糖

class MyPromise {
constructor(executor) {
this
}
}
