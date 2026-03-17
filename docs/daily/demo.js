const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

const uniqueArr = [...new Set(arr)]

const data = [
  { name: '张三', age: 18 },
  { name: '李四', age: 20 },
  { name: '王五', age: 19 },
  { name: '赵六', age: 21 },
]

const sortedData = data.sort((a, b) => a.age - b.age)

console.log(uniqueArr) // [1, 2, 3, 4, 5]
console.log(sortedData) // [{ name: '张三', age: 18 }, { name: '王五', age: 19 }, { name: '李四', age: 20 }, { name: '赵六', age: 21 }]

// 4、在以下组件中，补充逻辑，实时显示当前时间,格式为：2020-01-01 12:00:00
// function Demo1() {
//   const [currentTime, setCurrentTime] = useState('')
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date()
//       const year = now.getFullYear()
//       const month = String(now.getMonth() + 1).padStart(2, '0')
//       const day = String(now.getDate()).padStart(2, '0')
//       const hours = String(now.getHours()).padStart(2, '0')
//       const minutes = String(now.getMinutes()).padStart(2, '0')
//       const seconds = String(now.getSeconds()).padStart(2, '0')
//       setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
//     }, 1000)
//     return () => clearInterval(timer)
//   })
//   return <div>当前时间：{currentTime}</div>
// }
// 3、写 2 个函数
// 第一个：从 url 中的获取参数
// 例如：http://www.alibb.com?name=张三&age=18
// 期望输出：{ name: '张三', age: 18 }
// 第二个：向 url 中的添加参数,要求传递对象后解析成参数到 url 上。
// 如：传参{name:'张三',age：18}，得到http://www.alibb.com?name=张三&age=18

const getUrlParam = (url, param) => {
  const searchParams = new URL(url).searchParams
  const result = {}
  searchParams.forEach((value, key) => {
    result[key] = value
  })
  return result
}
console.log(getUrlParam('http://www.alibb.com?name=张三&age=18', 'name')) // '张三'

const addUrlParam = (url, params) => {
  const query = new URLSearchParams(params).toString()
  return `${url}?${query}`
}
console.log(addUrlParam('http://www.alibb.com', { name: '张三', age: 18 })) // 'http://www.alibb.com?name=张三&age=18'

function debounce(fn, delay) {
  let timeout = null
  return function (...args) {
    clearTimeout(timeout)

    time = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
