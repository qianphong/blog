// 1. deepClone深拷贝
function cloneDeep(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result

  if (map.has(obj)) {
    return map.get(obj)
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

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

  map.set(obj, res)

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = cloneDeep(obj[key])
    }
  }

  return res
}

function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (map.has(obj)) {
    return map.get(obj)
  }

  if (obj instanceof Date) {
    return new Date(obj)
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }

  let result

  if (obj instanceof Map) {
    result = new Map()

    map.set(obj, result)

    obj.forEach((value, key) => {
      result.set(key, deepClone(value, map))
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

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key], map)
    }
  }
  return result
}
// 2. promise
class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.result = null
    this.reason = undefined
    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.result = value
      }
    }
    const reject = value => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = value
      }
    }
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.result)
    }
    if (this.status === 'rejected') {
      onRejected(this.reason)
    }
  }
}
// 支持异步和链式调用
class MyPromise2 {
  constructor(executor) {
    this.status = 'pending'
    this.result = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.result = value
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

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    return new MyPromise2((resolve, reject) => {
      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          const x = onFulfilled(this.result)
          resolve(x)
        })
        this.onRejectedCallbacks.push(() => {
          const x = onRejected(this.reason)
          reject(x)
        })
      }
      if (this.status === 'fulfilled') {
        const x = onFulfilled(this.result)
        resolve(x)
      }
      if (this.status === 'rejected') {
        const x = onRejected(this.reason)
        reject(x)
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise2) {
      return value
    }
    return new Promise(resolve => {
      resolve(value)
    })
  }

  static all(promises) {
    return new MyPromise2((resolve, reject) => {
      const result = []
      let count = 0

      if (promises.length === 0) {
        return resolve(result)
      }

      promises.forEach((p, index) => {
        MyPromise2.resolve(p).then(v => {
          result[index] = v
          count += 1

          if (count === promises.length) {
            resolve(result)
          }
        })
      })
    })
  }

  static race(promise) {
    return new MyPromise2((resolve, reject) => {
      promise.forEach(p => {
        MyPromise2.resolve(p).then(resolve, reject)
      })
    })
  }
}
// 3. 并发控制

function promisePool(tasks, limit) {
  return new Promise(async resolve => {
    const result = []
    let count = 0
    const run = () => {
      if (count >= tasks.length) {
        return Promise.resolve()
      }

      const i = count++

      return tasks[i]().then(res => {
        result[i] = res
        return run()
      })
    }

    await Promise.all(Array.from({ length: limit }).map(() => run()))
    return result
  })
}
// 通过队列实现
async function promisePool1(tasks, limit) {
  const executing = []
  const result = []

  for (const task in tasks) {
    const p = Promise.resolve().then(() => task())
    result.push(p)

    if (limit <= tasks.length) {
      const e = p.then(() => {
        executing.splice(executing.indexOf(e), 1)
      })
      executing.push(e)

      if (executing.length >= limit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(result)
}

// 4. eventbus
