<template>
  <div class="history-view">
    <!-- 页面顶部装饰 -->
    <div class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>历史溯源</h1>
        <p>穿越千年时光，探寻丝绸之路的起源与辉煌</p>
      </div>
      <div class="scroll-hint">
        <span>向下滚动</span>
        <div class="scroll-arrow"></div>
      </div>
    </div>

    <!-- 时间轴内容 -->
    <section class="timeline-section">
      <h2 class="section-title">丝路起源与历史</h2>

      <div class="timeline">
        <!-- 中轴线 -->
        <div class="timeline-line">
          <div class="line-progress" ref="lineProgress"></div>
        </div>

        <!-- 时间轴节点 -->
        <div v-for="(item, index) in timelineData" :key="index"
             class="timeline-node"
             :class="[index % 2 === 0 ? 'node-left' : 'node-right', { 'is-visible': visibleItems.has(index) }]"
             ref="nodeRefs">

          <!-- 连接线 -->
          <div class="node-connector">
            <div class="connector-line"></div>
            <div class="connector-dot">
              <span class="dot-icon">{{ item.icon }}</span>
            </div>
          </div>

          <!-- 卡片 -->
          <div class="node-card">
            <!-- 图片区域 -->
            <div class="card-image" :style="{ background: item.gradient }">
              <img v-if="item.image" :src="item.image" :alt="item.imageLabel" class="card-img" />
              <div v-else class="image-placeholder">
                <span class="placeholder-icon">{{ item.icon }}</span>
                <span class="placeholder-text">{{ item.imageLabel }}</span>
              </div>
              <div class="image-overlay"></div>
            </div>

            <!-- 内容区域 -->
            <div class="card-body">
              <div class="card-era">{{ item.era }}</div>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.description }}</p>
              <div class="card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- 年份标签 -->
          <div class="year-badge">{{ item.year }}</div>
        </div>
      </div>
    </section>

    <!-- 底部总结 -->
    <section class="summary-section">
      <div class="summary-card">
        <div class="summary-icon">🏛️</div>
        <h3>历史意义</h3>
        <p>丝绸之路不仅是一条贸易通道，更是连接东西方文明的桥梁。它促进了文化、宗教、科技、艺术的交流融合，对人类文明发展产生了深远影响。</p>
        <div class="summary-stats">
          <div class="stat">
            <span class="stat-num">2000+</span>
            <span class="stat-label">年历史</span>
          </div>
          <div class="stat">
            <span class="stat-num">7000+</span>
            <span class="stat-label">公里路程</span>
          </div>
          <div class="stat">
            <span class="stat-num">数十</span>
            <span class="stat-label">个国家</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TimelineItem {
  year: string
  era: string
  title: string
  description: string
  icon: string
  imageLabel: string
  gradient: string
  image?: string
  tags: string[]
}

const timelineData: TimelineItem[] = [
  {
    year: '前138年',
    era: '西汉时期',
    title: '张骞出使西域',
    description: '汉武帝派张骞出使西域，历经13年艰难险阻，开辟了中原通往西域的道路。张骞的两次出使，不仅带回了西域各国的地理人文信息，更开启了东西方文明交流的伟大篇章。',
    icon: '🛤️',
    imageLabel: '张骞出使西域',
    image: '/picture/1866C5AF7EA21DF62C35C3354A6385A4.jpg',
    gradient: 'linear-gradient(135deg, #C9A96E 0%, #8B6914 100%)',
    tags: ['外交使命', '文明交流', '西域探索']
  },
  {
    year: '前2世纪',
    era: '西汉时期',
    title: '陆上丝绸之路开辟',
    description: '西汉为争取盟友对抗匈奴，正式开通陆上丝路。从长安出发，经河西走廊、西域，通往中亚、西亚，最终抵达地中海沿岸。这条路线成为古代东西方贸易和文化交流的大动脉。',
    icon: '🐫',
    imageLabel: '沙漠驼队',
    image: '/picture/D5EE03F4B408EC0758DA49F1D1E82D65.jpg',
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #8B4513 100%)',
    tags: ['贸易通道', '文化桥梁', '驼队商旅']
  },
  {
    year: '7世纪',
    era: '唐宋时期',
    title: '海上丝绸之路鼎盛',
    description: '唐宋时期，海上丝绸之路达到鼎盛。泉州、广州成为世界级大港口，商船往来于东南亚、南亚、西亚及东非地区。瓷器、丝绸、茶叶从这里运往世界各地。',
    icon: '⛵',
    imageLabel: '海上贸易',
    image: '/picture/7BD645C4E1B458ED35106187F8F6A9AA.jpg',
    gradient: 'linear-gradient(135deg, #2F4F4F 0%, #1a3a3a 100%)',
    tags: ['海上贸易', '港口文化', '瓷器之路']
  },
  {
    year: '13世纪',
    era: '蒙元时期',
    title: '蒙古帝国与丝路复兴',
    description: '蒙古帝国的统一使丝绸之路再度繁荣。马可·波罗沿丝路来到中国，他的游记让欧洲人第一次详细了解了东方的富庶。东西方的贸易和文化交流达到新高峰。',
    icon: '🏰',
    imageLabel: '东西方交汇',
    image: '/picture/09B828686165D7C89E2C09B4D082A1FF.jpg',
    gradient: 'linear-gradient(135deg, #8B0000 0%, #5a0000 100%)',
    tags: ['帝国统一', '文化交流', '马可·波罗']
  },
  {
    year: '历久弥新',
    era: '当代',
    title: '丝路精神传承',
    description: '丝绸之路的历史意义超越了时空限制。它所承载的和平合作、开放包容、互学互鉴、互利共赢的精神，至今仍激励着世界各国携手共建人类命运共同体。',
    icon: '🌏',
    imageLabel: '新时代丝路',
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #C9A96E 100%)',
    tags: ['一带一路', '文明互鉴', '共同繁荣']
  }
]

