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
        class="border-2 border-gray-800 rounded-xl p-1"
        type="date"
      />
    </label>
    <label class="flex pb-6 justify-between" for="showAllDates">
      Näytä kaikki pelit
      <input
        id="showAllDates"
        class="rounded-xl p-1"
        type="checkbox"
        :value="showAllDates"
        @change="updateCheckbox(!showAllDates)"
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
        <option value="1">HIFK</option>
        <option value="2">HPK</option>
        <option value="3">Ilves</option>
        <option value="4">Jukurit</option>
        <option value="5">JYP</option>
        <option value="6">Kalpa</option>
        <option value="7">Kärpät</option>
        <option value="8">KooKoo</option>
        <option value="9">Lukko</option>
        <option value="10">Pelicans</option>
        <option value="11">SaiPa</option>
        <option value="12">Sport</option>
        <option value="13">Tappara</option>
        <option value="14">TPS</option>
        <option value="15">Ässät</option>
      </select>
    </label>
    <a class="flex justify-center border-2 rounded-3xl" href="#" @click="toggle"
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
        this.$store.commit('updateSettings', value)
      },
    },
  },
  methods: {
    ...mapMutations({
      toggle: 'settings/toggle',
      reset: 'settings/reset',
      updateCheckbox: 'settings/updateCheckbox',
    }),
  },
}
</script>
