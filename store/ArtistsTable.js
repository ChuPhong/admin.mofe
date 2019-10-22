import Artists from '@/models/artists';

export const namespaced = true;

export const state = () => ({
    columns: [
        {
            title: 'Ảnh đại diện',
            key: 'avatar',
            dataIndex: 'avatar',
            scopedSlots: { customRender: 'avatar' }
        },
        {
            title: 'Tên ca sĩ',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Số bài hát',
            key: 'songs',
            dataIndex: 'songs_count'
        },
        {
            title: 'Thao tác',
            key: 'actions',
            dataIndex: 'id',
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
    getArtistsTableColumns: (state) => state.columns,
    getArtistsTableLoading: (state) => state.loading,
    getArtistsTableData: (state) => state.data,
    getArtistsTablePagination: (state) => state.pagination
};

export const actions = {
    async getArtistsData({ commit, state }, page = 1) {
        commit('busy');

        const { data, meta } = await Artists.select('id', 'name', 'avatar')
            .page(page)
            .limit(10)
            .orderBy('name')
            .get();
        const pagination = { ...state.pagination };
        pagination.total = meta.total;
        pagination.current = pagination.current || 1;

        commit('setData', data);
        commit('setPagination', pagination);

        commit('finish');
    },
    async handleTableChange({ commit, dispatch, state }, pagination = state.pagination) {
        commit('busy');

        const pager = { ...state.pagination };
        pager.current = pagination.current;

        commit('setPagination', pager);

        await dispatch('getArtistsData', pager.current);

        commit('finish');
    },
    async searchArtist({ commit, state }, keyword) {
        commit('busy');

        const { data, meta } = await Artists.select('id', 'name', 'avatar')
            .where('name', keyword)
            .get();

        const pagination = { ...state.pagination };
        pagination.total = meta.total;

        commit('setData', data);
        commit('setPagination', pagination);

        commit('finish');
    }
};
