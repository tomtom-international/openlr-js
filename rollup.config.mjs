import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [
    resolve({
        preferBuiltins: false
    }),
    commonjs()
];

export default {
    input: 'lib/es5/index.js',
    output: {
        format: 'umd',
        exports: 'named',
        name: 'OpenLR'
    },
    plugins
};
