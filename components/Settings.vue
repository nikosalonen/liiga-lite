<template>
  <div
    class="
      bg-white
      rounded-xl
      shadow-2xl
      p-6
      sm:w-9/12
      mx-10
      text-gray-800
      flex-col
    "
  >
    <label class="flex pb-6 justify-between" for="showDate">
      Näytä valitun päivän pelit
      <input
        id="showDate"
        v-model="showDate"
        class="border-2 border-gray-800 rounded-xl p-1"
        type="date"
      />
    </label>
    <label class="flex pb-6 justify-between" for="showAllDates">
      Näytä kaikki pelit
      <input
        id="showAllDates"
        class="rounded-xl p-1 border-2 border-gray-800 form-checkbox"
        type="checkbox"
        :value="showAllDates"
        @change="updateShowAllDates(!showAllDates)"
      />
    </label>
    <label class="flex pb-6 justify-between" for="showTeam">
      Näytä vain valitun joukkueen pelit
      <select
        id="showTeam"
        v-model="showTeam"
        name="showTeam"
        class="border-2 border-gray-800 rounded-xl p-1"
      >
        <option value="0">Kaikki</option>
        <option value="hifk">HIFK</option>
        <option value="hpk">HPK</option>
        <option value="ilves">Ilves</option>
        <option value="jukurit">Jukurit</option>
        <option value="jyp">JYP</option>
        <option value="kalpa">Kalpa</option>
        <option value="kärpät">Kärpät</option>
        <option value="kookoo">KooKoo</option>
        <option value="lukko">Lukko</option>
        <option value="pelicans">Pelicans</option>
        <option value="saipa">SaiPa</option>
        <option value="sport">Sport</option>
        <option value="tappara">Tappara</option>
        <option value="tps">TPS</option>
        <option value="ässät">Ässät</option>
      </select>
    </label>
    <a
      class="flex justify-center border-2 rounded-3xl p-1 border-gray-800"
      href="#"
      @click="toggle"
      >Sulje</a
    >
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    settings() {
      return this.$store.state.settings
    },
    showAllDates() {
      return this.$store.state.settings.showAllDates
    },
    showTeam: {
      get() {
        return this.$store.state.settings.showTeam
      },
      set(value) {
        this.$store.commit('settings/updateShowTeam', value)
      },
    },
    showDate: {
      get() {
        return this.$store.state.settings.showDate
      },
      set(value) {
        this.$store.commit('settings/updateShowDate', value)
      },
    },
  },

  methods: {
    ...mapMutations({
      toggle: 'settings/toggle',
      reset: 'settings/reset',
      updateShowAllDates: 'settings/updateShowAllDates',
    }),
  },
}
</script>
