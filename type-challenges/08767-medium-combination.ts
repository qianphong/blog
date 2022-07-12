// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz'][number]>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >,
]

// ============= Your Code Here =============
type Combination<T extends string, S extends string = '', U = T> = [T] extends [
  never,
]
  ? S
  : U extends T
  ? S extends ''
    ? Combination<Exclude<T, U>, `${U}`>
    : S | Combination<Exclude<T, U>, `${S} ${U}`>
  : S
type Test = Combination<['foo', 'bar', 'baz'][number]>

// a | b | c  -> a b|c
