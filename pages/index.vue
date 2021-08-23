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
  data() {
    return {
      games: [],
      today: '2021-09-09',
    }
  },
  async fetch() {
    const liigaGames = await fetch('https://www.liiga.fi/api/v1/games/').then(
      (g) => g.json()
    )
    this.games = liigaGames.filter(
      (obj) => this.today === obj.start.split('T')[0]
    )
  },
}
</script>

<style></style>
