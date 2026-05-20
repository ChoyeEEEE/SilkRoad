<template>
  <div class="trade-view">
    <section class="section">
      <h2>商贸物产互通</h2>
      <div class="content">
        <h3>中国输出：丝绸、瓷器、茶叶、造纸术</h3>
        <p>丝绸为首项出口商品，瓷器茶叶享誉世界。</p>
        <h3>域外传入：葡萄、苜蓿、香料、珠宝、农作物</h3>
        <p>葡萄酒酿造技术、苜蓿饲作改善农业。</p>
        <!-- 古代通商场景插画占位 -->
        <div class="trade-scene-placeholder">
          <p>古代通商场景插画还原</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for now
</script>

<style scoped>
/* 色彩主题：沙漠黄、戈壁棕、敦煌红、青黛蓝 */
:root {
  --desert-yellow: #F5DEB3;
  --gobi-brown: #8B4513;
  --dunhuang-red: #8B0000;
  --qingdai-blue: #2F4F4F;
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
.trade-view {
  min-height: 100vh;
}

/* 核心板块 */
.section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--dunhuang-red);
  font-family: 'SimSun', cursive;
  font-size: 2rem;
  position: relative;
}

.section h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--qingdai-blue);
}

.section h3 {
  color: var(--gobi-brown);
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'SimSun', cursive;
}

.section p {
  margin-bottom: 1rem;
  text-indent: 2em;
}

/* 特定占位 */
.trade-scene-placeholder {
  background: #f8f8f8;
  border: 1px dashed var(--dunhuang-red);
  padding: 1.5rem;
  margin: 1rem 0;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
  }
}
</style>