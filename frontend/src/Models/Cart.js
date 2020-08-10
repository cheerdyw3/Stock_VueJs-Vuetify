import { Model } from '@vuex-orm/core'   

export default class Cart extends Model { 

  static get entity () {
    return 'cart'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return { 
        id: this.attr(null),   
        brand: this.attr(''),
        c_price: this.attr(''),
        catalog_brand_id: this.attr(''),
        catalog_cate_id: this.attr(''),
        catalog_county_id: this.attr(''),
        catalog_unit_id: this.attr(''),
        code: this.attr(''),
        county: this.attr(''),
        created_at: this.attr(''),
        d_price: this.attr(''),
        e_price: this.attr(''), 
        m_price: this.attr(''),
        name: this.attr(''),
        nh_price: this.attr(''),
        seq: this.attr(''),
        sku: this.attr(''),
        t_price: this.attr(''),
        unit: this.attr(''),
        updated_at: this.attr(''),
        weight: this.attr(''),
        shipping: this.attr(''), 
        qty: this.attr(''), 
        amount: this.attr(''), 
        profit: this.attr(''), 
    }
  } 
}


