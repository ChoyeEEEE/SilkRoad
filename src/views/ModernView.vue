<template>
  <div class="modern-view">
    <section class="hero-banner">
      <div class="hero-ancient"></div>
      <div class="hero-modern"></div>
      <div class="hero-center">
        <h1>古今丝路</h1>
        <p class="hero-sub">从驼铃声声到列车轰鸣</p>
        <div class="hero-vs">VS</div>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="compare-section">
      <div
        v-for="(pair, index) in comparePairs"
        :key="pair.topic"
        class="compare-row"
        ref="rowRefs"
      >
        <div class="compare-side ancient-side">
          <div class="side-card">
            <div class="card-image">
              <div class="image-placeholder ancient-bg">
                <span class="ph-icon">{{ pair.ancient.icon }}</span>
                <span class="ph-text">{{ pair.ancient.title }}</span>
              </div>
            </div>
            <div class="card-body">
              <span class="side-label">古代</span>
              <h3>{{ pair.ancient.title }}</h3>
              <p>{{ pair.ancient.desc }}</p>
            </div>
          </div>
        </div>

        <div class="compare-center">
          <div class="topic-badge">
            <span class="topic-icon">{{ pair.topicIcon }}</span>
            <span class="topic-text">{{ pair.topic }}</span>
          </div>
          <div class="center-line"></div>
          <div class="arrow-right">
            <svg width="40" height="16" viewBox="0 0 40 16"><path d="M0 8 H32 M27 3 L35 8 L27 13" stroke="#D4AF37" stroke-width="2" fill="none"/></svg>
          </div>
        </div>

        <div class="compare-side modern-side">
          <div class="side-card">
            <div class="card-image">
              <div class="image-placeholder modern-bg">
                <span class="ph-icon">{{ pair.modern.icon }}</span>
                <span class="ph-text">{{ pair.modern.title }}</span>
              </div>
            </div>
            <div class="card-body">
              <span class="side-label modern-label">现代</span>
              <h3>{{ pair.modern.title }}</h3>
              <p>{{ pair.modern.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-banner" ref="statsRef">
      <h2>新时代丝路成果</h2>
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="stat-card"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <span class="stat-icon">{{ stat.icon }}</span>
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const comparePairs = [
  {
    topic: '交通方式',
    topicIcon: '🛤️',
    ancient: { title: '驼队商旅', desc: '骆驼商队穿越大漠戈壁，往返需数月乃至数年，路途艰险。', icon: '🐫' },
    modern: { title: '中欧班列', desc: '高速货运列车连通亚欧，十几天即可到达，年开行数千列。', icon: '🚂' }
  },
  {
    topic: '贸易商品',
    topicIcon: '📦',
    ancient: { title: '丝绸瓷器', desc: '丝绸、瓷器、茶叶为主要出口商品，以物易物为主。', icon: '🧵' },
    modern: { title: '数字贸易', desc: '跨境电商、电子设备、新能源产品，数字丝绸之路蓬勃发展。', icon: '💻' }
  },
  {
    topic: '文化交流',
    topicIcon: '🎭',
    ancient: { title: '宗教艺术', desc: '佛教沿丝路东传，壁画石窟见证文化交融。', icon: '🕌' },
    modern: { title: '文旅互通', desc: '丝路旅游成为热点，各国游客互访，文化节目交流频繁。', icon: '✈️' }
  },
  {
    topic: '通信方式',
    topicIcon: '📡',
    ancient: { title: '驿站传书', desc: '驿站接力传递信息，一封书信辗转数月方能送达。', icon: '🐎' },
    modern: { title: '即时通信', desc: '5G网络覆盖，视频通话实时连接，信息瞬间传遍全球。', icon: '📱' }
  },
  {
    topic: '基础设施',
    topicIcon: '🏗️',
    ancient: { title: '关隘城池', desc: '嘉峪关、玉门关等关隘守护丝路，城墙绵延万里。', icon: '🏯' },
    modern: { title: '互联互通', desc: '铁路公路港口通信网络全面建设，产能合作不断深化。', icon: '🌐' }
  }
]

const stats = [
  { icon: '🚂', value: '数万列', label: '中欧班列年开行' },
  { icon: '💰', value: '千亿美元', label: '年贸易额' },
  { icon: '🌍', value: '150+', label: '合作国家和地区' },
  { icon: '🛤️', value: '万里', label: '铁路公路网络' }
]

const rowRefs = ref<HTMLElement[]>([])
const statsRef = ref<HTMLElement | null>(null)
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
    { threshold: 0.12 }
  )
  rowRefs.value.forEach((el) => {
    if (el) observer!.observe(el)
  })
  if (statsRef.value) observer.observe(statsRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.modern-view {
  min-height: 100vh;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  height: 320px;
  display: flex;
  overflow: hidden;
}

.hero-ancient {
  flex: 1;
  background: linear-gradient(135deg, #8B4513, #D4AF37);
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
}

.hero-modern {
  flex: 1;
  background: linear-gradient(135deg, #0f3460, #1a1a2e);
  clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 100%);
}

.hero-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
}

.hero-center h1 {
  font-family: 'SimSun', cursive;
  font-size: 2.8rem;
  color: #fff;
  letter-spacing: 8px;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  animation: heroFadeIn 1s ease-out;
}

.hero-sub {
  margin-top: 0.6rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
  letter-spacing: 3px;
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-vs {
  display: inline-block;
  margin-top: 1.2rem;
  width: 56px;
  height: 56px;
  line-height: 56px;
  background: linear-gradient(135deg, #D4AF37, #8B0000);
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Georgia', serif;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.5);
  animation: vsPulse 2s ease-in-out infinite;
}

.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: #F5DEB3;
  clip-path: ellipse(55% 100% at 50% 100%);
  z-index: 3;
}

.compare-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.compare-row {
  display: flex;
  align-items: stretch;
  gap: 0;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.compare-row .ancient-side {
  transform: translateX(-50px);
}

.compare-row .modern-side {
  transform: translateX(50px);
}

.compare-row.visible .ancient-side,
.compare-row.visible .modern-side {
  transform: translateX(0);
}

.compare-row.visible {
  opacity: 1;
}

.compare-side {
  flex: 1;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.side-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.side-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.ancient-side .side-card {
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-top: 3px solid #D4AF37;
}

.modern-side .side-card {
  border: 1px solid rgba(15, 52, 96, 0.15);
  border-top: 3px solid #0f3460;
}

.card-image {
  width: 100%;
  height: 200px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.06);
  transition: transform 0.5s ease;
}

.side-card:hover .image-placeholder {
  transform: scale(1.05);
}

.ancient-bg {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(139, 69, 19, 0.08));
}

.modern-bg {
  background: linear-gradient(135deg, rgba(15, 52, 96, 0.1), rgba(26, 26, 46, 0.06));
}

.ph-icon {
  font-size: 3rem;
  transition: transform 0.4s ease;
}

.side-card:hover .ph-icon {
  transform: scale(1.15);
}

.ph-text {
  font-size: 0.85rem;
  color: #aaa;
  font-family: 'SimSun', cursive;
}

.card-body {
  padding: 1.2rem 1.5rem;
  flex: 1;
}

.side-label {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  font-family: 'SimSun', cursive;
  background: rgba(139, 69, 19, 0.1);
  color: #8B4513;
  margin-bottom: 0.5rem;
}

.modern-label {
  background: rgba(15, 52, 96, 0.1);
  color: #0f3460;
}

.card-body h3 {
  font-family: 'SimSun', cursive;
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 0.4rem;
}

.card-body p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.7;
}

.compare-center {
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  position: relative;
  z-index: 2;
}

.topic-badge {
  background: #fff;
  border: 2px solid #D4AF37;
  border-radius: 50%;
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25);
  transition: all 0.4s ease;
}

.compare-row:hover .topic-badge {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 24px rgba(212, 175, 55, 0.4);
}

.topic-icon {
  font-size: 1.4rem;
}

.topic-text {
  font-size: 0.55rem;
  font-family: 'SimSun', cursive;
  color: #8B4513;
  font-weight: bold;
}

.center-line {
  width: 2px;
  flex: 1;
  min-height: 30px;
  background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
}

.arrow-right {
  opacity: 0.6;
}

.stats-banner {
  max-width: 1100px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stats-banner.visible {
  opacity: 1;
  transform: translateY(0);
}

.stats-banner h2 {
  text-align: center;
  font-family: 'SimSun', cursive;
  font-size: 1.6rem;
  color: #2F4F4F;
  margin-bottom: 2rem;
  position: relative;
}

.stats-banner h2::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #D4AF37;
  margin: 0.8rem auto 0;
  border-radius: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 12px;
  padding: 1.8rem 1rem;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.stats-banner.visible .stat-card {
  opacity: 1;
  transform: translateY(0);
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
}

.stat-icon {
  font-size: 2rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Georgia', serif;
  color: #D4AF37;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.7;
  font-family: 'SimSun', cursive;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes vsPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 260px;
  }

  .hero-ancient {
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
  }

  .hero-modern {
    clip-path: polygon(0 30%, 100% 0, 100% 100%, 0 100%);
  }

  .hero-center h1 {
    font-size: 2rem;
  }

  .compare-row {
    flex-direction: column;
    gap: 1rem;
  }

  .compare-row .ancient-side,
  .compare-row .modern-side {
    transform: translateY(30px);
  }

  .compare-row.visible .ancient-side,
  .compare-row.visible .modern-side {
    transform: translateY(0);
  }

  .compare-center {
    flex: none;
    flex-direction: row;
    padding: 0.5rem 0;
  }

  .center-line {
    width: 60px;
    height: 2px;
    min-height: auto;
    background: linear-gradient(to right, transparent, #D4AF37, transparent);
  }

  .arrow-right {
    transform: rotate(90deg);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
