/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/**
 * @description 给树结构添加属性,并给属性赋值
 * @param  tree 树结构数据
 * @param  key  需要增加的属性key
 * @param  value  key对应的值
*/
function treeAndPro(tree, key, value) {
    if (!Array.isArray(tree))
        return [];
    return tree.map(function (e) {
        e[key] = value;
        if (e.children) {
            treeAndPro(e.children, key, value);
        }
        return e;
    });
}
/**
 * @description 给树结构数据复制新属性
 * @param  tree 树结构数据
 * @param  key  需要增加的属性key
 * @param  copyKey  要复制的属性
*/
function treeCopySelfProperty(tree, key, copyKey) {
    if (!Array.isArray(tree))
        return [];
    return tree.map(function (e) {
        e[key] = e[copyKey];
        if (e.children) {
            treeAndPro(e.children, key, copyKey);
        }
        return e;
    });
}
/**
 * @description 移除树结构数据的单个属性
 * @param tree 树结构对象数组
 * @param key 需要移除的 属性
*/
function treeDeletePro(tree, key) {
    if (!Array.isArray(tree))
        return [];
    return tree.map(function (e) {
        if (e[key]) {
            delete e[key];
        }
        if (e.children) {
            treeDeletePro(e.children, key);
        }
        return e;
    });
}
/**
 * @description 移除树结构数据的多个属性
 * @param tree 树结构对象数组
 * @param keys 需要移除的 属性
*/
function treeDeletePros(tree, keys) {
    if (!Array.isArray(tree))
        return [];
    return tree.map(function (e) {
        keys.forEach(function (key) {
            if (e[key]) {
                delete e[key];
            }
        });
        if (e.children) {
            treeDeletePros(e.children, keys);
        }
        return e;
    });
}
/**
 * @description 查找指定key对应树结构的位置,及对应同级的数据
 * @param data 树结构数组
 * @param key 需要匹配的key值
 * @param value key对应的值
 * @param callback 查找到后的回调
*/
function treeLoop(data, key, value, callback) {
    for (var i = 0; i < data.length; i++) {
        if (data[i][key] === value) {
            return callback(data[i], i, data);
        }
        if (data[i].children) {
            treeLoop(data[i].children, key, value, callback);
        }
    }
}
/**
 * @description 通过ID获取父节点的信息
 * @param value id的值
 * @param tree 树结构数据
 * @param callback 回调
*/
function treeGetParent(value, tree, callback) {
    var parent = {};
    for (var i = 0; i < tree.length; i++) {
        var node = tree[i];
        if (node.children) {
            if (node.children.some(function (item) { return item.id === value; })) {
                // parent = node;
                callback(node);
            }
            else if (treeGetParent(value, node.children, callback)) {
                treeGetParent(value, node.children, callback);
            }
        }
    }
    return parent;
}
/**
 * @description 将树结构装换成一位数组结构
*/
function treeToList(tree) {
    var list = []; //结果lsit
    for (var i in tree) {
        var node = tree[i];
        list.push(node);
        if (Array.isArray(node.children)) { //遍历树的第一层,只有一个根结点
            //第一层加入到list中,因为根结点模块设置为虚拟结点,所以不用加入
            toListDF(node.children, list); //遍历子树,并加入到list中.
        }
    }
    // console.log(list);
    return list;
}
/**
 * 深度优先遍历树
 * 一个递归方法
 * @params tree:要转换的树结构数据
 * @params list:保存结果的列表结构数据，初始传list = []
 * @params parentId:当前遍历节点的父级节点id，初始为null(因为根节点无parentId)
 **/
function toListDF(tree, list) {
    for (var i in tree) { //遍历最上层
        //将当前树放入list中
        var node = tree[i];
        list.push(node);
        //如果有子结点,再遍历子结点
        if (Array.isArray(node.children)) {
            toListDF(node.children, list); //递归
        }
    }
}

var tree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    treeAndPro: treeAndPro,
    treeCopySelfProperty: treeCopySelfProperty,
    treeDeletePro: treeDeletePro,
    treeDeletePros: treeDeletePros,
    treeLoop: treeLoop,
    treeGetParent: treeGetParent,
    treeToList: treeToList
});

