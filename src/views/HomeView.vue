<template>
  <div class="home-view">
    <header class="main-visual">
      <div class="banner">
        <!-- 背景图片 -->
        <img src="/picture/523C934FDFF6CF60CEBBFD042B7081CA.jpg" class="bg-image" alt="" draggable="false" />

        <!-- 暗色遮罩（让文字更清晰） -->
        <div class="overlay"></div>

        <!-- 飘动云朵 -->
        <svg class="cloud-layer" viewBox="0 0 1400 400" preserveAspectRatio="none">
          <ellipse cx="200" cy="120" rx="180" ry="50" fill="rgba(255,255,255,0.06)" class="cloud c1" />
          <ellipse cx="600" cy="80" rx="220" ry="60" fill="rgba(255,255,255,0.05)" class="cloud c2" />
          <ellipse cx="1000" cy="100" rx="200" ry="55" fill="rgba(255,255,255,0.04)" class="cloud c3" />
          <ellipse cx="400" cy="160" rx="160" ry="40" fill="rgba(255,255,255,0.04)" class="cloud c4" />
          <ellipse cx="800" cy="140" rx="190" ry="48" fill="rgba(255,255,255,0.03)" class="cloud c5" />
        </svg>

        <!-- 光线效果 -->
        <div class="light-rays">
          <div class="ray ray-1"></div>
          <div class="ray ray-2"></div>
          <div class="ray ray-3"></div>
        </div>

        <!-- 沙尘粒子 -->
        <div class="dust-particles">
          <div v-for="n in 35" :key="'d-'+n" class="dust" :class="'dust-'+n"></div>
        </div>

        <!-- 飞鸟 -->
        <div class="birds">
          <svg class="bird bird-1" viewBox="0 0 30 12" fill="none">
            <path d="M0,8 Q7,0 15,6 Q23,0 30,8" stroke="rgba(80,50,20,0.5)" stroke-width="1.5" fill="none" />
          </svg>
          <svg class="bird bird-2" viewBox="0 0 24 10" fill="none">
            <path d="M0,6 Q6,0 12,5 Q18,0 24,6" stroke="rgba(80,50,20,0.4)" stroke-width="1.2" fill="none" />
          </svg>
          <svg class="bird bird-3" viewBox="0 0 20 8" fill="none">
            <path d="M0,5 Q5,0 10,4 Q15,0 20,5" stroke="rgba(80,50,20,0.35)" stroke-width="1" fill="none" />
          </svg>
        </div>

        <!-- 文字内容 -->
        <div class="banner-text">
          <h1>重走丝绸之路，探寻千年文明</h1>
          <p class="subtitle">跨越千年时空，感受文明交流的宏伟篇章</p>
        </div>
      </div>

      <nav class="quick-nav">
        <button @click="scrollToSection('routes')">路线</button>
        <button @click="scrollToSection('culture')">文化</button>
        <button @click="scrollToSection('cities')">古迹</button>
        <button @click="scrollToSection('trade')">好物</button>
        <button @click="scrollToSection('modern')">古今对比</button>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 60
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}
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

/* 背景图片 */
.bg-image {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  animation: bg-zoom 30s ease-in-out infinite alternate;
}

@keyframes bg-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

/* 暗色遮罩 */
.overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(30,15,5,0.15) 70%),
    linear-gradient(180deg, rgba(30,15,5,0.3) 0%, rgba(30,15,5,0.1) 40%, rgba(30,15,5,0.4) 100%);
}

/* 云层 */
.cloud-layer {
  position: absolute; inset: 0; width: 100%; height: 60%; z-index: 2; pointer-events: none;
}
.cloud { animation: cloud-float linear infinite; }
.c1 { animation-duration: 60s; }
.c2 { animation-duration: 80s; animation-delay: -20s; }
.c3 { animation-duration: 70s; animation-delay: -35s; }
.c4 { animation-duration: 90s; animation-delay: -50s; }
.c5 { animation-duration: 75s; animation-delay: -15s; }

/* 光线 */
.light-rays {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 100%; height: 80%; z-index: 2; pointer-events: none; overflow: hidden;
}
.ray {
  position: absolute; top: -10%;
  background: linear-gradient(180deg, rgba(255,220,120,0.08) 0%, transparent 100%);
  transform-origin: top center;
}
.ray-1 { left: 30%; width: 120px; height: 100%; transform: rotate(-8deg); animation: ray-pulse 6s ease-in-out infinite; }
.ray-2 { left: 50%; width: 150px; height: 100%; transform: rotate(2deg); animation: ray-pulse 8s ease-in-out infinite -2s; }
.ray-3 { left: 65%; width: 100px; height: 100%; transform: rotate(12deg); animation: ray-pulse 7s ease-in-out infinite -4s; }

@keyframes ray-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }

