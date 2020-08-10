import { Model } from '@vuex-orm/core'   

export default class Pdf extends Model { 

  static get entity () {
    return 'pdf'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {   
        id: this.attr(null),
        code: this.attr(null), 
    }
  } 
}


