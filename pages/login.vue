<template>
    <ARow type="flex" justify="center" align="middle" class="h-screen flex-col">
        <picture>
            <source media="(max-width: 767.67px)" :srcset="require('~/assets/images/logo_small.png')" class="h-16" />
            <img :src="require('~/assets/images/logo_large.png')" alt="MofE - Trang web nghe nhạc trực tuyến." class="h-16" />
        </picture>
        <ACol :xs="20" :md="10" :xl="6">
            <AForm layout="vertical" class="mt-8" :form="form" @submit.prevent="submit">
                <AFormItem required class="mb-3">
                    <AInput
                        v-decorator="[
                            'email',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Email không hợp lệ.',
                                        type: 'email',
                                        max: 255
                                    }
                                ]
                            }
                        ]"
                        placeholder="Tên đăng nhập"
                        size="large"
                        max
                    />
                </AFormItem>
                <AFormItem required class="mb-3">
                    <AInput
                        v-decorator="[
                            'password',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mật khẩu không hợp lệ.',
                                        min: 5,
                                        max: 255
                                    }
                                ]
                            }
                        ]"
                        placeholder="Mật khẩu"
                        size="large"
                        type="password"
                    />
                </AFormItem>
                <AButton type="primary" block size="large" html-type="submit" :loading="loading">
                    Đăng Nhập
                </AButton>
            </AForm>
        </ACol>
    </ARow>
</template>

<script>
export default {
    name: 'Login',
    layout: 'guest',
    auth: 'guest',
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false
        };
    },
    watch: {
        '$auth.loggedIn'(loggedIn) {
            if (loggedIn) this.$router.push('/');
        }
    },
    methods: {
        submit() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    const { email, password } = values;
                    this.login(email, password);
                }
            });
        },
        async login(email, password) {
            try {
                this.loading = true;

                await this.$auth.loginWith('laravel.password', {
                    data: {
                        email,
                        password
                    }
                });

                this.$notification.success({
                    message: 'Thông Báo',
                    description: 'Đăng nhập thành công.'
                });
            } catch (error) {
                this.$notification.error({
                    message: 'Thông Báo',
                    description: 'Tài khoản hoặc mật khẩu không đúng.'
                });
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
