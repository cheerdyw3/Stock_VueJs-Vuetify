<template>
    <v-app>
        <AppBar :title="title"></AppBar>
        <v-content>
            <v-card width="1000" class="mx-auto px-5 elevation-3">
                <v-container class="fill-height" fluid>
                    <v-row>
                        <v-col align="center" justify="center">
                            <h2>ลงทะเบียนตัวแทนจำหน่าย</h2>
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
            <v-card width="1000" class="mx-auto mt-5 px-5 elevation-3">
                <v-container class="fill-height" fluid>
                    <v-row no-gutters>
                        <v-col cols="12">
                            2.ชื่อกรรมการผู้มีอำนาจ
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-3" v-for="(item,i) in Committees" :key="i">
                        <formMemberB :count="++i" :id="item.id" @dataFormB="dataFormB($event)" v-if="form.FormA">
                        </formMemberB>
                    </v-row>
                    <v-row v-if="form.FormA">
                        <v-col>
                            <div>
                                <v-btn color="success" class="mr-4" @click="addCommittee()">
                                    + เพิ่มกรรมการ
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>  
                </v-container>
            </v-card> 
            <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3">
                <v-container class="fill-height" fluid>
                    <v-row no-gutters>
                        <v-col cols="12" class="d-flex">
                            3.รายชื่อผู้ติดต่อ
                        </v-col>
                    </v-row>
                    <formMemberC :dataFormA="data.dataA" @dataFormC="dataFormC($event)" v-if="form.FormA"></formMemberC>
                </v-container>
            </v-card> 
            <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3">
                <v-container class="fill-height" fluid>
                    <v-row no-gutters>
                        <v-col cols="12" class="d-flex">
                            4.ชื่อที่อยู่ในการออก "ใบส่งสินค้า ใบกำกับภาษี ใบเสร็จรับเงิน"
                        </v-col>
                    </v-row>
                    <formMemberD :dataFormA="data.dataA" @dataFormD="dataFormD($event)" v-if="form.FormC"></formMemberD>
                </v-container>
            </v-card> 
            <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3">
                <v-container class="fill-height" fluid>
                    <v-row no-gutters>
                        <v-col cols="12" class="d-flex">
                            5.ชื่อและที่อยู่ในการจัดส่งสินค้า
                        </v-col>
                    </v-row>
                    <formMemberE :dataFormA="data.dataA" :dataFormD="data.dataC" @dataFormE="dataFormE($event)"
                        v-if="form.FormD"></formMemberE>
                </v-container>
            </v-card> 
            <v-card width="1000" class="mt-5 mx-auto px-5 elevation-3">
                <v-container class="fill-height" fluid>
                    <v-row no-gutters>
                        <v-col cols="12" class="d-flex">
                            6.เอกสารประกอบการสมัครเป็นตัวแทนจำหน่ายประเภท "นิติบุคคล"
                        </v-col>
                    </v-row>
                    <formMemberF @dataFormF="dataFormF($event)" v-if="form.FormE"></formMemberF>
                </v-container>
            </v-card> 
            <v-row v-if="form.FormE"> 
                <v-col>
                    <div class="text-center align-center">
                        <v-btn color="primary" class="ma-2 white--text" @click="sendData()">
                            ส่งข้อมูล
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row> 
            <v-dialog v-model="dialog" persistent width="300">
                <v-card color="primary" dark>
                    <v-card-text class="text-center pa-3">
                        ระบบกำลังบันทึกข้อมูล
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog> 
        </v-content>
    </v-app>
</template>

<script>  
import formMemberA from '@/components/Agent/formMemberA' 
import formMemberB from '@/components/Agent/formMemberB' 
import formMemberC from '@/components/Agent/formMemberC' 
import formMemberD from '@/components/Agent/formMemberD' 
import formMemberE from '@/components/Agent/formMemberE' 
import formMemberF from '@/components/Agent/formMemberF' 
import Committee from '@/Models/Committee'
import AppBar from '@/components/AppBar' 

  export default {
    data: () => ({
        API: 'https://tadmin.carwashsupply.co.th', 
        dialog: false,
        title: "ลงทะเบียนตัวแทนจำหน่าย",
        form: {
            FormA: false,
            FormB: false,
            FormC: false,
            FormD: false,
            FormE: false,
            FormF: false,
        },
        data: {
            dataA: '',
            dataB: '',
            dataC: '',
            dataD: '',
            dataE: '',
            dataF: '',
            dataM: '',
        },
        files: new FormData(),
        group: ''
    }), 
     components: {
      AppBar, formMemberA, formMemberB, formMemberC, formMemberD, formMemberE, formMemberF
    },
    computed: {    
            Committees() {  return Committee.all(); },  
        },
    methods: {
        dataFormA(data) { 
            this.form.FormA = data.FormA
            this.data.dataA = data
        },
        dataFormB(data) { 
            this.form.FormB = data.FormB 
        },
        dataFormC(data) {
            console.log(data)
            this.form.FormC = data.FormC
            this.data.dataB  = data
        },
        dataFormD(data) {
            console.log(data)
            this.form.FormD = data.FormD
            this.data.dataC  = data
        },
        dataFormE(data) {
            console.log(data)
            this.form.FormE = data.FormE
            this.data.dataD  = data
        },
        dataFormF(data) {
            console.log(data)
            this.form.FormF = data.FormF
            this.data.dataE  = data
        },
        async sendData() {  
            this.dialog = true;
            this.data.dataM = Committee.all()

            
            try {
              // Create request to api service
              const req = await fetch(this.API+"/api/v1/register/agent", {
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
        createCommittee(){
            Committee.deleteAll()
            Committee.insert({
                data: {  
                        title: '',  //นาย 
                        name: '',  //ชื่อ 
                        surname: '',  //นามสกุล 
                        idcard: '',  //เลขที่บัตรประชาชน  
                        village: '',  //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
                        floor: '',  //ชั้น
                        roomnumber: '',  //ห้องเลขที่
                        houseon: '',  //บ้านเลขที่ 
                        villageno: '',  //หมู่ที่
                        road: '',  //ถนน
                        subdistrict: '',  //ตำบล 
                        district: '',  //อำเภอ 
                        province: '',  //จังหวัด 
                        postalcode: '',  //รหัสไปรษณีย์ 
                        phone: '',  //โทรศัพท์ 
                        phone2: '',  //โทรศัพท์2
                        email: '',  //อีเมล 
                        line: '',  //ไลน์ 
                        ig: '',  //ไอจี
                        fb: '',  //facebook   
                }
            }) 
        }, 
        addCommittee(){ 
                Committee.insert({
                    data: {  
                            title: '',  //นาย 
                            name: '',  //ชื่อ 
                            surname: '',  //นามสกุล 
                            idcard: '',  //เลขที่บัตรประชาชน  
                            village: '',  //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
                            floor: '',  //ชั้น
                            roomnumber: '',  //ห้องเลขที่
                            houseon: '',  //บ้านเลขที่ 
                            villageno: '',  //หมู่ที่
                            road: '',  //ถนน
                            subdistrict: '',  //ตำบล 
                            district: '',  //อำเภอ 
                            province: '',  //จังหวัด 
                            postalcode: '',  //รหัสไปรษณีย์ 
                            phone: '',  //โทรศัพท์ 
                            phone2: '',  //โทรศัพท์2
                            email: '',  //อีเมล 
                            line: '',  //ไลน์ 
                            ig: '',  //ไอจี
                            fb: '',  //facebook   
                    }
                }) 
            },
    },
    created() {    
      this.createCommittee()   
    },
  }
</script>