/**
 * @author lingbaikun
 * @description 关于数组的js方法拓展
 *
*/
/**
 * @description 对比两个对象数组，将他们的非交集部分返回
 * @param completeArr 被对比的数组
 * @param existArr 对比数组
 * @param key 指定一个属性
 * @returns 返回 completeArr 剩余与existArr没有交集的元素
 * @example
 *
*/
function filterArray(completeArr, existArr, key) {
    var afArr = [];
    var keyValue = existArr.map(function (e) { return e[key]; });
    completeArr.forEach(function (e) {
        if (!keyValue.includes(e[key])) {
            afArr.push(e);
        }
    });
    return afArr;
}
/**
 * @description 给对象数组排序
 * @param order 排序类型 asc升序 desc 降序
 * @param key 根据 key进行怕排序
*/
function objectArraySort(list, order, key) {
    var copyList = __spreadArray([], list);
    if (order == 'asc') {
        copyList.sort(function (a, b) {
            if (typeof a[key] === 'string') {
                return a[key].localeCompare(b[key]);
            }
            else if (typeof a[key] === 'number') {
                return a[key] - b[key];
            }
        });
    }
    else if (order == 'desc') {
        copyList.sort(function (a, b) {
            if (typeof a[key] === 'string') {
                return b[key].localeCompare(a[key]);
            }
            else if (typeof a[key] === 'number') {
                return b[key] - a[key];
            }
        });
    }
    return copyList;
}

var array = /*#__PURE__*/Object.freeze({
    __proto__: null,
    filterArray: filterArray,
    objectArraySort: objectArraySort
});

/**
 * @description 将json对象转换成 formdata对象
*/
function JsonToForm(obj) {
    var form = new FormData();
    Object.keys(obj).forEach(function (key) {
        form.append(key, obj[key]);
    });
    return form;
}

var formetData = /*#__PURE__*/Object.freeze({
    __proto__: null,
    JsonToForm: JsonToForm
});

/**
 * @description 让指定的dom全屏显示
*/
function requestFullScreen(id) {
    var dom = document.getElementById(id); //绑定想要全屏的组件
    if (dom.requestFullscreen) {
        dom.requestFullscreen();
    }
    else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen();
    }
    else if (dom.webkitRequestFullScreen) {
        dom.webkitRequestFullScreen();
    }
}
/**
 * @description 退出全拼
*/
function exitFullscreen() {
    var dom = document;
    if (dom.exitFullscreen) {
        dom.exitFullscreen();
    }
    else if (dom.mozCancelFullScreen) {
        dom.mozCancelFullScreen();
    }
    else if (dom.webkitCancelFullScreen) {
        dom.webkitCancelFullScreen();
    }
}
/**
 * @description 监听屏幕是否全屏
*/
function watchFull(callback) {
    var doc = document;
    window.addEventListener("resize", function () {
        if (doc.isFullScreen || doc.mozIsFullScreen || doc.webkitIsFullScreen) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
}

var windowAction = /*#__PURE__*/Object.freeze({
    __proto__: null,
    requestFullScreen: requestFullScreen,
    exitFullscreen: exitFullscreen,
    watchFull: watchFull
});

/**
 * @author lingbaikun
 * @description 包含一些比较零散的js方法
 *
*/
/**
 * @description 生成GUID的函数
*/
function geneGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * @description 复制的文本到粘贴板
 * @param text 复制的文本内容
 * @param callback 复制成功后回调
 * */
function copyText(text, callback) {
    var tag = document.createElement('input');
    tag.setAttribute('id', 'cp_hgz_input');
    tag.value = text;
    document.getElementsByTagName('body')[0].appendChild(tag);
    var dom = document.getElementById('cp_hgz_input');
    if (dom != null)
        dom.select();
    document.execCommand('copy');
    if (dom != null)
        dom.remove();
    if (callback) {
        callback(text);
    }
}
/**
 * @description 过滤对象存在undefind的属性
*/
function fliterUndefind(formData) {
    var _formData = {};
    Object.keys(formData).forEach(function (key) {
        if (formData[key] != undefined) {
            if (typeof formData[key] === 'string') {
                _formData[key] = formData[key].trim();
            }
            else {
                _formData[key] = formData[key];
            }
        }
    });
    return _formData;
}

var special = /*#__PURE__*/Object.freeze({
    __proto__: null,
    geneGUID: geneGUID,
    copyText: copyText,
    fliterUndefind: fliterUndefind
});

//  npm-dts generate -L debug 构建dts文件
var index = __assign(__assign(__assign(__assign(__assign({}, tree), array), formetData), windowAction), special);

export default index;
