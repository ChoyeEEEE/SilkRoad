<template>
  <div class="home-view">
    <header class="main-visual">
      <div class="banner">
        <div class="bg-clean"></div>
        <svg class="hero-silk-line" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="wideGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceGraphic" stdDeviation="12"/></filter>
            <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="lineGrad" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#C8982C" stop-opacity="0"/><stop offset="8%" stop-color="#C8982C" stop-opacity="0.4"/><stop offset="25%" stop-color="#E8C872"/><stop offset="50%" stop-color="#C8982C"/><stop offset="75%" stop-color="#E8C872"/><stop offset="92%" stop-color="#C8982C" stop-opacity="0.4"/><stop offset="100%" stop-color="#C8982C" stop-opacity="0"/>
            </linearGradient>
            <radialGradient id="nodeHalo"><stop offset="0%" stop-color="#C8982C" stop-opacity="0.15"/><stop offset="100%" stop-color="#C8982C" stop-opacity="0"/></radialGradient>
          </defs>
          <path class="line-ambient" :d="heroPath" stroke="rgba(200,152,44,0.06)" stroke-width="50" fill="none" stroke-linecap="round" filter="url(#wideGlow)"/>
          <path class="line-glow" :d="heroPath" stroke="rgba(200,152,44,0.12)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#softGlow)"/>
          <path class="line-main" :d="heroPath" stroke="url(#lineGrad)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <path class="line-flow" :d="heroPath" stroke="rgba(255,248,220,0.9)" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="40 1200" stroke-dashoffset="0" filter="url(#softGlow)"/>
          <g v-for="(node, i) in heroNodes" :key="node.id" class="hero-node" :style="{ animationDelay: (i * 0.2 + 1.2) + 's' }">
            <circle :cx="node.x" :cy="node.y" r="16" fill="url(#nodeHalo)" class="node-halo" :style="{ animationDelay: (i * 0.3 + 1.5) + 's' }"/>
            <circle :cx="node.x" :cy="node.y" r="3" fill="#E8C872" filter="url(#nodeGlow)" class="node-core"/>
            <circle :cx="node.x" :cy="node.y" r="1.2" fill="#fff" opacity="0.9"/>
            <text :x="node.x" :y="node.y + (node.above ? -20 : 26)" class="node-label" text-anchor="middle" :style="{ animationDelay: (i * 0.2 + 1.6) + 's' }">{{ node.name }}</text>
          </g>
        </svg>
        <div class="banner-text">
          <h1><span v-for="(char, i) in titleChars" :key="i" class="title-char" :style="{ animationDelay: (i * 0.08) + 's' }">{{ char }}</span></h1>
          <p class="subtitle">跨越千年时空，感受文明交流的宏伟篇章</p>
        </div>
      </div>
      <nav class="quick-nav">
        <button @click="scrollToSection('routes')"><span class="btn-icon">🗺️</span><span class="btn-label">路线</span></button>
        <button @click="scrollToSection('culture')"><span class="btn-icon">🎭</span><span class="btn-label">文化</span></button>
        <button @click="scrollToSection('cities')"><span class="btn-icon">🏛️</span><span class="btn-label">古迹</span></button>
        <button @click="scrollToSection('trade')"><span class="btn-icon">🐫</span><span class="btn-label">好物</span></button>
        <button @click="scrollToSection('modern')"><span class="btn-icon">🔄</span><span class="btn-label">古今对比</span></button>
      </nav>
    </header>

    <div class="stats-strip" ref="statsRef">
      <div class="stats-inner" :class="{ visible: statsVisible }">
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat-item" :style="{ animationDelay: i * 0.15 + 's' }">
          <span class="stat-number">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <section id="routes" class="content-section">
      <div class="section-inner" :class="{ visible: visibleSections.routes }">
        <div class="section-header">
          <span class="section-tag">ROUTES</span>
          <h2>丝路路线图</h2>
          <p class="section-desc">从长安到罗马，跨越万里的文明通道</p>
        </div>
        <div class="img-slider" :style="{ '--dur': routeImages.length * 3 + 's' }">
          <div class="slider-track">
            <div v-for="(img, i) in routeImages" :key="'a'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
            <div v-for="(img, i) in routeImages" :key="'b'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
          </div>
        </div>
        <router-link to="/routes" class="section-link">查看完整路线 <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></router-link>
      </div>
    </section>

    <section id="culture" class="content-section section-alt">
      <div class="section-inner" :class="{ visible: visibleSections.culture }">
        <div class="section-header">
          <span class="section-tag">CULTURE</span>
          <h2>文化瑰宝</h2>
          <p class="section-desc">宗教、艺术与思想的东西交融</p>
        </div>
        <div class="img-slider" :style="{ '--dur': cultureImages.length * 3 + 's' }">
          <div class="slider-track">
            <div v-for="(img, i) in cultureImages" :key="'a'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
            <div v-for="(img, i) in cultureImages" :key="'b'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
          </div>
        </div>
        <router-link to="/culture" class="section-link">探索文化瑰宝 <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></router-link>
      </div>
    </section>

    <div class="feature-banner">
      <div class="feature-banner-inner">
        <div class="feature-image-slot"><div class="image-placeholder-banner"><span class="ph-icon-large">🖼️</span><span class="ph-text-banner">在此添加丝路全景横幅图片</span></div></div>
        <div class="feature-overlay">
          <p class="feature-quote">"无数铃声遥过碛，应驮白练到安西"</p>
          <span class="feature-attr">— 张籍《凉州词》</span>
        </div>
      </div>
    </div>

    <section id="cities" class="content-section">
      <div class="section-inner" :class="{ visible: visibleSections.cities }">
        <div class="section-header">
          <span class="section-tag">CITIES</span>
          <h2>沿线名城</h2>
          <p class="section-desc">丝路上的璀璨明珠</p>
        </div>
        <div class="img-slider" :style="{ '--dur': cityImages.length * 3 + 's' }">
          <div class="slider-track">
            <div v-for="(img, i) in cityImages" :key="'a'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
            <div v-for="(img, i) in cityImages" :key="'b'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
          </div>
        </div>
        <router-link to="/cities" class="section-link">游览名城古迹 <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></router-link>
      </div>
    </section>

    <section id="trade" class="content-section section-alt">
      <div class="section-inner" :class="{ visible: visibleSections.trade }">
        <div class="section-header">
          <span class="section-tag">TRADE</span>
          <h2>商贸物产</h2>
          <p class="section-desc">东西方的繁华互通</p>
        </div>
        <div class="img-slider" :style="{ '--dur': tradeImages.length * 3 + 's' }">
          <div class="slider-track">
            <div v-for="(img, i) in tradeImages" :key="'a'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
            <div v-for="(img, i) in tradeImages" :key="'b'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
          </div>
        </div>
        <router-link to="/trade" class="section-link">了解更多物产 <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></router-link>
      </div>
    </section>

    <section id="modern" class="content-section">
      <div class="section-inner" :class="{ visible: visibleSections.modern }">
        <div class="section-header">
          <span class="section-tag">MODERN</span>
          <h2>古今新篇</h2>
          <p class="section-desc">从驼铃声声到列车轰鸣</p>
        </div>
        <div class="img-slider" :style="{ '--dur': modernImages.length * 3 + 's' }">
          <div class="slider-track">
            <div v-for="(img, i) in modernImages" :key="'a'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
            <div v-for="(img, i) in modernImages" :key="'b'+i" class="slide-card"><img :src="img" alt="" class="slide-img"/></div>
          </div>
        </div>
        <router-link to="/modern" class="section-link">查看古今对比 <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></router-link>
      </div>
    </section>

    <footer class="home-footer">
      <div class="footer-ornament"><svg class="ornament-svg" width="200" height="20" viewBox="0 0 200 20"><line x1="0" y1="10" x2="80" y2="10" stroke="rgba(200,152,44,0.15)" stroke-width="0.5"/><line x1="120" y1="10" x2="200" y2="10" stroke="rgba(200,152,44,0.15)" stroke-width="0.5"/><polygon points="100,4 106,10 100,16 94,10" fill="none" stroke="rgba(200,152,44,0.25)" stroke-width="0.6"/></svg></div>
      <p>丝路之旅 — 探寻千年文明的交汇</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const titleChars = '重走丝绸之路，探寻千年文明'.split('')
const heroPath = 'M1160 265 C1100 255 1020 282 960 298 C900 314 820 322 740 318 C660 314 590 335 530 340 C470 345 400 358 320 365 C240 372 180 388 120 400 C60 412 40 430 20 445'
const heroNodes = [
  { id: 'h-changan', name: '长安', x: 1160, y: 265, above: false },
  { id: 'h-dunhuang', name: '敦煌', x: 960, y: 298, above: true },
  { id: 'h-kashgar', name: '疏勒', x: 740, y: 318, above: false },
  { id: 'h-samarkand', name: '撒马尔罕', x: 530, y: 340, above: true },
  { id: 'h-merv', name: '木鹿', x: 320, y: 365, above: false },
  { id: 'h-baghdad', name: '巴格达', x: 120, y: 400, above: true },
  { id: 'h-rome', name: '罗马', x: 20, y: 445, above: false },
]

const statsRef = ref<HTMLElement | null>(null)
const statsVisible = ref(false)
const stats = [
  { value: '7,000+', label: '陆上丝路全长 (km)' },
  { value: '2,000+', label: '年历史跨度' },
  { value: '15,000+', label: '海上丝路全长 (km)' },
  { value: '40+', label: '途经国家与地区' },
]

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 60, behavior: 'smooth' })
}

