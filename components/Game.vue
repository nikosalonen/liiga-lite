<template>
  <div class="pt-8 text-white flex flex-row justify-center">
    <NuxtLink :to="`${gameData.season}/${gameData.id}`">
      <div
        class="
          flex flex-row
          pb-2
          text-gray-500 text-xs
          justify-center
          align-center
          items-center
          place-content-center
        "
      >
        <span v-if="gameData.stared === false">
          <span v-if="showAll">{{ startDate }}</span>
          {{ startTime }}
        </span>
        <span v-if="gameData.started" class="text-white">
          {{ gameTime }}
        </span>
        <span v-if="gameData.ended"> Peli päättynyt </span>
      </div>
      <div
        class="
          flex
          logoRow
          justify-center
          align-center
          items-center
          place-content-center
        "
      >
        <img
          class="teamLogo"
          :src="
            require(`~/assets/img/${
              gameData.homeTeam.teamId.split(':')[1]
            }.png`)
          "
        />
        <div
          v-if="game.stared === false"
          class="score text-gray-700 text-xl px-4"
        >
          0 - 0
        </div>
        <div v-else class="score text-white text-xl px-4">
          {{ gameData.homeTeam.goals }} - {{ gameData.awayTeam.goals }}
        </div>
        <img
          class="teamLogo"
          :src="
            require(`~/assets/img/${
              gameData.awayTeam.teamId.split(':')[1]
            }.png`)
          "
        />
      </div>
    </NuxtLink>
  </div>
</template>
<script>
import { DateTime, Duration } from 'luxon'
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
    showAllDates: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      gameData: this.game,
      showAll: this.showAllDates,
      startTime: DateTime.fromISO(this.game.start).toFormat("'klo' HH:mm"),
      startDate: DateTime.fromISO(this.game.start).toFormat(' dd.LL.'),
    }
  },
  computed: {
    gameTime() {
      const gt = Duration.fromObject({ seconds: this.game.gameTime })
        .shiftTo('minutes', 'seconds')
        .toObject()
      return gt.minutes + ':' + (gt.seconds < 10 ? '0' : '') + gt.seconds
    },
  },
}
</script>
<style scoped>
.teamLogo {
  max-width: 50px;
}
</style>
