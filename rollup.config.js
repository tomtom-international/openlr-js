import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const plugins = [
    resolve({
        preferBuiltins: false
    }),
    commonjs()
];

if (process.env.ROLLUP_UGLIFY === 'true') {
    plugins.push(uglify());
}

export default {
    input: 'lib/es5/index.js',
    output: {
        format: 'umd',
        exports: 'named'
    },
    name: 'OpenLR',
    plugins
};
