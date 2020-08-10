<template>
        <v-col class="pa-0 ma-0">
            <v-form ref="form" v-model="valid" lazy-validation> 
            <v-row>
                <v-col cols="12" class="py-0 my-0 mt-5" @click="InsertdataA(dataFormA)"> 
                    <v-checkbox  
                            label="ข้อมูลเดียวกับชื่อกิจการและเจ้าของกิจการ" class="pa-0 ma-0 mb-2" v-model="insert" value="A" :disabled="!save"  hide-details=true>
                        </v-checkbox>
                         
                </v-col>
                
                <v-col cols="12" class="py-0 my-0" @click="InsertdataC(dataFormC)"> 
                        <v-checkbox  
                            label='ข้อมูลเดียวกับชื่อที่อยู่ในการออก "ใบส่งสินค้า ใบกำกับภาษี ใบเสร็จรับเงิน"'
                            class="pa-0 ma-0"  v-model="insert" value="B" :disabled="!save"  hide-details=true></v-checkbox>
                </v-col>
            </v-row>
            <v-row class="mt-4">
                    <v-col class="my-0 py-0" cols="4">
                        <v-checkbox label="สำนักงานใหญ่" v-model="mainoffice" class="pa-0 ma-0"></v-checkbox>
                    </v-col> 
                </v-row>

                <v-row no-gutters>
                    
                        <v-col cols="2" class="mt-2">
                            <span>ชื่อผู้ติดต่อ</span>
                        </v-col>
                        <v-col cols="8">
                            <v-row>
                                <v-col class="my-0 py-0" cols="6">
                                    <v-text-field dense outlined  label="ชื่อ-สกุล" v-model="form.name" :rules="Rules.nameRules" :disabled="!save" required></v-text-field>
                                </v-col>
                                <v-col class="my-0 py-0" cols="6">
                                    <v-text-field dense outlined   label="โทรศัพท์" v-mask="'0##-###-####'" v-model="form.phone" :rules="Rules.phoneRules" :disabled="!save" required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="2"></v-col> 
                </v-row>
                 <v-row>
                        <v-col class="my-0 py-0" cols="12">
                            <v-text-field dense outlined  label="ที่อยู่" v-model="form.address" :rules="Rules.addressRules" :disabled="!save" required></v-text-field>
                        </v-col>
                    </v-row>  
                    <v-row no-gutters>
                    
                        <v-col cols="2" class="mt-1">
                            <span>รูปภาพแผนที่ตั้งร้าน</span>
                        </v-col>
                        <v-col cols="8">
                            <v-row>
                                <v-col class="my-0 py-0" cols="6">
                                     <input type="file" name="file" :disabled="!save"  v-on:change="fileChangeA($event.target.files)" >
                                     <v-img v-if="form.imagemap" :src="`${API}/public/images/member/${form.imagemap}`" class="mx-auto ma-3"  max-width="200"></v-img> 
                                </v-col> 
                            </v-row>
                        </v-col>
                        <v-col cols="2"></v-col> 
                </v-row>
                <v-row class="d-none">
                    <v-col>
                        <div>
                            <v-btn color="success" class="mr-4" @click="addItem()">
                                + เพิ่มสาขา
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
 
                <div>
                    <v-row class="mt-4"  v-for="(brand,index) in form.brands" :key="index">
                        <v-col class="my-0 py-0" cols="4" >  
                            <v-text-field dense outlined v-model="brand.name" :disabled="!save" label="ชื่อสาขา">
                            </v-text-field>
                        </v-col>
                        <v-col class="my-0 py-0" cols="7" >
                             แผนที่ตั้งสาขา
                                <input type="file" name="file" :disabled="!save" >
                        </v-col>
                        <v-col cols="1">
                            <v-btn color="error" class="mt-n3" :disabled="!save" @click="deleteItem(index)">
                                ลบ
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
                    <v-row>
                        <v-col>
                        <div class="text-center align-center">
                            <v-btn :disabled="!edit" color="success" class="mr-4" @click="Edit()" >
                                แก้ไข
                            </v-btn>

                            <v-btn color="error" class="mr-4" :disabled="!save" @click="dataFormD()">
                                บันทึก
                            </v-btn>
                        </div>
                    </v-col>
                    </v-row>
                

            </v-form>
            </v-col>
</template>

<script>
import axios from "axios"; 
    export default {
        data: () => ({ 
            API: 'https://tadmin.carwashsupply.co.th', 
            valid: true,
            shop: false,
            edit: false,
            save: true, 
            dataformA: false,
            insert: false,
            mainoffice: true,
            items: '',
            form: {
                'FormD': true,  
                'name': '',  
                'address': '',  
                'phone': '',  
                'imagemap': null,
                'brands': [], 
            },
            Rules: {   /*
                'nameRules': [v => !!v || 'กรุณากรอก ชื่อ'], 
                'addressRules': [v => !!v || 'กรุณากรอก ที่อยู่'],  
                'phoneRules': [v => !!v || 'กรุณากรอก เบอร์โทรศัพท์', v => (v && v.length == 12)], */ 
            },
            files: new FormData()
        }), 
        props: {
            dataFormA: Object,
            dataFormC: Object,
        },  
        methods: { 
            dataFormD() {  
                if(this.$refs.form.validate()){
                    this.$emit('dataFormD',this.form) 
                    this.save = false
                    this.edit = true
                } 
            }, 
            Edit(){
                this.save = true
                this.edit = false
            },
            InsertdataA(data){ 
                console.log(data)
                if(this.insert=='A'){
                    this.form.name = data.name+' '+data.surname 

                    this.form.address = ""  
                    if(data.village){  this.form.address +=  data.village }
                    if(data.floor){  this.form.address +=  ' ชั้น '+ data.floor }
                    if(data.roomnumber){  this.form.address +=  ' ห้องเลขที่ '+ data.roomnumber }
                    if(data.houseon){  this.form.address +=  ' บ้านเลขที่ '+ data.houseon }
                    if(data.villageno){  this.form.address +=  ' หมู่ที่ '+ data.villageno }
                    if(data.road){  this.form.address +=  ' ถนน '+ data.road }
                    if(data.subdistrict){  this.form.address +=  ' ตำบล'+ data.subdistrict }
                    if(data.district){  this.form.address +=  ' อำเภอ'+ data.district }
                    if(data.province){  this.form.address +=  ' จังหวัด'+ data.province }
                    if(data.postalcode){  this.form.address +=  ' '+ data.postalcode }
 
                    this.form.phone = data.phone  
                }else{
                    this.form.name = ''
                    this.form.address = ''
                    this.form.phone = '' 
                }
                
            }, 
            InsertdataC(data){ 
                console.log(data)
                if(this.insert=='B'){
                    this.form.name = data.name
                    this.form.address = data.address 
                    this.form.phone = data.phone  
                }else{
                    this.form.name = ''
                    this.form.address = ''
                    this.form.phone = '' 
                }
                
            }, 
            addItem(){
                this.form.brands.push({name:null,file:null}) 
            },
            deleteItem(index){
                this.form.brands.splice(index,1) 
            },
            fileChangeA(fileList) {
                this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imagemap = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
                 
            },
           
        }
    }
</script>