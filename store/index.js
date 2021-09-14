export const state = () => ({
  pageInfo: {},
});

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info;
  },
};

export const actions = {
  async getPageInfo({ commit }, requestData) {
    const response = await this.$axios.$post('/api/v1/page', requestData);
    commit('setPageInfo', response.data);
  },
};
