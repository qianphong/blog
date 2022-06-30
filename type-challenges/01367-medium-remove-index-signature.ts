// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
}

type FooBar = {
  [key: symbol]: any
  foobar(): void
}

type Baz = {
  bar(): void
  baz: string
}

const symbolKey = Symbol('test')

type Qux = {
  0: number
  [symbolKey]: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
  Expect<Equal<RemoveIndexSignature<Qux>, { 0: number; [symbolKey]: string }>>,
]

// ============= Your Code Here =============
// type RemoveIndexSignature<T> = {
//   [Key in keyof T as `${Key & string}` extends `${infer K}` ? K : never]: T[Key]
// }
type IsKey<K> = string extends K
  ? never
  : number extends K
  ? never
  : symbol extends K
  ? never
  : K
type RemoveIndexSignature<T> = { [K in keyof T as IsKey<K>]: T[K] }
type T = RemoveIndexSignature<Baz>

type C = T

const qux: Qux = {
  '0': 1,
  [symbolKey]: '2',
}
