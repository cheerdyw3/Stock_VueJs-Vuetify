<template> 
<v-card elevation="0">
            <v-row>
                <v-col align="center" justify="center">
                    <v-img src="@/assets/logo.png" width="400"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col align="center" justify="center">
                    <v-btn-toggle>
                        <v-btn tile color="#1e63bf" dark width="280" to="/RegisterMember">
                            <h3>ลงทะเบียนสมาชิก</h3>
                        </v-btn> 
                        <v-btn tile color="#042772" dark width="280" to="/RegisterAgent">
                            <h3>ลงทะเบียนตัวแทนจำหน่าย</h3>
                        </v-btn>
                    </v-btn-toggle>
                </v-col> 
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="12" md="4"> 
                    <v-card max-width="530" v-if="error" class="mx-auto">
                        <v-alert
      dense
      outlined
      type="error"
    >
     ไม่สามรถเข้าสู่ระบบได้กรุณาตรวจสอบ <strong>Username</strong> และ <strong>Password</strong> 
    </v-alert>
                    </v-card>
 
                    <v-card v-if="load" elevation="0" max-width="350" class="mx-auto text-center">
                        <v-progress-circular
                        indeterminate
                        color="primary"
                        ></v-progress-circular>
                        <p>กำลังตรวจสอบข้อมูล</p>
                    </v-card> 

                    <v-card v-else class="elevation-0">
                        <v-toolbar flat class=" d-flex align-center  justify-center">
                            <v-toolbar-title >
                                <h3 >Login / เข้าสู่ระบบ</h3>
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                              <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field single-line filled label="Username" v-model="form.name" :rules="nameRules"
                                    prepend-icon="mdi-account" type="text">
                                </v-text-field>

                                <v-text-field single-line filled id="password" label="Password" v-model="form.password"
                                    :rules="passwordRules" prepend-icon="mdi-lock" type="password" @keyup.enter="validate"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <div align="center" justify="center">
                        <v-btn color="primary" @click="validate">
                            <h3>เข้าสู่ระบบ</h3>
                        </v-btn>
                    </div> 
                    </v-card> 
                </v-col>
            </v-row>
</v-card>
</template>

<script> 
import Admin from '@/Models/Admin'
import Pdf from '@/Models/Pdf'
    export default {
        data: () => ({
            API: 'https://tadmin.carwashsupply.co.th', 
            title: "Login / เข้าสู่ระบบตัวแทนจำหน่าย",
            valid: true,
            form: {
                name: '',
                password: '',
            },
            nameRules: [
                v => !!v || 'Name is required', 
            ],
           
            passwordRules: [
                v => !!v || 'Password is required', 
            ],
            error: false,
            load: false,
             
        }), 
        props: {
            source: String,
        },
        methods: {
             async initialize (id) {  
                try { 
                    const response = await fetch(this.API+'/api/v1/agent/base64/'+id)
                    const data = await response.json()
                    this.code = data.success.code
                    Pdf.deleteAll()
                    Pdf.insert({
                        data: {   
                            code: this.code,
                        }
                    })
                } catch (error) {
                    console.error(error)
                } 
            }, 
            async validate() {
                 this.error = false 
                 this.load = true 
                 try {   
                    // Create request to api service
                    const req = await fetch(this.API+"/api/v1/agent/login", {
                        method: 'POST',  
                        body: JSON.stringify(this.form),
                    }); 
                    const res = await req.json();
                    if(res.success.token=='Error'){
                        this.error = true 
                        this.load = false 
                        this.form.name = ''
                        this.form.password = ''
                    }else{
                        this.load = false
                        Admin.deleteAll()
                        Admin.insert({
                            data: {  
                                id: res.success.token.id, 
                                district: res.success.token.district,
                                email: res.success.token.email,
                                fax: res.success.token.fax,
                                fb: res.success.token.fb,
                                floor: res.success.token.floor,
                                houseon: res.success.token.houseon, 
                                idcard: res.success.token.idcard,
                                ig: res.success.token.ig,
                                line: res.success.token.line,
                                memberstatus_id: res.success.token.memberstatus_id,
                                membertype_id: res.success.token.membertype_id,
                                name: res.success.token.name, 
                                phone: res.success.token.phone,
                                phone2: res.success.token.phone2,
                                postalcode: res.success.token.postalcode,
                                province: res.success.token.province,
                                remember_token: res.success.token.remember_token,
                                roomnumber: res.success.token.roomnumber,
                                shop: res.success.token.shop,
                                sku: res.success.token.sku,
                                subdistrict: res.success.token.subdistrict,
                                surname: res.success.token.surname,
                                title: res.success.token.title,
                                tradenumber: res.success.token.tradenumber,  
                                village: res.success.token.village,
                                villageno: res.success.token.villageno, 
                                document: res.success.token.document, 
                                contact: res.success.token.contact, 
                                bank: res.success.token.bank, 
                            }
                        }) 
                        this.initialize(res.success.token.id)
                        this.$router.push({ path: 'Dashboard' }, () => {})  
                    } 
                } catch (error) {
                    this.error = true 
                    console.error(error) 
                }
            },  
             
        },
    }
</script> 