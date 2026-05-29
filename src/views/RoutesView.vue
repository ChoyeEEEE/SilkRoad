<template>
  <div class="routes-view">
    <section class="section">
      <h2 class="section-title">丝路路线图</h2>
      <p class="section-desc">点击节点查看详细信息，探索连接东西方文明的陆上与海上丝绸之路</p>

      <div class="map-legend">
        <span class="legend-item"><span class="legend-route land-route"></span>陆上丝绸之路</span>
        <span class="legend-item"><span class="legend-route sea-route"></span>海上丝绸之路</span>
        <span class="legend-item"><span class="legend-city land-city"></span>陆上节点</span>
        <span class="legend-item"><span class="legend-city sea-city"></span>海上节点</span>
      </div>

      <div class="map-wrapper">
        <div ref="mapEl" class="map-container"></div>
      </div>

      <transition name="modal">
        <div v-if="selectedCity" class="modal-overlay" @click.self="selectedCity = null">
          <div class="modal" :class="selectedCity.type === 'sea' ? 'modal-sea' : 'modal-land'">
            <button class="modal-close" @click="selectedCity = null">×</button>

            <div class="modal-upper">
              <div class="modal-banner">
                <div class="banner-deco"></div>
                <div class="banner-content">
                  <div class="modal-icon">{{ selectedCity.type === 'sea' ? '⚓' : '📍' }}</div>
                  <div class="banner-text">
                    <h3>{{ selectedCity.name }}</h3>
                    <span class="modal-sub">{{ selectedCity.subtitle }}</span>
                  </div>
                </div>
                <div class="banner-ornament">
                  <span class="ornament-line"></span>
                  <span class="ornament-dot"></span>
                  <span class="ornament-line"></span>
                </div>
              </div>
              <div class="modal-desc-area">
                <p class="modal-desc">{{ selectedCity.description }}</p>
              </div>
            </div>

            <div class="modal-lower">
              <div class="facts-divider">
                <span class="divider-line"></span>
                <span class="divider-text">城市名片</span>
                <span class="divider-line"></span>
              </div>
              <div class="facts">
                <div class="fact" v-if="selectedCity.period">
                  <div class="fact-icon">📅</div>
                  <span class="flabel">繁盛时期</span>
                  <span class="fval">{{ selectedCity.period }}</span>
                </div>
                <div class="fact" v-if="selectedCity.trade">
                  <div class="fact-icon">🏪</div>
                  <span class="flabel">主要贸易品</span>
                  <span class="fval">{{ selectedCity.trade }}</span>
                </div>
                <div class="fact" v-if="selectedCity.heritage">
                  <div class="fact-icon">🏛️</div>
                  <span class="flabel">文化遗产</span>
                  <span class="fval">{{ selectedCity.heritage }}</span>
                </div>
              </div>
            </div>

            <div class="modal-nav">
              <button v-if="prevCity" @click="selectCity(prevCity)" class="nav-btn">
                <span class="nav-arrow">←</span>
                <span class="nav-name">{{ prevCity.name }}</span>
              </button>
              <span v-else></span>
              <button v-if="nextCity" @click="selectCity(nextCity)" class="nav-btn">
                <span class="nav-name">{{ nextCity.name }}</span>
                <span class="nav-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </transition>

      <div class="city-cards">
        <h3 class="cards-title">丝路重要节点</h3>

        <h4 class="cards-subtitle">🐫 陆上丝绸之路</h4>
        <div class="cards-grid">
          <div v-for="city in landCities" :key="city.name"
               class="city-card land-card" :class="{ active: selectedCity?.name === city.name }"
               @click="focusCity(city)">
            <span class="cname">{{ city.name }}</span>
            <span class="csub">{{ city.subtitle }}</span>
          </div>
        </div>

        <h4 class="cards-subtitle">⛵ 海上丝绸之路</h4>
        <div class="cards-grid">
          <div v-for="city in seaCities" :key="city.name"
               class="city-card sea-card" :class="{ active: selectedCity?.name === city.name }"
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
  type: 'land' | 'sea'
  period?: string
  trade?: string
  heritage?: string
}

