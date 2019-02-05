<template>
    <v-container align-content-center>
        <v-layout column justify-center align-center>
            <v-flex xs12 sm8 md6 lg6 xl6>
                <v-container align-center="true">
                    <!--éditer une tache <br>-->
                    <!--<v-btn @click="testlog">hellomoto</v-btn>-->

                    <v-layout row wrap align-center justify-center>
                        <v-flex xs10 md6 sm6 lg6 xl6>
                            <v-text-field
                                class="pa3 pa5-ns"
                                style="max-width:500px"
                                v-model="title"
                                label="Créer une tâche"
                                @keydown.enter="add(title)"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap align-center justify-center>
                        <v-flex sm8 md8>
                            <h5 class=" display-1 pl-5 pb-3 pt-3">
                                Tâches à faire: {{ remainingTodos }}
                            </h5>
                        </v-flex>
                        <v-flex sm2 md2>
                            <div class="text-xs-center">
                                <H5 class="pb-2"> Progression : {{progress}} %</H5>
                                <v-progress-circular
                                        :value="progress"
                                        class="mr-2"
                                ></v-progress-circular>
                            </div>
                        </v-flex>
                    </v-layout>




                    <v-card
                            v-for="todo of todos"
                            :key="todo.id"
                            class="mb-4"
                            xs10 sm8 md8 xl8
                            style="max-width: 700px"
                    >
                        <v-card-title primary-title class="mb-0">
                            <div :class="{completed: todo.completed}">
                                <h6 class="headline mb-0">{{todo.title}}</h6>
                            </div>
                        </v-card-title>
                        <v-card-actions class="mt-0">
                            <v-btn @click="dialog = true; todoToEdit = todo " flat color="blue">editer</v-btn>
                            <v-btn @click="toggle(todo)" flat color="green">Terminer</v-btn>
                            <v-btn @click="remove(todo)" flat color="red">supprimer</v-btn>
                        </v-card-actions>
                    </v-card>



                    <v-dialog v-model="dialog" max-width="600px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Editer tâche</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Tâche" v-model="todoToEdit.title" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" flat @click="dialog = false; edit(todoToEdit)">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-container>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'

  export default {
    async fetch ({ store, redirect, error }) {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/')
        store.commit('init', res.data)
      } catch (err) {
        error({ statusCode: 500, message: 'Oops, try again' })
      }
    },
    data () {
      return {
        title: '',
        todoToEdit: {
          id: 1,
          title: 'title_todo'
        },
        dialog: false
      }
    },
    computed: {
      ...mapState({
        todos: state => state.todos
      }),
      todoLength () {
        return Object.keys(this.todos).length
      },
      completedTodos () {
        return Object.values(this.todos).filter(todo => todo.completed).length
      },
      progress () {
        return Math.round(this.completedTodos / this.todoLength * 100)
      },
      remainingTodos () {
        return this.todoLength - this.completedTodos
      }
    },
    methods: {
      ...mapActions([
        'add',
        'remove',
        'toggle',
        'edit',
        'alert'
      ])
    }
  }
</script>

<style>
    body{
        font-family: 'Roboto', monospace;
    }
    .completed {
        text-decoration: line-through;
        color: #555;
    }
</style>