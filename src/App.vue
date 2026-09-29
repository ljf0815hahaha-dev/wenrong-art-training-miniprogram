<script setup>
import { onLaunch } from '@dcloudio/uni-app'
onLaunch(() => {})
</script>
<style>
page {
  --bg: #f8f7ff;
  --surface: #ffffff;
  --surface-low: #f2f3ff;
  --surface-high: #e2e7ff;
  --primary: #1e40af;
  --primary-deep: #00288e;
  --primary-soft: #dfe5ff;
  --success: #006c49;
  --success-bg: #d1fae5;
  --warning: #f59e0b;
  --warning-bg: #fef3c7;
  --danger: #ba1a1a;
  --danger-bg: #ffdad6;
  --ink: #131b2e;
  --ink-2: #444653;
  --muted: #757684;
  --muted-2: #94a3b8;
  --line: #e2e8f0;
  --r-sm: 16rpx;
  --r-md: 24rpx;
  --r-lg: 32rpx;
  --r-xl: 48rpx;
  --shadow: 0 8rpx 32rpx rgba(30,64,175,.055), 0 2rpx 6rpx rgba(15,23,42,.035);
  --shadow-float: 0 18rpx 42rpx rgba(30,64,175,.14), 0 3rpx 10rpx rgba(15,23,42,.06);
  background: var(--bg);
  color: var(--ink);
  font-family: Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  font-size: 28rpx;
}
view, text, image, button, scroll-view { box-sizing: border-box; }
::-webkit-scrollbar { width: 0; height: 0; display: none; }
button::after { border: 0; }
.page { min-height: 100vh; background: var(--bg); }
.main { padding: 20rpx 32rpx calc(150rpx + env(safe-area-inset-bottom)); overflow-x:hidden; }
.card { background: var(--surface); border: 2rpx solid rgba(226,232,240,.58); border-radius: var(--r-lg); box-shadow: var(--shadow); }
.ellipsis { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.line-clamp-2 { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.tap { transition: transform .16s ease, box-shadow .16s ease, opacity .16s ease; }
.tap:active { opacity: .86; transform:scale(.985); box-shadow:0 4rpx 12rpx rgba(15,23,42,.04); }
.bottom-space { height: 40rpx; }
/* #ifdef H5 */
:root {
  --van-primary-color: #1e40af !important;
  --van-success-color: #006c49 !important;
  --van-danger-color: #ba1a1a !important;
  --van-warning-color: #c27a09 !important;
  --van-text-color: #131b2e !important;
  --van-text-color-2: #444653 !important;
  --van-text-color-3: #757684 !important;
  --van-border-color: #e2e8f0 !important;
  --van-background-color: #f8f7ff !important;
  --van-button-primary-background: #1e40af !important;
  --van-button-primary-border-color: #1e40af !important;
  --van-button-success-background: #006c49 !important;
  --van-button-success-border-color: #006c49 !important;
  --van-button-danger-background: #ba1a1a !important;
  --van-button-danger-border-color: #ba1a1a !important;
  --van-tag-primary-color: #1e40af !important;
  --van-tag-success-color: #006c49 !important;
  --van-tag-danger-color: #ba1a1a !important;
  --van-tag-warning-color: #c27a09 !important;
}
/* #endif */
</style>
