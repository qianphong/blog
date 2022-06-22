// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]

// ============= Your Code Here =============
// type MyAwaited<T> = T extends Promise<infer U>
//   ? U extends Promise<unknown>
//     ? MyAwaited<U>
//     : U
//   : T

// declare function PromiseAll<T extends readonly unknown[]>(values: T): T
// type GetResult<
//   T extends readonly unknown[],
//   V extends unknown[] = [],
// > = T extends [infer F, ...infer Rest]
//   ? GetResult<Rest, [...V, MyAwaited<F>]>
//   : V

// type A = typeof promiseAllTest3

declare function PromiseAll<T extends any[]>(
  values: readonly [...T],
): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]
}>

type A<T extends string[]> = { [K in keyof T]: `string_${T[K]}` }
type C = A<['1', '2', '3']>
