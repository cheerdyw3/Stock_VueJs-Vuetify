<template>
    <v-content>
        <v-card width="1000" class="mx-auto px-5 elevation-3">
            <v-container class="fill-height" fluid>
                <v-row>
                    <v-col align="center" justify="center">
                        <h2>ลงทะเบียนสมาชิก</h2>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12">
                        1.ชื่อกิจการและชื่อเจ้าของกิจการ (ใช้ในการจัดส่งเอกสารทุกชนิด)
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-3">
                    <formMemberA @dataFormA="dataFormA($event)"></formMemberA>
                </v-row>

            </v-container>
        </v-card>

        <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3">
            <v-container class="fill-height" fluid> 
                <v-row no-gutters>
                    <v-col cols="12" class="d-flex">
                        2.รายชื่อผู้ติดต่อ 
                    </v-col>
                </v-row>
                <formMemberB :dataFormA="data.dataA" @dataFormB="dataFormB($event)"  v-if="form.FormA"></formMemberB>
            </v-container>
        </v-card>

        <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3">
            <v-container class="fill-height" fluid>
                <v-row no-gutters>
                    <v-col cols="12" class="d-flex">
                        3.ชื่อที่อยู่ในการออก "ใบส่งสินค้า ใบกำกับภาษี ใบเสร็จรับเงิน" (ใช้ในการจัดส่งเอกสารทุกชนิด) 
                    </v-col>
                </v-row>
                <formMemberC :dataFormA="data.dataA" @dataFormC="dataFormC($event)"  v-if="form.FormB"></formMemberC>
            </v-container>
        </v-card>

        <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3" >
            <v-container class="fill-height" fluid>
                <v-row no-gutters>
                    <v-col cols="12">
                        4. ชื่อและที่อยู่ในการจัดส่งสินค้า 
                    </v-col>
                </v-row>
            <formMemberD :dataFormA="data.dataA" :dataFormC="data.dataC" @dataFormD="dataFormD($event)" v-if="form.FormC"></formMemberD>
             </v-container>
        </v-card>
        <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3" >
               <v-container class="fill-height" fluid>
                <v-row no-gutters>
                    <v-col cols="12">
                        5.เอกสารประกอบการสมัครเป็นตัวแทนจำหน่ายประเภท "บุคคลธรรมดา"
                    </v-col>
                </v-row> 
            <formMemberE @dataFormE="dataFormE($event)" v-if="form.FormD"></formMemberE> 
             </v-container>
        </v-card> 
         <v-row  v-if="form.FormE" >
             
                        <v-col>
                        <div class="text-center align-center"> 
                             <v-btn 
      color="primary"
      class="ma-2 white--text"
      @click="sendData()"

    >
      ส่งข้อมูล
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
                        </div>
                    </v-col>
                    </v-row>


                      <v-dialog
      v-model="dialog"
      
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text class="text-center pa-3">
         ระบบกำลังบันทึกข้อมูล
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    </v-content>
</template>

<script>  
import formMemberA from '@/components/Member/formMemberA' 
import formMemberB from '@/components/Member/formMemberB'
import formMemberC from '@/components/Member/formMemberC'
import formMemberD from '@/components/Member/formMemberD'
import formMemberE from '@/components/Member/formMemberE' 

import Branch from '@/Models/Branch'

  export default {
    data: () => ({
        API: 'https://tadmin.carwashsupply.co.th', 
        dialog: false,
        form: {
            FormA: false,
            FormB: false,
            FormC: false,
            FormD: false,
            FormE: false,
        },
        data: {
            dataA: '',
            dataB: '',
            dataC: '',
            dataD: '',
            dataE: '',
        },
        files: new FormData(),
        group: ''
    }), 
     components: {
      formMemberA, formMemberB, formMemberC, formMemberD, formMemberE,
    },
    methods: {
        dataFormA(data) {
            console.log(data) 
            this.form.FormA = data.FormA
            this.data.dataA = data
        },
        dataFormB(data) {
            console.log(data)
            this.form.FormB = data.FormB
            this.data.dataB  = data
        },
        dataFormC(data) {
            console.log(data)
            this.form.FormC = data.FormC
            this.data.dataC  = data
        },
        dataFormD(data) {
            console.log(data)
            this.form.FormD = data.FormD
            this.data.dataD  = data
        },
        dataFormE(data) {
            console.log(data)
            this.form.FormE = data.FormE
            this.data.dataE  = data
        },
        async sendData() {  
            this.dialog = true;
            this.data.dataBranch = Branch.all();
            try {
              // Create request to api service
              const req = await fetch(this.API+"/api/v1/register", {
                  method: 'POST',  
                  body: JSON.stringify(this.data),
              }); 
              const res = await req.json();
              console.log(res.success) 
              this.group = res.success
              this.dialog = false; 
              this.$router.push({ path: 'RegisterComplete' }, () => {})
          }catch(err) {
              console.error(`ERROR: err`);
          }
 
        },
    }
  }
</script>