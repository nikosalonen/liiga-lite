<template>
  <div>
    <div class="grid grid-cols-8 gap-2 h-full min-h-screen">
      <div class="flex text-white">
        <!-- <span class="flex flex-col justify-center text-center w-full px-5"> -->
        <span class="flex flex-col justify-center text-center w-full px-5">
          <a href="#" @click="setPreviousDateParam">◀</a>
        </span>
      </div>
      <div class="mx-auto h-full flex flex-col items-center py-8 col-span-6">
        <Counter />

        <div v-if="isLoggedIn">
          <div
            class="
              headerWrapper
              flex flex-row
              justify-around
              text-white
              align-baseline
            "
          >
            <h1
              v-if="!settings.showAllDates"
              class="text-white md:text-5xl sm:text-xl text-center"
            >
              Päivän pelit {{ today.setLocale('fi').toFormat('ccc dd.LL.') }}
            </h1>
            <h1 v-else class="text-white md:text-5xl sm:text-xl text-center">
              Kaikki kauden pelit
            </h1>
          </div>

          <div
            v-if="pollGames.length"
            class="gamesWrapper flex flex-col justify-center"
          >
            <div v-for="game in pollGames" :key="game.id">
              <Game :game="game" :show-all-dates="settings.showAllDates" />
            </div>
          </div>
          <div
            v-if="games.length"
            class="gamesWrapper flex flex-col justify-center"
          >
            <div v-for="game in games" :key="game.id">
              <Game :game="game" :show-all-dates="settings.showAllDates" />
            </div>
          </div>
          <div
            v-else
            class="
              gamesWrapper
              flex flex-col
              justify-center
              text-white text-2xl text-center
              min-h-screen
            "
          >
            Ei pelejä tänään.
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
      <div class="flex text-white">
        <span class="flex flex-col justify-center text-center w-full px-5">
          <a href="#" @click="setNextDateParam">▶</a>
        </span>
      </div>
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
      nextGames: '',
    }
  },
  head() {
    return {
      title: 'Päivän pelit',
    }
  },

  computed: {
    today() {
      if (this.settings.showDate) {
        this.$route.query.date && this.$router.replace('/')
        return DateTime.fromISO(this.settings.showDate)
      }
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
            (this.settings.showDate &&
              this.settings.showDate ===
                DateTime.fromISO(obj.start).toFormat('yyyy-LL-dd')) ||
            (!this.settings.showDate &&
              this.today.toFormat('yyyy-LL-dd') ===
                DateTime.fromISO(obj.start).toFormat('yyyy-LL-dd'))
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
          if (
            // Show games from the future
            this.settings.showDate.length &&
            this.settings.showDate >=
              DateTime.fromISO(game.start).toFormat('yyyy-LL-dd')
          ) {
            return true
          } else if (
            // Show games in the past
            this.settings.showDate.length &&
            this.settings.showDate <
              DateTime.fromISO(game.start).toFormat('yyyy-LL-dd')
          ) {
            return true
          } else if (game.ended) {
            return true
          }
          // Show games today only if they are not started
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
    ...mapGetters('games', [
      'allGames',
      'pollGames',
      // 'nextGames',
      // 'previousGames',
    ]),
  },
  created() {
    this.getAllGames()
    this.getPollGames()
    this.timer = setInterval(this.getPollGames, 10000)
    this.refresher = setInterval(this.refresh, 5000)
  },
  beforeDestroy() {
    this.destroyTimer()
  },
  methods: {
    setPreviousDateParam() {
      const today = this.today.toFormat('yyyy-LL-dd')
      const games = this.allGames

      const previous = games.filter((g) => {
        const gameDate = DateTime.fromISO(g.start).toFormat('yyyy-LL-dd')

        return gameDate < today
      })
      if (previous.length) {
        this.$router.push({
          path: this.$route.path,
          query: {
            date: DateTime.fromISO(previous.at(-1).start).toFormat(
              'yyyy-LL-dd'
            ),
          },
        })
      } else {
        alert('Ei aikaisempia pelejä!')
      }
    },
    setNextDateParam() {
      const today = this.today.toFormat('yyyy-LL-dd')
      const games = this.allGames

      const next = games.find((g) => {
        const gameDate = DateTime.fromISO(g.start).toFormat('yyyy-LL-dd')

        return gameDate > today
      })
      if (next) {
        this.$router.push({
          path: this.$route.path,
          query: { date: DateTime.fromISO(next.start).toFormat('yyyy-LL-dd') },
        })
      }
    },
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
