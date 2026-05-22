<template>
  <div class="trade-view">
    <section class="hero-banner">
      <div class="hero-bg-particles" aria-hidden="true">
        <span v-for="n in 16" :key="n" class="hero-particle" :class="'hp-' + n"></span>
      </div>
      <div class="hero-content">
        <div class="title-ornament top-ornament" aria-hidden="true">
          <span class="ornament-line"></span>
          <span class="ornament-diamond"></span>
          <span class="ornament-line"></span>
        </div>
        <h1>
          <span class="title-char" v-for="(ch, i) in '商贸物产'" :key="i"
                :style="{ animationDelay: i * 0.12 + 's' }">{{ ch }}</span>
        </h1>
        <p class="hero-sub">东西方的繁华交易 · 驼铃声中的财富传奇</p>
        <div class="title-ornament bottom-ornament" aria-hidden="true">
          <span class="ornament-line"></span>
          <span class="ornament-diamond"></span>
          <span class="ornament-line"></span>
        </div>
      </div>
      <div class="hero-scroll-hint" aria-hidden="true">
        <span class="scroll-text">向下探索</span>
        <span class="scroll-arrow"></span>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="stats-section" ref="statsRef">
      <div class="stats-container">
        <div class="stat-card" v-for="(stat, index) in statsData" :key="stat.label"
             :class="{ 'visible': statsVisible }"
             :style="{ animationDelay: index * 0.15 + 's' }">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-number">
            <span class="stat-value">{{ animatedStats[index] }}</span>
            <span class="stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- 贸易流动画 -->
    <section class="trade-flow-section" ref="flowRef">
      <div class="flow-bg-terrain" aria-hidden="true">
        <div class="terrain-mountains"></div>
        <div class="terrain-desert"></div>
      </div>
      <div class="flow-container">
        <h2 class="section-title" :class="{ 'visible': flowVisible }">
          <span class="title-deco-line"></span>
          贸易之路
          <span class="title-deco-line"></span>
        </h2>
        <p class="flow-subtitle" :class="{ 'visible': flowVisible }">千年丝路，驼铃声声，东西方物产在此交汇</p>

        <div class="trade-flow" :class="{ 'visible': flowVisible }">
          <!-- 左端点：长安 -->
          <div class="flow-endpoint flow-left">
            <div class="endpoint-glow" aria-hidden="true"></div>
            <div class="endpoint-icon-wrap">
              <div class="endpoint-icon">🏯</div>
            </div>
            <div class="endpoint-label">长安</div>
            <div class="endpoint-sub">丝绸之路起点</div>
          </div>

          <!-- SVG 路线主视觉 -->
          <div class="flow-track">
            <svg class="route-svg" viewBox="0 0 900 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#8B0000" />
                  <stop offset="30%" stop-color="#D4AF37" />
                  <stop offset="70%" stop-color="#D4AF37" />
                  <stop offset="100%" stop-color="#2F4F4F" />
                </linearGradient>
                <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(139,0,0,0.4)" />
                  <stop offset="50%" stop-color="rgba(212,175,55,0.5)" />
                  <stop offset="100%" stop-color="rgba(47,79,79,0.4)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <!-- 虚线路径图案 -->
                <pattern id="sandPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="rgba(212,175,55,0.15)" />
                  <circle cx="8" cy="8" r="0.5" fill="rgba(139,69,19,0.1)" />
                </pattern>
              </defs>

              <!-- 沙漠底纹区域 -->
              <path d="M60 200 C200 200, 250 100, 400 120 C550 140, 600 80, 840 120"
                    fill="none" stroke="url(#sandPattern)" stroke-width="80" opacity="0.4" />

              <!-- 路线光晕 -->
              <path class="route-glow-path" :d="routePathD"
                    fill="none" stroke="url(#routeGlow)" stroke-width="20"
                    filter="url(#softGlow)" opacity="0.3" />

              <!-- 主路线 -->
              <path class="route-main-path" :d="routePathD"
                    fill="none" stroke="url(#routeGrad)" stroke-width="3.5"
                    stroke-linecap="round" filter="url(#glow)"
                    :stroke-dasharray="routePathLength"
                    :stroke-dashoffset="flowVisible ? 0 : routePathLength" />

              <!-- 路线上的虚线装饰 -->
              <path class="route-dash-path" :d="routePathD"
                    fill="none" stroke="rgba(245,222,179,0.3)" stroke-width="1"
                    stroke-dasharray="8 12" />

              <!-- 沙尘粒子 -->
              <circle v-for="n in 12" :key="'dust-'+n"
                      :cx="80 + n * 65" :cy="140 + Math.sin(n * 1.3) * 50"
                      r="1.5" fill="rgba(139,69,19,0.3)"
                      :style="{ animationDelay: n * 0.4 + 's' }"
                      class="dust-particle" />

              <!-- 城市节点 -->
              <g v-for="(city, i) in routeCityData" :key="city.name"
                 class="city-node"
                 :transform="'translate(' + city.x + ',' + city.y + ')'"
                 @mouseenter="activeCity = i" @mouseleave="activeCity = -1">
                <!-- 城市光环 -->
                <circle :r="activeCity === i ? 24 : 18" fill="none"
                        :stroke="activeCity === i ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.15)'"
                        stroke-width="1" class="city-ring" />
                <circle :r="activeCity === i ? 16 : 12" fill="none"
                        :stroke="activeCity === i ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.25)'"
                        stroke-width="1" class="city-ring-inner" />
                <!-- 城市点 -->
                <circle :r="activeCity === i ? 9 : 6" fill="url(#routeGrad)" stroke="#fff" stroke-width="2"
                        filter="url(#glow)" class="city-dot-svg" />
                <!-- 城市名称 -->
                <text :y="city.labelAbove ? (activeCity === i ? -32 : -26) : (activeCity === i ? 38 : 32)"
                      text-anchor="middle"
                      class="city-label"
                      :fill="activeCity === i ? '#8B0000' : '#8B4513'"
                      :font-size="activeCity === i ? 15 : 13"
                      font-family="SimSun, serif" font-weight="bold">
                  {{ city.name }}
                </text>
                <text :y="city.labelAbove ? (activeCity === i ? -16 : -12) : (activeCity === i ? 52 : 46)"
                      text-anchor="middle"
                      class="city-sublabel"
                      :fill="activeCity === i ? '#6a5a4a' : '#8a7a6a'"
                      :font-size="activeCity === i ? 10 : 9"
                      font-family="SimSun, serif">
                  {{ city.sub }}
                </text>
              </g>

              <!-- 东→西 动态商品 -->
              <g v-for="(good, i) in eastGoods" :key="'ew-'+i">
                <text class="flow-good flow-good-east"
                      :style="{ animationDelay: i * 2.2 + 's', animationDuration: '8s' }">
                  <textPath href="#routePath" :startOffset="(i * 18) + '%'">
                    {{ good }}
                  </textPath>
                </text>
              </g>

              <!-- 西→东 动态商品 -->
              <g v-for="(good, i) in westGoods" :key="'we-'+i">
                <text class="flow-good flow-good-west"
                      :style="{ animationDelay: i * 2.5 + 1 + 's', animationDuration: '9s' }">
                  <textPath href="#routePath" :startOffset="(80 - i * 18) + '%'">
                    {{ good }}
                  </textPath>
                </text>
              </g>

              <!-- 骆驼商队 -->
              <g class="caravan-group" :class="{ 'moving': flowVisible }">
                <text class="caravan-camel" font-size="28">🐫</text>
                <text class="caravan-camel camel-2" font-size="22" x="24" y="4">🐫</text>
                <text class="caravan-camel camel-3" font-size="18" x="44" y="6">🐫</text>
              </g>

              <!-- 方向箭头 -->
              <g class="direction-arrows">
                <text x="200" y="80" font-size="10" fill="rgba(139,0,0,0.7)" font-family="SimSun, serif">
                  ← 西传
                </text>
                <text x="650" y="80" font-size="10" fill="rgba(47,79,79,0.7)" font-family="SimSun, serif">
                  东传 →
                </text>
              </g>
            </svg>

            <!-- 路线路径引用 -->
            <svg style="position:absolute;width:0;height:0">
              <defs>
                <path id="routePath" :d="routePathD" />
              </defs>
            </svg>
          </div>

          <!-- 右端点：罗马 -->
          <div class="flow-endpoint flow-right">
            <div class="endpoint-glow endpoint-glow-right" aria-hidden="true"></div>
            <div class="endpoint-icon-wrap">
              <div class="endpoint-icon">🏛️</div>
            </div>
            <div class="endpoint-label">罗马</div>
            <div class="endpoint-sub">丝绸之路终点</div>
          </div>
        </div>

        <!-- 路程距离指示器 -->
        <div class="distance-indicator" :class="{ 'visible': flowVisible }">
          <div class="distance-bar">
            <div class="distance-fill"></div>
          </div>
          <div class="distance-labels">
            <span>0 km</span>
            <span class="distance-mid">~ 7,000 km</span>
            <span>~ 14,000 km (往返)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 分类筛选 -->
    <section class="exchange-section">
      <div class="exchange-container">
        <h2 class="section-title" :class="{ 'visible': cardsVisible }">
          <span class="title-deco-line"></span>
          丝路物产
          <span class="title-deco-line"></span>
        </h2>

        <div class="filter-tabs" :class="{ 'visible': cardsVisible }">
          <button
            v-for="tab in filterTabs"
            :key="tab.key"
            class="filter-tab"
            :class="{ 'active': activeFilter === tab.key }"
            @click="setFilter(tab.key)"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </div>

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

        <transition-group name="card-list" tag="div" class="exchange-grid">
          <div class="exchange-column left-col" key="left">
            <transition-group name="card-item" tag="div" class="column-cards">
              <div
                v-for="(item, index) in filteredExports"
                :key="item.name"
                class="trade-card"
                :style="{ '--delay': index * 0.1 + 's' }"
                @click="openDetail(item, 'export')"
                ref="exportRefs"
              >
                <div class="card-inner">
                  <div class="card-front">
                    <div class="card-emoji">{{ item.icon }}</div>
                    <div class="card-info">
                      <h4>{{ item.name }}</h4>
                      <span class="card-category">{{ item.category }}</span>
                    </div>
                    <div class="card-arrow">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div class="card-back">
                    <p>{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>

          <div class="exchange-divider" key="divider">
            <div class="divider-line"></div>
            <div class="divider-label">丝绸之路</div>
            <div class="divider-line"></div>
          </div>

          <div class="exchange-column right-col" key="right">
            <transition-group name="card-item" tag="div" class="column-cards">
              <div
                v-for="(item, index) in filteredImports"
                :key="item.name"
                class="trade-card"
                :style="{ '--delay': index * 0.1 + 's' }"
                @click="openDetail(item, 'import')"
                ref="importRefs"
              >
                <div class="card-inner">
                  <div class="card-front">
                    <div class="card-emoji">{{ item.icon }}</div>
                    <div class="card-info">
                      <h4>{{ item.name }}</h4>
                      <span class="card-category">{{ item.category }}</span>
                    </div>
                    <div class="card-arrow">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </div>
                  </div>
                  <div class="card-back">
                    <p>{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </transition-group>
      </div>
    </section>

    
    <!-- 贸易影响时间线 -->
    <section class="impact-section" ref="impactRef">
      <div class="impact-container">
        <h2 class="section-title" :class="{ 'visible': impactVisible }">
          <span class="title-deco-line"></span>
          贸易影响
          <span class="title-deco-line"></span>
        </h2>

        <div class="impact-timeline">
          <div class="impact-line">
            <div class="impact-progress" :style="{ height: impactProgress + '%' }"></div>
          </div>
          <div v-for="(event, index) in impactEvents" :key="index"
               class="impact-node"
               :class="{ 'visible': impactNodeVisible[index], 'node-left': index % 2 === 0, 'node-right': index % 2 !== 0 }">
            <div class="impact-dot">
              <span>{{ event.icon }}</span>
            </div>
            <div class="impact-card">
              <div class="impact-era">{{ event.era }}</div>
              <h4>{{ event.title }}</h4>
              <p>{{ event.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 详情弹窗 -->
    <Teleport to="body">
      <transition name="modal-fade">
        <div v-if="selectedItem" class="modal-backdrop" @click.self="closeDetail">
          <div class="modal-content" :class="{ 'modal-enter': modalEnter }">
            <button class="modal-close" @click="closeDetail" aria-label="关闭">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div class="modal-body">
              <div class="modal-icon-section">
                <div class="modal-icon-bg" :class="selectedItemDirection === 'export' ? 'bg-export' : 'bg-import'">
                  <span class="modal-main-icon">{{ selectedItem.icon }}</span>
                </div>
                <div class="modal-direction-badge" :class="selectedItemDirection === 'export' ? 'badge-export' : 'badge-import'">
                  {{ selectedItemDirection === 'export' ? '中国输出' : '域外传入' }}
                </div>
              </div>
              <div class="modal-info-section">
                <h2 class="modal-title">{{ selectedItem.name }}</h2>
                <div class="modal-divider" aria-hidden="true">
                  <span class="modal-divider-dot"></span>
                  <span class="modal-divider-line"></span>
                  <span class="modal-divider-dot"></span>
                </div>
                <div class="modal-info-grid">
                  <div class="modal-info-item">
                    <span class="modal-info-label">类别</span>
                    <span class="modal-info-value">{{ selectedItem.category }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">时期</span>
                    <span class="modal-info-value">{{ selectedItem.period }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">路线</span>
                    <span class="modal-info-value">{{ selectedItem.route }}</span>
                  </div>
                  <div class="modal-info-item">
                    <span class="modal-info-label">影响</span>
                    <span class="modal-info-value">{{ selectedItem.impact }}</span>
                  </div>
                </div>
                <p class="modal-desc">{{ selectedItem.fullDesc }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'

interface TradeItem {
  name: string
  icon: string
  desc: string
  fullDesc: string
  category: string
  period: string
  route: string
  impact: string
}

const allExports: TradeItem[] = [
  { name: '丝绸', icon: '🧵', desc: '丝绸为首项出口商品，华丽织物令西方世界为之倾倒。', fullDesc: '丝绸是丝绸之路最核心的贸易品。中国的丝织技术独步天下，从汉代起便通过丝路大量输往中亚、波斯和罗马。罗马贵族以穿着中国丝绸为荣，丝绸甚至一度与黄金等价。丝织技术的外传也促进了沿线国家纺织业的发展。', category: '织物', period: '汉代起', route: '陆上丝路', impact: '改变西方服饰文化' },
  { name: '瓷器', icon: '🏺', desc: '精美瓷器享誉世界，China一词即源于瓷器。', fullDesc: '中国瓷器通过海上丝绸之路大量出口至东南亚、中东及欧洲。从唐三彩到宋代青瓷、元代青花，中国瓷器工艺不断精进。欧洲人长期无法破解制瓷秘方，瓷器堪比黄金，是海上丝路最重要的贸易品之一。', category: '工艺品', period: '唐代起', route: '海上丝路', impact: '影响全球陶瓷工艺' },
  { name: '茶叶', icon: '🍵', desc: '茶文化沿丝路传播，成为东西方共同的饮品文化。', fullDesc: '茶叶经由陆上和海上丝绸之路传播至世界各地。从唐代起，茶叶便经由西域传入中亚和西亚。宋代以后，茶马古道与海上贸易使茶叶远销欧洲。英国的下午茶文化、日本的茶道均源于中国茶文化的传播。', category: '饮品', period: '唐代起', route: '陆海兼有', impact: '塑造全球饮品文化' },
  { name: '造纸术', icon: '📜', desc: '四大发明之一，经丝路传至阿拉伯，改变了世界文明进程。', fullDesc: '公元751年怛罗斯之战后，造纸术传入阿拉伯世界，随后传播至欧洲。廉价纸张取代了昂贵的羊皮纸，极大促进了知识传播和文化发展，是人类文明史上最重要的技术转移之一。', category: '技术', period: '8世纪', route: '陆上丝路', impact: '推动世界文明进程' },
  { name: '火药', icon: '💥', desc: '火药经丝路西传，深刻影响了世界军事和科技发展。', fullDesc: '火药作为中国四大发明之一，于13世纪经丝绸之路传入阿拉伯地区，随后传入欧洲。火药的传播彻底改变了战争形态和世界政治格局，推动了欧洲封建制度的瓦解。', category: '技术', period: '13世纪', route: '陆上丝路', impact: '改变世界军事格局' },
  { name: '漆器', icon: '🎨', desc: '精美漆器沿丝路传播，东方工艺令西方叹为观止。', fullDesc: '中国漆器工艺有七千年历史，通过丝绸之路传播至日本、东南亚及欧洲。漆器以其精美的工艺和耐久性闻名于世，是丝路贸易中的高端工艺品。', category: '工艺品', period: '汉代起', route: '陆海兼有', impact: '传播东方工艺美学' },
]

const allImports: TradeItem[] = [
  { name: '葡萄', icon: '🍇', desc: '葡萄及葡萄酒酿造技术经丝路传入中国。', fullDesc: '葡萄原产于地中海东部，汉代张骞出使西域后将其引入中原。葡萄酒酿造技术也随之传入，唐代诗人王翰"葡萄美酒夜光杯"便是最好的写照。葡萄的引入丰富了中国的果蔬品种和饮食文化。', category: '农作物', period: '汉代', route: '陆上丝路', impact: '丰富中国农业品种' },
  { name: '香料', icon: '🌶️', desc: '胡椒、肉桂等香料丰富了中华饮食文化。', fullDesc: '丝绸之路上的香料贸易极为繁荣。胡椒、肉桂、丁香、豆蔻等香料从东南亚、印度、阿拉伯地区输入中国，不仅丰富了中华饮食文化，还被广泛用于医药和宗教仪式。香料一度价比黄金。', category: '食品', period: '汉代起', route: '陆海兼有', impact: '变革中华饮食文化' },
  { name: '珠宝', icon: '💎', desc: '波斯宝石、罗马琉璃沿丝路流入东方宫廷。', fullDesc: '波斯的红宝石、缅甸的翡翠、斯里兰卡的蓝宝石以及罗马的琉璃制品，通过丝绸之路源源不断地流入中国。这些珍宝不仅满足了宫廷贵族的奢华需求，也促进了中国珠宝加工工艺的提升。', category: '奢侈品', period: '汉代起', route: '陆上丝路', impact: '推动珠宝工艺交流' },
  { name: '农作物', icon: '🌾', desc: '苜蓿、胡麻、核桃等作物改善了中国农业结构。', fullDesc: '丝绸之路为中国引入了大量农作物品种：苜蓿、胡麻（芝麻）、核桃、石榴、黄瓜、胡萝卜等。这些作物的引入极大地丰富了中国的农业结构和食物种类，对中国农业产生了深远影响。', category: '农作物', period: '汉代起', route: '陆上丝路', impact: '改善中国农业结构' },
  { name: '佛教文化', icon: '☸️', desc: '佛教经丝路传入中国，深刻影响了中华文明。', fullDesc: '佛教自汉代经由丝绸之路传入中国，带来了佛经、佛像、佛教艺术等。敦煌莫高窟、云冈石窟等均是丝路佛教文化传播的结晶。佛教深刻影响了中国的哲学、文学、艺术和社会生活。', category: '文化', period: '汉代起', route: '陆上丝路', impact: '深刻影响中华文明' },
  { name: '琉璃', icon: '🔮', desc: '西方琉璃制作技术传入，推动中国玻璃工艺发展。', fullDesc: '琉璃（古代玻璃）制作技术从罗马帝国经丝绸之路传入中国。西方的钠钙玻璃与中国的铅钡玻璃技术相互融合，推动了中国古代玻璃工艺的发展，丰富了工艺品门类。', category: '工艺品', period: '汉代起', route: '陆上丝路', impact: '推动玻璃工艺发展' },
]

const filterTabs = [
  { key: 'all', label: '全部', icon: '📦' },
  { key: '农作物', label: '农作物', icon: '🌾' },
  { key: '织物', label: '织物', icon: '🧵' },
  { key: '工艺品', label: '工艺品', icon: '🏺' },
  { key: '技术', label: '技术', icon: '📜' },
  { key: '文化', label: '文化', icon: '☸️' },
]

const activeFilter = ref('all')

const setFilter = (key: string) => {
  activeFilter.value = key
}

const filteredExports = computed(() => {
  if (activeFilter.value === 'all') return allExports
  return allExports.filter(item => item.category === activeFilter.value)
})

const filteredImports = computed(() => {
  if (activeFilter.value === 'all') return allImports
  return allImports.filter(item => item.category === activeFilter.value)
})

const statsData = [
  { icon: '🐫', value: 7000, suffix: '+km', label: '丝路总长' },
  { icon: '🌍', value: 40, suffix: '+', label: '途经国家' },
  { icon: '📅', value: 2000, suffix: '+年', label: '历史跨度' },
  { icon: '📦', value: 100, suffix: '+种', label: '贸易商品' },
]

const animatedStats = reactive<number[]>(statsData.map(() => 0))
const statsVisible = ref(false)
const statsRef = ref<HTMLElement | null>(null)

const animateCounters = () => {
  statsData.forEach((stat, index) => {
    const target = stat.value
    const duration = 2000
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      animatedStats[index] = Math.floor(eased * target)
      if (progress < 1) requestAnimationFrame(animate)
    }
    animate()
  })
}

const flowVisible = ref(false)
const flowRef = ref<HTMLElement | null>(null)
const activeCity = ref(-1)
const routePathLength = ref(2000)

const routePathD = 'M60 200 C140 200, 180 120, 260 130 C340 140, 320 90, 400 100 C480 110, 460 160, 540 140 C620 120, 640 80, 720 100 C780 115, 800 130, 840 120'

const routeCityData = [
  { name: '敦煌', sub: '河西走廊', x: 170, y: 165, labelAbove: false },
  { name: '楼兰', sub: '西域门户', x: 300, y: 110, labelAbove: true },
  { name: '大月氏', sub: '中亚枢纽', x: 440, y: 140, labelAbove: false },
  { name: '安息', sub: '波斯高原', x: 600, y: 105, labelAbove: true },
  { name: '大秦', sub: '罗马帝国', x: 750, y: 110, labelAbove: true },
]

const eastGoods = ['🧵', '🍵', '🏺', '📜']
const westGoods = ['🍇', '💎', '🌶️', '☸️']

const impactVisible = ref(false)
const impactRef = ref<HTMLElement | null>(null)
const impactProgress = ref(0)
const impactNodeVisible = reactive<boolean[]>([])

const impactEvents = [
  { icon: '🌾', era: '汉代', title: '物种大交换', desc: '葡萄、石榴、苜蓿等作物传入中国，丝绸、漆器西传，开启了东西方物种交流的序幕。' },
  { icon: '☸️', era: '魏晋', title: '佛教东渐', desc: '佛教经丝路传入中国，带来了石窟艺术、佛经翻译等深刻的文化变革。' },
  { icon: '💰', era: '唐代', title: '商贸鼎盛', desc: '长安成为国际化大都市，波斯商人、阿拉伯商队云集，丝路贸易达到历史巅峰。' },
  { icon: '⛵', era: '宋代', title: '海上丝路兴起', desc: '陆上丝路受阻后，海上丝绸之路蓬勃发展，泉州、广州成为世界级港口。' },
  { icon: '🔄', era: '元代', title: '欧亚一体化', desc: '蒙古帝国统一欧亚大陆，马可·波罗来华，东西方交流达到前所未有的广度。' },
  { icon: '🌐', era: '当代', title: '一带一路', desc: '新时代的丝绸之路经济带倡议，延续千年丝路精神，促进沿线国家共同繁荣。' },
]

const selectedItem = ref<TradeItem | null>(null)
const selectedItemDirection = ref<'export' | 'import'>('export')
const modalEnter = ref(false)
const cardsVisible = ref(false)

const openDetail = (item: TradeItem, direction: 'export' | 'import') => {
  selectedItem.value = item
  selectedItemDirection.value = direction
  modalEnter.value = false
  document.body.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modalEnter.value = true
    })
  })
}

const closeDetail = () => {
  modalEnter.value = false
  document.body.style.overflow = ''
  setTimeout(() => {
    selectedItem.value = null
  }, 300)
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedItem.value) {
    closeDetail()
  }
}

const exportRefs = ref<HTMLElement[]>([])
const importRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  cardsVisible.value = true

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === statsRef.value) {
            statsVisible.value = true
            animateCounters()
          } else if (entry.target === flowRef.value) {
            flowVisible.value = true
          } else if (entry.target === impactRef.value) {
            impactVisible.value = true
            animateImpactTimeline()
          } else {
            entry.target.classList.add('visible')
          }
        }
      })
    },
    { threshold: 0.2 }
  )

  if (statsRef.value) observer.observe(statsRef.value)
  if (flowRef.value) observer.observe(flowRef.value)
  if (impactRef.value) observer.observe(impactRef.value)

  document.addEventListener('keydown', onKeydown)
})