/* 沙尘粒子 */
.dust-particles {
  position: absolute; inset: 0; z-index: 3; pointer-events: none; overflow: hidden;
}
.dust {
  position: absolute; width: 2px; height: 2px;
  background: rgba(212,175,55,0.5); border-radius: 50%;
  animation: dust-float linear infinite;
}
.dust-1  { left: 5%;  animation-duration: 12s; animation-delay: 0s; }
.dust-2  { left: 10%; animation-duration: 10s; animation-delay: -1s; }
.dust-3  { left: 15%; animation-duration: 14s; animation-delay: -2s; }
.dust-4  { left: 20%; animation-duration: 11s; animation-delay: -3s; }
.dust-5  { left: 25%; animation-duration: 13s; animation-delay: -4s; }
.dust-6  { left: 30%; animation-duration: 9s;  animation-delay: -5s; }
.dust-7  { left: 35%; animation-duration: 15s; animation-delay: -6s; }
.dust-8  { left: 40%; animation-duration: 12s; animation-delay: -7s; }
.dust-9  { left: 45%; animation-duration: 11s; animation-delay: -8s; }
.dust-10 { left: 50%; animation-duration: 13s; animation-delay: -9s; }
.dust-11 { left: 55%; animation-duration: 10s; animation-delay: -10s; }
.dust-12 { left: 60%; animation-duration: 14s; animation-delay: -11s; }
.dust-13 { left: 65%; animation-duration: 12s; animation-delay: -0.5s; }
.dust-14 { left: 70%; animation-duration: 11s; animation-delay: -2.5s; }
.dust-15 { left: 75%; animation-duration: 15s; animation-delay: -4.5s; }
.dust-16 { left: 80%; animation-duration: 13s; animation-delay: -6.5s; }
.dust-17 { left: 85%; animation-duration: 10s; animation-delay: -8.5s; }
.dust-18 { left: 90%; animation-duration: 14s; animation-delay: -10.5s; }
.dust-19 { left: 95%; animation-duration: 12s; animation-delay: -1.5s; }
.dust-20 { left: 3%;  animation-duration: 11s; animation-delay: -3.5s; }
.dust-21 { left: 8%;  animation-duration: 13s; animation-delay: -5.5s; }
.dust-22 { left: 13%; animation-duration: 10s; animation-delay: -7.5s; }
.dust-23 { left: 18%; animation-duration: 15s; animation-delay: -9.5s; }
.dust-24 { left: 23%; animation-duration: 12s; animation-delay: -11.5s; }
.dust-25 { left: 28%; animation-duration: 14s; animation-delay: -0.3s; }
.dust-26 { left: 33%; animation-duration: 11s; animation-delay: -2.3s; }
.dust-27 { left: 38%; animation-duration: 13s; animation-delay: -4.3s; }
.dust-28 { left: 43%; animation-duration: 10s; animation-delay: -6.3s; }
.dust-29 { left: 48%; animation-duration: 15s; animation-delay: -8.3s; }
.dust-30 { left: 53%; animation-duration: 12s; animation-delay: -10.3s; }
.dust-31 { left: 58%; animation-duration: 11s; animation-delay: -1.8s; }
.dust-32 { left: 63%; animation-duration: 14s; animation-delay: -3.8s; }
.dust-33 { left: 68%; animation-duration: 13s; animation-delay: -5.8s; }
.dust-34 { left: 73%; animation-duration: 10s; animation-delay: -7.8s; }
.dust-35 { left: 78%; animation-duration: 15s; animation-delay: -9.8s; }

/* 飞鸟 */
.birds { position: absolute; top: 10%; left: 0; width: 100%; height: 30%; z-index: 2; pointer-events: none; }
.bird { position: absolute; }
.bird-1 { top: 15%; width: 28px; animation: bird-fly 14s linear infinite, bird-flap 0.4s ease-in-out infinite; }
.bird-2 { top: 30%; width: 22px; animation: bird-fly 18s linear infinite -6s, bird-flap 0.5s ease-in-out infinite; }
.bird-3 { top: 10%; width: 18px; animation: bird-fly 22s linear infinite -12s, bird-flap 0.55s ease-in-out infinite; }

/* 文字 */
.banner-text {
  position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
  text-align: center; width: 90%; max-width: 900px; z-index: 10;
}
.banner-text h1 {
  font-size: 3.8rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  letter-spacing: 8px; font-weight: 400;
  color: #FFF8DC;
  -webkit-text-stroke: 0.5px rgba(139,69,19,0.4);
  text-shadow:
    0 0 20px rgba(139,69,19,0.6),
    0 0 50px rgba(139,69,19,0.3),
    0 2px 4px rgba(0,0,0,0.8),
    0 4px 20px rgba(0,0,0,0.5);
  animation: title-glow 4s ease-in-out infinite 2s, fadeInUp 1.5s ease-out both;
}
.subtitle {
  font-size: 1.5rem;
  font-family: 'ZCOOL XiaoWei', 'Ma Shan Zheng', 'STKaiti', 'SimSun', serif;
  color: rgba(245,222,179,0.9);
  text-shadow: 0 1px 4px rgba(0,0,0,0.7);
  margin-top: 1rem; letter-spacing: 4px;
  animation: fadeInUp 1.5s ease-out 0.5s both;
}

/* 快速导航 */
.quick-nav {
  position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%);
  display: flex; gap: 1rem; z-index: 10; flex-wrap: wrap; justify-content: center;
}
.quick-nav button {
  background: rgba(139,69,19,0.2); color: #F5DEB3;
  border: 1px solid rgba(212,175,55,0.3);
  padding: 0.7rem 1.5rem; border-radius: 30px; cursor: pointer;
  font-weight: bold; transition: all 0.4s ease;
  backdrop-filter: blur(8px); font-family: 'SimSun', serif;
  letter-spacing: 2px; font-size: 0.95rem;
}
.quick-nav button:hover {
  background: rgba(212,175,55,0.35); border-color: var(--gold);
  color: white; transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(212,175,55,0.3);
}

/* 关键帧 */
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
@keyframes title-glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(139,69,19,0.6), 0 0 50px rgba(139,69,19,0.3),
      0 2px 4px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5);
  }
  50% {
    text-shadow: 0 0 30px rgba(139,69,19,0.9), 0 0 80px rgba(139,69,19,0.5),
      0 2px 4px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5);
  }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .banner-text h1 { font-size: 2.2rem; letter-spacing: 4px; }
  .subtitle { font-size: 1.1rem; }
  .quick-nav { gap: 0.6rem; bottom: 4%; }
  .quick-nav button { padding: 0.6rem 1.2rem; font-size: 0.85rem; }
}
</style>
