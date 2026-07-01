import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocaleStore = defineStore('locale', () => {
  const lang = ref(localStorage.getItem('lang') || 'zh-CN')

  function setLang(l) {
    lang.value = l
    localStorage.setItem('lang', l)
  }

  function toggle() {
    setLang(lang.value === 'zh-CN' ? 'en' : 'zh-CN')
  }

  return { lang, setLang, toggle }
})
