import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import { uglify } from "rollup-plugin-uglify";
import pkg from './package.json'


export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'easyjsFunction',//全局的变量名
            file: pkg.browser,
            format: 'umd',
            minify: true // 代码是否压缩
        },
        plugins: [
            uglify(),
            resolve(),
            commonjs(),
            typescript()
        ]
    },
    {
        input: 'src/index.ts',
        external: ['ms'],
        plugins: [
            typescript()
        ],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
]