const mapEl = ref<HTMLDivElement>()
const selectedCity = ref<CityInfo | null>(null)
let map: L.Map | null = null
const markers: L.Marker[] = []

const allCities: CityInfo[] = [
  {
    name: '长安', lat: 34.2658, lng: 108.9541, type: 'land',
    subtitle: '丝路起点 · 十三朝古都',
    description: '长安是西汉、唐等朝代的都城，丝绸之路的东方起点。张骞从这里出发出使西域，开启了东西方文明交流的伟大篇章。',
    period: '汉唐时期', trade: '丝绸、瓷器、茶叶', heritage: '大雁塔、兵马俑'
  },
  {
    name: '敦煌', lat: 40.1421, lng: 94.6624, type: 'land',
    subtitle: '丝路咽喉 · 艺术宝库',
    description: '敦煌是丝绸之路上最重要的交通枢纽之一。莫高窟现存735个洞窟，壁画约4.5万平方米，是世界上规模最大的佛教艺术宝库。',
    period: '366—14世纪', trade: '丝绸、佛经、宝石', heritage: '莫高窟、鸣沙山'
  },
  {
    name: '吐鲁番', lat: 42.9513, lng: 89.1895, type: 'land',
    subtitle: '火洲绿洲',
    description: '吐鲁番盆地是天山南麓的重要绿洲城市，高昌故城和交河故城见证了多个文明的兴衰。坎儿井灌溉系统是丝路先民的智慧结晶。',
    period: '汉唐时期', trade: '葡萄、棉花、丝绸', heritage: '高昌故城、坎儿井'
  },
  {
    name: '喀什', lat: 39.4547, lng: 75.9796, type: 'land',
    subtitle: '西域十字路口',
    description: '喀什是中国最西端的历史文化名城，自古以来就是丝绸之路上的重要商埠，连接中国内地与中亚、南亚，至今仍是东西方交流的重镇。',
    period: '汉代至今', trade: '玉石、香料、马匹', heritage: '艾提尕尔清真寺'
  },
  {
    name: '撒马尔罕', lat: 39.6542, lng: 66.9597, type: 'land',
    subtitle: '中亚明珠 · 帖木儿之都',
    description: '撒马尔罕是中亚最古老的城市之一。帖木儿帝国时期达到鼎盛，雷吉斯坦广场是伊斯兰建筑的杰作，被誉为"东方的明珠"。',
    period: '前5世纪至15世纪', trade: '丝绸、纸张、宝石、香料', heritage: '雷吉斯坦广场'
  },
  {
    name: '巴格达', lat: 33.3128, lng: 44.3615, type: 'land',
    subtitle: '阿拉伯帝国之都',
    description: '巴格达是阿拔斯王朝的首都，"智慧宫"保存了大量希腊、波斯、印度的学术著作，是中世纪世界学术的灯塔。',
    period: '8至13世纪', trade: '香料、丝绸、书籍、宝石', heritage: '智慧宫遗址'
  },
  {
    name: '大马士革', lat: 33.5138, lng: 36.2765, type: 'land',
    subtitle: '丝路西方终点',
    description: '大马士革是世界上最古老的持续有人居住的城市之一，丝绸之路通往地中海的重要终点。大马士革钢享誉世界。',
    period: '前3000年至今', trade: '大马士革钢、丝绸、香料', heritage: '倭马亚清真寺'
  },
  {
    name: '君士坦丁堡', lat: 41.0082, lng: 28.9784, type: 'land',
    subtitle: '东西方交汇之城',
    description: '君士坦丁堡（今伊斯坦布尔）是拜占庭帝国的首都，扼守欧亚大陆咽喉。丝绸之路的西端终点，东西方文明在此交汇融合。',
    period: '330年至1453年', trade: '丝绸、香料、宝石、黄金', heritage: '圣索菲亚大教堂、蓝色清真寺'
  },
  {
    name: '萨莱', lat: 47.1, lng: 41.0, type: 'land',
    subtitle: '金帐汗国都城',
    description: '萨莱是金帐汗国的都城，是蒙古帝国在欧洲的重要据点，也是丝绸之路北线的终点。蒙古统治下的和平保障了商路的畅通。',
    period: '13至15世纪', trade: '毛皮、马匹', heritage: '萨莱古城遗址'
  },
  {
    name: '泉州', lat: 24.8741, lng: 118.6758, type: 'sea',
    subtitle: '海上丝路起点 · 东方第一大港',
    description: '泉州（刺桐城）是宋元时期中国最大的港口，被马可·波罗誉为"东方第一大港"。海上丝绸之路从这里启航，连接东南亚、印度、阿拉伯和非洲。',
    period: '宋元时期', trade: '丝绸、瓷器、茶叶、香料', heritage: '开元寺、清净寺、洛阳桥'
  },
  {
    name: '广州', lat: 23.1291, lng: 113.2644, type: 'sea',
    subtitle: '千年商都 · 南国门户',
    description: '广州自秦汉以来就是中国对外贸易的重要港口，唐宋时期设市舶司管理海外贸易。它是海上丝绸之路持续时间最长的起点城市。',
    period: '秦汉至今', trade: '丝绸、瓷器、茶叶', heritage: '光塔、南海神庙、黄埔古港'
  },
  {
    name: '马六甲', lat: 2.1896, lng: 102.2501, type: 'sea',
    subtitle: '海峡咽喉 · 东西方交汇',
    description: '马六甲扼守马六甲海峡，是东西方海上贸易的必经之地。15世纪马六甲苏丹国时期达到鼎盛，郑和船队曾多次到访。',
    period: '15至16世纪', trade: '香料、丝绸、锡、瓷器', heritage: '马六甲古城、圣保罗教堂'
  },
  {
    name: '科伦坡', lat: 6.9271, lng: 79.8612, type: 'sea',
    subtitle: '印度洋明珠',
    description: '科伦坡位于斯里兰卡西海岸，是印度洋航路上的重要中转港。东西方商船在此交换货物，宝石和肉桂是当地最重要的出口品。',
    period: '前5世纪至今', trade: '宝石、肉桂、象牙、珍珠', heritage: '佛牙寺'
  },
  {
    name: '卡利卡特', lat: 11.2588, lng: 75.7804, type: 'sea',
    subtitle: '香料之城',
    description: '卡利卡特（科泽科德）是印度西南海岸的重要港口，以香料贸易闻名世界。达·伽马绕过好望角后在此登陆，开启了大航海时代。',
    period: '中世纪至今', trade: '胡椒、肉桂、丁香、生姜', heritage: '卡利卡特古港'
  },
  {
    name: '霍尔木兹', lat: 27.0967, lng: 56.2708, type: 'sea',
    subtitle: '波斯湾门户',
    description: '霍尔木兹海峡是波斯湾的咽喉要道，霍尔木兹岛曾是东西方海上贸易的重要中转站。马可·波罗曾到此地，描述其为繁忙的国际贸易港。',
    period: '13至16世纪', trade: '珍珠、香料、丝绸、马匹', heritage: '霍尔木兹古城遗址'
  },
  {
    name: '亚历山大', lat: 31.2001, lng: 29.9187, type: 'sea',
    subtitle: '地中海门户 · 世界知识之都',
    description: '亚历山大城由亚历山大大帝建立，是托勒密王朝的首都。亚历山大灯塔为古代世界七大奇迹之一，大图书馆是古代世界最大的知识宝库。',
    period: '前4世纪至今', trade: '丝绸、纸莎草、玻璃、谷物', heritage: '亚历山大灯塔遗址、大图书馆'
  },
]

