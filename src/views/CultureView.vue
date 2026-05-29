<template>
  <div class="culture-view">
    <!-- 顶部装饰云纹 -->
    <div class="cloud-pattern cloud-left" aria-hidden="true"></div>
    <div class="cloud-pattern cloud-right" aria-hidden="true"></div>

    <!-- 页面标题区 -->
    <header class="hero-header">
      <div class="hero-bg-particles" aria-hidden="true">
        <span v-for="n in 20" :key="n" class="hero-particle" :class="'hp-' + n"></span>
      </div>
      <div class="hero-content">
        <div class="title-ornament top-ornament" aria-hidden="true">
          <span class="ornament-line"></span>
          <span class="ornament-diamond"></span>
          <span class="ornament-line"></span>
        </div>
        <h1 class="hero-title">
          <span class="title-char" v-for="(ch, i) in '文化瑰宝'" :key="i"
                :style="{ animationDelay: i * 0.12 + 's' }">{{ ch }}</span>
        </h1>
        <p class="hero-subtitle">丝路千年遗珍 · 文明交汇之光</p>
        <div class="title-ornament bottom-ornament" aria-hidden="true">
          <span class="ornament-line"></span>
          <span class="ornament-diamond"></span>
          <span class="ornament-line"></span>
        </div>
      </div>
      <div class="hero-scroll-hint" aria-hidden="true">
        <span class="scroll-text">向下探索</span>
        <span class="scroll-arrow"></span>
      </div>
    </header>

    <!-- 引言区 -->
    <section class="intro-section" ref="introRef">
      <div class="section-container">
        <div class="intro-card" :class="{ 'visible': introVisible }">
          <div class="intro-icon" aria-hidden="true">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-dasharray="4 4" class="rotating-circle"/>
              <text x="40" y="46" text-anchor="middle" font-size="28" fill="var(--dunhuang-red)">🏛</text>
            </svg>
          </div>
          <p class="intro-text">
            丝绸之路不仅是一条商贸通道，更是一座流动的文化宝库。千年岁月中，
            东西方文明在这条古道上碰撞交融，留下了无数珍贵的文化瑰宝。
            从波斯银币到大唐铜镜，从东南亚贝雕到西域漆器，
            每一件文物都承载着跨越山海的文明故事。
          </p>
        </div>
      </div>
    </section>

    <!-- 文物展览区 -->
    <section class="exhibition-section">
      <div class="section-container">
        <div class="section-header" ref="headerRef">
          <div class="header-line left-line" :class="{ 'visible': headerVisible }"></div>
          <h2 class="section-title" :class="{ 'visible': headerVisible }">
            <span class="title-icon" aria-hidden="true">🏺</span>
            珍品典藏
            <span class="title-icon" aria-hidden="true">🪞</span>
          </h2>
          <div class="header-line right-line" :class="{ 'visible': headerVisible }"></div>
        </div>

        <!-- 文物卡片网格 -->
        <div class="artifacts-grid">
          <div
            v-for="(artifact, index) in artifacts"
            :key="artifact.id"
            class="artifact-card"
            :class="{ 'visible': cardVisible[index] }"
            :style="{ animationDelay: index * 0.15 + 's' }"
            :ref="(el) => setCardRef(el as HTMLElement, index)"
          >
            <!-- 卡片装饰角 -->
            <div class="card-corner top-left" aria-hidden="true"></div>
            <div class="card-corner top-right" aria-hidden="true"></div>
            <div class="card-corner bottom-left" aria-hidden="true"></div>
            <div class="card-corner bottom-right" aria-hidden="true"></div>

            <!-- 图片区域 -->
            <div class="artifact-image-wrap">
              <div class="image-placeholder" :style="{ background: artifact.bgGradient }">
                <img
                  v-if="artifact.image"
                  :src="artifact.image"
                  :alt="artifact.title"
                  class="artifact-img"
                  loading="lazy"
                  @error="onImageError($event, artifact)"
                />
                <div v-else class="placeholder-pattern" aria-hidden="true"></div>
                <div v-if="!artifact.image || imageErrorMap[artifact.id]" class="placeholder-icon">{{ artifact.icon }}</div>
                <div class="image-overlay" @click="openModal(artifact)">
                  <span class="overlay-text">点击查看详情</span>
                </div>
              </div>
              <!-- 年代标签 -->
              <div class="era-badge">{{ artifact.era }}</div>
              <!-- 浮动光效 -->
              <div class="image-glow" aria-hidden="true"></div>
            </div>

            <!-- 信息区域 -->
            <div class="artifact-info">
              <h3 class="artifact-title">{{ artifact.title }}</h3>
              <div class="info-divider" aria-hidden="true">
                <span class="divider-dot"></span>
                <span class="divider-line"></span>
                <span class="divider-dot"></span>
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">材质</span>
                  <span class="info-value">{{ artifact.material }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">年代</span>
                  <span class="info-value">{{ artifact.period }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">地区</span>
                  <span class="info-value">{{ artifact.region }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">馆藏</span>
                  <span class="info-value">{{ artifact.museum }}</span>
                </div>
              </div>
              <p class="artifact-desc">{{ artifact.description }}</p>
              <div class="artifact-size" v-if="artifact.size">
                <span class="size-icon" aria-hidden="true">📐</span>
                {{ artifact.size }}
              </div>
            </div>

            <!-- 底部装饰线 -->
            <div class="card-bottom-deco" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 图片放大弹窗 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="selectedArtifact" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-content" :class="{ 'modal-enter': modalEnter }">
            <button class="modal-close" @click="closeModal" aria-label="关闭">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div class="modal-body">
              <div class="modal-image-section">
                <div class="modal-image-wrap">
                  <img
                    v-if="selectedArtifact.image"
                    :src="selectedArtifact.image"
                    :alt="selectedArtifact.title"
                    class="modal-img"
                    :class="{ 'modal-img-loaded': modalImgLoaded }"
                    @load="modalImgLoaded = true"
                  />
                  <div v-else class="modal-placeholder" :style="{ background: selectedArtifact.bgGradient }">
                    <span class="modal-placeholder-icon">{{ selectedArtifact.icon }}</span>
                  </div>
                  <div class="modal-image-shine" aria-hidden="true"></div>
                </div>
              </div>
              <div class="modal-info-section">
                <h2 class="modal-title">{{ selectedArtifact.title }}</h2>
                <div class="modal-divider" aria-hidden="true">
                  <span class="modal-divider-dot"></span>
                  <span class="modal-divider-line"></span>
                  <span class="modal-divider-dot"></span>
                </div>
                <div class="modal-info-grid">
                  <div class="modal-info-item">
                    <span class="modal-info-label">藏品材质</span>
                    <span class="modal-info-value">{{ selectedArtifact.material }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">藏品年代</span>
                    <span class="modal-info-value">{{ selectedArtifact.period }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">所属地区</span>
                    <span class="modal-info-value">{{ selectedArtifact.region }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">收藏博物馆</span>
                    <span class="modal-info-value">{{ selectedArtifact.museum }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">题材</span>
                    <span class="modal-info-value">{{ selectedArtifact.theme }}</span>
                  </div>
                  <div class="modal-info-item full-width" v-if="selectedArtifact.size">
                    <span class="modal-info-label">尺寸</span>
                    <span class="modal-info-value">{{ selectedArtifact.size }}</span>
                  </div>
                </div>
                <p class="modal-desc">{{ selectedArtifact.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- 底部丝路路线装饰 -->
    <section class="route-deco-section">
      <div class="route-line" aria-hidden="true">
        <span class="route-dot" v-for="n in 7" :key="n"
              :style="{ left: (n * 14) + '%', animationDelay: n * 0.3 + 's' }"></span>
        <div class="route-path"></div>
      </div>
      <p class="route-caption">丝路万里 · 文化千年</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue'

interface Artifact {
  id: number
  title: string
  icon: string
  image: string
  bgGradient: string
  era: string
  material: string
  period: string
  region: string
  museum: string
  theme: string
  description: string
  size: string
}

const artifacts: Artifact[] = [
  {
    id: 1,
    title: '1835年秘鲁加盖"菲律宾"印银币',
    icon: '🪙',
    image: '/picture/artifact-1.jpg',
    bgGradient: 'linear-gradient(145deg, #d4c5a9 0%, #a89070 40%, #c2b280 100%)',
    era: '18-19世纪',
    material: '钱币',
    period: '18-19世纪',
    region: '中国',
    museum: '广州海事博物馆',
    theme: '海上丝绸之路',
    description: '此银币原为秘鲁铸造，后加盖"菲律宾"印记，见证了19世纪海上丝绸之路的贸易往来与货币流通。',
    size: '长：40.0、宽：0.5、高：40.0mm'
  },
  {
    id: 2,
    title: '水烟桶',
    icon: '🏺',
    image: '/picture/artifact-2.jpg',
    bgGradient: 'linear-gradient(145deg, #1a3a6a 0%, #2a5aaa 40%, #0a2050 100%)',
    era: '16-17世纪',
    material: '陶瓷',
    period: '16-17世纪',
    region: '美国',
    museum: '美国克利夫兰艺术博物馆',
    theme: '其他',
    description: '精美的蓝釉描金陶瓷水烟桶，通体施钴蓝釉，以金彩绘花卉纹饰，色彩对比鲜明，展现了丝路贸易中东西方工艺的交融。',
    size: '整体：19.8厘米（7 13/16英寸）'
  },
  {
    id: 3,
    title: '泰斯莱乌的银器',
    icon: '💍',
    image: '/picture/artifact-3.jpg',
    bgGradient: 'linear-gradient(145deg, #1a1a1a 0%, #3a3a3a 40%, #0a0a0a 100%)',
    era: '维京时代',
    material: '银',
    period: '维京时代',
    region: '丹麦',
    museum: '丹麦国立博物馆',
    theme: '丝绸之路',
    description: '泰斯莱乌银器窖藏，包含大量银质饰品、钱币与器物，见证了维京时代北欧与东方丝路贸易的繁荣交流。',
    size: '未知'
  },
  {
    id: 5,
    title: '金凤冠',
    icon: '👑',
    image: '/picture/artifact-5.jpg',
    bgGradient: 'linear-gradient(145deg, #4a3a20 0%, #8a7a40 40%, #3a2a10 100%)',
    era: '明代',
    material: '金',
    period: '明',
    region: '中国',
    museum: '贵州省博物馆',
    theme: '其他',
    description: '明代金质凤冠，以金丝编织为主体，镶嵌各类宝石，工艺繁复精美，彰显了皇家贵族的尊贵气度与明代金银器制作的高超技艺。',
    size: '无'
  },
  {
    id: 6,
    title: '清竹柄黑漆描金纸面象牙面人物纹折扇',
    icon: '🪭',
    image: '/picture/artifact-6.jpg',
    bgGradient: 'linear-gradient(145deg, #2a1a1a 0%, #5a3a2a 40%, #1a0a0a 100%)',
    era: '清代',
    material: '钙化骨',
    period: '清',
    region: '中国',
    museum: '广州海事博物馆',
    theme: '海上丝绸之路',
    description: '清代精品折扇，竹柄黑漆描金，纸面与象牙面结合，绘有人物故事纹饰，工艺精巧绝伦，是海上丝路外销艺术品中的珍品。',
    size: '扇长:29.3cm，扇宽54.5cm，扇厚3cm，盒重182g，扇重92.5g'
  },
  {
    id: 4,
    title: '十九世纪八仙过海图贝雕',
    icon: '🐚',
    image: '/picture/artifact-4.jpg',
    bgGradient: 'linear-gradient(145deg, #e8e0d4 0%, #c8bfb0 40%, #f0ece4 100%)',
    era: '18-19世纪',
    material: '钙化骨',
    period: '18-19世纪',
    region: '中国',
    museum: '广州海事博物馆',
    theme: '海上丝绸之路',
    description: '以钙化骨为材，精雕细刻八仙过海的经典题材，雕工细腻入微，人物栩栩如生，是海上丝路文化交流中的工艺珍品。',
    size: '纵:19、横:20、厚:2.5cm，重337g'
  }
]

const introRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const introVisible = ref(false)
const headerVisible = ref(false)
const cardVisible = reactive<boolean[]>(artifacts.map(() => false))
const imageErrorMap = reactive<Record<number, boolean>>({})
const cardRefs: (HTMLElement | null)[] = []
const selectedArtifact = ref<Artifact | null>(null)
const modalEnter = ref(false)
const modalImgLoaded = ref(false)

const openModal = (artifact: Artifact) => {
  selectedArtifact.value = artifact
  modalImgLoaded.value = false
  modalEnter.value = false
  document.body.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modalEnter.value = true
    })
  })
}

const closeModal = () => {
  modalEnter.value = false
  document.body.style.overflow = ''
  setTimeout(() => {
    selectedArtifact.value = null
  }, 300)
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedArtifact.value) {
    closeModal()
  }
}

const onImageError = (e: Event, artifact: Artifact) => {
  imageErrorMap[artifact.id] = true
}

const setCardRef = (el: HTMLElement | null, index: number) => {
  cardRefs[index] = el
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === introRef.value) {
            introVisible.value = true
          } else if (entry.target === headerRef.value) {
            headerVisible.value = true
          } else {
            const idx = cardRefs.indexOf(entry.target as HTMLElement)
            if (idx !== -1) {
              cardVisible[idx] = true
            }
          }
        }
      })
    },
    { threshold: 0.15 }
  )

  if (introRef.value) observer.observe(introRef.value)
  if (headerRef.value) observer.observe(headerRef.value)
  cardRefs.forEach((el) => {
    if (el) observer!.observe(el)
  })

  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ===== 色彩变量 ===== */
