import Vue from 'vue'
import App from './App.vue'
import '@/common/setup'
import router from './router'
import User from './service/user'
import {
    Dialog,
    Container,
    Tabs,
    TabPane,
    DatePicker,
    Table,
    TableColumn,
    Pagination,
    MessageBox,
    Message,
    Loading,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Upload,
    Popover,
    Image,
    Radio
} from 'element-ui'
import VueClipboard from 'vue-clipboard2'

import 'element-ui/lib/theme-chalk/index.css';
import '@/style/animation.scss'
//element-ui UI
Vue.use(Dialog)
    .use(Container)
    .use(Tabs)
    .use(TabPane)
    .use(DatePicker)
    .use(Table)
    .use(TableColumn)
    .use(Pagination)
    .use(Form)
    .use(FormItem)
    .use(Input)
    .use(Loading)
    .use(Select)
    .use(Popover)
    .use(Option)
    .use(Upload)
    .use(VueClipboard)
    .use(Image)
    .use(Radio)


Vue.prototype.$msgbox = MessageBox
Vue.prototype.$notify = Message


// 刷新操作需检测，并恢复登录数据
User.setUser().finally(data => {
    startVue();
})

function startVue() {
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
}

