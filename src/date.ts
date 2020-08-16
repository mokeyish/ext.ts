declare interface Date {
    fmt(fmt: string): string;
}

Object.getPrototypeOf(new Date()).fmt = function (fmt: string) {
    const o: { [key: string]: number } = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            const s = (RegExp.$1.length === 1) ? (o[k]).toString() : (('00' + o[k]).substr(('' + o[k]).length));
            fmt = fmt.replace(RegExp.$1, s);
        }
    }
    return fmt;
}