const animateImpactTimeline = () => {
  impactEvents.forEach((_, i) => {
    impactNodeVisible[i] = false
  })
  impactEvents.forEach((_, i) => {
    setTimeout(() => {
      impactNodeVisible[i] = true
    }, i * 300)
  })

  let progress = 0
  const animate = () => {
    progress += 1
    impactProgress.value = Math.min(progress, 100)
    if (progress < 100) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.trade-view {
  min-height: 100vh;
  overflow: hidden;
  --desert-yellow: #F5DEB3;
  --gobi-brown: #8B4513;
  --dunhuang-red: #8B0000;
  --qingdai-blue: #2F4F4F;
  --gold: #D4AF37;
}

/* ========== Hero Banner ========== */
.hero-banner {
  position: relative;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(26, 20, 16, 0.92) 0%,
    rgba(139, 69, 19, 0.88) 50%,
    rgba(139, 0, 0, 0.8) 100%
  );
}

.hero-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(47, 79, 79, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-bg-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--gold);
  border-radius: 50%;
  opacity: 0;
  animation: hero-float 8s ease-in-out infinite;
}

.hp-1  { left: 8%;  top: 20%; animation-delay: 0s; }
.hp-2  { left: 15%; top: 60%; animation-delay: -1s; }
.hp-3  { left: 22%; top: 35%; animation-delay: -2s; }
.hp-4  { left: 30%; top: 80%; animation-delay: -3s; }
.hp-5  { left: 38%; top: 15%; animation-delay: -4s; }
.hp-6  { left: 45%; top: 50%; animation-delay: -0.5s; }
.hp-7  { left: 52%; top: 70%; animation-delay: -2.5s; }
.hp-8  { left: 60%; top: 25%; animation-delay: -1.5s; }
.hp-9  { left: 68%; top: 55%; animation-delay: -3.5s; }
.hp-10 { left: 75%; top: 40%; animation-delay: -4.5s; }
.hp-11 { left: 82%; top: 75%; animation-delay: -0.8s; }
.hp-12 { left: 90%; top: 20%; animation-delay: -2.8s; }
.hp-13 { left: 12%; top: 45%; animation-delay: -1.2s; }
.hp-14 { left: 28%; top: 90%; animation-delay: -3.2s; }
.hp-15 { left: 42%; top: 10%; animation-delay: -4.2s; }
.hp-16 { left: 58%; top: 85%; animation-delay: -0.3s; }

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.title-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.ornament-line {
  display: block;
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  animation: line-expand 1.5s ease-out both;
}

