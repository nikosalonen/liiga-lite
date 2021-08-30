const state = () => ({
  showSettings: false,
  showAllDates: false,
  showDate: false,
  showTeam: 0,
})

const mutations = {
  toggle(state) {
    state.showSettings = !state.showSettings
  },
  updateshowAllDates(state, value) {
    state.showAllDates = value
  },
  resetSettings(state) {
    state = {
      ...state,
      showAllDates: false,
      showDate: false,
      showTeam: 0,
    }
  },
}

export default {
  state,
  mutations,
}
