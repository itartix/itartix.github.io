/// <reference types="./src/vite-env.d.ts" />

import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import LessPluginGlob from 'less-plugin-glob';
import path from 'path';

export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                plugins: [LessPluginGlob],
            },
        },
    },
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/images/symbol')],
            symbolId: 'symbol-[dir]-[name]',
            inject: 'body-first',
            svgoOptions: {
                plugins: [
                    {
                        name: 'removeAttrs',
                        params: {
                            attrs: '(fill|stroke)'
                        }
                    }
                ]
            }
        }),
    ],
});