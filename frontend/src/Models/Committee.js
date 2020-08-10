import { Model } from '@vuex-orm/core'   

export default class Committee extends Model { 

  static get entity () {
    return 'committee'
  }

  // `this.belongsTo` is for the belongs to relationship.
  static fields () {
    return { 
        id: this.attr(null),
        title: this.attr(''),  //นาย 
        name: this.attr(''),  //ชื่อ 
        surname: this.attr(''),  //นามสกุล 
        idcard: this.attr(''),  //เลขที่บัตรประชาชน  
        village: this.attr(''),  //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
        floor: this.attr(''),  //ชั้น
        roomnumber: this.attr(''),  //ห้องเลขที่
        houseon: this.attr(''),  //บ้านเลขที่ 
        villageno: this.attr(''),  //หมู่ที่
        road: this.attr(''),  //ถนน
        subdistrict: this.attr(''),  //ตำบล 
        district: this.attr(''),  //อำเภอ 
        province: this.attr(''),  //จังหวัด 
        postalcode: this.attr(''),  //รหัสไปรษณีย์ 
        phone: this.attr(''),  //โทรศัพท์ 
        phone2: this.attr(''),  //โทรศัพท์2
        email: this.attr(''),  //อีเมล 
        line: this.attr(''),  //ไลน์ 
        ig: this.attr(''),  //ไอจี
        fb: this.attr(''),  //facebook  
        imageA: this.attr(''),  //facebook  
        imageB: this.attr(''),  //facebook  
    }
  } 
}


