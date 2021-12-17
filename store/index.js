import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

export const state = () => ({
  pageInfo: {},
  pageMeta: {},
  city: 'Москва',
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
  setCity(state, newCity) {
    state.city = newCity;
  },
  setUtms(state, utms) {
    state.utms = utms;
  },
  setFollowedLink(state, link) {
    state.followedLink = link;
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
