/*
 * Copyright (c) 2025 TomTom International B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const plugins = [
    resolve({
        preferBuiltins: false
    }),
    commonjs()
];

export default {
    input: 'lib/es5/index.js',
    output: [
        {
            file: 'lib/browser/bundle.js',
            format: 'umd',
            exports: 'named',
            name: 'OpenLR'
        },
        {
            file: 'lib/browser/bundle.min.js',
            format: 'umd',
            exports: 'named',
            name: 'OpenLR',
            plugins: [
                terser()
            ]
        }
    ],
    plugins
};
