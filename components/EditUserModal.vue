<template>
    <AModal v-model="syncedShow" title="Chỉnh Sửa Thông Tin" centered :destroy-on-close="true">
        <template slot="footer">
            <AButton key="back" @click="hideModal">Hủy bỏ</AButton>
            <AButton key="submit" type="primary" :loading="loading" @click="submit">
                Cập nhập
            </AButton>
        </template>
        <AForm :form="form">
            <AFormItem label="Tên hiển thị">
                <AInput
                    v-decorator="[
                        'name',
                        {
                            initialValue: user.name,
                            rules: [
                                {
                                    required: false,
                                    message: 'Tên không hợp lệ.',
                                    max: 255
                                }
                            ]
                        }
                    ]"
                    placeholder="Nhập tên hiển thị"
                />
            </AFormItem>
            <AFormItem label="Địa chỉ email">
                <AInput
                    v-decorator="[
                        'email',
                        {
                            initialValue: user.email,
                            rules: [
                                {
                                    required: false,
                                    message: 'Email không hợp lệ.',
                                    type: 'email',
                                    max: 255
                                }
                            ]
                        }
                    ]"
                    disabled
                    placeholder="Nhập địa chỉ email"
                />
            </AFormItem>
            <AFormItem label="Mật khẩu">
                <AInput
                    v-decorator="[
                        'password',
                        {
                            rules: [
                                {
                                    required: false,
                                    message: 'Mật khẩu không hợp lệ.',
                                    max: 255
                                }
                            ]
                        }
                    ]"
                    type="password"
                    placeholder="Nhập mật khẩu"
                />
            </AFormItem>
            <AFormItem label="Chức vụ">
                <ASelect
                    v-decorator="[
                        'role',
                        {
                            initialValue: user.roles && user.roles[0],
                            rules: [
                                {
                                    required: false
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
        </AForm>
    </AModal>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false
        };
    },
    computed: {
        syncedShow: {
            get() {
                return this.show;
            },
            set(value) {
                this.$emit('update:show', value);
            }
        }
    },
    methods: {
        hideModal() {
            this.syncedShow = false;
        },
        busy() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        },
        submit() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.updateUser(values);
                }
            });
        },
        async updateUser(values) {
            const edited = {};
            if (this.user.name !== values.name) edited.name = values.name;
            if (values.password) edited.password = values.password;
            if (this.user.roles[0] !== values.role) edited.role = values.role;

            try {
                if (Object.keys(edited).length === 0) return;

                this.busy();
                await this.$axios.patch(`users/${this.user.id}`, edited);
                this.$notification.success({
                    message: 'Thông báo',
                    description: 'Chỉnh sửa thông tin thành công.'
                });
                this.$emit('success');
            } catch (error) {
                this.$notification.error({
                    message: 'Thông báo',
                    description: error.response.data.message
                });
            } finally {
                this.finish();
                this.hideModal();
            }
        }
    }
};
</script>
