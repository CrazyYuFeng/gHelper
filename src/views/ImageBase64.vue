<template>
  <div class="full-page-tool">
    <div class="tool-topbar">
      <h2><el-icon><Picture /></el-icon> {{ t.imageBase64.title }}</h2>
    </div>

    <div class="panels-container">
      <div class="panel panel-left">
        <div class="panel-header">
          <span>{{ t.imageBase64.upload }}</span>
          <span class="header-hint">{{ t.imageBase64.uploadHint }}</span>
        </div>
        <div class="upload-wrapper">
          <el-upload class="upload-area" drag :auto-upload="false" :show-file-list="false" :on-change="handleFileChange" accept="image/*">
            <div v-if="!previewUrl" class="upload-placeholder">
              <el-icon :size="56" class="upload-icon"><UploadFilled /></el-icon>
              <div class="upload-text">{{ t.imageBase64.dropText }} <em>{{ t.imageBase64.clickUpload }}</em></div>
            </div>
            <div v-else class="preview-container"><img :src="previewUrl" class="preview-img" /></div>
          </el-upload>
          <div v-if="fileInfo" class="file-info">
            <el-tag>{{ fileInfo.name }}</el-tag><el-tag type="success">{{ fileInfo.size }}</el-tag><el-tag>{{ fileInfo.type }}</el-tag><el-tag>{{ fileInfo.dimensions }}</el-tag>
          </div>
        </div>
      </div>

      <div class="panel panel-right">
        <div class="panel-header">
          <span>{{ t.imageBase64.result }}</span>
          <div class="panel-header-actions">
            <el-tag v-if="base64Result" :type="base64Result.length > 100000 ? 'warning' : 'success'" size="small" style="margin-right:8px">{{ formatSize(base64Result.length) }}</el-tag>
            <el-radio-group v-model="outputMode" size="small">
              <el-radio-button value="base64">{{ t.imageBase64.pureBase64 }}</el-radio-button>
              <el-radio-button value="datauri">{{ t.imageBase64.dataUri }}</el-radio-button>
              <el-radio-button value="html">{{ t.imageBase64.html }}</el-radio-button>
              <el-radio-button value="css">{{ t.imageBase64.css }}</el-radio-button>
            </el-radio-group>
            <el-button size="small" text @click="copyOutput" :disabled="!displayOutput"><el-icon><CopyDocument /></el-icon></el-button>
            <el-button size="small" text @click="downloadTxt" :disabled="!displayOutput"><el-icon><Download /></el-icon></el-button>
          </div>
        </div>
        <el-input v-model="displayOutput" type="textarea" readonly :placeholder="t.imageBase64.resultPlaceholder" class="code-input full-textarea" :autosize="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '../locales'

const { t } = useI18n()

const previewUrl = ref(''), fileInfo = ref(null), base64Result = ref(''), outputMode = ref('base64')

const displayOutput = computed(() => {
  if (!base64Result.value) return ''
  switch (outputMode.value) {
    case 'datauri': return `data:${fileInfo.value?.type || 'image/png'};base64,${base64Result.value}`
    case 'html': return `<img src="data:${fileInfo.value?.type || 'image/png'};base64,${base64Result.value}" alt="" />`
    case 'css': return `background-image: url(data:${fileInfo.value?.type || 'image/png'};base64,${base64Result.value});`
    default: return base64Result.value
  }
})

function handleFileChange(file) {
  const raw = file.raw
  if (!raw) return
  if (raw.size > 20 * 1024 * 1024) { ElMessage.warning(t.value.imageBase64.fileTooBig); return }
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(raw)
  const img = new Image()
  img.onload = () => { fileInfo.value = { name: raw.name, size: formatFileSize(raw.size), type: raw.type || 'image/png', dimensions: `${img.width} × ${img.height}` } }
  img.src = previewUrl.value
  const reader = new FileReader()
  reader.onload = (e) => { base64Result.value = e.target.result.split(',')[1] }
  reader.onerror = () => ElMessage.error(t.value.imageBase64.readFailed)
  reader.readAsDataURL(raw)
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function formatSize(len) {
  if (len < 1000) return len + ' ' + t.value.imageBase64.chars
  return (len / 1000).toFixed(1) + ' ' + t.value.imageBase64.kChars
}

function copyOutput() { navigator.clipboard.writeText(displayOutput.value).then(() => ElMessage.success(t.value.imageBase64.copied)) }
function downloadTxt() {
  const blob = new Blob([displayOutput.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = (fileInfo.value?.name || 'image') + '.base64.txt'; a.click()
  URL.revokeObjectURL(url); ElMessage.success(t.value.imageBase64.downloadSuccess)
}
</script>

<style scoped>
.full-page-tool { display: flex; flex-direction: column; height: 100%; }
.tool-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-shrink: 0; }
.tool-topbar h2 { display: flex; align-items: center; gap: 8px; font-size: 20px; color: var(--el-text-color-primary); }
.panels-container { flex: 1; display: flex; gap: 12px; min-height: 0; }
.panel { flex: 1; display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--el-border-color-light); border-radius: 8px; overflow: hidden; background: var(--el-bg-color); }
.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 14px; font-weight: 500; color: var(--el-text-color-secondary); background: var(--el-fill-color-lighter); border-bottom: 1px solid var(--el-border-color-light); flex-shrink: 0; gap: 8px; }
.header-hint { font-size: 12px; color: var(--el-text-color-placeholder); font-weight: 400; }
.panel-header-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.upload-wrapper { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.upload-area { flex: 1; display: flex; }
.upload-area :deep(.el-upload) { width: 100%; height: 100%; display: flex; }
.upload-area :deep(.el-upload-dragger) { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 0; border: none; border-bottom: 1px solid var(--el-border-color-light); }
.upload-placeholder { text-align: center; padding: 20px; }
.upload-icon { color: var(--el-text-color-placeholder); margin-bottom: 12px; }
.upload-text { font-size: 16px; color: var(--el-text-color-regular); }
.upload-text em { color: #409eff; font-style: normal; }
.preview-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 12px; }
.preview-img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 4px; }
.file-info { display: flex; gap: 6px; flex-wrap: wrap; padding: 8px 12px; flex-shrink: 0; }
.full-textarea { flex: 1; min-height: 0; }
.full-textarea :deep(textarea) { height: 100% !important; min-height: 0 !important; resize: none; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 12px; line-height: 1.5; border: none; border-radius: 0; box-shadow: none; word-break: break-all; }
.full-textarea :deep(.el-textarea__inner) { height: 100% !important; }
</style>
