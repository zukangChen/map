<template>
  <div id="near">
    <!-- <div id="amap-main"></div> -->
    <div id="map"></div>
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
    let capitals = this.capitals;
    lazyAMapApiLoaderInstance.load().then(() => {
      //地图圆点
      var map = new AMap.Map("map", {
        // viewMode: '3D',
        zoom: 4,
        center: [108, 34]
      });
      for (var i = 0; i < capitals.length; i += 1) {
        var center = capitals[i].center;
        var circleMarker = new AMap.CircleMarker({
          center: center,
          radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
          strokeColor: "white",
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: "rgba(0,0,255,1)",
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: "pointer",
          clickable: true
        });
        circleMarker.setMap(map);
      }
    });

    // 覆盖物1
    var polyline1 = new AMap.Polyline({
      path: [
        new AMap.LngLat("116.368904", "39.913423"),
        new AMap.LngLat("116.382122", "39.901176")
      ]
    });
    // 覆盖物2
    var polyline2 = new AMap.Polyline({
      path: [
        new AMap.LngLat("116.387271", "39.912501"),
        new AMap.LngLat("116.398258", "39.904600")
      ]
    });
    // 创建覆盖物群组，传入覆盖物组成的数组
    var overlayGroup = new AMap.OverlayGroup([polyline1, polyline2]);

    // 对此覆盖物群组设置同一属性
    overlayGroup.setOptions({
      strokeColor: "red",
      strokeWeight: 5
    });

    // 统一添加到地图实例上
    map.add(overlayGroup);

    // 创建 geoJSON 实例
    var geoJson = new AMap.GeoJSON({
      geoJSON: JSON.parse(geoJsonData), // GeoJSON对象
      getPolygon: function(geojson, lnglats) {
        //还可以自定义getMarker和getPolyline

        return new AMap.Polygon({
          path: lnglats,
          fillOpacity: 0.8,
          strokeColor: "white",
          fillColor: "red"
        });
      }
    });

    map.add(geoJson);
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
</style>