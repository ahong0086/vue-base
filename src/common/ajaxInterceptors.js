// import { AlertModule } from '@/mobile/vux';
import User from '@/service/user';
// import Tthb from '@/service/tthb';
import {Dialog} from 'vant'
import {getTargetTime} from "@/common/util";

// 全局处理ajax请求
// 需要根据不同项目来进行处理


// supressLoading : 是否开启loading

export default function (axios, Vue) {
    axios.interceptors.request.use(function (request) {
        callSetLoadingFn(request, true);
        if (request.url && request.url.match(/\.(do|json)/)) {
            request.params = Object.assign({
                _t: (new Date).getTime()
            }, request.params);
        }
        // 加入token =>ah
        let token = sessionStorage.getItem("x-session-token");
        if (token) {
            request.headers.common["x-session-token"] = token;
        }
        if (request.data && request.data.startTime) {
            request.data.startTime = getTargetTime(request.data.startTime)
        }
        if (request.data && request.data.endTime) {
            request.data.endTime = getTargetTime(request.data.endTime)
        }
        return request;
    })
    axios.interceptors.response.use(function (response) {
        callSetLoadingFn(response.config, false);
        let {code, msg} = response.data;
        if (code && code != 200 && msg) {
            if (!response.config.supressErrorAlert) Dialog({
                title: '出错啦',
                message: msg
            });
            return Promise.reject(response.data);
        } else {
            return response;
        }

    }, function (error) {
        callSetLoadingFn(error.config, false);
        console.log(error.message)
        // 断网报错处理
        if (!error.response && error.message == 'Network Error' && !error.config.supressErrorAlert) {
            console.log(error.message, error)
            Dialog({
                title: '出错啦',
                message: '没有连接互联网，请确认联网后再试'
            });
            return Promise.reject(error);
        }
        const respStatus = error.response.status;
        let msg = error.response.msg || error.response.data.msg;
        let callback;
        switch (respStatus) {
            case 504:
                msg = "当前网络状况不佳, 请留意操作的情况，如果还无法操作请重新登录！";
                callback = () => {
                    User.removeUser()
                }
                break;
            case 403:
                err.message = '拒绝访问'

                break;
            case 401:
                break;
            case 413:
                msg = "上传文件过大，超出限制！";

                break;
            default:
                break;
        }

        if (respStatus != 200 && respStatus != 401 && !error.config.supressErrorAlert) {
            Dialog({
                title: '出错啦',
                message: msg
            }).then(callback);
        } else if (respStatus == 401) {
            // let code = error.response.data.code;
            // 长时间未登录
            // if(code == -2){
            // return User.rebuildToken(error)
            // 异地登录账号等
            // }else{
            Dialog({
                title: '出错啦',
                message: msg
            }).then(() => {
                // Tthb.disconnect()
                User.removeUser();
            });
            // }
        }
        return Promise.reject(error);
    })

}

function callSetLoadingFn(config, is_loading) {
    if (!config && !config.supressLoading) {
        User.loadingCount = is_loading ? ++User.loadingCount : --User.loadingCount;
    }
    if (typeof config.setLoading == 'function') {
        config.setLoading(is_loading);
    }
}
