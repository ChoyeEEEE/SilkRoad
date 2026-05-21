<template>
  <div class="routes-view">
    <section class="section">
      <h2 class="section-title">丝路路线图</h2>
      <p class="section-desc">点击城市节点查看详细信息，探索连接东西方文明的伟大商路</p>

      <div class="map-legend">
        <span class="legend-item"><span class="legend-city"></span>重要城市</span>
      </div>

      <div class="map-wrapper">
        <div class="map-container"
             :style="{ transform: `scale(${zoom}) translate(${panX}px, ${panY}px)` }"
             @mousedown="onMouseDown"
             @mousemove="onMouseMove"
             @mouseup="onMouseUp"
             @mouseleave="onMouseUp"
             @wheel.prevent="handleWheel">

          <!-- 地形图背景 -->
          <img src="/picture/R-C.jpg" class="map-bg" alt="丝绸之路地形图" draggable="false" />

          <!-- 交互叠加层 -->
          <svg class="map-overlay" viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="city-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <!-- 城市节点 -->
            <g v-for="city in cities" :key="city.name"
               class="city-node"
               :class="{ active: selectedCity?.name === city.name }"
               @click="selectCity(city)"
               style="cursor:pointer">
              <rect :x="city.x - 4" :y="city.y - 4" width="8" height="8"
                    fill="#CC2222" stroke="#FF4444" stroke-width="0.8"
                    class="city-dot" />
              <circle :cx="city.x" :cy="city.y" r="12" fill="rgba(204,34,34,0.15)" class="pulse" />
              <text :x="city.x + city.tx" :y="city.y + city.ty"
                    :text-anchor="city.anchor || 'start'"
                    class="city-label">{{ city.name }}</text>
            </g>
          </svg>
        </div>

        <div class="zoom-controls">
          <button @click="zoomIn" title="放大">+</button>
          <button @click="zoomOut" title="缩小">−</button>
          <button @click="resetView" title="重置">⟲</button>
        </div>
      </div>

      <!-- 城市详情弹窗 -->
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

      <!-- 城市卡片 -->
      <div class="city-cards">
        <h3 class="cards-title">丝路重要节点</h3>
        <div class="cards-grid">
          <div v-for="city in cities" :key="city.name"
               class="city-card" :class="{ active: selectedCity?.name === city.name }"
               @click="selectCity(city)">
            <span class="cname">{{ city.name }}</span>
            <span class="csub">{{ city.subtitle }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface CityInfo {
  name: string; x: number; y: number; tx: number; ty: number; anchor?: string
  subtitle: string; description: string; period?: string; trade?: string; heritage?: string
}

const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const selectedCity = ref<CityInfo | null>(null)

// 城市坐标基于 viewBox 0 0 1000 680，对应原图位置
const cities: CityInfo[] = [
  { name: '长安', x: 938, y: 295, tx: 10, ty: -6, anchor: 'start',
    subtitle: '丝路起点 · 十三朝古都', description: '长安是西汉、唐等朝代的都城，丝绸之路的东方起点。张骞从这里出发出使西域，开启了东西方文明交流的伟大篇章。',
    period: '汉唐时期', trade: '丝绸、瓷器、茶叶', heritage: '大雁塔、兵马俑' },
  { name: '敦煌', x: 820, y: 238, tx: -10, ty: -6, anchor: 'end',
    subtitle: '丝路咽喉 · 艺术宝库', description: '敦煌是丝绸之路上最重要的交通枢纽之一。莫高窟现存735个洞窟，壁画约4.5万平方米。',
    period: '366—14世纪', trade: '丝绸、佛经、宝石', heritage: '莫高窟、鸣沙山' },
  { name: '吐鲁番', x: 762, y: 210, tx: 8, ty: 12, anchor: 'start',
    subtitle: '火洲绿洲', description: '吐鲁番盆地是天山南麓的重要绿洲城市，高昌故城和交河故城见证了多个文明的兴衰。',
    period: '汉唐时期', trade: '葡萄、棉花、丝绸', heritage: '高昌故城、坎儿井' },
  { name: '喀什', x: 690, y: 255, tx: -10, ty: -4, anchor: 'end',
    subtitle: '西域十字路口', description: '喀什是中国最西端的历史文化名城，自古以来就是丝绸之路上的重要商埠，连接中国内地与中亚、南亚。',
    period: '汉代至今', trade: '玉石、香料、马匹', heritage: '艾提尕尔清真寺' },
  { name: '撒马尔罕', x: 560, y: 260, tx: 8, ty: -4, anchor: 'start',
    subtitle: '中亚明珠 · 帖木儿之都', description: '撒马尔罕是中亚最古老的城市之一。帖木儿帝国时期达到鼎盛，雷吉斯坦广场是伊斯兰建筑的杰作。',
    period: '前5世纪至15世纪', trade: '丝绸、纸张、宝石、香料', heritage: '雷吉斯坦广场' },
  { name: '巴格达', x: 415, y: 335, tx: 8, ty: -4, anchor: 'start',
    subtitle: '阿拉伯帝国之都', description: '巴格达是阿拔斯王朝的首都，"智慧宫"保存了大量希腊、波斯、印度的学术著作。',
    period: '8至13世纪', trade: '香料、丝绸、书籍、宝石', heritage: '智慧宫遗址' },
  { name: '大马士革', x: 365, y: 318, tx: -8, ty: -4, anchor: 'end',
    subtitle: '丝路西方终点', description: '大马士革是世界上最古老的持续有人居住的城市之一，丝绸之路通往地中海的重要终点。',
    period: '前3000年至今', trade: '大马士革钢、丝绸', heritage: '倭马亚清真寺' },
  { name: '萨莱', x: 310, y: 160, tx: -8, ty: -4, anchor: 'end',
    subtitle: '金帐汗国都城', description: '萨莱是金帐汗国的都城，是蒙古帝国在欧洲的重要据点，也是丝绸之路北线的终点。',
    period: '13至15世纪', trade: '毛皮、马匹', heritage: '萨莱古城遗址' },
  { name: '喀布尔', x: 595, y: 345, tx: 8, ty: -4, anchor: 'start',
    subtitle: '中亚枢纽', description: '喀布尔是连接中亚、南亚和西亚的交通枢纽，自古以来就是兵家必争之地。',
    period: '前1世纪至今', trade: '宝石、地毯', heritage: '喀布尔古城' },
  { name: '于阗', x: 660, y: 295, tx: 8, ty: -4, anchor: 'start',
    subtitle: '玉石之乡', description: '于阗以和田玉闻名天下，是丝绸之路南道最重要的绿洲王国之一，佛教文化极为兴盛。',
    period: '汉唐时期', trade: '和田玉、丝绸、地毯', heritage: '和田玉文化' },
]

const currentIndex = computed(() =>
  selectedCity.value ? cities.findIndex(c => c.name === selectedCity.value!.name) : -1
)
const prevCity = computed(() => currentIndex.value > 0 ? cities[currentIndex.value - 1] : null)
const nextCity = computed(() => currentIndex.value < cities.length - 1 ? cities[currentIndex.value + 1] : null)

function selectCity(city: CityInfo | undefined) { if (city) selectedCity.value = city }
function zoomIn() { zoom.value = Math.min(zoom.value + 0.3, 3) }
function zoomOut() { zoom.value = Math.max(zoom.value - 0.3, 0.5) }
function resetView() { zoom.value = 1; panX.value = 0; panY.value = 0 }

function handleWheel(e: WheelEvent) {
  if (e.deltaY < 0) zoomIn(); else zoomOut()
}

let isDragging = false, startX = 0, startY = 0
function onMouseDown(e: MouseEvent) { isDragging = true; startX = e.clientX - panX.value * zoom.value; startY = e.clientY - panY.value * zoom.value }
function onMouseMove(e: MouseEvent) { if (!isDragging) return; panX.value = (e.clientX - startX) / zoom.value; panY.value = (e.clientY - startY) / zoom.value }
function onMouseUp() { isDragging = false }

function handleKeydown(e: KeyboardEvent) { if (e.key === 'Escape') selectedCity.value = null }

onMounted(() => { window.addEventListener('keydown', handleKeydown) })
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })
</script>

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
.legend-city { width: 8px; height: 8px; background: #CC2222; border-radius: 1px; }

.map-wrapper {
  position: relative; border-radius: 12px; overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2); border: 2px solid rgba(139,105,20,0.3); margin-bottom: 2rem;
}

