# 实现一个 Web 地图

[从零打造一个 Web 地图引擎 - 掘金](https://juejin.cn/post/7054729902871805966)

[repo](https://github.com/qianphong/web-map-vue3)

### 地图类

```ts
import {
  TILE_SIZE,
  getTileColAndRow,
  getPxFromMercator,
  getResolution,
  lngLat2Mercator,
  mercator2LngLat,
} from './index'
import type { Position, LngLat } from './index'

type QueryString<T extends string, U = T> = T extends U
  ? `${T}=${string}${[Exclude<U, T>] extends [never]
      ? ''
      : `&${QueryString<Exclude<U, T> & string>}`}`
  : ''
type TileCache = Record<string, Tile>
type CacheKey = QueryString<'x' | 'y' | 'z'>

export type Config = {
  zoom?: number
  center: LngLat
  draggable?: boolean
}

export class AMap {
  canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  // 缩放等级
  zoom: number = 16

  // 缓存瓦片
  tileCache: TileCache = {}
  // 当前需要渲染的瓦片，因为瓦片图片加载是异步的，所以需要提供此项，
  // 图片加载完成后瓦片根据此项判断是否还需要渲染到画布上
  currentTileCache: Record<string, boolean> = {}

  // 内部使用墨卡托坐标 [x, y]
  private position: Position = [0, 0]
  // 分辨率
  private resolution: number = getResolution(this.zoom)

  // 对象内部仅保存墨卡托投影坐标
  // set 设置经纬度将其转换成墨卡托坐标并存到 position 中
  // get 获取经纬度，经 position 转为经纬度
  set center(lntLat: LngLat) {
    this.position = lngLat2Mercator(lntLat)
  }
  get center() {
    return mercator2LngLat(this.position)
  }

  constructor(
    public target: HTMLElement,
    config: Config = {
      center: [120.005627, 31.790637],
      draggable: true,
    },
  ) {
    this.canvas = document.createElement('canvas')
    target.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')!

    // 设置缩放和中心
    this.setZoom(config.zoom, false)
    this.setCenter(config.center, false)

    // 初始化拖拽
    if (config?.draggable) {
      this.initDrag()
    }
    target.addEventListener('wheel', e => {
      const { offsetX, offsetY } = e
      const { clientHeight, clientWidth } = this.target

      // 目的保证缩放比例切换后，鼠标下坐标保持不变
      // 记录鼠标滚动坐标
      const dx = clientWidth / 2 - offsetX
      const dy = clientHeight / 2 - offsetY

      // 鼠标滚动时墨卡托坐标位置
      const pos = [
        this.position[0] - dx * this.resolution,
        this.position[1] + dy * this.resolution,
      ]
      this.setZoom(e.deltaY > 0 ? this.zoom - 1 : this.zoom + 1, false)
      // 根据上面记录的坐标 和 zoom变更后的分辨率重新设置中心点，保证位置一致
      this.position = [
        pos[0] + dx * this.resolution,
        pos[1] - dy * this.resolution,
      ]
      this.render()
    })
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.resize()
  }

  private render() {
    // console.log('render')

    // 中心点瓦片位置，相对于中心的偏移量
    const info = this.getCenterInfo()

    const { height, width } = this.canvas

    // 清空画布
    this.ctx.clearRect(0, 0, width, height)

    // col 和 row 数量
    const colCount = Math.ceil(width / TILE_SIZE / 2)
    const rowCount = Math.ceil(height / TILE_SIZE / 2)

    // 清空上次缓存
    this.currentTileCache = {}

    // 横轴和纵轴根据原点向分别向两侧循环
    // 横轴 -colCount ~ colCount
    for (let colIndex = -1 * colCount; colIndex <= colCount; colIndex++) {
      // 纵轴 -rowCount ~ rowCount
      for (let rowIndex = -1 * rowCount; rowIndex <= rowCount; rowIndex++) {
        const col = info.ColAndRow[0] + colIndex
        const row = info.ColAndRow[1] + rowIndex

        const position: Position = [
          colIndex * TILE_SIZE - info.offset[0],
          rowIndex * TILE_SIZE - info.offset[1],
        ]
        // 缓存key，使用queryString形式可以直接获取瓦片图片地址
        const key: CacheKey = `x=${col}&y=${row}&z=${this.zoom}`

        this.currentTileCache[key] = true

        if (this.tileCache[key]) {
          this.tileCache[key].updatePos(position)
        } else {
          this.tileCache[key] = new Tile(this.ctx, position, key, {
            shouldRender: key => {
              return this.currentTileCache[key]
            },
          })
        }
      }
    }
  }
  // 获取中心点瓦片位置，以及相对于中心的偏移量
  private getCenterInfo() {
    const pxPos = getPxFromMercator(
      this.position[0],
      this.position[1],
      this.resolution,
    )
    const tile = getTileColAndRow(pxPos[0], pxPos[1])
    return {
      offset: [pxPos[0] - tile[0] * TILE_SIZE, pxPos[1] - tile[1] * TILE_SIZE],
      ColAndRow: getTileColAndRow(pxPos[0], pxPos[1]),
    }
  }

  // 初始化拖拽
  initDrag() {
    let mouseFlag = false

    this.target.onmousedown = () => {
      mouseFlag = true
    }

    this.target.onmousemove = e => {
      if (!mouseFlag) return
      const { movementX, movementY } = e
      this.position = [
        this.position[0] - movementX * this.resolution,
        this.position[1] + movementY * this.resolution,
      ]
      this.render()
    }

    this.target.onmouseup = () => {
      mouseFlag = false
    }
  }

  // 设置 center
  setCenter(center?: LngLat, render = true) {
    if (!center) return
    this.center = center
    render && this.render()
  }

  // 设置 缩放
  setZoom(zoom?: number, render = true) {
    if (zoom === undefined) return
    if (zoom < 3 || zoom > 18) {
      console.warn('zoom 取值范围在 3~18 之间')
      return
    }
    this.zoom = zoom
    this.resolution = getResolution(zoom)
    render && this.render()
  }

  // resize 函数
  resize() {
    const { clientHeight, clientWidth } = this.target
    this.canvas.height = clientHeight
    this.canvas.width = clientWidth
    this.ctx.translate(clientWidth / 2, clientHeight / 2)
    this.render()
  }
}
```

### 瓦片类

```ts
class Tile {
  private img = new Image()
  private loaded: boolean = false

  constructor(
    public ctx: CanvasRenderingContext2D,
    public position: Position,
    public key: CacheKey,
    public opts: {
      shouldRender(key: string): boolean
    },
  ) {
    this.load()
  }

  // 获取瓦片URL
  private getTileUrl() {
    // 因为浏览器对于同一域名同时请求的资源是有数量限制的
    const domainIndexList = [1, 2, 3, 4]
    const domainIndex =
      domainIndexList[Math.floor(Math.random() * domainIndexList.length)]
    return `https://webrd0${domainIndex}.is.autonavi.com/appmaptile?${this.key}&lang=zh_cn&size=1&scale=1&style=8`
  }

  // 加载图片
  private load() {
    this.img.src = this.getTileUrl()
    this.img.onload = () => {
      this.loaded = true
      this.render()
    }
  }

  // 将图片渲染到画布上
  render() {
    // 如果图片未加载完成，或者加载完成后但是已经不需要渲染直接返回
    if (!this.loaded || !this.opts.shouldRender(this.key)) {
      return
    }
    // console.log('tile render')
    this.ctx.drawImage(this.img, this.position[0], this.position[1])
  }

  // 更新位置
  updatePos(position: Position) {
    this.position = position
    this.render()
  }
}
```

### utils 工具函数

```ts
export type Position = [x: number, y: number]
export type LngLat = [Lng: number, Lat: number]

