import { DateTime } from 'luxon'

const state = () => ({
  allGames: [],
  pollGames: [],
  today: DateTime.now(),
})
export const getters = {
  allGames: (state) => state.allGames,
  pollGames: (state) => state.pollGames,
}
const actions = {
  async getAllGames({ commit }) {
    const allGames = await this.$http.$get('/api/games/')
    commit('setAllGames', allGames)
  },
  async getPollGames({ commit }) {
    const pollGames = await this.$http.$get('/api/games/poll')
    commit('setPollGames', pollGames.games)
  },
}

const mutations = {
  setAllGames(state, value) {
    state.allGames = value
  },
  setPollGames(state, value) {
    state.pollGames = value
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
