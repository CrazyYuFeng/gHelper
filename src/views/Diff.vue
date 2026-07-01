<template>
  <div class="full-page-tool">
    <div class="tool-topbar">
      <div class="topbar-left">
        <h2><el-icon><Files /></el-icon> {{ t.diff.title }}</h2>
        <el-radio-group v-model="diffMode" size="default" @change="doDiff">
          <el-radio-button value="text">{{ t.diff.textDiff }}</el-radio-button>
          <el-radio-button value="json">{{ t.diff.jsonDiff }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="tool-actions">
        <el-tag v-if="diffStats.same" type="success">{{ t.diff.same }}：{{ diffStats.same }} {{ t.diff.lines }}</el-tag>
        <el-tag v-if="diffStats.added" type="primary">{{ t.diff.added }}：{{ diffStats.added }} {{ t.diff.lines }}</el-tag>
        <el-tag v-if="diffStats.removed" type="danger">{{ t.diff.removed }}：{{ diffStats.removed }} {{ t.diff.lines }}</el-tag>
        <el-tag v-if="diffStats.modified" type="warning">{{ t.diff.modified }}：{{ diffStats.modified }} {{ t.diff.lines }}</el-tag>
      </div>
    </div>

    <div v-if="diffError" class="msg-bar"><el-alert :title="diffError" type="warning" show-icon :closable="false" /></div>

    <div class="panels-container">
      <div class="panel panel-left">
        <div class="panel-header">
          <span>{{ t.diff.leftInput }}</span>
          <el-button size="small" text @click="leftInput = ''; diffLinesLeft.clear(); diffLinesRight.clear(); diffError = ''">{{ t.diff.clear }}</el-button>
        </div>
        <div class="diff-textarea-wrapper">
          <div class="diff-highlight-layer" v-if="diffLinesLeft.size">
            <div v-for="(line, idx) in leftLines" :key="'l'+idx" :class="['hl-line', diffLinesLeft.has(idx) ? 'hl-diff' : '']"></div>
          </div>
          <el-input v-model="leftInput" type="textarea" :placeholder="diffMode === 'json' ? t.diff.leftPlaceholder : t.diff.leftTextPlaceholder" class="code-input full-textarea diff-textarea" :autosize="false" @input="doDiff" />
        </div>
      </div>
      <div class="panel panel-right">
        <div class="panel-header">
          <span>{{ t.diff.rightInput }}</span>
          <el-button size="small" text @click="rightInput = ''; diffLinesLeft.clear(); diffLinesRight.clear(); diffError = ''">{{ t.diff.clear }}</el-button>
        </div>
        <div class="diff-textarea-wrapper">
          <div class="diff-highlight-layer" v-if="diffLinesRight.size">
            <div v-for="(line, idx) in rightLines" :key="'r'+idx" :class="['hl-line', diffLinesRight.has(idx) ? 'hl-diff' : '']"></div>
          </div>
          <el-input v-model="rightInput" type="textarea" :placeholder="diffMode === 'json' ? t.diff.rightPlaceholder : t.diff.rightTextPlaceholder" class="code-input full-textarea diff-textarea" :autosize="false" @input="doDiff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from '../locales'

const { t } = useI18n()

const diffMode = ref('text')
const leftInput = ref(''), rightInput = ref('')
const diffError = ref('')
const diffStats = reactive({ same: 0, added: 0, removed: 0, modified: 0 })
const diffLinesLeft = ref(new Set())
const diffLinesRight = ref(new Set())

const leftLines = computed(() => leftInput.value.split('\n'))
const rightLines = computed(() => rightInput.value.split('\n'))

let debounceTimer = null

function doDiff() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => runDiff(), 300)
}

