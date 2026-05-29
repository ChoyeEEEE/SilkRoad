<template>
  <div class="home-view">
    <header class="main-visual">
      <div class="banner">
        <div class="bg-clean"></div>

        <svg class="hero-silk-line" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="wideGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
            <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="lineGrad" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#D4AF37" stop-opacity="0" />
              <stop offset="8%" stop-color="#D4AF37" stop-opacity="0.4" />
              <stop offset="25%" stop-color="#E8D48B" />
              <stop offset="50%" stop-color="#D4AF37" />
              <stop offset="75%" stop-color="#E8D48B" />
              <stop offset="92%" stop-color="#D4AF37" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
            </linearGradient>
            <radialGradient id="nodeHalo">
              <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
            </radialGradient>
          </defs>

          <!-- 柔和环境光 -->
          <path class="line-ambient" :d="heroPath"
                stroke="rgba(212,175,55,0.06)" stroke-width="50" fill="none" stroke-linecap="round" filter="url(#wideGlow)" />

          <!-- 底层光带 -->
          <path class="line-glow" :d="heroPath"
                stroke="rgba(212,175,55,0.12)" stroke-width="8" fill="none" stroke-linecap="round" filter="url(#softGlow)" />

          <!-- 主线 -->
          <path class="line-main" :d="heroPath"
                stroke="url(#lineGrad)" stroke-width="1.5" fill="none" stroke-linecap="round" />

          <!-- 流光 -->
          <path class="line-flow" :d="heroPath"
                stroke="rgba(255,248,220,0.9)" stroke-width="2" fill="none" stroke-linecap="round"
                stroke-dasharray="40 1200" stroke-dashoffset="0" filter="url(#softGlow)" />

          <!-- 城市节点 -->
          <g v-for="(node, i) in heroNodes" :key="node.id" class="hero-node"
             :style="{ animationDelay: (i * 0.2 + 1.2) + 's' }">
            <circle :cx="node.x" :cy="node.y" r="16" fill="url(#nodeHalo)" class="node-halo"
                    :style="{ animationDelay: (i * 0.3 + 1.5) + 's' }" />
            <circle :cx="node.x" :cy="node.y" r="3" fill="#E8D48B" filter="url(#nodeGlow)" class="node-core" />
            <circle :cx="node.x" :cy="node.y" r="1.2" fill="#fff" opacity="0.9" />
            <text :x="node.x" :y="node.y + (node.above ? -20 : 26)"
                  class="node-label" text-anchor="middle"
                  :style="{ animationDelay: (i * 0.2 + 1.6) + 's' }">
              {{ node.name }}
            </text>
          </g>
        </svg>

        <div class="banner-text">
          <h1>
            <span v-for="(char, i) in titleChars" :key="i" class="title-char" :style="{ animationDelay: (i * 0.08) + 's' }">{{ char }}</span>
          </h1>
          <p class="subtitle">跨越千年时空，感受文明交流的宏伟篇章</p>

        </div>
      </div>

      <nav class="quick-nav">
        <button @click="scrollToSection('routes')">
          <span class="btn-icon">🗺️</span>
          <span class="btn-label">路线</span>
        </button>
        <button @click="scrollToSection('culture')">
          <span class="btn-icon">🎭</span>
          <span class="btn-label">文化</span>
        </button>
        <button @click="scrollToSection('cities')">
          <span class="btn-icon">🏛️</span>
          <span class="btn-label">古迹</span>
        </button>
        <button @click="scrollToSection('trade')">
          <span class="btn-icon">🐫</span>
          <span class="btn-label">好物</span>
        </button>
        <button @click="scrollToSection('modern')">
          <span class="btn-icon">🔄</span>
          <span class="btn-label">古今对比</span>
        </button>
      </nav>
    </header>

    <!-- 数据统计条 -->
    <div class="stats-strip" ref="statsRef">
      <div class="stats-inner" :class="{ visible: statsVisible }">
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat-item" :style="{ animationDelay: i * 0.15 + 's' }">
          <span class="stat-number">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- 路线概览 -->
    <section id="routes" class="content-section">
      <div class="section-ornament">
        <svg class="ornament-svg" width="320" height="24" viewBox="0 0 320 24">
          <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="200" y1="12" x2="320" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="30" y1="12" x2="110" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <line x1="210" y1="12" x2="290" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <polygon points="160,4 168,12 160,20 152,12" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="0.8" />
          <polygon points="160,7 165,12 160,17 155,12" fill="rgba(212,175,55,0.2)" />
          <circle cx="120" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="200" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="30" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
          <circle cx="290" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
        </svg>
      </div>
      <div class="section-inner" :class="{ visible: visibleSections.routes }">
        <div class="section-header">
          <span class="section-tag">ROUTES</span>
          <h2>丝路路线图</h2>
          <p class="section-desc">从长安到罗马，跨越万里的文明通道</p>
        </div>
        <div class="route-cards">
          <div v-for="(route, idx) in routeHighlights" :key="route.name" class="route-card" :style="{ animationDelay: idx * 0.15 + 's' }" @mouseenter="hoveredRoute = route.name" @mouseleave="hoveredRoute = ''">
            <div class="route-card-inner" :class="{ hovered: hoveredRoute === route.name }">
              <div class="card-image-slot">
                <img :src="route.image" :alt="route.name" class="route-img" />
                <div class="card-img-overlay">
                  <span class="card-img-icon">{{ route.icon }}</span>
                </div>
                <div class="card-img-shine"></div>
              </div>
              <h3>{{ route.name }}</h3>
              <p>{{ route.desc }}</p>
              <div class="route-distance">{{ route.distance }}</div>
            </div>
          </div>
        </div>
        <router-link to="/routes" class="section-link">
          查看完整路线
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- 文化概览 -->
    <section id="culture" class="content-section section-alt">
      <div class="section-ornament">
        <svg class="ornament-svg" width="320" height="24" viewBox="0 0 320 24">
          <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="200" y1="12" x2="320" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="30" y1="12" x2="110" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <line x1="210" y1="12" x2="290" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <polygon points="160,4 168,12 160,20 152,12" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="0.8" />
          <polygon points="160,7 165,12 160,17 155,12" fill="rgba(212,175,55,0.2)" />
          <circle cx="120" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="200" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="30" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
          <circle cx="290" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
        </svg>
      </div>
      <div class="section-inner" :class="{ visible: visibleSections.culture }">
        <div class="section-header">
          <span class="section-tag">CULTURE</span>
          <h2>文化瑰宝</h2>
          <p class="section-desc">宗教、艺术与思想的东西交融</p>
        </div>
        <div class="culture-grid">
          <div v-for="(item, idx) in cultureHighlights" :key="item.title" class="culture-card" :style="{ animationDelay: idx * 0.12 + 's' }">
            <div class="culture-card-inner">
              <div class="card-image-slot card-image-slot-sm">
                <img :src="item.image" :alt="item.title" class="culture-img" />
                <div class="culture-img-overlay">
                  <span class="culture-img-icon">{{ item.icon }}</span>
                </div>
                <div class="culture-img-shine"></div>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
        <router-link to="/culture" class="section-link">
          探索文化瑰宝
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- 全宽特色图片横幅 -->
    <div class="feature-banner">
      <div class="feature-banner-inner">
        <div class="feature-image-slot">
          <img src="/picture/无数铃声遥过碛,应驮白练到安西.jpg" alt="无数铃声遥过碛，应驮白练到安西" class="feature-img" />
          <div class="feature-img-shine"></div>
        </div>
        <div class="feature-overlay">
          <p class="feature-quote">"无数铃声遥过碛，应驮白练到安西"</p>
          <span class="feature-attr">— 张籍《凉州词》</span>
        </div>
      </div>
    </div>

    <!-- 名城古迹 -->
    <section id="cities" class="content-section">
      <div class="section-ornament">
        <svg class="ornament-svg" width="320" height="24" viewBox="0 0 320 24">
          <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="200" y1="12" x2="320" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="30" y1="12" x2="110" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <line x1="210" y1="12" x2="290" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <polygon points="160,4 168,12 160,20 152,12" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="0.8" />
          <polygon points="160,7 165,12 160,17 155,12" fill="rgba(212,175,55,0.2)" />
          <circle cx="120" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="200" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="30" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
          <circle cx="290" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
        </svg>
      </div>
      <div class="section-inner" :class="{ visible: visibleSections.cities }">
        <div class="section-header">
          <span class="section-tag">CITIES</span>
          <h2>沿线名城</h2>
          <p class="section-desc">丝路上的璀璨明珠</p>
        </div>
        <div class="city-showcase">
          <div v-for="city in cityHighlights" :key="city.name" class="city-tile">
            <div class="city-tile-bg" :style="{ background: city.gradient }"></div>
            <div class="city-image-slot">
              <img :src="city.image" :alt="city.name" class="city-img" />
            </div>
            <div class="city-tile-content">
              <h3>{{ city.name }}</h3>
              <p>{{ city.tagline }}</p>
            </div>
          </div>
        </div>
        <router-link to="/cities" class="section-link">
          游览名城古迹
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- 商贸物产 -->
    <section id="trade" class="content-section section-alt">
      <div class="section-ornament">
        <svg class="ornament-svg" width="320" height="24" viewBox="0 0 320 24">
          <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="200" y1="12" x2="320" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="30" y1="12" x2="110" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <line x1="210" y1="12" x2="290" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <polygon points="160,4 168,12 160,20 152,12" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="0.8" />
          <polygon points="160,7 165,12 160,17 155,12" fill="rgba(212,175,55,0.2)" />
          <circle cx="120" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="200" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="30" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
          <circle cx="290" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
        </svg>
      </div>
      <div class="section-inner" :class="{ visible: visibleSections.trade }">
        <div class="section-header">
          <span class="section-tag">TRADE</span>
          <h2>商贸物产</h2>
          <p class="section-desc">东西方的繁华互通</p>
        </div>
        <div class="trade-layout">
          <div class="trade-image-slot">
            <img src="/picture/丝路贸易.jpeg" alt="丝路贸易" class="trade-banner-img" />
            <div class="trade-banner-overlay">
              <span class="trade-banner-text">东西方的繁华互通</span>
            </div>
          </div>
          <div class="trade-columns">
            <div class="trade-column-wide">
              <h3 class="trade-col-title">🇨🇳 中国输出</h3>
              <div class="carousel-wrapper">
                <div class="carousel-track carousel-up">
                  <div v-for="(item, i) in tradeExport" :key="'e1-' + i" class="trade-card">
                    <div class="trade-card-img">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                    <span class="trade-card-name">{{ item.name }}</span>
                  </div>
                  <div v-for="(item, i) in tradeExport" :key="'e2-' + i" class="trade-card">
                    <div class="trade-card-img">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                    <span class="trade-card-name">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="trade-arrows-wide">
              <svg width="60" height="40" viewBox="0 0 60 40"><path d="M0 20 H50 M45 10 L55 20 L45 30" stroke="#D4AF37" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <svg width="60" height="40" viewBox="0 0 60 40" class="arrow-reverse"><path d="M0 20 H50 M45 10 L55 20 L45 30" stroke="#8B0000" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="trade-column-wide">
              <h3 class="trade-col-title">🌍 域外传入</h3>
              <div class="carousel-wrapper">
                <div class="carousel-track carousel-down">
                  <div v-for="(item, i) in tradeImport" :key="'i1-' + i" class="trade-card">
                    <div class="trade-card-img">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                    <span class="trade-card-name">{{ item.name }}</span>
                  </div>
                  <div v-for="(item, i) in tradeImport" :key="'i2-' + i" class="trade-card">
                    <div class="trade-card-img">
                      <img :src="item.image" :alt="item.name" />
                    </div>
                    <span class="trade-card-name">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-link to="/trade" class="section-link">
          了解更多物产
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <!-- 古今对比 -->
    <section id="modern" class="content-section">
      <div class="section-ornament">
        <svg class="ornament-svg" width="320" height="24" viewBox="0 0 320 24">
          <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="200" y1="12" x2="320" y2="12" stroke="rgba(212,175,55,0.18)" stroke-width="0.5" />
          <line x1="30" y1="12" x2="110" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <line x1="210" y1="12" x2="290" y2="12" stroke="rgba(212,175,55,0.12)" stroke-width="0.5" stroke-dasharray="2 4" />
          <polygon points="160,4 168,12 160,20 152,12" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="0.8" />
          <polygon points="160,7 165,12 160,17 155,12" fill="rgba(212,175,55,0.2)" />
          <circle cx="120" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="200" cy="12" r="1.5" fill="rgba(212,175,55,0.3)" />
          <circle cx="30" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
          <circle cx="290" cy="12" r="1" fill="rgba(212,175,55,0.15)" />
        </svg>
      </div>
      <div class="section-inner" :class="{ visible: visibleSections.modern }">
        <div class="section-header">
          <span class="section-tag">MODERN</span>
          <h2>古今新篇</h2>
          <p class="section-desc">从驼铃声声到列车轰鸣</p>
        </div>
        <div class="compare-carousel">
          <button class="compare-nav-btn compare-prev" @click="prevCompare" :disabled="currentCompareIndex === 0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="compare-card-wrapper">
            <transition name="compare-slide" mode="out-in">
              <div :key="currentCompareIndex" class="compare-card">
                <div class="compare-ancient">
                  <div class="card-image-slot card-image-slot-compare">
                    <img :src="modernHighlights[currentCompareIndex].ancient.image" :alt="modernHighlights[currentCompareIndex].topic + '古代'" class="compare-img" />
                  </div>
                  <span class="compare-label">古代</span>
                  <p>{{ modernHighlights[currentCompareIndex].ancient.text }}</p>
                </div>
                <div class="compare-divider">
                  <span class="compare-topic">{{ modernHighlights[currentCompareIndex].topic }}</span>
                  <span class="compare-vs">VS</span>
                </div>
                <div class="compare-modern">
                  <div class="card-image-slot card-image-slot-compare">
                    <img :src="modernHighlights[currentCompareIndex].modern.image" :alt="modernHighlights[currentCompareIndex].topic + '现代'" class="compare-img" />
                  </div>
                  <span class="compare-label">现代</span>
                  <p>{{ modernHighlights[currentCompareIndex].modern.text }}</p>
                </div>
              </div>
            </transition>
            <div class="compare-dots">
              <span v-for="(_, i) in modernHighlights" :key="i" class="compare-dot" :class="{ active: i === currentCompareIndex }" @click="currentCompareIndex = i"></span>
            </div>
          </div>
          <button class="compare-nav-btn compare-next" @click="nextCompare" :disabled="currentCompareIndex === modernHighlights.length - 1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <router-link to="/modern" class="section-link">
          查看古今对比
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </router-link>
      </div>
    </section>

    <footer class="home-footer">
      <div class="footer-ornament">
        <svg class="ornament-svg" width="200" height="20" viewBox="0 0 200 20">
          <line x1="0" y1="10" x2="80" y2="10" stroke="rgba(212,175,55,0.15)" stroke-width="0.5" />
          <line x1="120" y1="10" x2="200" y2="10" stroke="rgba(212,175,55,0.15)" stroke-width="0.5" />
          <polygon points="100,4 106,10 100,16 94,10" fill="none" stroke="rgba(212,175,55,0.25)" stroke-width="0.6" />
          <polygon points="100,6.5 103.5,10 100,13.5 96.5,10" fill="rgba(212,175,55,0.15)" />
          <circle cx="80" cy="10" r="1" fill="rgba(212,175,55,0.2)" />
          <circle cx="120" cy="10" r="1" fill="rgba(212,175,55,0.2)" />
        </svg>
      </div>
      <p>丝路之旅 — 探寻千年文明的交汇</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const hoveredRoute = ref('')