/**
 * 地球半径
 */
const EARTH_RAD = 6378137

/**
 * 地球周长
 */
const EARTH_PERIMETER = 2 * Math.PI * EARTH_RAD

/**
 * 瓦片像素
 */
export const TILE_SIZE = 256
/**
 * 分辨率（每像素实际表示多少米）
 * @param z 层级
 * @returns 像素值
 */
export function getResolution(z: number) {
  const tileNums = Math.pow(2, z)
  const tileTotalPx = tileNums * TILE_SIZE
  return EARTH_PERIMETER / tileTotalPx
}

/**
 * 根据瓦片的像素坐标x,y 获取瓦片信息
 * @param x 瓦片像素x
 * @param y 瓦片像素y
 * @returns 瓦片坐标
 */
export function getTileColAndRow(
  x: number,
  y: number,
): [col: number, row: number] {
  return [Math.floor(x / TILE_SIZE), Math.floor(y / TILE_SIZE)]
}

/**
 * 根据经纬度坐标获取像素位置
 * @param lng 经度
 * @param lat 纬度
 * @param z 缩放
 * @returns 像素坐标[x,y]
 */
export function getPxFromLngLat(lng: number, lat: number, z: number): Position {
  let [x, y] = lngLat2Mercator(lng, lat)
  x = EARTH_PERIMETER / 2 + x
  y = EARTH_PERIMETER / 2 - y
  const resolution = getResolution(z)
  return [Math.floor(x / resolution), Math.floor(y / resolution)]
}

