export const state = () => ({
  pageInfo: {},
  pageMeta: {},
});

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info;
  },
  setPageMeta(state, info) {
    state.pageMeta = info;
  },
};

export const actions = {
  async getPageInfo({ commit }, requestData) {
    const response = await this.$axios.$post('/api/v1/page', requestData);
    console.log(response);
    commit('setPageMeta', response.meta);
    commit('setPageInfo', response.data);
  },
};
