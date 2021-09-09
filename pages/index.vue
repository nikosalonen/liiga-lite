<template>
  <div>
    <div class="mx-auto h-full flex flex-col items-center py-8">
      <Counter />
      <div v-if="isLoggedIn">
        <h1 v-if="!settings.showAllDates" class="text-white text-5xl">
          Liigan pelit {{ today.setLocale('fi').toFormat('ccc dd.LL.') }}
        </h1>
        <h1 v-else class="text-white text-5xl">Kaikki kauden pelit</h1>
        <div
          v-if="pollGames.length"
          class="gamesWrapper flex flex-col justify-center"
        >
          <div v-for="game in pollGames" :key="game.id">
            <Game :game="game" :show-all-dates="settings.showAllDates" />
          </div>
        </div>
        <div
          v-else-if="games.length"
          class="gamesWrapper flex flex-col justify-center"
        >
          <div v-for="game in games" :key="game.id">
            <Game :game="game" :show-all-dates="settings.showAllDates" />
          </div>
          <div class="flex justify-center">
            <button
              class="
                mt-16
                justify-center
                rounded-3xl
                p-2
                border-2
                text-1xl text-white
                hover:bg-white hover:text-gray-800
                w-1/2
              "
              @click="refresh"
            >
              Päivitä
            </button>
          </div>
        </div>
        <!-- <div v-if="nextGameDate">
          <div class="text-white text-2xl pt-16 flex justify-center">
            Ei pelejä tänään. Seuraavat pelit &nbsp;
            <a
              class="underline"
              :href="`?date=${nextGameDate.toFormat('yyyy-LL-dd')}`"
              >{{ nextGameDate.setLocale('fi').toFormat('ccc dd.LL.') }}</a
            >
          </div>
        </div> -->
      </div>

      <div v-else class="mt-4">
        <a
          class="
            rounded-3xl
            p-4
            border-2
            text-3xl
            hover:bg-white hover:text-gray-800
          "
          href="#"
          @click="triggerNetlifyIdentityAction('login')"
        >
          Login
        </a>
      </div>
    </div>
    <div
      v-if="settings.showSettings"
      class="
        fixed
        text-white
        flex
        items-center
        justify-center
        overflow-auto
        z-50
        bg-black bg-opacity-40
        left-0
        right-0
        top-0
        bottom-0
      "
    >
      <Settings />
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
      timer: null,
      showSettings: false,
      showTeam: 0,
    }
  },

  computed: {
    today() {
      if (this.$route.query.date) {
        return DateTime.fromISO(this.$route.query.date)
      }
      return DateTime.now()
    },

    games() {
      return this.allGames
        .filter((obj) => {
          return (
            this.settings.showAllDates ||
            this.today.toFormat('yyyy-LL-dd') ===
              DateTime.fromISO(obj.start).toFormat('yyyy-LL-dd')
          )
        })
        .filter((game) => {
          if (this.settings.showTeam !== 0) {
            return (
              game.homeTeam.teamId.endsWith(this.settings.showTeam) ||
              game.awayTeam.teamId.endsWith(this.settings.showTeam)
            )
          }
          return true
        })
        .filter((game) => {
          return game.started === false
        })
        .sort((a, b) => a.start - b.start)
    },
    settings() {
      return this.$store.state.settings
    },

    ...mapGetters('user', {
      isLoggedIn: 'getUserStatus',
      user: 'getUser',
    }),
    ...mapGetters('games', ['allGames', 'pollGames']),
  },
  created() {
    this.getAllGames()
    this.getPollGames()
    this.timer = setInterval(this.getPollGames, 15000)
    this.refresher = setInterval(this.refresh, 10000)
  },
  beforeDestroy() {
    this.destroyTimer()
  },
  methods: {
    destroyTimer() {
      clearInterval(this.timer)
      clearInterval(this.refresher)
    },
    refresh() {
      this.$nuxt.refresh()
    },
    ...mapActions('user', ['updateUser']),
    ...mapActions('games', ['getAllGames', 'getPollGames']),
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