const visibleSections = reactive<Record<string, boolean>>({ routes: false, culture: false, cities: false, trade: false, modern: false })
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => { entries.forEach((e) => { const id = e.target.id; if (id && id in visibleSections && e.isIntersecting) visibleSections[id] = true }) }, { threshold: 0.15 })
  Object.keys(visibleSections).forEach((id) => { const el = document.getElementById(id); if (el) observer!.observe(el) })
  if (statsRef.value) { const o = new IntersectionObserver((entries) => { if (entries[0]?.isIntersecting) { statsVisible.value = true; o.disconnect() } }, { threshold: 0.3 }); o.observe(statsRef.value) }
})
onUnmounted(() => { observer?.disconnect() })

const routeImages = ['/picture/大漠黄沙.jpg', '/picture/戈壁草原.jpg', '/picture/驼铃大漠.jpg']
const cultureImages = ['/picture/印度佛教.jpg', '/picture/敦煌壁画.jpg', '/picture/古法制茶.webp', '/picture/传统乐器.jpg']
const cityImages = ['/picture/西安.jpg', '/picture/敦煌.jpg', '/picture/撒马尔罕.jpg', '/picture/罗马.jpg']
const tradeImages = ['/picture/丝路歌舞.jpg', '/picture/古法制茶.webp', '/picture/波斯.jpg', '/picture/嘉峪关.jpg']
const modernImages = ['/picture/驼铃大漠.jpg', '/picture/楼兰.jpg', '/picture/吐鲁番.jpg', '/picture/雪山绿洲.jpg']
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }
.home-view { min-height: 100vh; overflow: hidden; }
.main-visual { text-align: center; position: relative; overflow: hidden; }
.banner { position: relative; height: 100vh; min-height: 600px; overflow: hidden; }
.bg-clean { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 55%, rgba(200,152,44,0.06) 0%, transparent 50%), linear-gradient(180deg, #0f0b07 0%, #1c110a 30%, #2d1a12 60%, #1c110a 100%); }

.hero-silk-line { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; }
.line-ambient { stroke-dasharray: 1600; stroke-dashoffset: 1600; animation: line-draw 3.5s cubic-bezier(0.25,0.1,0.25,1) 0.3s forwards; }
.line-glow { stroke-dasharray: 1600; stroke-dashoffset: 1600; animation: line-draw 3s cubic-bezier(0.25,0.1,0.25,1) 0.5s forwards, glow-pulse 6s ease-in-out 4s infinite; }
.line-main { stroke-dasharray: 1600; stroke-dashoffset: 1600; animation: line-draw 2.8s cubic-bezier(0.25,0.1,0.25,1) 0.6s forwards; }
.line-flow { animation: flow-travel 4s ease-in-out 3.5s infinite; }
@keyframes line-draw { to { stroke-dashoffset: 0; } }
@keyframes glow-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
@keyframes flow-travel { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1240; } }
.hero-node { opacity: 0; animation: node-enter 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; }
@keyframes node-enter { from { opacity: 0; } to { opacity: 1; } }
.node-halo { animation: halo-breathe 5s ease-in-out infinite; }
@keyframes halo-breathe { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
.node-label { font-size: 11px; font-family: 'SimSun','STSong',serif; fill: rgba(232,200,114,0.75); letter-spacing: 3px; opacity: 0; animation: label-in 0.6s ease-out forwards; }
@keyframes label-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.banner-text { position: absolute; top: 10%; left: 50%; transform: translateX(-50%); text-align: center; width: 90%; max-width: 900px; z-index: 10; }
.banner-text h1 { font-size: 3.8rem; font-family: 'ZCOOL XiaoWei','Ma Shan Zheng','STKaiti','SimSun',serif; letter-spacing: 8px; font-weight: 400; color: #FFF8DC; -webkit-text-stroke: 0.5px rgba(122,74,42,0.4); text-shadow: 0 0 20px rgba(122,74,42,0.6), 0 0 50px rgba(122,74,42,0.3), 0 2px 4px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5); }
.title-char { display: inline-block; opacity: 0; animation: char-reveal 0.6s ease-out forwards; }
@keyframes char-reveal { from { opacity: 0; transform: translateY(20px) rotateX(40deg); filter: blur(4px); } to { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); } }
.subtitle { font-size: 1.5rem; font-family: 'ZCOOL XiaoWei','Ma Shan Zheng','STKaiti','SimSun',serif; color: rgba(232,200,114,0.9); text-shadow: 0 1px 4px rgba(0,0,0,0.7); margin-top: 1rem; letter-spacing: 4px; animation: fadeInUp 1.5s ease-out 1.5s both; }

.quick-nav { position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%); display: flex; gap: 1rem; z-index: 12; flex-wrap: wrap; justify-content: center; }
.quick-nav button { background: rgba(122,74,42,0.2); color: #E8C872; border: 1px solid rgba(200,152,44,0.3); padding: 0.7rem 1.5rem; border-radius: 30px; cursor: pointer; font-weight: bold; transition: all 0.4s ease; backdrop-filter: blur(8px); font-family: 'SimSun',serif; letter-spacing: 2px; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem; position: relative; overflow: hidden; }
.quick-nav button::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(200,152,44,0.15) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.6s ease; }
.quick-nav button:hover::after { transform: translateX(100%); }
.quick-nav button:hover { background: rgba(200,152,44,0.35); border-color: #C8982C; color: white; transform: translateY(-3px); box-shadow: 0 5px 20px rgba(200,152,44,0.3); }
.btn-icon { font-size: 1.1rem; }

.stats-strip { background: linear-gradient(135deg, #2d1a12 0%, #3d210e 50%, #2d1a12 100%); padding: 2.5rem 2rem; position: relative; overflow: hidden; }
.stats-strip::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent, transparent 24.5%, rgba(200,152,44,0.1) 24.5%, rgba(200,152,44,0.1) 25.5%, transparent 25.5%); }
.stats-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; position: relative; z-index: 1; }
.stats-inner.visible .stat-item { animation: stat-slide-up 0.6s ease-out both; }
.stat-item { text-align: center; opacity: 0; }
.stat-number { display: block; font-size: 2rem; font-weight: bold; color: #C8982C; font-family: 'Courier New',monospace; letter-spacing: 2px; }
.stat-label { display: block; font-size: 0.8rem; color: rgba(232,200,114,0.7); margin-top: 0.3rem; letter-spacing: 1px; font-family: 'SimSun',serif; }
@keyframes stat-slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.content-section { padding: 5rem 2rem; position: relative; }
.section-alt { background: rgba(122,74,42,0.04); }
.section-inner { max-width: 1100px; margin: 0 auto; opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.section-inner.visible { opacity: 1; transform: translateY(0); }
.section-header { text-align: center; margin-bottom: 2.5rem; }
.section-tag { display: inline-block; font-size: 0.7rem; letter-spacing: 4px; color: #C8982C; font-family: 'Courier New',monospace; margin-bottom: 0.5rem; opacity: 0.7; }
.section-header h2 { font-size: 2.2rem; font-family: 'ZCOOL XiaoWei','Ma Shan Zheng','STKaiti','SimSun',serif; color: #2d1a12; letter-spacing: 4px; margin-bottom: 0.5rem; }
.section-desc { font-size: 1rem; color: #8B6E1A; letter-spacing: 2px; }
.section-link { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 2.5rem; padding: 0.8rem 2rem; background: transparent; border: 1px solid rgba(122,74,42,0.3); border-radius: 30px; color: #7A4A2A; text-decoration: none; font-size: 0.95rem; letter-spacing: 2px; font-family: 'SimSun',serif; transition: all 0.3s ease; position: relative; overflow: hidden; }
.section-link::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 30%, rgba(122,74,42,0.06) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.5s ease; }
.section-link:hover::before { transform: translateX(100%); }
.section-link:hover { background: rgba(122,74,42,0.08); border-color: #7A4A2A; transform: translateX(4px); }
.section-link svg { transition: transform 0.3s ease; }
.section-link:hover svg { transform: translateX(4px); }

/* ========== 图片轮播 ========== */
.img-slider {
  overflow: hidden;
  margin: 0 -2rem;
  padding: 0.5rem 0;
  position: relative;
}

.slider-track {
  display: flex;
  gap: 1rem;
  animation: slide-scroll var(--dur, 12s) linear infinite;
  width: max-content;
}

.img-slider:hover .slider-track {
  animation-play-state: paused;
}

.slide-card {
  flex: 0 0 300px;
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0,0,0,0.06);
  background: linear-gradient(135deg, rgba(200,152,44,0.08), rgba(122,74,42,0.06));
  transition: box-shadow 0.4s ease;
}

.slide-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.slide-card:hover .slide-img {
  transform: scale(1.08);
}

@keyframes slide-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% + 0.5rem)); }
}

/* ========== 特色横幅 ========== */
.feature-banner { padding: 0 2rem; margin: 2rem 0; }
.feature-banner-inner { max-width: 1200px; margin: 0 auto; position: relative; border-radius: 16px; overflow: hidden; min-height: 280px; }
.feature-image-slot { position: absolute; inset: 0; }
.image-placeholder-banner { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.4rem; background: linear-gradient(135deg, rgba(122,74,42,0.12), rgba(61,92,92,0.1) 50%, rgba(200,152,44,0.08)); }
.ph-icon-large { font-size: 3rem; opacity: 0.5; }
.ph-text-banner { font-size: 0.9rem; color: rgba(122,74,42,0.45); letter-spacing: 2px; font-family: 'SimSun',serif; }
.feature-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(45,26,18,0.4); padding: 2rem; }
.feature-quote { font-size: 1.6rem; font-family: 'ZCOOL XiaoWei','Ma Shan Zheng','STKaiti','SimSun',serif; color: rgba(255,248,220,0.95); letter-spacing: 4px; text-shadow: 0 2px 8px rgba(0,0,0,0.5); text-align: center; max-width: 700px; }
.feature-attr { margin-top: 0.8rem; font-size: 0.9rem; color: rgba(232,200,114,0.7); letter-spacing: 2px; font-family: 'SimSun',serif; }

.home-footer { text-align: center; padding: 3rem 2rem; color: rgba(122,74,42,0.5); font-size: 0.85rem; letter-spacing: 3px; font-family: 'SimSun',serif; border-top: 1px solid rgba(122,74,42,0.1); }
.footer-ornament { margin-bottom: 1rem; opacity: 0.6; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .banner-text h1 { font-size: 2.2rem; letter-spacing: 4px; }
  .subtitle { font-size: 1.1rem; }
  .quick-nav { gap: 0.6rem; bottom: 4%; }
  .quick-nav button { padding: 0.6rem 1.2rem; font-size: 0.85rem; }
  .content-section { padding: 3rem 1rem; }
  .section-header h2 { font-size: 1.6rem; }
  .img-slider { margin: 0 -1rem; }
  .slide-card { flex: 0 0 240px; height: 160px; border-radius: 12px; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .stat-number { font-size: 1.5rem; }
  .feature-banner-inner { min-height: 200px; }
  .feature-quote { font-size: 1.1rem; letter-spacing: 2px; }
}
</style>
