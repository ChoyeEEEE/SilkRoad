<template>
  <div class="trade-view">
    <section class="hero-banner">
      <div class="hero-content">
        <h1>商贸物产互通</h1>
        <p class="hero-sub">东西方的繁华交易</p>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="trade-exchange">
      <div class="exchange-header">
        <div class="exchange-col-title left-title">
          <span class="col-icon">🇨🇳</span>
          <span>中国输出</span>
        </div>
        <div class="exchange-center">
          <div class="exchange-arrow">
            <svg width="60" height="24" viewBox="0 0 60 24">
              <path d="M0 12 H50 M45 5 L55 12 L45 19" stroke="#D4AF37" stroke-width="2" fill="none"/>
            </svg>
            <svg width="60" height="24" viewBox="0 0 60 24" class="arrow-reverse">
              <path d="M0 12 H50 M45 5 L55 12 L45 19" stroke="#8B0000" stroke-width="2" fill="none"/>
            </svg>
          </div>
        </div>
        <div class="exchange-col-title right-title">
          <span>域外传入</span>
          <span class="col-icon">🌍</span>
        </div>
      </div>

      <div class="exchange-grid">
        <div class="exchange-column left-col">
          <div
            v-for="(item, index) in exports"
            :key="item.name"
            class="trade-card"
            :style="{ animationDelay: index * 0.15 + 's' }"
            ref="exportRefs"
          >
            <div class="card-inner">
              <div class="card-front">
                <div class="card-emoji">{{ item.icon }}</div>
                <div class="card-info">
                  <h4>{{ item.name }}</h4>
                  <span class="card-origin">{{ item.origin }}</span>
                  <span class="card-period">{{ item.period }}</span>
                </div>
              </div>
              <div class="card-back">
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="exchange-divider">
          <div class="divider-line"></div>
          <div class="divider-label">丝绸之路</div>
          <div class="divider-line"></div>
        </div>

        <div class="exchange-column right-col">
          <div
            v-for="(item, index) in imports"
            :key="item.name"
            class="trade-card"
            :style="{ animationDelay: index * 0.15 + 's' }"
            ref="importRefs"
          >
            <div class="card-inner">
              <div class="card-front">
                <div class="card-emoji">{{ item.icon }}</div>
                <div class="card-info">
                  <h4>{{ item.name }}</h4>
                  <span class="card-origin">{{ item.origin }}</span>
                  <span class="card-period">{{ item.period }}</span>
                </div>
              </div>
              <div class="card-back">
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="trade-currency">
      <h2 class="section-title">货币演变</h2>
      <div class="currency-grid">
        <div
          v-for="(coin, index) in currencies"
          :key="coin.name"
          class="currency-card"
          :style="{ animationDelay: index * 0.1 + 's' }"
          ref="currencyRefs"
        >
          <div class="currency-icon">{{ coin.icon }}</div>
          <div class="currency-info">
            <h4>{{ coin.name }}</h4>
            <span class="currency-period">{{ coin.period }}</span>
            <p>{{ coin.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="trade-market">
      <h2 class="section-title">丝路集市</h2>
      <div class="market-scene">
        <div class="market-bg">
          <div class="market-tent" v-for="n in 5" :key="n"></div>
        </div>
        <div class="market-items">
          <div
            v-for="(stall, index) in marketStalls"
            :key="stall.name"
            class="market-stall"
            :style="{ animationDelay: index * 0.2 + 's' }"
            ref="stallRefs"
          >
            <div class="stall-icon">{{ stall.icon }}</div>
            <h4>{{ stall.name }}</h4>
            <p>{{ stall.desc }}</p>
            <div class="stall-price">
              <span class="price-label">估价</span>
              <span class="price-value">{{ stall.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="trade-flow">
      <h2 class="section-title">商品流通之路</h2>
      <div class="flow-container">
        <div class="flow-path">
          <svg class="flow-svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path
              d="M 50 100 Q 250 20, 500 100 Q 750 180, 950 100"
              stroke="url(#flowGradient)"
              stroke-width="3"
              fill="none"
              stroke-dasharray="8 4"
              class="flow-line"
            />
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#8B0000" />
                <stop offset="50%" stop-color="#D4AF37" />
                <stop offset="100%" stop-color="#2F4F4F" />
              </linearGradient>
            </defs>
          </svg>
          <div class="flow-nodes">
            <div
              v-for="(node, index) in flowNodes"
              :key="node.city"
              class="flow-node"
              :style="{ left: node.position + '%' }"
              ref="flowRefs"
            >
              <div class="node-dot"></div>
              <div class="node-label">
                <span class="node-city">{{ node.city }}</span>
                <span class="node-goods">{{ node.goods }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const exports = [
  { name: '丝绸', icon: '🧵', desc: '丝绸为首项出口商品，华丽织物令西方世界为之倾倒。', origin: '江南地区', period: '汉代起' },
  { name: '瓷器', icon: '🏺', desc: '精美瓷器享誉世界，China一词即源于瓷器。', origin: '景德镇', period: '唐代起' },
  { name: '茶叶', icon: '🍵', desc: '茶文化沿丝路传播，成为东西方共同的饮品文化。', origin: '云南、福建', period: '唐代起' },
  { name: '造纸术', icon: '📜', desc: '四大发明之一，经丝路传至阿拉伯，改变了世界文明进程。', origin: '中原地区', period: '汉代起' },
]

const imports = [
  { name: '葡萄', icon: '🍇', desc: '葡萄及葡萄酒酿造技术经丝路传入中国。', origin: '中亚地区', period: '汉代传入' },
  { name: '香料', icon: '🌶️', desc: '胡椒、肉桂等香料丰富了中华饮食文化。', origin: '南洋、印度', period: '汉代起' },
  { name: '珠宝', icon: '💎', desc: '波斯宝石、罗马琉璃沿丝路流入东方宫廷。', origin: '波斯、罗马', period: '汉代起' },
  { name: '农作物', icon: '🌾', desc: '苜蓿、胡麻、核桃等作物改善了中国农业结构。', origin: '中亚、西亚', period: '汉代起' },
]

const currencies = [
  { name: '贝币', icon: '🐚', period: '商周时期', desc: '最早的货币形式，沿丝路流通至中亚地区。' },
  { name: '半两钱', icon: '🪙', period: '秦朝', desc: '秦始皇统一货币，圆形方孔钱成为丝路贸易的主要货币。' },
  { name: '五铢钱', icon: '💰', period: '汉朝', desc: '汉武帝铸造五铢钱，成为丝绸之路上最受欢迎的货币。' },
  { name: '开元通宝', icon: '🏆', period: '唐朝', desc: '唐代货币制度完善，开元通宝在中亚广泛流通。' },
  { name: '波斯银币', icon: '🥈', period: '萨珊王朝', desc: '波斯银币沿丝路东传，在中国境内多有出土。' },
  { name: '拜占庭金币', icon: '🥇', period: '拜占庭帝国', desc: '东罗马金币在丝路贸易中充当国际货币角色。' },
]

const marketStalls = [
  { name: '丝绸铺', icon: '🧵', desc: '华美的丝绸织品，来自江南的顶级绣坊。', price: '黄金十两' },
  { name: '香料行', icon: '🌶️', desc: '胡椒、肉桂、豆蔻，来自南洋的珍稀香料。', price: '白银五两' },
  { name: '珠宝店', icon: '💎', desc: '波斯猫眼石、印度红宝石、罗马琉璃珠。', price: '黄金百两' },
  { name: '茶马司', icon: '🍵', desc: '云南普洱、福建铁观音，茶马古道的珍品。', price: '铜钱千文' },
  { name: '瓷器坊', icon: '🏺', desc: '景德镇青花瓷、龙泉青瓷，精美绝伦。', price: '黄金五十两' },
  { name: '药材铺', icon: '🌿', desc: '藏红花、乳香、没药，西域珍贵药材。', price: '白银二十两' },
]

const flowNodes = [
  { city: '长安', goods: '丝绸、瓷器', position: 5 },
  { city: '敦煌', goods: '茶叶、纸张', position: 20 },
  { city: '楼兰', goods: '玉石、毛皮', position: 35 },
  { city: '撒马尔罕', goods: '香料、珠宝', position: 50 },
  { city: '巴格达', goods: '波斯地毯', position: 65 },
  { city: '君士坦丁堡', goods: '琉璃、金银器', position: 80 },
  { city: '罗马', goods: '玻璃、金银', position: 95 },
]

const exportRefs = ref<HTMLElement[]>([])
const importRefs = ref<HTMLElement[]>([])
const currencyRefs = ref<HTMLElement[]>([])
const stallRefs = ref<HTMLElement[]>([])
const flowRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 }
  )
  const allRefs = [
    ...exportRefs.value,
    ...importRefs.value,
    ...currencyRefs.value,
    ...stallRefs.value,
    ...flowRefs.value,
  ]
  allRefs.forEach((el) => {
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.trade-view {
  min-height: 100vh;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  color: #fff;
  z-index: 1;
}

.hero-content h1 {
  font-family: 'SimSun', cursive;
  font-size: 2.5rem;
  letter-spacing: 6px;
  animation: heroFadeIn 1s ease-out;
}

.hero-sub {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  opacity: 0.85;
  letter-spacing: 3px;
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-wave {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: #F5DEB3;
  clip-path: ellipse(55% 100% at 50% 100%);
}

.trade-exchange {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.exchange-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
}

.exchange-col-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'SimSun', cursive;
  font-size: 1.3rem;
  font-weight: bold;
}

.left-title { color: #2F4F4F; }
.right-title { color: #8B4513; }

.col-icon {
  font-size: 1.8rem;
}

.exchange-center {
  display: flex;
  align-items: center;
}

.exchange-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.arrow-reverse {
  transform: rotate(180deg);
}

.exchange-grid {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.exchange-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.exchange-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
}

.divider-line {
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
}

.divider-label {
  writing-mode: vertical-rl;
  font-family: 'SimSun', cursive;
  color: #D4AF37;
  font-size: 0.9rem;
  letter-spacing: 4px;
  padding: 1rem 0;
}

.trade-card {
  perspective: 800px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.trade-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.card-inner {
  position: relative;
  width: 100%;
  min-height: 120px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

.trade-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-front {
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
}

.card-back {
  background: linear-gradient(135deg, #8B0000, #2F4F4F);
  color: #fff;
  transform: rotateY(180deg);
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.2);
}

.card-emoji {
  font-size: 2.2rem;
  flex-shrink: 0;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.card-front h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.15rem;
  color: #333;
}

.card-origin {
  font-size: 0.8rem;
  color: #2F4F4F;
  background: rgba(47, 79, 79, 0.1);
 padding: 0.15rem 0.5rem;
  border-radius: 8px;
  display: inline-block;
  width: fit-content;
}

.card-period {
  font-size: 0.75rem;
  color: #8B0000;
  opacity: 0.8;
}

.card-back p {
  font-size: 0.95rem;
  line-height: 1.6;
}

.left-col .trade-card:nth-child(even) { animation: slideFromLeft 0.6s ease both; }
.left-col .trade-card:nth-child(odd) { animation: slideFromLeft 0.6s ease both; }
.right-col .trade-card:nth-child(even) { animation: slideFromRight 0.6s ease both; }
.right-col .trade-card:nth-child(odd) { animation: slideFromRight 0.6s ease both; }

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideFromLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideFromRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 768px) {
  .exchange-grid {
    flex-direction: column;
  }

  .exchange-divider {
    flex-direction: row;
    padding: 1rem 0;
  }

  .divider-line {
    width: 80px;
    height: 2px;
    background: linear-gradient(to right, transparent, #D4AF37, transparent);
  }

  .divider-label {
    writing-mode: horizontal-tb;
  }

  .exchange-header {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .card-inner {
    min-height: 100px;
  }
}

.section-title {
  font-family: 'SimSun', cursive;
  font-size: 1.8rem;
  color: #8B4513;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #D4AF37, #8B0000);
  margin: 0.8rem auto 0;
}

.trade-currency {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.currency-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.currency-card {
  background: linear-gradient(135deg, #fff, #f8f4e6);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.2);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
}

.currency-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.currency-card:hover {
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.2);
  transform: translateY(-3px);
}

.currency-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.currency-info h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.1rem;
  color: #8B4513;
  margin-bottom: 0.3rem;
}

.currency-period {
  font-size: 0.8rem;
  color: #8B0000;
  background: rgba(139, 0, 0, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.currency-info p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.trade-market {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: linear-gradient(to bottom, #FAEBD7, #F5DEB3);
}

.market-scene {
  position: relative;
}

.market-bg {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  opacity: 0.3;
}

.market-tent {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 60px solid #8B4513;
}

.market-tent:nth-child(2) { border-bottom-color: #D4AF37; }
.market-tent:nth-child(3) { border-bottom-color: #8B0000; }
.market-tent:nth-child(4) { border-bottom-color: #2F4F4F; }
.market-tent:nth-child(5) { border-bottom-color: #8B4513; }

.market-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.market-stall {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  border-top: 4px solid #D4AF37;
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
}

.market-stall.visible {
  opacity: 1;
  transform: scale(1);
}

.market-stall:hover {
  box-shadow: 0 10px 35px rgba(139, 69, 19, 0.15);
  transform: translateY(-5px);
}

.stall-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.market-stall h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.15rem;
  color: #8B4513;
  margin-bottom: 0.5rem;
}

.market-stall p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.stall-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 0.8rem;
  border-top: 1px dashed #D4AF37;
}

.price-label {
  font-size: 0.8rem;
  color: #999;
}

.price-value {
  font-family: 'SimSun', cursive;
  font-size: 1rem;
  color: #8B0000;
  font-weight: bold;
}

.trade-flow {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.flow-container {
  position: relative;
}

.flow-path {
  position: relative;
  height: 200px;
  margin: 2rem 0;
}

.flow-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flow-line {
  stroke-dashoffset: 1000;
  animation: flowDash 3s linear infinite;
}

@keyframes flowDash {
  to {
    stroke-dashoffset: 0;
  }
}

.flow-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flow-node {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.flow-node.visible {
  opacity: 1;
}

.node-dot {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #D4AF37, #8B0000);
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  border: 3px solid #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: nodePulse 2s ease-in-out infinite;
}

@keyframes nodePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.node-label {
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
}

.node-city {
  display: block;
  font-family: 'SimSun', cursive;
  font-size: 0.9rem;
  color: #8B4513;
  font-weight: bold;
}

.node-goods {
  display: block;
  font-size: 0.75rem;
  color: #666;
}

@media (max-width: 768px) {
  .currency-grid {
    grid-template-columns: 1fr;
  }

  .market-items {
    grid-template-columns: 1fr;
  }

  .flow-path {
    height: 300px;
    overflow-x: auto;
  }

  .flow-nodes {
    min-width: 800px;
  }

  .section-title {
    font-size: 1.5rem;
  }
}

  .timeline-item {
    width: calc(100% - 50px);
    margin-left: 50px;
    transform: translateX(0);
  }

  .timeline-item.item-right {
    margin-left: 50px;
  }

  .timeline-dot {
    left: -38px;
    right: auto;
    transform: translateX(0);
  }

  .item-right .timeline-dot {
    left: -38px;
  }

  .timeline-content {
    border-left: 4px solid #D4AF37;
    border-right: none;
  }

  .item-right .timeline-content {
    border-left: 4px solid #D4AF37;
    border-right: none;
  }

  .currency-grid {
    grid-template-columns: 1fr;
  }

  .market-items {
    grid-template-columns: 1fr;
  }

  .flow-path {
    height: 300px;
    overflow-x: auto;
  }

  .flow-nodes {
    min-width: 800px;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