const currentCompareIndex = ref(0)
const titleChars = '重走丝绸之路，探寻千年文明'.split('')

const statsRef = ref<HTMLElement | null>(null)
const statsVisible = ref(false)

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 60
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const prevCompare = () => {
  if (currentCompareIndex.value > 0) currentCompareIndex.value--
}
const nextCompare = () => {
  if (currentCompareIndex.value < modernHighlights.length - 1) currentCompareIndex.value++
}

const visibleSections = reactive<Record<string, boolean>>({
  routes: false,
  culture: false,
  cities: false,
  trade: false,
  modern: false,
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (id && id in visibleSections) {
          if (entry.isIntersecting) {
            visibleSections[id] = true
          }
        }
      })
    },
    { threshold: 0.15 }
  )

  Object.keys(visibleSections).forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer!.observe(el)
  })

  document.querySelectorAll('.section-ornament').forEach((el) => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
  })

  if (statsRef.value) {
    const statsObs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          statsVisible.value = true
          statsObs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    statsObs.observe(statsRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

const stats = [
  { value: '7,000+', label: '陆上丝路全长 (km)' },
  { value: '2,000+', label: '年历史跨度' },
  { value: '15,000+', label: '海上丝路全长 (km)' },
  { value: '40+', label: '途经国家与地区' },
]


const heroPath = 'M1160 265 C1100 255 1020 282 960 298 C900 314 820 322 740 318 C660 314 590 335 530 340 C470 345 400 358 320 365 C240 372 180 388 120 400 C60 412 40 430 20 445'

const heroNodes = [
  { id: 'h-changan',   name: '长安',     x: 1160, y: 265, above: false },
  { id: 'h-dunhuang',  name: '敦煌',     x: 960,  y: 298, above: true },
  { id: 'h-kashgar',   name: '疏勒',     x: 740,  y: 318, above: false },
  { id: 'h-samarkand', name: '撒马尔罕', x: 530,  y: 340, above: true },
  { id: 'h-merv',      name: '木鹿',     x: 320,  y: 365, above: false },
  { id: 'h-baghdad',   name: '巴格达',   x: 120,  y: 400, above: true },
  { id: 'h-rome',      name: '罗马',     x: 20,   y: 445, above: false },
]

const routeHighlights = [
  { name: '沙漠绿洲之路', icon: '🏜️', desc: '穿越塔克拉玛干沙漠，连接楼兰、龟兹等绿洲古城', distance: '约 7,000 km', image: '/picture/沙漠绿洲.jpg' },
  { name: '草原丝绸之路', icon: '🐎', desc: '经蒙古高原西行，游牧民族的商贸通道', distance: '约 10,000 km', image: '/picture/草原丝绸之路.jpg' },
  { name: '海上丝绸之路', icon: '⛵', desc: '从东南沿海出发，经南海抵达波斯湾与非洲东海岸', distance: '约 15,000 km', image: '/picture/海上丝绸之路.jpg' },
]

const cultureHighlights = [
  { icon: '📿', title: '宗教传播', desc: '佛教、伊斯兰教、景教沿丝路东传，与本土文化交融共生', image: '/picture/宗教传播.jpg' },
  { icon: '🎨', title: '艺术交流', desc: '敦煌壁画融合中西技法，犍陀罗艺术影响深远', image: '/picture/艺术交流.jpg' },
  { icon: '📜', title: '科技西传', desc: '造纸术、印刷术、火药经丝路传入西方，改变世界进程', image: '/picture/科技西传.jpg' },
  { icon: '🎵', title: '音乐融合', desc: '龟兹乐、天竺乐与中原雅乐交汇，催生盛唐乐舞', image: '/picture/音乐融合.jpg' },
]

const cityHighlights = [
  { name: '长安', icon: '🏯', tagline: '丝路起点，万国来朝', gradient: 'linear-gradient(135deg, #8B0000 0%, #D4AF37 100%)', image: '/picture/长安.jpg' },
  { name: '敦煌', icon: '🏜️', tagline: '莫高窟壁画千年不朽', gradient: 'linear-gradient(135deg, #C2703E 0%, #F5DEB3 100%)', image: '/picture/敦煌2.jpg' },
  { name: '撒马尔罕', icon: '🕌', tagline: '中亚明珠，帖木儿之都', gradient: 'linear-gradient(135deg, #2F4F4F 0%, #5F9EA0 100%)', image: '/picture/撒马尔罕.jpg' },
  { name: '罗马', icon: '🏛️', tagline: '条条大路通罗马', gradient: 'linear-gradient(135deg, #4A0E4E 0%, #C0A0D0 100%)', image: '/picture/罗马.jpg' },
]

const tradeExport = [
  { icon: '🍵', name: '丝绸', image: '/picture/丝绸.jpg' },
  { icon: '🫖', name: '茶叶', image: '/picture/茶叶.jpg' },
  { icon: '🏺', name: '瓷器', image: '/picture/瓷器.v2' },
  { icon: '💎', name: '玉石', image: '/picture/玉石.jpg' },
]

const tradeImport = [
  { icon: '🍇', name: '葡萄', image: '/picture/葡萄.webp' },
  { icon: '🥜', name: '胡桃', image: '/picture/胡桃.jpg' },
  { icon: '🐴', name: '汗血宝马', image: '/picture/汗血宝马.jpg' },
  { icon: '💎', name: '琉璃', image: '/picture/琉璃.jpg' },
]

const modernHighlights = [
  {
    topic: '交通',
    ancient: { icon: '🐫', text: '骆驼商队，日行30公里', image: '/picture/modern-ancient-transport.jpg' },
    modern: { icon: '🚄', text: '中欧班列，日行1000公里', image: '/picture/modern-modern-transport.jpg' },
  },
  {
    topic: '通信',
    ancient: { icon: '🕊️', text: '飞鸽传书，数月到达', image: '/picture/飞鸽传书.jpg' },
    modern: { icon: '📡', text: '光纤网络，瞬间传输', image: '/picture/光纤网络.png' },
  },
  {
    topic: '贸易',
    ancient: { icon: '⚖️', text: '以物易物，集市交易', image: '/picture/市集交易.jpg' },
    modern: { icon: '💻', text: '跨境电商，全球联通', image: '/picture/跨境电商.jpg' },
  },
]
</script>

<style scoped>
:root {
  --gold: #D4AF37;
  --cream: #FFF8E7;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.home-view { min-height: 100vh; overflow: hidden; }

.main-visual {
  text-align: center; padding: 0; position: relative; overflow: hidden;
}

.banner {
  position: relative; height: 100vh; min-height: 600px; overflow: hidden;
}

/* 背景 — 干净深色 */
.bg-clean {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 55%, rgba(212,175,55,0.06) 0%, transparent 50%),
    linear-gradient(180deg, #0d0a06 0%, #1a1008 30%, #2d1810 60%, #1a1008 100%);
}

/* ========== 主角：丝路主线 ========== */
.hero-silk-line {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  z-index: 2; pointer-events: none;
}

.heroPath {
  --path-len: 1600;
}

/* 线条绘制 */
.line-ambient {
  stroke-dasharray: 1600;
  stroke-dashoffset: 1600;
  animation: line-draw 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s forwards;
}
.line-glow {
  stroke-dasharray: 1600;
  stroke-dashoffset: 1600;
  animation: line-draw 3s cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s forwards,
             glow-pulse 6s ease-in-out 4s infinite;
}
.line-main {
  stroke-dasharray: 1600;
  stroke-dashoffset: 1600;
  animation: line-draw 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s forwards;
}
.line-flow {
  animation: flow-travel 4s ease-in-out 3.5s infinite;
}
@keyframes line-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
@keyframes flow-travel {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1240; }
}

/* 城市节点 */
.hero-node {
  opacity: 0;
  animation: node-enter 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes node-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

.node-halo {
  animation: halo-breathe 5s ease-in-out infinite;
}
@keyframes halo-breathe {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.node-core {
  transition: r 0.3s ease, fill 0.3s ease;
}

.node-label {
  font-size: 11px;
  font-family: 'SimSun', 'STSong', serif;
  fill: rgba(232, 212, 139, 0.75);
  letter-spacing: 3px;
  font-weight: normal;
  opacity: 0;
  animation: label-in 0.6s ease-out forwards;
}
@keyframes label-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 文字 */
.banner-text {
  position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
  text-align: center; width: 90%; max-width: 900px; z-index: 10;
}
.banner-text h1 {
  font-size: 3.8rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  letter-spacing: 8px; font-weight: 400;
  white-space: nowrap;
  color: #FFF8DC;
  -webkit-text-stroke: 0.5px rgba(139,69,19,0.4);
  text-shadow:
    0 0 20px rgba(139,69,19,0.6),
    0 0 50px rgba(139,69,19,0.3),
    0 2px 4px rgba(0,0,0,0.8),
    0 4px 20px rgba(0,0,0,0.5);
}
.title-char {
  display: inline-block;
  opacity: 0;
  animation: char-reveal 0.6s ease-out forwards;
}
@keyframes char-reveal {
  from {
    opacity: 0;
    transform: translateY(20px) rotateX(40deg);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
}
.subtitle {
  font-size: 1.5rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: rgba(245,222,179,0.9);
  text-shadow: 0 1px 4px rgba(0,0,0,0.7);
  margin-top: 1rem; letter-spacing: 4px;
  animation: fadeInUp 1.5s ease-out 1.5s both;
}


/* 快速导航 */
.quick-nav {
  position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%);
  display: flex; gap: 1rem; z-index: 12; flex-wrap: wrap; justify-content: center;
}
.quick-nav button {
  background: rgba(139,69,19,0.2); color: #F5DEB3;
  border: 1px solid rgba(212,175,55,0.3);
  padding: 0.7rem 1.5rem; border-radius: 30px; cursor: pointer;
  font-weight: bold; transition: all 0.4s ease;
  backdrop-filter: blur(8px); font-family: 'SimSun', serif;
  letter-spacing: 2px; font-size: 0.95rem;
  display: flex; align-items: center; gap: 0.4rem;
  position: relative; overflow: hidden;
}
.quick-nav button::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.15) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}
.quick-nav button:hover::after {
  transform: translateX(100%);
}
.quick-nav button:hover {
  background: rgba(212,175,55,0.35); border-color: var(--gold);
  color: white; transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(212,175,55,0.3);
}
.quick-nav button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(212,175,55,0.2);
}
.btn-icon { font-size: 1.1rem; }

/* ========== 数据统计条 ========== */
.stats-strip {
  background: linear-gradient(135deg, #2d1810 0%, #3d1f0a 50%, #2d1810 100%);
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
}
.stats-strip::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 24.5%,
    rgba(212,175,55,0.1) 24.5%,
    rgba(212,175,55,0.1) 25.5%,
    transparent 25.5%
  );
}
.stats-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;
}
.stats-inner.visible .stat-item {
  animation: stat-slide-up 0.6s ease-out both;
}
.stat-item {
  text-align: center;
  opacity: 0;
}
.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: var(--gold);
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}
.stat-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(245,222,179,0.7);
  margin-top: 0.3rem;
  letter-spacing: 1px;
  font-family: 'SimSun', serif;
}

