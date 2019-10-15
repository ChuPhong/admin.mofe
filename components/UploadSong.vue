<template>
    <AUpload :name="name" :action="action" accept=".mp3, .flac" :headers="headers" @change="upload">
        <AButton><AIcon type="upload" />Nhấn để chọn bài hát</AButton>
    </AUpload>
</template>

<script>
export default {
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
            songURL: ''
        };
    },
    methods: {
        upload(info) {
            if (info.file.status === 'uploading') {
                return;
            }

            if (info.file.status === 'done') {
                this.songURL = info.file.response.data.path;
                this.$emit('success', this.songURL);
            }
        }
    }
};
</script>
