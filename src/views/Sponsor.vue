<template>
  <div class="sponsor-page">
    <div class="sponsor-hero">
      <div class="sponsor-icon">❤️</div>
      <h1>{{ t.sponsor.title }}</h1>
      <p class="sponsor-desc">{{ t.sponsor.desc }}</p>
    </div>

    <div class="sponsor-cards">
      <el-card shadow="hover" class="sponsor-card">
        <div class="card-inner">
          <div class="card-icon wechat-icon">💚</div>
          <h3>{{ t.sponsor.wechat }}</h3>
          <p class="card-desc">{{ t.sponsor.wechatDesc }}</p>
          <div class="qr-wrapper">
            <img :src="wechatQr" alt="微信赞赏码" class="qr-img" @error="onImgError('wechat')" />
          </div>
        </div>
      </el-card>

      <el-card shadow="hover" class="sponsor-card">
        <div class="card-inner">
          <div class="card-icon alipay-icon">💙</div>
          <h3>{{ t.sponsor.alipay }}</h3>
          <p class="card-desc">{{ t.sponsor.alipayDesc }}</p>
          <div class="qr-wrapper">
            <img :src="alipayQr" alt="支付宝收款码" class="qr-img" @error="onImgError('alipay')" />
          </div>
        </div>
      </el-card>
    </div>

    <div class="sponsor-footer-note">
      <p>{{ t.sponsor.thanks }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from '../locales'

const { t } = useI18n()

const base = import.meta.env.BASE_URL
const wechatQr = ref(base + 'pay/wechat.png')
const alipayQr = ref(base + 'pay/alipay.png')

function onImgError(type) {
  if (type === 'wechat') wechatQr.value = ''
  else alipayQr.value = ''
}
</script>

<style scoped>
.sponsor-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

.sponsor-hero {
  text-align: center;
  padding: 40px 20px 30px;
}

.sponsor-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.sponsor-hero h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin-bottom: 10px;
}

.sponsor-desc {
  font-size: 15px;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

.sponsor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 0 10px;
}

.sponsor-card {
  border-radius: 16px;
  transition: transform 0.2s;
}

.sponsor-card:hover {
  transform: translateY(-4px);
}

.card-inner {
  text-align: center;
  padding: 10px 0;
}

.card-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.card-inner h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 20px;
}

.qr-wrapper {
  display: flex;
  justify-content: center;
}

.qr-img {
  width: 220px;
  height: 220px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 12px;
  object-fit: contain;
  background: #fff;
  padding: 8px;
}

.sponsor-footer-note {
  text-align: center;
  padding: 30px 20px;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
