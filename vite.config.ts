import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
import {
  VuetifyResolver,
} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader';
import FullReload from 'vite-plugin-full-reload'

export default defineConfig({
  plugins: [
    FullReload(['config/routes.rb', 'app/views/**/*', 'app/backend/**/*', 'app/frontend/**/*'], { delay: 200 }),
    RubyPlugin(),
    vue({
      include: [/\.vue$/, /\.md$/],
      template: { transformAssetUrls }
    }),
    svgLoader(),
    vuetify({ 
      autoImport: true,
      treeShake: true,
      styles: { 
        configFile: 'src/settings.scss',    
      }
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts',
    }),
      Components({
        resolvers: [
          VuetifyResolver(),
        ],      
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      })    
    ],
})
