export const namespaced = true;

export const state = () => ({
    columns: [
        {
            title: 'Ảnh đại diện',
            key: 'thumbnail',
            dataIndex: 'song.thumbnail',
            scopedSlots: { customRender: 'thumbnail' }
        },
        {
            title: 'Tên bài hát',
            key: 'name',
            dataIndex: 'song.name'
        },
        {
            title: 'Tên khác',
            key: 'otherName',
            dataIndex: 'song.otherName'
        },
        {
            title: 'Ca sĩ',
            key: 'artists',
            dataIndex: 'song.artists',
            scopedSlots: { customRender: 'artists' }
        },
        {
            title: 'Năm',
            key: 'year',
            dataIndex: 'song.year',
            scopedSlots: { customRender: 'year' }
        },
        {
            title: 'Lượt nghe',
            key: 'views',
            dataIndex: 'song.views',
            scopedSlots: { customRender: 'views' }
        },
        {
            title: 'Thao tác',
            key: 'actions',
            dataIndex: 'song',
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
    getSongsTableColumns: (state) => state.columns,
    getSongsTableLoading: (state) => state.loading,
    getSongsTableData: (state) => state.data,
    getSongsTablePagination: (state) => state.pagination
};

export const actions = {
    async getSongsData({ commit, state }, page = 1) {
        commit('busy');

        const { data } = await this.$axios.get(`songs?page=${page}`);
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

        await dispatch('getSongsData', pager.current);

        commit('finish');
    },
    async searchSong({ commit, state }, keyword) {
        commit('busy');

        const { data } = await this.$axios.get('songs?q=' + keyword);

        const pagination = { ...state.pagination };
        pagination.total = data.meta.total;

        commit('setData', data.data);
        commit('setPagination', pagination);

        commit('finish');
    }
};
