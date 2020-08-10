<template>
  <v-form ref="formB" lazy-validation>
    <!-- startDiv -->
    <v-row>
      <v-col class=""> กรรมการคนที่ {{ count }} </v-col>
    </v-row>
    <v-row>
      <v-col class="my-0 py-0 mt-n3 d-flex flex-row" cols="4">
        <v-radio-group v-model="data.title" :disabled="disable === false" row>
          <v-radio label="นาย" value="นาย"></v-radio>
          <v-radio label="นางสาว" value="นางสาว"></v-radio>
          <v-radio label="นาง" value="นาง"></v-radio>
          <v-radio label="อื่นๆ" value="อื่นๆ"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col class="my-0 py-0 ml-n2" cols="4">
        <v-text-field
          dense
          outlined
          label="ชื่อ*"
          v-model="form.name"
          :disabled="disable === false"
          :rules="Rules.nameRules"
          required
        ></v-text-field>
      </v-col>
      <v-col class="my-0 py-0" cols="4">
        <v-text-field
          dense
          outlined
          label="นามสกุล*"
          v-model="form.surname"
          :disabled="disable === false"
          :rules="Rules.surnameRules"
          required
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4" class="mt-2">
        <span>เลขบัตรประชาชน*</span>
      </v-col>
      <v-col class="my-0 py-0 d-flex flex-row" cols="4">
        <v-text-field
          dense
          outlined
          label="เลขบัตรประชาชน"
          v-model="form.idcard"
          :disabled="disable === false"
          :rules="Rules.idcardRules"
          v-mask="'#-####-######-#-#'"
          required
        >
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
            <v-text-field
              dense
              outlined
              label="ชื่อหมู่บ้าน,คอนโด,อาคาร ฯลฯ"
              v-model="form.village"
              :disabled="disable === false"
              required
            >
            </v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="2">
            <v-text-field
              dense
              outlined
              label="ชั้น"
              v-model="form.floor"
              :disabled="disable === false"
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="2">
            <v-text-field
              dense
              outlined
              label="ห้องเลขที่"
              v-model="form.roomnumber"
              :disabled="disable === false"
            >
            </v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="2">
            <v-text-field
              dense
              outlined
              label="บ้านเลขที่*"
              v-model="form.houseon"
              :disabled="disable === false"
              :rules="Rules.houseonRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="2">
            <v-text-field
              dense
              outlined
              label="หมู่ที่"
              v-model="form.villageno"
              :disabled="disable === false"
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="4">
            <v-text-field
              dense
              outlined
              label="ตรอก/ซอย"
              v-model="form.alley"
              :disabled="disable === false"
            >
            </v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="4">
            <v-text-field
              dense
              outlined
              label="ถนน"
              v-model="form.road"
              :disabled="disable === false"
            >
            </v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="3">
            <v-text-field
              dense
              outlined
              label="แขวง/ตำบล*"
              v-model="form.subdistrict"
              :disabled="disable === false"
              :rules="Rules.subdistrictRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="3">
            <v-text-field
              dense
              outlined
              label="เขต/อำเภอ*"
              v-model="form.district"
              :disabled="disable === false"
              :rules="Rules.districtRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="3">
            <v-text-field
              dense
              outlined
              label="จังหวัด*"
              required
              v-model="form.province"
              :disabled="disable === false"
              :rules="Rules.provinceRules"
            >
            </v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="3">
            <v-text-field
              dense
              outlined
              v-mask="'#####'"
              required
              label="รหัสไปรษณีย์*"
              v-model="form.postalcode"
              :disabled="disable === false"
              :rules="Rules.postalcodeRules"
            >
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
            <v-text-field
              dense
              outlined
              label="เบอร์โทรศัพท์ 1*"
              v-model="form.phone"
              :disabled="disable === false"
              :rules="Rules.phoneRules"
              v-mask="'0##-###-####'"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="4">
            <v-text-field
              dense
              outlined
              label="เบอร์โทรศัพท์ 2"
              v-model="form.phone2"
              :disabled="disable === false"
              v-mask="'0##-###-####'"
              required
            ></v-text-field>
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
            <v-text-field
              dense
              outlined
              label="Email*"
              v-model="form.email"
              :disabled="disable === false"
              :rules="Rules.emailRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="6">
            <v-text-field
              dense
              outlined
              label="ID Line*"
              v-model="form.line"
              :disabled="disable === false"
              :rules="Rules.lineRules"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="6">
            <v-text-field
              dense
              outlined
              label="Instagram"
              v-model="form.ig"
              :disabled="disable === false"
              required
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="6">
            <v-text-field
              dense
              outlined
              label="Facebook"
              v-model="form.fb"
              :disabled="disable === false"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4">
        <span>รูปถ่ายบัตรประชาชน</span>
      </v-col>
      <v-col cols="8" class="pr-2">
        <v-row>
          <v-col cols="6">
            <v-card class="text-center justify-center  align-center pa-2">
              <p>ด้านหน้า</p>
              <input type="file" name="file" :disabled="disable === false" v-on:change="fileChangeA($event.target.files)"/>
              <v-img
                class="mx-auto ma-3"
                max-width="200"
                :src="`${API}/public/images/member/${form.imageA}`"
                contain
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="text-center justify-center  align-center pa-2">
              <p>ด้านหลัง</p>
              <input type="file" name="file" :disabled="disable === false" v-on:change="fileChangeB($event.target.files)"/>
              <v-img
                class="mx-auto ma-3"
                max-width="200"
                :src="`${API}/public/images/member/${form.imageB}`"
                contain
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-right align-center">
          <v-btn
            :disabled="disableAll2"
            v-if="showSendB === false"
            color="error"
            class="mr-4"
            @click="edit2(count)"
          >
            แก้ไข
          </v-btn>
          <v-btn
            v-if="showSendB === true"
            color="error"
            class="mr-4"
            @click="clear('B')"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            v-if="showSendB === true"
            color="success"
            class="mr-4"
            @click="sentDataFormB('B')"
          >
            บันทึก
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- endDiv -->
  </v-form>
