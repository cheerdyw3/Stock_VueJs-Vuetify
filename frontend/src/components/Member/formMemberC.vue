<template> 
    <v-col class="pa-0 ma-0">
       <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col @click="InsertdataFormA(dataFormA)">
                 <v-checkbox v-model="insert" :disabled="!save" label="ข้อมูลเดียวกับชื่อกิจการและเจ้าของกิจการ (ใช้ในการประสานงานเรื่องการซื้อขาย)" class="pa-0 ma-0 pl-0" ></v-checkbox>
            </v-col>
        </v-row> 
                <v-row>
                    <v-col class="my-0 py-0" cols="6">
                        <v-text-field dense outlined  label="ชื่อ-สกุล" v-model="form.name" :rules="Rules.nameRules" :disabled="!save" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="my-0 py-0" cols="12">
                        <v-text-field dense outlined  label="ที่อยู่" v-model="form.address" :rules="Rules.addressRules" :disabled="!save" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="my-0 py-0" cols="6">
                        <v-text-field dense outlined  label="โทรศัพท์" v-mask="'0##-###-####'" v-model="form.phone" :rules="Rules.phoneRules" :disabled="!save" required>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="my-0 py-0" cols="6">
                        <v-text-field dense outlined  label="เลขประจำตัวผู้เสียภาษี"
                            v-mask="'#-####-######-#-#'" v-model="form.taxid" :rules="Rules.taxidRules" :disabled="!save" required></v-text-field>
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
    export default {
        data: () => ({ 
            valid: true,
            shop: false,
            edit: false,
            save: true, 
            dataformC: false,
            insert: false,
            form: {
                'FormC': true,  
                'name': '', 
                'address': '', 
                'phone': '', 
                'taxid': '',  
            },
            Rules: {  /* 
                'nameRules': [v => !!v || 'กรุณากรอก ชื่อ'], 
                'addressRules': [v => !!v || 'กรุณากรอก ที่อยู่'],  
                'phoneRules': [v => !!v || 'กรุณากรอก เบอร์โทรศัพท์', v => (v && v.length == 12)],  
                'taxidRules': [v => !!v || 'กรุณากรอก เลขประจำตัวผู้เสียภาษี'], */
            },
        }), 
        props: {
            dataFormA: Object
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
                console.log(data)
                if(this.insert){
                    this.form.name = data.name+' '+data.surname 
                    this.form.address = ""  
                    if(data.village){  this.form.address +=  data.village }
                    if(data.floor){  this.form.address +=  ' ชั้น '+ data.floor }
                    if(data.roomnumber){  this.form.address +=  ' ห้องเลขที่ '+ data.roomnumber }
                    if(data.houseon){  this.form.address +=  ' บ้านเลขที่ '+ data.houseon }
                    if(data.villageon){  this.form.address +=  ' หมู่ที่ '+ data.villageon }
                    if(data.road){  this.form.address +=  ' ถนน '+ data.road }
                    if(data.subdistrict){  this.form.address +=  ' ตำบล'+ data.subdistrict }
                    if(data.district){  this.form.address +=  ' อำเภอ'+ data.district }
                    if(data.province){  this.form.address +=  ' จังหวัด'+ data.province }
                    if(data.postalcode){  this.form.address +=  ' '+ data.postalcode } 
                    this.form.phone = data.phone 
                    if(data.tradenumber !="" ){
                        this.form.taxid = data.tradenumber  
                    }else{
                        this.form.taxid = data.idcard  
                    }
                    
                }else{
                    this.form.name = ''
                    this.form.address = ''
                    this.form.phone = ''
                    this.form.taxid = '' 
                }
                
            }, 
        }
    }
</script>