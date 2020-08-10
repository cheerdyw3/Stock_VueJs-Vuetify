<template>
  <section>
        <v-row>
            <v-col >
                  * กรรมการคนที่ 1
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
                    <v-text-field dense outlined label="ชื่อ*" v-model="form.name" :rules="Rules.nameRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="4">
                    <v-text-field dense outlined v-model="form.surname" :rules="Rules.surnameRules" label="นามสกุล*" :disabled="!save" required>
                    </v-text-field>
                </v-col>
            </v-row> 
            <v-row no-gutters>
                <v-col cols="4" class="mt-2">
                    <span>เลขบัตรประชาชน*</span>
                </v-col>
                <v-col class="my-0 py-0 d-flex flex-row" cols="4"> 
                    <v-text-field dense outlined v-model="form.idcard" :rules="Rules.idcardRules" label="เลขบัตรประชาชน"
                        v-mask="'#-####-######-#-#'" :disabled="!save" required>
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col class="" cols="4">
                    <span>ข้อมูลที่อยู่ (ที่อยู่ปัจจุบัน)</span>
                </v-col>
                <v-col cols="8">
                    <v-row>
                        <v-col class="my-0 py-0" cols="8">
                    <v-text-field dense outlined label="ชื่อหมู่บ้าน,คอนโด,อาคาร ฯลฯ" :disabled="!save" required>
                        </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                        <v-text-field dense outlined :disabled="!save" label="ชั้น"></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                        <v-text-field dense outlined :disabled="!save" label="ห้องเลขที่">
                        </v-text-field>
                    </v-col>  
                    <v-col class="my-0 py-0" cols="4">
                        <v-text-field dense outlined label="บ้านเลขที่*" v-model="form.houseon" :rules="Rules.houseonRules"  :disabled="!save" required></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="3">
                        <v-text-field dense outlined :disabled="!save" label="หมู่ที่"></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="5">
                        <v-text-field dense outlined :disabled="!save" label="ถนน">
                        </v-text-field>
                    </v-col>
                     <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined  label="แขวง/ตำบล*" v-model="form.subdistrict" :rules="Rules.subdistrictRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined  label="เขต/อำเภอ*" v-model="form.district" :rules="Rules.districtRules" :disabled="!save" required></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined  label="จังหวัด*" v-model="form.province" :rules="Rules.provinceRules" :disabled="!save" required>
                    </v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="3">
                    <v-text-field dense outlined v-mask="'#####'" v-model="form.postalcode" :rules="Rules.postalcodeRules" :disabled="!save" required label="รหัสไปรษณีย์*">
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
        </section>
</template>

<script>
export default {

}
</script>
 