.ornament-diamond {
  width: 10px;
  height: 10px;
  background: var(--gold);
  transform: rotate(45deg);
  animation: diamond-spin 2s ease-in-out infinite;
  flex-shrink: 0;
}

.hero-content h1 {
  font-size: 3.5rem;
  letter-spacing: 12px;
  color: var(--desert-yellow);
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 2px 10px rgba(0, 0, 0, 0.6);
  font-family: 'SimSun', cursive;
  margin: 0;
}

.title-char {
  display: inline-block;
  animation: char-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-sub {
  margin-top: 1rem;
  font-size: 1.15rem;
  color: rgba(245, 222, 179, 0.7);
  letter-spacing: 6px;
  font-family: 'SimSun', serif;
  animation: fade-up 1s 0.6s ease both;
}

.hero-scroll-hint {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: fade-up 1s 1.2s ease both;
}

.scroll-text {
  font-size: 0.8rem;
  color: rgba(245, 222, 179, 0.5);
  letter-spacing: 2px;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(212, 175, 55, 0.5);
  border-bottom: 2px solid rgba(212, 175, 55, 0.5);
  transform: rotate(45deg);
  animation: arrow-bounce 2s ease-in-out infinite;
}

/* ========== 统计数据 ========== */
.stats-section {
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #1a1410 0%, #2a1a10 100%);
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(212, 175, 55, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
  border-radius: 16px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.4s ease;
}

.stat-card.visible {
  animation: stat-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0s);
}

.stat-card:hover {
  transform: translateY(-6px);
  border-color: rgba(212, 175, 55, 0.4);
  background: rgba(212, 175, 55, 0.1);
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stat-number {
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--gold);
  font-family: 'Georgia', serif;
}

.stat-suffix {
  font-size: 1rem;
  color: rgba(212, 175, 55, 0.7);
  margin-left: 2px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(245, 222, 179, 0.6);
  letter-spacing: 2px;
}

/* ========== 贸易流动画 ========== */
.trade-flow-section {
  position: relative;
  padding: 5rem 2rem 4rem;
  background: linear-gradient(180deg, #d4c4a0 0%, #e8dcc4 30%, var(--desert-yellow) 100%);
  overflow: hidden;
}

.flow-bg-terrain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.terrain-mountains {
  position: absolute;
  bottom: 30%;
  left: 0;
  right: 0;
  height: 120px;
  background:
    linear-gradient(135deg, transparent 33%, rgba(139,69,19,0.06) 33%, rgba(139,69,19,0.06) 50%, transparent 50%) 0 0 / 80px 100%,
    linear-gradient(225deg, transparent 33%, rgba(139,69,19,0.05) 33%, rgba(139,69,19,0.05) 50%, transparent 50%) 0 0 / 80px 100%;
}

.terrain-desert {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(180deg, transparent, rgba(245,222,179,0.3));
}

.flow-container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 2.2rem;
  font-family: 'SimSun', cursive;
  color: var(--dunhuang-red);
  letter-spacing: 6px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.section-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.title-deco-line {
  display: block;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.flow-subtitle {
  font-size: 1rem;
  color: #8a7a5a;
  letter-spacing: 3px;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.2s;
}

.flow-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}

.trade-flow {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease 0.4s;
}

.trade-flow.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 端点 */
.flow-endpoint {
  text-align: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.endpoint-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -55%);
  background: radial-gradient(circle, rgba(139,0,0,0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: endpoint-pulse 3s ease-in-out infinite;
}

.endpoint-glow-right {
  background: radial-gradient(circle, rgba(47,79,79,0.1) 0%, transparent 70%);
}

.endpoint-icon-wrap {
  position: relative;
  display: inline-block;
}

.endpoint-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
  transition: transform 0.4s ease;
}

.flow-endpoint:hover .endpoint-icon {
  transform: scale(1.15) translateY(-4px);
}

.endpoint-label {
  font-family: 'SimSun', cursive;
  font-size: 1.3rem;
  color: var(--gobi-brown);
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 1px 4px rgba(255,255,255,0.5);
}

.endpoint-sub {
  font-size: 0.72rem;
  color: #9a8a6a;
  letter-spacing: 1px;
  margin-top: 0.3rem;
}

/* SVG 路线区域 */
.flow-track {
  flex: 1;
  position: relative;
  min-height: 320px;
}

.route-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
}

/* 路线动画 */
.route-main-path {
  transition: stroke-dashoffset 3s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
}

.route-glow-path {
  animation: glow-pulse 3s ease-in-out infinite;
  opacity: 0.25;
}

.route-dash-path {
  animation: dash-flow 2s linear infinite;
}

/* 沙尘粒子 */
.dust-particle {
  animation: dust-float 4s ease-in-out infinite;
}

/* 城市节点 */
.city-node {
  cursor: pointer;
}

.city-ring {
  transition: r 0.3s ease, stroke 0.3s ease;
  animation: ring-expand 3s ease-in-out infinite;
}

.city-ring-inner {
  transition: r 0.3s ease, stroke 0.3s ease;
  animation: ring-expand 3s ease-in-out infinite 0.5s;
}

.city-dot-svg {
  transition: r 0.3s ease;
}

.city-label {
  transition: font-size 0.3s ease, fill 0.3s ease;
}

.city-sublabel {
  transition: font-size 0.3s ease, fill 0.3s ease;
}

/* 动态商品 */
.flow-good {
  opacity: 0;
  font-size: 18px;
}

.flow-good-east {
  animation: good-flow-east 8s linear infinite;
}

.flow-good-west {
  animation: good-flow-west 9s linear infinite;
}

/* 骆驼商队 */
.caravan-group {
  opacity: 0;
  transition: opacity 1s ease 1s;
}

.caravan-group.moving {
  opacity: 1;
  animation: caravan-journey 14s linear infinite;
}

.caravan-camel {
  animation: camel-step 0.6s ease-in-out infinite;
}

.camel-2 {
  animation-delay: 0.15s;
}

.camel-3 {
  animation-delay: 0.3s;
}

/* 方向箭头 */
.direction-arrows text {
  animation: fade-pulse 3s ease-in-out infinite;
}

/* 距离指示器 */
.distance-indicator {
  margin-top: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.8s;
}

.distance-indicator.visible {
  opacity: 1;
  transform: translateY(0);
}

.distance-bar {
  height: 4px;
  background: rgba(139,69,19,0.15);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.8rem;
}

.distance-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--dunhuang-red), var(--gold), var(--qingdai-blue));
  border-radius: 2px;
  animation: distance-fill-anim 3s cubic-bezier(0.22, 1, 0.36, 1) 1s both;
}

