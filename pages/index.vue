<template>
  <div class="app">
    <h1 class="title">
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

<style>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
ul li {
  list-style: none;
}
a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  color: #aaa;
  text-decoration: underline;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 55px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 25px 0;
}

.subtitle {
  font-weight: 300;
  font-size: 1.1rem;
  color: #526488;
  word-spacing: 2px;
  padding-bottom: 15px;
  max-width: 600px;
}

.subtitle a {
  font-weight: 500;
  color: inherit;
}

.links {
  padding-top: 15px;
  margin-bottom: 20px;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}

.plus {
  font-size: 2.5rem;
  margin: 15px;
  color: #35495e;
}

.h3 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  margin: 10px;
}
</style>
