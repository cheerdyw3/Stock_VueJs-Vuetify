import { Model } from '@vuex-orm/core'   

export default class Admin extends Model { 

  static get entity () {
    return 'admin'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return {  
        created_at: this.attr(null),
        district: this.attr(null),
        email: this.attr(null),
        fax: this.attr(null),
        fb: this.attr(null),
        floor: this.attr(null),
        houseon: this.attr(null),
        id: this.attr(null),
        idcard: this.attr(null),
        ig: this.attr(null),
        line: this.attr(null),
        memberstatus_id: this.attr(null),
        membertype_id: this.attr(null),
        name: this.attr(null), 
        phone: this.attr(null),
        phone2: this.attr(null),
        postalcode: this.attr(null),
        province: this.attr(null),
        remember_token: this.attr(null),
        roomnumber: this.attr(null),
        shop: this.attr(null),
        sku: this.attr(null),
        subdistrict: this.attr(null),
        surname: this.attr(null),
        title: this.attr(null),
        tradenumber: this.attr(null),  
        village: this.attr(null),
        villageno: this.attr(null),
        document: this.attr(null),
        contact: this.attr(null),
        bank: this.attr(null),
    }
  } 
}


