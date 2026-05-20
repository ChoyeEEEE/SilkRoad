<template>
  <div class="culture-view">
    <section class="hero-banner">
      <div class="hero-content">
        <h1>丝路文化交融</h1>
        <p class="hero-sub">千年文明的碰撞与融合</p>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="culture-cards">
      <div
        v-for="(item, index) in cultureItems"
        :key="item.title"
        class="zigzag-row"
        :class="{ reverse: index % 2 !== 0 }"
        ref="cardRefs"
      >
        <div class="zigzag-image">
          <div class="image-frame">
            <div class="image-placeholder">
              <span class="ph-icon">{{ item.icon }}</span>
              <span class="ph-text">{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="zigzag-text">
          <span class="item-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <div class="text-decoration"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cultureItems = [
  {
    title: '宗教传播',
    desc: '佛教从印度传入中国，沿丝绸之路留下无数石窟寺庙。伊斯兰教亦经丝路传播，在中国大地生根发芽，形成了独特的文化交融景观。',
    icon: '🕌'
  },
  {
    title: '艺术交融',
    desc: '敦煌壁画展示中西合璧的艺术风格，飞天舞姿、供养人像尽显异域风情。乐器如琵琶、箜篌经丝路传入中原，成为盛唐乐舞的重要组成。',
    icon: '🎨'
  },
  {
    title: '语言与习俗',
    desc: '多种语言在丝路上交汇融合，驼铃声声穿越大漠。胡旋舞风靡盛唐，胡服、胡食融入中原生活，形成了丰富多彩的民俗风情。',
    icon: '📜'
  }
]

const cardRefs = ref<HTMLElement[]>([])
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
  cardRefs.value.forEach((el) => {
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.culture-view {
  min-height: 100vh;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #8B0000 0%, #2F4F4F 100%);
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

.culture-cards {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.zigzag-row {
  display: flex;
  gap: 3rem;
  align-items: center;
  opacity: 0;
  transform: translateX(-60px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.zigzag-row.reverse {
  transform: translateX(60px);
}

.zigzag-row.visible {
  opacity: 1;
  transform: translateX(0);
}

.zigzag-image {
  flex: 0 0 380px;
}

.image-frame {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(139, 0, 0, 0.15);
  transition: transform 0.4s ease;
}

.image-frame:hover {
  transform: scale(1.03) rotate(-1deg);
}

.image-placeholder {
  width: 100%;
  height: 260px;
  background: linear-gradient(135deg, rgba(245, 222, 179, 0.6), rgba(232, 224, 208, 0.8));
  border: 2px dashed rgba(139, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.ph-icon {
  font-size: 3rem;
  animation: iconFloat 3s ease-in-out infinite;
}

.ph-text {
  font-size: 0.9rem;
  color: #999;
  font-family: 'SimSun', cursive;
}

.zigzag-text {
  flex: 1;
  position: relative;
}

.item-number {
  font-size: 4rem;
  font-weight: 900;
  color: rgba(139, 0, 0, 0.08);
  font-family: 'Georgia', serif;
  line-height: 1;
  display: block;
  margin-bottom: -1rem;
}

.zigzag-text h3 {
  font-family: 'SimSun', cursive;
  font-size: 1.5rem;
  color: #8B0000;
  margin-bottom: 0.8rem;
  position: relative;
}

.zigzag-text p {
  color: #555;
  line-height: 1.8;
  font-size: 1rem;
}

.text-decoration {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #D4AF37, transparent);
  margin-top: 1rem;
  border-radius: 2px;
  animation: lineGrow 0.8s ease-out 0.5s both;
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes lineGrow {
  from { width: 0; }
  to { width: 50px; }
}

@media (max-width: 768px) {
  .zigzag-row,
  .zigzag-row.reverse {
    flex-direction: column;
    transform: translateY(40px);
  }

  .zigzag-row.visible {
    transform: translateY(0);
  }

  .zigzag-image {
    flex: none;
    width: 100%;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }
}
</style>
