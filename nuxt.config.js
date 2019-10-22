// const path = require('path');
import path from 'path';
import { keywords } from './package';

export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: 'MofE - Trang web nghe nhạc trực tuyến',
        htmlAttrs: {
            lang: 'vi'
        },
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: keywords.join(', ') || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#1DA57A'
    },
    /*
     ** Global CSS
     */
    // css: ['ant-design-vue/dist/antd.css'],
    css: ['~/assets/css/tailwind.css', '~/assets/css/notifications.css'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['@/plugins/antd-ui', '@/plugins/axios', '@/plugins/screen', '@/plugins/vue-api-query'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        [
            '@nuxt/typescript-build',
            {
                typeCheck: false
            }
        ],
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Nuxt Auth
        '@nuxtjs/auth',
        // Nuxt Media Queries
        [
            'nuxt-mq',
            {
                // Default breakpoint for SSR
                defaultBreakpoint: 'default',
                breakpoints: {
                    xs: 575.98,
                    sm: 767.98,
                    md: 991.98,
                    lg: 1199.98,
                    xl: Infinity
                }
            }
        ]
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'http://api.mofe.com/api/v1'
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'ant-design-vue',
                        libraryDirectory: 'es',
                        style: true
                    }
                ]
            ]
        },
        loaders: {
            less: {
                modifyVars: {
                    'ant-prefix': 'mofe',
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '0',
                    'layout-header-background': '#13181d',
                    'menu-dark-submenu-bg': '#0b1015',
                    'card-radius': '.5rem',
                    'card-head-padding': '12px',
                    'statistic-title-font-size': '18px'
                },
                javascriptEnabled: true
            }
        },
        postcss: {
            plugins: {
                tailwindcss: path.resolve(__dirname, './tailwind.config.js')
            }
        }
    },
    router: {
        middleware: ['auth']
    },
    auth: {
        plugins: ['@/plugins/auth'],
        strategies: {
            password_grant: {
                _scheme: 'local',
                _name: 'laravel.password',
                endpoints: {
                    login: {
                        url: 'auth/login',
                        method: 'post',
                        propertyName: 'access_token'
                    },
                    logout: false,
                    user: {
                        url: 'auth/me',
                        propertyName: 'data.user'
                    }
                }
            }
        },
        watchLoggedIn: true
    }
};
