<template> 
    <v-col class="pa-0 ma-0">
        <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col @click="InsertdataFormA(dataFormA)">
                 <v-checkbox v-model="insert" :disabled="!save" label="ข้อมูลเดียวกับชื่อกิจการและเจ้าของกิจการ (ใช้ในการประสานงานเรื่องการซื้อขาย)" class="pa-0 ma-0 pl-0" ></v-checkbox>
            </v-col>
        </v-row> 
            <v-row >
                <v-col class="my-0 py-0 mt-n3 d-flex flex-row" cols="4">  
                    <v-radio-group
                    v-model="form.title"
                    :disabled="!save"
                    :readonly="readonly"
                    :mandatory="mandatory"
                    :multiple="multiple"
                    :error="error"
                    :success="success"
                    row
                    :color="color"
                    >
                    <v-radio label="นาย" value="นาย"    ></v-radio>
                    <v-radio label="นางสาว" value="นางสาว"  ></v-radio>
                    <v-radio label="นาง"  value="นาง"  ></v-radio>
                    <v-radio label="อื่นๆ"  value="อื่นๆ"   ></v-radio>
</v-radio-group>
                </v-col>
                <v-col class="my-0 py-0 ml-n2" cols="4">
                    <v-text-field dense outlined label="ชื่อ" v-model="form.name" :rules="Rules.nameRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="4">
                    <v-text-field dense outlined v-model="form.surname" :rules="Rules.surnameRules" label="นามสกุล" :disabled="!save" required>
                    </v-text-field>
                </v-col>
            </v-row> 
             <v-row no-gutters>
                <v-col cols="4">
                     <span>เบอร์โทรศัพท์</span>
                </v-col>
                <v-col>
                    <v-row>
                         <v-col class="my-0 py-0" cols="4">
                    <v-text-field dense outlined  label="เบอร์โทรศัพท์ 1" v-mask="'0##-###-####'"
                        v-model="form.phone" :rules="Rules.phoneRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="4">
                    <v-text-field dense outlined  label="เบอร์โทรศัพท์ 2" v-mask="'0##-###-####'"
                        :disabled="!save" required></v-text-field>
                </v-col>
                    </v-row>
                </v-col>
            </v-row>

            
            <v-row no-gutters> 
                <v-col cols="4">
                    <span>ข้อมูลการติดต่อ</span>
                </v-col>
                <v-col>
                    <v-row>
 <v-col class="my-0 py-0" cols="6">
                    <v-text-field dense outlined label="Email" v-model="form.email" :rules="Rules.emailRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="6">
                    <v-text-field dense outlined label="ID Line" v-model="form.line" :rules="Rules.lineRules" :disabled="!save" required></v-text-field>
                </v-col>
                 <v-col class="my-0 py-0" cols="6">
                    <v-text-field dense outlined label="Instagram" v-model="form.ig" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="6">
                    <v-text-field dense outlined label="Facebook" v-model="form.fb" :disabled="!save" required></v-text-field>
                </v-col>
                    </v-row>
                </v-col> 
            </v-row> 

        <v-row>
                <v-col>
                    <div class="text-center align-center">
                        <v-btn :disabled="!edit" color="success" class="mr-4" @click="Edit()" >
                            แก้ไข
                        </v-btn>

                        <v-btn color="error" class="mr-4" :disabled="!save" @click="dataFormB()">
                            บันทึก
                        </v-btn>
                    </div>
                </v-col>
            </v-row> 
        
        </v-form>
    </v-col>

</template>

<script>
    export default {
        data: () => ({ 
            valid: true,
            shop: false,
            edit: false,
            save: true, 
            dataformA: false,
            insert: false,
            form: {
                'FormB': true, 
                'title': '', //นาย 
                'name': '', //ชื่อ 
                'surname': '', //นามสกุล  
                'phone': '', //โทรศัพท์ 
                'phone2': '', //โทรศัพท์2
                'email': '', //อีเมล 
                'line': '', //ไลน์ 
                'ig': '', //ไอจี
                'fb': '', //facebook 
            },
            Rules: {  
                /*
                'titleRules': [v => !!v || 'กรุณากรอก คำนามหน้านาม'], 
                'nameRules': [v => !!v || 'กรุณากรอก ชื่อ'], 
                'surnameRules': [v => !!v || 'กรุณากรอก นามสกุล'],  
                'phoneRules': [v => !!v || 'กรุณากรอก เบอร์โทรศัพท์', v => (v && v.length == 12)], 
                'emailRules': [v => !!v || 'กรุณากรอก อีเมล',v => /.+@.+\..+/.test(v) || 'E-mail must be valid',], 
                'lineRules': [v => !!v || 'กรุณากรอก ไลน์ไอดี'], 
                */
            },
        }), 
        props: {
            dataFormA: Object
        },  
        methods: { 
            dataFormB() {  
                if(this.$refs.form.validate()){
                    this.$emit('dataFormB',this.form)
                    this.save = false
                    this.edit = true
                } 
            }, 
            Edit(){
                this.save = true
                this.edit = false
            },
            InsertdataFormA(data){ 
                console.log(data)
                if(this.insert){
                    this.form.title = data.title
                    this.form.name = data.name
                    this.form.surname = data.surname
                    this.form.phone = data.phone
                    this.form.phone2 = data.phone2
                    this.form.email = data.email
                    this.form.line = data.line
                    this.form.ig = data.lg
                    this.form.fb = data.fb
                }else{
                    this.form.title = ''
                    this.form.name = ''
                    this.form.surname = ''
                    this.form.phone = ''
                    this.form.phone2 = ''
                    this.form.email = ''
                    this.form.line = ''
                    this.form.ig = ''
                    this.form.fb = ''
                }
                
            }, 
        }
    }
</script>