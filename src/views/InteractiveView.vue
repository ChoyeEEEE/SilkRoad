<template>
  <div class="interactive-view">
    <section class="section">
      <h2>趣味互动板块（大赛吸睛）</h2>
      <div class="content">
        <h3>丝路知识小问答</h3>
        <div class="quiz-placeholder">
          <p>选择题：丝路的起点是？ A. 西安 B. 洛阳 C. 北京 D. 上海</p>
        </div>
        <h3>驼队旅途小游戏简易界面</h3>
        <div class="game-placeholder">
          <p>驼队旅途中遇到沙尘暴，如何应对？</p>
        </div>
        <h3>丝路诗词合集、古风文案专区</h3>
        <div class="poetry-placeholder">
          <p>《塞下曲·其三》 柳宗元：白雪却嫌山色小，故随深洄作绿萍。</p>
        </div>
        <h3>游客留言/寄语板块</h3>
        <div class="guestbook-placeholder">
          <p>您的足迹，丝路的记录。欢迎留下您的故事。</p>
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
.interactive-view {
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

/* 占位样式 */
.quiz-placeholder,
.game-placeholder,
.poetry-placeholder,
.guestbook-placeholder {
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