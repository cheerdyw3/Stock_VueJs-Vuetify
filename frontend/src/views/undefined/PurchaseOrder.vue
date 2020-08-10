<template> 
<section> 
  <div >
  <v-card elevation="0" ><h1>เปิดใบสั่งซื้อให้ CWS</h1>
  </v-card>
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
                    <th class="text-center" width="160">รุ่น</th>
                    <th class="text-center" width="500">รายละเอียด</th>
                    <th class="text-center" width="50">หน่วย</th>   
                    <th class="text-center" width="50">M</th> 
                    <th class="text-center" width="50">{{memberType}}</th>  
                    <th class="text-center" width="60">เลือก</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in item.products" :key="item.name">
                    <td>{{ item.code }}</td> 
                    <td>{{ item.sku }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.unit.name }}</td>  
                    <td class="text-center">{{ Number(item.m_price).toLocaleString() }}</td> 
                    <td class="text-center">{{ Number(Price(item)).toLocaleString() }}</td> 
                    <th class="text-right"> 
                       <input type="text" class="inputNumber" v-mask="'###'" v-on:change="event => insert(event,item)"  @keyup.enter="Create()">
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
        <v-btn v-if="Carts.length" small color="primary" @click="Create()">พิมพ์ใบสั่งซื้อ</v-btn> 
      </v-col>  
      
     </div> 
    

     <v-dialog v-model="dialogData" fullscreen hide-overlay transition="dialog-bottom-transition">
   
      <v-card>
        <v-toolbar dark dense color="primary">
          <v-btn icon dark @click="dialogDataClose()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>ปิดหน้าต่าง</v-toolbar-title>
          <v-spacer></v-spacer>
          
        </v-toolbar>
          <v-card> 
               <PurchaseOrderC :cws="cws" :memberType="memberType" :Carts="Carts" @back="back($event)"></PurchaseOrderC>
          </v-card>
      </v-card>
    </v-dialog>

</section>
 
</template>


<script>    
import Cart from '@/Models/Cart'
import PurchaseOrderC from '@/components/PurchaseOrderC'  
import Admin from '@/Models/Admin'

  export default { 
       data: () => ({   
            API: 'https://tadmin.carwashsupply.co.th',  
            cates: [],
            cart: [],
            members: [],
            membersID: [],
            discount: '0', 
            preload: false,
            dialog: true,
            FormSelect: false,
            selectMember: '',
            sku: '',
            memberType: '',
            dialogData: false,
            dialogDetail: [],
            skuError: false,
            cws: [],

      }),
       components: {
        PurchaseOrderC,  
      },
    computed: {   
        Admins() { return Admin.query().first(); }, 
        Carts() {  return Cart.all(); },    
        member() {
            return this.Carts.reduce(function(a, c){
            return a + Number((c.qty*c.c_price) || 0)}, 0)
        }, 
        },
    methods: { 
       Create(){ 
        this.dialogData =  true 
      },
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
         async loadMember() {     
            try { 
                const response = await fetch(this.API+'/api/v1/controller/member')
                const data = await response.json()
                this.members = data.success.data  
            } catch (error) {
                console.error(error)
            }
        },      
        Price(item){ 
          var price = ''
          if(this.memberType == 'D'){
            price = item.d_price
          } 
          if(this.memberType == 'C'){
            price = item.c_price
          } 
          if(this.memberType == 'N'){
            price = item.nh_price
          } 
          if(this.memberType == 'H'){
            price = item.nh_price
          } 
          if(this.memberType == 'T'){
            price = item.t_price
          } 
          return price
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
                        price: this.Price(item),
                        amount: Number(this.Price(item) * event.target.value), 
                        profit:  Number(item.m_price * event.target.value) - Number(this.Price(item) * event.target.value),  
                  }
              }) 
          }else{
            Cart.delete(item.id)
          } 
         
        }, 
        dialogDataClose(){
          this.dialogData = false 
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
        back(){
          this.dialogData = false
        },
    },
    created() {        
      this.loadData()   
      this.loadDataCWS()   
      Cart.deleteAll()  
      this.memberType = this.Admins.sku.substr(0, 1)
    },
  }
</script>
 