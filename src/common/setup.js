import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ajaxInterceptors from './ajaxInterceptors'

Vue.config.productionTip = false
ajaxInterceptors(axios)
Vue.use(VueAxios, axios)