@keyframes stat-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ========== 内容区域 ========== */
.content-section {
  padding: 5rem 2rem;
  position: relative;
}
.section-alt {
  background: rgba(139,69,19,0.04);
}

.section-ornament {
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: scaleX(0.4);
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.section-ornament .ornament-svg {
  display: inline-block;
  max-width: 100%;
}
.section-ornament.visible {
  opacity: 1;
  transform: scaleX(1);
}
.section-inner.visible ~ .section-ornament,
.section-ornament.visible {
  opacity: 1;
  transform: scaleX(1);
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.section-inner.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}
.section-tag {
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 4px;
  color: var(--gold);
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
  opacity: 0.7;
}
.section-header h2 {
  font-size: 2.2rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: #2d1810;
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
}
.section-desc {
  font-size: 1rem;
  color: #8B6914;
  letter-spacing: 2px;
}

.section-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding: 0.8rem 2rem;
  background: transparent;
  border: 1px solid rgba(139,69,19,0.3);
  border-radius: 30px;
  color: #8B4513;
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 2px;
  font-family: 'SimSun', serif;
  transition: all 0.3s ease;
  position: relative; overflow: hidden;
}
.section-link::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(139,69,19,0.06) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
.section-link:hover::before {
  transform: translateX(100%);
}
.section-link:hover {
  background: rgba(139,69,19,0.08);
  border-color: #8B4513;
  transform: translateX(4px);
}
.section-link svg {
  transition: transform 0.3s ease;
}
.section-link:hover svg {
  transform: translateX(4px);
}

