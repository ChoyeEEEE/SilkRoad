<template>
  <div class="history-view">
    <div class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>历史溯源</h1>
        <p>穿越千年时光，探寻丝绸之路的起源与辉煌</p>
      </div>
      <div class="scroll-hint">
        <span>向下滚动</span>
        <div class="scroll-arrow"></div>
      </div>
      <!-- 墨迹粒子 -->
      <div class="ink-particles" aria-hidden="true">
        <div v-for="n in 20" :key="'ink-'+n" class="ink-dot" :class="'ink-dot-'+n"></div>
      </div>
      <!-- 飘散的古文字 -->
      <div class="floating-chars" aria-hidden="true">
        <span v-for="(ch, i) in floatingChars" :key="'char-'+i" class="float-char" :class="'float-char-'+i">{{ ch }}</span>
      </div>
      <!-- 烟雾效果 -->
      <div class="hero-mist" aria-hidden="true">
        <div class="mist mist-1"></div>
        <div class="mist mist-2"></div>
        <div class="mist mist-3"></div>
      </div>
    </div>

    <section class="scroll-section" ref="scrollSection">
      <h2 class="section-title">丝路千年长卷</h2>
      <p class="section-subtitle">卷轴徐展，朝代更迭，丝路千年尽收眼底</p>

      <button class="toggle-btn" @click="toggleScroll" :class="{ active: isExpanded }">
        <span class="toggle-icon">{{ isExpanded ? '收' : '展' }}</span>
        <span class="toggle-text">{{ isExpanded ? '收起卷轴' : '展开卷轴' }}</span>
        <svg class="toggle-arrow" :class="{ up: isExpanded }" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="scroll-outer" :class="{ expanded: isExpanded, autoExpanded: autoExpanded }">
        <!-- 上轴 -->
        <div class="rod rod-top">
          <div class="rod-knob rod-knob-l">
            <div class="knob-face"></div>
          </div>
          <div class="rod-bar">
            <div class="bar-highlight"></div>
          </div>
          <div class="rod-knob rod-knob-r">
            <div class="knob-face"></div>
          </div>
          <!-- 轴下方纸卷堆积感 -->
          <div class="paper-bulk"></div>
        </div>

        <!-- 宣纸区（高度动画） -->
        <div class="paper-stage">
          <div class="paper-curl-shadow"></div>
          <div class="paper-scroll" ref="paperRef">
            <div class="paper-grain"></div>
            <div class="paper-edge-l"></div>
            <div class="paper-edge-r"></div>

            <!-- 水墨远山 -->
            <svg class="ink-mountains" viewBox="0 0 800 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="inkFade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#1a1a1a" stop-opacity="0.045"/>
                  <stop offset="100%" stop-color="#1a1a1a" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,160 L0,110 Q40,80 100,105 Q180,55 280,90 Q360,40 460,80 Q540,30 640,70 Q720,45 800,60 L800,160Z" fill="url(#inkFade)"/>
              <path d="M0,160 L0,130 Q60,105 150,125 Q250,85 370,115 Q470,80 570,100 Q660,70 800,85 L800,160Z" fill="url(#inkFade)" opacity="0.5"/>
            </svg>

            <!-- 各朝代 -->
            <div
              v-for="(era, i) in eraData"
              :key="era.id"
              class="era-block"
              :class="{ revealed: revealedEras.has(era.id) }"
              :style="{ animationDelay: (i * 0.45 + 0.6) + 's' }"
            >
              <div v-if="i > 0" class="ink-brush-divider">
                <svg viewBox="0 0 500 16" preserveAspectRatio="none">
                  <path d="M0,8 C60,3 120,12 200,8 S340,4 420,8 S480,10 500,8" stroke="#2a2a2a" stroke-width="0.6" fill="none" opacity="0.15" stroke-linecap="round"/>
                  <circle cx="250" cy="8" r="2" fill="#2a2a2a" opacity="0.1"/>
                </svg>
              </div>

              <div class="era-header">
                <div class="seal-stamp">
                  <span>{{ era.name }}</span>
                </div>
                <div class="era-line-area">
                  <h3>{{ era.name }} · {{ era.title }}</h3>
                  <span class="era-dates">{{ era.years }}</span>
                </div>
              </div>

              <p class="era-summary">{{ era.intro }}</p>

              <div class="event-card">
                <div class="event-img-wrap" :style="{ background: era.event.gradient }">
                  <img v-if="era.event.image" :src="era.event.image" :alt="era.event.title" class="event-img"/>
                  <div v-else class="img-placeholder">
                    <span class="ph-icon">{{ era.event.icon }}</span>
                    <span class="ph-label">{{ era.event.imageLabel }}</span>
                  </div>
                </div>
                <div class="event-info">
                  <h4>{{ era.event.title }}</h4>
                  <p>{{ era.event.desc }}</p>
                  <div class="tags">
                    <span v-for="t in era.event.tags" :key="t" class="tag">{{ t }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 卷末 -->
            <div class="scroll-finale">
              <div class="finale-seal">
                <span>丝路千年</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 下轴 -->
        <div class="rod rod-bottom">
          <div class="rod-knob rod-knob-l"><div class="knob-face"></div></div>
          <div class="rod-bar"><div class="bar-highlight"></div></div>
          <div class="rod-knob rod-knob-r"><div class="knob-face"></div></div>
        </div>
      </div>
    </section>

    <section class="passport-section">
      <div class="passport-inner">
        <div class="passport-header">
          <span class="passport-badge">通关文牒</span>
          <h2 class="passport-title">丝路通关文牒文化</h2>
          <p class="passport-subtitle">古代丝绸之路上的通行凭证与外交信物</p>
        </div>
        <div class="passport-intro">
          <div class="passport-text">
            <p>通关文牒，又称"过所""路引""关照"，是古代丝路上商旅、使者、僧侣通行关卡时必须出示的官方凭证。它不仅是通行许可，更是国家主权与外交关系的象征。</p>
            <p>持有通关文牒者，可在沿途驿站获得食宿补给、军事保护和翻译协助。文牒上通常注明持牒人身份、携带货物、目的地及有效期限，并加盖官府印鉴。</p>
          </div>
          <div class="passport-image-slot">
            <img src="/picture/R (1).jpg" alt="通关文牒示意图片" class="passport-img" />
          </div>
        </div>
        <div class="passport-types">
          <h3 class="types-title">文牒类型与演变</h3>
          <div class="types-grid">
            <div v-for="item in passportTypes" :key="item.name" class="type-card">
              <div class="type-icon">{{ item.icon }}</div>
              <h4>{{ item.name }}</h4>
              <span class="type-era">{{ item.era }}</span>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
        <div class="passport-famous">
          <h3 class="famous-title">著名通关案例</h3>
          <div class="famous-list">
            <div v-for="item in famousCases" :key="item.person" class="famous-item">
              <div class="famous-icon">{{ item.icon }}</div>
              <div class="famous-body">
                <h4>{{ item.person }}</h4>
                <span class="famous-era">{{ item.era }}</span>
                <p>{{ item.story }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="summary-section">
      <div class="summary-card">
        <div class="summary-icon">🏛️</div>
        <h3>历史意义</h3>
        <p>丝绸之路不仅是一条贸易通道，更是连接东西方文明的桥梁。它促进了文化、宗教、科技、艺术的交流融合，对人类文明发展产生了深远影响。</p>
        <div class="summary-stats">
          <div class="stat"><span class="stat-num">2000+</span><span class="stat-label">年历史</span></div>
          <div class="stat"><span class="stat-num">7000+</span><span class="stat-label">公里路程</span></div>
          <div class="stat"><span class="stat-num">数十</span><span class="stat-label">个国家</span></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

interface SingleEvent {
  title: string; desc: string; icon: string; imageLabel: string
  gradient: string; image?: string; tags: string[]
}
interface EraItem {
  id: string; name: string; title: string; years: string
  icon: string; intro: string; event: SingleEvent
}

const eraData: EraItem[] = [
  {
    id: 'han', name: '西汉', title: '凿空西域', years: '公元前206年 — 公元9年', icon: '🏯',
    intro: '张骞两次出使西域，打通了中原与中亚的联系，开辟了横贯东西的贸易大通道，丝绸之路由此开端。',
    event: { title: '张骞出使西域', desc: '公元前138年，汉武帝派张骞出使西域联络大月氏夹击匈奴。张骞历经13年艰辛，虽未达成军事目的，却带回了西域各国的地理人文信息，开辟了东西方交流的伟大通道，史称"凿空"。', icon: '🛤️', imageLabel: '张骞出使西域图', image: '/picture/1866C5AF7EA21DF62C35C3354A6385A4.jpg', gradient: 'linear-gradient(135deg, #C9A96E 0%, #8B6E1A 100%)', tags: ['外交使命', '凿空西域', '文明交流'] }
  },
  {
    id: 'sui-tang', name: '隋唐', title: '万国来朝', years: '公元581年 — 公元907年', icon: '👑',
    intro: '唐朝以开放包容的姿态迎接四方来客，长安成为国际化大都市，丝路贸易空前繁荣，文化交流达到高峰。',
    event: { title: '玄奘西行取经', desc: '贞观年间，玄奘法师历经艰险前往天竺取经，历时17年，行程五万余里。他的《大唐西域记》详细记录了丝路沿线各国的风土人情，成为研究丝绸之路最珍贵的历史文献之一。', icon: '📿', imageLabel: '玄奘西行图', image: '/picture/5ec4fef3a4188f0001786e62.jpg', gradient: 'linear-gradient(135deg, #3D5C5C 0%, #7A4A2A 100%)', tags: ['佛教传播', '文化交流', '求法精神'] }
  },
  {
    id: 'song-yuan', name: '宋元', title: '海陆并进', years: '公元960年 — 公元1368年', icon: '⚓',
    intro: '海上丝绸之路达到鼎盛，泉州成为东方第一大港。蒙古帝国的统一使陆上丝路再度繁荣。',
    event: { title: '马可·波罗来华', desc: '1271年，威尼斯商人马可·波罗沿丝绸之路来到中国，在元朝生活了17年。他的《马可·波罗游记》让欧洲人第一次详细了解了东方的富庶与辉煌，激发了大航海时代的到来。', icon: '📖', imageLabel: '马可·波罗游记', image: '/picture/09B828686165D7C89E2C09B4D082A1FF.jpg', gradient: 'linear-gradient(135deg, #C8982C 0%, #8B6E1A 100%)', tags: ['东西交流', '游记文学', '文明互鉴'] }
  },
  {
    id: 'ming-qing', name: '明清', title: '海禁与变迁', years: '公元1368年 — 公元1912年', icon: '🐉',
    intro: '郑和七下西洋展示了明朝的海上实力，而清代的闭关政策则使传统丝路贸易走向终结。',
    event: { title: '郑和七下西洋', desc: '1405年至1433年，郑和率领庞大船队七次远航，到达东南亚、南亚、西亚及东非三十余国。这是人类航海史上的壮举，比哥伦布发现新大陆早了近一个世纪，展示了和平外交理念。', icon: '⛵', imageLabel: '郑和宝船队', image: '/picture/7BD645C4E1B458ED35106187F8F6A9AA.jpg', gradient: 'linear-gradient(135deg, #3D5C5C 0%, #C8982C 100%)', tags: ['航海壮举', '和平外交', '文化交流'] }
  },
  {
    id: 'modern', name: '现代', title: '丝路复兴', years: '公元1949年 — 至今', icon: '🌏',
    intro: '"一带一路"倡议让丝绸之路焕发新生，中欧班列穿越亚欧大陆，古老的丝路精神在新时代绽放光芒。',
    event: { title: '"一带一路"倡议', desc: '2013年，中国提出"丝绸之路经济带"和"21世纪海上丝绸之路"倡议，旨在加强沿线国家的经济合作与文化交流，构建人类命运共同体。中欧班列已通达欧洲25个国家200多个城市。', icon: '🤝', imageLabel: '一带一路峰会', image: '/picture/12345.jpg', gradient: 'linear-gradient(135deg, #B84C38 0%, #C8982C 100%)', tags: ['国际合作', '互联互通', '共同发展'] }
  }
]

const passportTypes = [
  { icon: '📋', name: '过所', era: '汉唐时期', desc: '汉代称"传"，唐代称"过所"，是最常见的通关凭证。由出发地官府签发，注明持有人姓名、籍贯、随行人员及货物清单。' },
  { icon: '🏷️', name: '关照', era: '宋元时期', desc: '宋代以后称"关照"或"关引"，功能与过所类似但更为规范。商队须在出发地申请，沿途关卡逐次加盖印戳。' },
  { icon: '🪪', name: '路引', era: '明清时期', desc: '明清时期的通行凭证，由地方衙门颁发。除身份信息外，还注明出行事由、路线和期限。' },
  { icon: '📜', name: '国书牒文', era: '历代通用', desc: '国家间使节往来所用的外交文书，相当于现代的外交护照。内容包括出使目的、使团成员、所携国礼等。' }
]

const famousCases = [
  { icon: '🛤️', person: '张骞', era: '西汉·建元二年（前139年）', story: '持汉节出使西域，被匈奴扣留十余年仍不辱使命。其通关文牒虽已不存，但《史记》详载其出使经历，成为丝路开拓的第一人。' },
  { icon: '📿', person: '玄奘', era: '唐·贞观元年（627年）', story: '玄奘西行时虽未获官方通关文牒（私自出关），但沿途各国因其高僧身份而给予通行便利。归唐后获唐太宗接见。' },
  { icon: '📖', person: '马可·波罗', era: '元·至元八年（1271年）', story: '马可·波罗持元朝忽必烈汗赐予的金牌通行令，可自由出入帝国全境并在驿站获得食宿。这枚金牌是元代最高级别的通行证。' },
  { icon: '⛵', person: '郑和', era: '明·永乐三年（1405年）', story: '郑和七下西洋，携带明成祖颁发的国书与赐予各国的礼品清单。其船队所到之处均出示国书，开展朝贡贸易。' }
]

const isExpanded = ref(false)
const autoExpanded = ref(false)
const revealedEras = reactive(new Set<string>())
const scrollSection = ref<HTMLElement | null>(null)
const paperRef = ref<HTMLElement | null>(null)

const floatingChars = ['史', '丝', '路', '驼', '铃', '敦', '煌', '汉', '唐', '瓷', '茶', '玉', '帛', '驿', '关', '漠', '胡', '马', '舟', '港', '佛', '经', '商', '道', '城', '月', '风', '沙', '泉', '雪', '碑', '阁', '墨', '卷', '笔', '砚', '弦', '钟', '鼓', '灯', '酒', '烟', '云', '雨', '霜', '雾', '星', '河']

let observer: IntersectionObserver | null = null

function toggleScroll() {
  if (isExpanded.value) {
    isExpanded.value = false
    revealedEras.clear()
  } else {
    isExpanded.value = true
    autoExpanded.value = true
    revealEras()
  }
}

function revealEras() {
  eraData.forEach((era, i) => {
    setTimeout(() => {
      revealedEras.add(era.id)
    }, i * 500 + 800)
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !isExpanded.value) {
        isExpanded.value = true
        autoExpanded.value = true
        revealEras()
      }
    },
    { threshold: 0.1 }
  )
  if (scrollSection.value) observer.observe(scrollSection.value)
})

onUnmounted(() => { observer?.disconnect() })
</script>

<style scoped>
.history-view {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f0e8 0%, #ede4d3 50%, #f5f0e8 100%);
}

/* ===== Hero ===== */
.hero-banner {
  position: relative; height: 100vh; min-height: 700px;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(139,37,0,0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(139,37,0,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(184,134,11,0.1) 0%, transparent 50%),
    linear-gradient(170deg, #0a0505 0%, #1a0808 25%, #2d1010 45%, #3a1515 60%, #1a0808 80%, #0a0505 100%);
  display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;
}
.hero-banner::before {
  content: ''; position: absolute; inset: 0; display: none;
}
.hero-banner::after {
  content: ''; position: absolute; inset: 0; border: 1px solid rgba(200,152,44,0.15); margin: 1.5rem; border-radius: 4px; pointer-events: none;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(200,152,44,0.08) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%);
}
.hero-content { position: relative; z-index: 2; text-align: center; }
.hero-content h1 {
  font-size: 11rem; font-family: 'Ma Shan Zheng', cursive !important;
  color: #C8982C; letter-spacing: 16px;
  text-shadow: 0 0 20px rgba(200,152,44,0.3), 0 2px 10px rgba(0,0,0,0.6);
  animation: fadeInDown 1s ease-out; position: relative;
}
.hero-content h1::before, .hero-content h1::after {
  content: '—'; font-size: 1.8rem; letter-spacing: 4px; color: rgba(200,152,44,0.5); vertical-align: middle; margin: 0 0.8rem;
}
.hero-content p {
  font-size: 1.25rem; color: rgba(220,200,170,0.75); margin-top: 1.2rem; letter-spacing: 5px;
  font-family: 'Noto Serif SC', sans-serif;
  animation: fadeInUp 1s ease-out 0.3s both; position: relative;
}
.hero-content p::before, .hero-content p::after {
  content: ''; display: inline-block; width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,152,44,0.4), transparent);
  vertical-align: middle; margin: 0 1rem;
}
.scroll-hint { position: absolute; bottom: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; animation: fadeInUp 1s ease-out 0.8s both; }
.scroll-hint span { font-size: 0.8rem; color: rgba(200,152,44,0.45); letter-spacing: 3px; }
.scroll-arrow { width: 18px; height: 18px; border-right: 1.5px solid rgba(200,152,44,0.45); border-bottom: 1.5px solid rgba(200,152,44,0.45); transform: rotate(45deg); animation: bounce 2s ease-in-out infinite; }

