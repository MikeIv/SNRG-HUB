import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

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
    const response = await axios.post('/api/v1/page', requestData);
    commit('setPageInfo', response.data);
  },
};
