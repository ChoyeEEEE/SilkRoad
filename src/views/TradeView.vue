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
