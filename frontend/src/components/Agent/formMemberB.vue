<template>
  <v-col class="pa-0 ma-0">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col>
          กรรมการคนที่ {{ count }}
          <v-btn
            v-if="count != 1"
            x-small
            color="error"
            class=""
            :disabled="!save"
            @click="deleteItem(id)"
          >
            ลบข้อมูล
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="my-0 py-0 mt-n3 d-flex flex-row" cols="4">
          <v-radio-group v-model="form.title" :disabled="!save" row>
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
            :rules="Rules.nameRules"
            :disabled="!save"
            required
          ></v-text-field>
        </v-col>
        <v-col class="my-0 py-0" cols="4">
          <v-text-field
            dense
            outlined
            v-model="form.surname"
            :rules="Rules.surnameRules"
            label="นามสกุล*"
            :disabled="!save"
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
            v-model="form.idcard"
            :rules="Rules.idcardRules"
            label="เลขบัตรประชาชน"
            v-mask="'#-####-######-#-#'"
            :disabled="!save"
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
                :disabled="!save"
                required
              >
              </v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="2">
              <v-text-field
                dense
                outlined
                :disabled="!save"
                v-model="form.floor"
                label="ชั้น"
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="2">
              <v-text-field
                dense
                outlined
                :disabled="!save"
                v-model="form.roomnumber"
                label="ห้องเลขที่"
              >
              </v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="2">
              <v-text-field
                dense
                outlined
                label="บ้านเลขที่*"
                v-model="form.houseon"
                :rules="Rules.houseonRules"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="2">
              <v-text-field
                dense
                outlined
                :disabled="!save"
                v-model="form.villageon"
                label="หมู่ที่"
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="4">
              <v-text-field
                dense
                outlined
                :disabled="!save"
                v-model="form.alley"
                label="ตรอก/ซอย"
              >
              </v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="4">
              <v-text-field
                dense
                outlined
                :disabled="!save"
                v-model="form.road"
                label="ถนน"
              >
              </v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="3">
              <v-text-field
                dense
                outlined
                label="แขวง/ตำบล*"
                v-model="form.subdistrict"
                :rules="Rules.subdistrictRules"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="3">
              <v-text-field
                dense
                outlined
                label="เขต/อำเภอ*"
                v-model="form.district"
                :rules="Rules.districtRules"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="3">
              <v-text-field
                dense
                outlined
                label="จังหวัด*"
                v-model="form.province"
                :rules="Rules.provinceRules"
                :disabled="!save"
                required
              >
              </v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="3">
              <v-text-field
                dense
                outlined
                v-mask="'#####'"
                v-model="form.postalcode"
                :rules="Rules.postalcodeRules"
                :disabled="!save"
                required
                label="รหัสไปรษณีย์*"
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
                v-mask="'0##-###-####'"
                v-model="form.phone"
                :rules="Rules.phoneRules"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="4">
              <v-text-field
                dense
                outlined
                label="เบอร์โทรศัพท์ 2"
                v-mask="'0##-###-####'"
                :disabled="!save"
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
                :rules="Rules.emailRules"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="6">
              <v-text-field
                dense
                outlined
                label="ID Line*"
                v-model="form.line"
                :rules="Rules.lineRules"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="6">
              <v-text-field
                dense
                outlined
                label="Instagram"
                v-model="form.ig"
                :disabled="!save"
                required
              ></v-text-field>
            </v-col>
            <v-col class="my-0 py-0" cols="6">
              <v-text-field
                dense
                outlined
                label="Facebook"
                v-model="form.fb"
                :disabled="!save"
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
                <input
                  type="file"
                  name="file"
                  :disabled="!save"
                  v-on:change="fileChangeA($event.target.files)"
                />
                <v-img
                  v-if="form.imageA"
                  :src="`${API}/public/images/member/${form.imageA}`"
                  class="mx-auto ma-3"
                  max-width="200"
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card class="text-center justify-center  align-center pa-2">
                <p>ด้านหลัง</p>
                <input
                  type="file"
                  name="file"
                  :disabled="!save"
                  v-on:change="fileChangeB($event.target.files)"
                />
                <v-img
                  v-if="form.imageB"
                  :src="`${API}/public/images/member/${form.imageB}`"
                  class="mx-auto ma-3"
                  max-width="200"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="text-center align-center">
            <v-btn
              :disabled="!edit"
              color="success"
              class="mr-4"
              @click="Edit()"
            >
              แก้ไข
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              :disabled="!save"
              @click="dataFormB(id)"
            >
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
import Committee from "@/Models/Committee";
export default {
  data: () => ({
    API: "https://tadmin.carwashsupply.co.th",
    valid: true,
    edit: false,
    save: true,
    dataformA: false,
    insert: false,
    form: {
      FormB: true,
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
  props: {
    count: String,
    id: String,
  },
  methods: {
    dataFormB(id) {
      if (this.$refs.form.validate()) {
        this.save = false;
        this.edit = true;
        Committee.update({
          where: id,
          data: {
            title: this.form.title, //นาย
            name: this.form.name, //ชื่อ
            surname: this.form.surname, //นามสกุล
            idcard: this.form.idcard, //เลขที่บัตรประชาชน
            village: this.form.village, //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
            floor: this.form.floor, //ชั้น
            roomnumber: this.form.roomnumber, //ห้องเลขที่
            houseon: this.form.houseon, //บ้านเลขที่
            villageno: this.form.villageno, //หมู่ที่
            alley: this.form.alley, //ถนน
            road: this.form.road, //ถนน
            subdistrict: this.form.subdistrict, //ตำบล
            district: this.form.district, //อำเภอ
            province: this.form.province, //จังหวัด
            postalcode: this.form.postalcode, //รหัสไปรษณีย์
            phone: this.form.phone, //โทรศัพท์
            phone2: this.form.phone2, //โทรศัพท์2
            email: this.form.email, //อีเมล
            line: this.form.line, //ไลน์
            ig: this.form.ig, //ไอจี
            fb: this.form.fb, //facebook
            imageA: this.form.imageA, //facebook
            imageB: this.form.imageB, //facebook
          },
        });
      }
    },
    Edit() {
      this.save = true;
      this.edit = false;
    },
    deleteItem(id) {
      Committee.delete(id);
    },
    fileChangeA(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
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
          this.form.imageB = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>