const visibleItems = ref(new Set<number>())
const lineProgress = ref<HTMLElement | null>(null)
const nodeRefs = ref<HTMLElement[]>([])

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'))
          visibleItems.value = new Set([...visibleItems.value, index])
        }
      })
    },
    { threshold: 0.3 }
  )

  setTimeout(() => {
    document.querySelectorAll('.timeline-node').forEach((el, i) => {
      el.setAttribute('data-index', String(i))
      observer?.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.history-view {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f0e8 0%, #ede4d3 50%, #f5f0e8 100%);
}

/* ========== 顶部横幅 ========== */
.hero-banner {
  position: relative;
  height: 65vh;
  min-height: 440px;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(139,37,0,0.35) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(139,37,0,0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(184,134,11,0.2) 0%, transparent 50%),
    linear-gradient(170deg, #1a0a0a 0%, #3d1215 25%, #5C1A1B 45%, #7A2E2E 60%, #4A1A0A 80%, #2a1008 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(90deg, transparent 0px, transparent 60px, rgba(212,175,55,0.03) 60px, rgba(212,175,55,0.03) 61px),
    repeating-linear-gradient(0deg, transparent 0px, transparent 60px, rgba(212,175,55,0.03) 60px, rgba(212,175,55,0.03) 61px);
}

.hero-banner::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid rgba(212,175,55,0.15);
  margin: 1.5rem;
  border-radius: 4px;
  pointer-events: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-content h1 {
  font-size: 4.2rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: #D4AF37;
  letter-spacing: 16px;
  text-shadow:
    0 0 20px rgba(212,175,55,0.3),
    0 2px 10px rgba(0,0,0,0.6);
  animation: fadeInDown 1s ease-out;
  position: relative;
}

.hero-content h1::before,
.hero-content h1::after {
  content: '—';
  font-size: 1.8rem;
  letter-spacing: 4px;
  color: rgba(212,175,55,0.5);
  vertical-align: middle;
  margin: 0 0.8rem;
}

.hero-content p {
  font-size: 1.25rem;
  color: rgba(220,200,170,0.75);
  margin-top: 1.2rem;
  letter-spacing: 5px;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  animation: fadeInUp 1s ease-out 0.3s both;
  position: relative;
}

.hero-content p::before,
.hero-content p::after {
  content: '';
  display: inline-block;
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent);
  vertical-align: middle;
  margin: 0 1rem;
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: fadeInUp 1s ease-out 0.8s both;
}

.scroll-hint span {
  font-size: 0.8rem;
  color: rgba(212,175,55,0.45);
  letter-spacing: 3px;
}

.scroll-arrow {
  width: 18px;
  height: 18px;
  border-right: 1.5px solid rgba(212,175,55,0.45);
  border-bottom: 1.5px solid rgba(212,175,55,0.45);
  transform: rotate(45deg);
  animation: bounce 2s ease-in-out infinite;
}

/* ========== 时间轴区域 ========== */
.timeline-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: #8B0000;
  letter-spacing: 4px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 1rem auto 0;
}

/* ========== 时间轴 ========== */
.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(139,105,20,0.15);
  transform: translateX(-50%);
  border-radius: 2px;
}

.line-progress {
  width: 100%;
  height: 0%;
  background: linear-gradient(180deg, #D4AF37, #8B6914);
  border-radius: 2px;
  transition: height 0.1s linear;
}

/* ========== 时间轴节点 ========== */
.timeline-node {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 4rem;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-node.node-left {
  flex-direction: row;
  padding-right: calc(50% + 40px);
  transform: translateX(-40px);
}

.timeline-node.node-right {
  flex-direction: row-reverse;
  padding-left: calc(50% + 40px);
  transform: translateX(40px);
}

.timeline-node.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* 连接器 */
.node-connector {
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

.connector-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37, #8B6914);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(212,175,55,0.4), 0 0 0 4px rgba(212,175,55,0.1);
  transition: all 0.4s ease;
}

.connector-dot:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(212,175,55,0.5), 0 0 0 8px rgba(212,175,55,0.15);
}

.dot-icon {
  font-size: 1.4rem;
}

/* 卡片 */
.node-card {
  flex: 1;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
}

.node-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
}

/* 图片区域 */
.card-image {
  height: 220px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.node-card:hover .card-img {
  transform: scale(1.05);
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 1;
}

.placeholder-icon {
  font-size: 3rem;
  opacity: 0.7;
  animation: float 3s ease-in-out infinite;
}

.placeholder-text {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.8);
  letter-spacing: 2px;
  font-family: 'SimSun', serif;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.15) 100%);
}

