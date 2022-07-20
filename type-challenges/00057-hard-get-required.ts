// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >,
]

// ============= Your Code Here =============
// your answers

type GetRequired<T> = {
  [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K]
}
type Test = {} extends { a?: string } ? true : false
