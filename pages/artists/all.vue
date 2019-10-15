<template>
    <div>
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
        </ATable>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: 'artists.all'
};
</script>
