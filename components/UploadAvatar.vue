<template>
    <AUpload
        :action="action"
        :name="name"
        list-type="picture-card"
        :show-upload-list="false"
        class="avatar-uploader"
        :headers="headers"
        accept=".png, .jpg, .jpeg"
        @change="upload"
    >
        <img v-if="fullPath" :src="fullPath" alt="avatar" />
        <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="mofe-upload-text">
                Tải lên
            </div>
        </div>
    </AUpload>
</template>

<script>
export default {
    name: 'UploadAvatar',
    props: {
        name: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            headers: {
                Authorization: this.$auth.getToken('laravel.password')
            },
            fullPath: '',
            imageURL: '',
            loading: false
        };
    },
    methods: {
        upload(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }

            if (info.file.status === 'done') {
                this.imageURL = info.file.response.data.path;
                this.fullPath = `${info.file.response.data.base}/${this.imageURL}`;
                this.loading = false;
                this.$emit('success', this.imageURL);
            }
        }
    }
};
</script>

<style lang="less">
.avatar-uploader > .mofe-upload {
    width: 128px;
    height: 128px;
}

.mofe-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.mofe-upload-select-picture-card .mofe-upload-text {
    margin-top: 8px;
    color: #666;
}

.rc-upload {
    display: table-cell;
    width: 100%;
    height: 100%;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
}
</style>
