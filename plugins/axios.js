export default function({ $axios, redirect, app }) {
    $axios.onRequest((config) => {
        config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    });
}
