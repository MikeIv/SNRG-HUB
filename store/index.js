import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export const state = () => ({
  pageInfo: {},
  pageMeta: {},
  cityInfo: {},
  isMenuOpen: false,
  isPopupSelectCity: false,
  quizInfo: {},
  utms: {},
  followedLink: '',
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
  changeIsPopupSelectCity(state, val) {
    state.isPopupSelectCity = val;
  },
  setCityInfo(state, info) {
    state.cityInfo = info;
  },
  setUtms(state, utms) {
    state.utms = utms;
  },
  setFollowedLink(state, link) {
    state.followedLink = link;
  },
};

export const actions = {
  async getPageInfo({ commit }, { requestData, redirect }) {
    try {
      const response = await axios.post('api/v1/page', requestData);
      commit('setPageMeta', response.data.data.meta);
      commit('setPageInfo', response.data.data);
    } catch (error) {
      if (error.response.data.success === false) {
        redirect('/404');
      }
    }
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('globalData/getGlobalData');
  },
};
