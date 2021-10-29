<template>
    <v-container>
        <h2>Search results</h2>
        {{selectedCripto}} {{monedaCambio}} {{plazo}}
        <v-row>
            <v-col cols="12">
                <CovidChart/>
            </v-col>
        </v-row>
        <v-btn
        elevation="2"
        large
        outlined
        style="margin:10px"
        @click="viewTable()"
        >Go back</v-btn>
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
        viewTable(){
            this.$router.push('/covid');
        },
    }
}
</script>