.distance-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #9a8a6a;
  font-family: 'Georgia', serif;
  letter-spacing: 1px;
}

.distance-mid {
  color: var(--gold);
  font-weight: bold;
}

/* ========== 分类筛选与卡片 ========== */
.exchange-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
}

.exchange-container {
  text-align: center;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 2rem 0 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.2s;
}

.filter-tabs.visible {
  opacity: 1;
  transform: translateY(0);
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  background: rgba(255, 255, 255, 0.8);
  border: 1.5px solid rgba(212, 175, 55, 0.2);
  border-radius: 30px;
  cursor: pointer;
  font-family: 'SimSun', serif;
  font-size: 0.9rem;
  color: #666;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.filter-tab:hover {
  border-color: var(--gold);
  color: var(--gobi-brown);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
}

.filter-tab.active {
  background: linear-gradient(135deg, var(--dunhuang-red), var(--gobi-brown));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
}

.tab-icon {
  font-size: 1.1rem;
}

.exchange-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
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

.left-title { color: var(--qingdai-blue); }
.right-title { color: var(--gobi-brown); }

.col-icon { font-size: 1.8rem; }

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

.column-cards {
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
  background: linear-gradient(to bottom, transparent, var(--gold), transparent);
}

.divider-label {
  writing-mode: vertical-rl;
  font-family: 'SimSun', cursive;
  color: var(--gold);
  font-size: 0.9rem;
  letter-spacing: 4px;
  padding: 1rem 0;
}

