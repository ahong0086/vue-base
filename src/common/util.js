// 服务端YYYY-MM-DD HH:mm:ss格式的字符串全浏览器兼容构造Date对象, 不传参数返回当前时间
export function mDate(str) {
    return str ? new Date(typeof str == 'string' ? (str.replace(' ', 'T') + '+08:00') : str) : new Date();
}

export function dateDiff(d1, d2) {
    let d = Math.abs(d1.valueOf() - d2.valueOf()) / 1000; // delta
    const r = {}; // result
    const s = {
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    Object.keys(s).forEach(function (key) {
        r[key] = Math.floor(d / s[key]);
        d -= r[key] * s[key];
    });

    return r;
}

export function countdownFormat(countdown) {
    const cd = countdown;
    let str = `${cd.day > 0 ? cd.day + '天' : ''}${cd.hour > 0 ? pad(cd.hour) + ':' : ''}`;
    return str += `${pad(cd.minute)}:${pad(cd.second < 0 ? 0 : cd.second)}`;

    function pad(str) {
        str += '';
        return str.padStart(2, '0');
    }
}

// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423

export function DateFormat(time, fmt = 'yyyy-MM-dd') {
    if (!time) return '';
    const date = time instanceof Date ? time : new Date(time);
    if (!(date instanceof Date)) return 'Not a Date'
    let o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export function getUrlKey(name) {
    return decodeURIComponent(((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1] || '').replace(/\+/g, '%20')) || null;
}

export let base64 = {
    encode(str) {
        // 对字符串进行编码
        var encode = encodeURI(str);
        // 对编码的字符串转化base64
        var base64 = btoa(encode);
        return base64;
    },
    decode(base64) {
        // 对base64转编码
        var decode = atob(base64);
        // 编码转字符串
        var str = decodeURI(decode);
        return str;
    }
};

// 获取对象的属性组成新的对象
export function mapKeys(keys, obj) {
    const res = {}
    keys.forEach((key) => {
        res[key] = obj ? obj[key] : null;
    })
    return res
}

export function checkIsMobile() {
    let flag = false;
    if (window.location.toString().indexOf('pref=padindex') != -1) {
        flag = false;
    } else {
        let regular = /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/;
        let regular1 = /AppleWebKit.*Mobile/i;
        let regular2 = /Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i;
        if (regular1.test(navigator.userAgent) || (regular.test(navigator.userAgent))) {
            if (window.location.href.indexOf("?mobile") < 0) {
                flag = true;
            }
        }
    }
    return flag;
}

export function createUrlFromBase64(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return window.URL.createObjectURL(new Blob([uInt8Array], {
        type: contentType
    }));
}

export function testPositive(value) {
    let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
    return reg.test(value.toString())
}

export function getTargetTime(time, tz = 8) {
    const offset = new Date().getTimezoneOffset();
    let date = new Date(time).getTime();
    return date + offset * 60 * 1000 + tz * 60 * 60 * 1000;
}