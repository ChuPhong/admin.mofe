<template>
    <AInputSearch v-model="keyword" :placeholder="placeholder" class="mb-5" @search="submit" />
</template>

<script>
import debounce from 'lodash.debounce';

export default {
    props: {
        search: {
            type: Function,
            required: true
        },
        placeholder: {
            type: String,
            default: () => 'Nhập thông tin muốn tìm kiếm'
        }
    },
    data() {
        return {
            keyword: ''
        };
    },
    watch: {
        keyword(value) {
            this.submit(value);
        }
    },
    created() {
        this.submit = debounce(this.submit, 500);
    },
    methods: {
        submit(keyword) {
            try {
                this.search(keyword);
            } catch (error) {
                this.error(error.response.data.message);
            }
        }
    }
};
</script>
