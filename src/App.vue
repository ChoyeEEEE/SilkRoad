<template>
  <div class="silk-road-app">
    <!-- 滚动进度条 -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <!-- 加载动画 -->
    <transition name="loading-fade">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <span class="loading-text">丝路之旅</span>
        </div>
      </div>
    </transition>

    <!-- 固定顶部导航栏 -->
    <nav class="top-nav" :class="{ 'nav-scrolled': isScrolled, 'nav-hidden': isNavHidden }">
      <div class="nav-container">
        <div class="nav-logo">
          <router-link to="/" class="logo">
            <span class="logo-icon">🐫</span>
            <span class="logo-text">丝路之旅</span>
          </router-link>
        </div>

        <!-- 桌面导航 -->
        <ul class="nav-links">
          <li v-for="(link, index) in navLinks" :key="link.path"
              :style="{ animationDelay: index * 0.05 + 's' }"
              class="nav-item">
            <router-link :to="link.path" active-class="active-link">
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <!-- 移动端汉堡菜单 -->
        <button class="hamburger" :class="{ 'is-active': isMobileMenuOpen }"
                @click="toggleMobileMenu" aria-label="菜单">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <!-- 移动端导航面板 -->
      <transition name="slide-down">
        <div v-if="isMobileMenuOpen" class="mobile-nav">
          <ul class="mobile-nav-links">
            <li v-for="(link, index) in navLinks" :key="link.path"
                :style="{ animationDelay: index * 0.06 + 's' }"
                class="mobile-nav-item">
              <router-link :to="link.path" active-class="active-link"
                           @click="closeMobileMenu">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </transition>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- 回到顶部按钮 -->
    <transition name="bounce">
      <button v-if="showBackToTop" class="back-to-top" @click="scrollToTop" aria-label="回到顶部">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </transition>

    <!-- 浮动装饰粒子 -->
    <div class="floating-particles" aria-hidden="true">
      <div v-for="n in 12" :key="n" class="particle" :class="'particle-' + n"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isScrolled = ref(false)
const isNavHidden = ref(false)
const showBackToTop = ref(false)
const scrollProgress = ref(0)
const isMobileMenuOpen = ref(false)
const transitionName = ref('fade-slide')

let lastScrollY = 0
let ticking = false

const navLinks = [
  { path: '/', name: '首页' },
  { path: '/history', name: '历史溯源' },
  { path: '/routes', name: '丝路路线' },
  { path: '/cities', name: '名城风物' },
  { path: '/culture', name: '文化瑰宝' },
  { path: '/trade', name: '商贸物产' },
  { path: '/modern', name: '古今新篇' },
  { path: '/interactive', name: '互动专区' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      isScrolled.value = currentScrollY > 50
      showBackToTop.value = currentScrollY > 400
      scrollProgress.value = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        isNavHidden.value = true
      } else {
        isNavHidden.value = false
      }

      lastScrollY = currentScrollY
      ticking = false
    })
    ticking = true
  }
}

// 根据路由深度决定过渡动画方向
const routeOrder = navLinks.map(l => l.path)

watch(() => route.path, (to, from) => {
  const toIndex = routeOrder.indexOf(to)
  const fromIndex = routeOrder.indexOf(from)
  transitionName.value = toIndex >= fromIndex ? 'fade-slide-left' : 'fade-slide-right'
})

// 路由切换时显示加载动画
router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

onMounted(() => {
  window.scrollTo(0, 0)
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 初始加载动画
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* 色彩主题：沙漠黄、戈壁棕、敦煌红、青黛蓝 */
:root {
  --desert-yellow: #F5DEB3;
  --gobi-brown: #8B4513;
  --dunhuang-red: #8B0000;
  --qingdai-blue: #2F4F4F;
  --gold: #D4AF37;
}

/* 基础重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Serif SC', sans-serif;
  background-color: var(--desert-yellow);
  color: #333;
  line-height: 1.6;
  overflow-x: hidden;
}

* {
  font-family: 'Noto Serif SC', sans-serif !important;
}

/* 容器 */
.silk-road-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* ========== 滚动进度条 ========== */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--dunhuang-red), var(--gold), var(--qingdai-blue));
  z-index: 10000;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
}

