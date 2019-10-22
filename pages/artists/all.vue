<template>
    <div>
        <TableInputSearch :search="searchArtist" placeholder="Nhập tên ca sĩ cần tìm kiếm" />
        <ATable
            :columns="songsTableColumns"
            :row-key="(record) => record.id"
            :data-source="songsTableData"
            :pagination="songsTablePagination"
            :loading="songsTableLoading"
            :scroll="{
                x: mobile() || tablet() ? 'max-content' : false
            }"
            :locale="{ emptyText: 'Không có dữ liệu' }"
            @change="handleTableChange"
        >
            <template slot="avatar" slot-scope="avatar">
                <img :src="avatar" alt="" class="w-16" />
            </template>
            <template slot="actions" slot-scope="id">
                <AButton class="inline-flex justify-center items-center" type="primary" icon="edit" style="width: 30px;" @click="() => null" />
                <APopconfirm title="Bạn có chắc muốn xóa không?" ok-text="Có" cancel-text="Không" @confirm="destroy(id)">
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
    middleware: 'artists.all',
    components: {
        TableInputSearch
    },
    computed: {
        ...mapGetters('ArtistsTable', {
            songsTableColumns: 'getArtistsTableColumns',
            songsTableLoading: 'getArtistsTableLoading',
            songsTableData: 'getArtistsTableData',
            songsTablePagination: 'getArtistsTablePagination'
        })
    },
    fetch({ store }) {
        store.dispatch('ArtistsTable/getArtistsData');
    },
    methods: {
        ...mapActions('ArtistsTable', ['getArtistsData', 'handleTableChange', 'searchArtist']),
        async destroy(artistID) {
            try {
                const response = await this.$axios.delete(`artists/${artistID}`);
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
