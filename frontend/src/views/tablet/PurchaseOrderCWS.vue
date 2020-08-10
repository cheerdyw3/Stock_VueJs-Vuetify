<template> 
<section>
  <AppBar :title="title"></AppBar>  
  <v-card  elevation="0">
    <v-list>
      <h3 class="body-1">เลือกรายการสินค้า</h3>
    </v-list>
  </v-card>
  
  <v-progress-linear v-if="preload"
      indeterminate
      color="blue darken-3"
    ></v-progress-linear>

  <v-card  elevation="0"
    v-scroll.self="onScroll"
    class="overflow-y-auto ma-0 pa-0"
    max-height="700"
  >  
       <v-card  outlined tile  elevation="2"  v-for="(item,i) in cates" :key="i" class="mb-5" max-width="900">
       <v-card-subtitle class="font-weight-black  ma-0 pa-0 pt-3 pl-4">
        {{item.name}}
       </v-card-subtitle> 
       <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center" width="120">รหัส</th> 
                    <th class="text-center" width="130">รุ่น</th>
                    <th class="text-center" width="500">รายละเอียด</th>
                    <th class="text-center" width="50">หน่วย</th>   
                    <th class="text-center" width="50">M</th> 
                    <th class="text-center" width="50">C</th>  
                    <th class="text-center" width="60">เลือก</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in item.products" :key="item.name">
                    <td>{{ item.code }}</td> 
                    <td>{{ item.sku }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.unit.name }}</td>  
                    <td class="text-center">{{ item.m_price }}</td> 
                    <td class="text-center">{{ item.c_price }}</td> 
                    <th class="text-right"> 
                       <input type="text" class="inputNumber" v-mask="'###'" v-on:change="event => insert(event,item)">
                    </th>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>  
     </v-card>  
  </v-card>

    <v-col  
        class="text-left"
        cols="12" absolute
      >
        <v-btn v-if="Carts.length" small color="primary" to="/PurchaseCompleteCWS">พิมพ์ใบสั่งซื้อ</v-btn> 
      </v-col>  
     
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
            cart: [],
            discount: '0', 
            preload: false,
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
        async loadData() {   
            this.preload = true
            try { 
                const response = await fetch(this.API+'/api/v1/catalogcate')
                const data = await response.json()
                this.cates = data.success.data   
                this.preload = false
            } catch (error) {
                console.error(error)
            }
        },    
        grandtotal() {
          return Number(this.total + this.shipping - this.discount)
        },   
        profits(){
          return Number(Number(this.profit) +  Number(this.discount))
        },
        insert(event,item){
          //console.log(event.target.value)
          if(event.target.value!=''){ 
              Cart.insert({
                  data: {  
                        id: item.id,
                        brand: item.brand,
                        c_price: item.c_price,
                        catalog_brand_id: item.catalog_brand_id,
                        catalog_cate_id: item.catalog_cate_id,
                        catalog_county_id: item.catalog_county_id,
                        catalog_unit_id: item.catalog_unit_id,
                        code: item.code,
                        county: item.county,
                        created_at: item.created_at,
                        d_price: item.d_price,
                        e_price: item.e_price, 
                        m_price: item.m_price,
                        name: item.name,
                        nh_price: item.nh_price,
                        seq: item.seq,
                        sku: item.sku,
                        t_price: item.t_price,
                        unit: item.unit,
                        updated_at: item.updated_at,
                        weight: item.weight,
                        shipping: item.shipping,  
                        qty: event.target.value,   
                  }
              }) 
          }else{
            Cart.delete(item.id)
          } 
         
        }, 
    },
    created() {        
      this.loadData() 
      Cart.deleteAll()
    },
  }
</script>
 