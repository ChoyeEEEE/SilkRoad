<template>
  <div class="interactive-view">
    <section class="hero-banner">
      <img src="/picture/interactive-hero.jpg" alt="互动专区" class="hero-bg-img" draggable="false" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>趣味互动专区</h1>
        <p class="hero-sub">探索丝路，寓教于乐</p>
      </div>
      <div class="hero-gradient-bottom"></div>
    </section>

    <section class="quiz-section">
      <h2 class="section-title">丝路知识小问答</h2>
      <p class="section-desc">共 {{ questions.length }} 道题，点击卡片选择答案</p>

      <div class="quiz-carousel">
        <button class="nav-btn prev" @click="prevQuestion" :disabled="currentIndex === 0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div class="card-wrapper">
          <div class="quiz-card" :key="currentIndex">
            <div class="card-header">
              <span class="card-index">{{ currentIndex + 1 }} / {{ questions.length }}</span>
              <span class="card-score">得分：{{ score }}</span>
            </div>

            <div class="card-image">
              <div class="image-placeholder">
                <span class="ph-icon">{{ currentQuestion.icon }}</span>
                <span class="ph-text">{{ currentQuestion.category }}</span>
              </div>
            </div>

            <div class="card-body">
              <h3 class="question-text">{{ currentQuestion.question }}</h3>

              <div class="options-grid">
                <button
                  v-for="(option, idx) in currentQuestion.options"
                  :key="idx"
                  class="option-btn"
                  :class="getOptionClass(idx)"
                  @click="selectAnswer(idx)"
                  :disabled="answered"
                >
                  <span class="option-letter">{{ ['A', 'B', 'C', 'D'][idx] }}</span>
                  <span class="option-text">{{ option }}</span>
                </button>
              </div>

              <transition name="feedback">
                <div v-if="answered" class="feedback" :class="isCorrect ? 'correct' : 'wrong'">
                  <span class="feedback-icon">{{ isCorrect ? '🎉' : '📖' }}</span>
                  <div class="feedback-text">
                    <p v-if="isCorrect" class="feedback-main">答对了，你真棒！</p>
                    <template v-else>
                      <p class="feedback-main">答错了</p>
                      <p class="feedback-answer">正确答案：{{ ['A', 'B', 'C', 'D'][currentQuestion.answer] }}. {{ currentQuestion.options[currentQuestion.answer] }}</p>
                    </template>
                  </div>
                </div>
              </transition>
            </div>

            <div class="card-footer">
              <button class="next-btn" @click="nextQuestion" v-if="answered && currentIndex < questions.length - 1">
                下一题 →
              </button>
              <div class="result-summary" v-if="answered && currentIndex === questions.length - 1">
                <p>全部答完！最终得分：<strong>{{ score }} / {{ questions.length }}</strong></p>
                <button class="restart-btn" @click="restart">重新开始</button>
              </div>
            </div>
          </div>
        </div>

        <button class="nav-btn next" @click="nextQuestion" :disabled="currentIndex === questions.length - 1 && answered">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div class="progress-dots">
        <span
          v-for="(_, idx) in questions"
          :key="idx"
          class="dot"
          :class="{ active: idx === currentIndex, answered: userAnswers[idx] !== undefined, correct: userAnswers[idx] !== undefined && userAnswers[idx] === questions[idx]!.answer, wrong: userAnswers[idx] !== undefined && userAnswers[idx] !== questions[idx]!.answer }"
          @click="goToQuestion(idx)"
        ></span>
      </div>
    </section>

    <section class="poetry-section">
      <h2 class="section-title">丝路诗词合集</h2>
      <p class="section-desc">点击卡片，探索诗词与丝绸之路的故事</p>
      <div class="poetry-cards">
        <div v-for="(poem, pIdx) in poems" :key="pIdx" class="poem-card" @click="openPoemLightbox(poem)">
          <div class="poem-img">
            <img :src="poem.img" :alt="poem.author" />
            <div class="poem-img-overlay">
              <span class="zoom-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
              </span>
            </div>
          </div>
          <div class="poem-content">
            <p class="poem-line" v-for="line in poem.lines" :key="line">{{ line }}</p>
          </div>
          <p class="poem-author">—— {{ poem.author }}</p>
        </div>
      </div>
    </section>

    <section class="guestbook-section">
      <h2 class="section-title">游客寄语</h2>
      <p class="section-desc">您的足迹，丝路的记录。欢迎留下您的故事。</p>

      <div class="guestbook-form">
        <div class="form-row">
          <div class="form-field">
            <label>您的昵称</label>
            <input v-model="guestName" type="text" placeholder="请输入昵称" maxlength="20" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-field full">
            <label>留下寄语</label>
            <textarea v-model="guestMessage" placeholder="写下您对丝路的感想..." maxlength="200" rows="3"></textarea>
            <span class="char-count">{{ guestMessage.length }}/200</span>
          </div>
        </div>
        <button class="submit-btn" @click="addGuestbook" :disabled="!guestName.trim() || !guestMessage.trim()">
          <span>✉️ 发布寄语</span>
        </button>
      </div>

      <div class="guestbook-list" v-if="guestbook.length > 0">
        <transition-group name="card-list" tag="div" class="list-inner">
          <div v-for="item in guestbook" :key="item.id" class="guest-card">
            <div class="guest-card-header">
              <div class="guest-avatar">{{ item.name.charAt(0) }}</div>
              <div class="guest-info">
                <span class="guest-name">{{ item.name }}</span>
                <span class="guest-time">{{ item.time }}</span>
              </div>
              <button class="delete-btn" @click="deleteGuestbook(item.id)" title="删除">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>
              </button>
            </div>
            <div class="guest-card-body">
              <p>{{ item.message }}</p>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="guestbook-empty" v-else>
        <span class="empty-icon">🪶</span>
        <p>还没有留言，成为第一个留下足迹的人吧！</p>
      </div>
    </section>

    <transition name="lightbox-fade">
      <div v-if="poemLightbox.visible" class="lightbox-overlay" @click.self="closePoemLightbox">
        <div class="lightbox-container">
          <button class="lightbox-close" @click="closePoemLightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="lightbox-content">
            <div class="lightbox-img-wrap" v-if="poemLightbox.img">
              <img :src="poemLightbox.img" :alt="poemLightbox.author" />
            </div>
            <div class="lightbox-info">
              <div class="lightbox-poem-lines">
                <p v-for="line in poemLightbox.lines" :key="line">{{ line }}</p>
              </div>
              <p class="lightbox-poem-author">{{ poemLightbox.author }}</p>
              <div class="lightbox-divider"></div>
              <p class="lightbox-detail">{{ poemLightbox.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

interface Question {
  question: string
  options: string[]
  answer: number
  icon: string
  category: string
}

const questions: Question[] = [
  {
    question: '丝绸之路的起点城市是哪里？',
    options: ['西安', '洛阳', '北京', '上海'],
    answer: 0,
    icon: '🏛️',
    category: '历史地理'
  },
  {
    question: '丝绸之路最初开辟于哪个朝代？',
    options: ['秦朝', '汉朝', '唐朝', '宋朝'],
    answer: 1,
    icon: '📜',
    category: '历史朝代'
  },
  {
    question: '哪位探险家被誉为"丝绸之路"的命名者？',
    options: ['马可·波罗', '张骞', '李希霍芬', '玄奘'],
    answer: 2,
    icon: '🧭',
    category: '历史人物'
  },
  {
    question: '敦煌莫高窟始建于哪个时期？',
    options: ['秦代', '西汉', '前秦/十六国', '唐代'],
    answer: 2,
    icon: '🖼️',
    category: '文化遗产'
  },
  {
    question: '丝绸之路上最重要的出口商品是？',
    options: ['瓷器', '丝绸', '茶叶', '香料'],
    answer: 1,
    icon: '🧵',
    category: '商贸物产'
  },
  {
    question: '嘉峪关位于今天的哪个省份？',
    options: ['陕西', '新疆', '甘肃', '宁夏'],
    answer: 2,
    icon: '🏯',
    category: '名城古迹'
  },
  {
    question: '以下哪位历史人物曾沿丝绸之路西行取经？',
    options: ['李白', '玄奘', '杜甫', '苏轼'],
    answer: 1,
    icon: '📖',
    category: '历史人物'
  },
  {
    question: '丝绸之路的"海上丝路"最远到达哪里？',
    options: ['日本', '印度', '非洲东海岸', '澳大利亚'],
    answer: 2,
    icon: '🚢',
    category: '历史地理'
  },
  {
    question: '以下哪种乐器是经丝绸之路传入中国的？',
    options: ['古筝', '琵琶', '笛子', '二胡'],
    answer: 1,
    icon: '🎵',
    category: '文化艺术'
  },
  {
    question: '吐鲁番以什么自然景观闻名？',
    options: ['月牙泉', '火焰山', '天山天池', '鸣沙山'],
    answer: 1,
    icon: '🏜️',
    category: '风光地貌'
  },
  {
    question: '古代丝路商队主要使用什么动物运输货物？',
    options: ['马', '骆驼', '驴', '大象'],
    answer: 1,
    icon: '🐫',
    category: '商贸交通'
  },
  {
    question: '"一带一路"倡议是哪一年提出的？',
    options: ['2010年', '2011年', '2013年', '2015年'],
    answer: 2,
    icon: '🌐',
    category: '现代发展'
  }
]

const currentIndex = ref(0)
const userAnswers = ref<(number | undefined)[]>(new Array(questions.length).fill(undefined))
const score = computed(() => userAnswers.value.filter((a, i) => a !== undefined && a === questions[i]!.answer).length)
const currentQuestion = computed(() => questions[currentIndex.value]!)
const answered = computed(() => userAnswers.value[currentIndex.value] !== undefined)
const isCorrect = computed(() => userAnswers.value[currentIndex.value] === currentQuestion.value.answer)

function selectAnswer(idx: number) {
  if (answered.value) return
  userAnswers.value[currentIndex.value] = idx
}

function getOptionClass(idx: number) {
  if (!answered.value) return ''
  const q = currentQuestion.value
  const ua = userAnswers.value[currentIndex.value]
  if (idx === q.answer) return 'correct'
  if (idx === ua && ua !== q.answer) return 'wrong'
  return 'disabled'
}

function prevQuestion() {
  if (currentIndex.value > 0) currentIndex.value--
}

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) currentIndex.value++
}

