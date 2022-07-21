export {}
interface Person {
  name: string
  age: number
}

interface Student {
  name: string
  age: number
  study(): void
}

let a: Person = {
  name: 'wu',
  age: 14,
}
let b: Student = {
  name: 'zhang',
  age: 12,
  study() {},
}
// 协变
a = b
// b = a // Property 'study' is missing in type 'Person' but required in type 'Student'

// 逆变
let sayName: (person: Person) => void
let learning: (student: Student) => void

sayName = person => {
  console.log(person.name)
}

learning = student => {
  student.study()
  console.log(student.name)
}

// sayName = learning
learning = sayName

type A = { name: string }
type B = { name: string; age: number }

type C = A & B

type D = C extends A ? true : false

// 逆变
type Func = (a: 'text' | '234') => void
// 被赋值函数的参数要是赋值函数参数的子类型
// @ts-expect-error
const a1: Func = (a: 'text') => undefined
