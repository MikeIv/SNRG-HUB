import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

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
    const response = await axios.post('api/v1/page', requestData);
    commit('setPageMeta', response.meta);
    commit('setPageInfo', response.data.data);
  },
};