/* ========== 图片占位符通用样式 ========== */
.card-image-slot {
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}
.card-image-slot-sm {
  height: 140px;
  border-radius: 10px;
}
.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139,69,19,0.08) 0%, rgba(212,175,55,0.06) 100%);
  border: 2px dashed rgba(139,69,19,0.2);
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  cursor: pointer;
}
.image-placeholder:hover {
  border-color: rgba(212,175,55,0.5);
  background: linear-gradient(135deg, rgba(139,69,19,0.12) 0%, rgba(212,175,55,0.1) 100%);
}
.ph-icon {
  font-size: 2rem;
  opacity: 0.6;
}
.ph-hint {
  font-size: 0.7rem;
  color: rgba(139,69,19,0.4);
  letter-spacing: 1px;
  font-family: 'SimSun', serif;
}

.image-placeholder-banner {
  height: 100%;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(139,69,19,0.12) 0%, rgba(47,79,79,0.1) 50%, rgba(212,175,55,0.08) 100%);
}
.image-placeholder-banner:hover {
  border: none;
}
.ph-icon-large {
  font-size: 3rem;
  opacity: 0.5;
}
.ph-text-banner {
  font-size: 0.9rem;
  color: rgba(139,69,19,0.45);
  letter-spacing: 2px;
  font-family: 'SimSun', serif;
}

