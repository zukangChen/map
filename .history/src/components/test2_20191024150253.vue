<template>
  <div id="near">
    <!-- <div id="amap-main"></div> -->
    <!-- <div id="map"></div> -->
    <div id="container"></div>
  </div>
</template>
<script src="//a.amap.com/jsapi_demos/static/china.js"></script>
<script type="text/ecmascript-6">
import { lazyAMapApiLoaderInstance } from "vue-amap";
// import {data} from './points';
import test from './data.js'
export default {
  name: "near",
  data() {
    return {
      capitals: [
        {
          citycode: "010",
          adcode: "110000",
          name: "北京市",
          center: [116.407394, 39.904211]
        },
        {
          citycode: "023",
          adcode: "500000",
          name: "重庆市",
          center: [106.551643, 29.562849]
        },
        {
          citycode: "1853",
          adcode: "820000",
          name: "澳门特别行政区",
          center: [113.543028, 22.186835]
        },
        {
          adcode: "440000",
          name: "广东省",
          center: [113.26641, 23.132324]
        },
        {
          adcode: "350000",
          name: "福建省",
          center: [119.295143, 26.100779]
        },
        {
          adcode: "460000",
          name: "海南省",
          center: [110.349228, 20.017377]
        },
        {
          adcode: "140000",
          name: "山西省",
          center: [112.562678, 37.873499]
        },
        {
          citycode: "1886",
          adcode: "710000",
          name: "台湾省",
          center: [121.509062, 25.044332]
        },
        {
          adcode: "520000",
          name: "贵州省",
          center: [106.70546, 26.600055]
        },
        {
          adcode: "450000",
          name: "广西壮族自治区",
          center: [108.327546, 22.815478]
        },
        {
          adcode: "620000",
          name: "甘肃省",
          center: [103.826447, 36.05956]
        }
      ],
    };
  },
  created(){
    console.log(test.a);
    console.log(test.point);
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
    });
  }
};
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