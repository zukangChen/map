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
// import test from './data.js'
import test from './points.js'
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
      points:[],
      cluster:[],
      markers:[],
      count:0,
    };
  },
  created(){
    console.log(test.points);
    this.points = test.points;
  },
  mounted() {
    var cluster, markers = [];
    let points = this.points
    lazyAMapApiLoaderInstance.load().then(() => {
      var map = new AMap.Map("container", {
        zoom: 5, //级别
        center: [105, 34], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      //mark
      for (var i = 0; i < points.length; i += 1) {
        markers.push(new AMap.Marker({
            position: points[i]['lnglat'],
            content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            offset: new AMap.Pixel(-15, -15)
        }))
      }
      // map.add(markers);

      //点聚合
      var _renderClusterMarker = function (context) {
          console.log(count);
          var factor = Math.pow(context.count / count, 1 / 18);
          var div = document.createElement('div');
          var Hue = 180 - factor * 180;
          var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
          var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
          var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
          var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
          div.style.backgroundColor = bgColor;
          var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
          div.style.width = div.style.height = size + 'px';
          div.style.border = 'solid 1px ' + borderColor;
          div.style.borderRadius = size / 2 + 'px';
          div.style.boxShadow = '0 0 1px ' + shadowColor;
          div.innerHTML = context.count;
          div.style.lineHeight = size + 'px';
          div.style.color = fontColor;
          div.style.fontSize = '14px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
          context.marker.setContent(div)
      };
      map.plugin(["AMap.MarkerClusterer"],function() {
        cluster = new AMap.MarkerClusterer(map, markers, {
                gridSize: 80,
                renderClusterMarker: _renderClusterMarker
            });
      })

    });
  },
  methods:{
  
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