function runDiff() {
  diffError.value = ''
  diffStats.same = 0; diffStats.added = 0; diffStats.removed = 0; diffStats.modified = 0
  diffLinesLeft.value = new Set(); diffLinesRight.value = new Set()

  if (!leftInput.value.trim() && !rightInput.value.trim()) return

  let leftLinesArr, rightLinesArr
  if (diffMode.value === 'json') {
    try {
      leftLinesArr = JSON.stringify(JSON.parse(leftInput.value || '{}'), null, 2).split('\n')
      rightLinesArr = JSON.stringify(JSON.parse(rightInput.value || '{}'), null, 2).split('\n')
    } catch (e) { diffError.value = t.value.diff.jsonError + '：' + e.message; return }
  } else {
    leftLinesArr = (leftInput.value || '').split('\n')
    rightLinesArr = (rightInput.value || '').split('\n')
  }

  const { leftSet, rightSet, stats } = computeDiffSets(leftLinesArr, rightLinesArr)
  diffLinesLeft.value = leftSet; diffLinesRight.value = rightSet
  Object.assign(diffStats, stats)
}

function computeDiffSets(left, right) {
  const m = left.length, n = right.length
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    dp[i][j] = left[i - 1] === right[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])

  const sameLeft = new Set(), sameRight = new Set()
  let i = m, j = n
  while (i > 0 && j > 0) {
    if (left[i - 1] === right[j - 1]) { sameLeft.add(i - 1); sameRight.add(j - 1); i--; j-- }
    else if (dp[i - 1][j] >= dp[i][j - 1]) { i-- } else { j-- }
  }

  const leftSet = new Set(), rightSet = new Set()
  for (let k = 0; k < left.length; k++) { if (!sameLeft.has(k)) leftSet.add(k) }
  for (let k = 0; k < right.length; k++) { if (!sameRight.has(k)) rightSet.add(k) }

  const leftDiffArr = [...leftSet].sort((a, b) => a - b), rightDiffArr = [...rightSet].sort((a, b) => a - b)
  const paired = Math.min(leftDiffArr.length, rightDiffArr.length)
  return { leftSet, rightSet, stats: { same: sameLeft.size, added: rightSet.size - paired, removed: leftSet.size - paired, modified: paired } }
}
</script>

<style scoped>
.full-page-tool { display: flex; flex-direction: column; height: 100%; }
.tool-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-shrink: 0; flex-wrap: wrap; gap: 8px; }
.topbar-left { display: flex; align-items: center; gap: 16px; }
.tool-topbar h2 { display: flex; align-items: center; gap: 8px; font-size: 20px; color: var(--el-text-color-primary); }
.tool-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.msg-bar { flex-shrink: 0; margin-bottom: 8px; }
.panels-container { flex: 1; display: flex; gap: 12px; min-height: 0; }
.panel { flex: 1; display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--el-border-color-light); border-radius: 8px; overflow: hidden; background: var(--el-bg-color); }
.panel-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; font-size: 14px; font-weight: 500; color: var(--el-text-color-secondary); background: var(--el-fill-color-lighter); border-bottom: 1px solid var(--el-border-color-light); flex-shrink: 0; }
.diff-textarea-wrapper { flex: 1; position: relative; min-height: 0; overflow: hidden; }
.diff-highlight-layer { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 1; overflow: hidden; padding: 5px 11px; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; line-height: 1.6; }
.hl-line { height: 1.6em; white-space: pre; }
.hl-diff { background: rgba(248, 81, 73, 0.2); border-radius: 2px; }
.diff-textarea { position: relative; z-index: 2; }
.diff-textarea :deep(textarea) { background: transparent !important; }
.diff-textarea :deep(.el-textarea__inner) { background: transparent !important; }
.full-textarea { flex: 1; min-height: 0; }
.full-textarea :deep(textarea) { height: 100% !important; min-height: 0 !important; resize: none; font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace; font-size: 13px; line-height: 1.6; border: none; border-radius: 0; box-shadow: none; }
.full-textarea :deep(.el-textarea__inner) { height: 100% !important; }
</style>
