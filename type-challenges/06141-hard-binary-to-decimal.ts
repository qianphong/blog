// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]

// ============= Your Code Here =============
type String2Arr<S extends string> = S extends `${infer F}${infer Rest}`
  ? [...String2Arr<Rest>, F]
  : []
type BinaryToDecimal<S extends string> = Sum<GetV<String2Arr<S>>>
type GetV<T extends string[], Index extends number = 0> = T extends [
  infer F,
  ...infer Rest,
]
  ? [F extends '1' ? Power<2, Index> : 0, ...GetV<Rest, Add<Index, 1>>]
  : []
type Sum<T extends number[], S extends number = 0> = T extends [
  infer F,
  ...infer Rest,
]
  ? Sum<Rest, Add<F, S>>
  : S

type Test = BinaryToDecimal<'10101'>

type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArr<Length, Ele, [...Arr, Ele]>

type Power<
  B extends number,
  E extends number,
  R extends number = 1,
> = E extends 0 ? R : Power<B, Subtract<E, 1>, Multiply<R, B>>

type Add<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>,
]['length']

type Subtract<A extends number, B extends number> = BuildArr<A> extends [
  ...BuildArr<B>,
  ...infer Rest,
]
  ? Rest['length']
  : never

type Multiply<
  A extends number,
  B extends number,
  R extends unknown[] = [],
> = B extends 0
  ? R['length']
  : Multiply<A, Subtract<B, 1>, [...R, ...BuildArr<A>]>
