<template>
<div id="printMe" ref="content"> 
  <v-card outline tite elevation="0" max-width="980" class="pa-5">
      <v-card elevation="0" class="ma-3">
        <v-row>
          <v-col cols="8">
            <v-row no-gutters> 
              <v-col cols="2"><v-img :src="`${API}/public/images/member/${Admins.document.imageF}`" max-width="100" max-height="100"></v-img>
            </v-col> 
            <v-col cols="7" class="font-weight-bold button pl-2 pt-0">
             <v-card elevation="0" style="line-height: 1em" class="mt-n1">
                <small>{{Admins.shop}}<br>
                {{ address1(Admins) }} <br>
                {{ address2(Admins) }} <br> 
                {{tradenumber(Admins.tradenumber)}}
                <br> 
                โทร: 
              {{Admins.phone}} <span v-if="Admins.phone2">, {{Admins.phone2}}</span>
              </small>
             </v-card>
            </v-col> 
            </v-row>
          </v-col>  
          <v-col class="4 text-right">
            <h2>ใบส่งสินค้าชั่วคราว</h2>
            <h3>Delivery Order</h3>
            <p class="caption font-weight-bold">
              เลขที่ {{ sku }}
          <br>
              วันที่ {{thai(new Date())}} <br>
              เวลา  {{ thaiTime() }}
          <br>
              รหัสลูกค้า  {{dataDetail.sku}}
            </p>
          </v-col>
        </v-row>
      </v-card>
       <v-card elevation="0" class="ma-3">
        <v-row>
          <v-col cols="4">
            <v-card elevation="0" class="pa-2">
              <small>
                <h3>
                  ข้อมูลลูกค้า
                </h3>
                <p>
                  <span  v-if="dataDetail.shop">
                      {{dataDetail.shop}} <br>
                  </span>
                  <span v-if="dataDetail.name"> คุณ{{ dataDetail.name }} 
                  {{ dataDetail.surname }} <br> </span>
                 
                  {{ address1(dataDetail) }} <br>
                  {{ address2(dataDetail) }} 
                  <br>
                  {{ phone(dataDetail)}} <br>
                  <span v-if="dataDetail.tradenumber">
                       {{ tradenumber(dataDetail.tradenumber) }} 
                  </span>

                  <span>
                       {{ tradenumber(dataDetail.idcard) }} 
                  </span>
                </p>
              </small>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card elevation="0" class="pa-2">
              <small>
                <h3>
                  ชื่อผู้ติดต่อ
                </h3>  
                <p> 
                  ชื่อผู้ติดต่อ: {{dataDetail.contact[0].name}} {{dataDetail.contact[0].surname}}
                  <br>
                  โทร:  {{dataDetail.contact[0].phone}}<br>
                  ID-Line:  {{dataDetail.contact[0].line}}<br> 
                  Email:  {{dataDetail.contact[0].email}} <br>
                  Instagram:  {{dataDetail.contact[0].ig}} <br>
                  Facebook:  {{dataDetail.contact[0].fb}} <br>
                  
                </p>
              </small>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card elevation="0" class="pa-2">
              <small>
                <h3>
                  สถานที่จัดส่ง
                </h3> 
               <p>
                  ชื่อผู้ติดต่อ: {{dataDetail.shipping.name}}
                  <br>
                  โทร:  {{dataDetail.shipping.phone}} <br>
                  ที่อยู่จัดส่ง:  {{dataDetail.shipping.address}} <br>
                </p>
              </small>
            </v-card>
          </v-col>
        </v-row>
      </v-card> 
      <v-row no-gutters>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row> 
      <v-simple-table dense>
        <template v-slot:default max-width="900">
          <thead>
            <tr>
              <th class="text-center font-weight-black" width="120">รหัส <br><small>Code</small></th>
              <th class="text-center font-weight-black" width="200">รุ่น <br><small>Model</small></th>
              <th class="text-center font-weight-black" width="450">รายการสินค้า <br><small>Description</small></th>
              <th class="text-center font-weight-black" width="50">หน่วย <br><small>Unit</small></th>
              <th class="text-center font-weight-black" width="50">M <br><small>สมาชิก</small></th>
              <th class="text-center font-weight-black" width="50">{{agentType}}<br><small>ตัวแทน</small></th>
              <th class="text-center font-weight-black" width="40">จำนวน <br><small>Qty</small></th>
              <th class="text-center font-weight-black" width="85">รวมเงิน <br><small>Amount</small></th>
              <th class="text-center font-weight-black" width="60">กำไร <br><small>Profit</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Carts" :key="item.name" class="caption">
              <td>{{ item.code }}</td>
              <td>{{ item.sku }}</td>
              <td class="text-left">{{ item.name }}</td>
              <td class="text-center">{{ item.unit.name }}</td>
              <td class="text-center">{{ Number(item.m_price).toLocaleString() }}</td>
              <td class="text-center">{{ Price(item) }}</td>
              <td class="text-center">{{ Number(item.qty).toLocaleString() }}</td>
              <td class="text-center">{{ Number(item.qty * item.m_price).toLocaleString() }}</td>
              <td class="text-center">
                {{ Number(Number(item.m_price * item.qty) - Number(Price(item) * item.qty)).toLocaleString() }}</td>
            </tr> 
          </tbody>
        </template> 
      </v-simple-table>  
 
      <v-card elevation="0" class="mt-10">
        <v-row no-gutters>
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
         <v-col cols="7">
            <h4>กรุณาโอนเงินมาในหมายเลขบัญชีด้านล่าง</h4>
            <p>หมายเลขบัญชี {{Admins.bank.account_number}} <br>
            ชื่อบัญชี {{Admins.bank.account_name}}  <br> 
            {{Admins.bank.account_bank}} </p> 

            <h4>กรุณาส่งสำเนาการโอนเงินมาที่</h4>  
            ID Line : {{Admins.contact[0].line}} <br> 
            คุณ{{Admins.contact[0].name}} โทร: {{Admins.contact[0].phone }}
            
          </v-col>
          <v-col cols="4" class="text-right">
            <v-row no-gutters>
              <v-col>
                รวมเงิน
              </v-col>
              <v-col>
                {{Number(total).toLocaleString()}}
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                ค่าขนส่ง
              </v-col>
              <v-col>
                {{Number(shipping).toLocaleString()}}
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                ส่วนลดพิเศษ
              </v-col>
              <v-col>
                <input type="text" class="inputDiscount" v-mask="'######'"
                  v-model="discount">
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                ภาษีมูลค่าเพิ่ม 7%
              </v-col>
              <v-col>
                {{ Number(vat()).toLocaleString() }}
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                จำนวนเงินรวมสุทธิ
              </v-col>
              <v-col>
               {{ grandtotal().toLocaleString() }}
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1" class="text-right d-flex align-center justify-center mt-n12">
              <span class="mt-n10">
                {{ Number(profits()).toLocaleString()}}
              </span>
          </v-col>
        </v-row>
      </v-card>

      <v-card elevation="0" class="mt-12 pt-12">
         <v-row class="text-center">
           <v-col cols="4">
            <small> ผู้จัดสินค้า</small>
             <br><br><br><br>
             <v-row>
               <v-col>(</v-col>
               <v-col></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ................/....................../.....................</small> <br > <small>เวลา .................................</small>
           </v-col>
            <v-col cols="4">
            <small> ผู้ส่งสินค้า</small>
             <br><br><br><br>
             <v-row>
               <v-col>(</v-col>
               <v-col></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ................/....................../.....................</small> <br > <small>เวลา .................................</small>
           </v-col>
           <v-col cols="4">
            <v-card outlined class="pa-3">
               <small>ได้รับสินค้าตามรายการสินค้าฉบับนี้ <br> ในสภาพเรียบร้อยจำนวนและราคาถูกต้องแล้ว</small>
              <br><br><br>
             <v-row>
               <v-col>(</v-col>
               <v-col></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ................/....................../.....................</small> <br > <small>เวลา .................................</small>
            </v-card>
           </v-col> 
            
         </v-row>
       </v-card>
      

      <v-col class="text-left  mt-5 pb-12 mb-12" v-if="sku">  
        <v-btn class="mt-3 float-left"  color="primary" @click="edit()" >ย้อนกลับ</v-btn> 
        <v-btn class="mt-3 ml-3 float-right"  color="primary" @click="save()" >บันทึกข้อมูล</v-btn> 
        <v-btn class="mt-3 float-right"  color="error" @click="pdf()" >สร้างไฟล์ PDF</v-btn> 
      </v-col>  
 
    <br>
     
    </v-card>   

    <v-dialog
      v-model="dialogSave"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          ระบบกำลัง ดำเนินการโปรรอสักครู่
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogComplete" 
      persistent
      width="300"
    >
      <v-card
        
      >
        <v-card-text>
         <v-card elevation="0" class="mx-auto" max-width="300">
            <v-col class="mx-auto text-center pt-10 pa-3">
              <h2>ระบบได้บันทึกข้อมูลเสร็จแล้ว</h2> <br>
            <v-btn
            color="primary"
              small
            @click="close()"
          >
            ปิดหน้าต่าง
          </v-btn>
            </v-col>
         </v-card>
        </v-card-text> 
      </v-card>
    </v-dialog>

     
  </div>
</template>


<script>    
//import Cart from '@/Models/Cart'
import Admin from '@/Models/Admin'  


// @ is an alias to /src  
import Pdf from '@/Models/Pdf'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
 

pdfMake.vfs = pdfFonts.pdfMake.vfs;
//ต้องระบุตามชื่อของ ไฟล์ font
pdfMake.fonts = { 
  SMBDisLig: {
    normal: 'SMB-DisLig.ttf', 
  },
  SMBDisNorBol: {
    normal: 'SMB-DisNorBol.ttf', 
  },
   SMBDisNor: {
    normal: 'SMB-DisNor.ttf', 
  }  
}


  export default { 
       data: () => ({  
            title: "ตัวแทนจำหน่าย", 
            API: 'https://tadmin.carwashsupply.co.th',  
            cates: [], 
            discount: '0', 
            dialogSave: false,
            dialogComplete: false,
            sku: '',
            body: [], 
            
      }), 
    props: {
        dataDetail: Object,
        cws: Object,
        agentType: String,
        Carts: Array,
    },  
    computed: {    
       Pdf() {  return Pdf.query().first(); },  
            Admins() {  return Admin.query().first(); }, 
            //Carts() {  return Cart.all(); },   
            total() { 
              var _total = '';
              
                 _total = this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price) || 0)}, 0)
               
              return _total
            },
            member() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price) || 0)}, 0)
            },
            shipping() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.shipping) || 0)}, 0) + Number('40')
            },
            profit() {
              var _total = '';
              if(this.agentType == 'D'){
                 _total = this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price  -  c.qty*c.d_price) || 0)}, 0)
              } 
              if(this.agentType == 'C'){
                 _total = this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price - c.qty*c.c_price) || 0)}, 0)
              } 
              if(this.agentType == 'N'){
                  _total = this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price - c.qty*c.nh_price) || 0)}, 0)
              } 
              if(this.agentType == 'H'){
                  _total = this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price - c.qty*c.nh_price) || 0)}, 0)
              } 
              if(this.agentType == 'T'){
                  _total = this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price - c.qty*c.t_price) || 0)}, 0)
              }  
              return _total 
            }, 
        },
    methods: {    
        grandtotal() {
          return Number(this.total + this.shipping - this.discount) + Number(this.vat())
        },   
        vat(){
          return Number(Number(this.total - this.shipping - this.discount) * 0.07).toFixed()
        },
        profits(){
          return Number(Number(this.profit) -  Number(this.discount)).toFixed()
        }, 
        address(data){  
            let address = "" 
            if(data.village){  address +=  data.village }
            if(data.floor){  address +=  ' ชั้น '+ data.floor }
            if(data.roomnumber){  address +=  ' ห้องเลขที่ '+ data.roomnumber }
            if(data.houseon){  address +=  ' บ้านเลขที่ '+ data.houseon }
            if(data.villageno){  address +=  ' หมู่ที่ '+ data.villageno }
            if(data.road){  address +=  ' ถนน '+ data.road }
            if(data.subdistrict){  address +=  ' ตำบล'+ data.subdistrict }
            if(data.district){  address +=  ' อำเภอ'+ data.district }
            if(data.province){  address +=  ' จังหวัด'+ data.province }
            if(data.postalcode){  address +=  ' รหัสไปรษณีย์ '+ data.postalcode } 
          return address;
        }, 
        address1(data){  
            let address = "" 
            if(data.shop){ address += "สำนักงานใหญ่ " }
            if(data.village){  address +=  data.village }
            if(data.floor){  address +=  ' ชั้น '+ data.floor }
            if(data.roomnumber){  address +=  ' ห้องเลขที่ '+ data.roomnumber }
            if(data.houseon){  address +=  ' เลขที่ '+ data.houseon }
            if(data.villageno){  address +=  ' หมู่ที่ '+ data.villageno }
            if(data.road){  address +=  ' ถนน '+ data.road }else{ 
              if(data.subdistrict){  address +=  ' ตำบล'+ data.subdistrict } 
            } 
          return address;
        }, 
         address2(data){  
            let address = ""  
            if(data.road){  
              if(data.subdistrict){  address +=  ' ตำบล'+ data.subdistrict }  
            } 
            if(data.district){  address +=  ' อำเภอ'+ data.district }
            if(data.province){  address +=  ' จังหวัด'+ data.province }
            if(data.postalcode){  address +=  ' '+ data.postalcode } 
          return address;
        }, 
        tradenumber(data){
          var  str = data    
          var _str = ''
          _str = str.replace("-", "")
          _str = _str.replace("-", "")
          _str = _str.replace("-", "")
          _str = _str.replace("-", "")
         
          return 'เลขประจำตัวผู้เสียภาษี: '+ _str
        }, 
         phone(data){
          let phone = 'โทร: '+data.phone  
          if(data.phone2){  phone +=  ', '+ data.phone2 }
          return phone;
        },
        Price(item){ 
          var price = ''
          if(this.agentType == 'D'){
            price = item.d_price
          } 
          if(this.agentType == 'C'){
            price = item.c_price
          } 
          if(this.agentType == 'N'){
            price = item.nh_price
          } 
          if(this.agentType == 'H'){
            price = item.nh_price
          } 
          if(this.agentType == 'T'){
            price = item.t_price
          } 
          return price
        },
        thai(data){   
            var monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];  
            var d = new Date(data); 
            return    d.getDate() + " " + monthNamesThai[d.getMonth()] + " " + Number(d.getFullYear()+543)  
        }, 
        fullDateThai(){
          
          var d = new Date();
          var thday = new Array ("อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์");
          var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม", "เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม");
          return "วัน" + thday[d.getDay()]+ " ที่ "+ d.getDate()+ " " +  thmonth[d.getMonth()]+ " " + Number(d.getFullYear()+543) 
        },
        thaiTime(){
          var today = new Date(); 
          var time = today.getHours() + ":" + today.getMinutes() + ' น.' 
          return time
        },
        async save() {   
          this.dialogSave = true
            var obj = 
                { 
                    cart: this.Carts,  
                    order: {
                        member_id: this.dataDetail.id,
                        agent_id: this.cws.id,
                        discount: this.discount,
                        profit: this.profits(),
                        total: this.total, 
                        shipping: this.shipping, 
                        grandtotal: this.grandtotal(), 
                    } 
                }
               
            try {   
                // Create request to api service
                const req = await fetch(this.API+"/api/v1/controller/invoice", {
                    method: 'POST',  
                    body: JSON.stringify(obj),
                }); 
                const res = await req.json();
                console.log(res)
                this.dialogSave = false
                this.dialogComplete = true
                 
            } catch (error) { 
                console.error(error) 
            } 
        },   
        async quotationSku() {     
          try { 
              const response = await fetch(this.API+'/api/v1/controller/invoice/sku')
              const data = await response.json()   
              this.sku = data.success.sku  
             
          } catch (error) {
              console.error(error)
          }
      },
       edit(){
         this.$emit('back')
       },   
        memberShop(item){
            if(item.shop){
                return item.shop
            }else{
                return item.name +' '+item.surname
            } 
        },
        memberTrad(item){ 
            if(item.shop)
            {
                return this.tradenumber(item.tradenumber) 
            }else{
                return this.tradenumber(item.idcard) 
            } 
        },
        pdf(){   
            this.load() 
       var docDefinition = {
        pageSize: 'A4',
         footer: function (currentPage, pageCount) {
                    return { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'right', style: 'normalText', margin: [0, 0, 50, 50] }
                },
               
        content: [
           {
            image: 'mySuperImage', 
            width: 600,
            absolutePosition: {x: 0, y: 0}
            },
            {
            image: 'Logo', 
            width: 60, 
            margin: [10, 5, 0, 0]  //left, top, right, bottom
            },
            {
              text: [
                {text:this.Admins.shop+'\n'},
                {text:this.address1(this.Admins)+'\n'},
                {text:this.address2(this.Admins)+'\n'},
                {text:this.tradenumber(this.Admins.tradenumber)+'\n'}, 
                {text:this.phone(this.Admins)+'\n'},
              ],   
              fontSize: 11, 
              lineHeight: 0.8,
              font: 'SMBDisNorBol', 
              absolutePosition: {x: 120, y: 50}
            },
            this.headerPdf(), 
            
            {
                text: ' ',
                alignment: 'left',
                margin: [0, 132, 0, 0]  //left, top, right, bottom
            },
    
            {
              margin: [20,0,0,0],
              table: {
                widths: [70, 60, 170, 25,25,40],
                body: this.body
              },
              layout: 'headerLineOnly', 
            },   
          
             {
              image: 'data:image/jpeg;base64,'+this.Pdf.code.Line, 
              width: 590, 
              margin: [-33,0,0,0], 
            },
            	{ 
            columns: [ 
              { 
                  width: 320,
                  margin: [20,0,0,0], 
                  border: 2,  
                  text: 
                  [  
                      {text: 'กรุณาโอนเงินมาในหมายเลขบัญชีด้านล่าง\n',font: 'SMBDisNorBol', fontSize: 14,},
                      {text: 'หมายเลขบัญชี '+this.Admins.bank.account_number+'\n'},
                      {text: 'ชื่อบัญชี '+this.Admins.bank.account_name+'\n'},
                      {text: this.Admins.bank.account_bank+'\n\n',},
                      {text: 'กรุณาส่งสำเนาการโอนเงินมาที่\n',  font: 'SMBDisNorBol', fontSize: 14,},
                      {text: 'ID Line : '+this.Admins.contact[0].line+'\n'},
                      {text:  'คุณ'+this.Admins.contact[0].name+' โทร: '+this.Admins.contact[0].phone}, 
                  ]
              },
              {
                width: '*',
                style: 'tableExample',
                table: {
                  widths: [100, 60],
                  heights: [5, 5],
                  body: [
                    [{text:'รวมเงิน', alignment: 'left', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,}, 
                      {text:this.total.toLocaleString(), alignment: 'right', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,} ],
                    [{text:'ค่าขนส่ง', alignment: 'left', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,}, 
                      {text:this.shipping.toLocaleString(), alignment: 'right', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,} ],
                    [{text:'ส่วนลดพิเศษ', alignment: 'left', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,}, 
                      {text:this.discount.toLocaleString(), alignment: 'right', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,} ],
                    [{text:'ภาษีมูลค่าเพิ่ม 7%', alignment: 'left', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,}, 
                      {text:Number(this.vat()).toLocaleString(), alignment: 'right', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,} ],
                    [{text:'จำนวนเงินรวมสุทธิ', alignment: 'left', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,}, 
                      {text:this.grandtotal().toLocaleString(), alignment: 'right', font: 'SMBDisNorBol', fontSize: 14, lineHeight: 0.7,} ],
                  ]
                },
                layout: 'headerLineOnly',
                 
              }, 

            ]
          },
          {
                text: ' ', 
                margin: [0,25,0,0],  //left, top, right, bottom
                layout: 'headerLineOnly',
                pageBreak: this.pageBreak()
            },  
          {
              alignment: 'center', 
              columns: [
                {
                  width: '*',
                  margin: [20,0,0,0],
                  text: [
                    {text: 'ผู้จัดสินค้า \n\n\n\n'},
                    {text: '.................................................................\n'},
                    {text: 'วันที่ ........../.............../..........\n'},
                    {text: 'เวลา.....................'}
                  ]
                },
                 {
                  width: '*',
                  margin: [20,0,0,0],
                  text: [
                    {text: 'ผู้ส่งสินค้า \n\n\n\n'},
                    {text: '.................................................................\n'},
                    {text: 'วันที่ ........../.............../..........\n'},
                    {text: 'เวลา.....................'}
                  ]
                },
                {
                  width: '*',
                  margin: [20,0,0,0],
                  text: [
                    {text: 'ได้รับสินค้าตามรายการสินค้าฉบับนี้\n ในสภาพเรียบร้อยจำนวนและราคาถูกต้องแล้ว \n\n\n'},
                    {text: '.................................................................\n'},
                    {text: 'วันที่ ........../.............../..........\n'},
                    {text: 'เวลา.....................'}
                  ] 
                }
              ]
            },  
              
          ],  
           images: {
            mySuperImage: 'data:image/jpeg;base64,'+this.Pdf.code.bgPdf,
            Logo: 'data:image/jpeg;base64,'+this.Pdf.code.Logo,
          }, 
         
          defaultStyle :  {
            font: 'SMBDisNor', 
          } 
            
        };
        pdfMake.createPdf(docDefinition).download('ใบส่งสินค้าชั่วคราวเลขที่ '+this.sku)
        //pdfMake.createPdf(docDefinition).open()
      }, 
      headerPdf(){
        var _data = [ 
           {
              text: 'ใบส่งสินค้าชั่วคราว', 
              fontSize: 19, 
              font: 'SMBDisNorBol', 
              absolutePosition: {x: 445, y: 60}
            },
            {
              text: 'Delivery Order',
              margin: [0,-30,10,0],  //left, top, right, bottom
              alignment: 'right',
              fontSize: 16,  
              font: 'SMBDisNorBol',  
            }, 
            {
              text: 'เลขที่',
              margin: [0,0,70,0],  //left, top, right, bottom
              fontSize: 13, 
              alignment: 'right',
              font: 'SMBDisNorBol',  
            },
            {
              text: 'วันที่',
              margin: [0,0,70,0],  //left, top, right, bottom
              fontSize: 13, 
              alignment: 'right',
              font: 'SMBDisNorBol',  
            },
            {
              text: 'เวลา',
              margin: [0,0,70,0],  //left, top, right, bottom
              fontSize: 13, 
              alignment: 'right',
              font: 'SMBDisNorBol',  
            },
            {
              text: 'รหัสลูกค้า',
              margin: [380,0,70,0],  //left, top, right, bottom
              fontSize: 13, 
              font: 'SMBDisNorBol',  
            },
            {
              text: this.sku,
              style: 'header',
              font: 'SMBDisNorBol', 
              alignment: 'left',
              margin: [455,-52,0,0],  //left, top, right, bottom
            },
            {
              text: this.thai(new Date()),
              style: 'header',
              font: 'SMBDisNorBol', 
              alignment: 'left', 
              margin: [455,1,0,0],  //left, top, right, bottom
            },
            {
              text: this.thaiTime(),
              style: 'header',
              font: 'SMBDisNorBol',  
              margin: [455,2,0,0],  //left, top, right, bottom
            },  
            {
               text: this.dataDetail.sku,
              style: 'header',
              font: 'SMBDisNorBol',  
              margin: [420,1,0,0],  //left, top, right, bottom
            },  

            //ข้อมูลลูกค้า
            {
              text: this.memberShop(this.dataDetail), 
              fontSize: 11,  
              absolutePosition: {x: 58, y: 177}
            }, 
            {
              text: this.address1(this.dataDetail), 
              fontSize: 11,
              absolutePosition: {x: 58, y: 187}
            }, 
            {
              text: this.address2(this.dataDetail), 
              fontSize: 11,
              absolutePosition: {x: 58, y: 197}
            }, 
            {
              text: this.phone(this.dataDetail), 
              fontSize: 11,
              absolutePosition: {x: 58, y: 207}
            }, 
            {
              text: this.memberTrad(this.dataDetail), 
              fontSize: 11,
              absolutePosition: {x: 58, y: 217},
              style: 'subheader'
            }, 
            //ชื่อผู้ติดต่อ 
            {
              text: this.dataDetail.contact[0].name +' '+this.dataDetail.contact[0].surname, 
              fontSize: 11,
              absolutePosition: {x: 280, y: 179}
            }, 
            {
              text: this.dataDetail.contact[0].phone, 
              fontSize: 11,
              absolutePosition: {x: 280, y: 189}
            }, 
            {
              text: this.dataDetail.contact[0].line, 
              fontSize: 11,
              absolutePosition: {x: 280, y: 197}
            }, 
            {
              text: this.dataDetail.contact[0].email, 
              fontSize: 11,
              absolutePosition: {x: 280, y: 207}
            }, 
            {
              text: this.dataDetail.contact[0].ig, 
              fontSize: 11,
              absolutePosition: {x: 280, y: 220},
              style: 'subheader'
            }, 
            {
              text: this.dataDetail.contact[0].fb, 
              fontSize: 11,
              absolutePosition: {x: 280, y: 230},
              style: 'subheader'
            }, 
            //สถานที่จัดส่ง 
            {
              text: this.dataDetail.shipping.name, 
              fontSize: 11,
              absolutePosition: {x: 420, y: 179}
            }, 
            {
              text: this.dataDetail.shipping.phone, 
              fontSize: 11,
              absolutePosition: {x: 420, y: 189}
            }, 
            {
              text: this.dataDetail.shipping.address, 
              fontSize: 11,
              lineHeight: 0.9,
              absolutePosition: {x: 420, y: 198}
            }, ]
          return _data
      },
      load(){ 

          const letters = this.Carts
          this.body = []
          letters.forEach((letter) => { 
            this.body.push( 
                        [ 
                          {text: letter.sku,alignment: 'left'}, 
                          {text: letter.code,alignment: 'left'},
                          {text: letter.name,alignment: 'left'}, 
                          {text: letter.unit.name,alignment: 'center'},
                          {text: letter.qty,alignment: 'right'},
                          {text: Number(letter.amount).toLocaleString(),alignment: 'right'}, 
                      ]) 
          }); 
 
       
      },
      pageBreak(){
        if(this.Carts.length >= '13' && this.Carts.length <= '18') {
          return ' '
        }else{
          return ''
        }
      },

        close(){
          this.dialogComplete = false
          this.$router.push({ path: 'Dashboard' }, () => {})  
        },
        
    }, 
    created() {      
      this.quotationSku() 
    },
  }
</script> 