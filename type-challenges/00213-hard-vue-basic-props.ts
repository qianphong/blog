// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}
type Test = unknown extends { 1: 2 } ? true : false
VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]
    type T = PropsType['propA']

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})

// ============= Your Code Here =============
type GetComputed<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never
}
type Prop<T = any> = PropType<T> | { type?: PropType<T> }
type PropType<T> = PropConstructor<T> | PropConstructor<T>[]
type PropConstructor<T = any> = { new (...args: any): T & object } | { (): T }
type InferPropType<P> = P extends Prop<infer T>
  ? unknown extends T
    ? any
    : T
  : any

type InferProps<P extends Record<string, any>> = {
  [K in keyof P]: InferPropType<P[K]>
}
declare function VueBasicProps<P, D, C, M, Props = InferProps<P>>(
  options: {
    props: P
    data(this: Props): D
    computed: C
    methods: M
  } & ThisType<Props & D & GetComputed<C> & M>,
): any