const landCities = computed(() => allCities.filter(c => c.type === 'land'))
const seaCities = computed(() => allCities.filter(c => c.type === 'sea'))

const mainRouteCoords: [number, number][] = [
  [34.2658, 108.9541],
  [40.1421, 94.6624],
  [42.9513, 89.1895],
  [39.4547, 75.9796],
  [39.6542, 66.9597],
  [33.3128, 44.3615],
  [33.5138, 36.2765],
  [41.0082, 28.9784],
]

const northernRouteCoords: [number, number][] = [
  [34.2658, 108.9541],
  [40.1421, 94.6624],
  [42.9513, 89.1895],
  [39.4547, 75.9796],
  [39.6542, 66.9597],
  [47.1, 41.0],
]

const maritimeRouteCoords: [number, number][] = [
  [24.8741, 118.6758],
  [23.1291, 113.2644],
  [10.0, 109.0],
  [2.1896, 102.2501],
  [4.0, 95.0],
  [6.9271, 79.8612],
  [11.2588, 75.7804],
  [20.0, 65.0],
  [27.0967, 56.2708],
  [15.0, 48.0],
  [31.2001, 29.9187],
]

const currentCityList = computed(() => {
  if (!selectedCity.value) return []
  return selectedCity.value.type === 'land' ? landCities.value : seaCities.value
})
const currentIndex = computed(() =>
  selectedCity.value ? currentCityList.value.findIndex(c => c.name === selectedCity.value!.name) : -1
)
const prevCity = computed(() => currentIndex.value > 0 ? currentCityList.value[currentIndex.value - 1] : null)
const nextCity = computed(() => currentIndex.value < currentCityList.value.length - 1 ? currentCityList.value[currentIndex.value + 1] : null)

