<template>
    <v-container>
        <div>
        <h1>{{$route.params.country.name}}</h1>
        <h3>Last updated on {{$route.params.country.updated_at}}</h3>
        <h3 style="margin-top: 20px"> Population: {{$route.params.country.population}} </h3>
        </div >
        <div class="d-flex" cols="12">
            <v-card
                style="margin:30px"
            >
                <v-card-text>
                <p class="text-h4 text--primary">
                    Confirmed cases
                </p>
                <div class="text-h5 text--primary">
                    {{$route.params.country.latest_data.confirmed}}
                </div>
                </v-card-text>
            </v-card>
            <v-card
                style="margin:30px"
            >
                <v-card-text>
                <p class="text-h4 text--primary">
                    Recovered
                </p>
                <div class="text-h5 text--primary">
                    {{$route.params.country.latest_data.recovered}}
                </div>
                </v-card-text>
            </v-card>
            <v-card
                style="margin:30px"
            >
                <v-card-text>
                <p class="text-h4 text--primary">
                    Critical cases
                </p>
                <div class="text-h5 text--primary">
                    {{$route.params.country.latest_data.critical}}
                </div>
                </v-card-text>
            </v-card>
            <v-card
                style="margin:30px"
            >
                <v-card-text>
                <p class="text-h4 text--primary">
                    Deaths
                </p>
                <div class="text-h5 text--primary">
                    {{$route.params.country.latest_data.deaths}}
                </div>
                </v-card-text>
            </v-card>
        </div>

        <div class="d-flex justify-center" cols="12">
            <v-card
                style="margin:30px"
            >
                <v-card-text>
                <p class="text-h4 text--primary">
                    Death Rate
                </p>
                <div class="text-h5 text--primary">
                    {{$route.params.country.latest_data.calculated.death_rate}}%
                </div>
                </v-card-text>
            </v-card>
            <v-card
                style="margin:30px"
            >
                <v-card-text>
                <p class="text-h4 text--primary">
                    Recovery Rate
                </p>
                <div class="text-h5 text--primary">
                    {{$route.params.country.latest_data.calculated.recovery_rate}}%
                </div>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>
<script>
  export default {
    name: 'Pokemon',
    methods:{
        
    },
    data: () => ({
        country:{},
    }),
  }
</script>