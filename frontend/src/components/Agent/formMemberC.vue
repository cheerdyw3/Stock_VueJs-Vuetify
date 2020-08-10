<template> 
    <v-col class="pa-0 ma-0">
        <v-form ref="form" v-model="valid" lazy-validation>
        <v-row no-gutters class="py-1">
            <v-col  >
                  <v-radio-group
                    v-model="form.committee"
                    :disabled="!save"  
                    >
                    <div v-for="(item,i) in Committees" :key="i" @click="InsertdataFormA(item)">
<v-radio  :label="`กรรมการคนที่ ${++i}`" ></v-radio> 
                    </div> 
</v-radio-group>
 
            </v-col>
        </v-row>  
            <v-row >
                <v-col class="my-0 py-0 mt-n3 d-flex flex-row" cols="4">  
                    <v-radio-group
                    v-model="form.title"
                    :disabled="!save" 
                    row 
                    >
                    <v-radio label="นาย" value="นาย"    ></v-radio>
                    <v-radio label="นางสาว" value="นางสาว"  ></v-radio>
                    <v-radio label="นาง"  value="นาง"  ></v-radio>
                    <v-radio label="อื่นๆ"  value="อื่นๆ"   ></v-radio>
</v-radio-group>
                </v-col>
                <v-col class="my-0 py-0 ml-n2" cols="4">
                    <v-text-field dense outlined label="ชื่อ*" v-model="form.name" :rules="Rules.nameRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="4">
                    <v-text-field dense outlined v-model="form.surname" :rules="Rules.surnameRules" label="นามสกุล*" :disabled="!save" required>
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
                    <v-text-field dense outlined  label="เบอร์โทรศัพท์ 1*" v-mask="'0##-###-####'"
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
                    <v-text-field dense outlined label="Email*" v-model="form.email" :rules="Rules.emailRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="6">
                    <v-text-field dense outlined label="ID Line*" v-model="form.line" :rules="Rules.lineRules" :disabled="!save" required></v-text-field>
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

                        <v-btn color="error" class="mr-4" :disabled="!save" @click="dataFormC()">
                            บันทึก
                        </v-btn>
                    </div>
                </v-col>
            </v-row> 
        
        </v-form>
    </v-col>

</template>

<script>
import Committee from '@/Models/Committee'
    export default {
        data: () => ({ 
            valid: true,
            shop: false,
            edit: false,
            save: true, 
            dataformA: false,
            insert: false,
            form: {
                'FormC': true, 
                'title': '', //นาย 
                'name': '', //ชื่อ 
                'surname': '', //นามสกุล  
                'phone': '', //โทรศัพท์ 
                'phone2': '', //โทรศัพท์2
                'email': '', //อีเมล 
                'line': '', //ไลน์ 
                'ig': '', //ไอจี
                'fb': '', //facebook 
                'committee': '',
            },
            Rules: {  
                'titleRules': [v => !!v || 'กรุณากรอก คำนามหน้านาม'], 
                'nameRules': [v => !!v || 'กรุณากรอก ชื่อ'], 
                'surnameRules': [v => !!v || 'กรุณากรอก นามสกุล'],  
                'phoneRules': [v => !!v || 'กรุณากรอก เบอร์โทรศัพท์', v => (v && v.length == 12)], 
                'emailRules': [v => !!v || 'กรุณากรอก อีเมล',v => /.+@.+\..+/.test(v) || 'E-mail must be valid',], 
                'lineRules': [v => !!v || 'กรุณากรอก ไลน์ไอดี'], 
            },
        }), 
        props: {
            dataFormA: Object
        },  
         computed: { 
            Committees() {  return Committee.all(); }, 
        },
        methods: { 
            dataFormC() {  
                if(this.$refs.form.validate()){
                    this.$emit('dataFormC',this.form)
                    this.save = false
                    this.edit = true
                } 
            }, 
            Edit(){
                this.save = true
                this.edit = false
            },
            InsertdataFormA(data){  
                 
                    this.form.title = data.title
                    this.form.name = data.name
                    this.form.surname = data.surname
                    this.form.phone = data.phone
                    this.form.phone2 = data.phone2
                    this.form.email = data.email
                    this.form.line = data.line
                    this.form.ig = data.lg
                    this.form.fb = data.fb
                 
            }, 
        }
    }
</script>