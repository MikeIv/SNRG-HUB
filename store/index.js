export const state = () => ({
  pageInfo: {},
  // sectionData: {},
})

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info
  },

  // setSectionData(state, data) {
  //   state.sectionData = data
  // },
}

export const actions = {
  async getPageInfo({ commit }, requestData) {
    try {
      const response = await this.$axios.$post('/api/v1/page', requestData)
      commit('setPageInfo', response.data)
    } catch (e) {
      console.error(e)
    }
  },

  async getSectionData(commit, { url, data }) {
    try {
      const response = await this.$axios.$post(`${url}`, data)
      // commit('setSectionData', response.data)
      return response.data
    } catch (e) {
      console.error(e)
    }
  },
}

// export default actions = {
//   async nuxtServerInit({ dispatch }) {
//     await dispatch(
//   }
// }
