<template>
    <v-container>
        <h2>Tu lista de tareas</h2>
        <v-row style="margin-bottom:10px;">
            <v-col cols="12" v-for="todo in todos" v-bind:key="todo">
                <v-card @click="finalizarTodo(todo['_id'])" :class="{finished:todo.done}" style="padding:15px;cursor:pointer;" ><p :class="{textFinished:todo.done}"  style="margin:0px;">{{todo.task}}</p></v-card>
            </v-col>
        </v-row>
    <v-btn
      class="mx-2"
      fab
      dark
      @click="dialog=true"
      color="indigo"
      style="position:absolute;bottom:10px;right:10px;"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn> 
    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Nuevo Todo
        </v-card-title>

        <v-card-text>
                <v-text-field
                label="Tarea"
                :rules="rules"
                v-model="newTodo.task"
                hide-details="auto"
                ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="agregarTodo"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>           
    </v-container>
    
</template>

<script>
export default {
    data:()=>({
        dialog:false,
        todos:[],
        newTodo:{
            task:"",
        }
    }),
    methods:{
        async agregarTodo(){
            await this.axios.post('https://backend-semana-tec.herokuapp.com/todo',this.newTodo).then((response)=>{
                console.log(response);
                this.cargarTodos();
            })
            this.dialog=false
            this.newTodo.task=""
        },
        async finalizarTodo(id){
            await this.axios('https://backend-semana-tec.herokuapp.com/todo/complete/'+id).then((response)=>{
                console.log(response)
                this.cargarTodos();
            })
        },
        cargarTodos(){
            this.axios('https://backend-semana-tec.herokuapp.com/todo/list').then((response)=>{
                this.todos=response.data
            })
        }
    },
    mounted(){
        this.cargarTodos();
    },
}
</script>
<style>
.finished{
    background-color:green!important;
    color:white!important;
}
.textFinished{
    text-decoration: line-through;
}
</style>