/* ===== 卷轴区 ===== */
.scroll-section { max-width: 860px; margin: 0 auto; padding: 4rem 2rem 2rem; }
.section-title {
  text-align: center; font-size: 2.5rem;
  font-family: 'Noto Serif SC', sans-serif;
  color: #B84C38; letter-spacing: 4px; margin-bottom: 0.5rem;
}
.section-title::after { content: ''; display: block; width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #C8982C, transparent); margin: 0.8rem auto 0; }
.section-subtitle { text-align: center; font-size: 0.95rem; color: #8B6E1A; letter-spacing: 2px; margin-bottom: 1.5rem; font-family: 'Noto Serif SC', sans-serif; }

/* ===== 展开/收起按钮 ===== */
.toggle-btn {
  display: flex; align-items: center; gap: 0.5rem;
  margin: 0 auto 1.8rem; padding: 0.6rem 1.6rem;
  background: linear-gradient(135deg, rgba(200,152,44,0.08), rgba(184,76,56,0.06));
  border: 1px solid rgba(200,152,44,0.25); border-radius: 30px;
  cursor: pointer; transition: all 0.4s ease;
  font-family: 'Noto Serif SC', sans-serif;
  color: #8B6E1A; font-size: 0.9rem; letter-spacing: 2px;
}
.toggle-btn:hover {
  background: linear-gradient(135deg, rgba(200,152,44,0.15), rgba(184,76,56,0.1));
  border-color: #C8982C; color: #B84C38;
  box-shadow: 0 4px 16px rgba(200,152,44,0.15);
}
.toggle-btn.active { color: #B84C38; }
.toggle-icon { font-family: 'Noto Serif SC', sans-serif; font-weight: bold; }
.toggle-arrow { transition: transform 0.4s ease; }
.toggle-arrow.up { transform: rotate(180deg); }

/* ===== 卷轴外壳 ===== */
.scroll-outer {
  position: relative; display: flex; flex-direction: column; align-items: center;
  perspective: 1200px;
}

/* ===== 卷轴杆 ===== */
.rod {
  display: flex; align-items: center; width: 100%; height: 30px; flex-shrink: 0;
  z-index: 10; position: relative;
  transition: opacity 0.4s ease;
}
.rod-bar {
  flex: 1; height: 16px; position: relative; border-radius: 3px;
  background: linear-gradient(180deg, #6b4e10, #8B6E1A 15%, #C8982C 35%, #E8C872 50%, #C8982C 65%, #8B6E1A 85%, #6b4e10);
  box-shadow: 0 3px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25);
}
.bar-highlight {
  position: absolute; top: 3px; left: 5%; right: 5%; height: 3px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  border-radius: 2px;
}
.rod-knob {
  width: 30px; height: 30px; flex-shrink: 0; position: relative;
  background: radial-gradient(circle at 38% 32%, #E8C872, #C8982C 35%, #8B6E1A 75%, #6b4e10 100%);
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(0,0,0,0.35), inset 0 1px 2px rgba(255,255,255,0.35);
}
.knob-face {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 12px; height: 12px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #C8982C, #6b4e10 80%);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1);
}
/* 上轴下方纸卷堆积感 */
.paper-bulk {
  position: absolute; bottom: -6px; left: 20px; right: 20px; height: 8px;
  background: radial-gradient(ellipse at 50% 0%, rgba(200,180,140,0.5), rgba(200,180,140,0) 70%);
  border-radius: 0 0 50% 50%;
  pointer-events: none; opacity: 0.7;
}

/* ===== 宣纸舞台 ===== */
.paper-stage {
  width: 100%; position: relative; overflow: hidden;
  max-height: 0;
  transition: max-height 3.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.scroll-outer.expanded .paper-stage {
  max-height: 10000px;
}
.scroll-outer.auto-expanded .paper-stage {
  max-height: 10000px;
}

/* 展开时的卷曲阴影 — 跟随纸前沿 */
.paper-curl-shadow {
  position: absolute; bottom: 0; left: 0; right: 0; height: 40px; z-index: 20;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0.1) 100%);
  pointer-events: none;
  opacity: 1;
  transition: opacity 1s ease 3.2s;
}
.scroll-outer.expanded .paper-curl-shadow { opacity: 0; }

/* ===== 宣纸本体（古风卷轴背景） ===== */
.paper-scroll {
  position: relative;
  background: url('/picture/古风卷轴.webp') center top / cover no-repeat;
  border-left: 3px solid rgba(139,110,26,0.1);
  border-right: 3px solid rgba(139,110,26,0.1);
  padding: 0;
}
.paper-scroll::before {
  content: ''; position: absolute; inset: 0;
  background: rgba(249,243,227,0.78);
  z-index: 0;
}
.paper-grain { display: none; }
.paper-edge-l { position: absolute; top: 0; bottom: 0; left: 0; width: 28px; background: linear-gradient(90deg, rgba(139,110,26,0.05), transparent); pointer-events: none; z-index: 1; }
.paper-edge-r { position: absolute; top: 0; bottom: 0; right: 0; width: 28px; background: linear-gradient(-90deg, rgba(139,110,26,0.05), transparent); pointer-events: none; z-index: 1; }

.ink-mountains { display: none; }

/* ===== 下轴初始隐藏，展开后渐显 ===== */
.rod-bottom {
  opacity: 0; transform: translateY(-10px);
  transition: opacity 0.6s ease 3s, transform 0.6s ease 3s;
}
.scroll-outer.expanded .rod-bottom,
.scroll-outer.auto-expanded .rod-bottom {
  opacity: 1; transform: translateY(0);
}

/* ===== 朝代块 ===== */
.era-block {
  position: relative; z-index: 2;
  padding: 1.8rem 2.5rem 2rem;
  opacity: 0; transform: translateY(20px);
}
.era-block.revealed {
  animation: eraReveal 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes eraReveal {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 墨迹分隔 */
.ink-brush-divider { margin: 0 0 1.2rem; }
.ink-brush-divider svg { display: block; width: 100%; height: 16px; }

/* 印章 + 年代 */
.era-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.8rem; }
.seal-stamp {
  width: 52px; height: 52px; flex-shrink: 0;
  border: 2px solid #B84C38; border-radius: 3px;
  display: flex; align-items: center; justify-content: center;
  position: relative; transform: rotate(-3deg);
}
.seal-stamp::before { content: ''; position: absolute; inset: 3px; border: 1px solid rgba(184,76,56,0.3); border-radius: 2px; }
.seal-stamp span {
  font-size: 1rem; font-family: 'Noto Serif SC', sans-serif;
  color: #B84C38; writing-mode: vertical-rl; letter-spacing: 2px; line-height: 1;
}
.era-line-area { flex: 1; }
.era-line-area h3 {
  font-size: 1.1rem; font-family: 'Noto Serif SC', sans-serif;
  color: #2d1a12; letter-spacing: 3px;
}
.era-dates { font-size: 0.72rem; color: #8B6E1A; letter-spacing: 2px; font-family: 'Noto Serif SC', sans-serif; }
.era-line-area::after { content: ''; display: block; margin-top: 0.4rem; height: 1px; background: linear-gradient(90deg, rgba(139,110,26,0.18), transparent 70%); }

.era-summary { font-size: 0.85rem; line-height: 1.85; color: #555; margin-bottom: 1.2rem; font-family: 'Noto Serif SC', sans-serif; letter-spacing: 0.5px; }

/* ===== 事件卡 ===== */
.event-card {
  display: flex; gap: 1.2rem; background: rgba(255,255,255,0.45);
  border: 1px solid rgba(139,110,26,0.08); border-radius: 10px;
  overflow: hidden; transition: all 0.35s ease;
}
.event-card:hover { border-color: rgba(200,152,44,0.2); box-shadow: 0 5px 18px rgba(0,0,0,0.04); background: rgba(255,255,255,0.6); }

.event-img-wrap {
  width: 190px; min-height: 140px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;
}
.event-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.event-card:hover .event-img { transform: scale(1.05); }
.img-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
.ph-icon { font-size: 1.8rem; opacity: 0.6; }
.ph-label { font-size: 0.7rem; color: rgba(255,255,255,0.7); letter-spacing: 2px; font-family: 'Noto Serif SC', sans-serif; }

.event-info { flex: 1; padding: 0.8rem 1rem; display: flex; flex-direction: column; justify-content: center; }
.event-info h4 { font-size: 0.95rem; font-family: 'Noto Serif SC', sans-serif; color: #2d1a12; letter-spacing: 2px; margin-bottom: 0.35rem; }
.event-info p { font-size: 0.8rem; line-height: 1.7; color: #666; margin-bottom: 0.5rem; }
.tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.tag { padding: 0.1rem 0.4rem; background: rgba(139,110,26,0.06); color: #8B6E1A; border-radius: 8px; font-size: 0.6rem; border: 1px solid rgba(139,110,26,0.1); letter-spacing: 1px; }

/* 卷末印章 */
.scroll-finale { display: flex; justify-content: center; padding: 2.2rem 0 2.8rem; position: relative; z-index: 2; }
.finale-seal {
  width: 72px; height: 72px; border: 3px solid #B84C38; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  position: relative; transform: rotate(-5deg); opacity: 0.6;
}
.finale-seal::before { content: ''; position: absolute; inset: 4px; border: 1.5px solid rgba(184,76,56,0.35); border-radius: 50%; }
.finale-seal span { font-size: 0.78rem; font-family: 'Noto Serif SC', sans-serif; color: #B84C38; writing-mode: vertical-rl; letter-spacing: 3px; }

/* ===== 通关文牒 ===== */
.passport-section {
  background: radial-gradient(ellipse at 30% 20%, rgba(200,152,44,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(184,76,56,0.04) 0%, transparent 50%), linear-gradient(180deg, #f5f0e8, #efe6d3, #f5f0e8);
  padding: 4rem 2rem;
}
.passport-inner { max-width: 1100px; margin: 0 auto; }
.passport-header { text-align: center; margin-bottom: 3rem; }
.passport-badge { display: inline-block; padding: 0.3rem 1.2rem; background: linear-gradient(135deg, #B84C38, #C8982C); color: white; border-radius: 20px; font-size: 0.75rem; letter-spacing: 3px; font-family: 'Noto Serif SC', sans-serif; margin-bottom: 0.8rem; }
.passport-title { font-size: 2.2rem; font-family: 'Noto Serif SC', sans-serif; color: #2d1a12; letter-spacing: 4px; margin-bottom: 0.5rem; }
.passport-title::after { content: ''; display: block; width: 60px; height: 3px; background: linear-gradient(90deg, transparent, #C8982C, transparent); margin: 0.8rem auto 0; }
.passport-subtitle { font-size: 0.95rem; color: #8B6E1A; letter-spacing: 2px; font-family: 'Noto Serif SC', sans-serif; }
.passport-intro { display: flex; gap: 2.5rem; align-items: flex-start; margin-bottom: 3rem; }
.passport-text { flex: 1; }
.passport-text p { font-size: 0.95rem; line-height: 1.9; color: #555; margin-bottom: 1rem; letter-spacing: 1px; font-family: 'Noto Serif SC', sans-serif; text-indent: 2em; }
.passport-image-slot { width: 320px; flex-shrink: 0; }
.passport-img { width: 100%; height: 220px; object-fit: cover; border-radius: 14px; border: 2px solid rgba(200,152,44,0.25); }
.passport-img-ph { width: 100%; height: 220px; border-radius: 14px; border: 2px dashed rgba(200,152,44,0.25); background: linear-gradient(135deg, rgba(200,152,44,0.04), rgba(184,76,56,0.04)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; transition: all 0.3s ease; }
.passport-img-ph:hover { border-color: rgba(200,152,44,0.45); background: linear-gradient(135deg, rgba(200,152,44,0.08), rgba(184,76,56,0.06)); }
.pp-icon { font-size: 2.5rem; opacity: 0.6; }
.pp-text { font-size: 0.8rem; color: #8B6E1A; letter-spacing: 2px; font-family: 'Noto Serif SC', sans-serif; }
.pp-hint { font-size: 0.65rem; color: rgba(139,110,26,0.4); letter-spacing: 1px; font-family: 'Noto Serif SC', sans-serif; }
.passport-types { margin-bottom: 3rem; }
.types-title, .famous-title { text-align: center; font-size: 1.4rem; font-family: 'Noto Serif SC', sans-serif; color: #B84C38; letter-spacing: 3px; margin-bottom: 1.5rem; }
.types-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem; }
.type-card { background: white; border-radius: 14px; padding: 1.5rem; text-align: center; border: 1px solid rgba(200,152,44,0.1); transition: all 0.4s ease; }
.type-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); border-color: rgba(200,152,44,0.25); }
.type-icon { font-size: 2.2rem; margin-bottom: 0.8rem; }
.type-card h4 { font-size: 1.1rem; font-family: 'Noto Serif SC', sans-serif; color: #2d1a12; letter-spacing: 2px; margin-bottom: 0.3rem; }
.type-era { font-size: 0.7rem; color: #B84C38; letter-spacing: 1px; font-family: 'Noto Serif SC', sans-serif; }
.type-card p { font-size: 0.82rem; line-height: 1.7; color: #666; margin-top: 0.6rem; }
.famous-list { display: flex; flex-direction: column; gap: 1.2rem; }
.famous-item { display: flex; gap: 1.2rem; align-items: flex-start; background: white; border-radius: 14px; padding: 1.5rem; border: 1px solid rgba(200,152,44,0.1); transition: all 0.4s ease; }
.famous-item:hover { transform: translateX(4px); box-shadow: 0 6px 20px rgba(0,0,0,0.06); border-color: rgba(200,152,44,0.25); }
.famous-icon { font-size: 2rem; flex-shrink: 0; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: rgba(200,152,44,0.08); border-radius: 12px; }
.famous-body h4 { font-size: 1.1rem; font-family: 'Noto Serif SC', sans-serif; color: #2d1a12; letter-spacing: 2px; }
.famous-era { font-size: 0.7rem; color: #B84C38; letter-spacing: 1px; font-family: 'Noto Serif SC', sans-serif; }
.famous-body p { font-size: 0.85rem; line-height: 1.7; color: #666; margin-top: 0.4rem; }

/* ===== 底部 ===== */
.summary-section { max-width: 800px; margin: 0 auto; padding: 2rem 2rem 4rem; }
.summary-card { background: linear-gradient(135deg, #3a2a10 0%, #6b4e10 100%); border-radius: 20px; padding: 3rem; text-align: center; color: white; position: relative; overflow: hidden; }
.summary-card::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent 0px, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 60px); }
.summary-icon { font-size: 3rem; margin-bottom: 1rem; position: relative; }
.summary-card h3 { font-size: 1.8rem; font-family: 'Noto Serif SC', sans-serif; letter-spacing: 4px; margin-bottom: 1rem; position: relative; }
.summary-card p { font-size: 1rem; line-height: 1.8; opacity: 0.9; position: relative; max-width: 600px; margin: 0 auto 2rem; }
.summary-stats { display: flex; justify-content: center; gap: 3rem; position: relative; }
.stat { display: flex; flex-direction: column; gap: 0.3rem; }
.stat-num { font-size: 2rem; font-weight: bold; color: #C8982C; }
.stat-label { font-size: 0.8rem; opacity: 0.7; }

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .hero-banner { min-height: 360px; height: 50vh; }
  .hero-banner::after { margin: 0.8rem; }
  .hero-content h1 { font-size: 6rem; letter-spacing: 8px; }
  .hero-content h1::before, .hero-content h1::after { font-size: 1.2rem; margin: 0 0.4rem; }
  .hero-content p { font-size: 1rem; letter-spacing: 3px; }
  .hero-content p::before, .hero-content p::after { width: 24px; margin: 0 0.5rem; }
  .scroll-section { padding: 2rem 1rem; }
  .section-title { font-size: 1.8rem; }
  .era-block { padding: 1.5rem 1.2rem; }
  .seal-stamp { width: 40px; height: 40px; }
  .seal-stamp span { font-size: 0.8rem; }
  .event-card { flex-direction: column; }
  .event-img-wrap { width: 100%; min-height: 130px; }
  .event-info { padding: 0.8rem 1rem; }
  .passport-section { padding: 2rem 1rem; }
  .passport-title { font-size: 1.6rem; }
  .passport-intro { flex-direction: column; }
  .passport-image-slot { width: 100%; }
  .passport-img { height: 180px; }
  .types-grid { grid-template-columns: repeat(2, 1fr); }
  .famous-item { flex-direction: column; align-items: center; text-align: center; }
  .summary-card { padding: 2rem 1.5rem; }
  .summary-stats { gap: 1.5rem; }
  .stat-num { font-size: 1.5rem; }
  .ink-dot, .float-char { display: none; }
}
@media (max-width: 480px) { .types-grid { grid-template-columns: 1fr; } }

/* ===== 帧 ===== */
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounce { 0%, 100% { transform: rotate(45deg) translateY(0); } 50% { transform: rotate(45deg) translateY(6px); } }

/* ===== 墨迹粒子 ===== */
.ink-particles {
  position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;
}
.ink-dot {
  position: absolute; border-radius: 50%;
  background: radial-gradient(circle, rgba(200,152,44,0.5) 0%, rgba(139,110,26,0.15) 60%, transparent 100%);
  animation: inkFloat linear infinite;
  opacity: 0;
}
.ink-dot-1  { width: 6px;  height: 6px;  left: 8%;  top: 20%; animation-duration: 18s; animation-delay: 0s; }
.ink-dot-2  { width: 4px;  height: 4px;  left: 15%; top: 60%; animation-duration: 22s; animation-delay: 1.5s; }
.ink-dot-3  { width: 8px;  height: 8px;  left: 25%; top: 35%; animation-duration: 16s; animation-delay: 3s; }
.ink-dot-4  { width: 3px;  height: 3px;  left: 32%; top: 75%; animation-duration: 25s; animation-delay: 0.8s; }
.ink-dot-5  { width: 5px;  height: 5px;  left: 40%; top: 15%; animation-duration: 20s; animation-delay: 4s; }
.ink-dot-6  { width: 7px;  height: 7px;  left: 50%; top: 50%; animation-duration: 17s; animation-delay: 2s; }
.ink-dot-7  { width: 4px;  height: 4px;  left: 58%; top: 80%; animation-duration: 23s; animation-delay: 5s; }
.ink-dot-8  { width: 6px;  height: 6px;  left: 65%; top: 25%; animation-duration: 19s; animation-delay: 1s; }
.ink-dot-9  { width: 3px;  height: 3px;  left: 72%; top: 55%; animation-duration: 21s; animation-delay: 3.5s; }
.ink-dot-10 { width: 5px;  height: 5px;  left: 80%; top: 40%; animation-duration: 24s; animation-delay: 0.5s; }
.ink-dot-11 { width: 4px;  height: 4px;  left: 88%; top: 70%; animation-duration: 15s; animation-delay: 2.5s; }
.ink-dot-12 { width: 6px;  height: 6px;  left: 95%; top: 30%; animation-duration: 26s; animation-delay: 4.5s; }
.ink-dot-13 { width: 3px;  height: 3px;  left: 12%; top: 45%; animation-duration: 14s; animation-delay: 6s; }
.ink-dot-14 { width: 5px;  height: 5px;  left: 45%; top: 65%; animation-duration: 20s; animation-delay: 1.2s; }
.ink-dot-15 { width: 4px;  height: 4px;  left: 75%; top: 10%; animation-duration: 18s; animation-delay: 3.8s; }
.ink-dot-16 { width: 7px;  height: 7px;  left: 35%; top: 85%; animation-duration: 22s; animation-delay: 5.5s; }
.ink-dot-17 { width: 3px;  height: 3px;  left: 55%; top: 42%; animation-duration: 16s; animation-delay: 2.2s; }
.ink-dot-18 { width: 5px;  height: 5px;  left: 20%; top: 90%; animation-duration: 19s; animation-delay: 0.3s; }
.ink-dot-19 { width: 4px;  height: 4px;  left: 68%; top: 58%; animation-duration: 21s; animation-delay: 4.2s; }
.ink-dot-20 { width: 6px;  height: 6px;  left: 92%; top: 18%; animation-duration: 23s; animation-delay: 1.8s; }

@keyframes inkFloat {
  0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
  15%  { opacity: 0.7; }
  85%  { opacity: 0.3; }
  100% { opacity: 0; transform: translate(calc(var(--dx, 60px)), calc(var(--dy, -120px))) scale(1.2); }
}
.ink-dot-1  { --dx: 40px;   --dy: -80px; }
.ink-dot-2  { --dx: -30px;  --dy: -100px; }
.ink-dot-3  { --dx: 55px;   --dy: -90px; }
.ink-dot-4  { --dx: -45px;  --dy: -110px; }
.ink-dot-5  { --dx: 35px;   --dy: -70px; }
.ink-dot-6  { --dx: -50px;  --dy: -130px; }
.ink-dot-7  { --dx: 60px;   --dy: -85px; }
.ink-dot-8  { --dx: -25px;  --dy: -95px; }
.ink-dot-9  { --dx: 45px;   --dy: -115px; }
.ink-dot-10 { --dx: -40px;  --dy: -75px; }
.ink-dot-11 { --dx: 50px;   --dy: -105px; }
.ink-dot-12 { --dx: -35px;  --dy: -125px; }
.ink-dot-13 { --dx: 65px;   --dy: -80px; }
.ink-dot-14 { --dx: -55px;  --dy: -90px; }
.ink-dot-15 { --dx: 30px;   --dy: -100px; }
.ink-dot-16 { --dx: -60px;  --dy: -110px; }
.ink-dot-17 { --dx: 48px;   --dy: -95px; }
.ink-dot-18 { --dx: -42px;  --dy: -85px; }
.ink-dot-19 { --dx: 38px;   --dy: -120px; }
.ink-dot-20 { --dx: -48px;  --dy: -75px; }

/* ===== 飘散古文字 ===== */
.floating-chars {
  position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;
}
.float-char {
  position: absolute; font-family: 'Noto Serif SC', serif;
  font-size: 1.4rem; color: rgba(200,152,44,0.28); font-family: 'Ma Shan Zheng', cursive !important;
  animation: charDrift linear infinite;
  opacity: 0; writing-mode: vertical-rl;
}
.float-char-0  { left: 5%;  top: 10%; animation-duration: 10s; animation-delay: 0s;   font-size: 5rem; }
.float-char-1  { left: 12%; top: 70%; animation-duration: 12s; animation-delay: 2s;   font-size: 1.8rem; }
.float-char-2  { left: 22%; top: 30%; animation-duration: 9s;  animation-delay: 5s;   font-size: 4rem; }
.float-char-3  { left: 30%; top: 80%; animation-duration: 11s; animation-delay: 1s;   font-size: 2.2rem; }
.float-char-4  { left: 42%; top: 15%; animation-duration: 13s; animation-delay: 3s;   font-size: 5.5rem; }
.float-char-5  { left: 50%; top: 60%; animation-duration: 10s; animation-delay: 7s;   font-size: 2rem; }
.float-char-6  { left: 58%; top: 40%; animation-duration: 12s; animation-delay: 4s;   font-size: 4.2rem; }
.float-char-7  { left: 68%; top: 85%; animation-duration: 9s;  animation-delay: 6s;   font-size: 1.6rem; }
.float-char-8  { left: 75%; top: 20%; animation-duration: 11s; animation-delay: 0.5s; font-size: 3.5rem; }
.float-char-9  { left: 82%; top: 55%; animation-duration: 10s; animation-delay: 8s;   font-size: 5.2rem; }
.float-char-10 { left: 90%; top: 75%; animation-duration: 13s; animation-delay: 2.5s; font-size: 2rem; }
.float-char-11 { left: 18%; top: 50%; animation-duration: 10s; animation-delay: 9s;   font-size: 4.5rem; }
.float-char-12 { left: 35%; top: 25%; animation-duration: 11s; animation-delay: 1.5s; font-size: 1.8rem; }
.float-char-13 { left: 62%; top: 68%; animation-duration: 9s;  animation-delay: 4.5s; font-size: 3.8rem; }
.float-char-14 { left: 48%; top: 90%; animation-duration: 12s; animation-delay: 6.5s; font-size: 2.5rem; }
.float-char-15 { left: 85%; top: 35%; animation-duration: 10s; animation-delay: 3.5s; font-size: 4.8rem; }
.float-char-16 { left: 8%;  top: 45%; animation-duration: 11s; animation-delay: 1.2s; font-size: 2.8rem; }
.float-char-17 { left: 28%; top: 65%; animation-duration: 9s;  animation-delay: 5.5s; font-size: 5rem; }
.float-char-18 { left: 45%; top: 38%; animation-duration: 12s; animation-delay: 0.8s; font-size: 2rem; }
.float-char-19 { left: 55%; top: 78%; animation-duration: 10s; animation-delay: 3.2s; font-size: 4.2rem; }
.float-char-20 { left: 72%; top: 12%; animation-duration: 11s; animation-delay: 7.5s; font-size: 1.6rem; }
.float-char-21 { left: 38%; top: 52%; animation-duration: 9s;  animation-delay: 2.8s; font-size: 3.2rem; }
.float-char-22 { left: 15%; top: 88%; animation-duration: 12s; animation-delay: 4.2s; font-size: 2.4rem; }
.float-char-23 { left: 88%; top: 48%; animation-duration: 10s; animation-delay: 6.8s; font-size: 5rem; }
.float-char-24 { left: 3%;  top: 58%; animation-duration: 11s; animation-delay: 1.8s; font-size: 1.8rem; }
.float-char-25 { left: 65%; top: 22%; animation-duration: 9s;  animation-delay: 8.5s; font-size: 3.8rem; }
.float-char-26 { left: 52%; top: 45%; animation-duration: 12s; animation-delay: 0.3s; font-size: 2.6rem; }
.float-char-27 { left: 78%; top: 72%; animation-duration: 10s; animation-delay: 5.8s; font-size: 4.5rem; }
.float-char-28 { left: 25%; top: 18%; animation-duration: 11s; animation-delay: 3.8s; font-size: 1.6rem; }
.float-char-29 { left: 92%; top: 62%; animation-duration: 9s;  animation-delay: 7.2s; font-size: 4.8rem; }
.float-char-30 { left: 40%; top: 5%;  animation-duration: 12s; animation-delay: 2.2s; font-size: 2.2rem; }
.float-char-31 { left: 16%; top: 38%; animation-duration: 10s; animation-delay: 4.8s; font-size: 4rem; }
.float-char-32 { left: 2%;  top: 25%; animation-duration: 11s; animation-delay: 0.6s; font-size: 3.2rem; }
.float-char-33 { left: 20%; top: 82%; animation-duration: 9s;  animation-delay: 3.6s; font-size: 5.2rem; }
.float-char-34 { left: 33%; top: 12%; animation-duration: 12s; animation-delay: 6.2s; font-size: 1.8rem; }
.float-char-35 { left: 46%; top: 55%; animation-duration: 10s; animation-delay: 1.4s; font-size: 4.2rem; }
.float-char-36 { left: 57%; top: 32%; animation-duration: 11s; animation-delay: 5.2s; font-size: 2.4rem; }
.float-char-37 { left: 70%; top: 75%; animation-duration: 9s;  animation-delay: 2.4s; font-size: 5rem; }
.float-char-38 { left: 80%; top: 8%;  animation-duration: 12s; animation-delay: 7.8s; font-size: 2rem; }
.float-char-39 { left: 93%; top: 42%; animation-duration: 10s; animation-delay: 4.6s; font-size: 3.5rem; }
.float-char-40 { left: 10%; top: 62%; animation-duration: 11s; animation-delay: 8.2s; font-size: 2.5rem; }
.float-char-41 { left: 26%; top: 48%; animation-duration: 9s;  animation-delay: 0.2s; font-size: 4.8rem; }
.float-char-42 { left: 37%; top: 72%; animation-duration: 12s; animation-delay: 5.6s; font-size: 1.6rem; }
.float-char-43 { left: 60%; top: 18%; animation-duration: 10s; animation-delay: 3.4s; font-size: 3.8rem; }
.float-char-44 { left: 74%; top: 58%; animation-duration: 11s; animation-delay: 6.4s; font-size: 2.8rem; }
.float-char-45 { left: 86%; top: 28%; animation-duration: 9s;  animation-delay: 1.6s; font-size: 5.2rem; }
.float-char-46 { left: 4%;  top: 78%; animation-duration: 12s; animation-delay: 8.8s; font-size: 2rem; }
.float-char-47 { left: 50%; top: 5%;  animation-duration: 10s; animation-delay: 2.6s; font-size: 3.2rem; }

@keyframes charDrift {
  0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
  10%  { opacity: 1; }
  85%  { opacity: 0.6; }
  100% { opacity: 0; transform: translateY(-200px) rotate(10deg); }
}

/* ===== 烟雾效果 ===== */
.hero-mist {
  position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;
}
.mist {
  position: absolute; width: 120%; height: 60%;
  background: radial-gradient(ellipse at center, rgba(200,152,44,0.06) 0%, transparent 70%);
  animation: mistDrift ease-in-out infinite;
  opacity: 0;
}
.mist-1 { bottom: -10%; left: -10%; animation-duration: 15s; animation-delay: 0s; }
.mist-2 { bottom: 5%; left: -20%; animation-duration: 20s; animation-delay: 3s; }
.mist-3 { bottom: -5%; left: -5%; animation-duration: 18s; animation-delay: 6s; }

@keyframes mistDrift {
  0%   { opacity: 0; transform: translateX(-15%) translateY(10px); }
  25%  { opacity: 0.8; }
  50%  { opacity: 0.4; transform: translateX(10%) translateY(-10px); }
  75%  { opacity: 0.7; }
  100% { opacity: 0; transform: translateX(-15%) translateY(10px); }
}

/* ===== 历史长河流动背景 ===== */
.history-view {
  position: relative;
}
.history-view::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse at 10% 20%, rgba(184,76,56,0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(200,152,44,0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(139,110,26,0.02) 0%, transparent 60%);
  animation: bgPulse 12s ease-in-out infinite;
}
@keyframes bgPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ===== 印章盖下动画 ===== */
.seal-stamp {
  animation: sealStamp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.era-block.revealed .seal-stamp {
  animation: sealStamp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes sealStamp {
  0%   { transform: rotate(-3deg) scale(1.8); opacity: 0; }
  60%  { transform: rotate(-3deg) scale(0.95); opacity: 1; }
  100% { transform: rotate(-3deg) scale(1); opacity: 1; }
}

/* ===== 事件卡入场 ===== */
.era-block.revealed .event-card {
  animation: cardSlideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}
@keyframes cardSlideIn {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>
