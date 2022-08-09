// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
]

// ============= Your Code Here =============
type Merge<
  T extends Record<PropertyKey, unknown>,
  K extends string,
  V,
  Keys extends keyof T = keyof T,
> = K extends Keys
  ? {
      [key in Keys | K]: key extends K
        ? Equal<T[key], V> extends true
          ? V
          : [T[key], V]
        : T[key]
    }
  : {
      [key in Keys | K]: key extends K ? V : T[key]
    }

type Format<
  S extends string,
  O extends Record<PropertyKey, unknown> = {},
> = S extends `${infer Key}=${infer Value}`
  ? Merge<O, Key, Value>
  : Merge<O, S, true>

type ParseQueryString<
  S extends string,
  U extends Record<PropertyKey, unknown> = {},
> = S extends ''
  ? {}
  : S extends `${infer Q}&${infer Rest}`
  ? ParseQueryString<Rest, Format<Q, U>>
  : Format<S, U>

type Test = ParseQueryString<'k1=v1&k2=v2'>
