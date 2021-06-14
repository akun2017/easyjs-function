/**
 * @author lingbaikun
 * @description 包含一些比较零散的js方法
 * 
*/



/**
 * @description 生成GUID的函数
*/
export function geneGUID():string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * @description 复制的文本到粘贴板
 * @param text 复制的文本内容
 * @param callback 复制成功后回调
 * */
export function copyText(text: string, callback: { (): void; (arg0: any): void; }){ // text: 要复制的内容， callback: 回调
    var tag = document.createElement('input');
    tag.setAttribute('id', 'cp_hgz_input');
    tag.value = text;
    document.getElementsByTagName('body')[0].appendChild(tag);
    let dom: any = document.getElementById('cp_hgz_input');
    if (dom != null) dom.select();
    document.execCommand('copy');
    if (dom != null) dom.remove();
    if (callback) { callback(text) }
}

/**
 * @description 过滤对象存在undefind的属性
*/
export function fliterUndefind(formData: any) {
    let _formData: any = {};
    Object.keys(formData).forEach(key => {
        if (formData[key] != undefined) {
            if (typeof formData[key] === 'string') {
                _formData[key] = formData[key].trim();
            } else {
                _formData[key] = formData[key];
            }
        }
    });
    return _formData
}


/**
 * @description 将数字转换成excel表头的大写字母
*/
export function numToString(qty: number): string {
    let char = "";
    let array: any[] = [];
    // Switch ASCII
    let numToStringAction = function (nnum: number) {
        let num = nnum - 1 as number;
        let a = Math.floor(num / 26);
        let b = num % 26;
        array.push(b);
        if (a > 0) {
            numToStringAction(a);
        }
    }
    numToStringAction(qty);
    array = array.reverse();
    // Return excel letter: such => C / AA / BBA
    for (let i = 0; i < array.length; i++) {
        char += String.fromCharCode(64 + parseInt(array[i] + 1));
    }
    return char;
}
