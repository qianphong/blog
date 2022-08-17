<script lang="ts" setup>
import { ref, onUnmounted, onMounted } from 'vue'

const deadline = 1664467200000 // dayjs('2022-09-30')
const tip = ref(getStr())
function getStr() {
  const v = (deadline - Date.now()) / 1000
  const oneDay = 24 * 60 * 60
  const d = Math.floor(v / oneDay)
  const h = Math.floor((v % oneDay) / (60 * 60))
  const m = Math.floor(((v % oneDay) % (60 * 60)) / 60)
  const s = Math.floor((v % oneDay) % 60)

  return { d, h, m, s }
}
let timer: number
onMounted(() => {
  timer = setInterval(() => {
    tip.value = getStr()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="count-down">
    <p><span> 2022-09-30 </span></p>
    <p>还有</p>
    <p>
      <span>{{ tip.d }}</span> 天 <span>{{ tip.h }}</span> 时
      <span>{{ tip.m }}</span> 分 <span>{{ tip.s }}</span> 秒
    </p>
  </div>
</template>

<style>
.count-down {
  text-align: center;
}
.count-down > p {
  margin-bottom: 20px;
}
.count-down > p > span {
  display: inline-block;
  min-width: 50px;
  font-weight: bold;
  padding: 0 2px;
  text-align: center;
  font-size: 30px;
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