function goToQuestion(idx: number) {
  currentIndex.value = idx
}

function restart() {
  currentIndex.value = 0
  userAnswers.value = new Array(questions.length).fill(undefined)
}

const poems = [
  {
    lines: ['渭城朝雨浥轻尘', '客舍青青柳色新', '劝君更尽一杯酒', '西出阳关无故人'],
    author: '王维《送元二使安西》',
    img: '/picture/poem-yangguan.jpg',
    detail: '阳关位于今甘肃敦煌西南，是丝绸之路上的重要关隘。诗人在渭城（今西安）送别友人元二出使安西（今新疆库车），一场朝雨洗去了路上的轻尘，也映衬了离别的感伤。"西出阳关无故人"道出了丝路远行的孤寂——过了阳关便是茫茫戈壁，故人难再相见。此诗后来被谱为《阳关三叠》，成为中国最经典的送别曲。'
  },
  {
    lines: ['黄河远上白云间', '一片孤城万仞山', '羌笛何须怨杨柳', '春风不度玉门关'],
    author: '王之涣《凉州词》',
    img: '/picture/poem-liangzhou.jpg',
    detail: '凉州（今甘肃武威）是河西走廊的重镇，丝绸之路上的商贸枢纽。诗中描绘了黄河源头直入云霄、孤城矗立万仞山间的壮阔景象。玉门关是丝路南北两道的分界点，"春风不度"既是写实——塞外荒凉、春风难至，也暗喻朝廷恩泽难以惠及边关将士。羌笛声中的乡愁，是无数丝路守卫者的共同心声。'
  },
  {
    lines: ['明月出天山', '苍茫云海间', '长风几万里', '吹度玉门关'],
    author: '李白《关山月》',
    img: '/picture/poem-guanshan.jpg',
    detail: '天山横亘西域，是丝绸之路必经的天然屏障。李白以雄浑的笔触描绘了天山明月从云海中升起的壮丽画面，长风跨越万里吹过玉门关。这首诗借关山月色，抒发了戍边将士的思乡之情和对和平的渴望。天山南北两条丝路——天山北路和天山南路，曾是东西方文明交流的重要通道。'
  },
  {
    lines: ['秦时明月汉时关', '万里长征人未还', '但使龙城飞将在', '不教胡马度阴山'],
    author: '王昌龄《出塞》',
    img: '/picture/poem-chumo.jpg',
    detail: '阴山山脉是古代中原与北方游牧民族的天然分界线，也是丝绸之路北线的重要屏障。诗人感慨从秦汉以来，无数将士为了守卫这条通道而远征万里、埋骨他乡。"龙城飞将"指汉代名将李广，诗人盼望能有良将镇守边关，保障丝路畅通与国家安全。'
  },
  {
    lines: ['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼'],
    author: '王之涣《登鹳雀楼》',
    img: '/picture/poem-saiqu.jpg',
    detail: '鹳雀楼位于今山西永济，地处黄河东岸，是丝绸之路上东段的重要节点。诗人登楼远眺，黄河奔流入海、群山连绵尽收眼底。"欲穷千里目，更上一层楼"不仅是登高望远的写照，更象征着丝路开拓者不断探索、勇攀高峰的精神。这座楼见证了无数商旅从中原出发、踏上西行之路的壮志豪情。'
  },
  {
    lines: ['北风卷地白草折', '胡天八月即飞雪', '忽如一夜春风来', '千树万树梨花开'],
    author: '岑参《白雪歌送武判官归京》',
    img: '/picture/poem-dongtian.jpg',
    detail: '这首诗写于岑参在安西（今新疆库车）和北庭（今新疆吉木萨尔）任职期间。诗中描绘了西域八月飞雪的奇景——北风卷地、白草折断，一夜之间大雪覆盖了千万棵树木，如梨花盛开。武判官即将归京，诗人在风雪中设宴送别，展现了丝路边塞的壮美与艰辛。安西和北庭是唐朝经营西域的核心据点。'
  },
  {
    lines: ['月黑雁飞高', '单于夜遁逃', '欲将轻骑逐', '大雪满弓刀'],
    author: '卢纶《塞下曲》',
    img: '/picture/poem-saishang.jpg',
    detail: '塞下曲描绘的是边塞将士在月黑风高之夜追击敌军的场景。丝绸之路的畅通离不开强大的军事保障——汉唐两代都在沿线设置了完整的军事防御体系。从敦煌到楼兰、从玉门关到碎叶城，驻军屯田、烽燧相望，正是这些将士的守护，才使得驼队商旅能够安全往来于东西方之间。'
  },
  {
    lines: ['千里黄云白日曛', '北风吹雁雪纷纷', '莫愁前路无知己', '天下谁人不识君'],
    author: '高适《别董大》',
    img: '/picture/poem-zhengren.jpg',
    detail: '董大即董庭兰，唐代著名琴师。高适在边塞送别这位音乐家好友，写下了这首慷慨激昂的送别诗。丝绸之路不仅是贸易通道，更是文化传播的桥梁——琵琶、箜篌、胡琴等乐器沿丝路传入中国，与中原音乐融合，形成了丰富多彩的丝路音乐文化。"天下谁人不识君"正是丝路文化交流使艺术跨越国界的生动写照。'
  }
]

