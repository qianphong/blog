// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
]

// ============= Your Code Here =============
type BuildArr<Length, T extends unknown[] = []> = T['length'] extends Length
  ? T
  : BuildArr<Length, [...T, unknown]>

type Minus<A extends number, B extends number> = BuildArr<A> extends [
  ...BuildArr<B>,
  ...infer Rest,
]
  ? Rest['length']
  : never

type MinusOne<T extends number> = Minus<T, 1>
// ...etc
