<template>
    <ARow :gutter="12" class="statistical">
        <ACol :xs="24" :md="12" :lg="6">
            <ACard>
                <AStatistic title="Tổng bài hát" :value="songs" group-separator="." />
            </ACard>
        </ACol>
        <ACol :xs="24" :md="12" :lg="6">
            <ACard>
                <AStatistic title="Tổng ca sĩ" :value="artists" group-separator="." />
            </ACard>
        </ACol>
        <ACol :xs="24" :md="12" :lg="6">
            <ACard>
                <AStatistic title="Tổng lượt nghe" :value="views" group-separator="." />
            </ACard>
        </ACol>
        <ACol :xs="24" :md="12" :lg="6">
            <ACard>
                <AStatistic title="Tổng thành viên" :value="users" group-separator="." />
            </ACard>
        </ACol>
    </ARow>
</template>

<script>
import Artists from '@/models/artists';

export default {
    layout: 'admin',
    data() {
        return {
            songs: 0,
            artists: 0,
            views: 0,
            users: 0
        };
    },
    async mounted() {
        const songs = this.$axios.get('songs/info');

        const artists = Artists.select('id')
            .limit(1)
            .get();

        const users = this.$axios.get('users');

        const response = await Promise.all([songs, artists, users]);
        this.songs = response[0].data.data.all_songs;
        this.views = response[0].data.data.all_views;
        this.artists = response[1].meta.total;
        this.users = response[2].data.meta.total;
    }
};
</script>

<style lang="less">
.statistical {
    .mofe-card {
        margin-bottom: 10px;
    }
}
</style>
