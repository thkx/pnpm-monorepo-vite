import { defineConfig, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import { viteMockServe } from 'vite-plugin-mock';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig((env: ConfigEnv) => {
  console.log(env)
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      viteMockServe({
        mockPath: 'mock', // mock文件夹路径
        enable: env.command === 'serve' // 只有开发环境才开启mock
      }),
    ],

    server: {
      host: '0.0.0.0',
    },

    base: '',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      alias: {
        '@': resolve(__dirname, './src')
      }
    },

    // fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    }
  }
})
