<template>
  <div class="cities-view">
    <section class="section">
      <h2>沿线名城古迹</h2>
      <div class="content">
        <h3>国内</h3>
        <ul>
          <li>西安：起点城市，秦始皇兵马俑</li>
          <li>敦煌：莫高窟，佛教艺术宝库</li>
          <li>楼兰：古代驿城，戈壁中的 Pompeii</li>
          <li>嘉峪关：长城西端关隘</li>
          <li>吐鲁番：火焰山，葡萄之乡</li>
        </ul>
        <h3>国外</h3>
        <ul>
          <li>罗马：欧洲终点，古罗马帝国中心</li>
          <li>波斯：重要中转站，波斯帝国核心地带</li>
          <li>撒马尔罕：中亚枢纽，蒂姆尔帝国首都</li>
        </ul>
        <!-- 古建筑实景图、遗址风貌占位 -->
        <div class="sites-placeholder">
          <p>搭配古建筑实景图、遗址风貌、历史故事</p>
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
.cities-view {
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

.section ul {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.section ul li {
  margin-bottom: 0.5rem;
}

/* 占位样式 */
.sites-placeholder {
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