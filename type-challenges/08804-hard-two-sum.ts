// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
]

// ============= Your Code Here =============
// type BuildArr<Length, R extends unknown[] = []> = R['length'] extends Length
//   ? R
//   : BuildArr<Length, [...R, unknown]>

// type Add<A, B> = [...BuildArr<A>, ...BuildArr<B>]['length']
// // 1,[2,3] => [1+2,1+3]
// type SumArr<A, B extends number[]> = B extends [infer F, ...infer Rest extends number[]]
//   ? [Add<A, F>, ...SumArr<A, Rest>]
//   : []
// //[1,2,3] => []
// type GetSum<T extends number[]> = T extends [infer F, ...infer Rest extends number[]]
//   ? [...SumArr<F, Rest>, ...GetSum<Rest>]
//   : []

// type TwoSum<T extends number[], U extends number> = U extends GetSum<T>[number]
//   ? true
//   : false
type N2Array<N extends number, A extends any[] = []> = A['length'] extends N ? A : N2Array<N, [...A, 1]>

type SubN<A extends number, B extends number> = 
  N2Array<A> extends [...N2Array<B>, ...infer F]
    ? F['length']
    : never

type TwoSum<T extends number[], U extends number, M extends number = -1> = 
  T extends [infer F extends number, ...infer Rest  extends number[]]
    ? F extends M
      ? true
      : TwoSum<Rest, U, M | SubN<U, F>>
    : false

