<template>
  <div v-if="!finished" class="text-white text-3xl pb-16">
    Kauden alkuun {{ display }}
  </div>
</template>
<script>
import { DateTime, Duration } from 'luxon'

export default {
  data() {
    return {
      now: DateTime.local().set({ milliseconds: 0 }),
      end: DateTime.fromISO('2021-09-09T15:30:00').set({ milliseconds: 0 }),
    }
  },
  computed: {
    remaining() {
      return this.end.diff(this.now).toObject()
    },
    display() {
      return Duration.fromObject(this.remaining).toFormat(
        "d 'päivää' hh 'tuntia' mm 'minuttia' ss 'sekuntia'"
      )
    },
    finished() {
      return this.now >= this.end
    },
  },
  watch: {
    now() {
      if (this.finished) {
        clearInterval(this.tick)
      }
    },
  },
  mounted() {
    this.tick = setInterval(() => {
      this.now = DateTime.local().set({ milliseconds: 0 })
    }, 1000)
  },
}
</script>
