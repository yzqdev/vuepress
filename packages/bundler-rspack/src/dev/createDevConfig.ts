import rspack from '@rspack/core'
import type { App } from '@vuepress/core'
import HtmlPlugin from 'html-webpack-plugin'
import type Config from 'webpack-5-chain'
import { createClientBaseConfig } from '../config/index.js'
import type { WebpackBundlerOptions } from '../types.js'

export const createDevConfig = async (
  app: App,
  options: WebpackBundlerOptions,
): Promise<Config> => {
  const config = await createClientBaseConfig({
    app,
    options,
    isBuild: false,
  })

  config.plugin('html').use(HtmlPlugin, [
    {
      template: app.options.templateDev,
    },
  ])

  config.plugin('hmr').use(rspack.HotModuleReplacementPlugin)

  return config
}
