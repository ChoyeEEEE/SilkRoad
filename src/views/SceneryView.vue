<template>
  <div class="scenery-view">
    <section class="hero-banner">
      <div class="hero-content">
        <h1>风光自然地貌</h1>
        <p class="hero-sub">穿越山河，领略丝路壮美</p>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="scenery-section">
      <div
        v-for="(item, index) in sceneryItems"
        :key="item.title"
        class="panorama-card"
        :class="{ wide: item.wide }"
        :style="{ '--accent': item.color }"
        ref="cardRefs"
      >
        <div class="panorama-image">
          <div class="image-placeholder" :style="{ background: item.gradient }">
            <span class="ph-icon">{{ item.icon }}</span>
            <span class="ph-text">{{ item.title }}实景图</span>
          </div>
          <div class="panorama-label">
            <span class="label-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
        </div>
        <div class="panorama-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <div class="info-accent"></div>
        </div>
      </div>
    </section>

    <section class="season-strip">
      <h2 class="strip-title">四季丝路</h2>
      <div class="season-cards">
        <div
          v-for="(season, index) in seasons"
          :key="season.name"
          class="season-card"
          :style="{ '--season-color': season.color, animationDelay: index * 0.15 + 's' }"
          ref="seasonRefs"
        >
          <div class="season-icon">{{ season.icon }}</div>
          <h4>{{ season.name }}</h4>
          <p>{{ season.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sceneryItems = [
  {
    title: '大漠黄沙',
    desc: '塔克拉玛干沙漠浩瀚无垠，驼铃声声穿越金色沙海。',
    icon: '🏜️',
    color: '#D4AF37',
    gradient: 'linear-gradient(135deg, #f5e6c8, #e8d5a3)',
    wide: true
  },
  {
    title: '雪山绿洲',
    desc: '天山雪水润泽绿洲，冰川与草原相映成趣。',
    icon: '🏔️',
    color: '#2F4F4F',
    gradient: 'linear-gradient(135deg, #d4e8e8, #a8c8c8)',
    wide: false
  },
  {
    title: '戈壁草原',
    desc: '戈壁荒原辽阔壮美，风吹草低见牛羊。',
    icon: '🌾',
    color: '#8B4513',
    gradient: 'linear-gradient(135deg, #e8dcc8, #d4c4a0)',
    wide: false
  },
  {
    title: '西域湖泊',
    desc: '月牙泉沙漠中的清泉，赛里木湖碧波荡漾。',
    icon: '💧',
    color: '#4682B4',
    gradient: 'linear-gradient(135deg, #c8dce8, #a0c0d8)',
    wide: true
  }
]

const seasons = [
  { name: '春', icon: '🌸', desc: '万物复苏，绿意盎然', color: '#6B8E23' },
  { name: '夏', icon: '☀️', desc: '热浪滚滚，瓜果飘香', color: '#DAA520' },
  { name: '秋', icon: '🍂', desc: '金风送爽，层林尽染', color: '#CD853F' },
  { name: '冬', icon: '❄️', desc: '银装素裹，静谧壮美', color: '#4682B4' }
]

const cardRefs = ref<HTMLElement[]>([])
const seasonRefs = ref<HTMLElement[]>([])
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
    { threshold: 0.15 }
  )
  ;[...cardRefs.value, ...seasonRefs.value].forEach((el) => {
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.scenery-view {
  min-height: 100vh;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #4682B4 0%, #2F4F4F 60%, #D4AF37 100%);
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
  background: #F5DEB3;
  clip-path: ellipse(55% 100% at 50% 100%);
}

.scenery-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.panorama-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.panorama-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.panorama-card.wide {
  grid-column: span 2;
}

.panorama-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
}

.panorama-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.panorama-card.wide .panorama-image {
  height: 300px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.6s ease;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.08);
}

.panorama-card:hover .image-placeholder {
  transform: scale(1.05);
}

.ph-icon {
  font-size: 3.5rem;
  animation: iconPulse 2.5s ease-in-out infinite;
}

.ph-text {
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.3);
  font-family: 'SimSun', cursive;
}

.panorama-label {
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
}

.label-index {
  font-size: 3rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Georgia', serif;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.panorama-info {
  padding: 1.5rem;
  position: relative;
}

.panorama-info h3 {
  font-family: 'SimSun', cursive;
  font-size: 1.3rem;
  color: var(--accent, #333);
  margin-bottom: 0.5rem;
}

.panorama-info p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.7;
}

.info-accent {
  width: 40px;
  height: 3px;
  background: var(--accent, #D4AF37);
  margin-top: 1rem;
  border-radius: 2px;
  transition: width 0.4s ease;
}

.panorama-card:hover .info-accent {
  width: 80px;
}

.season-strip {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

.strip-title {
  text-align: center;
  font-family: 'SimSun', cursive;
  font-size: 1.6rem;
  color: #2F4F4F;
  margin-bottom: 2rem;
  position: relative;
}

.strip-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #D4AF37;
  margin: 0.8rem auto 0;
  border-radius: 2px;
}

.season-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.season-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.8rem 1.2rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border-top: 3px solid var(--season-color);
  opacity: 0;
  transform: translateY(30px) rotateX(10deg);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.season-card.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0);
}

.season-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.season-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

.season-card h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.2rem;
  color: var(--season-color);
  margin-bottom: 0.4rem;
}

.season-card p {
  font-size: 0.85rem;
  color: #888;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@media (max-width: 768px) {
  .scenery-section {
    grid-template-columns: 1fr;
  }

  .panorama-card.wide {
    grid-column: span 1;
  }

  .season-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }
}
</style>
