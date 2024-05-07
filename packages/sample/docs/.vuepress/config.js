import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { webpackBundler } from '@vuepress/bundler-webpack'
import rspackBundler from '@vuepress/bundler-rspack'
console.log('use rspack', process.env.rspack == 'y')
export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/get-started'],
  }),

  bundler: process.env.rspack == 'y' ? rspackBundler() : webpackBundler(),
})