const poemLightbox = reactive({ visible: false, img: '', title: '', lines: '' as string[], author: '', detail: '' })

function openPoemLightbox(poem: typeof poems[number]) {
  poemLightbox.img = poem.img
  poemLightbox.title = poem.lines[0]
  poemLightbox.lines = poem.lines
  poemLightbox.author = poem.author
  poemLightbox.detail = poem.detail
  poemLightbox.visible = true
  document.body.style.overflow = 'hidden'
}

function closePoemLightbox() {
  poemLightbox.visible = false
  document.body.style.overflow = ''
}

function handlePoemKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closePoemLightbox()
}

onMounted(() => {
  document.addEventListener('keydown', handlePoemKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handlePoemKeydown)
})

interface GuestItem {
  id: number
  name: string
  message: string
  time: string
}

const STORAGE_KEY = 'silkroad_guestbook'

const guestName = ref('')
const guestMessage = ref('')
const guestbook = ref<GuestItem[]>(loadGuestbook())

function loadGuestbook(): GuestItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGuestbook() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(guestbook.value))
}

function addGuestbook() {
  const name = guestName.value.trim()
  const message = guestMessage.value.trim()
  if (!name || !message) return

  const now = new Date()
  const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  guestbook.value.unshift({ id: Date.now(), name, message, time })
  saveGuestbook()
  guestName.value = ''
  guestMessage.value = ''
}

