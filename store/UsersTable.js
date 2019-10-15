export const namespaced = true;

export const state = () => ({
    columns: [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'user.id'
        },
        {
            title: 'Tên hiển thị',
            key: 'name',
            dataIndex: 'user.name'
        },
        {
            title: 'Địa chỉ email',
            key: 'email',
            dataIndex: 'user.email'
        },
        {
            title: 'Chức vụ',
            key: 'role',
            dataIndex: 'user.roles[0]',
            scopedSlots: { customRender: 'role' }
        },
        {
            title: 'Thao tác',
            key: 'actions',
            dataIndex: 'user',
            scopedSlots: { customRender: 'actions' }
        }
    ],
    data: [],
    pagination: {},
    loading: false
});

export const mutations = {
    busy(state) {
        state.loading = true;
    },
    finish(state) {
        state.loading = false;
    },
    setData(state, data) {
        state.data = data;
    },
    setPagination(state, pagination) {
        state.pagination = pagination;
    }
};

export const getters = {
    getUsersTableColumns: (state) => state.columns,
    getUsersTableLoading: (state) => state.loading,
    getUsersTableData: (state) => state.data,
    getUsersTablePagination: (state) => state.pagination
};

export const actions = {
    async getUsersData({ commit, state }, page = 1) {
        commit('busy');

        const { data } = await this.$axios.get(`users?page=${page}`);
        const pagination = { ...state.pagination };
        pagination.total = data.meta.total;
        pagination.current = pagination.current || 1;

        commit('setData', data.data);
        commit('setPagination', pagination);

        commit('finish');
    },
    async handleTableChange({ commit, dispatch, state }, pagination = state.pagination) {
        commit('busy');

        const pager = { ...state.pagination };
        pager.current = pagination.current;

        commit('setPagination', pager);

        await dispatch('getUsersData', pager.current);

        commit('finish');
    },
    async searchUser({ commit, state }, keyword) {
        commit('busy');

        const { data } = await this.$axios.get('users?q=' + keyword);

        const pagination = { ...state.pagination };
        pagination.total = data.meta.total;

        commit('setData', data.data);
        commit('setPagination', pagination);

        commit('finish');
    }
};
