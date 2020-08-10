<template>
  <section>
    <AppBar :title="title"></AppBar>
    <v-card outline tite elevation="1" max-width="900" class="pa-5 pb-12 mb-12">
      <v-card elevation="0" class="ma-3">
        <v-row>
          <v-col cols="8">
            <v-row no-gutters>
              <v-col cols="3">
<v-img src="@/assets/logo-2.png" max-width="120"></v-img>
            </v-col>
            <v-col cols="6" class="font-weight-bold button pl-2 pt-1">
             <v-card max-width="250" elevation="0">
                <small>บริษัท แมกซ์ อีเลคตริค เวิลด์ จำกัด<br>
              เลขที่ 77/9 หมู่ที่ 7 ต.บ้านเก่า อ.พานทอง จ.ชลบุรี 20160  <br>
              เลขประจำตัวผู้เสียภาษีอากร
              0205544001438
              <br>
             โทร 
              081-996-0254,038-156080
              </small>
             </v-card>
            </v-col> 
            </v-row>  
          </v-col> 

          <v-col class="4 text-right">
            <h2>ใบสั่งซื้อ</h2>
            <h3>Purchase Order</h3>
            <p class="caption font-weight-bold">
              เลขที่ใบสั่งซื้อ  CP-63-0001
          <br>
              วันที่ 13 มี.ย 2563
          <br>
              รหัสลูกค้า  M630001-002-D63001
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
                  บริษัท แมกซ์ อีเลคตริค เวิลด์ จำกัด
                  <br>
                  เลขที่ 77/9 หมู่ที่ 7 ต.บ้านเก่า อ.พานทอง จ.ชลบุรี 20160 <br>
                  <b> โทร</b> 081-996-0254,038-156080 <br>
                  <b> เลขประจำตัวผู้เสียภาษี</b> 0205544001438
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
                  นายสุวัลลภ สังข์ศรี
                  <br>
                  <b> โทร</b> 081-996-0254 <br>
                  <b> อีเมล์</b> 0205544001438 <br>
                  <b> ไลน์ไอดี</b> 0819966254<br>
                  <b> Instagram</b> <br>
                  <b> Facebook</b>
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
                  บริษัท แมกซ์ อีเลคตริค เวิลด์ จำกัด
                  <br>
                  <b> โทร</b> 081-996-0254 <br>
                  <b>ที่อยู่</b> เลขที่ 77/9 หมู่ที่ 7 ต.บ้านเก่า อ.พานทอง จ.ชลบุรี 20160 <br>
                </p>
              </small>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center font-weight-black" width="120">รหัส <br> Code</th>
              <th class="text-center font-weight-black" width="140">รุ่น <br>Model</th>
              <th class="text-center font-weight-black" width="500">รายละเอียด <br>Description</th>
              <th class="text-center font-weight-black" width="50">หน่วย <br>Unit</th>
              <th class="text-center font-weight-black" width="50">M <br>Member</th>
              <th class="text-center font-weight-black" width="50">C <br>Agent</th>
              <th class="text-center font-weight-black" width="60">จำนวน <br>Price</th>
              <th class="text-center font-weight-black" width="60">รวมเงิน <br>Amount</th>
              <th class="text-center font-weight-black" width="60">กำไร <br>Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in Carts" :key="item.name" class="small">
              <td>{{ item.code }}</td>
              <td>{{ item.sku }}</td>
              <td class="text-left">{{ item.name }}</td>
              <td class="text-center">{{ item.unit.name }}</td>
              <td class="text-center">{{ Number(item.m_price).toLocaleString() }}</td>
              <td class="text-center">{{ Number(item.c_price).toLocaleString() }}</td>
              <td class="text-center">{{ Number(item.qty).toLocaleString() }}</td>
              <td class="text-center">{{ Number(item.qty * item.c_price).toLocaleString() }}</td>
              <td class="text-center">
                {{ Number(Number(item.m_price * item.qty) - Number(item.c_price * item.qty)).toLocaleString() }}</td>
            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">รวมเงิน</th>
              <th class="text-right" width="60">{{Number(total).toLocaleString()}}</th>
              <th rowspan="4" class="text-center" width="60">{{ profits().toLocaleString()}}</th>
            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">ค่าขนส่ง</th>
              <th class="text-right" width="60">{{Number(shipping).toLocaleString()}}</th>

            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">ส่วนลดพิเศษ</th>
              <th class="text-right" width="60"><input type="text" class="inputDiscount" v-mask="'######'"
                  v-model="discount"></th>

            </tr>
            <tr>
              <th colspan="7" class="text-right" width="60">จำนวนรวมสุทธิ</th>
              <th class="text-right" width="60">{{ grandtotal().toLocaleString() }}</th>

            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </section>
</template>


<script>   
import AppBar from '@/components/AppBar' 
import Cart from '@/Models/Cart'

  export default { 
       data: () => ({  
            title: "ตัวแทนจำหน่าย", 
            API: 'https://tadmin.carwashsupply.co.th',  
            cates: [], 
            discount: '0'
      }),
     components: {
      AppBar,  
    },
    computed: {    
            Carts() {  return Cart.all(); },   
            total() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.c_price) || 0)}, 0)
            },
            member() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.c_price) || 0)}, 0)
            },
            shipping() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.shipping) || 0)}, 0) + Number('40')
            },
            profit() {
              return this.Carts.reduce(function(a, c){
                return a + Number((c.qty*c.m_price) - (c.qty*c.c_price) || 0)}, 0) + 40
            }, 
        },
    methods: {  
        grandtotal() {
          return Number(this.total + this.shipping - this.discount)
        },   
        profits(){
          return Number(Number(this.profit) +  Number(this.discount))
        }, 
    },
    created() {         
    },
  }
</script>
 