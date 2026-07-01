<template>
  <div class="home-page">
    <div class="hero-section">
      <h1 class="hero-title">{{ t.home.heroTitle }}</h1>
      <p class="hero-desc">{{ t.home.heroDesc }}</p>
    </div>

    <div class="tools-grid">
      <el-card
        v-for="tool in tools"
        :key="tool.path"
        class="tool-card"
        shadow="hover"
        @click="$router.push(tool.path)"
      >
        <div class="tool-icon">
          <el-icon :size="36">
            <component :is="tool.icon" />
          </el-icon>
        </div>
        <h3 class="tool-name">{{ tool.name }}</h3>
        <p class="tool-desc">{{ tool.desc }}</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../locales'

const { t } = useI18n()

const tools = computed(() => [
  { path: '/json-formatter', icon: 'Document', ...t.value.home.tools.jsonFormatter },
  { path: '/codec', icon: 'Connection', ...t.value.home.tools.codec },
  { path: '/timestamp', icon: 'Clock', ...t.value.home.tools.timestamp },
  { path: '/qrcode', icon: 'PictureFilled', ...t.value.home.tools.qrcode },
  { path: '/password', icon: 'Lock', ...t.value.home.tools.password },
  { path: '/diff', icon: 'Files', ...t.value.home.tools.diff },
  { path: '/image-base64', icon: 'Picture', ...t.value.home.tools.imageBase64 },
  { path: '/crontab', icon: 'Timer', ...t.value.home.tools.crontab }
])
</script>

<style scoped>
.home-page { padding: 20px 0; }
.hero-section { text-align: center; padding: 40px 20px 50px; }
.hero-title { font-size: 36px; font-weight: 700; color: var(--el-text-color-primary); margin-bottom: 12px; }
.hero-desc { font-size: 16px; color: var(--el-text-color-secondary); }
.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 0 10px; }
.tool-card { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; border-radius: 12px; }
.tool-card:hover { transform: translateY(-4px); }
.tool-icon { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, #409eff20, #67c23a20); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #409eff; }
.tool-name { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: var(--el-text-color-primary); }
.tool-desc { font-size: 14px; color: var(--el-text-color-secondary); line-height: 1.6; }
</style>
