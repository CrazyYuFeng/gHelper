<template>
  <div class="tool-page">
    <div class="page-header">
      <h2><el-icon><Clock /></el-icon> {{ t.timestamp.title }}</h2>
      <p class="page-desc">{{ t.timestamp.desc }}</p>
    </div>

    <el-card shadow="never">
      <template #header><span class="card-title">{{ t.timestamp.currentTime }}</span></template>
      <div class="time-grid">
        <div class="time-item"><span class="tl">{{ t.timestamp.localTime }}</span><span class="tv">{{ cur.local }}</span></div>
        <div class="time-item"><span class="tl">{{ t.timestamp.utcTime }}</span><span class="tv">{{ cur.utc }}</span></div>
        <div class="time-item"><span class="tl">{{ t.timestamp.tsSeconds }}</span><span class="tv mono">{{ cur.tsSec }}</span><el-button size="small" text @click="copyVal(cur.tsSec)"><el-icon><CopyDocument /></el-icon></el-button></div>
        <div class="time-item"><span class="tl">{{ t.timestamp.tsMilliseconds }}</span><span class="tv mono">{{ cur.tsMs }}</span><el-button size="small" text @click="copyVal(cur.tsMs)"><el-icon><CopyDocument /></el-icon></el-button></div>
        <div class="time-item"><span class="tl">{{ t.timestamp.iso8601 }}</span><span class="tv mono">{{ cur.iso }}</span></div>
        <div class="time-item"><span class="tl">{{ t.timestamp.weekday }}</span><span class="tv">{{ cur.weekday }}</span></div>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top:20px">
      <template #header><span class="card-title">{{ t.timestamp.tsToDate }}</span></template>
      <div class="conv-row">
        <el-input v-model="tsInput" :placeholder="t.timestamp.tsPlaceholder" style="width:300px" clearable />
        <el-select v-model="tsUnit" style="width:120px;margin-left:12px">
          <el-option :label="t.timestamp.autoDetect" value="auto" /><el-option :label="t.timestamp.seconds" value="seconds" /><el-option :label="t.timestamp.milliseconds" value="milliseconds" />
        </el-select>
        <el-button type="primary" @click="tsToDate" style="margin-left:12px">{{ t.timestamp.convert }}</el-button>
      </div>
      <div v-if="tsResult.length" class="result-area">
        <div class="result-item" v-for="item in tsResult" :key="item.label">
          <span class="rl">{{ item.label }}</span><span class="rv mono">{{ item.value }}</span>
          <el-button size="small" text @click="copyVal(item.value)"><el-icon><CopyDocument /></el-icon></el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top:20px">
      <template #header><span class="card-title">{{ t.timestamp.dateToTs }}</span></template>
      <div class="conv-row">
        <el-date-picker v-model="dateInput" type="datetime" :placeholder="t.timestamp.selectDate" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" style="width:280px" />
        <el-button type="primary" @click="dateToTs" style="margin-left:12px">{{ t.timestamp.convert }}</el-button>
      </div>
      <div v-if="dateResult" class="result-area">
        <div class="result-item"><span class="rl">{{ t.timestamp.tsSeconds }}</span><span class="rv mono">{{ dateResult.seconds }}</span><el-button size="small" text @click="copyVal(dateResult.seconds)"><el-icon><CopyDocument /></el-icon></el-button></div>
        <div class="result-item"><span class="rl">{{ t.timestamp.tsMilliseconds }}</span><span class="rv mono">{{ dateResult.milliseconds }}</span><el-button size="small" text @click="copyVal(dateResult.milliseconds)"><el-icon><CopyDocument /></el-icon></el-button></div>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top:20px">
      <template #header><span class="card-title">{{ t.timestamp.freeParse }}</span></template>
      <div class="conv-row">
        <el-input v-model="freeInput" :placeholder="t.timestamp.freePlaceholder" style="width:400px" clearable />
        <el-button type="primary" @click="parseFree" style="margin-left:12px">{{ t.timestamp.parse }}</el-button>
      </div>
      <div v-if="freeResult.length" class="result-area">
        <div class="result-item" v-for="item in freeResult" :key="item.label">
          <span class="rl">{{ item.label }}</span><span class="rv mono">{{ item.value }}</span>
          <el-button size="small" text @click="copyVal(item.value)"><el-icon><CopyDocument /></el-icon></el-button>
        </div>
      </div>
      <div v-if="freeError" style="margin-top:12px"><el-alert :title="freeError" type="warning" show-icon :closable="false" /></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '../locales'

