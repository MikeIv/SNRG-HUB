import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export const state = () => ({
  pageInfo: {},
  pageMeta: {},
  IsMenuOpen: false,
});

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info;
  },
  setPageMeta(state, info) {
    state.pageMeta = info;
  },
  changeIsOpen(state, IsMenuOpen) {
    state.IsMenuOpen = IsMenuOpen;
  },
};

export const actions = {
  async getPageInfo({ commit }, requestData) {
    const response = await axios.post('api/v1/page', requestData);
    commit('setPageMeta', response.data.data.meta);
    commit('setPageInfo', response.data.data);
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('globalData/getGlobalData');
  },
};
