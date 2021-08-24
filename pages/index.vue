<template>
  <div class="mx-auto flex flex-col items-center py-8">
    <div v-if="isLoggedIn">
      <h1 class="text-white text-5xl">
        Liigan pelit {{ today.toFormat('dd.LL.yyyy') }}
      </h1>
      <div
        v-if="games.length"
        class="gamesWrapper flex flex-col justify-center"
      >
        <div v-for="game in games" :key="game.id">
          <Game :game="game" />
        </div>
      </div>
      <div v-if="nextGame">
        <div class="text-white text-3xl pt-32 flex justify-center">
          Seuraavat pelit &nbsp;
          <a
            class="hover:underline"
            :href="`?date=${nextGame.toFormat('yyyy-LL-dd')}`"
            >{{ nextGame.toFormat('dd.LL.yyyy') }}</a
          >
        </div>
      </div>
    </div>

    <div v-else class="mt-4">
      <a
        class="
          rounded-3xl
          p-4
          border-2
          text-3xl text-white
          hover:bg-white hover:text-gray-800
        "
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
import { mapGetters, mapActions } from 'vuex'
import { DateTime } from 'luxon'
netlifyIdentity.init({
  APIUrl: 'https://liiga-lite.netlify.app/.netlify/identity',
  logo: false, // you can try false and see what happens
})
export default {
  data() {
    return {
      currentUser: null,
      games: [],
      today: DateTime.now(),
      nextGame: false,
    }
  },

  async fetch() {
    const liigaGames = await fetch('https://www.liiga.fi/api/v1/games/').then(
      (g) => g.json()
    )
    this.games = liigaGames
      .filter((obj) => {
        return (
          this.today.toFormat('yyyy-LL-dd') ===
          DateTime.fromISO(obj.start).toFormat('yyyy-LL-dd')
        )
      })
      .sort((a, b) => a.id - b.id)

    if (!this.games.length) {
      this.nextGame = DateTime.fromISO(
        liigaGames.filter((obj) => DateTime.fromISO(obj.start) > this.today)[0]
          .start
      )
    }
  },
  computed: {
    ...mapGetters('user', {
      isLoggedIn: 'getUserStatus',
      user: 'getUser',
    }),
  },
  mounted() {
    if (this.$route.query.date) {
      this.today = DateTime.fromISO(this.$route.query.date)
    }
  },
  methods: {
    ...mapActions('user', {
      updateUser: 'updateUser',
    }),
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