.culture-view {
  --desert-yellow: #F5DEB3;
  --gobi-brown: #8B4513;
  --dunhuang-red: #8B0000;
  --qingdai-blue: #2F4F4F;
  --gold: #D4AF37;
  --cream: #FDF8F0;
  --dark-bg: #1a1410;
  --card-shadow: 0 8px 32px rgba(139, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* ===== 基础 ===== */
.culture-view {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--cream) 0%, var(--desert-yellow) 50%, #f0e6d0 100%);
  position: relative;
  overflow: hidden;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ===== 装饰云纹 ===== */
.cloud-pattern {
  position: fixed;
  width: 200px;
  height: 200px;
  opacity: 0.04;
  pointer-events: none;
  z-index: 0;
}

.cloud-left {
  top: 10%;
  left: -40px;
  background: radial-gradient(ellipse at center, var(--dunhuang-red) 0%, transparent 70%);
  border-radius: 50%;
  animation: cloud-drift 20s ease-in-out infinite;
}

.cloud-right {
  top: 40%;
  right: -40px;
  background: radial-gradient(ellipse at center, var(--gold) 0%, transparent 70%);
  border-radius: 50%;
  animation: cloud-drift 25s ease-in-out infinite reverse;
}

/* ===== 页面标题区 Hero ===== */
.hero-header {
  position: relative;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(
    180deg,
    rgba(26, 20, 16, 0.92) 0%,
    rgba(139, 0, 0, 0.85) 50%,
    rgba(139, 69, 19, 0.8) 100%
  );
  overflow: hidden;
}

.hero-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(47, 79, 79, 0.12) 0%, transparent 50%);
  pointer-events: none;
}

