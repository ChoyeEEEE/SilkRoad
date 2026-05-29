<template>
  <div class="modern-view">
    <section class="hero-banner">
      <img src="/picture/modern-hero.jpg" alt="古今丝路" class="hero-bg-img" draggable="false" />
      <div class="hero-overlay"></div>
      <div class="hero-center">
        <h1>古今丝路</h1>
        <p class="hero-sub">从驼铃声声到列车轰鸣</p>
        <div class="hero-vs">VS</div>
      </div>
      <div class="hero-gradient-bottom"></div>
    </section>

    <section class="compare-section">
      <div
        v-for="(pair, index) in comparePairs"
        :key="pair.topic"
        class="compare-row"
        ref="rowRefs"
      >
        <div class="compare-side ancient-side">
          <div class="side-card">
            <div class="card-image" @click="openLightbox(pair.ancient.img, pair.ancient.title, pair.ancient.detail)">
              <img :src="pair.ancient.img" :alt="pair.ancient.title" />
              <div class="card-image-overlay">
                <span class="side-label">古代</span>
                <span class="zoom-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                </span>
              </div>
            </div>
            <div class="card-body">
              <h3>{{ pair.ancient.title }}</h3>
              <p>{{ pair.ancient.desc }}</p>
            </div>
          </div>
        </div>

        <div class="compare-center">
          <div class="topic-badge">
            <span class="topic-icon">{{ pair.topicIcon }}</span>
            <span class="topic-text">{{ pair.topic }}</span>
          </div>
          <div class="center-line"></div>
          <div class="arrow-right">
            <svg width="40" height="16" viewBox="0 0 40 16"><path d="M0 8 H32 M27 3 L35 8 L27 13" stroke="#D4AF37" stroke-width="2" fill="none"/></svg>
          </div>
        </div>

        <div class="compare-side modern-side">
          <div class="side-card">
            <div class="card-image" @click="openLightbox(pair.modern.img, pair.modern.title, pair.modern.detail)">
              <img :src="pair.modern.img" :alt="pair.modern.title" />
              <div class="card-image-overlay">
                <span class="side-label modern-label">现代</span>
                <span class="zoom-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
                </span>
              </div>
            </div>
            <div class="card-body">
              <h3>{{ pair.modern.title }}</h3>
              <p>{{ pair.modern.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-banner" ref="statsRef">
      <h2>新时代丝路成果</h2>
      <div class="stats-carousel-wrapper">
        <div class="stats-carousel-track">
          <div
            v-for="(stat, index) in stats"
            :key="'a-' + index"
            class="stat-card"
            @click="openLightbox('', stat.title, stat.detail)"
          >
            <div class="stat-card-glow"></div>
            <div class="stat-card-border"></div>
            <div class="stat-card-inner">
              <span class="stat-icon">{{ stat.icon }}</span>
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <span class="stat-click-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
            </span>
            <div class="stat-scan-line"></div>
            <div class="stat-card-shine"></div>
          </div>
          <div
            v-for="(stat, index) in stats"
            :key="'b-' + index"
            class="stat-card"
            @click="openLightbox('', stat.title, stat.detail)"
          >
            <div class="stat-card-glow"></div>
            <div class="stat-card-border"></div>
            <div class="stat-card-inner">
              <span class="stat-icon">{{ stat.icon }}</span>
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
            <span class="stat-click-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>
            </span>
            <div class="stat-scan-line"></div>
            <div class="stat-card-shine"></div>
          </div>
        </div>
      </div>
    </section>

    <transition name="lightbox-fade">
      <div v-if="lightbox.visible" class="lightbox-overlay" @click.self="closeLightbox">
        <div class="lightbox-container">
          <button class="lightbox-close" @click="closeLightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div class="lightbox-content">
            <div class="lightbox-img-wrap" v-if="lightbox.img">
              <img :src="lightbox.img" :alt="lightbox.title" />
            </div>
            <div class="lightbox-info">
              <h3>{{ lightbox.title }}</h3>
              <p v-if="lightbox.detail">{{ lightbox.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const comparePairs = [
  {
    topic: '交通方式',
    topicIcon: '🛤️',
    ancient: { title: '驼队商旅', desc: '骆驼商队穿越大漠戈壁，往返需数月乃至数年，路途艰险。', img: '/picture/modern-ancient-transport.jpg', detail: '古代丝绸之路的商队以骆驼为主要运输工具，一支商队通常由数十甚至上百头骆驼组成。商人们从长安出发，途经河西走廊、西域诸国，最终抵达中亚甚至欧洲，单程往往需要半年以上。沿途面临沙漠风暴、盗匪劫掠、疾病缺水等重重危险，但丰厚的利润驱使着一代又一代商人踏上这条伟大的贸易通道。' },
    modern: { title: '中欧班列', desc: '高速货运列车连通亚欧，十几天即可到达，年开行数千列。', img: '/picture/modern-modern-transport.jpg', detail: '中欧班列是连接中国与欧洲的国际铁路货运列车，自2011年首列开行以来，已累计开行超过8万列。班列从重庆、成都、西安、郑州等多个城市出发，经哈萨克斯坦、俄罗斯、白俄罗斯等国，直达欧洲120多个城市。运输时间仅为海运的三分之一，成本仅为空运的五分之一，成为"一带一路"最具标志性的成果之一。' }
  },
  {
    topic: '贸易商品',
    topicIcon: '📦',
    ancient: { title: '丝绸瓷器', desc: '丝绸、瓷器、茶叶为主要出口商品，以物易物为主。', img: '/picture/modern-ancient-trade.jpg', detail: '丝绸是古代中国最具代表性的出口商品，被誉为"东方织锦"。汉代的丝绸经丝绸之路远销罗马帝国，价值堪比黄金。瓷器同样闻名遐迩，青花瓷、唐三彩等名品深受各国贵族喜爱。茶叶则在唐代以后成为重要的贸易商品，经茶马古道传入中亚和南亚。这些商品不仅带来了巨大的经济利益，更成为中华文化的重要载体。' },
    modern: { title: '数字贸易', desc: '跨境电商、电子设备、新能源产品，数字丝绸之路蓬勃发展。', img: '/picture/modern-modern-trade.jpg', detail: '数字丝绸之路是"一带一路"倡议的重要组成部分。中国电商平台已覆盖东南亚、中亚、欧洲等地区，跨境电商年交易额突破万亿元。5G技术、移动支付、人工智能等数字基础设施在沿线国家广泛部署。新能源汽车、光伏产品、锂电池"新三样"出口快速增长，成为推动贸易结构升级的新引擎。' }
  },
  {
    topic: '文化交流',
    topicIcon: '🎭',
    ancient: { title: '宗教艺术', desc: '佛教沿丝路东传，壁画石窟见证文化交融。', img: '/picture/modern-ancient-culture.jpg', detail: '丝绸之路是世界宗教和艺术交流的大通道。佛教从印度经中亚传入中国，敦煌莫高窟、大同云冈石窟、洛阳龙门石窟见证了这一伟大历程。壁画中的飞天形象融合了印度、波斯和中原艺术风格。伊斯兰教、景教、祆教也沿丝路传入中国，与本土文化交融共生，形成了独特的多元文化景观。' },
    modern: { title: '文旅互通', desc: '丝路旅游成为热点，各国游客互访，文化节目交流频繁。', img: '/picture/modern-modern-culture.jpg', detail: '随着"一带一路"倡议的推进，丝路旅游已成为国际旅游的新热点。中国与中亚五国实现了签证便利化，丝绸之路沿线城市开通了多条国际直航航线。敦煌文博会、丝绸之路国际电影节等文化活动定期举办，促进了各国文化互鉴。"丝绸之路：长安-天山廊道的路网"被列入世界文化遗产，吸引了全球游客的目光。' }
  },
  {
    topic: '通信方式',
    topicIcon: '📡',
    ancient: { title: '驿站传书', desc: '驿站接力传递信息，一封书信辗转数月方能送达。', img: '/picture/modern-ancient-comm.jpg', detail: '古代丝绸之路沿线设有完善的驿站系统。从唐代开始，每隔30里设一驿站，全国共设驿站1639个，驿卒达2万余人。紧急军情可在数日内从边疆传至长安，而普通信件则需要更长时间。驿站不仅是通信枢纽，也是商旅休憩、物资补给的重要场所，堪称古代的"物流网络"。' },
    modern: { title: '即时通信', desc: '5G网络覆盖，视频通话实时连接，信息瞬间传遍全球。', img: '/picture/modern-modern-comm.jpg', detail: '中国已建成全球最大的5G网络，基站总数超过350万个。华为、中兴等企业参与了沿线国家的通信基础设施建设，帮助数十个国家建设了光纤网络和数据中心。中老铁路、雅万高铁等项目全部采用了中国的通信技术标准。跨境电商直播、远程医疗、在线教育等数字应用在沿线国家广泛推广，真正实现了"信息高速公路"的互联互通。' }
  },
  {
    topic: '基础设施',
    topicIcon: '🏗️',
    ancient: { title: '关隘城池', desc: '嘉峪关、玉门关等关隘守护丝路，城墙绵延万里。', img: '/picture/modern-ancient-infra.jpg', detail: '嘉峪关是明长城最西端的关隘，始建于1372年，被誉为"天下第一雄关"。玉门关始建于汉代，是丝绸之路上的重要关卡。这些关隘不仅是军事防御工事，更是丝绸之路贸易管理的重要机构。守关将士守护着来往商旅的安全，征收关税，维护着这条伟大通道的秩序与繁荣。' },
    modern: { title: '互联互通', desc: '铁路公路港口通信网络全面建设，产能合作不断深化。', img: '/picture/modern-modern-infra.jpg', detail: '中国已与150多个国家签署了共建"一带一路"合作文件。中老铁路、雅万高铁、匈塞铁路等标志性工程相继建成通车。比雷埃夫斯港、汉班托塔港等海外港口运营良好。中巴经济走廊、孟中印缅经济走廊建设稳步推进。累计投资超过万亿美元，创造了数十万个就业岗位，为沿线国家经济发展注入了强劲动力。' }
  }
]

const stats = [
  { icon: '🚂', value: '8万+', label: '中欧班列累计开行', title: '中欧班列', detail: '截至2024年底，中欧班列累计开行超过8万列，通达欧洲25个国家219个城市，运送货物超过790万标箱。班列货物品类从最初的手机、笔记本电脑等电子产品，扩展到汽车整车、机械设备、食品农产品等53大类5万余种商品。重庆、成都、西安、郑州、乌鲁木齐等城市均已实现常态化开行，形成了东中西通道全面贯通的格局。2023年全年开行超过1.7万列，发送货物190万标箱，同比增长超过15%，持续保持强劲增长势头。' },
  { icon: '💰', value: '2万亿$', label: '沿线国家年贸易额', title: '贸易总额', detail: '中国与"一带一路"沿线国家年贸易总额超过2万亿美元，占中国外贸总额的比重超过45%。贸易结构持续优化，从传统的能源资源和初级产品为主，逐步向机电产品、高新技术产品转变。跨境电商成为新增长极，中国与沿线国家跨境电商交易额年均增速超过20%。中国已连续多年成为沿线最大贸易伙伴，与东盟、中亚、中东欧等地区的贸易往来日益密切。' },
  { icon: '🌍', value: '150+', label: '合作国家和地区', title: '合作伙伴', detail: '中国已与152个国家和32个国际组织签署了200余份共建"一带一路"合作文件，覆盖全球约75%的国家。合作领域从最初的基础设施建设，扩展到政策沟通、设施联通、贸易畅通、资金融通、民心相通五大类。亚洲、非洲、欧洲是合作伙伴最集中的区域，拉丁美洲和南太平洋地区的参与度也在快速提升。' },
  { icon: '🛤️', value: '3.5万km', label: '铁路公路网络里程', title: '基建里程', detail: '中国参与建设的铁路公路总里程超过3.5万公里，连接亚洲、欧洲、非洲的交通网络日益完善。标志性项目包括中老铁路（1035公里）、雅万高铁（142.3公里）、匈塞铁路、蒙内铁路等。中老铁路自2021年通车以来累计发送旅客超2000万人次；雅万高铁将雅加达至万隆通行时间从3小时缩短至40分钟。中国公路建设企业参与了数十个国家的高速公路和国道建设，累计修建公路超过10万公里。' },
  { icon: '⚡', value: '60GW', label: '新能源合作项目装机', title: '清洁能源', detail: '中国在沿线国家投建的风电、光伏等新能源项目总装机容量超过60GW，助力全球绿色低碳转型。中国光伏组件占全球产能的80%以上，为沿线国家提供了高性价比的清洁能源解决方案。在沙特阿拉伯，中国承建了全球最大的单体光伏电站；在哈萨克斯坦，中哈风电合作项目已成为当地最大的风电场；在巴基斯坦，中巴经济走廊框架下的清洁能源项目已投产超过5000兆瓦。' },
  { icon: '👥', value: '40万+', label: '直接创造就业岗位', title: '就业增长', detail: '"一带一路"项目已为沿线国家直接创造超过40万个就业岗位，间接带动就业数百万人。海外中资企业普遍推行本地化运营策略，本地员工占比超过80%。中国企业在沿线国家累计开展职业技能培训超过20万人次，涵盖工程技术、铁路运营、电子商务、农业种植等领域。许多项目的本地员工已成长为核心技术骨干和管理人才。' },
  { icon: '🏗️', value: '30+', label: '海外港口合作项目', title: '港口互联', detail: '中国参与建设和运营的海外港口超过30个，涵盖比雷埃夫斯港、汉班托塔港、瓜达尔港、吉布提港等，形成覆盖全球的港口合作网络。比雷埃夫斯港集装箱吞吐量从2010年的88万标箱增长至2023年的超500万标箱，全球排名从第93位跃升至第25位。瓜达尔港已建成深水泊位和自由区，正在成为连接中亚与印度洋的重要枢纽。这些港口共同构成了海上丝绸之路的关键节点。' },
  { icon: '📡', value: '100+', label: '数字丝绸之路项目', title: '数字丝路', detail: '中国已与16个国家签署"数字丝绸之路"合作谅解备忘录，在云计算、大数据、人工智能等领域开展深入合作。华为、中兴等企业参与了数十个国家的通信基础设施建设，帮助建设了光纤网络和数据中心。中国电商平台已覆盖东南亚、中亚、欧洲等地区，跨境电商年交易额突破万亿元。5G技术在沿线国家加速部署，中国已与30多个国家开展了5G合作。' },
  { icon: '🏥', value: '30次+', label: '医疗援助行动', title: '健康丝路', detail: '中国累计向沿线国家派出医疗队超过30批次，援建医院数十座，培训医疗人员上万名，"岐黄中医海外中心"遍布多国。新冠疫情期间，中国向120多个国家和国际组织提供了超过22亿剂疫苗，其中大部分流向"一带一路"沿线国家。中国还开展了"光明行"白内障手术、"微笑行动"唇腭裂修复等系列医疗援助活动，累计为数万名当地患者送去健康。' }
]

const lightbox = reactive({ visible: false, img: '', title: '', detail: '' })

const openLightbox = (img: string, title: string, detail: string) => {
  lightbox.img = img
  lightbox.title = title
  lightbox.detail = detail
  lightbox.visible = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightbox.visible = false
  document.body.style.overflow = ''
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox()
}

const rowRefs = ref<HTMLElement[]>([])
const statsRef = ref<HTMLElement | null>(null)
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
    { threshold: 0.12 }
  )
  rowRefs.value.forEach((el) => {
    if (el) observer!.observe(el)
  })
  if (statsRef.value) observer.observe(statsRef.value)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modern-view {
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

.hero-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
}

.hero-center h1 {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 2.8rem;
  color: #000;
  letter-spacing: 8px;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
  animation: heroFadeIn 1s ease-out;
}

.hero-sub {
  margin-top: 0.6rem;
  color: #000;
  font-size: 1.05rem;
  letter-spacing: 3px;
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.5);
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-sub {
  margin-top: 0.6rem;
  color: rgba(0, 0, 0, 0.85);
  font-size: 1.05rem;
  letter-spacing: 3px;
  text-shadow: 0 1px 8px rgba(255, 255, 255, 0.5);
  animation: heroFadeIn 1s ease-out 0.3s both;
}

.hero-vs {
  display: inline-block;
  margin-top: 1.2rem;
  width: 56px;
  height: 56px;
  line-height: 56px;
  background: linear-gradient(135deg, #D4AF37, #8B0000);
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Noto Sans SC', sans-serif;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.5);
  animation: vsPulse 2s ease-in-out infinite;
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

@keyframes heroZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.06); }
}

.compare-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.compare-row {
  display: flex;
  align-items: stretch;
  gap: 0;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.compare-row .ancient-side { transform: translateX(-50px); }
.compare-row .modern-side { transform: translateX(50px); }

.compare-row.visible .ancient-side,
.compare-row.visible .modern-side { transform: translateX(0); }
.compare-row.visible { opacity: 1; }

.compare-side {
  flex: 1;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.side-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.side-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.ancient-side .side-card { border: 1px solid rgba(212, 175, 55, 0.2); border-top: 3px solid #D4AF37; }
.modern-side .side-card { border: 1px solid rgba(15, 52, 96, 0.15); border-top: 3px solid #0f3460; }

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.side-card:hover .card-image img { transform: scale(1.08); }

.card-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1rem 0.8rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.zoom-icon {
  opacity: 0;
  transform: scale(0.6);
  transition: all 0.3s ease;
}

.card-image:hover .zoom-icon {
  opacity: 0.9;
  transform: scale(1);
}

.side-label {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  font-family: 'Noto Sans SC', sans-serif;
  background: rgba(212, 175, 55, 0.85);
  color: #fff;
  backdrop-filter: blur(4px);
}

.modern-label { background: rgba(15, 52, 96, 0.85); color: #fff; }

.card-body { padding: 1.2rem 1.5rem; flex: 1; }

.card-body h3 {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 0.4rem;
}

.card-body p { color: #666; font-size: 0.9rem; line-height: 1.7; }

.compare-center {
  flex: 0 0 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  position: relative;
  z-index: 2;
}

.topic-badge {
  background: #fff;
  border: 2px solid #D4AF37;
  border-radius: 50%;
  width: 72px;
  height: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.25);
  transition: all 0.4s ease;
}

.compare-row:hover .topic-badge {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 24px rgba(212, 175, 55, 0.4);
}

.topic-icon { font-size: 1.4rem; }

.topic-text {
  font-size: 0.55rem;
  font-family: 'Noto Sans SC', sans-serif;
  color: #8B4513;
  font-weight: bold;
}

.center-line {
  width: 2px;
  flex: 1;
  min-height: 30px;
  background: linear-gradient(to bottom, transparent, #D4AF37, transparent);
}

.arrow-right { opacity: 0.6; }

.stats-banner {
  max-width: 1100px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.stats-banner.visible { opacity: 1; transform: translateY(0); }

.stats-banner h2 {
  text-align: center;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.6rem;
  color: #00c8ff;
  margin-bottom: 2rem;
  position: relative;
  text-shadow: 0 0 20px rgba(0, 200, 255, 0.3);
}

.stats-banner h2::after {
  content: '';
  display: block;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00c8ff, transparent);
  margin: 0.8rem auto 0;
}

.stats-carousel-wrapper {
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
}

.stats-carousel-track {
  display: flex;
  gap: 1.5rem;
  animation: stats-scroll 30s linear infinite;
  width: max-content;
}

.stats-carousel-track:hover {
  animation-play-state: paused;
}

@keyframes stats-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.stat-card {
  position: relative;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;
  min-width: 200px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #0a0f1e 0%, #111b33 50%, #0a1628 100%);
  border: 1px solid rgba(0, 200, 255, 0.12);
  transition: all 0.4s ease;
  cursor: pointer;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(0, 200, 255, 0.4);
  box-shadow:
    0 0 20px rgba(0, 200, 255, 0.15),
    0 0 60px rgba(0, 200, 255, 0.05),
    0 12px 36px rgba(0, 0, 0, 0.3);
}

.stat-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 120%, rgba(0, 200, 255, 0.06) 0%, transparent 50%);
  pointer-events: none;
  transition: opacity 0.4s ease;
  opacity: 0;
}

.stat-card:hover .stat-card-glow {
  opacity: 1;
}

.stat-card-border {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(0, 200, 255, 0.1) 0%, transparent 50%),
    linear-gradient(315deg, rgba(0, 200, 255, 0.05) 0%, transparent 50%);
}

.stat-card-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.stat-icon {
  font-size: 2.2rem;
  filter: drop-shadow(0 0 8px rgba(0, 200, 255, 0.3));
  transition: all 0.4s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.15);
  filter: drop-shadow(0 0 14px rgba(0, 200, 255, 0.5));
}

.stat-value {
  font-size: 1.6rem;
  font-weight: bold;
  font-family: 'Noto Sans SC', sans-serif;
  background: linear-gradient(135deg, #00c8ff, #00ff88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
  font-family: 'Noto Sans SC', sans-serif;
  letter-spacing: 1px;
}

.stat-scan-line {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.6), transparent);
  opacity: 0;
  pointer-events: none;
}

.stat-card:hover .stat-scan-line {
  opacity: 1;
  animation: scanDown 1.5s ease-in-out infinite;
}

.stat-card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 200, 255, 0.06), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
  z-index: 1;
}

.stat-card:hover .stat-card-shine {
  left: 100%;
}

.stat-click-hint {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 200, 255, 0.15);
  border: 1px solid rgba(0, 200, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 200, 255, 0.6);
  opacity: 0.5;
  transition: all 0.3s ease;
  z-index: 3;
}

