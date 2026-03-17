// 1. call
Function.prototype.myCall = function (thisArg, ...args) {
  thisArg = thisArg === null ? window || globalThis : Object(thisArg)

  const specialMethod = Symbol('method')
  thisArg[specialMethod] = this
  const result = thisArg[specialMethod](...args)
  delete thisArg[specialMethod]
  return result
}
// 2. apply
Function.prototype.myApply = function (thisArg, args) {
  thisArg = thisArg === null ? window || globalThis : Object(thisArg)

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
    const context = isNew ? this : objThis

    return self.call(context, ...params, ...secondParams)
  }
  funcForBind.prototype = Object.create(self.prototype)
  return funcForBind
}

// 4. debounce 防抖
function debounce(fn, delay, immediate) {
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
// 5. debounce 支持 leading 和 trailing
function debounce2(fn, delay, options = {}) {
  let timer = null
  let lastThis = null
  let lastArgs = null

  const leading = options.leading
  const trailing = options.trailing !== false

  const execute = () => {
    fn.apply(lastThis, lastArgs)
  }

  return function (...args) {
    lastArgs = args
    lastThis = this

    const shouldCallNow = leading && !timer

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
// 6. throttle 节流，规定时间执行一次, 使用时间戳
function throttle(fn, delay) {
  let last = 0

  return function (...args) {
    const now = Date.now()
    if (now - last > delay) {
      fn.apply(this, args)
      last = now
    }
  }
}
// 7. throttle 使用定时器
function throttle2(fn, delay) {
  let timer = null
  let lastThis = null
  let lastArgs = null
  return function (...args) {
    lastThis = this
    lastArgs = args
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(lastThis, lastArgs)
      }, delay)
    }
  }
}
