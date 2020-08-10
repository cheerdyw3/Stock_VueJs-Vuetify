import { Model } from '@vuex-orm/core'   

export default class Branch extends Model { 

  static get entity () {
    return 'branch'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return { 
        id: this.attr(null), 
        name: this.attr(''),  
        images: this.attr(''),   
    }
  } 
}


