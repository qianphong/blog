// 1. call
Function.prototype.myCall = function (thisArg, ...args) {
  thisArg = thisArg == null ? window || globalThis : Object(thisArg)

  const specialMethod = Symbol('method')
  thisArg[specialMethod] = this
  const result = thisArg[specialMethod](...args)
  delete thisArg[specialMethod]

  return result
}

// 2. apply
Function.prototype.myApply = function (thisArg, args) {
  thisArg = thisArg == null ? window || globalThis : Object(thisArg)

  const specialMethod = Symbol('method')
  thisArg[specialMethod] = this
  const result = thisArg[specialMethod](...(args || []))
  delete thisArg[specialMethod]

  return result
}

// 3. bind
Function.prototype.myBind = function (objThis, ...params) {
  const self = this

  function funcForBind(...secondParams) {
    const isNew = this instanceof funcForBind

    const context = isNew ? this : Object(objThis)

    return self.call(context, ...params, ...secondParams)
  }

  funcForBind.prototype = Object.create(self.prototype)

  return funcForBind
}

// 4. debounce immediate
function debounce2(fn, delay, immediate) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)

    if (immediate) {
      const shouldCallNow = !timer

      timer = setTimeout(() => {
        timer = null
      }, delay)

      if (shouldCallNow) {
        fn.apply(this, args)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

// 5. debounce leading trailing
function debounce(fn, delay, options = {}) {
  let timer = null

  const leading = options.leading
  const trailing = options.trailing !== false

  let lastArgs = undefined
  let lastThis = undefined

  const execute = () => {
    fn.apply(lastThis, lastArgs)
  }
  return function (...args) {
    lastArgs = args
    lastThis = this

    const shouldCallNow = leading && !timer

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      if (trailing && !shouldCallNow) {
        execute()
      }
    }, delay)

    if (shouldCallNow) {
      execute()
    }
  }
}

// 6. throttle 时间戳
function throttle2(fn, delay) {
  let last = 0

  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) {
      fn.apply(this, args)
      last = now
    }
  }
}

// 7. throttle 定时器
function throttle(fn, delay) {
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

// 8. deepClone
function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)

  if (map.has(obj)) return map.get(obj)

  let result

  if (obj instanceof Map) {
    result = new Map()
    map.set(obj, result)
    obj.forEach((value, key) => {
      result.set(deepClone(key, map), deepClone(value, map))
    })
    return result
  }

  if (obj instanceof Set) {
    result = new Set()
    map.set(obj, result)
    obj.forEach(value => {
      result.add(deepClone(value, map))
    })
    return result
  }

  result = Array.isArray(obj) ? [] : {}
  map.set(obj, result)

  // for (const key in obj) {
  //   if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //     result[key] = deepClone(obj[key])
  //   }
  // }
  Reflect.ownKeys(obj).forEach(key => {
    result[key] = deepClone(obj[key])
  })
  return result
}

// 9. Promise，resolve，all，race
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
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e
          }

    return new MyPromise((resolve, reject) => {
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
    if (value instanceof MyPromsie) return value

    return new MyPromise(resolve => resolve(value))
  }

  static all(promises) {
    const results = []
    let count = 0

    return new MyPromise((resolve, reject) => {
      promises.forEach((p, index) => {
        MyPromise.resolve(p).then(value => {
          results[index] = value
          if (++count >= promises.length) {
            resolve(results)
          }
        }, reject)
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

// 10. promisePoll 并发控制
function promisePoll2(tasks, limit) {
  const results = []
  let count = 0

  const run = () => {
    if (count >= tasks.length) return Promise.resolve()

    const i = count++

    const task = tasks[i]

    task().then(value => {
      results[i] = value
      return run()
    })
  }

  const workers = Array.from({ length: limit }, () => run())

  return Promise.all(workers).then(() => results)
}

// 11. promisePoll 使用 race 控制
async function promisePoll(tasks, limit) {
  const results = []
  const executing = new Set()

  for (const task of tasks) {
    const p = Promise.resolve().then(() => task())
    results.push(p)
    executing.add(p)

    const clean = () => {
      executing.delete(p)
    }
    p.then(clean, clean)

    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}

// 12. Object.create
function myCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
// 13. new
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)

  const result = fn.apply(obj, args)

  return typeof result === 'object' ? result : obj
}

// 14. instanceof
function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj)

  while (proto) {
    if (proto === constructor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }

  return false
}
// 15. 数组扁平化
function flatten(arr) {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

// 16. 柯里化 curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args)
    return (...nest) => curried(...args, ...nest)
  }
}

// 17. EventEmitter
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(listener)
  }

  off(event, listener) {
    const listeners = this.events[event]

    if (!listener) return

    this.events[event] = listeners.filter(f => f !== listener)
  }

  emit(event, ...args) {
    const listeners = this.events[event]

    if (!listeners) return

    listeners.forEach(l => l(...args))
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(event, wrapper)
    }

    this.on(event, wrapper)
  }
}

// 18. 使用Map 实现 LRU
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key) {
    if (!this.cache.has(key)) return -1

    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key)

    this.cache.set(key, value)

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
  }
}
