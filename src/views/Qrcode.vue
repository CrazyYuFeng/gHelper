<template>
  <div class="tool-page">
    <div class="page-header">
      <h2><el-icon><PictureFilled /></el-icon> {{ t.qrcode.title }}</h2>
      <p class="page-desc">{{ t.qrcode.desc }}</p>
    </div>

    <el-card shadow="never">
      <div class="qr-form">
        <div class="form-item"><label>{{ t.qrcode.inputLabel }}</label><el-input v-model="qrText" type="textarea" :rows="4" :placeholder="t.qrcode.inputPlaceholder" style="max-width:500px" /></div>
        <div class="form-item"><label>{{ t.qrcode.sizeLabel }}</label><el-slider v-model="qrSize" :min="128" :max="512" :step="16" show-input style="max-width:400px" /></div>
        <div class="form-item"><label>{{ t.qrcode.errorLevel }}</label>
          <el-select v-model="qrErrorLevel" style="width:180px">
            <el-option label="L - Low (7%)" value="L" /><el-option label="M - Medium (15%)" value="M" />
            <el-option label="Q - High (25%)" value="Q" /><el-option label="H - Best (30%)" value="H" />
          </el-select>
        </div>
        <el-button type="primary" @click="generateQR" :disabled="!qrText.trim()">{{ t.qrcode.generate }}</el-button>
      </div>
    </el-card>

    <el-card v-if="qrDataUrl" shadow="never" style="margin-top:20px">
      <template #header><span>{{ t.qrcode.result }}</span></template>
      <div class="qr-display">
        <img :src="qrDataUrl" alt="QR Code" class="qr-img" />
        <div class="qr-actions">
          <el-button type="primary" @click="downloadQR"><el-icon><Download /></el-icon> {{ t.qrcode.download }}</el-button>
          <el-button @click="copyQRImage"><el-icon><CopyDocument /></el-icon> {{ t.qrcode.copyImage }}</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'
import { useI18n } from '../locales'

const { t } = useI18n()

const qrText = ref(''), qrSize = ref(256), qrErrorLevel = ref('M'), qrDataUrl = ref('')

async function generateQR() {
  if (!qrText.value.trim()) return
  try {
    qrDataUrl.value = await QRCode.toDataURL(qrText.value, { width: qrSize.value, errorCorrectionLevel: qrErrorLevel.value, margin: 2 })
  } catch (e) { ElMessage.error(t.value.qrcode.generateFailed + '：' + e.message) }
}

function downloadQR() {
  if (!qrDataUrl.value) return
  const a = document.createElement('a'); a.download = 'qrcode.png'; a.href = qrDataUrl.value; a.click()
  ElMessage.success(t.value.qrcode.downloadSuccess)
}

async function copyQRImage() {
  if (!qrDataUrl.value) return
  try {
    const r = await fetch(qrDataUrl.value); const b = await r.blob()
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })])
    ElMessage.success(t.value.qrcode.copySuccess)
  } catch (e) { ElMessage.error(t.value.qrcode.copyFailed) }
}
</script>

<style scoped>
.tool-page { max-width: 100%; }
.page-header { margin-bottom: 24px; }
.page-header h2 { display: flex; align-items: center; gap: 8px; font-size: 22px; color: var(--el-text-color-primary); }
.page-desc { color: var(--el-text-color-secondary); margin-top: 6px; font-size: 14px; }
.qr-form { display: flex; flex-direction: column; gap: 20px; }
.form-item { display: flex; align-items: center; gap: 12px; }
.form-item label { font-weight: 500; min-width: 100px; color: var(--el-text-color-primary); }
.qr-display { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.qr-img { border: 1px solid var(--el-border-color-light); border-radius: 8px; padding: 12px; background: #fff; }
.qr-actions { display: flex; gap: 12px; }
</style>
