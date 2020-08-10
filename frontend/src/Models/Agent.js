import { Model } from '@vuex-orm/core'   

export default class Agent extends Model { 

  static get entity () {
    return 'agent'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return { 
        id: this.attr(null),
        name: this.attr(''),  
        password: this.attr(''), 
        type: this.attr(''), 
    }
  } 
}


