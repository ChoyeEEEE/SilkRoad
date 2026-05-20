<template>
  <div class="cities-view">
    <section class="section">
      <h2 class="section-title">沿线名城古迹</h2>

      <div class="region-group">
        <h3 class="region-label">国内</h3>
        <div class="cards-column">
          <div v-for="city in domesticCities" :key="city.name" class="city-card">
            <div class="card-image">
              <div class="image-placeholder">
                <span class="placeholder-icon">🏛️</span>
                <span class="placeholder-text">{{ city.name }}实景图</span>
              </div>
            </div>
            <div class="card-body">
              <div class="card-tag domestic">国内</div>
              <h4 class="card-title">{{ city.name }}</h4>
              <p class="card-desc">{{ city.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="region-group">
        <h3 class="region-label">国外</h3>
        <div class="cards-column">
          <div v-for="city in foreignCities" :key="city.name" class="city-card">
            <div class="card-image">
              <div class="image-placeholder">
                <span class="placeholder-icon">🕌</span>
                <span class="placeholder-text">{{ city.name }}实景图</span>
              </div>
            </div>
            <div class="card-body">
              <div class="card-tag foreign">国外</div>
              <h4 class="card-title">{{ city.name }}</h4>
              <p class="card-desc">{{ city.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const domesticCities = [
  { name: '西安', desc: '起点城市，秦始皇兵马俑' },
  { name: '敦煌', desc: '莫高窟，佛教艺术宝库' },
  { name: '楼兰', desc: '古代驿城，戈壁中的 Pompeii' },
  { name: '嘉峪关', desc: '长城西端关隘' },
  { name: '吐鲁番', desc: '火焰山，葡萄之乡' },
]

const foreignCities = [
  { name: '罗马', desc: '欧洲终点，古罗马帝国中心' },
  { name: '波斯', desc: '重要中转站，波斯帝国核心地带' },
  { name: '撒马尔罕', desc: '中亚枢纽，蒂姆尔帝国首都' },
]
</script>

<style scoped>
.cities-view {
  min-height: 100vh;
}

.section {
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #8B0000;
  font-family: 'SimSun', cursive;
  font-size: 2rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #2F4F4F;
}

.region-group {
  margin-bottom: 3rem;
}

.region-label {
  color: #8B4513;
  font-family: 'SimSun', cursive;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid #D4AF37;
}

.cards-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.city-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.city-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 0, 0, 0.12);
}

.card-image {
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #f5f0e8, #e8e0d0);
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px dashed rgba(139, 0, 0, 0.2);
  background: linear-gradient(135deg, rgba(245, 222, 179, 0.3), rgba(232, 224, 208, 0.5));
}

.placeholder-icon {
  font-size: 2.5rem;
}

.placeholder-text {
  font-size: 0.9rem;
  color: #999;
  font-family: 'SimSun', cursive;
}

.card-body {
  padding: 1.2rem 1.5rem;
}

.card-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
}

.card-tag.domestic {
  background: rgba(47, 79, 79, 0.1);
  color: #2F4F4F;
}

.card-tag.foreign {
  background: rgba(212, 175, 55, 0.15);
  color: #8B6914;
}

.card-title {
  font-family: 'SimSun', cursive;
  font-size: 1.3rem;
  color: #8B0000;
  margin-bottom: 0.4rem;
}

.card-desc {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section {
    padding: 2rem 1rem;
  }

  .card-image {
    height: 180px;
  }
}
</style>