// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]

// ============= Your Code Here =============
// M => minuend, S => subtrahend

type BuildArr<L, A extends unknown[] = [], F = unknown> = A['length'] extends L
  ? A
  : BuildArr<L, [...A, F]>

type Subtract<M extends number, S extends number> = BuildArr<M> extends [
  ...BuildArr<S>,
  ...infer S,
]
  ? S['length']
  : never
