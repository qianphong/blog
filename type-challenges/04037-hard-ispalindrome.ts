// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]

// ============= Your Code Here =============
type Reverse<S extends string | number> =
  `${S}` extends `${infer F}${infer Rest}` ? `${Reverse<Rest>}${F}` : S
type IsPalindrome<T extends string | number> = Reverse<T> extends `${T}`
  ? true
  : false

type Test = IsPalindrome<123>
