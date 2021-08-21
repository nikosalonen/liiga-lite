<template>
  <div class="container">
    <h1 class="title">
      {{ liigaGame.game.homeTeam.teamId }} -
      {{ liigaGame.game.awayTeam.teamId }}
    </h1>
    <vs-button @click="refresh">Refresh</vs-button>
    <p>
      <NuxtLink to="/">Takaisin etusivulle</NuxtLink>
    </p>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, $config, params, redirect }) {
    const liigaGame = await $axios.$get(`games/${params.season}/${params.game}`)
    if (liigaGame) {
      return { liigaGame }
    } else {
      redirect('/')
    }
  },
  methods: {
    refresh() {
      this.$nuxt.refresh()
    },
  },
}
</script>
