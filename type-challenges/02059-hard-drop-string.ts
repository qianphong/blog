// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>
  >,
]

// ============= Your Code Here =============
type String2Union<S extends string> = S extends `${infer F}${infer Rest}`
  ? F | String2Union<Rest>
  : never

type DropString<
  S extends string,
  R extends string,
  U = String2Union<R>,
> = S extends `${infer F}${infer Rest}`
  ? `${F extends U ? '' : F}${DropString<Rest, R>}`
  : S

type Test = DropString<' b u t t e r f l y ! ', 'but'>
