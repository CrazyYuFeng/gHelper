<template>
  <div class="tool-page">
    <div class="page-header">
      <h2><el-icon><Lock /></el-icon> {{ t.password.title }}</h2>
      <p class="page-desc">{{ t.password.desc }}</p>
    </div>

    <el-card shadow="never">
      <div class="pwd-config">
        <div class="config-row"><span class="cl">{{ t.password.length }}</span><el-input-number v-model="pwdLength" :min="4" :max="64" /><span class="hint">{{ t.password.lengthHint }}</span></div>
        <div class="config-row"><span class="cl">{{ t.password.count }}</span><el-input-number v-model="pwdCount" :min="1" :max="50" /><span class="hint">{{ t.password.countHint }}</span></div>
        <div class="config-row">
          <span class="cl">{{ t.password.charTypes }}</span>
          <div class="cb-group">
            <el-checkbox v-model="useDigits" border>{{ t.password.digits }}</el-checkbox>
            <el-checkbox v-model="useLowercase" border>{{ t.password.lowercase }}</el-checkbox>
            <el-checkbox v-model="useUppercase" border>{{ t.password.uppercase }}</el-checkbox>
            <el-checkbox v-model="useSymbols" border>{{ t.password.symbols }}</el-checkbox>
          </div>
        </div>
        <el-button type="primary" size="large" @click="generatePasswords" :disabled="!anySelected"><el-icon><Refresh /></el-icon> {{ t.password.generate }}</el-button>
      </div>
    </el-card>

    <el-card v-if="passwords.length" shadow="never" style="margin-top:20px">
      <template #header>
        <div class="card-header">
          <span>{{ t.password.generated }}（{{ passwords.length }}）</span>
          <div>
            <el-button size="small" @click="copyAll"><el-icon><CopyDocument /></el-icon> {{ t.password.copyAll }}</el-button>
            <el-button size="small" @click="generatePasswords"><el-icon><Refresh /></el-icon> {{ t.password.regenerate }}</el-button>
          </div>
        </div>
      </template>
      <div class="pwd-list">
        <div v-for="(pwd, idx) in passwords" :key="idx" class="pwd-item">
          <span class="pwd-idx">{{ idx + 1 }}</span>
          <code class="pwd-text">{{ pwd }}</code>
          <div class="pwd-meta"><el-tag size="small" :type="strengthType(pwd)">{{ strengthLabel(pwd) }}</el-tag></div>
          <el-button size="small" text @click="copyVal(pwd)"><el-icon><CopyDocument /></el-icon></el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '../locales'

const { t } = useI18n()

const pwdLength = ref(16), pwdCount = ref(5)
const useDigits = ref(true), useLowercase = ref(true), useUppercase = ref(true), useSymbols = ref(true)
const passwords = ref([])

const anySelected = computed(() => useDigits.value || useLowercase.value || useUppercase.value || useSymbols.value)

const digits = '0123456789', lowercase = 'abcdefghijklmnopqrstuvwxyz', uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function generatePasswords() {
  if (!anySelected.value) return
  let charset = ''
  if (useDigits.value) charset += digits
  if (useLowercase.value) charset += lowercase
  if (useUppercase.value) charset += uppercase
  if (useSymbols.value) charset += symbols

  const result = []
  for (let i = 0; i < pwdCount.value; i++) {
    let pwd = ''
    const arr = new Uint32Array(pwdLength.value)
    crypto.getRandomValues(arr)
    for (let j = 0; j < pwdLength.value; j++) pwd += charset[arr[j] % charset.length]
    result.push(pwd)
  }
  passwords.value = result
}

function strengthType(pwd) {
  let s = 0
  if (/[0-9]/.test(pwd)) s++; if (/[a-z]/.test(pwd)) s++; if (/[A-Z]/.test(pwd)) s++; if (/[^a-zA-Z0-9]/.test(pwd)) s++
  if (pwd.length >= 12) s++; if (pwd.length >= 16) s++
  return s >= 5 ? 'success' : s >= 3 ? 'warning' : 'danger'
}

function strengthLabel(pwd) {
  let s = 0
  if (/[0-9]/.test(pwd)) s++; if (/[a-z]/.test(pwd)) s++; if (/[A-Z]/.test(pwd)) s++; if (/[^a-zA-Z0-9]/.test(pwd)) s++
  if (pwd.length >= 12) s++; if (pwd.length >= 16) s++
  return s >= 5 ? t.value.password.strength.strong : s >= 3 ? t.value.password.strength.medium : t.value.password.strength.weak
}

function copyVal(v) { navigator.clipboard.writeText(v).then(() => ElMessage.success(t.value.password.copied)) }
function copyAll() { navigator.clipboard.writeText(passwords.value.join('\n')).then(() => ElMessage.success(t.value.password.copiedAll)) }
</script>

<style scoped>
.tool-page { max-width: 100%; }
.page-header { margin-bottom: 24px; }
.page-header h2 { display: flex; align-items: center; gap: 8px; font-size: 22px; color: var(--el-text-color-primary); }
.page-desc { color: var(--el-text-color-secondary); margin-top: 6px; font-size: 14px; }
.pwd-config { display: flex; flex-direction: column; gap: 20px; }
.config-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cl { font-weight: 500; min-width: 90px; color: var(--el-text-color-primary); }
.hint { color: var(--el-text-color-secondary); font-size: 13px; }
.cb-group { display: flex; gap: 10px; flex-wrap: wrap; }
.card-header { display: flex; align-items: center; justify-content: space-between; }
.pwd-list { display: flex; flex-direction: column; gap: 8px; }
.pwd-item { display: flex; align-items: center; gap: 12px; padding: 10px 16px; background: var(--el-fill-color-lighter); border-radius: 8px; transition: background 0.2s; }
.pwd-item:hover { background: var(--el-fill-color-light); }
.pwd-idx { font-weight: 600; color: var(--el-text-color-secondary); min-width: 28px; }
.pwd-text { flex: 1; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 14px; color: var(--el-text-color-primary); word-break: break-all; }
.pwd-meta { flex-shrink: 0; }
</style>
