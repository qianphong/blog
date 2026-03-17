// 12. new
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)

  const result = fn.apply(obj, args)

  return typeof result === 'object' ? result : obj
}

// 13. instanceof

function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj)

  while (proto) {
    if (proto === constructor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }

  return false
}

console.log(myInstanceOf(Date, Object))

// 14. 数组扁平化
function flattenArr(arr) {
  return arr.reduce((res, next) => {
    return res.concat(Array.isArray(next) ? flattenArr(next) : next)
  }, [])
}

// 15. Object.create
function myCreate(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}

// 16. 柯里化 curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return (...rest) => curried(...args, ...rest)
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

    if (!listeners) return

    this.events[event] = listeners.filter(l => l !== listener)
  }

  emit(event, ...args) {
    const listeners = this.events[event]

    if (!listeners) return

    listeners?.forEach(l => l(...args))
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(event, listener)
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
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
  }
}

function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj)

  while (proto) {
    if (proto === constructor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
