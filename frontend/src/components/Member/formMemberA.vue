<template>
    <v-col class="pa-0 ma-0" cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>

            <v-row class="mt-2">
                <v-col class="my-0 py-0 d-flex flex-row" cols="4">
                    ชื่อร้านค้า
                    <v-checkbox label="ไม่มี" class="pa-0 ma-0 pl-5 " v-model="shop" :disabled="!save" value="no"></v-checkbox>
                    <v-checkbox label="มี" class="pa-0 ma-0 pl-5 " v-model="shop" :disabled="!save" value="yes"></v-checkbox>
                </v-col>
                <v-col class="my-0 py-0 ml-n2" cols="4" v-if="shop=='yes'">
                    <v-text-field dense outlined label="ชื่อร้าน" v-model="form.shop" :rules="Rules.shopRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="4" v-if="shop=='yes'">
                    <v-text-field dense outlined label="เลขที่ทะเบียนการค้า"
                        v-mask="'#-####-######-#-#'" v-model="form.tradenumber" :rules="Rules.tradenumberRules" :disabled="!save" required>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="my-0 py-0 mt-n3 d-flex flex-row" cols="4">  
                    <v-radio-group
                    v-model="form.title"
                    :disabled="!save" 
                    row 
                    >
                    <v-radio label="นาย" value="นาย"   ></v-radio>
                    <v-radio label="นางสาว" value="นางสาว" ></v-radio>
                    <v-radio label="นาง"  value="นาง" ></v-radio>
                    <v-radio label="อื่นๆ"  value="อื่นๆ"  ></v-radio>
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
                    <span>เลขที่บัตรประจำตัวประชาชน*</span>
                </v-col>
                <v-col class="my-0 py-0 d-flex flex-row" cols="4"> 
                    <v-text-field dense outlined v-model="form.idcard" :rules="Rules.idcardRules" label="เลขที่บัตรประจำตัวประชาชน"
                        v-mask="'#-####-######-#-#'" :disabled="!save" required>
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col class="" cols="4">
                    <span>ข้อมูลที่อยู่</span>
                </v-col>
                <v-col cols="8">
                    <v-row>
                        <v-col class="my-0 py-0" cols="8">
                    <v-text-field dense outlined label="ชื่อหมู่บ้าน,คอนโด,อาคาร ฯลฯ" v-model="form.village" :disabled="!save" required>
                        </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                        <v-text-field dense outlined :disabled="!save" v-model="form.floor" label="ชั้น"></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                        <v-text-field dense outlined :disabled="!save" v-model="form.roomnumber" label="ห้องเลขที่">
                        </v-text-field>
                    </v-col>  
                    <v-col class="my-0 py-0" cols="4">
                        <v-text-field dense outlined label="บ้านเลขที่" v-model="form.houseon" :rules="Rules.houseonRules"  :disabled="!save" required></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="3">
                        <v-text-field dense outlined :disabled="!save" v-model="form.villageon" label="หมู่ที่"></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="5">
                        <v-text-field dense outlined :disabled="!save" v-model="form.road" label="ถนน">
                        </v-text-field>
                    </v-col>
                     <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined  label="แขวง/ตำบล" v-model="form.subdistrict" :rules="Rules.subdistrictRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined  label="เขต/อำเภอ" v-model="form.district" :rules="Rules.districtRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined  label="จังหวัด" v-model="form.province" :rules="Rules.provinceRules" :disabled="!save" required>
                    </v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined v-mask="'#####'" v-model="form.postalcode" :rules="Rules.postalcodeRules" :disabled="!save" required label="รหัสไปรษณีย์">
                    </v-text-field>
                </v-col> 
                      </v-row>
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
                    <v-text-field dense outlined label="Instagram" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="6">
                    <v-text-field dense outlined label="Facebook" :disabled="!save" required></v-text-field>
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

                        <v-btn color="error" class="mr-4" :disabled="!save" @click="dataFormA()">
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
            form: {
                'FormA': true,
                'shop': '', //ชื่อร้านค้า 
                'tradenumber': '', //เลขทะเบียนการค้า 
                'title': '', //นาย 
                'name': '', //ชื่อ 
                'surname': '', //นามสกุล 
                'idcard': '', //เลขที่บัตรประชาชน  
                'village': '', //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
                'floor': '', //ชั้น
                'roomnumber': '', //ห้องเลขที่
                'houseon': '', //บ้านเลขที่ 
                'villageon': '', //หมู่ที่
                'road': '', //ถนน
                'subdistrict': '', //ตำบล 
                'district': '', //อำเภอ 
                'province': '', //จังหวัด 
                'postalcode': '', //รหัสไปรษณีย์ 
                'phone': '', //โทรศัพท์ 
                'phone2': '', //โทรศัพท์2
                'email': '', //อีเมล 
                'line': '', //ไลน์ 
                'ig': '', //ไอจี
                'fb': '', //facebook 
            },
            Rules: { 
                /*
                'shopRules': [v => !!v || 'กรุณากรอก ชื่อร้านค้า'], 
                'tradenumberRules': [v => !!v || 'กรุณากรอก เลขทะเบียนการค้า', v => (v && v.length == 17)], 
                'titleRules': [v => !!v || 'กรุณากรอก คำนามหน้านาม'], 
                'nameRules': [v => !!v || 'กรุณากรอก ชื่อ'], 
                'surnameRules': [v => !!v || 'กรุณากรอก นามสกุล'], 
                'idcardRules': [
                    v => !!v ||'กรุณากรอก เลขที่บัตรประชาชน', v => (v && v.length == 17) || 'กรุณากรอก เลขที่บัตรประชาชน 13 หลัก',],  
                'houseonRules': [v => !!v || 'กรุณากรอก บ้านเลขที่'], 
                'subdistrictRules': [v => !!v || 'กรุณากรอก ตำบล'], 
                'districtRules': [v => !!v || 'กรุณากรอก อำเภอ'], 
                'provinceRules': [v => !!v || 'กรุณากรอก จังหวัด'], 
                'postalcodeRules': [v => !!v || 'กรุณากรอก รหัสไปรษณีย์'], 
                'phoneRules': [v => !!v || 'กรุณากรอก เบอร์โทรศัพท์', v => (v && v.length == 12)], 
                'emailRules': [v => !!v || 'กรุณากรอก อีเมล',v => /.+@.+\..+/.test(v) || 'E-mail must be valid',], 
                'lineRules': [v => !!v || 'กรุณากรอก ไลน์ไอดี'], */
            },
        }),  
        methods: { 
            dataFormA() {  
                if(this.$refs.form.validate()){
                    this.$emit('dataFormA',this.form)
                    this.save = false
                    this.edit = true
                } 
            }, 
            Edit(){
                this.save = true
                this.edit = false
            }
        }
    }
</script>