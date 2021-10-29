<template>
<v-container>
  <h1 style="margin: 10px"> Covid Tracker </h1>
  <p> To search the information of a country please write the name and press enter </p>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        single-line
        hide-details
        v-on:keyup.enter="cargarDatosPais(search)"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="estados"
      v-if= "data"
    ></v-data-table>
  </v-card>
  <v-data-table
  item-key="name"
    class="elevation-1"
    loading
    loading-text="Loading... Please wait"
    v-if="!data"
    >
  </v-data-table>
  <v-btn
  elevation="2"
  large
  outlined
  style="margin:10px"
  @click="viewGraph()"
  >View search graph</v-btn>
</v-container>
</template>


<script>


export default {

  name: 'Covid',
  mounted() {
    this.cargarDatos()
  },
  methods:{
    async cargarDatos(){
      let states = []
      this.data = false
        await this.axios.get('https://corona-api.com/countries').then((response) => {
          console.log(response.data.data)
          const countries = response.data.data
          for (let i = 0; i < countries.length; i++){
            let state = {}
            state.country = countries[i].name
            state.pos = countries[i].latest_data.confirmed
            state.death = countries[i].latest_data.deaths
            states.push(state)
          }
        })
      console.log(states)
      this.estados = states
      this.data = true
    },
    async cargarDatosPais(search){
      console.log(search)
      let states = []
      this.data = false
        await this.axios.get('https://corona-api.com/countries').then((response) => {
          console.log(response.data.data)
          const countries = response.data.data
          for (let i = 0; i < countries.length; i++){
            let state = {}
            state.country = countries[i].name
            state.pos = countries[i].latest_data.confirmed
            state.death = countries[i].latest_data.deaths
            states.push(state)
          }
        })
      let country = states.find(el => el.country === search);
      console.log(country)
      if (country != null) {
        this.estados = [country]
         await this.axios
        .post("http://127.0.0.1:5000/covidlogs/add_log", country)
        console.log("Log saved")
      } else {
        this.estados = states
      }
      this.data = true
    },
    viewGraph(){
        this.$router.push('/covid/search');
    },
  },

  data: () => ({
    search: "",
    headers: [{
            text: 'Pais',
            align: 'start',
            filterable: true,
            value: 'country',
          },
          { text: 'Positivos', value: 'pos' },
          { text: 'Muertes', value: 'death' }],
    estados: [
      {
        country: "Mexico",
        pos: 1999,
        death: 2000
      }
    ],
    data: true,
  })
}
</script>