// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

// ============= Your Code Here =============

type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : TrimRight<S>
type TrimRight<S extends string> = S extends `${infer Rest}${' ' | '\n' | '\t'}`
  ? TrimRight<Rest>
  : S
type Trim<S extends string> = TrimLeft<S>
