type ParseQueryString<
  T extends string,
  O = {},
> = T extends `${infer K}=${infer V}${infer Rest}`
  ? ParseQueryString<Rest, { [key in K extends `&${infer A}` ? A : K]: V } & O>
  : O

type res = ParseQueryString<'a=1&b=2&c=3'>

type MapType<T extends { [K: string]: number | string }> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key &
    string}`]: `${T[Key]}${T[Key]}${T[Key]}`
}

type res1 = MapType<{ a: 1 }>

type GetFist<T extends unknown[]> = T extends [infer F, ...unknown[]]
  ? F
  : never

type res2 = GetFist<['1', 2, 3]>

type GetRefProps<Props> = Props extends { ref?: any } ? Props['ref'] : never
type GetRefPropsRes = GetRefProps<{ ref?: undefined; a: 2 }>

type A = never extends never ? true : false

type J<T> = T extends string ? true : false

type B = J<never>

type MergeArr<A extends unknown[], B extends unknown[]> = {
  [K in keyof A]: K extends keyof B ? [A[K], B[K]] : undefined
}

type Res3 = MergeArr<[1, 2], ['a', 'b']>
const b: Res3 = [
  [1, 'a'],
  [2, 'b'],
]

type ToMutable<T> = {
  -readonly [key in keyof T]: T[key]
}
type ToRequired<T> = {
  [key in keyof T]-?: T[key]
}

type Test = {
  readonly a: string
  b?: number
  c: boolean
}
type Test1 = ToMutable<Test>
type Test2 = ToRequired<Test>

const useTest = <T>(cb?: (...args: T[]) => unknown) => {
  return { cb }
}
const { cb } = useTest((a: number | string, b, c) => {
  if (typeof a === 'string') return a + b + c
})

const result = cb?.(1, '2', 3)

// type FirstIfString<T> = T extends [infer F extends string, ...unknown[]] ? F : never

const str = 1

type GetReturnType<F> = F extends (...args: any[]) => infer ReturnType
  ? ReturnType
  : never

type CapitalizeStr<T extends string> = T extends `${infer F}${infer Rest}`
  ? `${Uppercase<F>}${Rest}`
  : T

type ReverseArr<T extends readonly unknown[]> = T extends readonly [
  infer F,
  ...infer Rest,
]
  ? [...ReverseArr<Rest>, F]
  : []

const arr1 = [1, 2, 3, 4, 5, 6] as const

type Arr = ReverseArr<typeof arr1>

type IsAny<T> = '1' extends '2' & T ? true : false
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never
type IsNever<T> = [T] extends [never] ? true : false

type TestAny<T> = T extends number ? 1 : 2
type Test22 = TestAny<any> // 1 | 2