/* ========== 贸易卡片 ========== */
.trade-card {
  perspective: 800px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  min-height: 100px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.trade-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-front {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
  transition: box-shadow 0.3s ease;
}

.trade-card:hover .card-front {
  box-shadow: 0 8px 25px rgba(139, 0, 0, 0.1);
}

.card-back {
  background: linear-gradient(135deg, #8B0000, #2F4F4F);
  color: #fff;
  transform: rotateY(180deg);
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.2);
}

.card-emoji {
  font-size: 2rem;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
  text-align: left;
}

.card-info h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 2px;
}

.card-category {
  font-size: 0.72rem;
  color: var(--qingdai-blue);
  background: rgba(47, 79, 79, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  letter-spacing: 1px;
}

.card-arrow {
  color: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.trade-card:hover .card-arrow {
  color: var(--dunhuang-red);
  transform: translateX(3px);
}

.card-back p {
  font-size: 0.9rem;
  line-height: 1.6;
}

/* 卡片动画 */
.card-item-enter-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-item-leave-active {
  transition: all 0.3s ease;
  position: absolute;
  width: 100%;
}

.card-item-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.card-item-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.card-list-move {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ========== 贸易影响时间线 ========== */
.impact-section {
  padding: 5rem 2rem;
  background: linear-gradient(180deg, var(--desert-yellow) 0%, #f5f0e8 100%);
}

.impact-container {
  max-width: 900px;
  margin: 0 auto;
}

.impact-timeline {
  position: relative;
  padding: 2rem 0;
  margin-top: 3rem;
}

.impact-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: rgba(139, 105, 20, 0.15);
  transform: translateX(-50%);
  border-radius: 2px;
  overflow: hidden;
}

.impact-progress {
  width: 100%;
  background: linear-gradient(180deg, var(--gold), var(--dunhuang-red));
  border-radius: 2px;
  transition: height 0.05s linear;
}

.impact-node {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.impact-node.node-left {
  flex-direction: row;
  padding-right: calc(50% + 40px);
  transform: translateX(-30px);
}

.impact-node.node-right {
  flex-direction: row-reverse;
  padding-left: calc(50% + 40px);
  transform: translateX(30px);
}

.impact-node.visible {
  opacity: 1;
  transform: translateX(0);
}

.impact-dot {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gobi-brown));
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4), 0 0 0 4px rgba(212, 175, 55, 0.1);
  z-index: 2;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.impact-node:hover .impact-dot {
  transform: translateX(-50%) scale(1.15);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5), 0 0 0 8px rgba(212, 175, 55, 0.15);
}

.impact-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.15);
  transition: all 0.3s ease;
}

