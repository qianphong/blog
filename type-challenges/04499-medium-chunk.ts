// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

// ============= Your Code Here =============
// type Chunk<
//   T extends unknown[],
//   S extends number,
//   R extends unknown[] = [],
//   N extends unknown[] = [],
// > = T['length'] extends 0
//   ? N['length'] extends 0
//     ? R
//     : [...R, N]
//   : T extends [infer F, ...infer Rest]
//   ? [...N, F]['length'] extends S
//     ? Chunk<Rest, S, [...R, [...N, F]], []>
//     : Chunk<Rest, S, R, [...N, F]>
//   : R
type Chunk<
  T extends unknown[],
  S extends number,
  R extends unknown[] = [],
> = R['length'] extends S
  ? [R, ...Chunk<T, S, []>]
  : T extends [infer F, ...infer Rest]
  ? Chunk<Rest, S, [...R, F]>
  : R extends []
  ? []
  : [R]
type T = Chunk<[1, 2, 3], 2>
