<template>
<v-container>
  <template>
    <div id="map"></div>
  </template>
  <h1 style="margin: 10px"> Covid Tracker </h1>
  <p> To search the information of a country please write the name and press enter </p>
  <p> To see more information of a country, click on the country </p>
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
      item-key="country"
      v-if= "data"
      style="margin-bottom:20px"
      v-model="selectedRow"
    >
      <template v-slot:item="{ item }">
          <tr :class="selectedRow.indexOf(item.country)" @click="rowClicked(item)">
            <td>{{item.name}}</td>
            <td>{{item.latest_data.confirmed}}</td>
            <td>{{item.latest_data.deaths}}</td>
          </tr>
      </template>
    </v-data-table>
  </v-card>
  <v-data-table
  item-key="name"
    class="elevation-1"
    loading
    loading-text="Loading... Please wait"
    v-if="!data"
    >
  </v-data-table>
</v-container>
</template>


<script>
import mapboxgl from 'mapbox-gl';
import UnitedStates from '../components/unitedStates.geojson'

export default {

  name: 'Covid',
  mounted() {
      let hoveredStateId = null;
      mapboxgl.accessToken = "pk.eyJ1IjoianVhbmRpYXpuMTIiLCJhIjoiY2t0eDJmeTRvMnBuaDJucDlqc3p0djU5bSJ9.jLvuW19MDDFc8lEnbs1xew";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [-100.486052, 37.830348],
      zoom: 3.5,
    });
    map.on('load', () => {
    map.addSource('states', {
    'type': 'geojson',
    'data': UnitedStates
    });
    
    // The feature-state dependent fill-opacity expression will render the hover effect
    // when a feature's hover state is set to true.
    map.addLayer({
    'id': 'state-fills',
    'type': 'fill',
    'source': 'states',
    'layout': {},
    'paint': {
    "fill-color": '#FF5252',
          "fill-opacity": [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.75
          ],
          // 0.75,
          "fill-outline-color": '#FAFAFA',
    }
    });
    
  })
  map.on('mousemove', 'state-fills', (e) => {
if (e.features.length > 0) {
    console.log(e.features[0].id)
if (hoveredStateId !== null) {
map.setFeatureState(
{ source: 'states', id: hoveredStateId },
{ hover: false }
);
}
hoveredStateId = e.features[0].id;
map.setFeatureState(
{ source: 'states', id: hoveredStateId },
{ hover: true }
);
}
});
 
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'state-fills', () => {
if (hoveredStateId !== null) {
map.setFeatureState(
{ source: 'states', id: hoveredStateId },
{ hover: false }
);
}
hoveredStateId = null;
});
const popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false,
offset: [0, 15]
});
map.on('mousemove', 'state-fills', (e) => {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
// Copy coordinates array.
const description = e.features[0].properties.NAME;
console.log(description)
popup.setLngLat(e.lngLat).setHTML('<div id="popper"><h1>'+description+'</h1><br><h3>Confirmados: '+e.features[0].properties.Confirmed+'</h3><br><h3>Decesos: '+e.features[0].properties.Death+'</h3></div>').addTo(map);
popup.update();
});
map.on('mouseleave', 'state-fills', () => {
map.getCanvas().style.cursor = '';
popup.update();
popup.remove();
});
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
            state = countries[i]
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
            state = countries[i]
            states.push(state)
          }
        })
      let country = states.find(el => el.name === search);
      console.log(country)
      if (country != null) {
        this.estados = [country]
        let cntry = {
          name: country.name,
          pos: country.latest_data.confirmed,
          death: country.latest_data.deaths
        }
        this.data = true
         await this.axios
        .post("https://git.heroku.com/backsemanatec.git/covidlogs/add_log/", cntry)
        console.log("Log saved")
      } else {
        this.estados = states
        this.data = true
      }
    },
    rowClicked(row) {
      console.log(row);
      this.$router.push({name: 'Country', params: {code: row.code, country: row }});
    }
  },

  data: () => ({
    search: "",
    selectedRow: [],
    headers: [{
            text: 'Country',
            align: 'start',
            filterable: true,
            value: 'country',
          },
          { text: 'Confirmed', value: 'pos' },
          { text: 'Deaths', value: 'death' }],
    estados: [
      {
        country: "Mexico",
        code: "MX",
        pos: 1999,
        death: 2000
      }
    ],
    data: true,
  })
}
</script>
<style>
#map {
  height: 600px;
  width: 100%;
  margin-top: 0px ;
}
.mapboxgl-popup{
    padding-bottom: 15px;
    color:#fafafa;
    max-width: 400px;
    text-align: center;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
.mapboxgl-popup-content {
  background-color: #393E46;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    border-bottom-color: #393E46;;
    }
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
    border-top-color: #393E46;;
    }
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: #393E46;;
    }
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: #393E46;;
    }
.text-container {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  margin: 0 auto; /* center text container */
}
</style>