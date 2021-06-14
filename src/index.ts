import * as tree from './tree'
import * as array from './array'
import * as formetData from './formetData'
import * as windowAction from './windowAction'
import * as special from './special'

//  npm-dts generate -L debug 构建dts文件

export default  {
    ...tree,
    ...array,
    ...formetData,
    ...windowAction,
    ...special
}