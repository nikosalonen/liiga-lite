<template>
  <div class="pt-8 text-white flex flex-row justify-center">
    <span>
      <div
        class="
          flex flex-row
          pb-2
          text-gray-500 text-xs
          justify-center
          align-center
          items-center
          place-content-center
          text-center
        "
      >
        <span v-if="!started">
          <span v-if="showAll">{{ startDate }}</span>
          {{ startTime }}
        </span>
        <span v-else-if="started && !ended" class="text-white">
          {{ gameTime }}
        </span>
        <span v-else class="text-gray-500">
          Päättynyt <span v-if="ot">(JA)</span><span v-else-if="ws">(VL)</span
          ><br />{{ gameTime }}
        </span>
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
        <div v-if="!started" class="score text-gray-700 text-xl px-4">
          0 - 0
        </div>
        <div v-else class="score text-white text-xl px-4">
          <span v-if="started && !ended" class="text-white">
            {{ homeGoals }} - {{ awayGoals }} </span
          ><span v-else-if="ended" class="text-gray-500">
            {{ homeGoals }} - {{ awayGoals }}
          </span>
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
    </span>
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
    ot() {
      return (
        this.game.ended &&
        this.game.finishedType === 'ENDED_DURING_EXTENDED_GAME_TIME'
      )
    },
    ws() {
      return (
        this.game.ended &&
        this.game.finishedType === 'ENDED_DURING_WINNING_SHOT_COMPETITION'
      )
    },
    gameTime() {
      const gt = Duration.fromObject({ seconds: this.game.gameTime })
        .shiftTo('minutes', 'seconds')
        .toObject()
      return (
        (gt.minutes < 10 ? '0' : '') +
        gt.minutes +
        ':' +
        (gt.seconds < 10 ? '0' : '') +
        gt.seconds
      )
    },
    homeGoals() {
      return this.game.homeTeam.goals
    },
    awayGoals() {
      return this.game.awayTeam.goals
    },
    started() {
      return this.game.started
    },
    ended() {
      return this.game.ended
    },
  },
}
</script>
<style scoped>
.teamLogo {
  max-width: 50px;
}
</style>
