export const state = () => ({
  pageInfo: {},
  directionsList: [],
})

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info
  },

  setDirectionsList(state, payload) {
    state.directionsList = payload
  },
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

  async getSectionData(_, { url, data }) {
    try {
      const response = await this.$axios.$post(`${url}`, data)
      return response.data
    } catch (e) {
      console.error(e)
    }
  },

  async getDirectionsList({ commit }, requestData) {
    try {
      const response = await this.$axios.$post(
        'api/v1/directions/list',
        requestData
      )
      commit('setDirectionsList', response.data)
    } catch (e) {
      console.error(e)
    }
  },
}
