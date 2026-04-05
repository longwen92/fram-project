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

/* 基础全局样式 */
page {
  width: 100%;
  height: 100%;
  display: block;
  background-color: #f8f8f8;
}

view,
text {
  box-sizing: border-box;
}
</style>
