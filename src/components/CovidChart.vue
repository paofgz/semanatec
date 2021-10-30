<template>
  <v-container>
    <p>This are the countries people have searched for</p>
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="loading"
    ></v-progress-circular>
    <apexchart
      v-if="!loading"
      width="75%"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      this.loading = true;
      let conts = [];
      let num = [];
      await this.axios
        .get(`https://git.heroku.com/backsemanatec.git/covidlogs/list/searches`)
        .then((response) => {
          console.log(response.data);
          const countries = response.data;
          for (let country of countries) {
            conts.push(country._id);
            num.push(country.total);
          }
        });
      this.loading = false;
      this.series = [
        {
          data: num,
        },
      ];
      this.options = {
        xaxis: {
          categories: conts,
        },
      };
    },
  },
  data: () => ({
    loading: false,
    options: {
      chart: {
        id: "vuechart-covid",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series",
        data: [],
      },
    ],
  }),
};
</script>