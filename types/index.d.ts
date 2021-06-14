declare module 'easyjs-function' {
  /**
   * @description 对比两个对象数组，将他们的非交集部分返回
   * @param completeArr 被对比的数组
   * @param existArr 对比数组
   * @param key 指定一个属性
   * @returns 返回 completeArr 剩余与existArr没有交集的元素
   * @example
   *
  */
  export function filterArray<T>(completeArr: T[], existArr: T[], key: string): T[];

  /**
  * @description 将json对象转换成 formdata对象
 */
  export function JsonToForm(obj: any): FormData;

  /**
   * @author lingbaikun
   * @description 包含一些比较零散的js方法
   *
  */
  /**
   * @description 生成GUID的函数
  */
  export function geneGUID(): string;
  /**
   * @description 复制的文本到粘贴板
   * @param text 复制的文本内容
   * @param callback 复制成功后回调
   * */
  export function copyText(text: string, callback: {
    (): void;
    (arg0: any): void;
  }): void;
  /**
   * @description 过滤对象存在undefind的属性
  */
  export function fliterUndefind(formData: any): any;

  /**
  * @description 给树结构添加属性,并给属性赋值
  * @param  tree 树结构数据
  * @param  key  需要增加的属性key
  * @param  value  key对应的值
 */
  export function treeAndPro(tree: any[], key: string, value: any): any[];
  /**
   * @description 给树结构数据复制新属性
   * @param  tree 树结构数据
   * @param  key  需要增加的属性key
   * @param  copyKey  要复制的属性
  */
  export function treeCopySelfProperty(tree: any[], key: string, copyKey: any): any[];
  /**
   * @description 移除树结构数据的单个属性
   * @param tree 树结构对象数组
   * @param key 需要移除的 属性
  */
  export function treeDeletePro(tree: any[], key: string): any[];
  /**
   * @description 移除树结构数据的多个属性
   * @param tree 树结构对象数组
   * @param keys 需要移除的 属性
  */
  export function treeDeletePros(tree: any[], keys: string[]): any[];
  /**
   * @description 查找指定key对应树结构的位置,及对应同级的数据
   * @param data 树结构数组
   * @param key 需要匹配的key值
   * @param value key对应的值
   * @param callback 查找到后的回调
  */
  export function treeLoop(data: any[], key: string, value: any, callback: (item: any, index: number, children: any[]) => void): void;
  /**
   * @description 通过ID获取父节点的信息
   * @param value id的值
   * @param tree 树结构数据
   * @param callback 回调
  */
  export function treeGetParent(value: string, tree: any[], callback: (_parent: any) => void): {};
  /**
   * @description 将树结构装换成一位数组结构
  */
  export function treeToList(tree: any[]): any[];

  /**
   * @description 让指定的dom全屏显示
  */
  export function requestFullScreen(id: string): void;
  /**
   * @description 退出全拼
  */
  export function exitFullscreen(): void;
  /**
   * @description 监听屏幕是否全屏
  */
  export function watchFull(callback: Function): void;
}
