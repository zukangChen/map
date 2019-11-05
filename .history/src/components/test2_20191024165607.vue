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
    this.getAllPoint();
  },
  methods :{
    getAllPoint() {
            let that = this;
            let map = new AMap.Map("map-locationM", {
                //'map-location'是对应页面盒子的id
                resizeEnable: true, //自适应大小
                zoom: 13, //级别
                //   center: [118.783094, 32.040966] //中心点坐标
            });
            map.setStatus({
                dragEnable: true, //是否可拖动
                keyboardEnable: false, //是否可通过键盘控制
                doubleClickZoom: true, //是否可双击放大
                zoomEnable: true, //是否可缩放
                rotateEnable: false //是否可旋转
            });
            let query = this.$router.history.current.query;
            this.companyName = query.companyName;
            this.address = query.companyAddress;
            let obj = {
                body: query.key
            };
            let markers = [];
            let preIcon = new AMap.Icon({
                image: selectOne,
                size: new AMap.Size(56, 93), //图标大小
                // offset:new AMap.Pixel(-2,-27),
                imageOffset: new AMap.Pixel(1, -37)
            });

            let styles = [{
                url: img,
                size: new AMap.Size(56, 56),
                imageOffset: new AMap.Pixel(1, 1),
                textColor: "black",
                textSize: 18,
            }];

            getAllPoints(obj).then(res => {
            console.log(res,'res')
            // let data = res.data.result;
            let data = that.mapdata.result;
            console.log(data, 'data')
            that.newDate = data
            // console.log(data, "data");
            let arr = []
            data.map((item, i) => {

                if (item.lon != null && item.lat != null) {
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(item.lon, item.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        icon: new AMap.Icon({
                            size: new AMap.Size(56, 56), // 图标尺寸
                            image: img,
                            imageSize: new AMap.Size(56, 56) // 根据所设置的大小拉伸或压缩图片
                        }),
                        extData: {
                            address: item.companyAddress,
                            name: item.companyName,
                            lon: item.lon,
                            lat: item.lat,
                            id: i
                        }

                    });
                    markers.push(marker);
                    arr.push({
                        lon: item.lon,
                        lat: item.lat
                    })

                }

            });
            markers.map((item, i) => {
                item.on("click", e => {
                    that.chooseId = item.getExtData().id;
                    markers.map(item => {
                        if (item.getExtData().id == that.chooseId) {
                            item.setzIndex(200);
                            item.setIcon(preIcon);
                            // $("#map-locationM").css("min-height", "9.25rem");
                            that.companyName = item.getExtData().name || '暂无数据';
                            that.address = item.getExtData().address || '暂无数据';
                            let arrlist = [];
                            map.setCenter([item.getExtData().lon, item.getExtData().lat])
                            that.newDate.map((obj, i) => {
                                if (item.getExtData().lat == obj.lat && item.getExtData().lon == obj.lon) {

                                    // $("#map-locationM").css("height", "12.82rem");
                                    map.setCenter([item.getExtData().lon, item.getExtData().lat])
                                    let arr = {
                                        name: obj.companyAddress,
                                        lat: item.getExtData().lat,
                                        lon: item.getExtData().lon,
                                        companyAddress: item.getExtData().address,
                                        companyName: item.getExtData().address
                                    };
                                    arrlist.push(arr);
                                    that.address = obj.companyAddress;
                                    that.addresslist = arrlist;
                                    that.number = arrlist.length;
                                }
                            })
                            console.log(arrlist[0].name, 'address0', item.getExtData().address, 'getExtDataaddress')
                            if (arrlist[0].name != item.getExtData().address) {
                                this.showLocation = false;
                                this.showMore = true;
                                $('.positionAll').css('height', 'auto')
                            } else if (item.getExtData().address.length >= 27) {
                                // console.log(1111)
                                //  $("#map-locationM").css("height", "11.5834rem");
                                this.showLocation = true;
                                this.showMore = false;
                                $('.address').css('align-items', 'start');
                                $('.location-one').css('height', 'auto');

                            } else {
                                // console.log(2222)
                                this.showLocation = true;
                                this.showMore = false;
                                $('.address').css('align-items', 'center');
                                $('.location-one').css('height', 'auto');
                                //   $("#map-locationM").css("height", "12.8834rem");
                                //   13.1134rem;
                            }
                        } else {
                            item.setIcon(img);
                        }
                    });
                });
            });

            map.add(markers);

//使用renderClusterMarker属性实现聚合点的完全自定义绘制
 var count = markers.length;
 var _renderClusterMarker = function (context) {
      var factor = Math.pow(context.count/count,1/18)
      var div = document.createElement('div');
      var Hue =180 - factor* 180;
      var bgColor = 'hsla('+Hue+',100%,50%,0.7)';
      var fontColor = 'hsla('+Hue+',100%,20%,1)';
      var borderColor = 'hsla('+Hue+',100%,40%,1)';
      var shadowColor = 'hsla('+Hue+',100%,50%,1)';
      div.style.backgroundColor = bgColor
      var size = Math.round(45 + Math.pow(context.count/count,1/5) * 20);
      div.style.width = div.style.height = size+'px';
      div.style.border = 'solid 1px '+ borderColor;
      div.style.borderRadius = size/2 + 'px';
      div.style.boxShadow = '0 0 1px '+ shadowColor;
      div.innerHTML = context.count;
      div.style.lineHeight = size+'px';
      div.style.color = fontColor;
      div.style.fontSize = '18px';
      div.style.textAlign = 'center';
      context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
      context.marker.setContent(div)
 }
//  var  cluster = new AMap.MarkerClusterer(map,markers,{
//       gridSize:80,
     
//   });
            // 点聚合
            var sts = [{
                url: img,
                size: new AMap.Size(56, 56),
                textColor: "#000000",
                textSize: 18
            }];
            map.plugin(["AMap.MarkerClusterer"], function () {
                let clusters = new AMap.MarkerClusterer(map, markers, {
                    // styles: sts,
                    gridSize: 30,
                    renderClusterMarker:_renderClusterMarker
                });
                clusters.on("click", (cluster, lnglat) => {
                    let lonArr = [];
                    that.chooseLat = cluster.lnglat.lat;
                    that.chooseLon = cluster.lnglat.lng;
                    let arrlist = [];
                    cluster.markers.map((item, i) => {
                        that.showMore = false;
                        // $("#map-locationM").css("height", "16.02rem");
                        that.showLocation = false;
                        if (
                            that.chooseLat == item.getExtData().lat &&
                            that.chooseLon == item.getExtData().lon
                        ) {
                            let index = i + 1;
                            that.n = index;
                            that.showMore = true;
                            that.showLocation = false;
                            map.setCenter([item.getExtData().lon, item.getExtData().lat])

                            let arr = {
                                name: item.getExtData().address,
                                lat: item.getExtData().lat,
                                lon: item.getExtData().lon,
                                companyAddress: item.getExtData().address,
                                companyName: item.getExtData().address
                            };
                            arrlist.push(arr);
                            that.address = item.getExtData().address;
                            that.addresslist = arrlist;
                            that.number = arrlist.length;
                            markers.map(item => {
                                item.setIcon(img);
                            })
                            $('.positionAll').css('height', 'auto')
                            cluster.target.setStyles(styles);

                        }

                    });
                });
            });
            });
        }
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