/* Hero 粒子 */
.hero-bg-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--gold);
  border-radius: 50%;
  opacity: 0;
  animation: hero-float 8s ease-in-out infinite;
}

.hp-1  { left: 8%;  top: 20%; animation-delay: 0s; }
.hp-2  { left: 15%; top: 60%; animation-delay: -1s; }
.hp-3  { left: 22%; top: 35%; animation-delay: -2s; }
.hp-4  { left: 30%; top: 80%; animation-delay: -3s; }
.hp-5  { left: 38%; top: 15%; animation-delay: -4s; }
.hp-6  { left: 45%; top: 50%; animation-delay: -0.5s; }
.hp-7  { left: 52%; top: 70%; animation-delay: -2.5s; }
.hp-8  { left: 60%; top: 25%; animation-delay: -1.5s; }
.hp-9  { left: 68%; top: 55%; animation-delay: -3.5s; }
.hp-10 { left: 75%; top: 40%; animation-delay: -4.5s; }
.hp-11 { left: 82%; top: 75%; animation-delay: -0.8s; }
.hp-12 { left: 90%; top: 20%; animation-delay: -2.8s; }
.hp-13 { left: 12%; top: 45%; animation-delay: -1.2s; }
.hp-14 { left: 28%; top: 90%; animation-delay: -3.2s; }
.hp-15 { left: 42%; top: 10%; animation-delay: -4.2s; }
.hp-16 { left: 58%; top: 85%; animation-delay: -0.3s; }
.hp-17 { left: 72%; top: 15%; animation-delay: -2.3s; }
.hp-18 { left: 85%; top: 60%; animation-delay: -3.8s; }
.hp-19 { left: 5%;  top: 80%; animation-delay: -1.8s; }
.hp-20 { left: 95%; top: 45%; animation-delay: -4.8s; }