.image-placeholder-city {
  border: 2px dashed rgba(255,255,255,0.3);
  background: rgba(0,0,0,0.15);
  position: absolute; inset: 0;
  border-radius: 0;
  z-index: 0;
}
.image-placeholder-city .ph-hint {
  color: rgba(255,255,255,0.5);
}
.image-placeholder-city:hover {
  border-color: rgba(255,255,255,0.5);
  background: rgba(0,0,0,0.2);
}

/* ========== 全宽特色横幅 ========== */
.feature-banner {
  padding: 0 2rem;
  margin: 2rem 0;
}
.feature-banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 280px;
}
.feature-image-slot {
  position: absolute; inset: 0;
  overflow: hidden;
}
.feature-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 8s ease;
}
.feature-banner:hover .feature-img {
  transform: scale(1.05);
}
.feature-img-shine {
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
  transform: translateX(-100%);
}
.feature-banner:hover .feature-img-shine {
  animation: img-shine 1.2s ease forwards;
}
.feature-overlay {
  position: absolute; inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(45,24,16,0.4);
  padding: 2rem;
}
.feature-quote {
  font-size: 1.6rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: rgba(255,248,220,0.95);
  letter-spacing: 4px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  text-align: center;
  max-width: 700px;
}
.feature-attr {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: rgba(245,222,179,0.7);
  letter-spacing: 2px;
  font-family: 'SimSun', serif;
}

