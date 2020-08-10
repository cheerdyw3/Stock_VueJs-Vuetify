import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import VuexORM from '@vuex-orm/core'
import Committee from '@/Models/Committee'   
import Branch from '@/Models/Branch';
import Cart from '@/Models/Cart';
import Agent from '@/Models/Agent';
import Admin from '@/Models/Admin';
import Pdf from '@/Models/Pdf';

Vue.use(Vuex) 
const vuexLocalStorage = new VuexPersist({ 
  storage: window.sessionStorage,  
})

const database = new VuexORM.Database()   
database.register(Committee)  
database.register(Agent) 
database.register(Branch) 
database.register(Cart)  
database.register(Admin)  
database.register(Pdf)  
 
const store = new Vuex.Store({
  plugins: [VuexORM.install(database),vuexLocalStorage.plugin] 
})

export default store