.hero-content {
  position: relative;
  z-index: 1;
}

/* 标题装饰线 */
.title-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.ornament-line {
  display: block;
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  animation: line-expand 1.5s ease-out both;
}

.ornament-diamond {
  width: 10px;
  height: 10px;
  background: var(--gold);
  transform: rotate(45deg);
  animation: diamond-spin 2s ease-in-out infinite;
  flex-shrink: 0;
}

/* 主标题逐字动画 */
.hero-title {
  font-size: 3.5rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: var(--desert-yellow);
  letter-spacing: 12px;
  text-shadow: 0 2px 20px rgba(212, 175, 55, 0.3);
  margin: 0;
}

.title-char {
  display: inline-block;
  animation: char-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: rgba(245, 222, 179, 0.7);
  letter-spacing: 6px;
  margin-top: 1rem;
  font-family: 'Noto Sans SC', sans-serif;
  animation: fade-up 1s 0.6s ease both;
}

/* 底部滚动提示 */
.hero-scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: fade-up 1s 1.2s ease both;
}

.scroll-text {
  font-size: 0.8rem;
  color: rgba(245, 222, 179, 0.5);
  letter-spacing: 2px;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(212, 175, 55, 0.5);
  border-bottom: 2px solid rgba(212, 175, 55, 0.5);
  transform: rotate(45deg);
  animation: arrow-bounce 2s ease-in-out infinite;
}

