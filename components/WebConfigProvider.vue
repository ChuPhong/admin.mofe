<template>
    <Fragment>
        <slot />
    </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import { mapGetters } from 'vuex';

export default {
    name: 'WebConfigProvider',
    components: {
        Fragment
    },
    props: {
        config: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters('WebConfig', ['getWebConfig'])
    },
    provide: () => {
        console.log(this);
    }
};
</script>
