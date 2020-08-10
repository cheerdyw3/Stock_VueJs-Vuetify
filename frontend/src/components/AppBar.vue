<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">
        <h4>{{title}}</h4>
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer> 

    <div class="">
       <v-btn v-if="Admins" outlined @click="Logout()"> 
      <v-icon class="pr-2">mdi-lock-outline</v-icon> ออกจากระบบ
    </v-btn> 

    <v-btn v-else icon to="/"> 
      <v-icon>mdi-home</v-icon> 
    </v-btn> 
    </div>

  </v-app-bar>
</template>

<script>
import Admin from '@/Models/Admin'
    export default {
      data: () => ({  
            drawer: null,
      }),
      props: {
            admins: Array,
            title: String,
        },  
        computed: { 
            Admins() {  return Admin.query().count() }, 
        },
        methods: { 
          Logout(){
              Admin.deleteAll() 
              this.$router.push({ path: '/Login' }, () => {})
          }
        },
    }
</script>
