import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export const state = () => ({
  pageInfo: {},
  pageMeta: {},
  isMenuOpen: false,
  quizInfo: {},
});

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info;
  },
  setPageMeta(state, info) {
    state.pageMeta = info;
  },
  changeIsOpen(state, isOpen) {
    state.IsMenuOpen = isOpen;
  },
  setQuizInfo(state, quiz) {
    state.quizInfo = quiz;
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
