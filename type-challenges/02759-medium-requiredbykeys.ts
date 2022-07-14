// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
]

// ============= Your Code Here =============
type Copy<T> = { [K in keyof T]: T[K] }
type RequiredByKeys<T, K extends PropertyKey = keyof T> = Copy<
  Omit<T, K> & {
    [key in keyof T & K]-?: T[key]
  }
>

type T = RequiredByKeys<User, 'name' | 'unknown'>

type Test = (('1' | '2' | 3) & '1') | number
