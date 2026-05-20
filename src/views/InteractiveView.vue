<template>
  <div class="interactive-view">
    <section class="hero-banner">
      <div class="hero-content">
        <h1>趣味互动专区</h1>
        <p class="hero-sub">探索丝路，寓教于乐</p>
      </div>
      <div class="hero-wave"></div>
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
      <div class="poetry-cards">
        <div v-for="(poem, pIdx) in poems" :key="pIdx" class="poem-card">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
  { lines: ['渭城朝雨浥轻尘', '客舍青青柳色新', '劝君更尽一杯酒', '西出阳关无故人'], author: '王维《送元二使安西》' },
  { lines: ['黄河远上白云间', '一片孤城万仞山', '羌笛何须怨杨柳', '春风不度玉门关'], author: '王之涣《凉州词》' },
  { lines: ['明月出天山', '苍茫云海间', '长风几万里', '吹度玉门关'], author: '李白《关山月》' }
]

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
  height: 280px;
  background: linear-gradient(135deg, #D4AF37 0%, #8B0000 50%, #2F4F4F 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-content { text-align: center; color: #fff; z-index: 1; }

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

.section-title {
  text-align: center;
  font-family: 'SimSun', cursive;
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
  font-family: 'Georgia', serif;
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
.ph-text { font-size: 0.8rem; color: #aaa; font-family: 'SimSun', cursive; }

.card-body {
  padding: 1.5rem;
}

.question-text {
  font-family: 'SimSun', cursive;
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
  font-family: 'SimSun', cursive;
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
  font-family: 'SimSun', cursive;
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
  font-family: 'SimSun', cursive;
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

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.poetry-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2rem 3rem;
}

.poetry-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.poem-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.12);
  text-align: center;
  transition: all 0.3s ease;
}

.poem-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
}

.poem-line {
  font-family: 'SimSun', cursive;
  font-size: 1.05rem;
  color: #333;
  line-height: 2;
  margin: 0;
  text-indent: 0;
}

.poem-author {
  margin-top: 0.8rem;
  font-size: 0.8rem;
  color: #999;
  text-indent: 0;
}

.guestbook-section {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.guestbook-form {
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.12);
  margin-top: 1.5rem;
  margin-bottom: 2rem;
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
  font-family: 'SimSun', cursive;
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
  font-family: 'SimSun', cursive;
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
  background: #fff;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-left: 4px solid #D4AF37;
  transition: all 0.3s ease;
}

.guest-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  transform: translateX(4px);
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
  font-family: 'SimSun', cursive;
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
  font-family: 'SimSun', cursive;
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
  padding: 2.5rem 1rem;
  color: #ccc;
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
    grid-template-columns: 1fr;
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
}
</style>