/* ===== 引言区 ===== */
.intro-section {
  padding: 5rem 0 3rem;
  position: relative;
}

.intro-card {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 8px 40px rgba(139, 0, 0, 0.06);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.intro-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--dunhuang-red), var(--gold), var(--qingdai-blue));
}

.intro-icon {
  margin-bottom: 1.5rem;
}

.rotating-circle {
  animation: rotate-slow 20s linear infinite;
  transform-origin: 40px 40px;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 2;
  color: #4a3728;
  text-indent: 2em;
  font-family: 'Noto Sans SC', sans-serif;
}

/* ===== 展览区 ===== */
.exhibition-section {
  padding: 2rem 0 5rem;
  position: relative;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.header-line {
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, transparent, var(--gold));
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.header-line.right-line {
  background: linear-gradient(90deg, var(--gold), transparent);
}

.header-line.visible {
  width: 120px;
}

.section-title {
  font-size: 2rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: var(--dunhuang-red);
  letter-spacing: 8px;
  white-space: nowrap;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-title.visible {
  opacity: 1;
  transform: scale(1);
}

.title-icon {
  display: inline-block;
  animation: icon-pulse 2s ease-in-out infinite;
}

/* ===== 文物卡片网格 ===== */
.artifacts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
}

/* ===== 单个文物卡片 ===== */
.artifact-card {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.15);
  box-shadow: var(--card-shadow);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  opacity: 0;
  transform: translateY(60px);
}

.artifact-card.visible {
  animation: card-enter 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.artifact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(139, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  border-color: rgba(212, 175, 55, 0.35);
}

/* 卡片装饰角 */
.card-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 2;
  pointer-events: none;
}

.card-corner::before,
.card-corner::after {
  content: '';
  position: absolute;
  background: var(--gold);
  transition: all 0.4s ease;
}

.card-corner.top-left { top: 8px; left: 8px; }
.card-corner.top-left::before { width: 20px; height: 1.5px; top: 0; left: 0; }
.card-corner.top-left::after { width: 1.5px; height: 20px; top: 0; left: 0; }

.card-corner.top-right { top: 8px; right: 8px; }
.card-corner.top-right::before { width: 20px; height: 1.5px; top: 0; right: 0; }
.card-corner.top-right::after { width: 1.5px; height: 20px; top: 0; right: 0; }

