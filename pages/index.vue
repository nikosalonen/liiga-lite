<template>
  <div class="">
    <h1 class="">
      Liiga tänään {{ new Date(today).toLocaleDateString('fi-FI') }}
    </h1>
    <div v-for="game in games" :key="game.id">
      <Game :game="game" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    const liigaGames = await $axios.$get(`games/`)
    // const today = Date.now().toLocaleDateString('fi-FI')

    const today = '2021-09-09'

    const games = liigaGames.filter((obj) => today === obj.start.split('T')[0])

    return { games, today }
  },
}
</script>

<style></style>
