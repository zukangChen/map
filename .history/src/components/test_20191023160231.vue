<template>
  <div id="near">
    <!-- <div id="amap-main"></div> -->
    <!-- <div id="map"></div> -->
    <div id="container"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import { lazyAMapApiLoaderInstance } from "vue-amap";
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
      ]
    };
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
      var marker1 = new AMap.Marker({
        position: [121.23, 31.22]
      });
      var marker2 = new AMap.Marker({
        position: [121.53, 31.22]
      });
      var marker3 = new AMap.Marker({
        position: [118.793425,32.040599]
      });
      var marker4 = new AMap.Marker({
        position: [116.368904,39.913423]
      });
      // 多个点实例组成的数组
      var markerList = [marker1, marker2, marker3, marker4];
      map.add(markerList);
      marker1.on("click", onMarkerClick); //绑定click事件
      marker2.on("click", onMarkerClick); //绑定click事件
      marker3.on("click", onMarkerClick); //绑定click事件
      marker4.on("click", onMarkerClick); //绑定click事件

      //geojson画区域
      var geojsonmap = new AMap.GeoJSON({
        geoJSON: path2,
        // 还可以自定义getMarker和getPolyline
        getPolygon: function(geojsonmap, path2) {
          console.log('xiaoqi',geojsonmap);
          console.log('lnglats',lnglats)
          let nameNum = geojsonmap.properties.nameNum || 0;
          nameNum = Math.floor(nameNum * 10);
          nameNum = nameNum === 10 ? 9 : nameNum;
          // 计算面积
          let area = AMap.GeometryUtil.ringArea(lnglats[0]);
          return new AMap.Polygon({
            path: lnglats,
            fillOpacity: 1 - Math.sqrt(area / 8000000000), // 面积越大透明度越高
            strokeColor: "black",
            fillColor: '#fff'
          });
        }
      });
      console.log('kdsajdk',geojsonmap);
      map.add(geojsonmap);


      // 覆盖物1
      var polyline1 = new AMap.Polyline({
        path: [
          new AMap.LngLat("121.23", "31.22"),
          new AMap.LngLat("121.53", "31.22"),
          // new AMap.LngLat("123.23", "30.22"),
          // new AMap.LngLat("123.23", "30.32")
        ]
      });
       var _TheArray = [[118.793425,32.040599],[118.793657,32.042257],[118.79397,32.044788],[118.794106,32.045703],[118.795121,32.051495],[118.795498,32.054086],[118.794785,32.05424],[118.794091,32.054978],[118.793609,32.055507],[118.793609,32.055507],[118.793539,32.056249],[118.793545,32.057455],[118.79355,32.058501],[118.793725,32.060881],[118.793627,32.062018],[118.793468,32.063023],[118.793439,32.064643],[118.793439,32.064643],[118.793446,32.065729],[118.793285,32.066237],[118.793301,32.06777],[118.793008,32.069068],[118.792519,32.07109],[118.792463,32.071158],[118.790412,32.071002],[118.790475,32.075661],[118.790529,32.075669],[118.788423,32.075515],[118.784155,32.07529],[118.779441,32.07462],[118.779419,32.074451],[118.778518,32.073691],[118.775614,32.071318],[118.775614,32.071318],[118.775614,32.071318],[118.775614,32.071318],[118.775614,32.071318],[118.775614,32.071318],[118.779374,32.070302],[118.781976,32.070475],[118.783634,32.070624],[118.78357,32.070605],[118.78357,32.070605],[118.781428,32.068593],[118.781043,32.067963],[118.781125,32.06662],[118.781166,32.065189],[118.781111,32.065235],[118.780806,32.063765],[118.78078,32.063004],[118.780471,32.061686],[118.780424,32.060799],[118.7811,32.058792],[118.783699,32.052875],[118.783016,32.049863],[118.782521,32.048316],[118.782752,32.048139],[118.781795,32.0457],[118.781455,32.044001],[118.782159,32.043738],[118.783104,32.043415],[118.78473,32.042774],[118.787236,32.041789],[118.787908,32.041509],[118.788904,32.04132],[118.789006,32.04137],[118.789658,32.041283],[118.790465,32.041158],[118.790577,32.04114],[118.791326,32.040995],[118.793425,32.040599]
];      
      // 多边形轮廓线的节点坐标数组
      var path = [
          new AMap.LngLat(116.368904,39.913423),
          new AMap.LngLat(116.382122,39.901176),
          new AMap.LngLat(116.387271,39.912501),
          new AMap.LngLat(116.398258,39.904600)
      ];
      var path2 = [];
      for (let i=0;i< _TheArray.length;i++){
        path2.push(new AMap.LngLat(_TheArray[i][0],_TheArray[i][1]))
        // console.log(_TheArray[i][0],_TheArray[i][1])
      }
      path.push(new AMap.LngLat(116.793425,39.040599))
      var polygon = new AMap.Polygon({
        path: path2,  
        fillColor: '#fff', // 多边形填充颜色
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
      });
      map.add(polygon);
      var overlayGroup = new AMap.OverlayGroup([polyline1]);
      // 对此覆盖物群组设置同一属性
      overlayGroup.setOptions({
        strokeColor: "red",
        strokeWeight: 5
      });
      // 统一添加到地图实例上
      map.add(overlayGroup);
      // 同时也可以对群组进行统一的展示隐藏操作
      overlayGroup.show();

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