<template>
  <div class="tool-page">
    <div class="page-header">
      <h2><el-icon><Timer /></el-icon> {{ t.crontab.title }}</h2>
      <p class="page-desc">{{ t.crontab.desc }}</p>
    </div>

    <el-card shadow="never">
      <div class="expr-row">
        <span class="expr-label">{{ t.crontab.exprLabel }}</span>
        <div class="expr-fields">
          <div class="field-group" :class="{ 'field-active': activeField === 'minute' }">
            <el-input v-model="fields.minute" class="field-input" @focus="activeField = 'minute'" @input="onFieldChange" placeholder="*" />
            <span class="field-name">{{ t.crontab.minute }}</span>
          </div>
          <div class="field-group" :class="{ 'field-active': activeField === 'hour' }">
            <el-input v-model="fields.hour" class="field-input" @focus="activeField = 'hour'" @input="onFieldChange" placeholder="*" />
            <span class="field-name">{{ t.crontab.hour }}</span>
          </div>
          <div class="field-group" :class="{ 'field-active': activeField === 'day' }">
            <el-input v-model="fields.day" class="field-input" @focus="activeField = 'day'" @input="onFieldChange" placeholder="*" />
            <span class="field-name">{{ t.crontab.day }}</span>
          </div>
          <div class="field-group" :class="{ 'field-active': activeField === 'month' }">
            <el-input v-model="fields.month" class="field-input" @focus="activeField = 'month'" @input="onFieldChange" placeholder="*" />
            <span class="field-name">{{ t.crontab.month }}</span>
          </div>
          <div class="field-group" :class="{ 'field-active': activeField === 'week' }">
            <el-input v-model="fields.week" class="field-input" @focus="activeField = 'week'" @input="onFieldChange" placeholder="*" />
            <span class="field-name">{{ t.crontab.week }}</span>
          </div>
        </div>
        <div class="expr-actions">
          <el-button @click="randomDemo">🎲 {{ t.crontab.randomDemo }}</el-button>
          <el-button type="primary" @click="copyExpr" :disabled="!fullExpr"><el-icon><CopyDocument /></el-icon> {{ t.crontab.copy }}</el-button>
        </div>
      </div>

      <div v-if="fullExpr" class="expr-display">
        <code class="expr-code">{{ fullExpr }}</code>
        <el-tag v-if="parseResult.valid" type="success" size="large">{{ t.crontab.valid }}</el-tag>
        <el-tag v-else type="danger" size="large">{{ t.crontab.invalid }}: {{ parseResult.error }}</el-tag>
      </div>
    </el-card>

    <el-card shadow="never" style="margin-top: 16px">
      <template #header><span class="card-title">{{ t.crontab.presets }}</span></template>
      <div class="preset-list">
        <el-button v-for="(label, idx) in t.crontab.presetsList" :key="idx" size="small" :type="isPresetActive(idx) ? 'primary' : 'default'" @click="applyPreset(idx)">{{ label }}</el-button>
      </div>
    </el-card>

    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="12">
        <el-card shadow="never">
          <template #header><span class="card-title">{{ t.crontab.fieldDesc }}</span></template>
          <div class="field-desc-list">
            <div v-for="f in fieldDescriptions" :key="f.name" :class="['field-desc-item', { 'field-highlight': activeField === f.name }]" @click="activeField = f.name">
              <div class="fd-header"><span class="fd-name">{{ f.label }}</span><span class="fd-range">{{ t.crontab.range }}: {{ f.range }}</span></div>
              <div class="fd-examples"><span v-for="ex in f.examples" :key="ex.val" class="fd-example" @click.stop="setField(f.name, ex.val)"><code>{{ ex.val }}</code> {{ ex.desc }}</span></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <template #header><span class="card-title">{{ t.crontab.preview }}</span></template>
          <div v-if="parseResult.valid && nextRuns.length" class="run-list">
            <div class="run-label">{{ t.crontab.nextRuns }}</div>
            <div v-for="(run, idx) in nextRuns" :key="idx" class="run-item"><span class="run-num">{{ idx + 1 }}</span><span class="run-time">{{ run }}</span></div>
          </div>
          <div v-else class="run-empty">{{ parseResult.valid ? t.crontab.computing : t.crontab.enterValid }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from '../locales'

const { t } = useI18n()

const fields = reactive({ minute: '*', hour: '*', day: '*', month: '*', week: '*' })
const activeField = ref('minute')

const fullExpr = computed(() => {
  const vals = [fields.minute, fields.hour, fields.day, fields.month, fields.week]
  if (vals.every(v => v === '' || v === '*')) return ''
  return vals.map(v => v || '*').join(' ')
})

const parseResult = reactive({ valid: true, error: '' })
const nextRuns = ref([])

const fieldDescriptions = computed(() => [
  { name: 'minute', label: t.value.crontab.minute, range: t.value.crontab.fieldRanges.minute, examples: t.value.crontab.fieldExamples.minute },
  { name: 'hour', label: t.value.crontab.hour, range: t.value.crontab.fieldRanges.hour, examples: t.value.crontab.fieldExamples.hour },
  { name: 'day', label: t.value.crontab.day, range: t.value.crontab.fieldRanges.day, examples: t.value.crontab.fieldExamples.day },
  { name: 'month', label: t.value.crontab.month, range: t.value.crontab.fieldRanges.month, examples: t.value.crontab.fieldExamples.month },
  { name: 'week', label: t.value.crontab.week, range: t.value.crontab.fieldRanges.week, examples: t.value.crontab.fieldExamples.week }
])

const presetsData = [
  { minute: '*', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '*/5', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '0', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '8', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '9', day: '*', month: '*', week: '1-5' },
  { minute: '0', hour: '0', day: '*', month: '*', week: '1' },
  { minute: '0', hour: '0', day: '1', month: '*', week: '*' },
  { minute: '*/15', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '*/6', day: '*', month: '*', week: '*' },
  { minute: '*/30', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '*/2', day: '*', month: '*', week: '1-5' }
]

function isPresetActive(idx) {
  const p = presetsData[idx]
  return fields.minute === p.minute && fields.hour === p.hour && fields.day === p.day && fields.month === p.month && fields.week === p.week
}

function applyPreset(idx) {
  const p = presetsData[idx]
  fields.minute = p.minute; fields.hour = p.hour; fields.day = p.day; fields.month = p.month; fields.week = p.week
  validateAndPreview()
}

const randomDemos = [
  { minute: '*/5', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '0', day: '1', month: '*', week: '*' },
  { minute: '0', hour: '9', day: '*', month: '*', week: '1-5' },
  { minute: '30', hour: '8,12,18', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '*/2', day: '*', month: '*', week: '*' },
  { minute: '0', hour: '0', day: '1,15', month: '*', week: '*' },
  { minute: '*/10', hour: '9-17', day: '*', month: '*', week: '1-5' },
  { minute: '0', hour: '4', day: '*', month: '*', week: '0' },
  { minute: '0', hour: '0', day: '*', month: '1,6', week: '*' },
  { minute: '*/2', hour: '*', day: '*', month: '*', week: '*' },
  { minute: '15', hour: '14', day: '*', month: '*', week: '5' },
  { minute: '0', hour: '22', day: 'L', month: '*', week: '*' }
]

function randomDemo() {
  const demo = randomDemos[Math.floor(Math.random() * randomDemos.length)]
  fields.minute = demo.minute; fields.hour = demo.hour; fields.day = demo.day; fields.month = demo.month; fields.week = demo.week
  validateAndPreview()
}

function setField(name, val) { fields[name] = val; activeField.value = name; validateAndPreview() }
function onFieldChange() { validateAndPreview() }

function validateField(val, min, max, aliases = {}) {
  if (!val || val === '*') return true
  const parts = val.split(',')
  for (const part of parts) {
    const [range, step] = part.split('/')
    if (step && (!/^\d+$/.test(step) || parseInt(step) < 1)) return false
    if (range === '*') continue
    if (aliases[range]) continue
    if (range.includes('-')) {
      const [s, e] = range.split('-')
      const sn = aliases[s] ?? parseInt(s), en = aliases[e] ?? parseInt(e)
      if (isNaN(sn) || isNaN(en) || sn < min || en > max || sn > en) return false
      continue
    }
    const n = aliases[range] ?? parseInt(range)
    if (isNaN(n) || n < min || n > max) return false
  }
  return true
}

function validateAndPreview() {
  parseResult.valid = true; parseResult.error = ''
  const errs = t.value.crontab.errors
  if (!validateField(fields.minute, 0, 59)) { parseResult.valid = false; parseResult.error = errs.minute; return }
  if (!validateField(fields.hour, 0, 23)) { parseResult.valid = false; parseResult.error = errs.hour; return }
  if (!validateField(fields.day, 1, 31, { L: 32 })) { parseResult.valid = false; parseResult.error = errs.day; return }
  if (!validateField(fields.month, 1, 12)) { parseResult.valid = false; parseResult.error = errs.month; return }
  if (!validateField(fields.week, 0, 7)) { parseResult.valid = false; parseResult.error = errs.week; return }
  if (parseResult.valid) computeNextRuns(); else nextRuns.value = []
}

function computeNextRuns() {
  const runs = []; const now = new Date()
  let current = new Date(now.getTime()); current.setSeconds(0, 0); current.setMinutes(current.getMinutes() + 1)
  let count = 0, iter = 0
  while (count < 10 && iter < 525600) {
    iter++
    if (matchField(fields.minute, current.getMinutes(), 0, 59) && matchField(fields.hour, current.getHours(), 0, 23) && matchField(fields.day, current.getDate(), 1, 31) && matchField(fields.month, current.getMonth() + 1, 1, 12) && matchField(fields.week, current.getDay(), 0, 7)) {
      runs.push(current.toLocaleString('zh-CN', { hour12: false })); count++
    }
    current = new Date(current.getTime() + 60000)
  }
  nextRuns.value = runs
}

function matchField(pattern, value, min, max) {
  if (!pattern || pattern === '*') return true
  const parts = pattern.split(',')
  for (const part of parts) {
    const [range, stepStr] = part.split('/'); const step = stepStr ? parseInt(stepStr) : 1
    if (range === '*') { if ((value - min) % step === 0) return true; continue }
    if (range === 'L') { if (value === 31 || value === 30 || value === 28 || value === 29) return true; continue }
    if (range.includes('-')) { const [s, e] = range.split('-'); if (value >= parseInt(s) && value <= parseInt(e) && (value - parseInt(s)) % step === 0) return true; continue }
    if (parseInt(range) === value) return true
  }
  return false
}

function copyExpr() { if (!fullExpr.value) return; navigator.clipboard.writeText(fullExpr.value).then(() => ElMessage.success(t.value.crontab.copied)) }

validateAndPreview()
</script>

<style scoped>
.tool-page { max-width: 1000px; margin: 0 auto; }
.page-header { margin-bottom: 24px; }
.page-header h2 { display: flex; align-items: center; gap: 8px; font-size: 22px; color: var(--el-text-color-primary); }
.page-desc { color: var(--el-text-color-secondary); margin-top: 6px; font-size: 14px; }
.card-title { font-weight: 600; }
.expr-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.expr-label { font-weight: 600; white-space: nowrap; }
.expr-fields { display: flex; gap: 8px; align-items: flex-end; }
.field-group { display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; }
.field-input { width: 80px; }
.field-input :deep(.el-input__inner) { text-align: center; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 16px; font-weight: 600; transition: all 0.2s; }
.field-active .field-input :deep(.el-input__inner) { border-color: #409eff; box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2); background: rgba(64, 158, 255, 0.05); }
.field-name { font-size: 12px; color: var(--el-text-color-secondary); }
.field-active .field-name { color: #409eff; font-weight: 600; }
.expr-actions { display: flex; gap: 8px; margin-left: auto; }
.expr-display { margin-top: 16px; display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--el-fill-color-lighter); border-radius: 8px; }
.expr-code { font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 20px; font-weight: 700; letter-spacing: 2px; color: var(--el-text-color-primary); }
.preset-list { display: flex; flex-wrap: wrap; gap: 8px; }
.field-desc-list { display: flex; flex-direction: column; gap: 4px; }
.field-desc-item { padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
.field-desc-item:hover { background: var(--el-fill-color-lighter); }
.field-highlight { background: rgba(64, 158, 255, 0.08); border-color: rgba(64, 158, 255, 0.3); }
.fd-header { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
.fd-name { font-weight: 600; font-size: 14px; color: var(--el-text-color-primary); }
.fd-range { font-size: 12px; color: var(--el-text-color-placeholder); font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; }
.fd-examples { display: flex; flex-wrap: wrap; gap: 6px; }
.fd-example { font-size: 12px; padding: 2px 8px; background: var(--el-fill-color); border-radius: 4px; cursor: pointer; transition: background 0.2s; }
.fd-example:hover { background: var(--el-fill-color-light); }
.fd-example code { font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-weight: 600; color: #409eff; margin-right: 4px; }
.run-list { display: flex; flex-direction: column; gap: 6px; }
.run-label { font-size: 13px; color: var(--el-text-color-secondary); margin-bottom: 4px; }
.run-item { display: flex; align-items: center; gap: 10px; padding: 6px 10px; background: var(--el-fill-color-lighter); border-radius: 6px; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; }
.run-num { font-weight: 600; color: var(--el-text-color-placeholder); min-width: 20px; }
.run-time { color: var(--el-text-color-primary); }
.run-empty { color: var(--el-text-color-placeholder); font-size: 14px; padding: 20px; text-align: center; }
</style>
