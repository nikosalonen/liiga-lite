export const state = () => {
  return { user: window.localStorage.getItem('gotrue.user') }
}

export const getters = {
  getUserStatus: (state) => !!state.user,
  getUser: (state) => JSON.parse(state.user),
}

// Mutations Must Be Synchronous
export const mutations = {
  setUser: (state, currentUser) => {
    if (!currentUser) {
      state.user = null
      window.localStorage.removeItem('gotrue.user')
      return
    }
    const theUser = JSON.stringify(currentUser)
    state.user = theUser
    window.localStorage.setItem('gotrue.user', theUser)
  },
}

export const actions = {
  updateUser: ({ commit }, payload) => {
    commit('setUser', payload.currentUser)
  },
}
