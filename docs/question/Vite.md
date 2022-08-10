# Vite

## 静态资源处理

```ts
import imgUrl from './img.png'
// or
const imgUrl = new URL('./img.png', import.meta.url).href
// 动态导入
function getImageUrl(name: string) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}

document.createElement('img').src = imgUrl
```
