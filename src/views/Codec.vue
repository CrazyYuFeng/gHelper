<template>
  <div class="full-page-tool">
    <div class="tool-topbar">
      <div class="topbar-left">
        <h2><el-icon><Connection /></el-icon> {{ t.codec.title }}</h2>
      </div>
    </div>

    <div class="codec-tabs">
      <el-radio-group v-model="codecType" size="default" @change="doConvert">
        <el-radio-button value="base64-encode">{{ t.codec.types.base64Encode }}</el-radio-button>
        <el-radio-button value="base64-decode">{{ t.codec.types.base64Decode }}</el-radio-button>
        <el-radio-button value="url-encode">{{ t.codec.types.urlEncode }}</el-radio-button>
        <el-radio-button value="url-decode">{{ t.codec.types.urlDecode }}</el-radio-button>
        <el-radio-button value="unicode-decode">{{ t.codec.types.unicodeDecode }}</el-radio-button>
        <el-radio-button value="unicode-encode">{{ t.codec.types.unicodeEncode }}</el-radio-button>
        <el-radio-button value="hex-encode">{{ t.codec.types.hexEncode }}</el-radio-button>
        <el-radio-button value="hex-decode">{{ t.codec.types.hexDecode }}</el-radio-button>
        <el-radio-button value="md5">{{ t.codec.types.md5 }}</el-radio-button>
        <el-radio-button value="sha1">{{ t.codec.types.sha1 }}</el-radio-button>
        <el-radio-button value="sha256">{{ t.codec.types.sha256 }}</el-radio-button>
        <el-radio-button value="jwt-decode">{{ t.codec.types.jwtDecode }}</el-radio-button>
        <el-radio-button value="cookie-parse">{{ t.codec.types.cookieParse }}</el-radio-button>
        <el-radio-button value="utf8-encode">{{ t.codec.types.utf8Encode }}</el-radio-button>
        <el-radio-button value="utf8-decode">{{ t.codec.types.utf8Decode }}</el-radio-button>
        <el-radio-button value="utf16-encode">{{ t.codec.types.utf16Encode }}</el-radio-button>
        <el-radio-button value="utf16-decode">{{ t.codec.types.utf16Decode }}</el-radio-button>
      </el-radio-group>
    </div>

    <div v-if="errorMsg" class="msg-bar"><el-alert :title="errorMsg" type="error" show-icon :closable="false" /></div>

    <div class="panels-container">
      <div class="panel panel-left">
        <div class="panel-header">
          <span>{{ t.codec.input }}</span>
          <el-button size="small" text @click="input = ''; output = ''; errorMsg = ''">{{ t.codec.clear }}</el-button>
        </div>
        <el-input v-model="input" type="textarea" :placeholder="inputPlaceholder" class="code-input full-textarea" :autosize="false" @input="doConvert" />
      </div>
      <div class="panel panel-right">
        <div class="panel-header">
          <span>{{ t.codec.output }}</span>
          <el-button size="small" text @click="copyResult" :disabled="!output"><el-icon><CopyDocument /></el-icon> {{ t.codec.copy }}</el-button>
        </div>
        <el-input v-model="output" type="textarea" readonly :placeholder="t.codec.resultPlaceholder" class="code-input full-textarea" :autosize="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import { useI18n } from '../locales'

const { t } = useI18n()

const codecType = ref('base64-encode')
const input = ref('')
const output = ref('')
const errorMsg = ref('')

const placeholderKeys = {
  'base64-encode': 'base64Encode', 'base64-decode': 'base64Decode',
  'url-encode': 'urlEncode', 'url-decode': 'urlDecode',
  'unicode-decode': 'unicodeDecode', 'unicode-encode': 'unicodeEncode',
  'hex-encode': 'hexEncode', 'hex-decode': 'hexDecode',
  'md5': 'md5', 'sha1': 'sha1', 'sha256': 'sha256',
  'jwt-decode': 'jwtDecode', 'cookie-parse': 'cookieParse',
  'utf8-encode': 'utf8Encode', 'utf8-decode': 'utf8Decode',
  'utf16-encode': 'utf16Encode', 'utf16-decode': 'utf16Decode'
}

const inputPlaceholder = computed(() => {
  const key = placeholderKeys[codecType.value]
  return key ? t.value.codec.placeholders[key] : ''
})

