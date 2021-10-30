<template>
    <v-container>
        <h2>Search results</h2>
        {{selectedCripto}} {{monedaCambio}} {{plazo}}
        <v-row>
            <v-col cols="12">
                <CovidChart/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CovidChart from '../components/CovidChart.vue'
export default {
    components:{
        CovidChart
    },
    data : () =>({    
    }),
    methods: {
    }
}
</script>