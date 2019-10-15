<template>
    <div>
        <TableInputSearch :search="searchUser" placeholder="Nhập tên thành viên hoặc email muốn tìm kiếm" />
        <ATable
            :columns="usersTableColumns"
            :row-key="(record) => record.user.id"
            :data-source="usersTableData"
            :pagination="usersTablePagination"
            :loading="usersTableLoading"
            :scroll="{
                x: mobile() || tablet() ? 'max-content' : false
            }"
            :locale="{ emptyText: 'Không có dữ liệu' }"
            @change="handleTableChange"
        >
            <template slot="role" slot-scope="role">
                <ATag :color="color(role)" class="uppercase">
                    {{ role }}
                </ATag>
            </template>

            <template slot="actions" slot-scope="user">
                <AButton
                    class="inline-flex justify-center items-center"
                    type="primary"
                    icon="edit"
                    style="width: 30px;"
                    @click="showModalEditUser(user)"
                />
                <APopconfirm title="Bạn có chắc muốn xóa không?" ok-text="Có" cancel-text="Không" @confirm="destroy(user)">
                    <AButton class="inline-flex justify-center items-center" type="danger" icon="delete" style="width: 30px;" />
                </APopconfirm>
            </template>
        </ATable>
        <!-- Edit User Modal -->
        <EditUserModal :show.sync="editUserModal.show" :user="editUserModal.user" @success="handleTableChange" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableInputSearch from '@/components/TableInputSearch.vue';
import EditUserModal from '@/components/EditUserModal.vue';

export default {
    layout: 'admin',
    middleware: 'users.all',
    components: {
        TableInputSearch,
        EditUserModal
    },
    data() {
        return {
            editUserModal: {
                user: {},
                show: false
            }
        };
    },
    computed: {
        ...mapGetters('UsersTable', {
            usersTableColumns: 'getUsersTableColumns',
            usersTableLoading: 'getUsersTableLoading',
            usersTableData: 'getUsersTableData',
            usersTablePagination: 'getUsersTablePagination'
        })
    },
    async mounted() {
        await this.getUsersData(1);
    },
    methods: {
        ...mapActions('UsersTable', ['getUsersData', 'handleTableChange', 'searchUser']),
        color(role) {
            role = role.toLowerCase();
            switch (role) {
                case 'admin':
                    return '#1da57a';
                case 'moderator':
                    return '#2db7f5';
                default:
                    return null;
            }
        },
        async destroy(user) {
            try {
                const response = await this.$axios.delete(`users/${user.id}`);
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
        },
        showModalEditUser(user) {
            this.editUserModal.show = true;
            this.editUserModal.user = user;
        }
    }
};
</script>
