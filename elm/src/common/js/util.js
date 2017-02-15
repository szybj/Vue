/**
 * 解析url参数
 * @example ?id=123&a=b
 * @return Object {id:123,a:b}
 */
    export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    var arr = url.match(reg);

    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substr(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let value = decodeURIComponent(tempArr[1]);
            obj[key] = value;
        });
    }
    return obj;
};
