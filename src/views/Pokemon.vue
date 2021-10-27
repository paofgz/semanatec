<template>
    <v-container>
        <h2 v-if="cargandoPokemon">Cargando inforamción del pokemon</h2>
        <div v-if="!cargandoPokemon">
        <v-avatar>
        <img :src="pokemon.sprites.front_default">
        </v-avatar>
        <h2>{{$route.params.pokemon}} #{{pokemon.id}}</h2>
        <h2>Habilidades: </h2>
        <v-row>
            <v-col cols="3" v-for="habilidad in pokemon.abilities" v-bind:key="habilidad">
                <v-card style="padding:20px;">
                    <p>{{habilidad.ability.name}}</p>
                </v-card>
            </v-col>
        </v-row>
        <h2>Movimientos: </h2>
        <v-row>
            <v-col cols="3" v-for="movimiento in pokemon.moves" v-bind:key="movimiento">
                <v-card style="padding:20px;">
                    <p>{{movimiento.move.name}}</p>
                </v-card>
            </v-col>
        </v-row>        
        </div>
        
    </v-container>
</template>
<script>
  export default {
    name: 'Pokemon',
    mounted(){
      this.axios.get('https://pokeapi.co/api/v2/pokemon/'+this.$route.params.pokemon).then((response)=>{
        console.log(response);
        this.pokemon=response.data;
        this.cargandoPokemon=false;
      })
    },
    methods:{
    },
    data: () => ({
        pokemon:{},
        cargandoPokemon:true,
    }),
  }
</script>