<template>
  <NuxtLink :to="`${game.season}/${game.id}`">
    <img
      class="teamLogo"
      :src="require(`~/assets/img/${game.homeTeam.teamId.split(':')[1]}.png`)"
    />
    -
    <img
      class="teamLogo"
      :src="require(`~/assets/img/${game.awayTeam.teamId.split(':')[1]}.png`)"
    />
  </NuxtLink>
</template>
<script>
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.teamLogo {
  max-width: 50px;
}
</style>
