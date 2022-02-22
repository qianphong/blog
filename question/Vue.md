# Vue

## `provide` / `inject` 使用 `InjectionKey` 推断类型

```ts
// parent.ts
import type { InjectionKey, Ref } from 'vue'
import { provide } from 'vue'

export const countKey: InjectionKey<Ref<number>> = Symbol('countKey')
const count = ref(0)

provide(key, count)

// child.ts
import { inject, ref } from 'vue'
import { countKey } from './parent.ts'

// 使用 InjectionKey 可以自动推断出 count 类型为 Ref<number> | undefined
const count = inject(countKey)
// 提供一个默认值
const count = inject(countKey, ref(0))
```
