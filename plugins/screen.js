import Vue from 'vue';

Vue.mixin({
    methods: {
        mobile() {
            return this.$mq === 'xs' || this.$mq === 'sm';
        },
        tablet() {
            return this.$mq === 'md';
        },
        desktop() {
            return this.$mq === 'lg' || this.$mq === 'xl';
        }
    }
});
