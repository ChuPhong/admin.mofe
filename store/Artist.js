export const namespaced = true;

export const state = () => ({
    artists: []
});

export const mutations = {
    setArtists(state, data) {
        state.artists = data;
    }
};

export const getters = {
    getArtists: (state) => state.artists
};

export const actions = {
    async getAllArtists({ commit }) {
        const resposne = await this.$axios.get('artists?showall');
        commit('setArtists', resposne.data.data);
    }
};
