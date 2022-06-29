// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]

// ============= Your Code Here =============
type Copy<T> = {
  [K in keyof T]: T[K]
}
type PartialByKeys<T, K = keyof T> = Copy<
  Omit<T, K & keyof T> & {
    [key in K & keyof T]?: T[key]
  }
>
// type Merge<F, S> = {
//   [key in keyof F | keyof S]: key extends keyof S
//     ? S[key]
//     : key extends keyof F
//     ? F[key]
//     : never
// }
// type PartialByKeys<T, K> = Merge<
//   {
//     [key in Exclude<keyof T, K>]: T[key]
//   },
//   {
//     [key in Extract<keyof T, K>]?: string
//   }
// >

// type T = PartialByKeys<User, 'name'>