/* 内容区域 */
.card-body {
  padding: 1.5rem;
}

.card-era {
  display: inline-block;
  padding: 0.25rem 0.8rem;
  background: rgba(212,175,55,0.1);
  color: #8B6914;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 0.8rem;
}

.card-title {
  font-size: 1.3rem;
  color: #333;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  letter-spacing: 2px;
  margin-bottom: 0.8rem;
}

.card-desc {
  font-size: 0.9rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 1rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  padding: 0.2rem 0.6rem;
  background: #f8f4ee;
  color: #8B6914;
  border-radius: 12px;
  font-size: 0.7rem;
  border: 1px solid rgba(139,105,20,0.15);
}

/* 年份标签 */
.year-badge {
  position: absolute;
  top: 20px;
  padding: 0.4rem 1rem;
  background: #8B0000;
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  font-family: 'SimSun', serif;
  letter-spacing: 1px;
  box-shadow: 0 3px 10px rgba(139,0,0,0.3);
  z-index: 5;
}

.node-left .year-badge {
  right: calc(50% + 60px);
}

.node-right .year-badge {
  left: calc(50% + 60px);
}

/* ========== 底部总结 ========== */
.summary-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.summary-card {
  background: linear-gradient(135deg, #3a2a10 0%, #6b4e10 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.summary-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(45deg, transparent 0px, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 60px);
}

.summary-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  position: relative;
}

.summary-card h3 {
  font-size: 1.8rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  position: relative;
}

.summary-card p {
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.9;
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.summary-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  position: relative;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stat-num {
  font-size: 2rem;
  font-weight: bold;
  color: #D4AF37;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .hero-banner { min-height: 360px; height: 50vh; }
  .hero-banner::after { margin: 0.8rem; }
  .hero-content h1 { font-size: 2.6rem; letter-spacing: 8px; }
  .hero-content h1::before, .hero-content h1::after { font-size: 1.2rem; margin: 0 0.4rem; }
  .hero-content p { font-size: 1rem; letter-spacing: 3px; }
  .hero-content p::before, .hero-content p::after { width: 24px; margin: 0 0.5rem; }
  .timeline-section { padding: 2rem 1rem; }
  .section-title { font-size: 2rem; }

  .timeline-line { left: 24px; }

  .timeline-node.node-left,
  .timeline-node.node-right {
    padding-left: 70px;
    padding-right: 0;
    flex-direction: row;
  }

  .node-connector { left: 24px; }
  .connector-dot { width: 40px; height: 40px; }
  .dot-icon { font-size: 1.1rem; }

  .node-left .year-badge,
  .node-right .year-badge {
    left: 70px;
    right: auto;
    top: -10px;
  }

  .card-image { height: 140px; }
  .placeholder-icon { font-size: 2.5rem; }

  .summary-card { padding: 2rem 1.5rem; }
  .summary-stats { gap: 1.5rem; }
  .stat-num { font-size: 1.5rem; }
}

/* ========== 关键帧 ========== */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(6px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
