import { DateTime } from 'luxon'

const state = () => ({
  allGames: [],
  pollGames: [],
  today: DateTime.now(),
  active: 0,
  lastFetch: 0,
  activeGames: 0,
})
export const getters = {
  allGames: (state) => state.allGames,
  pollGames: (state) => state.pollGames,
  lastFetch: (state) => state.lastFetch,
  activeGames: (state) => state.activeGames,
}
const actions = {
  async getAllGames({ commit }) {
    const allGames = await this.$http.$get('https://liiga.fi/api/v1/games/')
    commit('setAllGames', allGames)
  },
  async getPollGames({ commit, state, dispatch }) {
    const pollGames = await this.$http.$get(
      'https://liiga.fi/api/v1/games/poll'
    )
    commit('setLastFetch', DateTime.local().toISO())
    commit(
      'setPollGames',
      pollGames.games.sort((a, b) => a.id - b.id)
    )
    const activeGames = (pollGames.games && pollGames.games.length) || 0
    if (activeGames !== state.activeGames) {
      commit('setActiveGames', activeGames)
      // pollGame ended, fetch allGames again to get final results
      dispatch('getAllGames')
    }
  },
}

const mutations = {
  setAllGames(state, value) {
    state.allGames = value
  },
  setLastFetch(state, value) {
    state.lastFetch = value
  },
  setPollGames(state, value) {
    state.pollGames = value
  },
  setActiveGames(state, value) {
    state.activeGames = value
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
