<template>
  <div class="heritage-view">
    <div class="bg-pattern" aria-hidden="true">
      <div class="pattern-layer"></div>
      <div v-for="n in 16" :key="n" class="float-dot" :class="'d-' + n"></div>
    </div>

    <section class="hero-banner">
      <div class="hero-bg-img"></div>
      <div class="hero-content">
        <h1>非遗与传统技艺</h1>
        <p class="hero-sub">匠心传承，千年不息</p>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="heritage-grid-section">
      <div class="masonry-grid">
        <div
          v-for="(item, index) in heritageItems"
          :key="item.title"
          class="heritage-card"
          :class="item.size"
          :style="{ animationDelay: index * 0.12 + 's' }"
          ref="cardRefs"
        >
          <div class="card-image">
            <img :src="item.img" :alt="item.title" />
            <div class="card-overlay">
              <span class="overlay-category">{{ item.category }}</span>
            </div>
          </div>
          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const heritageItems = [
  {
    title: '敦煌壁画',
    desc: '千佛洞壁画经千年风雨仍色彩斑斓，飞天形象举世闻名。',
    img: '/picture/敦煌壁画.jpg',
    category: '绘画艺术',
    tags: ['壁画', '飞天', '莫高窟'],
    size: 'large'
  },
  {
    title: '西域织锦',
    desc: '克什米尔风格织锦工艺精湛，图案融合东西方美学。',
    img: '/picture/西域织锦.v1',
    category: '纺织技艺',
    tags: ['织锦', '克什米尔'],
    size: 'normal'
  },
  {
    title: '古法制茶',
    desc: '普洱茶古法制作技艺沿丝路传播，茶香飘万里。',
    img: '/picture/古法制茶.webp',
    category: '传统工艺',
    tags: ['普洱', '茶道'],
    size: 'normal'
  },
  {
    title: '陶艺制作',
    desc: '丝路陶艺融合多元文化，唐三彩等作品享誉世界。',
    img: '/picture/陶艺制作.v1',
    category: '陶瓷工艺',
    tags: ['唐三彩', '陶瓷'],
    size: 'large'
  },
  {
    title: '传统乐器',
    desc: '巴德瑶鼓琴、琵琶、箜篌等乐器见证丝路音乐交融。',
    img: '/picture/传统乐器.jpg',
    category: '音乐艺术',
    tags: ['琵琶', '箜篌'],
    size: 'normal'
  },
  {
    title: '丝路歌舞',
    desc: '胡旋舞、胡腾舞身姿曼妙，风靡盛唐宫廷。',
    img: '/picture/丝路歌舞.jpg',
    category: '表演艺术',
    tags: ['胡旋舞', '宫廷乐'],
    size: 'normal'
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
    { threshold: 0.1 }
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
.heritage-view {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: linear-gradient(170deg, #f5ecd4 0%, #efe3c6 20%, #e8d8b4 50%, #f0e6cc 80%, #f5ecd4 100%);
}

.bg-pattern {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.pattern-layer {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(139, 0, 0, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(47, 79, 79, 0.02) 0%, transparent 60%);
}

.float-dot {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.35), transparent);
  animation: dotFloat linear infinite;
}

.d-1  { width: 5px;  height: 5px;  left: 8%;  animation-duration: 20s; animation-delay: 0s; }
.d-2  { width: 3px;  height: 3px;  left: 18%; animation-duration: 25s; animation-delay: -4s; }
.d-3  { width: 7px;  height: 7px;  left: 28%; animation-duration: 18s; animation-delay: -8s; }
.d-4  { width: 4px;  height: 4px;  left: 38%; animation-duration: 22s; animation-delay: -2s; }
.d-5  { width: 6px;  height: 6px;  left: 48%; animation-duration: 26s; animation-delay: -10s; }
.d-6  { width: 3px;  height: 3px;  left: 58%; animation-duration: 19s; animation-delay: -5s; }
.d-7  { width: 8px;  height: 8px;  left: 68%; animation-duration: 23s; animation-delay: -12s; }
.d-8  { width: 4px;  height: 4px;  left: 78%; animation-duration: 21s; animation-delay: -3s; }
.d-9  { width: 5px;  height: 5px;  left: 88%; animation-duration: 24s; animation-delay: -7s; }
.d-10 { width: 6px;  height: 6px;  left: 95%; animation-duration: 17s; animation-delay: -9s; }
.d-11 { width: 4px;  height: 4px;  left: 12%; animation-duration: 22s; animation-delay: -14s; }
.d-12 { width: 5px;  height: 5px;  left: 55%; animation-duration: 20s; animation-delay: -6s; }
.d-13 { width: 3px;  height: 3px;  left: 72%; animation-duration: 25s; animation-delay: -11s; }
.d-14 { width: 7px;  height: 7px;  left: 35%; animation-duration: 18s; animation-delay: -1s; }
.d-15 { width: 4px;  height: 4px;  left: 82%; animation-duration: 23s; animation-delay: -13s; }
.d-16 { width: 6px;  height: 6px;  left: 5%;  animation-duration: 21s; animation-delay: -15s; }

.hero-banner {
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #2F4F4F 0%, #8B0000 60%, #D4AF37 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  background: url('/picture/敦煌壁画.jpg') center/cover no-repeat;
  opacity: 0.2;
  animation: heroZoom 18s ease-in-out infinite alternate;
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
  background: linear-gradient(180deg, transparent, #f5ecd4);
  clip-path: ellipse(55% 100% at 50% 100%);
  z-index: 2;
}

.heritage-grid-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  position: relative;
  z-index: 1;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.8rem;
}

.heritage-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(6px);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.12);
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.heritage-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.heritage-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(139, 0, 0, 0.1);
  border-color: rgba(212, 175, 55, 0.3);
}

.heritage-card.large {
  grid-column: span 2;
}

.heritage-card.large .card-image {
  height: 300px;
}

.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.heritage-card:hover .card-image img {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.4s ease;
}

.heritage-card:hover .card-overlay {
  opacity: 1;
  transform: translateY(0);
}

.overlay-category {
  background: rgba(139, 0, 0, 0.85);
  color: #fff;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: 'Noto Serif SC', sans-serif;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card-content {
  padding: 1.4rem 1.6rem;
}

.card-content h3 {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 1.25rem;
  color: #2F4F4F;
  margin-bottom: 0.5rem;
}

.card-content p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 0.8rem;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(212, 175, 55, 0.12);
  color: #8B6914;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-family: 'Noto Serif SC', sans-serif;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(212, 175, 55, 0.25);
  transform: translateY(-2px);
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes heroZoom {
  from { transform: scale(1); }
  to { transform: scale(1.12); }
}

@keyframes dotFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 0.6;
    transform: scale(1);
  }
  90% {
    opacity: 0.15;
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) scale(0.3);
  }
}

@media (max-width: 768px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }

  .heritage-card.large {
    grid-column: span 1;
  }

  .heritage-card.large .card-image {
    height: 220px;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .card-overlay {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
