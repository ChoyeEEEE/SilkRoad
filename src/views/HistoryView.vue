<template>
  <div class="history-view">
    <section class="section animate-on-scroll">
      <h2 class="section-title">丝路起源与历史</h2>
      <div class="content">
        <div class="timeline">
          <div class="timeline-item animate-on-scroll">
            <div class="timeline-date">公元前138年</div>
            <div class="timeline-content">
              <h3>张骞出使西域历史背景</h3>
              <p>公元前138年，汉武帝派张骞出使西域，开启了汉朝与西域的直接联系。这一举动不仅是一次外交使命，更是东西方文化交流的序幕。</p>
            </div>
          </div>
          
          <div class="timeline-item animate-on-scroll">
            <div class="timeline-date">公元前2世纪</div>
            <div class="timeline-content">
              <h3>西汉开辟陆上丝路时间、初衷</h3>
              <p>西汉时期（公元前2世纪），为争取盟友对抗匈奴，开通陆上丝路。张骞的两次出使西域，为后来的丝路贸易奠定了基础。</p>
            </div>
          </div>
          
          <div class="timeline-item animate-on-scroll">
            <div class="timeline-date">秦汉时期至唐宋</div>
            <div class="timeline-content">
              <h3>海上丝绸之路发展历程</h3>
              <p>从秦汉时期开始，逐渐发展，到唐宋时期达到鼎盛。海上丝路连接了中国东南沿波与东南亚、南亚、西亚及东非地区。</p>
            </div>
          </div>
          
          <div class="timeline-item animate-on-scroll">
            <div class="timeline-date">历久弥新</div>
            <div class="timeline-content">
              <h3>丝路历史意义与时代价值</h3>
              <p>促进了东西方文化、经济、技术的交流，对世界文明发展产生深远影响。丝路不仅是一条贸易路线，更是文明交流的桥梁。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const checkScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const elementBottom = element.getBoundingClientRect().bottom
    const windowHeight = window.innerHeight
    
    if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
      element.classList.add('animated')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  // Initial check
  checkScroll()
})
</script>

<style scoped>
/* 色彩主题：沙漠黄、戈壁棕、敦煌红、青黛蓝 */
:root {
  --desert-yellow: #F5DEB3;
  --gobi-brown: #8B4513;
  --dunhuang-red: #8B0000;
  --qingdai-blue: #2F4F4F;
  --gold: #D4AF37;
  --cream: #FFF8E7;
  --light-gray: #f8f9fa;
}

/* 基础重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'SimSun', 'sans-serif';
  background-color: var(--desert-yellow);
  color: #333;
  line-height: 1.6;
}

/* 容器 */
.history-view {
  min-height: 100vh;
  padding: 60px 0; /* 为固定导航栏留出空间 */
  position: relative;
}

/* 核心板块 */
.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--dunhuang-red);
  font-family: 'SimSun', cursive;
  font-size: 2.5rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--qingdai-blue);
}

/* 时间轴样式 */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background: var(--qingdai-blue);
  transform: translateX(-50%);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.timeline-item.animated {
  opacity: 1;
  transform: translateY(0);
}

.timeline-date {
  position: absolute;
  left: 50%;
  top: 0;
  width: 120px;
  height: 120px;
  background: var(--dunhuang-red);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'SimSun', cursive;
  box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
  transform: translateX(-50%);
  transition: all 0.4s ease;
  z-index: 10;
}

.timeline-date:hover {
  transform: translateX(-50%) scale(1.1);
  background: var(--qingdai-blue);
}

.timeline-content {
  position: relative;
  width: calc(50% - 80px);
  margin-left: calc(50% + 40px);
  background: white;
  padding: 1.8rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--dunhuang-red);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateX(30px);
}

.timeline-item.animated .timeline-content {
  opacity: 1;
  transform: translateX(0);
}

.timeline-content:nth-child(even) {
  margin-left: auto;
  margin-right: calc(50% + 40px);
  border-left: none;
  border-right: 4px solid var(--dunhuang-red);
}

.timeline-content h3 {
  color: var(--gobi-brown);
  margin-bottom: 1rem;
  font-family: 'SimSun', cursive;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.timeline-content h3::before {
  content: '▸';
  color: var(--dunhuang-red);
  font-size: 1.2rem;
}

.timeline-content p {
  line-height: 1.8;
  color: #555;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    margin-bottom: 2.5rem;
  }
  
  .timeline-date {
    position: relative;
    left: 0;
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
    transform: none;
  }
  
  .timeline-content {
    width: calc(100% - 100px);
    margin-left: 110px;
    border-left: none;
    border-top: 4px solid var(--dunhuang-red);
    padding-top: 1rem;
  }
  
  .timeline-content:nth-child(even) {
    margin-left: 110px;
    border-left: none;
    border-top: 4px solid var(--dunhuang-red);
    border-right: none;
  }
  
  .timeline-content h3::before {
    display: none;
  }
}

/* 动画关键帧 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
