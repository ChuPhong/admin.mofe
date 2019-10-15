import Vue from 'vue'
// @ts-ignore
import auth from '@nuxtjs/auth/lib/core/auth';

/* This file simply imports the needed types from firebase and forwards them */
declare module 'vue/types/vue' {
    export interface Vue {
        $mq: string;
        $auth: auth
    }
}
