<template>
    <div class="flex flex-col justify-center items-center h-screen bg-black">
        <h1 class="text-white text-xl uppercase">
            {{ message }}
        </h1>
        <div :class="{ 'flex justify-between': true, 'w-40': this.$auth.loggedIn }">
            <NuxtLink to="/">Trang Chủ</NuxtLink>
            <button v-if="this.$auth.loggedIn" class="outline-none text-green" @click="logout">
                Đăng Xuất
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            message: ''
        };
    },
    mounted() {
        switch (this.error.statusCode) {
            case 403:
                this.message = 'Không có quyền truy cập';
                break;
            default:
                this.message = 'Trang không tồn tại';
                break;
        }
    },
    methods: {
        logout() {
            this.$auth.logout();
            this.$router.push('/login');
        }
    }
};
</script>
