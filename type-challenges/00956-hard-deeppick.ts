// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<
    Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >,
]

// ============= Your Code Here =============
type DeepPick<T, K> = Union2Tuple<Picker<T, K>>

type Picker<T, K> = K extends `${infer L}.${infer Rest}`
  ? L extends keyof T
    ? Record<L, Picker<T[L], Rest>>
    : unknown
  : K extends keyof T
  ? Pick<T, K>
  : unknown

type Union2Tuple<T, U = T> = (U extends T ? (a: U) => unknown : never) extends (
  a: infer R,
) => unknown
  ? R
  : never

type T = Union2Tuple<DeepPick<Obj, 'a' | 'obj.e'>>
