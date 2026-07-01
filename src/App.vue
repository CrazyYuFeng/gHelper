<template>
  <div :class="{ dark: themeStore.isDark }">
    <el-container class="app-container">
      <el-header class="app-header">
        <div class="header-left">
          <el-button text @click="$router.push('/')" class="logo-btn">
            <el-icon :size="24"><Tools /></el-icon>
            <span class="logo-text">{{ t.app.title }}</span>
          </el-button>
          <el-menu
            :default-active="currentRoute"
            mode="horizontal"
            :ellipsis="false"
            class="header-menu"
            @select="handleMenuSelect"
          >
            <el-menu-item index="/json-formatter">{{ t.nav.jsonFormatter }}</el-menu-item>
            <el-menu-item index="/codec">{{ t.nav.codec }}</el-menu-item>
            <el-menu-item index="/timestamp">{{ t.nav.timestamp }}</el-menu-item>
            <el-menu-item index="/qrcode">{{ t.nav.qrcode }}</el-menu-item>
            <el-menu-item index="/password">{{ t.nav.password }}</el-menu-item>
            <el-menu-item index="/diff">{{ t.nav.diff }}</el-menu-item>
            <el-menu-item index="/image-base64">{{ t.nav.imageBase64 }}</el-menu-item>
            <el-menu-item index="/crontab">{{ t.nav.crontab }}</el-menu-item>
          </el-menu>
        </div>
        <div class="header-right">
          <el-button text @click="$router.push('/sponsor')" class="sponsor-btn">
            ❤️ {{ t.nav.sponsor }}
          </el-button>
          <el-button text @click="toggleLocale" class="lang-btn">
            {{ locale === 'zh-CN' ? 'EN' : '中' }}
          </el-button>
          <el-button text circle @click="themeStore.toggle">
            <el-icon :size="20">
              <Sunny v-if="!themeStore.isDark" />
              <Moon v-else />
            </el-icon>
          </el-button>
        </div>
      </el-header>
      <el-main class="app-main" :class="{ 'app-main-full': isFullPage }">
        <router-view />
      </el-main>
      <el-footer class="app-footer" v-if="!isFullPage">
        <span>{{ t.app.footer }}</span>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { useI18n } from './locales'

const { t, locale, toggleLocale } = useI18n()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.path)

const fullPages = ['/json-formatter', '/codec', '/diff', '/image-base64']
const isFullPage = computed(() => fullPages.includes(route.path))

function handleMenuSelect(index) {
  router.push(index)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
}

.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color-page);
  transition: background 0.3s;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  padding: 0 24px;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
}

.logo-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  flex-shrink: 0;
}

.logo-text {
  background: linear-gradient(135deg, #409eff, #67c23a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-menu {
  border-bottom: none !important;
  background: transparent !important;
  flex: 1;
  overflow: hidden;
}

.header-menu .el-menu-item {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
}

.header-menu .el-menu-item.is-active {
  border-bottom-color: #409eff;
  color: #409eff;
}

.header-right {
  flex-shrink: 0;
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.lang-btn {
  font-weight: 700;
  font-size: 13px;
  min-width: 36px;
  color: var(--el-text-color-secondary);
}

.sponsor-btn {
  font-size: 13px;
  color: #e6a23c;
  margin-right: 4px;
}

.app-main {
  flex: 1;
  padding: 24px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  overflow: auto;
}

.app-main-full {
  max-width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-footer {
  text-align: center;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  padding: 12px;
  border-top: 1px solid var(--el-border-color-light);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .header-menu {
    display: none;
  }
}
</style>
