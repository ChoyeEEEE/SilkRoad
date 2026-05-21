<template>
  <div class="routes-view">
    <section class="section">
      <h2 class="section-title">丝路路线图</h2>
      <p class="section-desc">点击城市节点查看详细信息，探索连接东西方文明的伟大商路</p>

      <div class="map-legend">
        <span class="legend-item"><span class="legend-route"></span>丝绸之路路线</span>
        <span class="legend-item"><span class="legend-city"></span>重要城市</span>
      </div>

      <div class="map-wrapper">
        <div ref="mapEl" class="map-container"></div>
      </div>

      <transition name="modal">
        <div v-if="selectedCity" class="modal-overlay" @click.self="selectedCity = null">
          <div class="modal">
            <button class="modal-close" @click="selectedCity = null">×</button>
            <div class="modal-header">
              <div class="modal-icon">📍</div>
              <div>
                <h3>{{ selectedCity.name }}</h3>
                <span class="modal-sub">{{ selectedCity.subtitle }}</span>
              </div>
            </div>
            <div class="modal-body">
              <p>{{ selectedCity.description }}</p>
              <div class="facts">
                <div class="fact" v-if="selectedCity.period">
                  <span class="flabel">繁盛时期</span><span class="fval">{{ selectedCity.period }}</span>
                </div>
                <div class="fact" v-if="selectedCity.trade">
                  <span class="flabel">主要贸易品</span><span class="fval">{{ selectedCity.trade }}</span>
                </div>
                <div class="fact" v-if="selectedCity.heritage">
                  <span class="flabel">文化遗产</span><span class="fval">{{ selectedCity.heritage }}</span>
                </div>
              </div>
            </div>
            <div class="modal-nav">
              <button v-if="prevCity" @click="selectCity(prevCity)" class="nav-btn">← {{ prevCity.name }}</button>
              <span v-else></span>
              <button v-if="nextCity" @click="selectCity(nextCity)" class="nav-btn">{{ nextCity.name }} →</button>
            </div>
          </div>
        </div>
      </transition>

      <div class="city-cards">
        <h3 class="cards-title">丝路重要节点</h3>
        <div class="cards-grid">
          <div v-for="city in cities" :key="city.name"
               class="city-card" :class="{ active: selectedCity?.name === city.name }"
               @click="focusCity(city)">
            <span class="cname">{{ city.name }}</span>
            <span class="csub">{{ city.subtitle }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface CityInfo {
  name: string
  lat: number
  lng: number
  subtitle: string
  description: string
  period?: string
  trade?: string
  heritage?: string
}

const mapEl = ref<HTMLDivElement>()
const selectedCity = ref<CityInfo | null>(null)
let map: L.Map | null = null
const markers: L.Marker[] = []

const cities: CityInfo[] = [
  { name: '长安', lat: 34.2658, lng: 108.9541,
    subtitle: '丝路起点 · 十三朝古都', description: '长安是西汉、唐等朝代的都城，丝绸之路的东方起点。张骞从这里出发出使西域，开启了东西方文明交流的伟大篇章。',
    period: '汉唐时期', trade: '丝绸、瓷器、茶叶', heritage: '大雁塔、兵马俑' },
  { name: '敦煌', lat: 40.1421, lng: 94.6624,
    subtitle: '丝路咽喉 · 艺术宝库', description: '敦煌是丝绸之路上最重要的交通枢纽之一。莫高窟现存735个洞窟，壁画约4.5万平方米。',
    period: '366—14世纪', trade: '丝绸、佛经、宝石', heritage: '莫高窟、鸣沙山' },
  { name: '吐鲁番', lat: 42.9513, lng: 89.1895,
    subtitle: '火洲绿洲', description: '吐鲁番盆地是天山南麓的重要绿洲城市，高昌故城和交河故城见证了多个文明的兴衰。',
    period: '汉唐时期', trade: '葡萄、棉花、丝绸', heritage: '高昌故城、坎儿井' },
  { name: '喀什', lat: 39.4547, lng: 75.9796,
    subtitle: '西域十字路口', description: '喀什是中国最西端的历史文化名城，自古以来就是丝绸之路上的重要商埠，连接中国内地与中亚、南亚。',
    period: '汉代至今', trade: '玉石、香料、马匹', heritage: '艾提尕尔清真寺' },
  { name: '于阗', lat: 37.1144, lng: 79.9223,
    subtitle: '玉石之乡', description: '于阗以和田玉闻名天下，是丝绸之路南道最重要的绿洲王国之一，佛教文化极为兴盛。',
    period: '汉唐时期', trade: '和田玉、丝绸、地毯', heritage: '和田玉文化' },
  { name: '撒马尔罕', lat: 39.6542, lng: 66.9597,
    subtitle: '中亚明珠 · 帖木儿之都', description: '撒马尔罕是中亚最古老的城市之一。帖木儿帝国时期达到鼎盛，雷吉斯坦广场是伊斯兰建筑的杰作。',
    period: '前5世纪至15世纪', trade: '丝绸、纸张、宝石、香料', heritage: '雷吉斯坦广场' },
  { name: '喀布尔', lat: 34.5553, lng: 69.2075,
    subtitle: '中亚枢纽', description: '喀布尔是连接中亚、南亚和西亚的交通枢纽，自古以来就是兵家必争之地。',
    period: '前1世纪至今', trade: '宝石、地毯', heritage: '喀布尔古城' },
  { name: '巴格达', lat: 33.3128, lng: 44.3615,
    subtitle: '阿拉伯帝国之都', description: '巴格达是阿拔斯王朝的首都，"智慧宫"保存了大量希腊、波斯、印度的学术著作。',
    period: '8至13世纪', trade: '香料、丝绸、书籍、宝石', heritage: '智慧宫遗址' },
  { name: '大马士革', lat: 33.5138, lng: 36.2765,
    subtitle: '丝路西方终点', description: '大马士革是世界上最古老的持续有人居住的城市之一，丝绸之路通往地中海的重要终点。',
    period: '前3000年至今', trade: '大马士革钢、丝绸', heritage: '倭马亚清真寺' },
  { name: '萨莱', lat: 47.1, lng: 41.0,
    subtitle: '金帐汗国都城', description: '萨莱是金帐汗国的都城，是蒙古帝国在欧洲的重要据点，也是丝绸之路北线的终点。',
    period: '13至15世纪', trade: '毛皮、马匹', heritage: '萨莱古城遗址' },
]

const routeCoords: [number, number][] = [
  [34.2658, 108.9541],
  [40.1421, 94.6624],
  [42.9513, 89.1895],
  [39.4547, 75.9796],
  [37.1144, 79.9223],
  [39.6542, 66.9597],
  [34.5553, 69.2075],
  [33.3128, 44.3615],
  [33.5138, 36.2765],
]

const northernRouteCoords: [number, number][] = [
  [34.2658, 108.9541],
  [40.1421, 94.6624],
  [42.9513, 89.1895],
  [39.4547, 75.9796],
  [39.6542, 66.9597],
  [47.1, 41.0],
]

const currentIndex = computed(() =>
  selectedCity.value ? cities.findIndex(c => c.name === selectedCity.value!.name) : -1
)
const prevCity = computed(() => currentIndex.value > 0 ? cities[currentIndex.value - 1] : null)
const nextCity = computed(() => currentIndex.value < cities.length - 1 ? cities[currentIndex.value + 1] : null)

function createIcon(cityName: string, isActive: boolean) {
  const color = isActive ? '#CC2222' : '#8B4513'
  const size = isActive ? 14 : 10
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-wrap">
      <div class="marker-dot" style="
        width:${size}px;height:${size}px;background:${color};
        border:2px solid #fff;border-radius:50%;
        box-shadow:0 0 6px rgba(0,0,0,0.3);
      "></div>
      <span class="marker-label">${cityName}</span>
    </div>`,
    iconSize: [0, 0],
    iconAnchor: [size / 2, size / 2],
  })
}

function selectCity(city: CityInfo | undefined) {
  if (city) {
    selectedCity.value = city
    markers.forEach((m, i) => {
      const c = cities[i]
      if (!c) return
      if (c.name === city.name) {
        m.setIcon(createIcon(c.name, true))
        m.setZIndexOffset(1000)
      } else {
        m.setIcon(createIcon(c.name, false))
        m.setZIndexOffset(0)
      }
    })
  }
}

function focusCity(city: CityInfo) {
  if (map) {
    map.flyTo([city.lat, city.lng], 6, { duration: 1 })
  }
  selectCity(city)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') selectedCity.value = null
}

onMounted(async () => {
  await nextTick()
  if (!mapEl.value) return

  map = L.map(mapEl.value, {
    center: [37, 75],
    zoom: 4,
    minZoom: 3,
    maxZoom: 10,
    zoomControl: false,
    attributionControl: true,
  })

  L.control.zoom({ position: 'topright' }).addTo(map)

  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
    subdomains: ['1', '2', '3', '4'],
    maxZoom: 18,
  }).addTo(map)

  L.polyline(routeCoords, {
    color: '#8B4513',
    weight: 3,
    opacity: 0.7,
    dashArray: '8, 6',
    lineJoin: 'round',
  }).addTo(map)

  L.polyline(northernRouteCoords, {
    color: '#8B6914',
    weight: 2.5,
    opacity: 0.5,
    dashArray: '4, 8',
    lineJoin: 'round',
  }).addTo(map)

  cities.forEach((city) => {
    const marker = L.marker([city.lat, city.lng], { icon: createIcon(city.name, false) })
      .addTo(map!)
      .on('click', () => selectCity(city))

    markers.push(marker)
  })

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
.leaflet-container {
  font-family: 'SimSun', serif;
}

.custom-marker {
  background: none !important;
  border: none !important;
}

.marker-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  top: -6px;
}

.marker-dot {
  flex-shrink: 0;
  transition: all 0.2s;
}

.marker-wrap:hover .marker-dot {
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(204, 34, 34, 0.5) !important;
}

.marker-label {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.88);
  padding: 1px 6px;
  border-radius: 3px;
  border: 1px solid rgba(139, 69, 19, 0.4);
  line-height: 1.4;
  pointer-events: auto;
  transition: all 0.2s;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
}

.marker-wrap:hover .marker-label {
  color: #CC2222;
  border-color: #CC2222;
  background: rgba(255, 255, 255, 0.95);
}
</style>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.routes-view {
  min-height: 100vh;
  padding: 60px 0;
  background: linear-gradient(180deg, #e8e0d0 0%, #d8cfc0 100%);
}

.section { max-width: 1400px; margin: 0 auto; padding: 2rem 2rem; }

.section-title {
  text-align: center; margin-bottom: 0.5rem; color: #8B0000;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  font-size: 2.5rem; letter-spacing: 4px;
}
.section-desc { text-align: center; color: #888; font-size: 1rem; margin-bottom: 1.2rem; }

.map-legend { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #555; }
.legend-city { width: 10px; height: 10px; background: #8B4513; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 3px rgba(0,0,0,0.2); }
.legend-route { width: 24px; height: 3px; background: #8B4513; border-radius: 2px; opacity: 0.7; }

.map-wrapper {
  position: relative; border-radius: 12px; overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2); border: 2px solid rgba(139,105,20,0.3); margin-bottom: 2rem;
}

.map-container {
  width: 100%;
  height: 560px;
}

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 10000; backdrop-filter: blur(4px); padding: 1rem;
}
.modal {
  background: white; border-radius: 16px; max-width: 500px; width: 100%;
  max-height: 85vh; overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25); position: relative;
  animation: modal-pop 0.3s cubic-bezier(0.34,1.56,0.64,1);
  border-top: 4px solid #8B6914;
}
@keyframes modal-pop {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-close {
  position: absolute; top: 0.8rem; right: 0.8rem;
  width: 32px; height: 32px; border: none; background: #f0f0f0;
  border-radius: 50%; font-size: 1.3rem; cursor: pointer;
  transition: all 0.2s; color: #666;
  display: flex; align-items: center; justify-content: center;
}
.modal-close:hover { background: #e74c3c; color: white; }
.modal-header { display: flex; align-items: center; gap: 1rem; padding: 1.5rem 1.5rem 0; }
.modal-icon {
  font-size: 2rem; width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center;
  background: #f8f4ee; border-radius: 12px; flex-shrink: 0;
}
.modal-header h3 {
  font-size: 1.4rem; color: #333;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  letter-spacing: 2px;
}
.modal-sub { font-size: 0.8rem; color: #999; margin-top: 0.2rem; display: block; }
.modal-body { padding: 1rem 1.5rem; }
.modal-body p { font-size: 0.9rem; line-height: 1.8; color: #555; margin-bottom: 1rem; }
.facts { display: flex; flex-direction: column; gap: 0.6rem; }
.fact { display: flex; gap: 0.6rem; align-items: baseline; }
.flabel { font-size: 0.75rem; color: #999; white-space: nowrap; min-width: 65px; }
.fval { font-size: 0.85rem; color: #444; }
.modal-nav {
  display: flex; justify-content: space-between;
  padding: 0.8rem 1.5rem 1.2rem; border-top: 1px solid #f0f0f0;
}
.nav-btn {
  background: none; border: 1px solid #ddd; padding: 0.4rem 0.8rem;
  border-radius: 6px; cursor: pointer; font-size: 0.8rem; color: #666;
  transition: all 0.2s; font-family: 'SimSun', serif;
}
.nav-btn:hover { border-color: #8B6914; color: #8B6914; }

.modal-enter-active { transition: opacity 0.3s; }
.modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.city-cards { margin-top: 2rem; }
.cards-title {
  text-align: center; font-size: 1.7rem; color: #8B4513; margin-bottom: 1.6rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif; letter-spacing: 3px;
}
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 1rem; }
.city-card {
  background: white; border-radius: 12px; padding: 1.1rem 0.9rem;
  text-align: center; cursor: pointer; transition: all 0.3s ease;
  border: 2px solid transparent; box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}
.city-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.13); border-color: #8B6914; }
.city-card.active { border-color: #8B6914; background: #faf6ee; }
.cname { display: block; font-size: 1.05rem; font-weight: bold; color: #333; font-family: 'SimSun', serif; }
.csub { display: block; font-size: 0.78rem; color: #888; margin-top: 0.35rem; }

@media (max-width: 768px) {
  .section { padding: 1.5rem 1rem; }
  .section-title { font-size: 2rem; }
  .map-container { height: 400px; }
  .cards-title { font-size: 1.45rem; }
  .cards-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.8rem; }
  .city-card { padding: 0.9rem 0.7rem; }
  .cname { font-size: 0.95rem; }
  .csub { font-size: 0.72rem; }
}
</style>
