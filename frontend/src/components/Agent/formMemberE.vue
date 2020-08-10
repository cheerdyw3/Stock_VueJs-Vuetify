<template>
        <v-col class="pa-0 ma-0">
            <v-form ref="form" v-model="valid" lazy-validation :disabled="true"> 
            <v-row>
                 <v-col  >
                  <v-radio-group
                    v-model="form.committee"
                    :disabled="!save"  
                    >
                    
                     <div  @click="InsertdataFormA(dataFormA)">
<v-radio  :label="`ทีอยู่ตาม ชื่อกิจการและชื่อเจ้าของกิจการ`" ></v-radio> 
                    </div> 

                    <div v-for="(item,i) in Committees" :key="i" @click="InsertdataFormB(item)">
<v-radio  :label="`ทีอยู่ตาม กรรมการคนที่ ${i+1}`" ></v-radio> 
                    </div>  

                    <div  @click="InsertdataFormC()">
<v-radio  :label="`ทีอยู่อื่นๆ`" ></v-radio> 
                    </div>  
                    
</v-radio-group>
 
            </v-col>
            </v-row> 

                <v-row no-gutters>
                    
                        <v-col cols="2" class="mt-2">
                            <span>ชื่อผู้ติดต่อคนที่ 1</span>
                        </v-col>
                        <v-col cols="8">
                            <v-row>
                                <v-col class="my-0 py-0" cols="6">
                                    <v-text-field dense outlined  label="ชื่อ-สกุล*" v-model="form.name" :rules="Rules.nameRules" :disabled="!save" required></v-text-field>
                                </v-col>
                                <v-col class="my-0 py-0" cols="6">
                                    <v-text-field dense outlined   label="โทรศัพท์*" v-mask="'0##-###-####'" v-model="form.phone" :rules="Rules.phoneRules" :disabled="!save" required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="2"></v-col> 
                </v-row>
                 <v-row>
                        <v-col class="my-0 py-0" cols="12">
                            <v-text-field dense outlined  label="ที่อยู่*" v-model="form.address" :rules="Rules.addressRules" :disabled="!save" required></v-text-field>
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

                            <v-btn color="error" class="mr-4" :disabled="!save" @click="dataFormE()">
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
import Committee from '@/Models/Committee'
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
                'FormE': true,  
                'name': '',   
                'address': '', 
                'phone': '',  
                'imagemap': null,
                'brands': [], 
            },
            Rules: {   
                'nameRules': [v => !!v || 'กรุณากรอก ชื่อผู้ติดต่อคนที่ 1'], 
                'addressRules': [v => !!v || 'กรุณากรอก ที่อยู่'],  
                'phoneRules': [v => !!v || 'กรุณากรอก เบอร์โทรศัพท์', v => (v && v.length == 12)],  
            },
            files: new FormData()
        }), 
        props: {
            dataFormA: Object,
            dataFormD: Object,
        },  
         computed: { 
            Committees() {  return Committee.all(); }, 
        },
        methods: { 
            dataFormE() {  
                if(this.$refs.form.validate()){
                    this.$emit('dataFormE',this.form)
                    this.save = false
                    this.edit = true
                } 
            }, 
            Edit(){
                this.save = true
                this.edit = false
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
            InsertdataFormB(data){  
                    console.log(data) 
                    this.form.address = ""
                    this.form.name = data.name
                    this.form.phone = data.phone  
 
                    if(data.village){  this.form.address +=  data.village }
                    if(data.floor){  this.form.address +=  ' ชั้น '+ data.floor }
                    if(data.roomnumber){  this.form.address +=  ' ห้องเลขที่ '+ data.roomnumber }
                    if(data.houseon){  this.form.address +=  ' บ้านเลขที่ '+ data.houseon }
                    if(data.villageno){  this.form.address +=  ' หมู่ที่ '+ data.villageno }
                    if(data.alley){  this.form.address +=  ' ตรอก/ซอย'+ data.alley }
                    if(data.road){  this.form.address +=  ' ถนน'+ data.road }
                    if(data.subdistrict){  this.form.address +=  ' ตำบล'+ data.subdistrict }
                    if(data.district){  this.form.address +=  ' อำเภอ'+ data.district }
                    if(data.province){  this.form.address +=  ' จังหวัด'+ data.province }
                    if(data.postalcode){  this.form.address +=  ' รหัสไปรษณีย์ '+ data.postalcode }
                 
            }, 

            InsertdataFormA(data){ 
                console.log(data)
                 
                    this.form.address = "" 
                    this.form.name = data.shop  
                    if(data.village){  this.form.address +=  data.village }
                    if(data.floor){  this.form.address +=  ' ชั้น '+ data.floor }
                    if(data.roomnumber){  this.form.address +=  ' ห้องเลขที่ '+ data.roomnumber }
                    if(data.houseon){  this.form.address +=  ' บ้านเลขที่ '+ data.houseon }
                    if(data.villageno){  this.form.address +=  ' หมู่ที่ '+ data.villageno }
                    if(data.alley){  this.form.address +=  ' ตรอก/ซอย'+ data.alley }
                    if(data.road){  this.form.address +=  ' ถนน'+ data.road }
                    if(data.subdistrict){  this.form.address +=  ' ตำบล'+ data.subdistrict }
                    if(data.district){  this.form.address +=  ' อำเภอ'+ data.district }
                    if(data.province){  this.form.address +=  ' จังหวัด'+ data.province }
                    if(data.postalcode){  this.form.address +=  ' รหัสไปรษณีย์ '+ data.postalcode }
                    /*
                    this.form.address = data.village+' '+data.floor+' '+ data.roomnumber+' '+data.houseon+' '+data.+' '+data.
                    +' '+data.+' '+data.+' '+data.+' '+data.  */
                    this.form.phone = data.phone
                    this.form.taxid = data.tradenumber   
                
            }, 

            InsertdataFormC(){   
                    this.form.address = "" 
                    this.form.name = "" 
                    this.form.phone = ""
                    this.form.taxid = ""
                
            }, 
           
        }
    }
</script>