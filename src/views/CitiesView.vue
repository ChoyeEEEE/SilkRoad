<template>
  <div class="cities-view">
    <div class="bg-particles" aria-hidden="true">
      <div v-for="n in 20" :key="n" class="bg-particle" :class="'p-' + n"></div>
    </div>

    <section class="hero-banner">
      <div class="hero-content">
        <h1>沿线名城古迹</h1>
        <p class="hero-sub">丝路千年，城池依旧</p>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="cities-section">
      <div class="region-group">
        <h3 class="region-label"><span class="label-icon">🏯</span> 国内名城</h3>
        <div class="cards-column">
          <div
            v-for="(city, index) in domesticCities"
            :key="city.name"
            class="city-card"
            :class="{ reverse: index % 2 !== 0 }"
            ref="domRefs"
          >
            <div class="card-image">
              <img :src="city.img" :alt="city.name" />
              <div class="image-overlay">
                <span class="overlay-city">{{ city.name }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="card-tag domestic">国内</div>
              <h4 class="card-title">{{ city.name }}</h4>
              <p class="card-desc">{{ city.desc }}</p>
              <div class="card-accent"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="region-group">
        <h3 class="region-label"><span class="label-icon">🌍</span> 国外名城</h3>
        <div class="cards-column">
          <div
            v-for="(city, index) in foreignCities"
            :key="city.name"
            class="city-card"
            :class="{ reverse: index % 2 !== 0 }"
            ref="forRefs"
          >
            <div class="card-image">
              <img :src="city.img" :alt="city.name" />
              <div class="image-overlay">
                <span class="overlay-city">{{ city.name }}</span>
              </div>
            </div>
            <div class="card-body">
              <div class="card-tag foreign">国外</div>
              <h4 class="card-title">{{ city.name }}</h4>
              <p class="card-desc">{{ city.desc }}</p>
              <div class="card-accent foreign-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const domesticCities = [
  { name: '西安', desc: '起点城市，秦始皇兵马俑所在地，十三朝古都，丝绸之路从这里出发连接东西方文明。', img: '/picture/西安.jpg' },
  { name: '敦煌', desc: '莫高窟所在地，佛教艺术宝库，千年壁画见证丝路繁华，飞天形象举世闻名。', img: '/picture/敦煌.jpg' },
  { name: '楼兰', desc: '古代驿城，戈壁中的庞贝，曾是丝路重镇，如今只剩遗址诉说往日辉煌。', img: '/picture/楼兰.jpg' },
  { name: '嘉峪关', desc: '长城西端关隘，天下第一雄关，大漠孤烟中的军事要塞。', img: '/picture/嘉峪关.jpg' },
  { name: '吐鲁番', desc: '火焰山脚下，葡萄之乡，坎儿井灌溉系统展现古人智慧。', img: '/picture/吐鲁番.jpg' },
]

const foreignCities = [
  { name: '罗马', desc: '欧洲终点，古罗马帝国中心，条条大路通罗马，丝路将东西方紧密相连。', img: '/picture/罗马.jpg' },
  { name: '波斯', desc: '重要中转站，波斯帝国核心地带，东西方贸易与文化的桥梁。', img: '/picture/波斯.jpg' },
  { name: '撒马尔罕', desc: '中亚枢纽，帖木儿帝国首都，蓝色穹顶下藏着丝路最璀璨的文明。', img: '/picture/撒马尔罕.jpg' },
]