.impact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(139, 0, 0, 0.08);
  border-color: rgba(212, 175, 55, 0.3);
}

.impact-era {
  display: inline-block;
  padding: 0.2rem 0.8rem;
  background: rgba(212, 175, 55, 0.1);
  color: #8B6914;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 0.6rem;
}

.impact-card h4 {
  font-family: 'SimSun', cursive;
  font-size: 1.15rem;
  color: var(--gobi-brown);
  margin-bottom: 0.5rem;
}

.impact-card p {
  font-size: 0.88rem;
  line-height: 1.7;
  color: #666;
}

/* ========== 详情弹窗 ========== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  position: relative;
  background: #fdf8f0;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.2);
  transform: scale(0.85) translateY(30px);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
}

.modal-content.modal-enter {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(139, 0, 0, 0.85);
  color: #fdf8f0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-close:hover {
  background: #8B0000;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);
}

.modal-body {
  padding: 2.5rem;
}

.modal-icon-section {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-icon-bg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.modal-icon-bg:hover {
  transform: scale(1.1) rotate(5deg);
}

.bg-export {
  background: linear-gradient(135deg, rgba(47, 79, 79, 0.15), rgba(212, 175, 55, 0.15));
  border: 2px solid rgba(47, 79, 79, 0.3);
}

.bg-import {
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.15), rgba(212, 175, 55, 0.15));
  border: 2px solid rgba(139, 69, 19, 0.3);
}

.modal-main-icon {
  font-size: 3rem;
}

.modal-direction-badge {
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 2px;
}

.badge-export {
  background: rgba(47, 79, 79, 0.1);
  color: var(--qingdai-blue);
}

.badge-import {
  background: rgba(139, 69, 19, 0.1);
  color: var(--gobi-brown);
}

.modal-info-section {
  text-align: left;
}

.modal-title {
  font-size: 1.8rem;
  font-family: 'SimSun', 'KaiTi', serif;
  color: var(--dunhuang-red);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  text-align: center;
}

.modal-divider {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.8rem 0 1.5rem;
}

.modal-divider-dot {
  width: 5px;
  height: 5px;
  background: var(--gold);
  border-radius: 50%;
  flex-shrink: 0;
}

.modal-divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold), rgba(212, 175, 55, 0.15));
}

.modal-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  margin-bottom: 1.5rem;
}

.modal-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.modal-info-label {
  font-size: 0.72rem;
  color: var(--qingdai-blue);
  background: rgba(47, 79, 79, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  letter-spacing: 1.5px;
  font-weight: 500;
  display: inline-block;
  align-self: flex-start;
}

.modal-info-value {
  font-size: 0.95rem;
  color: #4a3728;
  font-family: 'SimSun', serif;
}

.modal-desc {
  font-size: 0.95rem;
  line-height: 2;
  color: #6a5a4a;
  font-family: 'SimSun', serif;
  text-indent: 2em;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
  padding-top: 1.2rem;
}

.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* ========== 关键帧 ========== */
@keyframes char-rise {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes line-expand {
  from { width: 0; opacity: 0; }
  to { width: 80px; opacity: 1; }
}

@keyframes diamond-spin {
  0%, 100% { transform: rotate(45deg) scale(1); }
  50% { transform: rotate(225deg) scale(1.2); }
}

@keyframes hero-float {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  15% {
    opacity: 0.6;
    transform: translateY(-20px) scale(1);
  }
  85% { opacity: 0.3; }
  100% {
    opacity: 0;
    transform: translateY(-120px) scale(0.3);
  }
}

@keyframes arrow-bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.5; }
  50% { transform: rotate(45deg) translateY(6px); opacity: 1; }
}

