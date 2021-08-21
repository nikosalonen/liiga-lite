<template>
  <NuxtLink :to="`${game.season}/${game.id}`">
    {{ game.homeTeam.teamId.split(':')[1] }} -
    {{ game.awayTeam.teamId.split(':')[1] }}
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
