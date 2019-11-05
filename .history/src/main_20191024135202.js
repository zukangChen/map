import Vue from 'vue'
import App from './App.vue'

import AMap from 'vue-amap';
import axios from 'axios'
Vue.use(axios)

Vue.use(AMap);
AMap.initAMapApiLoader({
    key: '2b37ae7614b412540a96b0bc6e8174c8',//刚刚开发者申请哪里的key
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});
Vue.config.productionTip = false

new Vue({
  axios,
  render: h => h(App),
}).$mount('#app')