@keyframes stat-enter {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes endpoint-pulse {
  0%, 100% { transform: translate(-50%, -55%) scale(1); opacity: 0.6; }
  50% { transform: translate(-50%, -55%) scale(1.2); opacity: 1; }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.35; }
}

@keyframes dash-flow {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}

@keyframes dust-float {
  0%, 100% { opacity: 0; transform: translateY(0); }
  30% { opacity: 0.6; }
  50% { opacity: 0.8; transform: translateY(-10px); }
  70% { opacity: 0.4; }
}

@keyframes ring-expand {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.15); }
}

@keyframes good-flow-east {
  0% { opacity: 0; offset-distance: 0%; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; offset-distance: 100%; }
}

@keyframes good-flow-west {
  0% { opacity: 0; offset-distance: 100%; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; offset-distance: 0%; }
}

@keyframes caravan-journey {
  0% { transform: translate(50px, 185px); }
  100% { transform: translate(810px, 105px); }
}

@keyframes camel-step {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-3px) rotate(2deg); }
}

@keyframes fade-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

@keyframes distance-fill-anim {
  from { width: 0; }
  to { width: 100%; }
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.2rem;
    letter-spacing: 8px;
  }

  .hero-sub {
    font-size: 0.95rem;
    letter-spacing: 3px;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-value {
    font-size: 1.8rem;
  }

  .trade-flow {
    flex-direction: column;
    gap: 1.5rem;
  }

  .flow-endpoint {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .endpoint-glow {
    display: none;
  }

  .flow-track {
    width: 100%;
    min-height: 260px;
  }

  .endpoint-label {
    font-size: 1.1rem;
  }

  .endpoint-sub {
    font-size: 0.65rem;
  }

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
    background: linear-gradient(to right, transparent, var(--gold), transparent);
  }

  .divider-label {
    writing-mode: horizontal-tb;
  }

  .exchange-header {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-tabs {
    gap: 0.5rem;
  }

  .filter-tab {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 1.8rem;
    letter-spacing: 4px;
  }

  .title-deco-line {
    width: 30px;
  }

  .impact-node.node-left,
  .impact-node.node-right {
    padding-left: 60px;
    padding-right: 0;
    flex-direction: row;
  }

  .impact-line { left: 20px; }
  .impact-dot { left: 20px; width: 34px; height: 34px; font-size: 0.9rem; }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.4rem;
  }

  .modal-info-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .modal-backdrop {
    padding: 1rem;
    align-items: flex-end;
  }

  .modal-content {
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr 1fr;
  }

  .stat-card {
    padding: 1.2rem 0.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .endpoint-icon {
    font-size: 2rem;
  }

  .modal-icon-bg {
    width: 80px;
    height: 80px;
  }

  .modal-main-icon {
    font-size: 2.5rem;
  }
}
</style>