/* ========== 加载动画 ========== */
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(245, 222, 179, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner-ring {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(139, 0, 0, 0.15);
  border-top-color: var(--dunhuang-red);
  border-right-color: var(--gold);
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

.loading-text {
  font-size: 1.5rem;
  font-family: 'Noto Serif SC', sans-serif;
  color: var(--dunhuang-red);
  letter-spacing: 4px;
  animation: pulse-text 1.5s ease-in-out infinite;
}

.loading-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* ========== 固定顶部导航栏 ========== */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.top-nav.nav-scrolled {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  height: 52px;
}

.top-nav.nav-hidden {
  transform: translateY(-100%);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.nav-logo .logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--dunhuang-red);
  text-decoration: none;
  font-family: 'Noto Serif SC', sans-serif;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.6rem;
  display: inline-block;
  animation: camel-bounce 2s ease-in-out infinite;
}

.logo-text {
  position: relative;
}

.nav-logo .logo:hover {
  color: var(--qingdai-blue);
  transform: translateY(-2px);
}

.nav-logo .logo:hover .logo-icon {
  animation: camel-bounce 0.6s ease-in-out infinite;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-item {
  animation: nav-item-enter 0.4s ease-out both;
}

.nav-links li {
  position: relative;
}

.nav-links a {
  text-decoration: none;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.nav-links a:hover {
  color: var(--dunhuang-red);
}

.nav-links a.active-link {
  color: var(--dunhuang-red);
  font-weight: bold;
}

.nav-links a.active-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--dunhuang-red);
  border-radius: 1px;
  animation: underline-grow 0.3s ease-out;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--dunhuang-red);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-links a:hover::after {
  width: 100%;
}

/* ========== 移动端汉堡菜单 ========== */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  z-index: 1001;
}

.hamburger-line {
  width: 26px;
  height: 2.5px;
  background: var(--dunhuang-red);
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform-origin: center;
}

.hamburger.is-active .hamburger-line:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}

.hamburger.is-active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.is-active .hamburger-line:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}

/* 移动端导航面板 */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-bottom: 2px solid var(--gold);
  overflow: hidden;
}

.mobile-nav-links {
  list-style: none;
  padding: 1rem 0;
}

.mobile-nav-item {
  animation: mobile-item-enter 0.3s ease-out both;
}

.mobile-nav-links a {
  display: block;
  padding: 0.9rem 2rem;
  text-decoration: none;
  color: #333;
  font-size: 1.05rem;
  font-weight: 500;
  transition: all 0.25s ease;
  border-left: 3px solid transparent;
}

.mobile-nav-links a:hover,
.mobile-nav-links a.active-link {
  background: rgba(139, 0, 0, 0.05);
  color: var(--dunhuang-red);
  border-left-color: var(--dunhuang-red);
  padding-left: 2.5rem;
}

.slide-down-enter-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-down-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ========== 主要内容区域 ========== */
.main-content {
  flex: 1;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  padding-bottom: 4rem;
}

/* 页面过渡动画 - 向左滑入 */
.fade-slide-left-enter-active,
.fade-slide-left-leave-active,
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 通用淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ========== 回到顶部按钮 ========== */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--dunhuang-red), var(--gobi-brown));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 900;
}

.back-to-top:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 8px 25px rgba(139, 0, 0, 0.4);
  background: linear-gradient(135deg, var(--gold), var(--dunhuang-red));
}

.back-to-top:active {
  transform: translateY(-1px) scale(0.98);
}

.bounce-enter-active {
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.bounce-leave-active {
  animation: bounce-out 0.3s ease-in;
}

/* ========== 浮动装饰粒子 ========== */
.floating-particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gold);
  border-radius: 50%;
  opacity: 0;
  animation: float-particle 15s linear infinite;
}

.particle-1  { left: 5%;  animation-delay: 0s;   animation-duration: 12s; }
.particle-2  { left: 15%; animation-delay: -2s;  animation-duration: 18s; }
.particle-3  { left: 25%; animation-delay: -4s;  animation-duration: 14s; }
.particle-4  { left: 35%; animation-delay: -1s;  animation-duration: 16s; }
.particle-5  { left: 45%; animation-delay: -6s;  animation-duration: 13s; }
.particle-6  { left: 55%; animation-delay: -3s;  animation-duration: 17s; }
.particle-7  { left: 65%; animation-delay: -8s;  animation-duration: 15s; }
.particle-8  { left: 75%; animation-delay: -5s;  animation-duration: 11s; }
.particle-9  { left: 85%; animation-delay: -7s;  animation-duration: 19s; }
.particle-10 { left: 92%; animation-delay: -9s;  animation-duration: 14s; }
.particle-11 { left: 10%; animation-delay: -10s; animation-duration: 16s; }
.particle-12 { left: 50%; animation-delay: -11s; animation-duration: 12s; }

/* ========== 响应式调整 ========== */
@media (max-width: 768px) {
  .top-nav {
    height: 50px;
  }

  .top-nav.nav-scrolled {
    height: 50px;
  }

  .nav-container {
    padding: 0 1rem;
  }

  .nav-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .main-content {
    margin-top: 50px;
  }

  .nav-logo .logo {
    font-size: 1.2rem;
  }

  .back-to-top {
    bottom: 1.2rem;
    right: 1.2rem;
    width: 44px;
    height: 44px;
  }

  .scroll-progress {
    height: 2px;
  }
}

/* ========== 关键帧动画 ========== */

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse-text {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes camel-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes nav-item-enter {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes underline-grow {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes mobile-item-enter {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(20px);
  }
  50% {
    transform: scale(1.08) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce-out {
  to {
    opacity: 0;
    transform: scale(0.3) translateY(20px);
  }
}

@keyframes float-particle {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 0.5;
    transform: scale(1);
  }
  90% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) scale(0.5);
  }
}
</style>
