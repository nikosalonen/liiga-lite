<template>
  <div class="mx-auto flex flex-col items-center py-8">
    <div v-if="isLoggedIn">
      <h1 class="text-white text-5xl">
        Liiga tänään {{ new Date(today).toLocaleDateString('fi-FI') }}
      </h1>
      <div class="gamesWrapper flex flex-col">
        <div v-for="game in games" :key="game.id">
          <Game :game="game" />
        </div>
      </div>
    </div>
    <div v-else>
      <a
        class="btn text-3xl text-white"
        href="#"
        @click="triggerNetlifyIdentityAction('login')"
      >
        Login
      </a>
    </div>
  </div>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'
netlifyIdentity.init({
  APIUrl: 'https://liiga-lite.netlify.app/.netlify/identity',
  logo: false, // you can try false and see what happens
})

export default {
  data() {
    return {
      isLoggedIn: false,
      games: [],
      today: '2021-09-10',
    }
  },
  async fetch() {
    const liigaGames = await fetch('https://www.liiga.fi/api/v1/games/').then(
      (g) => g.json()
    )

    this.games = liigaGames
      .filter((obj) => this.today === obj.start.split('T')[0])
      .sort((a, b) => a.id - b.id)
  },
  methods: {
    triggerNetlifyIdentityAction(action) {
      if (action === 'login' || action === 'signup') {
        netlifyIdentity.open(action)
        netlifyIdentity.on(action, (user) => {
          this.currentUser = {
            username: user.user_metadata.full_name,
            email: user.email,
            access_token: user.token.access_token,
            expires_at: user.token.expires_at,
            refresh_token: user.token.refresh_token,
            token_type: user.token.token_type,
          }
          this.updateUser({
            currentUser: this.currentUser,
          })
          netlifyIdentity.close()
        })
      } else if (action === 'logout') {
        this.currentUser = null
        this.updateUser({
          currentUser: this.currentUser,
        })
        netlifyIdentity.logout()
        this.$router.push({ name: 'Home' })
      }
    },
  },
}
</script>

<style></style>
