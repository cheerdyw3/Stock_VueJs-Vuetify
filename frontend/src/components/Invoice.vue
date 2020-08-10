<template>
<div id="printMe"> 
  <v-card outline   elevation="0" max-width="900" class="pa-5 pb-12 mb-12">
         
        <v-card elevation="0" class="ma-1">
        <v-row no-gutters>
          <v-col cols="9">
            <v-row no-gutters>
              <v-col cols="2"><v-img src="@/assets/logo-2.png" max-width="110"></v-img>
            </v-col> 
            <v-col cols="10" class="font-weight-bold button pl-2 pt-1">
             <v-card max-width="300" elevation="0">
                <small>{{Admins[0].shop}} (สำนักงานใหญ่)<br>
              {{ address(Admins[0]) }} <br>
              เลขประจำตัวผู้เสียภาษีอากร
              {{Admins[0].tradenumber}}
              <br>
             โทร 
              {{Admins[0].phone}},  {{Admins[0].phone2}}
              </small>
             </v-card>
            </v-col> 
            </v-row>  
          </v-col>  
          <v-col class="3 text-right">
            <h2>ใบส่งสินค้า</h2>
            <h3>Invoice</h3>
            <p class="caption font-weight-bold">
              เลขที่ใบสั่งซื้อ {{datas.quotation.sku}}
          <br>
              วันที่ {{ thai(datas.quotation.created_at)}} 
              
          <br>
              รหัสลูกค้า  {{datas.quotation.member.sku}}
            </p>
          </v-col>
        </v-row>
      </v-card> 

      <v-card elevation="0" class="ma-1">
        <v-row no-gutters>
          <v-col cols="4">
            <v-card elevation="0" class="pa-2">
              <small>
                <h3>
                  ข้อมูลลูกค้า
                </h3>
                <p>
                  <span  v-if="datas.quotation.member.shop">
                      {{datas.quotation.member.shop}} <br>
                  </span>
                  คุณ{{ datas.quotation.member.name }} 
                  {{ datas.quotation.member.surname }} <br> 
                  {{ address(datas.quotation.member) }} 
                  <br>
                  <b> โทร </b>{{datas.quotation.member.phone}}, {{datas.quotation.member.phone2}} <br>
                  <b> เลขประจำตัวผู้เสียภาษี</b> {{datas.quotation.member.tradenumber}}
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
                   คุณ{{datas.quotation.member.contact[0].name}} {{datas.quotation.member.contact[0].surname}}
                  <br>
                  <b> โทร</b> {{datas.quotation.member.phone}}<br>
                  <b> อีเมล์</b> {{datas.quotation.member.email}} <br>
                  <b> ไลน์ไอดี</b> {{datas.quotation.member.line}}<br> 
                </p>
              </small>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card elevation="0" class="pa-2">
              <small>
                <h3>
                  สถานที่จัดส่งสินค้า
                </h3> 
                <p>
                  ชื่อผู้ติดต่อ คุณ{{datas.quotation.member.shipping.name}}
                  <br>
                  <b> โทร</b> {{datas.quotation.member.shipping.phone}} <br>
                  <b>ที่อยู่จัดส่ง</b> {{datas.quotation.member.shipping.address}} <br>
                </p>
              </small>
            </v-card>
          </v-col>
        </v-row>
      </v-card> 
 <v-simple-table dense>
        <template v-slot:default >
          <thead>
            <tr>
              <th class="text-center font-weight-black"  >รหัส <br><small>Code</small></th>
              <th class="text-center font-weight-black"  >รุ่น <br><small>Model</small></th>
              <th class="text-center font-weight-black"  >รายละเอียด <br><small>Description</small></th>
              <th class="text-center font-weight-black"  >หน่วย <br><small>Unit</small></th>
              <th class="text-center font-weight-black"  >ราคา <br><small>ปกติ</small></th>
              <th class="text-center font-weight-black"  >ราคา <br><small>ตัวแทน</small></th>
              <th class="text-center font-weight-black"  >จำนวน <br><small>Price</small></th>
              <th class="text-center font-weight-black"  >รวมเงิน <br><small>Amount</small></th>
              <th class="text-center font-weight-black" >กำไร <br><small>Profit</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in datas.quotation.quotation_product" :key="item.sku" class="caption">
              <td>{{ item.code }}</td>
              <td>{{ item.sku }}</td>
              <td class="text-left">{{ item.name }}</td>
              <td class="text-center">{{ item.unit.name }}</td>
              <td class="text-center">{{ item.e_price }}</td>
              <td class="text-center">{{ item.m_price }}</td>
              <td class="text-center">{{ item.qty }}</td>
              <td class="text-center">{{ item.amount }}</td>
              <td class="text-center">{{ item.profit }}</td>
            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">รวมเงิน</th>
              <th class="text-right" width="60">{{ datas.quotation.total }}</th>
              <th rowspan="4" class="text-center" width="60">{{ datas.quotation.profit }}</th>
            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">ค่าขนส่ง</th>
              <th class="text-right" width="60">{{ datas.quotation.shipping }}</th>

            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">ส่วนลดพิเศษ</th>
              <th class="text-right" width="60">{{ datas.quotation.discount }}</th>

            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">จำนวนเงินรวมสุทธิ</th>
              <th class="text-right" width="60">{{ datas.quotation.grandtotal }}</th>

            </tr>
          </tbody>
        </template> 
      </v-simple-table> 
       
       <v-card elevation="0" class="mt-12 pt-12">
         <v-row class="text-center">
           <v-col cols="3">
            <small> ผู้จัดส่งสินค้า/Distribution</small>
             <br><br><br>
             <v-row>
               <v-col>(</v-col>
               <v-col></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ........./........../..........</small>
           </v-col>
           <v-col cols="3">
             <small>ผู้รับเงินCashier</small>
              <br><br><br>
             <v-row>
               <v-col>(</v-col>
               <v-col></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ........./........../..........</small>
           </v-col>
           <v-col cols="3">
             <small>ผู้ส่งสินค้า/Delivered</small>
              <br><br><br>
            <v-row>
               <v-col>(</v-col>
               <v-col  ></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ........./........../..........</small>
           </v-col>
           <v-col cols="3">
             <small>ผู้รับสินค้า/Received By</small>
              <br><br><br>
            <v-row>
               <v-col>(</v-col>
               <v-col  ></v-col>
               <v-col>)</v-col>
             </v-row>
             <small>วันที่ ........./........../..........</small>
           </v-col>
         </v-row>
       </v-card>

    </v-card>    
  </div>
</template>


<script>    
import Admin from '@/Models/Admin'  

  export default { 
       data: () => ({  
            title: "ตัวแทนจำหน่าย", 
            API: 'https://tadmin.carwashsupply.co.th',  
            cates: [], 
            discount: '0',
            cws: [], 
      }), 
    props: {
        datas: Object
    },  
    computed: {    
            Admins() {  return Admin.all(); },  
            total() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price) || 0)}, 0)
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
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.e_price) - (c.qty*c.m_price) || 0)}, 0)
            }, 
        },
    methods: {   
        grandtotal() {
          return Number(this.total + this.shipping - this.discount)
        },   
        profits(){
          return Number(Number(this.profit) +  Number(this.discount))
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
        async loadDataCWS() {   
            try { 
                const response = await fetch(this.API+'/api/v1/agent/cws')
                const data = await response.json()
                this.cws = data.success.data   
            } catch (error) {
                console.error(error)
            }
        },  
        async save() {   
            var obj = 
                { 
                    cart: this.Carts, 
                    member: this.gmember,
                    order: {
                        member_id: this.gmember.id,
                        agent_id: this.Admins[0].id,
                        discount: this.discount,
                        profit: this.profits(),
                        total: this.total, 
                        shipping: this.shipping, 
                        grandtotal: this.grandtotal(), 
                    } 
                }
            try {   
                // Create request to api service
                const req = await fetch(this.API+"/api/v1/agent/quotation", {
                    method: 'POST',  
                    body: JSON.stringify(obj),
                }); 
                const res = await req.json();
                console.log(res)
                this.$router.push({ path: 'Dashboard' }, () => {})   
            } catch (error) { 
                console.error(error) 
            }
        },  
        thai(data){   
            var monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];  
            var d = new Date(data); 
            return    d.getDate() + " " + monthNamesThai[d.getMonth()] + "  " + Number(d.getFullYear()+543)
        },
    }, 
    created() {     
      this.loadDataCWS()    
    },
  }
</script> 