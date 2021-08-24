<template>
  <div class="text-white">
    <div v-if="game.id" class="container">
      <h1 class="title">
        {{ game.homeTeam.teamId }} -
        {{ game.awayTeam.teamId }}
      </h1>

      <button @click="refresh">Refresh</button>
      <p>
        <NuxtLink to="/">Takaisin etusivulle</NuxtLink>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params }) {
    const game = await fetch(
      `https://www.liiga.fi/api/v1/games/${params.season}/${params.game}`
    ).then((g) => g.json())
    return game
  },
  data() {
    return {
      id: null,
    }
  },

  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>
