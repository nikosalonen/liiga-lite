import { DateTime } from 'luxon'

const state = () => ({
  allGames: [],
  pollGames: [],
  today: DateTime.now(),
  active: 0,
})
export const getters = {
  allGames: (state) => state.allGames,
  pollGames: (state) => state.pollGames,
}
const actions = {
  async getAllGames({ commit }) {
    const allGames = await this.$http.$get('https://liiga.fi/api/v1/games/')
    commit('setAllGames', allGames)
  },
  async getPollGames({ commit }) {
    const pollGames = await this.$http.$get(
      'https://liiga.fi/api/v1/games/poll'
    )

    commit(
      'setPollGames',
      pollGames.games.sort((a, b) => a.id - b.id)
    )
    commit('setActiveGames', pollGames.length)
  },
}

const mutations = {
  setAllGames(state, value) {
    state.allGames = value
  },
  setPollGames(state, value) {
    state.pollGames = value
  },
  setActiveGames(state, value) {
    const old = state.setActiveGames
    if (value !== old) {
      this.getAllGames()
      state.setActiveGames = value
    }
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
