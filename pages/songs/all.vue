<template>
    <div>
        <TableInputSearch :search="searchSong" placeholder="Nhập tên bài hát cần tìm kiếm" />
        <ATable
            :columns="songsTableColumns"
            :row-key="(record) => record.song.id"
            :data-source="songsTableData"
            :pagination="songsTablePagination"
            :loading="songsTableLoading"
            :scroll="{
                x: mobile() || tablet() ? 'max-content' : false
            }"
            :locale="{ emptyText: 'Không có dữ liệu' }"
            @change="handleTableChange"
        >
            <template slot="thumbnail" slot-scope="thumbnail">
                <img :src="thumbnail" alt="" class="w-16" />
            </template>
            <template slot="artists" slot-scope="artists">
                {{ [...artists.map((artist) => artist.name)].join(', ') }}
            </template>
            <template slot="year" slot-scope="year">
                {{ year || new Date().getFullYear() }}
            </template>
            <template slot="views" slot-scope="views">
                {{ formatViews(views) }}
            </template>
            <template slot="actions" slot-scope="song">
                <AButton class="inline-flex justify-center items-center" type="primary" icon="edit" style="width: 30px;" />
                <APopconfirm title="Bạn có chắc muốn xóa không?" ok-text="Có" cancel-text="Không" @confirm="destroy(song)">
                    <AButton class="inline-flex justify-center items-center" type="danger" icon="delete" style="width: 30px;" />
                </APopconfirm>
            </template>
        </ATable>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableInputSearch from '@/components/TableInputSearch.vue';

export default {
    layout: 'admin',
    components: {
        TableInputSearch
    },
    computed: {
        ...mapGetters('SongsTable', {
            songsTableColumns: 'getSongsTableColumns',
            songsTableLoading: 'getSongsTableLoading',
            songsTableData: 'getSongsTableData',
            songsTablePagination: 'getSongsTablePagination'
        })
    },
    mounted() {
        this.getSongsData();
    },
    methods: {
        ...mapActions('SongsTable', ['getSongsData', 'handleTableChange', 'searchSong']),
        formatViews(views) {
            return String(views).replace(/(.)(?=(\d{3})+$)/g, '$1.');
        },
        async destroy(song) {
            try {
                const response = await this.$axios.delete(`songs/${song.id}`);
                this.$notification.success({
                    message: 'Thông báo',
                    description: response.data.message
                });
                this.handleTableChange();
            } catch (error) {
                this.$notification.error({
                    message: 'Thông báo',
                    description: error.response.data.message
                });
            }
        }
    }
};
</script>
