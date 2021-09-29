import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export const state = () => ({
  globalData: {},
});

export const mutations = {
  setGlobalData(state, info) {
    state.globalData = info;
  },
};

export const actions = {
  async getGlobalData({ commit }, requestData) {
    const response = await axios.post('/api/v1/app/site', requestData);
    commit('setGlobalData', response.data);
  },
};
