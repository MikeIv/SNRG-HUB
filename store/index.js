import { axiosCreate } from '~/axios/axios';

const axios = axiosCreate();

const landerConfig = require('~/lander.config.json');

export const state = () => ({
  pageInfo: {},
  pageMeta: {},
  cityInfo: {},
  isMenuOpen: false,
  isPopupSelectCity: false,
  quizInfo: {},
  utms: {},
  followedLink: '',
  landerSettings: {
    type: '',
    unit: '',
    land: '',
    redirectUrl: '',
  },
  isVisible: true,
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
  updateLander(state, info) {
    Object.keys(info).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(state.landerSettings, key) && info[key]) {
        state.landerSettings[key] = info[key];
        if (key === 'type') {
          state.landerSettings[key] = landerConfig[key];
        }
      }
    });
  },
  changeIsVisible(state, val) {
    state.isVisible = val;
  },
};

export const actions = {
  async getPageInfo({ commit }, { requestData, redirect }) {
    try {
      const response = await axios.post('api/v1/page', requestData);
      commit('setPageMeta', response.data.data.meta);
      commit('setPageInfo', response.data.data);
      commit('updateLander', landerConfig);
    } catch (error) {
      if (error.response.data.success === false) {
        redirect('/404');
      }
    }
  },

  getLanderInfo({ commit }) {
    commit('updateLander', landerConfig);
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch('globalData/getGlobalData');
  },

  getChangeVisible({ commit }) {
    commit('changeIsVisible', true);
  },
};
