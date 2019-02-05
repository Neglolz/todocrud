<template>
  <v-app >
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
        <v-alert
                :value="alert.show"
                :type="alert.type"
        >
            {{ alert.text }}
        </v-alert>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Todo CRUD application'
      }
    },
    computed: {
      ...mapState({
        alert: state => state.alert
      })
    }
  }
</script>
