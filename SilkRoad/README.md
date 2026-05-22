# SilkRoad

一个关于丝绸之路的网页项目。

## 如何写代码

请先下载 VScode 作为编辑器

在自己的电脑的PowerShell，依次执行
  # 连接我的仓库
    git clone git@github.com:ChoyeEEEE/SilkRoad.git （SSH连接）
    git clone https://github.com/ChoyeEEEE/SilkRoad.git （梯子连接）
    cd SilkRoad
  # 安装环境依赖
    npm install
  # 开启自己的分支（为了不与其它修改者相互干扰）
    git checkout -b ****/**** （*号部分可取此次修改内容的总结，如‘Header/Add-BGM’

再打开 VScode ，从 VScode 里打开刚刚拉取的文件夹，即可在本地进行修改。
（拉取的文件通常在以下两个路径C:\Users\Username\Desktop\SilkRoad 或 C:\Users\Username\Documents\SilkRoad)

## 如何上传代码

改完保存

在SilkRoad项目根目录里打开终端，依次输入
  # 缓存文件（有个 . 别漏了）
    git add .
  # 确认文件（引号内的中文可修改）
    git commit -m "feat: 完成首页BGM配置"
    git push origin ****/****

上传完成

（每次修改代码之前这些步骤都要重复一遍，以同步我们各自修改代码到本地）

## 如何打开网页

在SilkRoad项目根目录里打开终端，执行

npm run dev

会出现一个接口为5173网址，复制到浏览器打开即可

## 推荐 IDE 设置

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（请禁用 Vetur）。

## 推荐浏览器设置

- 基于 Chromium 的浏览器（Chrome、Edge、Brave 等）：
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [在 Chrome DevTools 中开启自定义对象格式化](http://bit.ly/object-formatters)
- Firefox：
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [在 Firefox DevTools 中开启自定义对象格式化](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## TS 中 `.vue` 导入的类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` CLI 进行类型检查。在编辑器中，需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 使 TypeScript 语言服务识别 `.vue` 类型。

## 自定义配置

参见 [Vite 配置参考](https://vite.dev/config/)。

## 项目安装

```sh
npm install
```

### 开发环境编译与热重载

```sh
npm run dev
```

### 生产环境类型检查、编译与压缩

```sh
npm run build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
npm run test:unit
```

### 使用 [Playwright](https://playwright.dev) 运行端到端测试

```sh
# 首次运行时安装浏览器
npx playwright install

# 在 CI 环境中测试时，需先构建项目
npm run build

# 运行端到端测试
npm run test:e2e
# 仅在 Chromium 上运行测试
npm run test:e2e -- --project=chromium
# 运行指定文件的测试
npm run test:e2e -- tests/example.spec.ts
# 以调试模式运行测试
npm run test:e2e -- --debug
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
npm run lint
```
