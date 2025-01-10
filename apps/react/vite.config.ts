import { ConfigEnv, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { viteMockServe } from 'vite-plugin-mock';

// https://vite.dev/config/
export default defineConfig((env: ConfigEnv) => {
  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mock', // mock文件夹路径
        enable: env.command === 'serve' // 只有开发环境才开启mock
      }),
    ],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_OPTIONS_API__: 'true',
    },
    server: {
      host: '0.0.0.0',
      port: 5175
    },

    // chainWebpack: (config) => {
    //   config.plugin('define').tap((definitions) => {
    //     Object.assign(definitions[0], {
    //       __VUE_OPTIONS_API__: 'true',
    //       __VUE_PROD_DEVTOOLS__: 'false',
    //       __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    //     })
    //     return definitions
    //   })
    // }
  }
})