.card-corner.bottom-left { bottom: 8px; left: 8px; }
.card-corner.bottom-left::before { width: 20px; height: 1.5px; bottom: 0; left: 0; }
.card-corner.bottom-left::after { width: 1.5px; height: 20px; bottom: 0; left: 0; }

.card-corner.bottom-right { bottom: 8px; right: 8px; }
.card-corner.bottom-right::before { width: 20px; height: 1.5px; bottom: 0; right: 0; }
.card-corner.bottom-right::after { width: 1.5px; height: 20px; bottom: 0; right: 0; }

.artifact-card:hover .card-corner::before,
.artifact-card:hover .card-corner::after {
  background: var(--dunhuang-red);
}

/* 图片区域 */
.artifact-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.placeholder-pattern {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px);
  animation: pattern-shift 30s linear infinite;
}

.placeholder-icon {
  font-size: 4rem;
  filter: grayscale(20%) brightness(1.1);
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  animation: icon-float 4s ease-in-out infinite;
}

.artifact-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
  filter: saturate(0.9);
}

.artifact-card:hover .artifact-img {
  transform: scale(1.06);
  filter: saturate(1.1) brightness(1.05);
}

.artifact-card:hover .placeholder-icon {
  transform: scale(1.15) rotate(-5deg);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(139, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
}

.artifact-card:hover .image-overlay {
  opacity: 1;
}

.overlay-text {
  color: var(--desert-yellow);
  font-size: 0.95rem;
  letter-spacing: 3px;
  border: 1px solid rgba(245, 222, 179, 0.5);
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  animation: overlay-text-enter 0.3s ease both;
}

/* 年代标签 */
.era-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(139, 0, 0, 0.85);
  color: var(--desert-yellow);
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  letter-spacing: 1px;
  z-index: 3;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(212, 175, 55, 0.3);
}

/* 浮动光效 */
.image-glow {
  position: absolute;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  animation: glow-wander 6s ease-in-out infinite;
}

/* 信息区域 */
.artifact-info {
  padding: 1.5rem 1.8rem 1.8rem;
}

.artifact-title {
  font-size: 1.2rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: var(--gobi-brown);
  line-height: 1.6;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
}

.artifact-card:hover .artifact-title {
  color: var(--dunhuang-red);
}

/* 信息分隔线 */
.info-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.8rem 0;
}

.divider-dot {
  width: 4px;
  height: 4px;
  background: var(--gold);
  border-radius: 50%;
  flex-shrink: 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold), rgba(212, 175, 55, 0.2));
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1.2rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.75rem;
  color: var(--qingdai-blue);
  background: rgba(47, 79, 79, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 1px;
}

.info-value {
  font-size: 0.85rem;
  color: #5a4a3a;
  font-family: 'Noto Sans SC', sans-serif;
}

.artifact-desc {
  font-size: 0.9rem;
  line-height: 1.8;
  color: #6a5a4a;
  margin-bottom: 0.8rem;
  font-family: 'Noto Sans SC', sans-serif;
}

.artifact-size {
  font-size: 0.8rem;
  color: #8a7a6a;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-top: 0.6rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
}

.size-icon {
  font-size: 0.85rem;
}

/* 卡片底部装饰线 */
.card-bottom-deco {
  height: 3px;
  background: linear-gradient(90deg, var(--dunhuang-red), var(--gold), var(--qingdai-blue), var(--gold), var(--dunhuang-red));
  background-size: 200% 100%;
  animation: shimmer-line 4s linear infinite;
}

/* ===== 底部丝路路线装饰 ===== */
.route-deco-section {
  padding: 3rem 2rem 4rem;
  text-align: center;
  position: relative;
}

.route-line {
  position: relative;
  max-width: 800px;
  margin: 0 auto 2rem;
  height: 40px;
}

.route-path {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), var(--dunhuang-red), var(--gold), transparent);
  transform: translateY(-50%);
}

.route-dot {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background: var(--gold);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: dot-pulse 2s ease-in-out infinite;
  border: 2px solid var(--dunhuang-red);
}

.route-caption {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.2rem;
  color: var(--gobi-brown);
  letter-spacing: 6px;
  opacity: 0.7;
}

/* ========== 关键帧动画 ========== */

@keyframes char-rise {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes line-expand {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 80px;
    opacity: 1;
  }
}