const domRefs = ref<HTMLElement[]>([])
const forRefs = ref<HTMLElement[]>([])
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
    { threshold: 0.1 }
  )
  ;[...domRefs.value, ...forRefs.value].forEach((el) => {
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.cities-view {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(180deg, #F5DEB3 0%, #f0e6d0 30%, #e8dcc8 60%, #F5DEB3 100%);
}

.bg-particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.bg-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent);
  animation: particleFloat linear infinite;
}

.p-1  { width: 6px;  height: 6px;  left: 5%;  animation-duration: 18s; animation-delay: 0s; }
.p-2  { width: 4px;  height: 4px;  left: 12%; animation-duration: 22s; animation-delay: -3s; }
.p-3  { width: 8px;  height: 8px;  left: 20%; animation-duration: 16s; animation-delay: -6s; }
.p-4  { width: 5px;  height: 5px;  left: 28%; animation-duration: 20s; animation-delay: -1s; }
.p-5  { width: 7px;  height: 7px;  left: 35%; animation-duration: 24s; animation-delay: -8s; }
.p-6  { width: 4px;  height: 4px;  left: 42%; animation-duration: 17s; animation-delay: -4s; }
.p-7  { width: 9px;  height: 9px;  left: 50%; animation-duration: 21s; animation-delay: -10s; }
.p-8  { width: 5px;  height: 5px;  left: 58%; animation-duration: 19s; animation-delay: -2s; }
.p-9  { width: 6px;  height: 6px;  left: 65%; animation-duration: 23s; animation-delay: -7s; }
.p-10 { width: 4px;  height: 4px;  left: 72%; animation-duration: 15s; animation-delay: -5s; }
.p-11 { width: 7px;  height: 7px;  left: 80%; animation-duration: 25s; animation-delay: -9s; }
.p-12 { width: 5px;  height: 5px;  left: 88%; animation-duration: 18s; animation-delay: -11s; }
.p-13 { width: 3px;  height: 3px;  left: 95%; animation-duration: 20s; animation-delay: -3s; }
.p-14 { width: 6px;  height: 6px;  left: 8%;  animation-duration: 22s; animation-delay: -13s; }
.p-15 { width: 5px;  height: 5px;  left: 48%; animation-duration: 16s; animation-delay: -15s; }
.p-16 { width: 8px;  height: 8px;  left: 30%; animation-duration: 19s; animation-delay: -12s; }
.p-17 { width: 4px;  height: 4px;  left: 75%; animation-duration: 21s; animation-delay: -14s; }
.p-18 { width: 6px;  height: 6px;  left: 55%; animation-duration: 17s; animation-delay: -6s; }
.p-19 { width: 5px;  height: 5px;  left: 15%; animation-duration: 23s; animation-delay: -8s; }
.p-20 { width: 7px;  height: 7px;  left: 85%; animation-duration: 20s; animation-delay: -10s; }

.hero-banner {
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #8B4513 0%, #D4AF37 40%, #8B0000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/picture/R-C.jpg') center/cover no-repeat;
  opacity: 0.25;
  animation: heroZoom 20s ease-in-out infinite alternate;
}

.hero-content {
  text-align: center;
  color: #fff;
  z-index: 1;
}

.hero-content h1 {
  font-family: 'Noto Sans SC', sans-serif;
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
  background: linear-gradient(180deg, transparent, #F5DEB3);
  clip-path: ellipse(55% 100% at 50% 100%);
  z-index: 2;
}

.cities-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  position: relative;
  z-index: 1;
}

.region-group {
  margin-bottom: 3.5rem;
}

.region-label {
  color: #8B4513;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding-left: 1rem;
  border-left: 4px solid #D4AF37;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-icon {
  font-size: 1.6rem;
}

.cards-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.city-card {
  display: flex;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.city-card.reverse {
  flex-direction: row-reverse;
  transform: translateX(50px);
}

.city-card.visible {
  opacity: 1;
  transform: translateX(0);
}

.city-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(139, 0, 0, 0.12);
  border-color: rgba(212, 175, 55, 0.35);
}

.card-image {
  flex: 0 0 380px;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.city-card:hover .card-image img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.2rem 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.city-card:hover .image-overlay {
  opacity: 1;
}

.overlay-city {
  color: #fff;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 4px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.card-body {
  flex: 1;
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.card-tag {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 14px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  width: fit-content;
}

.card-tag.domestic {
  background: rgba(47, 79, 79, 0.1);
  color: #2F4F4F;
}

.card-tag.foreign {
  background: rgba(212, 175, 55, 0.15);
  color: #8B6914;
}

.card-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.4rem;
  color: #8B0000;
  margin-bottom: 0.6rem;
}

.card-desc {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.8;
}

.card-accent {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #D4AF37, transparent);
  margin-top: 1.2rem;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.card-accent.foreign-accent {
  background: linear-gradient(90deg, #8B4513, transparent);
}

.city-card:hover .card-accent {
  width: 80px;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes heroZoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 0.6;
    transform: scale(1);
  }
  90% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) scale(0.4);
  }
}

@media (max-width: 768px) {
  .city-card,
  .city-card.reverse {
    flex-direction: column;
    transform: translateY(30px);
  }

  .city-card.visible {
    transform: translateY(0);
  }

  .card-image {
    flex: none;
    height: 200px;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .image-overlay {
    opacity: 1;
  }
}
</style>
