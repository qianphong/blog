# RxJS

## Observable

```ts
import { map, Observable } from 'rxjs'

const observable = new Observable<number>(subscribe => {
  let count = 0
  const timer = setInterval(() => {
    subscribe.next(count++)
  }, 1000)
  return () => {
    console.log('unsubscribe')
    clearInterval(timer)
  }
})

const subscription = observable.subscribe({
  next(data) {
    if (data >= 10) {
      subscription.unsubscribe()
    } else {
      console.log(data)
    }
  },
  complete() {
    console.log('complete')
  },
  error() {
    console.log('error')
  },
})
```

## Higher-order Observables

不太理解