function doConvert() {
  errorMsg.value = ''; output.value = ''
  if (!input.value.trim()) return
  try {
    switch (codecType.value) {
      case 'base64-encode': output.value = btoa(unescape(encodeURIComponent(input.value))); break
      case 'base64-decode': output.value = decodeURIComponent(escape(atob(input.value))); break
      case 'url-encode': output.value = encodeURIComponent(input.value); break
      case 'url-decode': output.value = decodeURIComponent(input.value); break
      case 'unicode-decode': output.value = input.value.replace(/\\u[\dA-Fa-f]{4}/g, m => String.fromCharCode(parseInt(m.replace(/\\u/g, ''), 16))); break
      case 'unicode-encode': output.value = input.value.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join(''); break
      case 'hex-encode': output.value = input.value.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''); break
      case 'hex-decode': output.value = input.value.match(/.{1,2}/g).map(b => String.fromCharCode(parseInt(b, 16))).join(''); break
      case 'md5': output.value = CryptoJS.MD5(input.value).toString(); break
      case 'sha1': output.value = CryptoJS.SHA1(input.value).toString(); break
      case 'sha256': output.value = CryptoJS.SHA256(input.value).toString(); break
      case 'jwt-decode': output.value = decodeJWT(input.value); break
      case 'cookie-parse': output.value = parseCookie(input.value); break
      case 'utf8-encode': { const e = new TextEncoder(); const b = e.encode(input.value); output.value = Array.from(b).map(x => '\\x' + x.toString(16).padStart(2, '0')).join(''); break }
      case 'utf8-decode': { const h = input.value.replace(/\\x/g, ''); const b = new Uint8Array(h.match(/.{1,2}/g).map(x => parseInt(x, 16))); output.value = new TextDecoder().decode(b); break }
      case 'utf16-encode': { const a = new Uint16Array(input.value.split('').map(c => c.charCodeAt(0))); output.value = Array.from(new Uint8Array(a.buffer)).map(x => '\\x' + x.toString(16).padStart(2, '0')).join(''); break }
      case 'utf16-decode': { const h = input.value.replace(/\\x/g, ''); const b = new Uint8Array(h.match(/.{1,2}/g).map(x => parseInt(x, 16))); output.value = String.fromCharCode(...new Uint16Array(b.buffer)); break }
    }
  } catch (e) { errorMsg.value = t.value.codec.convertError + '：' + e.message }
}

function decodeJWT(token) {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error(t.value.codec.invalidJwt)
  const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
  const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
  return JSON.stringify({ header, payload, signature: parts[2] }, null, 2)
}

function parseCookie(cookieStr) {
  const pairs = cookieStr.split(';').map(s => s.trim())
  const result = {}
  pairs.forEach(pair => { const [k, ...v] = pair.split('='); if (k) result[k.trim()] = v.join('=') })
  return JSON.stringify(result, null, 2)
}

function copyResult() {
  if (!output.value) return
  navigator.clipboard.writeText(output.value).then(() => ElMessage.success(t.value.codec.copied))
}
</script>

<style scoped>
.full-page-tool { display: flex; flex-direction: column; height: 100%; }
.tool-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-shrink: 0; }
.topbar-left { display: flex; align-items: center; gap: 20px; }
.tool-topbar h2 { display: flex; align-items: center; gap: 8px; font-size: 20px; color: var(--el-text-color-primary); }
.codec-tabs { flex-shrink: 0; margin-bottom: 10px; overflow-x: auto; white-space: nowrap; padding-bottom: 4px; }
.codec-tabs :deep(.el-radio-button__inner) { padding: 8px 16px; font-size: 14px; }
.msg-bar { flex-shrink: 0; margin-bottom: 8px; }
.panels-container { flex: 1; display: flex; gap: 12px; min-height: 0; }
.panel { flex: 1; display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--el-border-color-light); border-radius: 8px; overflow: hidden; background: var(--el-bg-color); }
.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 14px; font-weight: 500; color: var(--el-text-color-secondary); background: var(--el-fill-color-lighter); border-bottom: 1px solid var(--el-border-color-light); flex-shrink: 0; }
.full-textarea { flex: 1; min-height: 0; }
.full-textarea :deep(textarea) { height: 100% !important; min-height: 0 !important; resize: none; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; line-height: 1.6; border: none; border-radius: 0; box-shadow: none; }
.full-textarea :deep(.el-textarea__inner) { height: 100% !important; }
</style>