.stat-card:hover .stat-click-hint {
  opacity: 1;
  background: rgba(0, 200, 255, 0.25);
  border-color: rgba(0, 200, 255, 0.5);
  color: #00c8ff;
}

@keyframes scanDown {
  0% { top: -2px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: calc(100% + 2px); opacity: 0; }
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

.lightbox-content { overflow: hidden; border-radius: 16px; }

.lightbox-img-wrap {
  width: 100%;
  max-height: 50vh;
  overflow: hidden;
}

.lightbox-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.lightbox-info {
  padding: 1.8rem 2rem 2rem;
}

.lightbox-img-wrap + .lightbox-info {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.lightbox-info h3 {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.4rem;
  color: #D4AF37;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  text-align: center;
}

.lightbox-info p {
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

@keyframes heroFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes vsPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

@media (max-width: 768px) {
  .hero-banner { height: 360px; }
  .hero-bg-img { object-position: center 30%; }
  .hero-center h1 { font-size: 2rem; letter-spacing: 6px; }
  .hero-sub { font-size: 0.95rem; letter-spacing: 2px; }
  .hero-gradient-bottom { height: 80px; }

  .compare-row { flex-direction: column; gap: 1rem; }
  .compare-row .ancient-side,
  .compare-row .modern-side { transform: translateY(30px); }
  .compare-row.visible .ancient-side,
  .compare-row.visible .modern-side { transform: translateY(0); }

  .compare-center { flex: none; flex-direction: row; padding: 0.5rem 0; }
  .center-line { width: 60px; height: 2px; min-height: auto; background: linear-gradient(to right, transparent, #D4AF37, transparent); }
  .arrow-right { transform: rotate(90deg); }

  .stats-carousel-track { gap: 1rem; }
  .stat-card { min-width: 160px; padding: 1.5rem 1rem; }

  .lightbox-container { max-width: 95vw; }
  .lightbox-info { padding: 1.2rem 1.5rem 1.5rem; }
}
</style>
