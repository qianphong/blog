import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh',
  title: 'Blog',
  description: 'personal blog',
  lastUpdated: true,
  base: '/blog/',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: './logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/qianphong/blog',
      },
    ],
    editLink: {
      pattern: 'https://github.com/qianphong/blog/edit/master/docs/:path',
      text: '修改',
    },
    nav: [
      {
        text: '笔记',
        link: '/note/类型体操通关秘籍',
      },
      {
        text: '问答',
        link: '/question/JavaScript',
      },
      {
        text: '其他',
        items: [
          {
            text: '术语表',
            link: '/glossary',
          },
          {
            text: '常用 NPM 包',
            link: '/package',
          },
          {
            text: '待办',
            link: '/todo',
          },
          {
            text: '待归档',
            link: '/unfiled',
          },
        ],
      },
    ],
    sidebar: {
      '/note/': [
        {
          items: [
            {
              text: '类型体操通关秘籍',
              link: '/note/类型体操通关秘籍',
            },
            {
              text: '前端调试通关秘籍',
              link: '/note/前端调试通关秘籍',
            },
            {
              text: '深入浅出Node.js',
              link: '/note/深入浅出Node',
            },
            {
              text: '深入理解TypeScript',
              link: '/note/深入理解TypeScript',
            },
            {
              text: 'Vue.js设计与实现',
              link: '/note/Vue.js设计与实现',
            },
            {
              text: '实现一个 Web 地图',
              link: '/note/实现一个Web地图',
            },
            {
              text: '看看 SolidJS',
              link: '/note/看看SolidJS',
            },
            {
              text: '集成项目管理工程师',
              link: '/note/集成项目管理工程师',
            },
          ],
        },
      ],
      '/question/': [
        {
          text: '问答',
          items: [
            {
              text: 'JavaScript',
              link: '/question/JavaScript',
            },
            {
              text: 'TypeScript',
              link: '/question/TypeScript',
            },
            {
              text: 'Node.js',
              link: '/question/Node',
            },
            {
              text: '网络',
              link: '/question/Network',
            },
            {
              text: 'Vue',
              link: '/question/Vue',
            },
            {
              text: 'React',
              link: '/question/React',
            },
            {
              text: 'Vite',
              link: '/question/Vite',
            },
            {
              text: 'Webpack',
              link: '/question/Webpack',
            },
            {
              text: 'WebAssembly',
              link: '/question/WebAssembly',
            },
            {
              text: '计算机基础',
              link: '/question/计算机基础',
            },
            {
              text: '手写代码',
              link: '/question/手写代码',
            },
          ],
        },
      ],
    },
  },
})