@keyframes diamond-spin {
  0%, 100% { transform: rotate(45deg) scale(1); }
  50% { transform: rotate(225deg) scale(1.2); }
}

@keyframes hero-float {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  15% {
    opacity: 0.6;
    transform: translateY(-20px) scale(1);
  }
  85% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: translateY(-120px) scale(0.3);
  }
}

@keyframes arrow-bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.5; }
  50% { transform: rotate(45deg) translateY(6px); opacity: 1; }
}

@keyframes cloud-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -10px) scale(1.1); }
}

@keyframes rotate-slow {
  to { transform: rotate(360deg); }
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes icon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes icon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes glow-wander {
  0% { top: 20%; left: 30%; }
  33% { top: 50%; left: 60%; }
  66% { top: 30%; left: 40%; }
  100% { top: 20%; left: 30%; }
}

@keyframes shimmer-line {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes pattern-shift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

@keyframes overlay-text-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dot-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    box-shadow: 0 0 0 8px rgba(212, 175, 55, 0);
  }
}

/* ========== 响应式 ========== */
@media (max-width: 900px) {
  .artifacts-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 8px;
  }

  .hero-header {
    min-height: 55vh;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .header-line.visible {
    width: 60px;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
    letter-spacing: 6px;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    letter-spacing: 3px;
  }

  .artifact-info {
    padding: 1.2rem 1.2rem 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .intro-card {
    padding: 2rem 1.5rem;
  }

  .section-container {
    padding: 0 1rem;
  }
}
</style>

<!-- 弹窗样式不使用 scoped，因为 Teleport 到 body -->
<style>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  position: relative;
  background: #fdf8f0;
  border-radius: 20px;
  max-width: 960px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.2);
  transform: scale(0.85) translateY(30px);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}

.modal-content.modal-enter {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(139, 0, 0, 0.85);
  color: #fdf8f0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-close:hover {
  background: #8B0000;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);
}

.modal-body {
  display: flex;
  gap: 0;
}

.modal-image-section {
  flex: 0 0 55%;
  min-height: 400px;
}

.modal-image-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px 0 0 20px;
}

.modal-img {
  width: 100%;
  height: 100%;
  min-height: 400px;
  object-fit: cover;
  display: block;
  transform: scale(1.1);
  opacity: 0;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, opacity 0.5s ease 0.1s;
}

.modal-img.modal-img-loaded {
  transform: scale(1);
  opacity: 1;
}

.modal-placeholder {
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-placeholder-icon {
  font-size: 6rem;
}

.modal-image-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.08) 100%
  );
  pointer-events: none;
}

.modal-info-section {
  flex: 1;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
}

.modal-title {
  font-size: 1.6rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #8B0000;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.modal-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.8rem 0 1.5rem;
}

.modal-divider-dot {
  width: 5px;
  height: 5px;
  background: #D4AF37;
  border-radius: 50%;
  flex-shrink: 0;
}

.modal-divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.15));
}

.modal-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.modal-info-item.full-width {
  grid-column: 1 / -1;
}

.modal-info-label {
  font-size: 0.72rem;
  color: #2F4F4F;
  background: rgba(47, 79, 79, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  letter-spacing: 1.5px;
  font-weight: 500;
  display: inline-block;
  align-self: flex-start;
}

.modal-info-value {
  font-size: 0.95rem;
  color: #4a3728;
  font-family: 'Noto Sans SC', sans-serif;
}

.modal-desc {
  font-size: 0.95rem;
  line-height: 2;
  color: #6a5a4a;
  font-family: 'Noto Sans SC', sans-serif;
  text-indent: 2em;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
  padding-top: 1.2rem;
  margin-top: auto;
}

/* 弹窗过渡动画 */
.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-backdrop {
    padding: 1rem;
    align-items: flex-end;
  }

  .modal-content {
    max-height: 92vh;
    border-radius: 16px 16px 0 0;
  }

  .modal-body {
    flex-direction: column;
  }

  .modal-image-section {
    flex: none;
    min-height: 240px;
    max-height: 300px;
  }

  .modal-image-wrap {
    border-radius: 16px 16px 0 0;
  }

  .modal-img {
    min-height: 240px;
  }

  .modal-info-section {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .modal-info-grid {
    gap: 0.8rem 1rem;
  }
}
</style>
