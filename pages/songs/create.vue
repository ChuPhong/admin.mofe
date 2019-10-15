<template>
    <ARow>
        <ACol :span="24">
            <h1 class="text-xl md:text-2xl uppercase">
                Thêm bài hát
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
                                            message: 'Tên bài hát không hợp lệ.',
                                            max: 100
                                        }
                                    ]
                                }
                            ]"
                            placeholder="Tên bài hát"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11" :offset="tablet() || desktop() ? 2 : 0">
                    <AFormItem label="Tên khác">
                        <AInput
                            v-decorator="[
                                'otherName',
                                {
                                    rules: [
                                        {
                                            required: false,
                                            message: 'Tên bài hát không hợp lệ.',
                                            max: 100
                                        }
                                    ]
                                }
                            ]"
                            placeholder="Nhập tên khác của bài hát"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11">
                    <AFormItem label="Ca sĩ">
                        <ASelect
                            v-decorator="[
                                'artists',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Ca sĩ không hợp lệ'
                                        },
                                        {
                                            validator: checkArtists
                                        }
                                    ]
                                }
                            ]"
                            mode="multiple"
                            style="width: 100%"
                            placeholder="Chọn ca sĩ"
                            :max-tag-count="3"
                            @change="changeArtists"
                        >
                            <ASelectOption v-for="artist in allArtists" :key="artist.name">{{ artist.name }}</ASelectOption>
                        </ASelect>
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11" :offset="tablet() || desktop() ? 2 : 0">
                    <AFormItem label="Năm ra mắt">
                        <AInput
                            v-decorator="[
                                'year',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Năm ra mắt không hợp lệ.'
                                        }
                                    ]
                                }
                            ]"
                            placeholder="Nhập tên bài hát khác"
                            type="number"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11">
                    <AFormItem label="Bài hát">
                        <UploadSong
                            v-model="songUrl"
                            v-decorator="[
                                'url',
                                {
                                    initialValue: songUrl,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Bạn không thể tạo bài hát khi không upload bài hát lên server.'
                                        }
                                    ]
                                }
                            ]"
                            name="song"
                            action="http://api.mofe.com/api/v1/songs/upload"
                            @success="(songURL) => (songUrl = songURL)"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24" :md="11" :offset="tablet() || desktop() ? 2 : 0">
                    <AFormItem label="Ảnh đại diện">
                        <UploadAvatar
                            v-model="imageUrl"
                            v-decorator="[
                                'thumbnail',
                                {
                                    initialValue: imageUrl,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Ảnh đại diện của bài hát không được để trống.'
                                        }
                                    ]
                                }
                            ]"
                            name="thumbnail"
                            action="http://api.mofe.com/api/v1/songs/thumbnail"
                            @success="(imageURL) => (imageUrl = imageURL)"
                        />
                    </AFormItem>
                </ACol>
                <ACol :xs="24">
                    <AButton type="primary" block size="large" html-type="submit" :loading="loading">
                        Tạo bài hát
                    </AButton>
                </ACol>
            </AForm>
        </ACol>
    </ARow>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UploadSong from '@/components/UploadSong.vue';
import UploadAvatar from '@/components/UploadAvatar.vue';

export default {
    layout: 'admin',
    components: {
        UploadAvatar,
        UploadSong
    },
    data() {
        return {
            form: this.$form.createForm(this),
            loading: false,
            imageUrl: null,
            songUrl: null
        };
    },
    computed: {
        ...mapGetters('Artist', {
            allArtists: 'getArtists'
        })
    },
    mounted() {
        this.getAllArtists();
    },
    methods: {
        ...mapActions('Artist', ['getAllArtists']),
        checkArtists(rule, value, callback) {
            if (value && value.length > 3) {
                // eslint-disable-next-line standard/no-callback-literal
                callback('Tối đa 3 ca sĩ');
            } else {
                callback();
            }
        },
        changeArtists(value) {
            console.log(value.join(', '));
        },
        submit() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.createSong(values);
                }
            });
        },
        async createSong(values) {
            const { url, ...params } = values;
            params.url = this.songUrl;
            params.thumbnail = this.imageUrl;
            try {
                this.loading = true;
                await this.$axios.post('songs', params);
                this.$notification.success({
                    message: 'Thông báo',
                    description: 'Tạo bài hát thành công'
                });
            } catch (e) {
                this.$notification.error({
                    message: 'Thông báo',
                    description: e.response.data.message || 'Đã xảy ra lỗi khi tạo bài hát'
                });
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
