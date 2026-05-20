<template>
  <div class="heritage-view">
    <section class="hero-banner">
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
            <div class="image-placeholder">
              <span class="ph-icon">{{ item.icon }}</span>
              <span class="ph-text">{{ item.title }}</span>
            </div>
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
    icon: '🖼️',
    category: '绘画艺术',
    tags: ['壁画', '飞天', '莫高窟'],
    size: 'large'
  },
  {
    title: '西域织锦',
    desc: '克什米尔风格织锦工艺精湛，图案融合东西方美学。',
    icon: '🧵',
    category: '纺织技艺',
    tags: ['织锦', '克什米尔'],
    size: 'normal'
  },
  {
    title: '古法制茶',
    desc: '普洱茶古法制作技艺沿丝路传播，茶香飘万里。',
    icon: '🍵',
    category: '传统工艺',
    tags: ['普洱', '茶道'],
    size: 'normal'
  },
  {
    title: '陶艺制作',
    desc: '丝路陶艺融合多元文化，唐三彩等作品享誉世界。',
    icon: '🏺',
    category: '陶瓷工艺',
    tags: ['唐三彩', '陶瓷'],
    size: 'large'
  },
  {
    title: '传统乐器',
    desc: '巴德瑶鼓琴、琵琶、箜篌等乐器见证丝路音乐交融。',
    icon: '🎵',
    category: '音乐艺术',
    tags: ['琵琶', '箜篌'],
    size: 'normal'
  },
  {
    title: '丝路歌舞',
    desc: '胡旋舞、胡腾舞身姿曼妙，风靡盛唐宫廷。',
    icon: '💃',
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
}

.hero-banner {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #2F4F4F 0%, #8B0000 100%);
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

.heritage-grid-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.heritage-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.1);
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.heritage-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.heritage-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 36px rgba(139, 0, 0, 0.12);
}

.heritage-card.large {
  grid-column: span 2;
}

.heritage-card.large .card-image {
  height: 280px;
}

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(47, 79, 79, 0.08), rgba(139, 0, 0, 0.06));
  border-bottom: 2px dashed rgba(139, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.ph-icon {
  font-size: 3rem;
  transition: transform 0.4s ease;
}

.heritage-card:hover .ph-icon {
  transform: scale(1.2) rotate(5deg);
}

.ph-text {
  font-size: 0.85rem;
  color: #aaa;
  font-family: 'SimSun', cursive;
}

.card-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.overlay-category {
  background: rgba(139, 0, 0, 0.85);
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-family: 'SimSun', cursive;
  backdrop-filter: blur(4px);
}

.card-content {
  padding: 1.2rem 1.5rem;
}

.card-content h3 {
  font-family: 'SimSun', cursive;
  font-size: 1.2rem;
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
  font-family: 'SimSun', cursive;
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

@media (max-width: 768px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }

  .heritage-card.large {
    grid-column: span 1;
  }

  .heritage-card.large .card-image {
    height: 200px;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }
}
</style>
