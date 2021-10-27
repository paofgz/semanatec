<template>
    <v-container>
        <h2>Análisis de bitcoin</h2>
        {{selectedCripto}} {{monedaCambio}} {{plazo}}
        <v-row style="margin-top:10px;">
            <v-col cols="12" md="4">
                <v-select
                :items="criptomonedas"
                item-text="name"
                v-model="selectedCripto"
                item-value="id"
                label="Elige la criptomoneda"
                outlined
                ></v-select>
            </v-col>
            <v-col cols="12" md="4">
                <v-select
                :items="monedasCambio"
                item-text="name"
                v-model="monedaCambio"
                item-value="id"                
                label="Elige la moneda de cambio"
                outlined
                ></v-select>
            </v-col> 
            <v-col cols="12" md="4">
                <v-select
                :items="plazos"
                item-text="name"
                v-model="plazo"
                item-value="id"                  
                label="Elige el plazo de análisis"
                outlined
                ></v-select>
            </v-col>                        
        </v-row>
        <v-row>
            <v-col cols="12">
                <BitcoinChart :cripto="selectedCripto" :moneda="monedaCambio" :plazo="plazo"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import BitcoinChart from '../components/BitcoinChart.vue'
export default {
    components:{
        BitcoinChart
    },
    data : () =>({
        selectedCripto:null,
        monedaCambio:null,
        plazo:null,
        criptomonedas:[
            {
                id:"bitcoin",
                name:"Bitcoin"
            },
            {
                id:"ethereum",
                name:"Ethereum"
            }
        ],
        monedasCambio:[
            {
                id:"usd",
                name:"Dólares"
            },
            {
                id:"mxn",
                name:"Pesos"
            }
        ],
        plazos:[
            {
                id:"1",
                name:"1 día"
            },
            {
                id:"30",
                name:"30 días"
            },
            {
                id:"60",
                name:"60 días"
            },            
        ]       
    })
    
}
</script>