</template>

<script>
import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
import axios from "axios";
export default {
  data: () => ({
    API: "https://tadmin.carwashsupply.co.th",
    valid: true,
    edit: false,
    save: true,
    insert: false,
    disable: false,
    disableInForm: false,
    showSendB: false,
    dataReserve: [],
    form: {
      FormB: true,
      id:"",
      title: "", //นาย
      name: "", //ชื่อ
      surname: "", //นามสกุล
      idcard: "", //เลขที่บัตรประชาชน
      village: "", //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
      floor: "", //ชั้น
      roomnumber: "", //ห้องเลขที่
      houseon: "", //บ้านเลขที่
      villageno: "", //หมู่ที่
      alley: "", //ตรอก/ซอย
      road: "", //ถนน
      subdistrict: "", //ตำบล
      district: "", //อำเภอ
      province: "", //จังหวัด
      postalcode: "", //รหัสไปรษณีย์
      phone: "", //โทรศัพท์
      phone2: "", //โทรศัพท์2
      email: "", //อีเมล
      line: "", //ไลน์
      ig: "", //ไอจี
      fb: "", //facebook
      imageA: "", //facebook
      imageB: "", //facebook
    },
    Rules: {
      titleRules: [(v) => !!v || "กรุณากรอก คำนามหน้านาม"],
      nameRules: [(v) => !!v || "กรุณากรอก ชื่อ"],
      surnameRules: [(v) => !!v || "กรุณากรอก นามสกุล"],
      idcardRules: [
        (v) => !!v || "กรุณากรอก เลขที่บัตรประชาชน",
        (v) => (v && v.length == 17) || "กรุณากรอก เลขที่บัตรประชาชน 13 หลัก",
      ],
      houseonRules: [(v) => !!v || "กรุณากรอก บ้านเลขที่"],
      subdistrictRules: [(v) => !!v || "กรุณากรอก ตำบล"],
      districtRules: [(v) => !!v || "กรุณากรอก อำเภอ"],
      provinceRules: [(v) => !!v || "กรุณากรอก จังหวัด"],
      postalcodeRules: [(v) => !!v || "กรุณากรอก รหัสไปรษณีย์"],
      phoneRules: [
        (v) => !!v || "กรุณากรอก เบอร์โทรศัพท์",
        (v) => v && v.length == 12,
      ],
      emailRules: [
        (v) => !!v || "กรุณากรอก อีเมล",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      lineRules: [(v) => !!v || "กรุณากรอก ไลน์ไอดี"],
    },
    files: new FormData(),
  }),
  methods: {
    async sentDataFormB() {
      let subPath ="";
      if (this.$refs.formB.validate()) {
        this.$confirm("Are you sure?").then(async () => {
          this.disable = false;
          console.log(this.form.id)
          subPath = `/api/v1/member/committee/${this.form.id}/update`;
          console.log("this.form",this.form)
          let req = await fetch(this.API + subPath, {
            method: "POST",
            body: JSON.stringify(this.form),
          });
                    console.log("req")
          console.log(req)
          let res = await req.json();

          if (res.success) {
            this.$emit("alertFormB", 'B');
            this.clear('B', true);
          }
        // this.clear('B', true);
          

          this.$emit("disableInB", { status: this.disableAll2, type: "send" });
          this.disableInForm = false;
          this.disableAll2 = false;
          this.disable = false;
          this.showSendB = false;
        });
      }
    },
    edit2() {
      // this.data = this.dataReserve;

      this.$emit("disableInB", { status: this.disableAll2, type: "edit" });
      this.disableInForm = true;
      this.disableAll2 = true;
      this.showSendB = true;
      this.disable = true;
    },
    clear(step,type) {
      // console.log("type",type)
      if (type) {
        this.dataReserve = JSON.parse(JSON.stringify(this.form));
        this.data = JSON.parse(JSON.stringify(this.form));
      } else {
        this.form = JSON.parse(JSON.stringify(this.dataReserve));
        this.data = JSON.parse(JSON.stringify(this.dataReserve));
        this.$emit("disableInB", { status: this.disableAll2, type: "clear" });
      }
      this.disableInForm = false;
      this.disableAll2 = false;
      this.showSendB = false;
      this.disable = false;
    },
    fileChangeA(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          console.log(result.data.success.imageName);
          this.form.imageA = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    fileChangeB(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          console.log(result.data.success.imageName);
          this.form.imageB = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
  props: {
    count: Number,
    id: Number,
    data: Object,
    disableAll2: Boolean,
  },
  created() {
    this.dataReserve = JSON.parse(JSON.stringify(this.data));
    this.form = JSON.parse(JSON.stringify(this.data));
  },
};
</script>

<style></style>
