<template>
       <v-col class="pa-0 ma-0">
           <v-form ref="form" v-model="valid" lazy-validation> 
                
                <v-row no-gutters class="mt-5">
                    <v-col cols="12">
                        6.1 ใบ กพ.20
                    </v-col>
                    <v-col cols="6" class="pr-2"> 
                        <v-card class="text-center justify-center  align-center pa-2">
                           <input type="file" name="file" :disabled="!save"  v-on:change="fileChangeC($event.target.files)" >
                            <v-img v-if="form.imageC" :src="`${API}/public/images/member/${form.imageC}`" class="mx-auto ma-3"  max-width="200"></v-img>  
                        </v-card>
                    </v-col>

                </v-row>

                <v-row no-gutters class="mt-5">
                    <v-col cols="12">
                        6.2 รูปถ่ายหน้าร้านจำนวน 1 ภาพ
                    </v-col>
                    <v-col cols="6" class="pr-2"> 
                       <v-card class="text-center justify-center  align-center pa-2">
                           <input type="file" name="file" :disabled="!save"  v-on:change="fileChangeD($event.target.files)" >
                            <v-img v-if="form.imageD" :src="`${API}/public/images/member/${form.imageD}`" class="mx-auto ma-3"  max-width="200"></v-img>  
                        </v-card>
                    </v-col>

                </v-row>

                <v-row no-gutters class="mt-5">
                    <v-col cols="12">
                        6.3 รูปถ่ายหน้าสมุดบัญชีจำนวน 1 ภาพ
                    </v-col>
                    <v-col cols="6" class="pr-2"> 
                       <v-card class="text-center justify-center  align-center pa-2">
                           <input type="file" name="file" :disabled="!save"  v-on:change="fileChangeE($event.target.files)" >
                            <v-img v-if="form.imageE" :src="`${API}/public/images/member/${form.imageE}`" class="mx-auto ma-3"  max-width="200"></v-img>  
                        </v-card>
                    </v-col>

                </v-row>
                <v-row no-gutters class="mt-5">
                    <v-col cols="12">
                        6.4 รูปถ่ายโลโก้ร้านจำนวน 1 ภาพ
                    </v-col>
                    <v-col cols="6" class="pr-2"> 
                       <v-card class="text-center justify-center  align-center pa-2">
                           <input type="file" name="file" :disabled="!save"  v-on:change="fileChangeF($event.target.files)" >
                            <v-img v-if="form.imageF" :src="`${API}/public/images/member/${form.imageF}`" class="mx-auto ma-3"  max-width="200"></v-img>  
                        </v-card>
                    </v-col>

                </v-row>

                 <v-row>
                        <v-col>
                        <div class="text-center align-center">
                            <v-btn :disabled="!edit" color="success" class="mr-4" @click="Edit()" >
                                แก้ไข
                            </v-btn>

                            <v-btn color="error" class="mr-4" :disabled="!save" @click="dataFormF()">
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
            form: { 
                'FormE': true,   
                'imageA': null,
                'imageB': null,
                'imageC': null,
                'imageD': null,
                'imageE': null,
                'imageF': null,
            },
            Rules: {   
                'imageDataFRules': [v => !!v || 'กรุณาส่ง รูปภ่ายบัตรประชาชนตัวจริง หน้า'],
                'imageDataBRules': [v => !!v || 'กรุณาส่ง รูปภ่ายบัตรประชาชนตัวจริง หลัง'],
                'imageDataCRules': [v => !!v || 'กรุณาส่ง บทะเบียนการค้า'],
                'imageDataSRules': [v => !!v || 'กรุณาส่ง รูปถ่ายหน้าร้านจำนวน 1 ภาพ'],  
            },
            image: '', 
            imageA: '',
            imageB: '',
            imageC: '',
            imageD: '',
            imageE: '',
            imageF: '',
            files: new FormData()
        }),   
        methods: {
            dataFormF() {  
                if(this.$refs.form.validate()){
                    this.$emit('dataFormF',this.form)
                    this.save = false
                    this.edit = true
                } 
            }, 
            Edit(){
                this.save = true
                this.edit = false
            },     
            fileChangeA(fileList) {
                this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imageA = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
                 
            },
            fileChangeB(fileList) {
                 this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imageB = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
            },
            fileChangeC(fileList) {
                 this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imageC = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
            },
            fileChangeD(fileList) {
                this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imageD = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
            }, 
            fileChangeE(fileList) {
                this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imageE = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
            }, 
            fileChangeF(fileList) {
                this.files.append("file", fileList[0], fileList[0].name);
                axios({ method: "POST", "url": this.API+"/api/v1/upload", "data": this.files }).then(result => {  
                    this.form.imageF = result.data.success.imageName 
                }, error => {
                    console.error(error);
                });
            }, 
        }
    }
</script>