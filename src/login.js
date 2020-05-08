import Vue from 'vue'
import '@/common/setup'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from "./views/Login"
import './style/flex.css'
//element-ui UI
Vue.use(ElementUI);

// 刷新操作需检测，并恢复登录数据
new Vue({
    render: h => h(Login)
}).$mount('#app');
