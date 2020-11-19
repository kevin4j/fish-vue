/**
 * <pre>
 * 字符串格式化日期输入参数： format——指定格式 返 回 值： 格式化后的日期字符串
 * (new Date()).format('yyyy-MM-dd HH:mm:ss')
 * </pre>
 *
 * @param fmt
 *            格式，hh为12小时显示,HH为24小时显示
 * @returns
 */
export function formatDate(date, fmt) {
    const o = {
        "M+" : date.getMonth() + 1, // 月份
        "d+" : date.getDate(), // 日
        "h+" : date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 小时
        "H+" : date.getHours(), // 小时
        "m+" : date.getMinutes(), // 分
        "s+" : date.getSeconds(), // 秒
        "q+" : Math.floor((date.getMonth() + 3) / 3), // 季度
        "S" : date.getMilliseconds() // 毫秒
    };
    const  week = {
        "0" : "\u65e5",
        "1" : "\u4e00",
        "2" : "\u4e8c",
        "3" : "\u4e09",
        "4" : "\u56db",
        "5" : "\u4e94",
        "6" : "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :  padLeftZero(o[k]));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
