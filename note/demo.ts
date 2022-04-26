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