/* ========== 路线卡片 ========== */
.route-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.route-card-inner {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(139,69,19,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.route-card-inner::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), #8B0000, var(--gold));
  transform: scaleX(0);
  transition: transform 0.4s ease;
}
.route-card-inner.hovered::before,
.route-card-inner:hover::before {
  transform: scaleX(1);
}
.route-card-inner:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(139,69,19,0.12);
  border-color: rgba(212,175,55,0.3);
}
.route-card-inner h3 {
  font-size: 1.2rem;
  color: #2d1810;
  margin-bottom: 0.5rem;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
}
.route-card-inner p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}
.route-distance {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--gold);
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

/* 路线卡片图片 */
.route-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease;
}
.route-card-inner:hover .route-img {
  transform: scale(1.08);
  filter: brightness(1.05) saturate(1.1);
}
.card-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(45,24,16,0.5) 100%);
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 1rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.route-card-inner:hover .card-img-overlay {
  opacity: 1;
}
.card-img-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
  transform: translateY(10px);
  transition: transform 0.4s ease;
}
.route-card-inner:hover .card-img-icon {
  transform: translateY(0);
}
.card-img-shine {
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: none;
}
.route-card-inner:hover .card-img-shine {
  animation: img-shine 0.8s ease forwards;
}
@keyframes img-shine {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* ========== 文化卡片 ========== */
.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
.culture-card-inner {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(139,69,19,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}
.culture-card-inner:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 40px rgba(139,69,19,0.12);
  border-color: rgba(212,175,55,0.3);
}
.culture-card-inner h3 {
  font-size: 1.1rem;
  color: #2d1810;
  margin-bottom: 0.5rem;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
}
.culture-card-inner p {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
}

/* 文化卡片图片 */
.culture-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease;
}
.culture-card-inner:hover .culture-img {
  transform: scale(1.1);
  filter: brightness(1.08) saturate(1.15);
}
.culture-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(45,24,16,0.05) 0%, rgba(45,24,16,0.45) 100%);
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 0.8rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.culture-card-inner:hover .culture-img-overlay {
  opacity: 1;
}
.culture-img-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
  transform: translateY(8px) scale(0.9);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.culture-card-inner:hover .culture-img-icon {
  transform: translateY(0) scale(1);
}
.culture-img-shine {
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
  transform: translateX(-100%);
}
.culture-card-inner:hover .culture-img-shine {
  animation: img-shine 0.7s ease forwards;
}