const { t } = useI18n()

const cur = reactive({ local: '', utc: '', tsSec: '', tsMs: '', iso: '', weekday: '' })
let timer = null

function update() {
  const now = new Date()
  cur.local = now.toLocaleString('zh-CN', { hour12: false })
  cur.utc = now.toUTCString()
  cur.tsSec = String(Math.floor(now.getTime() / 1000))
  cur.tsMs = String(now.getTime())
  cur.iso = now.toISOString()
  cur.weekday = t.value.timestamp.weekdays[now.getDay()]
}

onMounted(() => { update(); timer = setInterval(update, 1000) })
onUnmounted(() => { if (timer) clearInterval(timer) })

const tsInput = ref(''), tsUnit = ref('auto'), tsResult = ref([])
function tsToDate() {
  tsResult.value = []
  if (!tsInput.value.trim()) return
  const ts = tsInput.value.trim()
  let ms = tsUnit.value === 'seconds' ? parseInt(ts) * 1000 : tsUnit.value === 'milliseconds' ? parseInt(ts) : (ts.length >= 13 ? parseInt(ts) : parseInt(ts) * 1000)
  if (isNaN(ms)) return
  const d = new Date(ms)
  tsResult.value = [
    { label: t.value.timestamp.localTime, value: d.toLocaleString('zh-CN', { hour12: false }) },
    { label: t.value.timestamp.utcTime, value: d.toUTCString() },
    { label: t.value.timestamp.iso8601, value: d.toISOString() },
    { label: t.value.timestamp.weekday, value: t.value.timestamp.weekdays[d.getDay()] }
  ]
}

const dateInput = ref(''), dateResult = ref(null)
function dateToTs() {
  dateResult.value = null
  if (!dateInput.value) return
  const d = new Date(dateInput.value)
  dateResult.value = { seconds: String(Math.floor(d.getTime() / 1000)), milliseconds: String(d.getTime()) }
}

const freeInput = ref(''), freeResult = ref([]), freeError = ref('')
function parseFree() {
  freeResult.value = []; freeError.value = ''
  if (!freeInput.value.trim()) return
  const ts = Date.parse(freeInput.value.trim())
  if (isNaN(ts)) { freeError.value = t.value.timestamp.cannotParse; return }
  const d = new Date(ts)
  freeResult.value = [
    { label: t.value.timestamp.localTime, value: d.toLocaleString('zh-CN', { hour12: false }) },
    { label: t.value.timestamp.utcTime, value: d.toUTCString() },
    { label: t.value.timestamp.iso8601, value: d.toISOString() },
    { label: t.value.timestamp.tsSeconds, value: String(Math.floor(ts / 1000)) },
    { label: t.value.timestamp.tsMilliseconds, value: String(ts) },
    { label: t.value.timestamp.weekday, value: t.value.timestamp.weekdays[d.getDay()] }
  ]
}

function copyVal(v) { navigator.clipboard.writeText(v).then(() => ElMessage.success(t.value.timestamp.copied)) }
</script>

<style scoped>
.tool-page { max-width: 100%; }
.page-header { margin-bottom: 24px; }
.page-header h2 { display: flex; align-items: center; gap: 8px; font-size: 22px; color: var(--el-text-color-primary); }
.page-desc { color: var(--el-text-color-secondary); margin-top: 6px; font-size: 14px; }
.card-title { font-weight: 600; }
.time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.time-item { display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: var(--el-fill-color-light); border-radius: 8px; }
.tl { font-weight: 500; color: var(--el-text-color-secondary); white-space: nowrap; min-width: 90px; }
.tv { color: var(--el-text-color-primary); font-size: 14px; }
.mono { font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; }
.conv-row { display: flex; align-items: center; }
.result-area { margin-top: 16px; background: var(--el-fill-color-lighter); border-radius: 8px; padding: 16px; }
.result-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
.rl { font-weight: 500; color: var(--el-text-color-secondary); min-width: 120px; }
.rv { color: var(--el-text-color-primary); }
@media (max-width: 768px) { .time-grid { grid-template-columns: repeat(2, 1fr); } .conv-row { flex-wrap: wrap; gap: 8px; } }
</style>
