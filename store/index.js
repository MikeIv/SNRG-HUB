export const state = () => ({
  pageInfo: {},
})

export const mutations = {
  setPageInfo(state, info) {
    state.pageInfo = info
  },
}
