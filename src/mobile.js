import Vue from 'vue'
import App from './mobile/AppMobile'
import '@/common/setup'
import router from './mobile/router'
import User from './service/user'
import StickyContainer from '@/mobile/components/StickyContainer.vue';
import DomPortal from 'vue-dom-portal';
import '@/style/animation.scss'
import {
    Button,
    Dialog,
    Cell,
    CellGroup,
    Tab,
    Tabs,
    DatetimePicker,
    List,
    PullRefresh,
    Loading,
    Popup,
    Field,
    Picker,
    Toast,
    Uploader,
    Overlay, RadioGroup, Radio
    // Notify
} from 'vant'
import Notify from './mobile/plugin/notify'
import './mobile/plugin/plugin.scss'
import fastClick from 'fastclick'
import VueClipboard from 'vue-clipboard2'

fastClick.prototype.focus = function (targetElement) {
    var length;
    if (User.isiOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
}
fastClick.attach(document.body);
/*  设置REM(100PX=>1REM) */
(function () {
    let docEl = document.documentElement;
    let setRem = function () {
        let screenWidth = docEl.clientWidth || window.screen.width || 360;
        docEl.style.fontSize = (100 * screenWidth / 750) + 'px';
    };
    window.addEventListener('resize', setRem, false);
    document.addEventListener('DOMContentLoaded', setRem, false);
    setRem();
})();
Vue.use(DomPortal)
Vue.component('StickyContainer', StickyContainer);
// vant UI
Vue.use(Button)
    .use(Tab)
    .use(Tabs)
    .use(DatetimePicker)
    .use(Dialog)
    .use(Cell)
    .use(CellGroup)
    .use(List)
    .use(PullRefresh)
    .use(Notify)
    .use(Loading)
    .use(Popup)
    .use(Field)
    .use(Picker)
    .use(Toast)
    .use(Uploader)
    .use(Overlay)
    .use(VueClipboard)
    .use(RadioGroup)
    .use(Radio)
// 刷新操作需检测，并恢复登录数据
User.setUser().finally(data => {
    startVue();
    User.isMobile = true;
})


function startVue() {
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
}