/**
 * 根据墨卡托坐标获取像素位置
 * @param x 经度
 * @param y 纬度
 * @param resolution 分辨率
 * @returns 像素坐标[x,y]
 */
export function getPxFromMercator(
  x: number,
  y: number,
  resolution: number,
): Position {
  x = EARTH_PERIMETER / 2 + x
  y = EARTH_PERIMETER / 2 - y
  return [Math.floor(x / resolution), Math.floor(y / resolution)]
}

/**
 * 角度转弧度
 * @param angle 角度
 * @returns 弧度
 */
export function angle2Rad(angle: number) {
  return angle * (Math.PI / 180)
}

/**
 * 弧度转角度
 * @param rad 弧度
 * @returns 角度
 */
export function rad2Angle(rad: number) {
  return rad * (180 / Math.PI)
}

/**
 * 经纬度（EPSG:4326）转 墨卡托投影（EPSG:3857）
 * @param pos [lng,lat] 经纬度
 * @returns [x, y] 坐标
 */
export function lngLat2Mercator(pos: LngLat): Position

/**
 * 经纬度（EPSG:4326）转 墨卡托投影（EPSG:3857）
 * @param lng 经度
 * @param lat 纬度
 * @returns [x, y] 坐标
 */
export function lngLat2Mercator(lng: number, lat: number): Position

export function lngLat2Mercator() {
  let lng: number, lat: number
  if (Array.isArray(arguments[0])) {
    lng = arguments[0][0]
    lat = arguments[0][1]
  } else {
    lng = arguments[0]
    lat = arguments[1]
  }
  // 经度先转弧度，然后因为 弧度 = 弧长 / 半径，得到 弧长 = 弧度 * 半径
  const x = angle2Rad(lng) * EARTH_RAD
  const rad = angle2Rad(lat)
  const sin = Math.sin(rad)
  const y = (EARTH_RAD / 2) * Math.log((1 + sin) / (1 - sin))
  return [x, y]
}

/**
 * 墨卡托投影（EPSG:3857）转 经纬度（EPSG:4326）
 * @param pos [x, y] 经纬度
 * @returns [lng,lat] 坐标
 */
export function mercator2LngLat(pos: Position): LngLat

/**
 * 墨卡托投影（EPSG:3857）转 经纬度（EPSG:4326）
 * @param x x 坐标
 * @param y y 坐标
 * @returns [lng,lat] 经纬度
 */
export function mercator2LngLat(x: number, y: number): LngLat

export function mercator2LngLat() {
  let x: number, y: number
  if (Array.isArray(arguments[0])) {
    x = arguments[0][0]
    y = arguments[0][1]
  } else {
    x = arguments[0]
    y = arguments[1]
  }
  const lng = rad2Angle(x) / EARTH_RAD
  const lat = rad2Angle(2 * Math.atan(Math.exp(y / EARTH_RAD)) - Math.PI / 2)
  return [lng, lat]
}
```
