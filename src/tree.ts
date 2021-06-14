/**
 * @description 给树结构添加属性,并给属性赋值
 * @param  tree 树结构数据
 * @param  key  需要增加的属性key
 * @param  value  key对应的值
*/
export function treeAndPro(tree: any[], key: string, value: any): any[] {
    if (!Array.isArray(tree)) return []
    return tree.map(e => {
        e[key] = value;
        if (e.children) {
            treeAndPro(e.children, key, value);
        }
        return e
    });
}

/**
 * @description 给树结构数据复制新属性
 * @param  tree 树结构数据
 * @param  key  需要增加的属性key
 * @param  copyKey  要复制的属性
*/
export function treeCopySelfProperty(tree: any[], key: string, copyKey: any): any[] {
    if (!Array.isArray(tree)) return []
    return tree.map(e => {
        e[key] = e[copyKey];
        if (e.children) {
            treeAndPro(e.children, key, copyKey);
        }
        return e
    });
}

/**
 * @description 移除树结构数据的单个属性
 * @param tree 树结构对象数组
 * @param key 需要移除的 属性
*/
export function treeDeletePro(tree: any[], key: string): any[] {
    if (!Array.isArray(tree)) return []
    return tree.map(e => {
        if (e[key]) {
            delete e[key]
        }
        if (e.children) {
            treeDeletePro(e.children, key);
        }
        return e
    });
}

/**
 * @description 移除树结构数据的多个属性
 * @param tree 树结构对象数组
 * @param keys 需要移除的 属性
*/
export function treeDeletePros(tree: any[], keys: string[]): any[] {
    if (!Array.isArray(tree)) return []
    return tree.map(e => {
        keys.forEach(key => {
            if (e[key]) {
                delete e[key]
            }
        });
        if (e.children) {
            treeDeletePros(e.children, keys);
        }
        return e
    });
}



/**
 * @description 查找指定key对应树结构的位置,及对应同级的数据
 * @param data 树结构数组
 * @param key 需要匹配的key值
 * @param value key对应的值
 * @param callback 查找到后的回调
*/
export function treeLoop(data: any[], key: string, value: any, callback: (item: any, index: number, children: any[]) => void): void {
    for (let i = 0; i < data.length; i++) {
        if (data[i][key] === value) {
            return callback(data[i], i, data);
        }
        if (data[i].children) {
            treeLoop(data[i].children, key, value, callback);
        }
    }
};

/**
 * @description 通过ID获取父节点的信息
 * @param value id的值
 * @param tree 树结构数据
 * @param callback 回调
*/
export function treeGetParent(value: string, tree: any[], callback: (_parent: any) => void) {
    let parent = {};
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item: any) => item.id === value)) {
                // parent = node;
                callback(node)
            } else if (treeGetParent(value, node.children, callback)) {
                treeGetParent(value, node.children, callback);
            }
        }
    }
    return parent;
};



/**
 * @description 将树结构装换成一位数组结构
*/
export function treeToList(tree: any[]) {
    let list: any[] = [];  //结果lsit
    for (var i in tree) {
        var node = tree[i];
        list.push(node)
        if (Array.isArray(node.children)) {  //遍历树的第一层,只有一个根结点
            //第一层加入到list中,因为根结点模块设置为虚拟结点,所以不用加入
            toListDF(node.children, list);  //遍历子树,并加入到list中.
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
function toListDF(tree: any[], list: any[]) {
    for (var i in tree) { //遍历最上层
        //将当前树放入list中
        var node = tree[i];
        list.push(node);
        //如果有子结点,再遍历子结点
        if (Array.isArray(node.children)) {
            toListDF(node.children, list)  //递归
        }
    }
}