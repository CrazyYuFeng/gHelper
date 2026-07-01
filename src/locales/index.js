import { computed } from 'vue'
import { useLocaleStore } from '../stores/locale'
import zhCN from './zh-CN.js'
import en from './en.js'

const messages = { 'zh-CN': zhCN, en }

export function useI18n() {
  const localeStore = useLocaleStore()
  const t = computed(() => messages[localeStore.lang] || zhCN)
  const locale = computed(() => localeStore.lang)

  function setLocale(lang) { localeStore.setLang(lang) }
  function toggleLocale() { localeStore.toggle() }

  return { t, locale, setLocale, toggleLocale }
}
