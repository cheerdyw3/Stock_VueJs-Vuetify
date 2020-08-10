<template>
  <v-app>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark dense> 
      <v-toolbar-title style="width: 400px" class="ml-0 pl-4 d-print-none">
        <span class="hidden-sm-and-down">
          <h4 v-if="Admins">{{Admins.shop}}</h4>
          <h4 v-else>ตัวแทนจำหน่าย</h4>
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-print-none">
        <v-btn small v-if="Admins" outlined @click="Logout()">
          <v-icon class="pr-2">mdi-lock-outline</v-icon> ออกจากระบบ
        </v-btn>
      </div>

    </v-app-bar> 

    <!-- Sizes your content based upon application components -->
   <v-content> 
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0 ma-0">   
        <!-- If using vue-router -->
        <v-row no-gutters v-if="Admins">
          <v-col cols="auto">
            <v-navigation-drawer permanent :width="184" color="grey lighten-4" v-if="Admins">
              <NavigationDrawer></NavigationDrawer>
            </v-navigation-drawer>
          </v-col>
          <v-col class="pl-3" sm="9">
          <router-view></router-view>
          </v-col>
        </v-row>  
        <v-row v-else> 
          <v-col class="mt-12 pt-12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>  
 
import NavigationDrawer from '@/components/NavigationDrawer'  
//import Group from '@/Models/Group'  
import Admin from '@/Models/Admin' 

  export default { 
    data: () => ({ 
        API: 'https://tadmin.carwashsupply.co.th', 
        member: false,
        drawer: null,
    }),  
    components: {
      NavigationDrawer, 
    },
    computed: { 
            Admins() {  return Admin.query().first(); }, 
        },
    methods: { 
      async loadDataAll(a,b) {   
            try { 
                const response = await fetch(this.API+'/api/v1/'+b)
                const data = await response.json()
                let _data = data.success.data  
                a.insert({  data: _data  });  
            } catch (error) {
                console.error(error)
            }
        },  
        Logout(){
              Admin.deleteAll() 
              this.$router.push({ path: '/Login' }, () => {})
            }, 
    },  
    created() {        
      //this.loadDataAll(Group,'group')  
    },
  }
</script>

 
 
<style> 
.v-application{
  font-size: 15px;
}
.v-application .f20{
  font-size: 20px;
}
.v-application .fcontent{
  font-size: 23px;
}
 .v-application input.registerinput {  
    border: 1px solid #cccccc;
    line-height: 0em;
    margin: 0;
    padding: 2px 2px;
    font-size: 12px;
    height:23px;
    font-size: 18px;
    border-radius: 2px;
}  
.styled-input {
  height: 30px;
  font-size: 10pt;
  margin: 0;
  padding: 0;
} 
 .v-application .v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px;
}

 .v-application .v-label {
    font-size: 12px;
    color: #000000;
}
 .v-application  .theme--light.v-label {
    color: rgba(0, 0, 0, 0.9);
} 
.v-application .v-input input { 
    font-size: 13px;
} 
 .v-application .v-messages__message {
    margin: 0px 0 0 0;
    font-size: 9px;
    line-height: 12px; 
}
 .v-application img.preview {
    max-height: 200px; 
} 
 .v-application .v-list-item--dense, 
 .v-application .v-list--dense .v-list-item {
    min-height: 25px; 
}

 .v-application .inputNumber {
    align-items: stretch;
    border: 1px solid #000;
    text-align: center;
    width: 50px;
    padding: 2px;
    border-radius: 3px;
}

 .v-application .inputDiscount {
    align-items: stretch;
    border: 1px solid #000;
    text-align: right;
    width: 50px;
    padding: 2px;
    border-radius: 
    3px;
}

.v-application .v-data-table td {
    font-size: 0.76rem; 
}
</style>