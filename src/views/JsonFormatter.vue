<template>
  <div class="full-page-tool">
    <div class="tool-topbar">
      <div class="topbar-left">
        <h2><el-icon><Document /></el-icon> {{ t.jsonFormatter.title }}</h2>
        <div class="tool-actions">
          <el-button @click="clearInput">{{ t.jsonFormatter.clear }}</el-button>
          <el-button type="primary" @click="formatJson">{{ t.jsonFormatter.format }}</el-button>
          <el-button type="success" @click="compressJson">{{ t.jsonFormatter.compress }}</el-button>
          <el-button type="warning" @click="validateJson">{{ t.jsonFormatter.validate }}</el-button>
        </div>
      </div>
    </div>

    <div v-if="errorMsg" class="msg-bar"><el-alert :title="errorMsg" type="error" show-icon :closable="false" /></div>
    <div v-if="successMsg" class="msg-bar"><el-alert :title="successMsg" type="success" show-icon :closable="false" /></div>

    <div class="panels-container">
      <div class="panel panel-left">
        <div class="panel-header"><span>{{ t.jsonFormatter.input }}</span></div>
        <el-input v-model="input" type="textarea" :placeholder="t.jsonFormatter.placeholder" class="code-input full-textarea" :autosize="false" />
      </div>
      <div class="panel panel-right">
        <div class="panel-header">
          <span>{{ t.jsonFormatter.output }}</span>
          <el-button size="small" text @click="copyOutput" :disabled="!output"><el-icon><CopyDocument /></el-icon> {{ t.jsonFormatter.copy }}</el-button>
        </div>
        <el-input v-model="output" type="textarea" readonly :placeholder="t.jsonFormatter.resultPlaceholder" class="code-input full-textarea" :autosize="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '../locales'

const { t } = useI18n()

const input = ref('')
const output = ref('')
const errorMsg = ref('')
const successMsg = ref('')

function clearInput() { input.value = ''; output.value = ''; errorMsg.value = ''; successMsg.value = '' }

function formatJson() {
  errorMsg.value = ''; successMsg.value = ''
  if (!input.value.trim()) { errorMsg.value = t.value.jsonFormatter.emptyInput; return }
  try {
    output.value = JSON.stringify(JSON.parse(input.value), null, 2)
    successMsg.value = t.value.jsonFormatter.formatSuccess
  } catch (e) { errorMsg.value = t.value.jsonFormatter.parseError + '：' + e.message; output.value = '' }
}

function compressJson() {
  errorMsg.value = ''; successMsg.value = ''
  if (!input.value.trim()) { errorMsg.value = t.value.jsonFormatter.emptyInput; return }
  try {
    output.value = JSON.stringify(JSON.parse(input.value))
    successMsg.value = t.value.jsonFormatter.compressSuccess
  } catch (e) { errorMsg.value = t.value.jsonFormatter.parseError + '：' + e.message; output.value = '' }
}

function validateJson() {
  errorMsg.value = ''; successMsg.value = ''
  if (!input.value.trim()) { errorMsg.value = t.value.jsonFormatter.emptyInput; return }
  try {
    JSON.parse(input.value)
    successMsg.value = t.value.jsonFormatter.validJson
    output.value = input.value
  } catch (e) { errorMsg.value = t.value.jsonFormatter.invalidJson + '：' + e.message; output.value = '' }
}

function copyOutput() {
  if (!output.value) return
  navigator.clipboard.writeText(output.value).then(() => ElMessage.success(t.value.jsonFormatter.copied))
}
</script>

<style scoped>
.full-page-tool { display: flex; flex-direction: column; height: 100%; }
.tool-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-shrink: 0; }
.topbar-left { display: flex; align-items: center; gap: 20px; }
.tool-topbar h2 { display: flex; align-items: center; gap: 8px; font-size: 20px; color: var(--el-text-color-primary); }
.tool-actions { display: flex; gap: 8px; }
.msg-bar { flex-shrink: 0; margin-bottom: 8px; }
.panels-container { flex: 1; display: flex; gap: 12px; min-height: 0; }
.panel { flex: 1; display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--el-border-color-light); border-radius: 8px; overflow: hidden; background: var(--el-bg-color); }
.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 14px; font-weight: 500; color: var(--el-text-color-secondary); background: var(--el-fill-color-lighter); border-bottom: 1px solid var(--el-border-color-light); flex-shrink: 0; }
.full-textarea { flex: 1; min-height: 0; }
.full-textarea :deep(textarea) { height: 100% !important; min-height: 0 !important; resize: none; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; line-height: 1.6; border: none; border-radius: 0; box-shadow: none; }
.full-textarea :deep(.el-textarea__inner) { height: 100% !important; }
</style>
