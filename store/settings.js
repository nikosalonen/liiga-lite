const state = () => ({
  showSettings: false,
  showAllDates: false,
  showDate: '',
  showTeam: 0,
})

const mutations = {
  toggle(state) {
    state.showSettings = !state.showSettings
  },
  updateShowAllDates(state, value) {
    state.showAllDates = value
  },
  updateShowTeam(state, value) {
    state.showTeam = value
  },
  updateShowDate(state, value) {
    state.showDate = value
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
