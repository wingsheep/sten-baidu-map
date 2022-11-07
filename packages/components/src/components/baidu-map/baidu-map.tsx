import { Component, Host, h, Prop, Watch, State, Element } from '@stencil/core';
// import bindEvents from '../../utils/base/bindEvent'
import { checkType } from '../../utils/base/util'

@Component({
  tag: 'baidu-map',
  styleUrl: 'baidu-map.css',
  shadow: true,
})


export class BaiduMap {
  @Prop() ak: string

  @Prop() center: any

  @Prop() zoom: number

  @Prop() minZoom: number

  @Prop() maxZoom: number

  @Prop() highResolution: boolean = true

  @Prop() mapClick: boolean = true

  @Prop() mapType: string

  @Prop() dragging: boolean = true

  @Prop() scrollWheelZoom: boolean = false

  @Prop() doubleClickZoom: boolean = true

  @Prop() keyboard: boolean = true

  @Prop() inertialDragging: boolean = true

  @Prop() continuousZoom: boolean = true

  @Prop() pinchToZoom: boolean = true

  @Prop() autoResize: boolean = true

  @Prop() theme: any[]

  @Prop() mapStyle: object
  @State() hasBmView: boolean = false
  componentWillLoad() {
  }

  @Watch('center')
  watchPropCenter(val, oldVal) {
    const { map, zoom } = this
    if (checkType(val) === 'String' && val !== oldVal) {
      map.centerAndZoom(val, zoom)
    }
  }
  map: any
  BMap: any
  _initBaiduMap: any
  mapView!: HTMLInputElement;
  @Element() el: HTMLElement;

  setMapOptions () {
    const {map, minZoom, maxZoom, mapType, dragging, scrollWheelZoom, doubleClickZoom, keyboard, inertialDragging, continuousZoom, pinchToZoom, autoResize} = this
    console.log(map, 'map')
    minZoom && map.setMinZoom(minZoom)
    maxZoom && map.setMaxZoom(maxZoom)
    mapType && map.setMapType(globalThis[mapType])
    dragging ? map.enableDragging() : map.disableDragging()
    scrollWheelZoom ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
    doubleClickZoom ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
    keyboard ? map.enableKeyboard() : map.disableKeyboard()
    inertialDragging ? map.enableInertialDragging() : map.disableInertialDragging()
    continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom()
    pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom()
    autoResize ? map.enableAutoResize() : map.disableAutoResize()
  }
  getCenterPoint () {
    const {center, BMap} = this
    console.log('center',  typeof center)
    switch (checkType(center)) {
      case 'String': return center
      case 'Object': return new BMap.Point(center.lng, center.lat)
      default: return new BMap.Point()
    }
  }
  init (BMap) {
    // if (this.map) {
    //   return
    // }
    console.log({mapView: this.mapView, el: this.el, BMap})
    console.log(this.el.shadowRoot.querySelector('#map-view'))
    // for (let $node of this.$slots.default || []) {
    //   if ($node.componentOptions && $node.componentOptions.tag === 'bm-view') {
    //     this.hasBmView = true
    //     $el = $node.elm
    //   }
    // }
    const map = new BMap.Map(this.el.shadowRoot.querySelector('#map-view'), {enableHighResolution: this.highResolution, enableMapClick: this.mapClick})
    this.map = map
    const { zoom, theme, mapStyle} = this
    theme ? map.setMapStyle({styleJson: theme}) : map.setMapStyle(mapStyle)
    this.setMapOptions()
    // bindEvents.call(this, map)
    // 此处强行初始化一次地图 回避一个由于错误的 center 字符串导致初始化失败抛出的错误
    map.reset()
    map.centerAndZoom(this.getCenterPoint(), zoom)
    // this.$emit('ready', {BMap, map})
    // Debug
    // globalThis.map = map
    // globalThis.mapComponent = this
  }
  global = globalThis as any

  initMap (BMap) {
    console.log('initMap')
    this.BMap = BMap
    this.init(BMap)
  }
  getMapScript () {
    if (!globalThis.BMap) {
      const ak = this.ak
      globalThis.BMap = {}
      globalThis.BMap._preloader = new Promise((resolve) => {
        globalThis._initBaiduMap = function () {
          console.log(3444, globalThis.BMap)
          resolve(globalThis.BMap)
          globalThis.document.body.removeChild($script)
          globalThis.BMap._preloader = null
          globalThis._initBaiduMap = null
        }
        const $script = document.createElement('script')
        globalThis.document.body.appendChild($script)
        $script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=_initBaiduMap`
      })
      return globalThis.BMap._preloader
    } else if (!globalThis.BMap._preloader) {
      return Promise.resolve(globalThis.BMap)
    } else {
      return globalThis.BMap._preloader
    }
  }
  reset() {
    console.log('reset', Window)

      this.getMapScript()
        .then(res => {
          console.log({res})
          this.initMap(res)
        })
  }

  componentWillRender() {
    this.reset()
  }

  render() {
    if (!this.hasBmView) {
      return (
        <Host>
          <div id="map-view" ref={(el) => this.mapView = el as HTMLInputElement} style={{width: "100%", height: "100%"}}></div>
          <slot></slot>
        </Host>
      )
    } else {
      return (
        <Host>
          <slot></slot>
        </Host>
      );
    }
  }

}
