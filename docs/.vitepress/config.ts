import { defineConfig } from 'vitepress'
import { globSync } from 'glob'
import normalize from 'normalize-path'

const notes = globSync('./docs/note/*.md')
  .map(filePath => {
    return normalize(filePath).split('/').pop()?.replace(/\.md$/, '')
  })
  .map(text => {
    return { text, link: `/note/${text}` }
  })
console.log(notes)

const question = globSync('./docs/question/*.md')
  .map(filePath => {
    return normalize(filePath).split('/').pop()?.replace(/\.md$/, '')
  })
  .map(text => {
    return { text, link: `/question/${text}` }
  })

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
        link: notes[0].link,
      },
      {
        text: '问答',
        link: question[0].link,
      },
      //       {
      //         text: '面试',
      //         link: '/interview/HTML',
      //       },
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
      '/note/': notes,
      '/question/': question,
      '/interview/': [
        {
          text: '面试',
          items: [
            {
              text: 'HTML',
              link: '/interview/HTML',
            },
            {
              text: 'CSS',
              link: '/interview/CSS',
            },
            {
              text: 'JavaScript',
              link: '/interview/JavaScript',
            },
          ],
        },
      ],
    },
  },
})
