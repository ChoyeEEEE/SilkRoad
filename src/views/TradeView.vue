<template>
  <div class="trade-view">
    <section class="hero-banner">
      <div class="hero-content">
        <h1>商贸物产互通</h1>
        <p class="hero-sub">东西方的繁华交易</p>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="trade-exchange">
      <div class="exchange-header">
        <div class="exchange-col-title left-title">
          <span class="col-icon">🇨🇳</span>
          <span>中国输出</span>
        </div>
      </div>
    </section>

    <!-- 贸易流动画 -->
    <section class="trade-flow-section" ref="flowRef">
      <div class="flow-bg-terrain" aria-hidden="true">
        <div class="terrain-mountains"></div>
        <div class="terrain-desert"></div>
      </div>
      <div class="flow-container">
        <h2 class="section-title" :class="{ 'visible': flowVisible }">
          <span class="title-deco-line"></span>
          贸易之路
          <span class="title-deco-line"></span>
        </h2>
        <p class="flow-subtitle" :class="{ 'visible': flowVisible }">千年丝路，驼铃声声，东西方物产在此交汇</p>

        <div class="trade-flow" :class="{ 'visible': flowVisible }">
          <!-- 左端点：长安 -->
          <div class="flow-endpoint flow-left">
            <div class="endpoint-glow" aria-hidden="true"></div>
            <div class="endpoint-icon-wrap">
              <div class="endpoint-icon">🏯</div>
            </div>
            <div class="endpoint-label">长安</div>
            <div class="endpoint-sub">丝绸之路起点</div>
          </div>

          <!-- SVG 路线主视觉 -->
          <div class="flow-track">
            <svg class="route-svg" viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#8B0000" />
                  <stop offset="30%" stop-color="#D4AF37" />
                  <stop offset="70%" stop-color="#D4AF37" />
                  <stop offset="100%" stop-color="#2F4F4F" />
                </linearGradient>
                <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(139,0,0,0.4)" />
                  <stop offset="50%" stop-color="rgba(212,175,55,0.5)" />
                  <stop offset="100%" stop-color="rgba(47,79,79,0.4)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <!-- 虚线路径图案 -->
                <pattern id="sandPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(212,175,55,0.15)" />
                  <circle cx="8" cy="8" r="0.5" fill="rgba(139,69,19,0.1)" />
                </pattern>
              </defs>

              <!-- 沙漠底纹区域 -->
              <path d="M60 200 C200 200, 250 100, 400 120 C550 140, 600 80, 840 120"
                    fill="none" stroke="url(#sandPattern)" stroke-width="80" opacity="0.4" />

              <!-- 路线光晕 -->
              <path class="route-glow-path" :d="routePathD"
                    fill="none" stroke="url(#routeGlow)" stroke-width="20"
                    filter="url(#softGlow)" opacity="0.3" />

              <!-- 主路线 -->
              <path class="route-main-path" :d="routePathD"
                    fill="none" stroke="url(#routeGrad)" stroke-width="3.5"
                    stroke-linecap="round" filter="url(#glow)"
                    :stroke-dasharray="routePathLength"
                    :stroke-dashoffset="flowVisible ? 0 : routePathLength" />

              <!-- 路线上的虚线装饰 -->
              <path class="route-dash-path" :d="routePathD"
                    fill="none" stroke="rgba(245,222,179,0.3)" stroke-width="1"
                    stroke-dasharray="8 12" />

              <!-- 沙尘粒子 -->
              <circle v-for="n in 12" :key="'dust-'+n"
                      :cx="80 + n * 65" :cy="140 + Math.sin(n * 1.3) * 50"
                      r="1.5" fill="rgba(139,69,19,0.3)"
                      :style="{ animationDelay: n * 0.4 + 's' }"
                      class="dust-particle" />

              <!-- 城市节点 -->
              <g v-for="(city, i) in routeCityData" :key="city.name"
                 class="city-node"
                 :transform="'translate(' + city.x + ',' + city.y + ')'"
                 @mouseenter="activeCity = i" @mouseleave="activeCity = -1">
                <!-- 城市光环 -->
                <circle :r="activeCity === i ? 24 : 18" fill="none"
                        :stroke="activeCity === i ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.15)'"
                        stroke-width="1" class="city-ring" />
                <circle :r="activeCity === i ? 16 : 12" fill="none"
                        :stroke="activeCity === i ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.25)'"
                        stroke-width="1" class="city-ring-inner" />
                <!-- 城市点 -->
                <circle :r="activeCity === i ? 9 : 6" fill="url(#routeGrad)" stroke="#fff" stroke-width="2"
                        filter="url(#glow)" class="city-dot-svg" />
                <!-- 城市名称 -->
                <text :y="city.labelAbove ? (activeCity === i ? -32 : -26) : (activeCity === i ? 38 : 32)"
                      text-anchor="middle"
                      class="city-label"
                      :fill="activeCity === i ? '#8B0000' : '#8B4513'"
                      :font-size="activeCity === i ? 15 : 13"
                      font-family="SimSun, serif" font-weight="bold">
                  {{ city.name }}
                </text>
                <text :y="city.labelAbove ? (activeCity === i ? -16 : -12) : (activeCity === i ? 52 : 46)"
                      text-anchor="middle"
                      class="city-sublabel"
                      :fill="activeCity === i ? '#6a5a4a' : '#8a7a6a'"
                      :font-size="activeCity === i ? 10 : 9"
                      font-family="SimSun, serif">
                  {{ city.sub }}
                </text>
              </g>

              <!-- 东→西 动态商品 -->
              <g v-for="(good, i) in eastGoods" :key="'ew-'+i">
                <text class="flow-good flow-good-east"
                      :style="{ animationDelay: i * 2.2 + 's', animationDuration: '8s' }">
                  <textPath href="#routePath" :startOffset="(i * 18) + '%'">
                    {{ good }}
                  </textPath>
                </text>
              </g>

              <!-- 西→东 动态商品 -->
              <g v-for="(good, i) in westGoods" :key="'we-'+i">
                <text class="flow-good flow-good-west"
                      :style="{ animationDelay: i * 2.5 + 1 + 's', animationDuration: '9s' }">
                  <textPath href="#routePath" :startOffset="(80 - i * 18) + '%'">
                    {{ good }}
                  </textPath>
                </text>
              </g>

              <!-- 骆驼商队 -->
              <g class="caravan-group" :class="{ 'moving': flowVisible }">
                <text class="caravan-camel" font-size="28">🐫</text>
                <text class="caravan-camel camel-2" font-size="22" x="24" y="4">🐫</text>
                <text class="caravan-camel camel-3" font-size="18" x="44" y="6">🐫</text>
              </g>

              <!-- 方向箭头 -->
              <g class="direction-arrows">
                <text x="200" y="80" font-size="10" fill="rgba(139,0,0,0.7)" font-family="SimSun, serif">
                  ← 西传
                </text>
                <text x="650" y="80" font-size="10" fill="rgba(47,79,79,0.7)" font-family="SimSun, serif">
                  东传 →
                </text>
              </g>
        <div class="exchange-center">
          <div class="exchange-arrow">
            <svg width="60" height="24" viewBox="0 0 60 24">
              <path d="M0 12 H50 M45 5 L55 12 L45 19" stroke="#C8982C" stroke-width="2" fill="none"/>
            </svg>
            <svg width="60" height="24" viewBox="0 0 60 24" class="arrow-reverse">
              <path d="M0 12 H50 M45 5 L55 12 L45 19" stroke="#B84C38" stroke-width="2" fill="none"/>
            </svg>
          </div>
        </div>
        <div class="exchange-col-title right-title">
          <span>域外传入</span>
          <span class="col-icon">🌍</span>
        </div>
      </div>

      <div class="exchange-grid">
        <div class="exchange-column left-col">
          <div
            v-for="(item, index) in exports"
            :key="item.name"
            class="trade-card"
            :style="{ animationDelay: index * 0.15 + 's' }"
            ref="exportRefs"
          >
            <div class="card-inner">
              <div class="card-front">
                <div class="card-emoji">{{ item.icon }}</div>
                <h4>{{ item.name }}</h4>
              </div>
              <div class="card-back">
                <p>{{ item.desc }}</p>
              </div>
            </transition-group>
          </div>
        </transition-group>
      </div>
    </section>
    

    <!-- 贸易影响时间线 -->
    <section class="impact-section" ref="impactRef">
      <div class="impact-container">
        <h2 class="section-title" :class="{ 'visible': impactVisible }">
          <span class="title-deco-line"></span>
          贸易影响
          <span class="title-deco-line"></span>
        </h2>

        <div class="impact-timeline">
          <div class="impact-line">
            <div class="impact-progress" :style="{ height: impactProgress + '%' }"></div>
          </div>
          <div v-for="(event, index) in impactEvents" :key="index"
               class="impact-node"
               :class="{ 'visible': impactNodeVisible[index], 'node-left': index % 2 === 0, 'node-right': index % 2 !== 0 }">
            <div class="impact-dot">
              <span>{{ event.icon }}</span>
            </div>
            <div class="impact-card">
              <div class="impact-era">{{ event.era }}</div>
              <h4>{{ event.title }}</h4>
              <p>{{ event.desc }}</p>
            </div>
          </div>
        </div>

        <div class="exchange-divider">
          <div class="divider-line"></div>
          <div class="divider-label">丝绸之路</div>
          <div class="divider-line"></div>
        </div>

        <div class="exchange-column right-col">
          <div
            v-for="(item, index) in imports"
            :key="item.name"
            class="trade-card"
            :style="{ animationDelay: index * 0.15 + 's' }"
            ref="importRefs"
          >
            <div class="card-inner">
              <div class="card-front">
                <div class="card-emoji">{{ item.icon }}</div>
                <h4>{{ item.name }}</h4>
              </div>
              <div class="card-back">
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const exports = [
  { name: '丝绸', icon: '🧵', desc: '丝绸为首项出口商品，华丽织物令西方世界为之倾倒。' },
  { name: '瓷器', icon: '🏺', desc: '精美瓷器享誉世界，China一词即源于瓷器。' },
  { name: '茶叶', icon: '🍵', desc: '茶文化沿丝路传播，成为东西方共同的饮品文化。' },
  { name: '造纸术', icon: '📜', desc: '四大发明之一，经丝路传至阿拉伯，改变了世界文明进程。' },
]

