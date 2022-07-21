/* ---------------------------- ParseQueryString ---------------------------- */
type ParseQueryString<
  T extends string,
  O = {},
> = T extends `${infer K}=${infer V}${infer Rest}`
  ? ParseQueryString<Rest, { [key in K extends `&${infer A}` ? A : K]: V } & O>
  : O

type res = ParseQueryString<'a=1&b=2&c=3'>

/* --------------------------------- MapType -------------------------------- */
type MapType<T extends { [K: string]: number | string }> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key &
    string}`]: `${T[Key]}${T[Key]}${T[Key]}`
}

type res1 = MapType<{ a: 1 }>

type GetRefProps<Props> = Props extends { ref?: any } ? Props['ref'] : never
type GetRefPropsRes = GetRefProps<{ ref?: undefined; a: 2 }>

/* --------------------------------- 关于never -------------------------------- */
type A = never extends never ? true : false

type J<T> = T extends string ? true : false

type B = J<never>

/* --------------------------- Readonly 和 requried -------------------------- */
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

/* ---------------------------------- 函数测试 ---------------------------------- */
const useTest = <T>(cb?: (...args: T[]) => unknown) => {
  return { cb }
}
const { cb } = useTest((a: number | string, b, c) => {
  if (typeof a === 'string') return a + b + c
})

const result = cb?.(1, '2', 3)

// type FirstIfString<T> = T extends [infer F extends string, ...unknown[]] ? F : never

/* ---------------------------------- 反转数组 ---------------------------------- */
type ReverseArr<T extends readonly unknown[]> = T extends readonly [
  infer F,
  ...infer Rest,
]
  ? [...ReverseArr<Rest>, F]
  : []

const arr1 = [1, 2, 3, 4, 5, 6] as const

type Arr = ReverseArr<typeof arr1>

/* ---------------------- IsAny、isEqual、IsUnion、IsNever --------------------- */

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

/* ---------------------------------- 协变逆变 ---------------------------------- */

type A1 = { a: number }
type B1 = { a: number; b: number }

type AAAs = B1 extends A1 ? true : false
let aaa: A1[] = [{ a: 1 }]
let bbb: B1[] = [{ a: 1, b: 2 }]

aaa = bbb

let aaaa = (a: { a: string }) => {}

let bbbb = (b: { a: string; b: number }) => {}

// @ts-expect-error
aaaa = bbbb

/* --------------------------------- is 关键字 --------------------------------- */
interface SomeInterface {
  name: string
  length: number
}

interface SomeOtherInterface {
  questions: string[]
}

function isSomeInterface(x: any): x is SomeInterface {
  return typeof x.name === 'string' && typeof x.length === 'number'
}
function foo(x: SomeInterface | SomeOtherInterface) {
  if (isSomeInterface(x)) {
    console.log(x.length)
  }
}

/* ---------------------------------- 函数重载 ---------------------------------- */
function createLog(message: string): number
function createLog(source: string, message: string) //
function createLog(source: string, message?: string): number {
  return 0
}

createLog('message') // OK
createLog('source', 'message') // ERROR: Supplied parameters do not match any signature