/* ========== 城市展示 ========== */
.city-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.city-tile {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  cursor: default;
}
.city-tile-bg {
  position: absolute; inset: 0;
  transition: transform 0.6s ease;
}
.city-image-slot {
  position: absolute; inset: 0;
  z-index: 1;
}
.city-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease;
}
.city-tile:hover .city-img {
  transform: scale(1.08);
  filter: brightness(1.08) saturate(1.15);
}
.city-tile:hover .city-tile-bg {
  transform: scale(1.08);
}
.city-tile-content {
  position: absolute; inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.25);
  transition: background 0.4s ease;
  padding: 1rem;
  z-index: 2;
}
.city-tile:hover .city-tile-content {
  background: rgba(0,0,0,0.15);
}
.city-tile-content h3 {
  color: white;
  font-size: 1.3rem;
  font-family: 'SimSun', serif;
  letter-spacing: 3px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
.city-tile-content p {
  color: rgba(255,255,255,0.85);
  font-size: 0.85rem;
  margin-top: 0.3rem;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}

/* ========== 贸易布局 ========== */
.trade-layout {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
}
.trade-image-slot {
  width: 100%;
  max-width: 900px;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}
.trade-banner-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 8s ease;
}
.trade-image-slot:hover .trade-banner-img {
  transform: scale(1.05);
}
.trade-banner-overlay {
  position: absolute; inset: 0;
  background: rgba(45,24,16,0.35);
  display: flex; align-items: center; justify-content: center;
}
.trade-banner-text {
  font-size: 1.5rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: rgba(255,248,220,0.95);
  letter-spacing: 6px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.6);
}
.trade-columns {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 900px;
}
.trade-column-wide {
  flex: 1;
  min-width: 0;
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(139,69,19,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  overflow: hidden;
}
.trade-col-title {
  font-size: 1.2rem;
  color: #2d1810;
  margin-bottom: 1.2rem;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
  text-align: center;
}
.carousel-wrapper {
  height: 360px;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%);
}
.carousel-track {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.carousel-up {
  animation: scroll-up 12s linear infinite;
}
.carousel-down {
  animation: scroll-down 12s linear infinite;
}
@keyframes scroll-up {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes scroll-down {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
.trade-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem;
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(139,69,19,0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.trade-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212,175,55,0.3);
  box-shadow: 0 8px 24px rgba(139,69,19,0.1);
}
.trade-card-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.trade-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.trade-card:hover .trade-card-img img {
  transform: scale(1.1);
}
.trade-card-name {
  font-size: 0.95rem;
  color: #333;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
  font-weight: 500;
}
.trade-arrows-wide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 3.5rem;
  flex-shrink: 0;
}
.arrow-reverse {
  transform: rotate(180deg);
}

/* ========== 古今对比 ========== */
.compare-carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.compare-nav-btn {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(139,69,19,0.2);
  background: rgba(255,255,255,0.8);
  color: #8B4513;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.compare-nav-btn:hover:not(:disabled) {
  background: rgba(139,69,19,0.1);
  border-color: #8B4513;
  transform: scale(1.1);
}
.compare-nav-btn:disabled {
  opacity: 0.3;
  cursor: default;
}
.compare-card-wrapper {
  flex: 1;
  min-width: 0;
}
.compare-card {
  display: flex;
  align-items: stretch;
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(139,69,19,0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
}
.compare-card:hover {
  box-shadow: 0 12px 40px rgba(139,69,19,0.12);
  border-color: rgba(212,175,55,0.3);
}
.compare-slide-enter-active,
.compare-slide-leave-active {
  transition: all 0.35s ease;
}
.compare-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.compare-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
.compare-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.compare-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(139,69,19,0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}
.compare-dot.active {
  background: #D4AF37;
  transform: scale(1.3);
}
.compare-ancient,
.compare-modern {
  flex: 1;
  padding: 1.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}
.compare-ancient {
  background: rgba(139,69,19,0.03);
}
.compare-modern {
  background: rgba(47,79,79,0.03);
}
.card-image-slot-compare {
  width: 100%;
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}
.compare-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease;
}
.compare-card:hover .compare-img {
  transform: scale(1.06);
  filter: brightness(1.05) saturate(1.1);
}
.compare-label {
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: #999;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
}
.compare-ancient p,
.compare-modern p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-top: 0.3rem;
}
.compare-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  background: rgba(212,175,55,0.08);
  min-width: 70px;
}
.compare-topic {
  font-size: 0.85rem;
  color: #8B4513;
  font-family: 'SimSun', serif;
  letter-spacing: 2px;
  writing-mode: vertical-rl;
  margin-bottom: 0.5rem;
}
.compare-vs {
  font-size: 1rem;
  font-weight: bold;
  color: var(--gold);
  font-family: 'Courier New', monospace;
  animation: vs-pulse 2s ease-in-out infinite;
}
@keyframes vs-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

