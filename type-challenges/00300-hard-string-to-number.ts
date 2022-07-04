// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
]

// ============= Your Code Here =============
type ToNumber<
  S extends string,
  R extends unknown[] = [],
> = `${R['length']}` extends S ? R['length'] : ToNumber<S, [...R, unknown]>
