<template>
  <div class="center examplex">
    <vs-navbar
      v-model="active"
      color="#1e2023"
      text-white
      square
      center-collapsed
      fixed="true"
      shadow="true"
    >
      <vs-navbar-item id="etusivu" :active="active == 'etusivu'">
        Etusivu
      </vs-navbar-item>
      <vs-navbar-item id="settings" :active="active == 'settings'">
        Asetukset
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 'etusivu',
  }),
}
</script>
