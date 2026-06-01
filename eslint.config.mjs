import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import headers from 'eslint-plugin-headers';

const licenseHeader = [
    'Copyright (c) (year) TomTom International B.V.',
    '',
    'Licensed under the Apache License, Version 2.0 (the "License");',
    'you may not use this file except in compliance with the License.',
    'You may obtain a copy of the License at',
    '',
    'http://www.apache.org/licenses/LICENSE-2.0',
    '',
    'Unless required by applicable law or agreed to in writing, software',
    'distributed under the License is distributed on an "AS IS" BASIS,',
    'WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
    'See the License for the specific language governing permissions and',
    'limitations under the License.'
].join('\n');

export default tseslint.config(
    {
        ignores: ['lib/**', 'coverage/**', 'examples/**', 'node_modules/**']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts'],
        rules: {
            quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
            // This is a port of a Java library that mirrors 32-bit float behaviour and
            // carries precise geodetic constants (e.g. radians-per-degree). Flagging those
            // literals as "precision loss" is a false positive here.
            'no-loss-of-precision': 'off',
            // The codebase favours defensive initialisers (`let x = 0`) that are always
            // reassigned before use. These are intentional, not bugs.
            'no-useless-assignment': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    // Abstract base methods keep their parameter names for documentation
                    // and overriding, even though the base body just throws.
                    args: 'none',
                    caughtErrors: 'none'
                }
            ]
        }
    },
    {
        // The (de)serializer is inherently dynamic: it walks arbitrary JSON, so `any`
        // and switch-case declarations are unavoidable and deliberate here.
        files: ['src/data/Serializer.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'no-case-declarations': 'off',
            'no-prototype-builtins': 'off'
        }
    },
    {
        files: ['src/**/*.ts'],
        plugins: { headers },
        rules: {
            'headers/header-format': [
                'error',
                {
                    source: 'string',
                    style: 'jsdoc',
                    blockPrefix: '\n',
                    linePrefix: ' * ',
                    blockSuffix: '\n ',
                    trailingNewlines: 2,
                    content: licenseHeader,
                    patterns: {
                        year: { pattern: '\\d{4}(-\\d{4})?', defaultValue: '2025' }
                    }
                }
            ]
        }
    }
);