function deleteGuestbook(id: number) {
  guestbook.value = guestbook.value.filter((item) => item.id !== id)
  saveGuestbook()
}
</script>

<style scoped>
.interactive-view {
  min-height: 100vh;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  height: 650px;
  overflow: hidden;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  animation: heroZoom 20s ease-in-out infinite alternate;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.25) 100%
  );
  z-index: 1;
}

.hero-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;
}

.hero-content h1 {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 2.8rem;
  color: #fff;
  letter-spacing: 8px;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
  animation: heroFadeIn 1s ease-out;
}

.hero-sub {
  margin-top: 0.6rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.05rem;
  letter-spacing: 3px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-gradient-bottom {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(to bottom, transparent, #F5DEB3);
  z-index: 3;
}

.section-title {
  text-align: center;
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 1.8rem;
  color: #8B0000;
  margin-bottom: 0.5rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #2F4F4F;
  margin: 0.6rem auto 0;
  border-radius: 2px;
}

.section-desc {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.quiz-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.quiz-carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.nav-btn {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #D4AF37;
  background: #fff;
  color: #D4AF37;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #D4AF37;
  color: #fff;
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.card-wrapper {
  flex: 1;
  min-width: 0;
}

.quiz-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.15);
  animation: cardEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardEnter {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.04), rgba(212, 175, 55, 0.06));
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.card-index {
  font-size: 0.85rem;
  color: #8B0000;
  font-weight: bold;
  font-family: 'Noto Serif SC', sans-serif;
}

.card-score {
  font-size: 0.85rem;
  color: #D4AF37;
  font-weight: bold;
}

.card-image {
  width: 100%;
  height: 160px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(245, 222, 179, 0.5), rgba(232, 224, 208, 0.7));
  border-bottom: 2px dashed rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.ph-icon { font-size: 3rem; }
.ph-text { font-size: 0.8rem; color: #aaa; font-family: 'Noto Serif SC', sans-serif; }

.card-body {
  padding: 1.5rem;
}

.question-text {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 1.2rem;
  line-height: 1.6;
}

.options-grid {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.option-btn:hover:not(:disabled) {
  border-color: #D4AF37;
  background: rgba(212, 175, 55, 0.05);
  transform: translateX(4px);
}

.option-btn.correct {
  border-color: #2E7D32;
  background: rgba(46, 125, 50, 0.08);
  animation: correctPop 0.4s ease;
}

.option-btn.wrong {
  border-color: #C62828;
  background: rgba(198, 40, 40, 0.06);
  animation: wrongShake 0.4s ease;
}

.option-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-letter {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(139, 0, 0, 0.08);
  color: #8B0000;
  font-weight: bold;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-btn.correct .option-letter {
  background: #2E7D32;
  color: #fff;
}

.option-btn.wrong .option-letter {
  background: #C62828;
  color: #fff;
}

.option-text {
  font-size: 0.95rem;
  color: #444;
}

.feedback {
  margin-top: 1.2rem;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.feedback.correct {
  background: rgba(46, 125, 50, 0.08);
  border: 1px solid rgba(46, 125, 50, 0.2);
}

.feedback.wrong {
  background: rgba(198, 40, 40, 0.05);
  border: 1px solid rgba(198, 40, 40, 0.15);
}

.feedback-icon { font-size: 1.8rem; }

.feedback-main {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.feedback.correct .feedback-main { color: #2E7D32; }
.feedback.wrong .feedback-main { color: #C62828; }

.feedback-answer {
  font-size: 0.9rem;
  color: #666;
}

.feedback-enter-active { animation: feedbackIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.feedback-leave-active { animation: feedbackIn 0.3s ease reverse; }

.card-footer {
  padding: 0 1.5rem 1.5rem;
  text-align: center;
}

.next-btn {
  padding: 0.7rem 2rem;
  background: linear-gradient(135deg, #8B0000, #D4AF37);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-family: 'Noto Serif SC', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 2px;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 0, 0, 0.3);
}

.result-summary p {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Noto Serif SC', sans-serif;
}

.result-summary strong {
  color: #D4AF37;
  font-size: 1.4rem;
}

.restart-btn {
  padding: 0.6rem 1.8rem;
  background: #2F4F4F;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 0.95rem;
  font-family: 'Noto Serif SC', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-btn:hover {
  background: #1a3333;
  transform: translateY(-2px);
}

.progress-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #D4AF37;
  transform: scale(1.3);
}

.dot.correct {
  background: #2E7D32;
}

.dot.wrong {
  background: #C62828;
}

@keyframes correctPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes wrongShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

@keyframes feedbackIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes heroZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.06); }
}

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.poetry-section {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 2rem 3rem;
}

.poetry-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.poem-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.12);
  text-align: center;
  transition: all 0.4s ease;
  cursor: pointer;
}

.poem-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: rgba(212, 175, 55, 0.3);
}

.poem-img {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.poem-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.poem-card:hover .poem-img img {
  transform: scale(1.08);
}

.poem-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.poem-card:hover .poem-img-overlay {
  opacity: 1;
}

.zoom-icon {
  transform: scale(0.6);
  transition: transform 0.3s ease;
}

.poem-card:hover .zoom-icon {
  transform: scale(1);
}

.poem-content {
  padding: 1rem 0.8rem 0.5rem;
}

.poem-line {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.8;
  margin: 0;
}

.poem-author {
  margin: 0;
  padding: 0.4rem 0.8rem 1rem;
  font-size: 0.75rem;
  color: #999;
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-container {
  position: relative;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #1a1a2e;
  border-radius: 16px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
  animation: lightboxIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-top: 3px solid #D4AF37;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(139, 0, 0, 0.8);
  transform: rotate(90deg);
}

.lightbox-content {
  display: flex;
  overflow: hidden;
  border-radius: 16px;
}

.lightbox-img-wrap {
  flex: 0 0 45%;
  max-height: 90vh;
  overflow: hidden;
}

.lightbox-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lightbox-info {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

.lightbox-poem-lines {
  text-align: center;
  margin-bottom: 0.8rem;
}

.lightbox-poem-lines p {
  font-family: 'Noto Serif SC', sans-serif;
  font-size: 1.2rem;
  color: #D4AF37;
  line-height: 2;
  margin: 0;
  letter-spacing: 2px;
}

.lightbox-poem-author {
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.2rem;
}

.lightbox-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 0 auto 1.2rem;
}

.lightbox-detail {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.9;
  text-align: justify;
}

.lightbox-fade-enter-active { transition: opacity 0.3s ease; }
.lightbox-fade-leave-active { transition: opacity 0.25s ease; }
.lightbox-fade-enter-from,
.lightbox-fade-leave-to { opacity: 0; }

@keyframes lightboxIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.guestbook-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  position: relative;
}

.guestbook-section::before {
  content: '🪶';
  position: absolute;
  top: 1rem;
  left: 2rem;
  font-size: 1.8rem;
  opacity: 0.12;
  pointer-events: none;
}

.guestbook-section::after {
  content: '✉';
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 1.8rem;
  opacity: 0.12;
  pointer-events: none;
}

.guestbook-form {
  background: linear-gradient(135deg, #fff 0%, rgba(255, 248, 231, 0.6) 100%);
  border-radius: 14px;
  padding: 1.8rem 2rem;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.18);
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.guestbook-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #D4AF37, #8B0000, #D4AF37);
  border-radius: 14px 14px 0 0;
}

.form-row {
  margin-bottom: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
}

.form-field label {
  font-size: 0.85rem;
  color: #8B4513;
  font-weight: bold;
  font-family: 'Noto Serif SC', sans-serif;
}

.form-field input,
.form-field textarea {
  border: 2px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  font-family: inherit;
  color: #333;
  background: rgba(245, 222, 179, 0.15);
  transition: all 0.3s ease;
  outline: none;
  resize: vertical;
}

.form-field input:focus,
.form-field textarea:focus {
  border-color: #D4AF37;
  background: rgba(245, 222, 179, 0.25);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.form-field input::placeholder,
.form-field textarea::placeholder {
  color: #ccc;
}

.char-count {
  position: absolute;
  bottom: 0.5rem;
  right: 0.8rem;
  font-size: 0.75rem;
  color: #bbb;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.8rem;
  background: linear-gradient(135deg, #8B0000, #D4AF37);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 0.95rem;
  font-family: 'Noto Serif SC', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 0, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.guestbook-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.list-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.guest-card {
  background: linear-gradient(135deg, #fff 0%, rgba(255, 248, 231, 0.4) 100%);
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.12);
  border-left: 4px solid #D4AF37;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.guest-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 100% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.guest-card:hover {
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
  border-left-color: #8B0000;
}

.guest-card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.guest-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37, #8B0000);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  font-family: 'Noto Serif SC', sans-serif;
  flex-shrink: 0;
}

.guest-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.guest-name {
  font-weight: bold;
  font-size: 0.95rem;
  color: #333;
  font-family: 'Noto Serif SC', sans-serif;
}

.guest-time {
  font-size: 0.75rem;
  color: #bbb;
}

.delete-btn {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: rgba(198, 40, 40, 0.08);
  color: #C62828;
}

.guest-card-body p {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
  text-indent: 0;
}

.guestbook-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #ccc;
  background: linear-gradient(135deg, rgba(255, 248, 231, 0.3), rgba(245, 222, 179, 0.2));
  border-radius: 14px;
  border: 2px dashed rgba(212, 175, 55, 0.2);
}

.empty-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.6rem;
}

.guestbook-empty p {
  font-size: 0.9rem;
  margin: 0;
  text-indent: 0;
}

.card-list-enter-active {
  animation: cardSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-list-leave-active {
  animation: cardSlideOut 0.3s ease;
}

@keyframes cardSlideIn {
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes cardSlideOut {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(60px) scale(0.9); }
}

@media (max-width: 768px) {
  .poetry-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .quiz-carousel {
    flex-direction: column;
  }

  .nav-btn.prev,
  .nav-btn.next {
    display: none;
  }

  .lightbox-content {
    flex-direction: column;
  }

  .lightbox-img-wrap {
    flex: none;
    max-height: 40vh;
  }

  .lightbox-info {
    padding: 1.5rem;
  }
}
</style>
