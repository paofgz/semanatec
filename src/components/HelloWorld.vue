<template>
  <v-container>
    <h2>Hola {{usuario.nombre}} {{usuario.apellido}}, presionaste {{contador}} veces el botón</h2>
    <v-card style="padding:40px;">
    <v-text-field
      id="nombre"
      v-model="usuario.nombre"
      label="Dime tu nombre"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
    id="apellido"
      v-model="usuario.apellido"
      label="Dime tu apellido"
      hide-details="auto"
    ></v-text-field>    
    <div style="margin-top:20px;">Contador {{contador}}</div>
    <v-btn id="botonAgregar"  style="margin-top:20px;" elevation="2" @click="agregarAlContador" dark color="purple">Aumentar contador</v-btn>      
    </v-card>
    <h2 v-if="cargandoPokemones">Cargando pokemones...</h2>
    <v-row v-if="!cargandoPokemones" style="margin-top:30px;">
      <v-col @click="irADetalleDePokemon(pokemon.name)" cols="3" v-for="pokemon in pokemones" v-bind:key="pokemon.name">
        <v-card style="padding:20px">
          <h3>{{pokemon.name}}</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    mounted(){
      this.axios.get('https://pokeapi.co/api/v2/pokemon').then((response)=>{
        console.log(response);
        this.pokemones=response.data.results;
        this.cargandoPokemones=false;
      })
    },
    methods:{
      irADetalleDePokemon(pokemon){
        this.$router.push('/pokemon/'+pokemon);
      },
      agregarAlContador(){
        this.contador=this.contador+1;
      }
    },
    data: () => ({
      pokemones:[],
      cargandoPokemones:true,
      contador:0,
      usuario:{
        nombre:"",
        apellido:""
      }
    }),
  }
</script>