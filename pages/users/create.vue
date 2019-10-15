<template>
    <ARow>
        <ACol :span="24">
            <h1 class="text-xl md:text-2xl uppercase">
                Thêm người dùng
            </h1>
        </ACol>
        <ACol :span="24">
            <AForm :form="form" @submit.prevent="submit">
                <ACol :xs="24" :md="11">
                    <AFormItem label="Tên hiển thị">
                        <AInput
                            v-decorator="[
                                'name',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Tên không hợp lệ.',
                                            min: 5,
                                            max: 255
                                        }
                                    ]
                                }
                            ]"
                            placeholder="Nhập tên hiển thị"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11" :offset="tablet() || desktop() ? 2 : 0">
                    <AFormItem label="Địa chỉ email">
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
                            placeholder="Nhập địa chỉ email"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11">
                    <AFormItem label="Mật khẩu">
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
                                        },
                                        {
                                            validator: validateToNextPassword
                                        }
                                    ]
                                }
                            ]"
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11" :offset="tablet() || desktop() ? 2 : 0">
                    <AFormItem label="Nhập lại mật khẩu">
                        <AInput
                            v-decorator="[
                                'password_confirmation',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Mật khẩu không hợp lệ.',
                                            min: 5,
                                            max: 255
                                        },
                                        {
                                            validator: compareToFirstPassword
                                        }
                                    ]
                                }
                            ]"
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11">
                    <AFormItem label="Chức vụ">
                        <ASelect
                            v-decorator="[
                                'role',
                                {
                                    initialValue: 'user',
                                    rules: [
                                        {
                                            required: true
                                        }
                                    ]
                                }
                            ]"
                        >
                            <ASelectOption value="admin">Admin</ASelectOption>
                            <ASelectOption value="moderator">
                                Moderator
                            </ASelectOption>
                            <ASelectOption value="user">User</ASelectOption>
                        </ASelect>
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11" :offset="tablet() || desktop() ? 2 : 0">
                    <AFormItem label="Ảnh đại diện">
                        <UploadAvatar
                            v-decorator="[
                                'thumbnail',
                                {
                                    initialValue: null,
                                    rules: [
                                        {
                                            required: false
                                        }
                                    ]
                                }
                            ]"
                            name="avatar"
                            action="http://api.mofe.com/api/v1/users/avatar"
                            @success="(imageURL) => (imageUrl = imageURL)"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24">
                    <AButton type="primary" block size="large" html-type="submit" :loading="loading">
                        Đồng Ý
                    </AButton>
                </ACol>
            </AForm>
        </ACol>
    </ARow>
</template>

<script>
import UploadAvatar from '@/components/UploadAvatar.vue';

export default {
    layout: 'admin',
    middleware: 'users.store',
    components: {
        UploadAvatar
    },
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false,
            imageUrl: ''
        };
    },
    methods: {
        submit() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.createUser(values);
                }
            });
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue('password')) {
                // eslint-disable-next-line standard/no-callback-literal
                callback('Mật khẩu bạn nhập vào không trùng khớp.');
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(['password_confirmation'], {
                    force: true
                });
            }
            callback();
        },
        createUser(params) {
            const {
                name,
                email,
                password,
                // eslint-disable-next-line camelcase
                password_confirmation,
                role
            } = params;

            this.loading = true;

            const a = { name, email, password, password_confirmation, role };
            if (this.imageUrl) a.thumbnail = this.imageUrl;

            this.$axios
                .post('/users', a)
                .then(() => {
                    this.$notification.success({
                        message: 'Thông Báo',
                        description: `Tạo thành công thành viên: ${email}.`
                    });
                    this.form.resetFields();
                })
                .catch(() => {
                    this.$notification.error({
                        message: 'Thông Báo',
                        description: 'Đã xảy ra lỗi khi tạo thành viên.'
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>
