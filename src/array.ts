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
export function filterArray<T>(completeArr: T[], existArr: T[], key: string): T[] {
    let afArr: T[] = [];
    let keyValue = existArr.map((e: any) => e[key]) as string[];
    completeArr.forEach((e: any) => {
        if (!keyValue.includes(e[key])) {
            afArr.push(e)
        }
    });
    return afArr
}

/**
 * @description 给对象数组排序
 * @param order 排序类型 asc升序 desc 降序
 * @param key 根据 key进行怕排序
*/
export function objectArraySort<T>(list: T[], order: 'asc' | 'desc', key: string): T[] {
    const copyList = [...list]
    if (order == 'asc') {
        copyList.sort((a: any, b: any) => {
            if (typeof a[key] === 'string') {
                return a[key].localeCompare(b[key])
            } else if (typeof a[key] === 'number') {
                return a[key] - b[key]
            }
        });
    } else if (order == 'desc') {
        copyList.sort((a: any, b: any) => {
            if (typeof a[key] === 'string') {
                return b[key].localeCompare(a[key])
            } else if (typeof a[key] === 'number') {
                return b[key] - a[key]
            }
        });
    }
    return copyList
}