.map-container {
  position: relative; cursor: grab;
  transition: transform 0.15s ease; transform-origin: center center;
}
.map-container:active { cursor: grabbing; }

.map-bg {
  width: 100%; height: auto; display: block; user-select: none; pointer-events: none;
}

.map-overlay {
  position: absolute; inset: 0; width: 100%; height: 100%;
}

.city-node { transform-box: fill-box; transform-origin: center; transition: transform 0.2s ease; }
.city-node:hover { transform: scale(1.4); }
.city-node:hover .city-dot { fill: #FF4444; filter: url(#city-glow); }
.city-node.active .city-dot { fill: #FF6666; filter: url(#city-glow); }

.pulse { animation: pulse-ring 2.5s ease-out infinite; pointer-events: none; }
@keyframes pulse-ring {
  0% { r: 6; opacity: 0.5; }
  100% { r: 18; opacity: 0; }
}

.city-label {
  font-size: 7px; fill: #111; font-family: 'SimSun', serif; font-weight: bold;
  paint-order: stroke; stroke: rgba(255,255,255,0.9); stroke-width: 2.5px;
  stroke-linecap: round; stroke-linejoin: round; pointer-events: none;
}
.city-node:hover .city-label { fill: #CC2222; }

.zoom-controls {
  position: absolute; top: 1rem; right: 1rem;
  display: flex; flex-direction: column; gap: 0.3rem; z-index: 10;
}
.zoom-controls button {
  width: 34px; height: 34px; border: none; background: rgba(255,255,255,0.92);
  border-radius: 6px; font-size: 1.1rem; cursor: pointer; transition: all 0.2s;
  color: #333; box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.zoom-controls button:hover { background: #8B6914; color: white; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; backdrop-filter: blur(4px); padding: 1rem;
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
  .city-label { font-size: 5.5px; }
  .cards-title { font-size: 1.45rem; }
  .cards-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.8rem; }
  .city-card { padding: 0.9rem 0.7rem; }
  .cname { font-size: 0.95rem; }
  .csub { font-size: 0.72rem; }
}
</style>
