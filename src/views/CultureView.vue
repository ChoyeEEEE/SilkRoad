<template>
  <div class="culture-view">
    <section class="section">
      <h2>丝路文化交融</h2>
      <div class="content">
        <h3>宗教传播：佛教、伊斯兰教文化交融</h3>
        <p>佛教从印度传入中国，伊斯兰教亦经丝路传播。</p>
        <h3>艺术交融：壁画、舞蹈、乐器、服饰</h3>
        <p>敦煌壁画展示中西合璧的艺术风格，乐器如琵琶经丝路传入。</p>
        <h3>语言、习俗、民俗风情展示</h3>
        <p>多种语言交汇，驼铃声声，胡旋舞风靡盛唐。</p>
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
.culture-view {
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

/* 响应式调整 */
@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
  }
}
</style>