# Bergen Cello-klubb Website

这是一个使用 Next.js 14 和 TypeScript 开发的大提琴俱乐部网站。

## 功能特点

- 🎻 **现代化设计** - 采用深沉的木质色调，符合大提琴的音乐感
- 🎪 **活动轮播** - 自动播放的活动展示，支持手动切换
- 📅 **交互式日历** - 显示所有活动的月历视图
- 📱 **响应式布局** - 完美适配手机、平板和电脑
- ⚡ **高性能** - 使用 Next.js 14 的 App Router 和服务端组件

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: CSS Modules
- **部署**: 支持 Vercel、Netlify 等平台

## 安装步骤

1. **安装依赖**
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

2. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

3. **打开浏览器访问** [http://localhost:3000](http://localhost:3000)

## 项目结构

```
cello-website-nextjs/
├── app/
│   ├── components/          # React 组件
│   │   ├── Navigation.tsx   # 导航栏
│   │   ├── Hero.tsx         # Hero 区域
│   │   ├── EventsCarousel.tsx  # 活动轮播
│   │   ├── Calendar.tsx     # 日历
│   │   └── Footer.tsx       # 页脚
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 首页
├── public/                  # 静态资源
├── package.json
├── tsconfig.json
└── next.config.js
```

## 自定义活动数据

活动数据在以下两个文件中定义：

- `app/components/EventsCarousel.tsx` - 轮播活动
- `app/components/Calendar.tsx` - 日历活动

修改这些文件中的 `events` 数组来更新活动信息。

## 部署

### Vercel (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 并进行配置
4. 点击部署

### 其他平台

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 配色方案

网站采用大提琴木质配色：

- 主色：深棕色 (#8b4513)
- 次色：红木色 (#654321)
- 强调色：金色木纹 (#d4a574)
- 背景：温暖的奶油色

## 许可证

此项目仅用于 Bergen Cello-klubb。
