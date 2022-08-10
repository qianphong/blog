# Vue

## `provide`/`inject` 使用 `InjectionKey` 推断类型

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

> [如何在 vue3 中提供一个类型安全的 inject](https://www.jianshu.com/p/7064c5f8f143)

## 使用类型声明的默认 `props` 值

仅限类型的 `defineProps` 声明的不足之处在于，他没有可以给 `props` 提供默认值的方式，为了解决这个问题，提供了 `withDefaults` 的编译器宏：

```ts
interface Props {
  msg?: string
  labels: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello'.
  labels: () => ['one', 'two']
})
```

## 为组件模板 `ref` 标注类型

有时，你可能需要为一个子组件添加一个模板 ref，以便调用它公开的方法，举个例子，我么有一个 `MyModal` 子组件，它有一个打开模态框的方法：

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open,
})
</script>
```

为了获取 `MyModal` 的类型，我们首先需要通过 `typeof` 得到其类型，再使用 TypeScript 内置的 `InstanceType` 工具类型来获取其实例类型：

```vue
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal'

const modal = ref<InstanceType<typeof MyModal> | null>(null)
const openModal = () => {
  modal.value?.open()
}
</script>
```

> [为组件模板引用标注类型](https://staging-cn.vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)

## 自定义修饰符

既有参数又有修饰符的 `v-model` 绑定，生成的 `props` 名将会是`arg` + "Modifiers"

```vue
<!-- Parent.vue -->
<script setup lang="ts">
import Child from './Child.vue'

const name = ref('')
</script>

<template>
  <Child v-model:name.capitalize="name" />
</template>
```

```vue
<!-- Child.vue -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{ name: string; nameModifiers: { capitalize: boolean } }>(),
  { name: '', nameModifiers: () => ({ capitalize: false }) },
)
const emit = defineEmits<{ (e: 'update:name', name: string): void }>()

const name = ref('')

const computedName = computed({
  get() {
    return props.name
  },
  set(name: string) {
    emit(
      'update:name',
      props.nameModifiers.capitalize
        ? name.charAt(0).toUpperCase() + name.slice(1)
        : name,
    )
  },
})
</script>

<template>
  <input v-model="computedName" />
</template>
```

> [配合 `v-model` 使用](https://staging-cn.vuejs.org/guide/components/events.html#usage-with-v-model)
