import type { Configuration } from '@rspack/core'
import type Config from 'webpack-5-chain'
import { merge } from 'webpack-merge'
import type { WebpackBundlerOptions } from './types.js'

export const resolveWebpackConfig = ({
  config,
  options,
  isServer,
  isBuild,
}: {
  config: Config
  options: WebpackBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Configuration => {
  // allow modifying webpack config via `chainWebpack`
  options.chainWebpack?.(config, isServer, isBuild)
  config.module.parser.set('css/auto', {
    namedExports: false,
  },)
  // generate webpack config from webpack-5-chain
  const webpackConfig = config.toConfig()

  // allow modifying webpack config via `configureWebpack`
  const configureWebpackResult = options.configureWebpack?.(
    webpackConfig,
    isServer,
    isBuild,
  )

  // if `configureWebpack` returns a configuration object,
  // use webpack-merge to merge it
  if (configureWebpackResult) {
    return merge(webpackConfig, configureWebpackResult)
  }

  return webpackConfig
}
