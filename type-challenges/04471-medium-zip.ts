// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

// ============= Your Code Here =============

type Zip<T extends unknown[], U extends unknown[]> = [T, U] extends [
  [infer L, ...infer RestT],
  [infer R, ...infer RestU],
]
  ? [[L, R], ...Zip<RestT, RestU>]
  : []

type T = Zip<[1, 2, 3], ['1', '2']>

// type GreaterThen<
//   A extends number,
//   B extends number,
//   CountArr extends unknown[] = [],
// > = A extends B
//   ? false
//   : CountArr['length'] extends B
//   ? true
//   : CountArr['length'] extends A
//   ? false
//   : GreaterThen<A, B, [...CountArr, unknown]>

// type Zip<T extends unknown[], U extends unknown[]> = GreaterThen<
//   T['length'],
//   U['length']
// > extends true
//   ? {
//       [K in keyof U]: K extends keyof T ? [T[K], U[K]] : never
//     }
//   : {
//       [K in keyof T]: K extends keyof U ? [T[K], U[K]] : never
//     }
