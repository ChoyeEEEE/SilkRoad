<template>
  <div class="scenery-view">
    <div class="bg-sky" aria-hidden="true">
      <div class="sky-gradient"></div>
      <div v-for="n in 18" :key="n" class="sand-particle" :class="'sp-' + n"></div>
    </div>

    <section class="hero-banner">
      <div class="hero-bg-img"></div>
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
          <img :src="item.img" :alt="item.title" />
          <div class="panorama-label">
            <span class="label-index">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="panorama-title-overlay">
            <span>{{ item.title }}</span>
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
    img: '/picture/大漠黄沙.jpg',
    color: '#D4AF37',
    wide: true
  },
  {
    title: '雪山绿洲',
    desc: '天山雪水润泽绿洲，冰川与草原相映成趣。',
    img: '/picture/雪山绿洲.jpg',
    color: '#2F4F4F',
    wide: false
  },
  {
    title: '戈壁草原',
    desc: '戈壁荒原辽阔壮美，风吹草低见牛羊。',
    img: '/picture/戈壁草原.jpg',
    color: '#8B4513',
    wide: false
  },
  {
    title: '西域湖泊',
    desc: '月牙泉沙漠中的清泉，赛里木湖碧波荡漾。',
    img: '/picture/西域湖泊.v2',
    color: '#4682B4',
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
    { threshold: 0.12 }
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
  position: relative;
  background: linear-gradient(180deg, #e8dcc4 0%, #f0e6cc 30%, #ede0c0 60%, #e8d8b4 100%);
}

.bg-sky {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.sky-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(70, 130, 180, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(139, 69, 19, 0.03) 0%, transparent 60%);
}

.sand-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.4), transparent);
  animation: sandFloat linear infinite;
}

.sp-1  { width: 4px;  height: 4px;  left: 5%;  animation-duration: 16s; animation-delay: 0s; }
.sp-2  { width: 6px;  height: 6px;  left: 12%; animation-duration: 22s; animation-delay: -3s; }
.sp-3  { width: 3px;  height: 3px;  left: 20%; animation-duration: 18s; animation-delay: -7s; }
.sp-4  { width: 5px;  height: 5px;  left: 30%; animation-duration: 24s; animation-delay: -1s; }
.sp-5  { width: 7px;  height: 7px;  left: 38%; animation-duration: 19s; animation-delay: -9s; }
.sp-6  { width: 3px;  height: 3px;  left: 45%; animation-duration: 21s; animation-delay: -5s; }
.sp-7  { width: 8px;  height: 8px;  left: 55%; animation-duration: 17s; animation-delay: -11s; }
.sp-8  { width: 4px;  height: 4px;  left: 62%; animation-duration: 23s; animation-delay: -2s; }
.sp-9  { width: 5px;  height: 5px;  left: 70%; animation-duration: 20s; animation-delay: -8s; }
.sp-10 { width: 6px;  height: 6px;  left: 78%; animation-duration: 25s; animation-delay: -4s; }
.sp-11 { width: 3px;  height: 3px;  left: 85%; animation-duration: 18s; animation-delay: -12s; }
.sp-12 { width: 5px;  height: 5px;  left: 92%; animation-duration: 22s; animation-delay: -6s; }
.sp-13 { width: 4px;  height: 4px;  left: 15%; animation-duration: 20s; animation-delay: -14s; }
.sp-14 { width: 6px;  height: 6px;  left: 48%; animation-duration: 24s; animation-delay: -10s; }
.sp-15 { width: 3px;  height: 3px;  left: 65%; animation-duration: 16s; animation-delay: -13s; }
.sp-16 { width: 7px;  height: 7px;  left: 25%; animation-duration: 21s; animation-delay: -15s; }
.sp-17 { width: 4px;  height: 4px;  left: 82%; animation-duration: 19s; animation-delay: -7s; }
.sp-18 { width: 5px;  height: 5px;  left: 8%;  animation-duration: 23s; animation-delay: -16s; }

.hero-banner {
  position: relative;
  height: 320px;
  background: linear-gradient(135deg, #4682B4 0%, #2F4F4F 40%, #D4AF37 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  background: url('/picture/大漠黄沙.jpg') center/cover no-repeat;
  opacity: 0.25;
  animation: heroZoom 20s ease-in-out infinite alternate;
}

.hero-content {
  text-align: center;
  color: #fff;
  z-index: 1;
}

.hero-content h1 {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 2.8rem;
  letter-spacing: 8px;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  animation: heroFadeIn 1s ease-out;
}

.hero-sub {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  opacity: 0.85;
  letter-spacing: 4px;
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(180deg, transparent, #e8dcc4);
  clip-path: ellipse(55% 100% at 50% 100%);
  z-index: 2;
}

.scenery-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.panorama-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.12);
  opacity: 0;
  transform: translateY(60px);
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
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.12);
  border-color: rgba(212, 175, 55, 0.3);
}

.panorama-image {
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.panorama-card.wide .panorama-image {
  height: 340px;
}

.panorama-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.panorama-card:hover .panorama-image img {
  transform: scale(1.08);
}

.panorama-label {
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  z-index: 2;
}

.label-index {
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.25);
  font-family: 'Noto Serif SC', sans-serif;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.panorama-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem 1.5rem 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
  z-index: 1;
}

.panorama-title-overlay span {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  letter-spacing: 4px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.panorama-info {
  padding: 1.5rem 1.8rem;
  position: relative;
}

.panorama-info h3 {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 1.3rem;
  color: var(--accent, #333);
  margin-bottom: 0.5rem;
}

.panorama-info p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.8;
}

.info-accent {
  width: 40px;
  height: 3px;
  background: var(--accent, #D4AF37);
  margin-top: 1rem;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.panorama-card:hover .info-accent {
  width: 90px;
}

.season-strip {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
  position: relative;
  z-index: 1;
}

.strip-title {
  text-align: center;
  font-family: 'Noto Serif SC', sans-serif;
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
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
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.1);
}

.season-icon {
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
  transition: transform 0.3s ease;
}

.season-card:hover .season-icon {
  transform: scale(1.2);
}

.season-card h4 {
  font-family: 'Noto Serif SC', sans-serif;
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

@keyframes heroZoom {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}

@keyframes sandFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) translateX(0) scale(0);
  }
  10% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    transform: translateX(30px);
  }
  90% {
    opacity: 0.15;
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) translateX(-20px) scale(0.3);
  }
}

@media (max-width: 768px) {
  .scenery-section {
    grid-template-columns: 1fr;
  }

  .panorama-card.wide {
    grid-column: span 1;
  }

  .panorama-card.wide .panorama-image {
    height: 240px;
  }

  .season-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }
}
</style>