function createIcon(cityName: string, isActive: boolean, type: 'land' | 'sea') {
  const color = isActive
    ? (type === 'sea' ? '#0277BD' : '#CC2222')
    : (type === 'sea' ? '#00695C' : '#8B4513')
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
      const c = allCities[i]
      if (!c) return
      if (c.name === city.name) {
        m.setIcon(createIcon(c.name, true, c.type))
        m.setZIndexOffset(1000)
      } else {
        m.setIcon(createIcon(c.name, false, c.type))
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
    center: [25, 72],
    zoom: 3,
    minZoom: 2,
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

  L.polyline(mainRouteCoords, {
    color: '#8B4513',
    weight: 3,
    opacity: 0.7,
    dashArray: '8, 6',
    lineJoin: 'round',
  }).addTo(map)

  L.polyline(northernRouteCoords, {
    color: '#A0522D',
    weight: 2.5,
    opacity: 0.5,
    dashArray: '4, 8',
    lineJoin: 'round',
  }).addTo(map)

  L.polyline(maritimeRouteCoords, {
    color: '#0277BD',
    weight: 3,
    opacity: 0.7,
    dashArray: '10, 6',
    lineJoin: 'round',
  }).addTo(map)

  allCities.forEach((city) => {
    const marker = L.marker([city.lat, city.lng], { icon: createIcon(city.name, false, city.type) })
      .addTo(map!)
      .on('click', () => selectCity(city))

    markers.push(marker)
  })

  const allCoords = [...mainRouteCoords, ...northernRouteCoords, ...maritimeRouteCoords]
  map.fitBounds(L.latLngBounds(allCoords), { padding: [40, 40] })

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
  font-family: 'Noto Serif SC', sans-serif;
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
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 2.5rem; letter-spacing: 4px;
}
.section-desc { text-align: center; color: #888; font-size: 1rem; margin-bottom: 1.2rem; }

.map-legend { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #555; }
.legend-city { width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 3px rgba(0,0,0,0.2); }
.legend-city.land-city { background: #8B4513; }
.legend-city.sea-city { background: #00695C; }
.legend-route { width: 24px; height: 3px; border-radius: 2px; }
.legend-route.land-route { background: #8B4513; opacity: 0.7; }
.legend-route.sea-route { background: #0277BD; opacity: 0.7; }

.map-wrapper {
  position: relative; border-radius: 12px; overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2); border: 2px solid rgba(139,105,20,0.3); margin-bottom: 2rem;
}

.map-container {
  width: 100%;
  height: 620px;
}

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  z-index: 10000; backdrop-filter: blur(6px); padding: 1rem;
}
.modal {
  background: #fdfaf5; border-radius: 20px; max-width: 720px; width: 100%;
  max-height: 85vh; overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(139,105,20,0.08);
  position: relative;
  animation: modal-pop 0.35s cubic-bezier(0.34,1.56,0.64,1);
  overflow: hidden;
  display: flex; flex-direction: column;
}
@keyframes modal-pop {
  from { opacity: 0; transform: scale(0.92) translateY(24px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-close {
  position: absolute; top: 0.75rem; right: 0.75rem;
  width: 34px; height: 34px; border: none;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(4px);
  border-radius: 50%; font-size: 1.2rem; cursor: pointer;
  transition: all 0.25s; color: #888; z-index: 10;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.modal-close:hover { background: #e74c3c; color: white; transform: rotate(90deg); }

.modal-upper {
  width: 100%;
}
.modal-land .modal-upper {
  background: linear-gradient(180deg, #f7f0e3 0%, #fdfaf5 100%);
}
.modal-sea .modal-upper {
  background: linear-gradient(180deg, #e8f0f8 0%, #fdfaf5 100%);
}

.modal-banner {
  position: relative; padding: 2rem 2.5rem 0.8rem;
  overflow: hidden;
}
.banner-deco {
  position: absolute; top: -30px; right: -30px;
  width: 120px; height: 120px; border-radius: 50%;
  opacity: 0.06;
}
.modal-land .banner-deco { background: #8B4513; }
.modal-sea .banner-deco { background: #0277BD; }
.banner-content {
  display: flex; align-items: center; gap: 1.1rem; position: relative; z-index: 1;
}
.modal-icon {
  font-size: 2rem; width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 16px; flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.modal-land .modal-icon { background: linear-gradient(135deg, #faf6ee, #f0e8d8); }
.modal-sea .modal-icon { background: linear-gradient(135deg, #eef5fa, #dce8f2); }
.banner-text h3 {
  font-size: 1.5rem; color: #2c2c2c;
  font-family: 'Noto Serif SC', sans-serif;
  letter-spacing: 3px; margin-bottom: 0.25rem;
}
.modal-sub {
  font-size: 0.82rem; color: #888; display: block;
  font-family: 'Noto Serif SC', sans-serif;
  letter-spacing: 1px;
}
.banner-ornament {
  display: flex; align-items: center; gap: 0.5rem;
  margin-top: 0.8rem; justify-content: center;
}
.ornament-line {
  width: 40px; height: 1px; display: block;
}
.modal-land .ornament-line { background: linear-gradient(90deg, transparent, #8B6914, transparent); }
.modal-sea .ornament-line { background: linear-gradient(90deg, transparent, #0277BD, transparent); }
.ornament-dot {
  width: 5px; height: 5px; border-radius: 50%;
}
.modal-land .ornament-dot { background: #8B6914; }
.modal-sea .ornament-dot { background: #0277BD; }

.modal-desc-area {
  padding: 1.2rem 2.5rem 1.8rem;
}
.modal-desc {
  font-size: 0.92rem; line-height: 1.9; color: #555;
  text-indent: 2em;
  font-family: 'Noto Serif SC', sans-serif;
}

.modal-lower {
  width: 100%; padding: 0 2.5rem 0.5rem;
}

.facts-divider {
  display: flex; align-items: center; gap: 0.8rem;
  margin-bottom: 1.2rem;
}
.divider-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139,105,20,0.2), transparent);
}
.divider-text {
  font-size: 0.75rem; color: #999; letter-spacing: 3px; white-space: nowrap;
  font-family: 'Noto Serif SC', sans-serif;
}

.facts {
  display: flex; gap: 0.75rem; margin-bottom: 1rem;
}
.fact {
  flex: 1; border-radius: 14px; padding: 1rem 0.8rem;
  display: flex; flex-direction: column; align-items: center;
  gap: 0.4rem; text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.fact:hover { transform: translateY(-2px); }
.modal-land .fact {
  background: linear-gradient(180deg, #faf6ee 0%, #f5efe3 100%);
  border: 1px solid rgba(139, 105, 20, 0.12);
  box-shadow: 0 2px 8px rgba(139,105,20,0.06);
}
.modal-sea .fact {
  background: linear-gradient(180deg, #eef5fa 0%, #e5eef6 100%);
  border: 1px solid rgba(2, 119, 189, 0.12);
  box-shadow: 0 2px 8px rgba(2,119,189,0.06);
}
.fact-icon { font-size: 1.3rem; margin-bottom: 0.15rem; }
.flabel {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 1px;
}
.modal-land .flabel { color: #8B6914; }
.modal-sea .flabel { color: #0277BD; }
.fval { font-size: 0.82rem; color: #444; line-height: 1.5; }

.modal-nav {
  display: flex; justify-content: space-between;
  padding: 0.8rem 2.5rem 1.4rem; border-top: 1px solid rgba(0,0,0,0.05);
  margin-top: 0.5rem;
}
.nav-btn {
  background: none; border: 1px solid rgba(0,0,0,0.1);
  padding: 0.45rem 1rem; border-radius: 8px;
  cursor: pointer; font-size: 0.82rem; color: #666;
  transition: all 0.25s; font-family: 'Noto Serif SC', sans-serif;
  display: flex; align-items: center; gap: 0.4rem;
}
.nav-btn:hover { border-color: #8B6914; color: #8B6914; background: #faf6ee; }
.nav-arrow { font-size: 0.9rem; }
.nav-name { letter-spacing: 1px; }

.modal-enter-active { transition: opacity 0.3s; }
.modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.city-cards { margin-top: 2rem; }
.cards-title {
  text-align: center; font-size: 1.7rem; color: #8B4513; margin-bottom: 1.6rem;
  font-family: 'Noto Serif SC', sans-serif; letter-spacing: 3px;
}

.cards-subtitle {
  font-size: 1.15rem; color: #5D4037; margin: 1.5rem 0 1rem;
  font-family: 'Noto Serif SC', sans-serif;
  letter-spacing: 2px; padding-left: 0.5rem;
  border-left: 3px solid #8B6914;
}
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 1rem; }
.city-card {
  background: white; border-radius: 12px; padding: 1.1rem 0.9rem;
  text-align: center; cursor: pointer; transition: all 0.3s ease;
  border: 2px solid transparent; box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}
.land-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.13); border-color: #8B6914; }
.land-card.active { border-color: #8B6914; background: #faf6ee; }
.sea-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.13); border-color: #0277BD; }
.sea-card.active { border-color: #0277BD; background: #eef5fa; }
.cname { display: block; font-size: 1.05rem; font-weight: bold; color: #333; font-family: 'Noto Serif SC', sans-serif; }
.csub { display: block; font-size: 0.78rem; color: #888; margin-top: 0.35rem; }

@media (max-width: 768px) {
  .section { padding: 1.5rem 1rem; }
  .section-title { font-size: 2rem; }
  .map-container { height: 400px; }
  .modal { max-width: 95vw; border-radius: 16px; }
  .modal-banner { padding: 1.5rem 1.2rem 0.6rem; }
  .banner-text h3 { font-size: 1.25rem; }
  .modal-icon { width: 46px; height: 46px; font-size: 1.6rem; border-radius: 12px; }
  .modal-desc-area { padding: 1rem 1.2rem 1.4rem; }
  .modal-desc { font-size: 0.85rem; }
  .modal-lower { padding: 0 1.2rem 0.5rem; }
  .facts { flex-direction: column; gap: 0.6rem; }
  .fact { padding: 0.8rem 0.5rem; border-radius: 10px; }
  .fact-icon { font-size: 1.1rem; }
  .flabel { font-size: 0.65rem; }
  .fval { font-size: 0.75rem; }
  .modal-nav { padding: 0.6rem 1.2rem 1rem; }
  .nav-btn { padding: 0.35rem 0.7rem; font-size: 0.75rem; }
  .cards-title { font-size: 1.45rem; }
  .cards-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.8rem; }
  .city-card { padding: 0.9rem 0.7rem; }
  .cname { font-size: 0.95rem; }
  .csub { font-size: 0.72rem; }
}
</style>
