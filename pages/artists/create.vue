<template>
    <ARow>
        <ACol :span="24">
            <h1 class="text-xl md:text-2xl uppercase">
                Thêm ca sĩ
            </h1>
        </ACol>
        <ACol :span="24">
            <AForm :form="form" @submit.prevent="submit">
                <ACol :xs="24">
                    <AFormItem label="Tên ca sĩ">
                        <AInput
                            v-decorator="[
                                'name',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Tên không hợp lệ.',
                                            min: 2,
                                            max: 20
                                        }
                                    ]
                                }
                            ]"
                            placeholder="Nhập tên ca sĩ"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24">
                    <AFormItem label="Ảnh đại diện">
                        <UploadAvatar
                            v-decorator="[
                                'avatar',
                                {
                                    initialValue: null,
                                    rules: [
                                        {
                                            required: false,
                                            max: 255
                                        }
                                    ]
                                }
                            ]"
                            name="avatar"
                            action="http://api.mofe.com/api/v1/artists/avatar"
                            @success="(imageURL) => (imageUrl = imageURL)"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24">
                    <AButton type="primary" block size="large" html-type="submit" :loading="loading">
                        Tạo Ca Sĩ
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
    middleware: 'artists.store',
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
                    this.createArtist(values);
                }
            });
        },
        async createArtist(params) {
            const { name } = params;
            try {
                this.loading = true;

                await this.$axios.post('/artists', {
                    name,
                    avatar: this.imageUrl
                });

                this.$notification.success({
                    message: 'Thông Báo',
                    description: `Tạo thành công ca sĩ ${params.name}.`
                });

                this.form.resetFields();
            } catch (e) {
                this.$notification.error({
                    message: 'Thông Báo',
                    description: e.response.data.message
                });
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
