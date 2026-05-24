# SilkRoad

一个关于丝绸之路的网页项目。

## 项目简介

SilkRoad 是一个使用 Vue 框架开发的网页应用，旨在介绍和展示丝绸之路的相关历史、地理、文化等内容。该项目具有现代化的界面设计，交互体验友好，适合学习与展示。

## 技术栈

- **Vue.js**：项目的主力前端框架，负责组件化开发和页面构建。
- **TypeScript**：为项目提供类型支持，提高代码的可维护性和健壮性。
- **HTML**：用于结构化基本页面内容。

## 安装与使用

1. 克隆项目到本地：

   ```bash
   git clone https://github.com/ChoyeEEEE/SilkRoad.git
   cd SilkRoad
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

3. 启动开发服务器：

   ```bash
   npm run dev
   ```

4. 访问本地开发环境，默认地址一般为 `http://localhost:3000` 或终端输出的端口。

## 目录结构与说明

本项目主要目录及文件说明如下，便于开发者快速理解每个部分作用：

```
├── .editorconfig           # 统一不同编辑器的代码风格
├── .gitattributes          # Git 控制属性配置
├── .gitignore              # Git 忽略文件配置
├── .oxlintrc.json          # 代码检查配置
├── .prettierrc.json        # Prettier 格式化工具配置
├── .vscode/                # VS Code 编辑器配置（如插件、推荐设置等）
├── README.md               # 项目说明文档
├── LICENSE                 # 开源许可证
├── e2e/                    # 端到端自动化测试目录
├── env.d.ts                # 环境变量类型声明
├── eslint.config.ts        # ESLint 代码规范配置
├── index.html              # 入口 HTML 文件，Vue 挂载点
├── package.json            # 项目依赖、脚本等信息
├── package-lock.json       # npm 依赖锁定文件
├── playwright.config.ts    # Playwright 测试配置
├── public/                 # 公共资源目录，静态文件（不会经过构建工具处理）
├── src/                    # 源码目录（核心开发内容见下）
│   ├── App.vue             # 根组件，程序入口视图
│   ├── main.ts             # 应用入口文件，创建并挂载 Vue 实例
│   ├── __tests__/          # 单元测试相关内容
│   ├── router/             # 路由配置相关模块
│   ├── stores/             # 全局状态管理（如 Pinia、Vuex）
│   ├── views/              # 主页面组件（与路由直接关联的页面）
│   └── ...                 # 可能还包括 utils（工具）、api（接口）、components（自定义组件）等
├── tsconfig.app.json       # TS 针对 app 的编译配置
├── tsconfig.json           # 主 TypeScript 配置文件
├── tsconfig.node.json      # Node 环境下 TS 配置
├── tsconfig.vitest.json    # Vitest 测试环境下 TS 配置
├── vite.config.ts          # Vite 构建工具配置
├── vitest.config.ts        # Vitest 单元测试配置
├── 丝绸之路图片/           # 项目相关图片资源
```

### 主要目录说明

- **.vscode/**：项目相关的 VS Code 编辑器建议配置。
- **e2e/**：端到端测试用例，确保整体流程可用性。
- **public/**：静态资源目录，例如 favicon、logo 等，打包时原样输出。
- **src/**：项目核心代码，常见子目录说明如下：
  - **App.vue**：Vue 根组件，应用的布局和全局逻辑入口。
  - **main.ts**：应用主入口，加载根组件与插件。
  - **__tests__/**：单元测试存放处。
  - **router/**：前端路由配置，页面导航逻辑。
  - **stores/**：全局状态管理方案相关目录（如 Pinia store、Vuex store）。
  - **views/**：主页面级组件，通常与路由一一对应。
  - **assets/**（如存在）：静态资源如样式、图片、字体等，会被打包处理。
  - **components/**（如存在）：站内可复用的界面组件，并非页面。
- **丝绸之路图片/**：丝绸之路相关图片资料归档文件夹。
- **config & json/ts 文件**：各种工具、依赖和 TypeScript 的配置文件。
- **README.md、LICENSE**：项目信息与协议，查阅项目和参与贡献的重要入口。

如出现 `utils/`、`api/`、`types/` 等文件夹，也可做类似简要说明。

---

## 许可证

本项目采用 MIT License 授权。详见 [LICENSE](./LICENSE) 文件。

## 参与贡献

欢迎提交 Issue 或 Pull Request 参与项目改进！

---

若需了解更多信息，请访问 [项目主页](https://github.com/ChoyeEEEE/SilkRoad)。