const imports = [
  { name: '葡萄', icon: '🍇', desc: '葡萄及葡萄酒酿造技术经丝路传入中国。' },
  { name: '香料', icon: '🌶️', desc: '胡椒、肉桂等香料丰富了中华饮食文化。' },
  { name: '珠宝', icon: '💎', desc: '波斯宝石、罗马琉璃沿丝路流入东方宫廷。' },
  { name: '农作物', icon: '🌾', desc: '苜蓿、胡麻、核桃等作物改善了中国农业结构。' },
]

const exportRefs = ref<HTMLElement[]>([])
const importRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 }
  )
  ;[...exportRefs.value, ...importRefs.value].forEach((el) => {
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.trade-view {
  min-height: 100vh;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #7A4A2A 0%, #C8982C 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  color: #fff;
  z-index: 1;
}

.hero-content h1 {
  font-family: 'SimSun', cursive;
  font-size: 2.5rem;
  letter-spacing: 6px;
  animation: heroFadeIn 1s ease-out;
}

.hero-sub {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  opacity: 0.85;
  letter-spacing: 3px;
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: #E8C872;
  clip-path: ellipse(55% 100% at 50% 100%);
}

.trade-exchange {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.exchange-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
}

.exchange-col-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'SimSun', cursive;
  font-size: 1.3rem;
  font-weight: bold;
}

.left-title { color: #3D5C5C; }
.right-title { color: #7A4A2A; }

.col-icon {
  font-size: 1.8rem;
}

.exchange-center {
  display: flex;
  align-items: center;
}

.exchange-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.arrow-reverse {
  transform: rotate(180deg);
}

.exchange-grid {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.exchange-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.exchange-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
}

.divider-line {
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #C8982C, transparent);
}

.divider-label {
  writing-mode: vertical-rl;
  font-family: 'SimSun', cursive;
  color: #C8982C;
  font-size: 0.9rem;
  letter-spacing: 4px;
  padding: 1rem 0;
}

.trade-card {
  perspective: 800px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.trade-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.card-inner {
  position: relative;
  width: 100%;
  min-height: 120px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

.trade-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-front {
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
}

.card-back {
  background: linear-gradient(135deg, #B84C38, #3D5C5C);
  color: #fff;
  transform: rotateY(180deg);
  box-shadow: 0 4px 16px rgba(184, 76, 56, 0.2);
}

.card-emoji {
  font-size: 2.2rem;
  flex-shrink: 0;
}

.card-front h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.15rem;
  color: #333;
}

.card-back p {
  font-size: 0.95rem;
  line-height: 1.6;
}

.left-col .trade-card:nth-child(even) { animation: slideFromLeft 0.6s ease both; }
.left-col .trade-card:nth-child(odd) { animation: slideFromLeft 0.6s ease both; }
.right-col .trade-card:nth-child(even) { animation: slideFromRight 0.6s ease both; }
.right-col .trade-card:nth-child(odd) { animation: slideFromRight 0.6s ease both; }

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideFromLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideFromRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 768px) {
  .exchange-grid {
    flex-direction: column;
  }

  .exchange-divider {
    flex-direction: row;
    padding: 1rem 0;
  }

  .divider-line {
    width: 80px;
    height: 2px;
    background: linear-gradient(to right, transparent, #C8982C, transparent);
  }

  .divider-label {
    writing-mode: horizontal-tb;
  }

  .exchange-header {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .card-inner {
    min-height: 100px;
  }
}
</style>
