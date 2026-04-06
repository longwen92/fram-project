<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // 延迟一些可能依赖 JSBridge 的初始化逻辑
    setTimeout(() => {
      // 可以在这里进行网络探测等操作
      uni.getNetworkType({
        success: (res) => {
          console.log('网络类型：', res.networkType);
        }
      });
    }, 500);
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
@import "./static/css/common.css";

/* 微信小程序自定义样式补丁 */
.grid {
  display: grid;
}

.rounded-full {
  border-radius: 9999px;
}

.sticky {
  position: sticky;
}

.z-10 {
  z-index: 10;
}

.max-w-md {
  max-width: 28rem;
}

.space-y-8 > view + view {
  margin-top: 2rem;
}

.active-bg-white-opacity-10:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.opacity-90 {
  opacity: 0.9;
}
</style>
