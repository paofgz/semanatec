<template>
    <v-container>
        <p>Aquí va a ir mi gráfica de bitcoin con {{cripto}} {{moneda}} {{plazo}}</p>
        <v-progress-circular
        indeterminate
        color="primary"
        v-if="loading"
        ></v-progress-circular>
        <apexchart v-if="!loading" width="75%" type="line" :options="options" :series="series"></apexchart>
    </v-container>
</template>

<script>
export default {
    props: ['cripto','moneda','plazo'],
    watch:{
        cripto:function(newCripto,oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.cargarDatos();
        },
        moneda:function(newCripto,oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.cargarDatos();
        },
        plazo:function(newCripto,oldCripto){
            console.log(newCripto)
            console.log(oldCripto)
            this.cargarDatos();
        }
    },
    methods:{
        async cargarDatos(){
            //TODO implementar aquí su llamada deberemos cambiar la data de categories y de data
            this.loading = true
            let data = []
            let dates = []
            await this.axios.get(`https://api.coingecko.com/api/v3/coins/${this.cripto}/market_chart?vs_currency=${this.moneda}&days=${this.plazo}`).then((response)=>{
                console.log(response);
                let date = null
                const prices = response.data.prices
                for (let price of prices){
                    console.log(price)
                    date = new Date(price[0] * 1000);
                    var formattedTime = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                    dates.push(formattedTime)
                    data.push(price[1].toFixed(2))
                }
            })
            console.log(data)
            console.log(dates)
            this.loading = false
            this.series = [{
                    data: data
                }]
            this.options = {
                xaxis: {
                    categories: dates,
                    labels: {
                        hideOverlappingLabels: true,
                    },
                }
            }
        }
    },
    data: ()=>({
        loading: false,
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    })
}
</script>