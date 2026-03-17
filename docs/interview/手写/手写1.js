// 1. 实现bind

Function.prototype.myCall = function (thisArg, ...args) {
  if (thisArg === undefined || thisArg === null) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)
  }

  const specialMethod = Symbol()

  thisArg[specialMethod] = this

  const result = thisArg[specialMethod](...args)

  delete thisArg[specialMethod]

  return result
}
// 实现 apply
Function.prototype.myApply = function (thisArg, args) {
  thisArg ??= window

  if (!Array.isArray(args)) {
    throw new TypeError('args 需要是数组')
  }
  const specialMethod = Symbol('method')

  thisArg[specialMethod] = this

  const result = thisArg[specialMethod](...(args || []))

  delete thisArg[specialMethod]

  return result
}

// bind
Function.prototype.myBind = function (thisArg) {
  thisArg ??= window
  const context = this
  return function (...args) {
    const specialMethod = Symbol('method')
    thisArg[specialMethod] = context
    const result = thisArg[specialMethod](...args)
    delete thisArg[specialMethod]
    return result
  }
}
Function.prototype.myBind2 = function (objThis, ...params) {
  const thisFn = this

  function fnForBind(...secondParams) {
    const isNew = this instanceof fnForBind

    thisArg = isNew ? this : Object(objThis)

    return thisFn.call(thisArg, ...params, ...secondParams)
  }
  fnForBind.prototype = Object.create(thisFn.prototype)

  return fnForBind
}
class Animal {
  constructor(name) {
    this.name = name
  }
  eat(food) {
    console.log(this.name, food)
  }
}

const dog = new Animal('qq')

dog.eat.myCall({ name: 'zt' }, '狗粮')

Function.prototype.MyBind3 = function (objThis, ...params) {
  const thisFn = this
  function funcForBind(...secondParams) {
    const isNew = this instanceof funcForBind
    const thisArg = isNew ? this : Object(objThis)

    return thisFn.call(thisArg, ...params, ...secondParams)
  }
  funcForBind.prototype = Object.create(thisFn.prototype)
  return funcForBind
}
function Student(name) {
  this.name = name
}

Student.prototype.stady = function (name) {
  console.log(this.name, name)
}
// class Student {
//   constructor(name) {
//     this.name = name
//   }

//   stady(className) {
//     console.log(this.name, className)
//   }
// }

const BindStudent = Student.MyBind3(null)
const p = new BindStudent('Tom')

p.stady('数学')

// 手写 debounce

function debounce(fn, delay, immediate = false) {
  let timer = null

  return function (...args) {
    const context = this

    if (timer) clearTimeout(timer)
    // 如果 immediate 只在最开始执行一次，后续触发不会再执行
    if (immediate) {
      const callNow = !timer
      // 这里timer 实际上充当锁，只有当给delay时间过后才解锁，再次触发
      timer = setTimeout(() => {
        timer = null
      }, delay)

      if (callNow) {
        fn.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, timer)
    }
  }
}
// 手写debounce的 trailing 模式，防抖
// leading 模式，只执行第一次
// trailing 模式，只执行最后一次
// leading + trailing，立即触发第一次，结束后在执行一次，但是要避免只触发一次，却执行两次的问题
function debounceWithOptions(fn, delay, options = {}) {
  let timer = null
  let lastThis = null
  let lastArgs = null

  const leading = options.leading
  const trailing = options.trailing !== false

  const invoke = () => {
    fn.apply(lastThis, lastArgs)
  }

  return function (...args) {
    lastThis = this
    lastArgs = args

    if (timer) clearTimeout(timer)
    // leading 模式，且timer为空，可以理解为第一次触发
    const shouldCallNow = leading && !timer

    timer = setTimeout(() => {
      // 这里把timer置为null是为了接触锁定，过了delay时间后可以重新出发
      timer = null
      // 为什么要加!shouldCallNow, 是为了避免只点击一次，却触发两次的问题，因为点击第一次timer为空，这个判断为false
      if (trailing && !shouldCallNow) {
        invoke()
      }
    }, delay)

    if (shouldCallNow) {
      invoke()
    }
  }
}

// 手写throttle,规定时间内只执行一次，通过时间戳形式
function throttle(fn, delay) {
  let last = Date.now()

  return function (...args) {
    const now = Date.now()
    if (now - last > delay) {
      fn.apply(this, args)
      last = now()
    }
  }
}

// 定时器版本
function throttle2(fn, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}
// 这两种形式都无法保证使用最新参数执行，改进版本
function throttle3(fn, delay) {
  let timer = null
  let lastThis = null
  let lastArgs = null
  return function (...args) {
    lastThis = this
    lastArgs = args
    if (!timer) {
      setTimeout(() => {
        timer = null
        fn.apply(lastThis, lastArgs)
      }, delay)
    }
  }
}

// cloneDeep
function cloneDeep(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  if (map.has(obj)) {
    return map.get(obj)
  }

  let result

  if (obj instanceof Map) {
    result = new Map()
    map.set(obj, result)
    obj.forEach((value, key) => {
      result.set(key, cloneDeep(value, map))
    })
    return result
  }
  if (obj instanceof Set) {
    result = new Set()
    map.set(obj, result)
    obj.forEach(value => {
      result.add(cloneDeep(value, map))
    })
    return result
  }

  result = Array.isArray(obj) ? [] : {}

  map.set(obj, result)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = cloneDeep(obj[key], map)
    }
  }
  return result
}

// Promise,Promise.all,Promise.race,Promise.reject
class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise(resolve => {
      if (this.status === 'fulfilled') {
        const x = onFulfilled(this.value)
        resolve(x)
      }
      if (this.status === 'rejected') {
        const x = onRejected(this.reason)
        resolve(x)
      }
      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          const x = onFulfilled(this.value)
          resolve(x)
        })
        this.onRejectedCallbacks.push(() => {
          const x = onRejected(this.reason)
          resolve(x)
        })
      }
    })
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise(resolve => resolve(value))
  }
  static all(promises) {
    return new MyPromise(resolve => {
      const results = []
      let count = 0
      if (promises.length === 0) {
        return resolve(results)
      }
      promises.forEach((p, index) => {
        MyPromise.resolve(p).then(res => {
          results[index] = res
          if (++count >= promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(p => {
        MyPromise.resolve(p).then(resolve, reject)
      })
    })
  }
}
// 实现并发控制

function promisePool1(tasks, limit) {
  const results = []
  let count = 0

  const run = () => {
    if (count >= tasks.length) {
      return Promise.resolve()
    }
    const i = count++
    return tasks[i]().then(res => {
      results[i] = res
      return run()
    })
  }

  return Promise.all(Array.from({ length: limit }).map(() => run())).then(
    () => results,
  )
}

async function promisePool(tasks, limit) {
  const executing = new Set()
  const results = []

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task())

    results.push(p)
    executing.add(p)

    const clean = () => {
      executing.delete(p)
    }
    p.then(clean, clean)

    // 达到并发上限，等待最快的一个完成
    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }
  return Promise.all(results)
}
