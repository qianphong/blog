export {}
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends A
  ? 1
  : 2
  ? true
  : false
type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = [],
> = Arr['length'] extends Length ? Arr : BuildArr<Length, Ele, [...Arr, Ele]>

type Add<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>,
]['length']

type CC = Add<10, 1>

type Subtract<A extends number, B extends number> = BuildArr<A> extends [
  ...BuildArr<B>,
  ...infer Rest,
]
  ? Rest['length']
  : never

type DD = Equal<Subtract<10, 2>, 8>

type Multiply<
  A extends number,
  B extends number,
  R extends unknown[] = [],
> = B extends 0
  ? R['length']
  : Multiply<A, Subtract<B, 1>, [...R, ...BuildArr<A>]>

type E = Multiply<2, 12>

type Divide<
  A extends number,
  B extends number,
  R extends unknown[] = [],
> = A extends 0 ? R['length'] : Divide<Subtract<A, B>, B, [unknown, ...R]>

type F = Divide<10, 2>

type GreaterThen<
  A extends number,
  B extends number,
  CountArr extends unknown[] = [],
> = A extends B
  ? false
  : CountArr['length'] extends B
  ? true
  : CountArr['length'] extends A
  ? false
  : GreaterThen<A, B, [...CountArr, unknown]>

type G = GreaterThen<4, 2>

/**
 * 1 1
 * 2 0+1
 * 3 1 + 0 + 1
 * 4 1
 */

type Fibonacci<
  Counter extends number,
  A extends number = 0,
  B extends number = 1,
> = Counter extends 0
  ? Add<A, B>
  : Fibonacci<Subtract<Counter, 1>, B, Add<A, B>>

type FF = Fibonacci<8>

type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[],
> = `${Block}-${Element[number]}--${Modifiers[number]}`

type ElButton = BEM<
  'el',
  ['button'],
  ['default', 'primary', 'success', 'warning', 'error']
>

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`

type CC = Combination<'a', 'b'>
