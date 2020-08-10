<template>
<section>
    
<AppBar :title="title"></AppBar> 
    <v-content>
        <v-container class="fill-height" fluid>
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
                    <v-card class="elevation-0">
                        <v-toolbar flat class=" d-flex align-center  justify-center">
                            <v-toolbar-title >
                                <h3 >Login / เข้าสู่ระบบ</h3>
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                              <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field single-line filled label="Username" v-model="name" :rules="nameRules"
                                    prepend-icon="mdi-account" type="text">
                                </v-text-field>

                                <v-text-field single-line filled id="password" label="Password" v-model="password"
                                    :rules="passwordRules" prepend-icon="mdi-lock" type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    <div align="center" justify="center">
                        <v-btn color="primary" @click="validate">
                            <h3>เข้าสู่ระบบ</h3>
                        </v-btn>
                    </div>
                    <div class="mt-10 mr-5 d-none" align="right" justify="center"> 
                        <v-btn small color="primary" to="/Admin/Login"> 
                         <v-icon size="15" class="mr-2">mdi-account-cog</v-icon> สำหรับผู้ดูแลระบบ
                        </v-btn> 
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</section>
</template>

<script>
import AppBar from '@/components/AppBar' 
import Admin from '@/Models/Admin'
    export default {
        data: () => ({
            title: "Login / เข้าสู่ระบบ",
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required', 
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Name is required', 
            ],
            error: false,
             
        }),
         components: {
      AppBar, 
    },
        props: {
            source: String,
        },
        methods: {
            validate() {
                if(this.$refs.form.validate()){
                    if(this.name=='0815814951'){
                        if(this.password=='0815814951'){
                            Admin.deleteAll()
                            Admin.insert({
                                data: {   
                                        name: this.name,
                                        password: this.password,
                                        type: '2'  
                                }
                            }) 
                            this.$router.push({ path: 'Dashboard' }, () => {}) 
                        }else{
                            this.name = null
                            this.password = null
                            this.error = true
                        }
                    }else{
                        this.name = null
                        this.password = null
                        this.error = true
                    }
                    
                }
            }, 
        },
    }
</script> 