/* ========== 底部 ========== */
.home-footer {
  text-align: center;
  padding: 3rem 2rem;
  color: rgba(139,69,19,0.5);
  font-size: 0.85rem;
  letter-spacing: 3px;
  font-family: 'SimSun', serif;
  border-top: 1px solid rgba(139,69,19,0.1);
}
.footer-ornament {
  margin-bottom: 1rem;
  opacity: 0.6;
}

/* ========== 关键帧 ========== */
@keyframes cloud-float {
  from { transform: translateX(-120%); }
  to { transform: translateX(120vw); }
}
@keyframes dust-float {
  0% { transform: translate(-20px, 0) scale(0); opacity: 0; }
  10% { opacity: 0.8; transform: translate(0, 0) scale(1); }
  90% { opacity: 0.3; }
  100% { transform: translate(80vw, -40px) scale(0.3); opacity: 0; }
}
@keyframes bird-fly {
  from { transform: translateX(-50px); }
  to { transform: translateX(100vw); }
}
@keyframes bird-flap {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.6); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .banner-text h1 { font-size: 2.2rem; letter-spacing: 4px; white-space: nowrap; }
  .subtitle { font-size: 1.1rem; }
  .quick-nav { gap: 0.6rem; bottom: 4%; }
  .quick-nav button { padding: 0.6rem 1.2rem; font-size: 0.85rem; }
  .content-section { padding: 3rem 1rem; }
  .section-header h2 { font-size: 1.6rem; }
  .section-ornament { margin-bottom: 1rem; }
  .route-cards { grid-template-columns: 1fr; }
  .culture-grid { grid-template-columns: repeat(2, 1fr); }
  .city-showcase { grid-template-columns: repeat(2, 1fr); }
  .trade-columns { flex-direction: column; align-items: center; }
  .trade-arrows-wide { flex-direction: row; padding-top: 0; }
  .carousel-wrapper { height: 280px; }
  .trade-image-slot { height: 200px; }
  .arrow-reverse { transform: rotate(0deg); }
  .compare-carousel { flex-direction: column; }
  .compare-nav-btn { width: 36px; height: 36px; }
  .compare-card { flex-direction: column; }
  .compare-divider { flex-direction: row; min-width: auto; padding: 0.6rem 1rem; }
  .compare-topic { writing-mode: horizontal-tb; margin-bottom: 0; margin-right: 0.5rem; }
  .card-image-slot-compare { height: 200px; }

  .stats-inner { grid-template-columns: repeat(2, 1fr); }
  .stat-number { font-size: 1.5rem; }
  .feature-banner-inner { min-height: 200px; }
  .feature-quote { font-size: 1.1rem; letter-spacing: 2px; }
  .node-label { font-size: 10px; }
}
</style>
