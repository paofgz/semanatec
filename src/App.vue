<template>
  <v-app
  :style= "{background: $vuetify.theme.themes.dark.background}"
  >
    <v-app-bar
      app
      color="primaryComponents"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logoC.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logoCText.png"
          width="250"
        />
      </div>
      

      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn
          elevation="2"
          color="secondary"
          style="margin-left: 10px; margin-right: 10px"
          href="#/covid"
        >US Map & WorldWideTable</v-btn>
        <v-btn
          elevation="2"
          color="secondary"
          style="margin-left: 10px; margin-right: 10px"
          href="#/covid/search"
        >Graph</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    hover1: false,
    hover2: false,
    hover3: false,
  }),
};
</script>

<style>
    .btn1-hover {
      color: primary;
    }
</style>
