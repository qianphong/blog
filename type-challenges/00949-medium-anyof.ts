// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

// ============= Your Code Here =============
// type Falsy = '' | [] | 0 | false
// type IsFalsy<T> = T extends Falsy
//   ? true
//   : T extends object
//   ? [keyof T] extends [never]
//     ? true
//     : false
//   : false
// type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer Rest]
//   ? IsFalsy<F> extends true
//     ? AnyOf<Rest>
//     : true
//   : false
type Falsy = '' | 0 | false | [] | { [key: string]: never }
type AnyOf<T extends unknown[]> = T[number] extends Falsy ? false : true
type Test<T> = T extends Falsy ? false : true

type T = Test<[0, 1][number]>
