# easyjs-function

> 整理一些比较特殊的js方法，包括以下范围

[使用文档 ](http://lingbk.top:9099/)

1. 对象数组操作
2. 表单操作
3. window操作
4. 树结构数据操作

## Docs
[使用文档](http://lingbk.top:9099/)

## Example
```js
import { treeAndPro } from "easyjs-function";
let c = [
    {
        name: 'ling',
        age: 34,
        children:[
            {
                name: 'ling2',
                age: 123
            },
            {
                name: 'ling3',
                age: 456
            },
        ]
    },
    {
        name: 'ling4',
        age: 232
    }
]
treeAndPro(c, "newKey", "1234");
```