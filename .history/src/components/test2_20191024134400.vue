<template>
  <div id="near">
    <div id="container"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { lazyAMapApiLoaderInstance } from "vue-amap";
export default {
  name: "near",
  data() {
    return {
      
  },
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.793425,32.040599], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      var infoWindow = new AMap.InfoWindow({
        //创建信息窗体
        isCustom: true, //使用自定义窗体
        content: "<div>信息窗体123</div>", //信息窗体的内容可以是任意html片段
        offset: new AMap.Pixel(16, -45)
      });
      var onMarkerClick = function(e) {
        infoWindow.open(map, e.target.getPosition()); //打开信息窗体
        //e.target就是被点击的Marker
      };
  }
}
</script>
<style>
#amap-main {
  width: 100%;
  height: 300px;
}
#map {
  width: 100%;
  height: 600px;
}
#container {
  width: 100%;
  height: 600px;
}
</style>