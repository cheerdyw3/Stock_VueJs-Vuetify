<template>
  <v-container fluid>
    <v-card elevation="0" class="mb-3">
      <h3>
        ฐานข้อมูลสมาชิก
        <v-btn small color="primary" dark to="/NewMember"
          >เพิ่มข้อมูลสมาชิก</v-btn
        >
      </h3>
    </v-card>
    <v-progress-linear
      v-if="preload"
      indeterminate
      color="blue darken-3"
    ></v-progress-linear>

    <v-card max-width="1200" v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="members"
        :items-per-page="25"
        class="elevation-1"
      >
        <template v-slot:item.name="{ item }">
          <span> คุณ{{ item.name }} {{ item.surname }} </span>
        </template>
        <template v-slot:item.shop="{ item }">
          <span v-if="item.shop">
            {{ item.shop }}
          </span>
          <span v-else>-</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" dark x-small class="my-2" @click="open(item)">
            ดูรายละเอียด
          </v-btn>
        </template>
      </v-data-table>
      <template v-if="dialogData">
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card elevation="0">
              <v-toolbar dark color="primary">
                <v-btn small icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >รายละเอียดสมาชิก คุณ{{ dialogData.name }}
                  {{ dialogData.surname }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-row class="ma-2">
                <v-col cols="4">
                  <!--  FormA -->
                  <v-card outlined>
                    <v-card-title>
                      <div class="body-1 font-weight-bold">
                        ชื่อกิจการและชื่อเจ้าของกิจการ
                        (ใช้ในการจัดส่งเอกสารทุกชนิด)
                      </div>
                    </v-card-title>
                    <v-alert
                      class="ml-4 mr-4 mb-0"
                      outlined
                      type="success"
                      text
                      v-if="this.alert.A"
                    >
                      แก้ไขข้อมูลสำเร็จ
                    </v-alert>
                    <v-form ref="formA" lazy-validation>
                      <v-card-text class="caption" v-if="this.form.A">
                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            รหัสตัวแทน :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              disabled
                              class="pa-0 ma-0"
                              dense
                              height="10"
                              outlined
                              required
                              v-model="dialogData.sku"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            สาขา :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.subbranch"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            ชื่อร้านค้า :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.shop"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            เลขทะเบียน :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.tradenumber"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            คำนำหน้า :
                          </v-col>
                          <v-col cols="10" class="my-0 py-0 mt-n3">
                            <v-radio-group v-model="dialogData.title" row>
                              <v-radio label="นาย" value="นาย"></v-radio>
                              <v-radio label="นางสาว" value="นางสาว"></v-radio>
                              <v-radio label="นาง" value="นาง"></v-radio>
                              <v-radio label="อื่นๆ" value="อื่นๆ"></v-radio>
                            </v-radio-group>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="1" class="mt-3">
                            ชื่อ :
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.nameRules"
                              v-model="dialogData.name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1" class="mt-3 ml-3">
                            สกุล :
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              class="pa-0 ma-0 "
                              dense
                              outlined
                              required
                              :rules="Rules.surnameRules"
                              v-model="dialogData.surname"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="4" class="mt-3">
                            เลขที่บัตรประจำตัวประชาชน :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.idcard"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="4" class="mt-3">
                            ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.village"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="1" class="mt-3">
                            ชั้น :
                          </v-col>
                          <v-col cols="3" class="mr-3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.floor"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="mt-3">
                            ห้องเลขที่ :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.roomnumber"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            บ้านเลขที่ :
                          </v-col>
                          <v-col cols="3" class="mr-3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.houseonRules"
                              v-model="dialogData.houseon"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="mt-3">
                            หมู่ที่ :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.villageno"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            ถนน :
                          </v-col>
                          <v-col cols="3" class="mr-3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.road"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="mt-3">
                            ตำบล :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.subdistrictRules"
                              v-model="dialogData.subdistrict"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            อำเภอ :
                          </v-col>
                          <v-col cols="3" class="mr-3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.districtRules"
                              v-model="dialogData.district"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="mt-3">
                            จังหวัด :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.provinceRules"
                              v-model="dialogData.province"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            รหัสไปรษณีย์ :
                          </v-col>
                          <v-col cols="3" class="mr-3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.postalcodeRules"
                              v-model="dialogData.postalcode"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="mt-3">
                            โทรสาร :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.fax"
                              :rules="Rules.faxRules"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            โทรศัพท์ :
                          </v-col>
                          <v-col cols="3" class="mr-3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-mask="'0##-###-####'"
                              :rules="Rules.phoneRules"
                              v-model="dialogData.phone"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="mt-3">
                            โทรศัพท์ (สำรอง) :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-mask="'0##-###-####'"
                              v-model="dialogData.phone2"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-text class="caption" v-else>
                        <div>
                          รหัสตัวแทน :
                          <span class="title">{{ dialogData.sku }}</span>
                        </div>
                        <div>สาขา : {{ dialogData.subbranch }}</div>
                        <div>ชื่อร้านค้า : {{ dialogData.shop }}</div>
                        <div>เลขทะเบียน : {{ dialogData.tradenumber }}</div>
                        <div>
                          ชื่อ-สกุล : {{ dialogData.title }}
                          {{ dialogData.name }} {{ dialogData.surname }}
                        </div>
                        <div>
                          เลขที่บัตรประจำตัวประชาชน : {{ dialogData.idcard }}
                        </div>
                        <div>
                          ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ :
                          {{ dialogData.village }}
                        </div>
                        <div>ชั้น : {{ dialogData.floor }}</div>
                        <div>ห้องเลขที่ : {{ dialogData.roomnumber }}</div>
                        <div>บ้านเลขที่ : {{ dialogData.houseon }}</div>
                        <div>หมู่ที่ : {{ dialogData.villageno }}</div>
                        <div>ถนน : {{ dialogData.road }}</div>
                        <div>ตำบล : {{ dialogData.subdistrict }}</div>
                        <div>อำเภอ : {{ dialogData.district }}</div>
                        <div>จังหวัด : {{ dialogData.province }}</div>
                        <div>รหัสไปรษณีย์ : {{ dialogData.postalcode }}</div>
                        <div>โทรศัพท์ : {{ dialogData.phone }}</div>
                        <div>โทรศัพท์ (สำรอง) : {{ dialogData.phone2 }}</div>
                        <div>โทรสาร : {{ dialogData.fax }}</div>
                      </v-card-text>
                      <v-card-actions>
                        <v-col class="mt-0 pt-0">
                          <div class="text-right align-right">
                            <v-btn
                              color="error"
                              class="mr-4"
                              :disabled="disableAll === true"
                              v-if="showSend.A === false"
                              @click="edit('A')"
                            >
                              แก้ไข
                            </v-btn>
                            <v-btn
                              color="error"
                              class="mr-4"
                              v-if="showSend.A === true"
                              @click="clear('A')"
                            >
                              ยกเลิก
                            </v-btn>
                            <v-btn
                              color="success"
                              class="mr-4"
                              v-if="showSend.A === true"
                              @click="sentData('A')"
                            >
                              บันทึก
                            </v-btn>
                          </div>
                        </v-col>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-col>
                <!-- End FormA -->

                <!--  FormB -->
                <v-col cols="4">
                  <v-card outlined class="mb-5">
                    <v-card-title>
                      <div class="body-1 font-weight-bold">
                        รายชื่อผู้ติดต่อ
                      </div>
                    </v-card-title>
                    <v-alert
                      class="ml-4 mr-4 mb-0"
                      outlined
                      type="success"
                      text
                      v-if="this.alert.B"
                    >
                      แก้ไขข้อมูลสำเร็จ
                    </v-alert>
                    <v-form ref="formB" lazy-validation>
                      <div v-if="this.form.B">
                        <v-card-text
                          class="caption"
                          v-for="(item, ci) in dialogData.contact"
                          :key="ci"
                        >
                          <v-row no-gutters>
                            <v-col cols="12" class="mt-3">
                              <div>
                                <b>รายชื่อผู้ติดต่อคนที่ {{ ++ci }}</b>
                              </div>
                            </v-col>
                          </v-row>

                          <v-row no-gutters>
                            <v-col cols="2" class="mt-3">
                              คำนำหน้า :
                            </v-col>
                            <v-col cols="10" class="my-0 py-0 mt-n3">
                              <v-radio-group v-model="item.title" row>
                                <v-radio label="นาย" value="นาย"></v-radio>
                                <v-radio
                                  label="นางสาว"
                                  value="นางสาว"
                                ></v-radio>
                                <v-radio label="นาง" value="นาง"></v-radio>
                                <v-radio label="อื่นๆ" value="อื่นๆ"></v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>

                          <v-row no-gutters>
                            <v-col cols="1" class="mt-3">
                              ชื่อ :
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                class="pa-0 ma-0"
                                dense
                                outlined
                                required
                                :rules="Rules.nameRules"
                                v-model="item.name"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="1" class="mt-3 ml-3">
                              สกุล :
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                class="pa-0 ma-0 "
                                dense
                                outlined
                                required
                                :rules="Rules.surnameRules"
                                v-model="item.surname"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="1" class="mt-3">
                              โทรศัพท์:
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                class="pa-0 ma-0"
                                dense
                                outlined
                                required
                                v-mask="'0##-###-####'"
                                :rules="Rules.phoneRules"
                                v-model="item.phone"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="2" class="mt-3 ml-2">
                              โทรศัพท์ (สำรอง):
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                class="pa-0 ma-0 "
                                dense
                                outlined
                                required
                                v-mask="'0##-###-####'"
                                v-model="item.phone2"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="1" class="mt-3">
                              อีเมล :
                            </v-col>
                            <v-col cols="8">
                              <v-text-field
                                class="pa-0 ma-0"
                                dense
                                outlined
                                required
                                v-model="item.email"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="1" class="mt-3">
                              ไลน์ :
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                class="pa-0 ma-0"
                                dense
                                outlined
                                required
                                :rules="Rules.lineRules"
                                v-model="item.line"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="1" class="mt-3 ml-3">
                              ไอจี :
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                class="pa-0 ma-0 "
                                dense
                                outlined
                                required
                                v-model="item.ig"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row no-gutters>
                            <v-col cols="2" class="mt-3">
                              facebook :
                            </v-col>
                            <v-col cols="8">
                              <v-text-field
                                class="pa-0 ma-0"
                                dense
                                outlined
                                required
                                v-model="item.fb"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </div>
                      <div v-if="!this.form.B">
                        <v-card-text
                          class="caption"
                          v-for="(item, ci) in dialogData.contact"
                          :key="ci"
                        >
                          <div>
                            <b>รายชื่อผู้ติดต่อคนที่ {{ ++ci }}</b>
                          </div>
                          <div>
                            ชื่อ-สกุล : {{ item.title }} {{ item.name }}
                            {{ item.surname }}
                          </div>
                          <div>โทรศัพท์ : {{ item.phone }}</div>
                          <div>โทรศัพท์(สำรอง): {{ item.phone2 }}</div>
                          <div>อีเมล : {{ item.email }}</div>
                          <div>ไลน์ : {{ item.line }}</div>
                          <div>ไอจี : {{ item.ig }}</div>
                          <div>facebook : {{ item.fb }}</div>
                        </v-card-text>
                      </div>
                      <v-card-actions>
                        <v-col class="mt-0 pt-0">
                          <div class="text-right align-right">
                            <v-btn
                              color="error"
                              class="mr-4"
                              :disabled="disableAll === true"
                              v-if="showSend.B === false"
                              @click="edit('B')"
                            >
                              แก้ไข
                            </v-btn>
                            <v-btn
                              color="error"
                              class="mr-4"
                              v-if="showSend.B === true"
                              @click="clear('B')"
                            >
                              ยกเลิก
                            </v-btn>
                            <v-btn
                              color="success"
                              class="mr-4"
                              v-if="showSend.B === true"
                              @click="sentData('B')"
                            >
                              บันทึก
                            </v-btn>
                          </div>
                        </v-col>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-col>
                <!-- End FormB -->
                <!-- /// -->
                <!--  FormD -->
                <v-col cols="4">
                  <v-card outlined>
                    <v-card-title>
                      <div class="body-1 font-weight-bold">
                        ชื่อและที่อยู่ในการจัดส่งสินค้า
                      </div>
                    </v-card-title>
                    <v-alert
                      outlined
                      type="success"
                      class="ml-4 mr-4 mb-0"
                      text
                      v-if="this.alert.D"
                    >
                      แก้ไขข้อมูลสำเร็จ
                    </v-alert>
                    <v-form ref="formD" lazy-validation>
                      <v-card-text class="caption" v-if="this.form.D">
                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            ชื่อผู้ติดต่อ :
                          </v-col>
                          <v-col cols="10">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              v-model="dialogData.shipping.name"
                              :rules="Rules.nameRules"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            โทรศัพท์ :
                          </v-col>
                          <v-col cols="10">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.phoneRules"
                              v-mask="'0##-###-####'"
                              v-model="dialogData.shipping.phone"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="2" class="mt-3">
                            ที่อยู่ :
                          </v-col>
                          <v-col cols="10">
                            <v-text-field
                              style="{font-size:15px;}"
                              class="pa-0 ma-0 "
                              no-resize
                              dense
                              outlined
                              required
                              v-model="dialogData.shipping.address"
                              :rules="Rules.addressRules"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="2">
                            <div class="">
                              แผนที่ :
                            </div>
                          </v-col>
                          <v-col cols="10">
                            <v-card
                              v-if="dialogData.shipping.imagemap"
                              outlined
                              class="d-flex align-center  justify-center"
                            >
                              <v-img
                                class="ma-3"
                                :src="
                                  `${API}/public/images/member/${dialogData.shipping.imagemap}`
                                "
                                contain
                                aspect-ratio="1.4"
                                max-width="100"
                              ></v-img>
                            </v-card>
                            <div class="mt-2" v-if="showSend.D === true">
                              <input
                                type="file"
                                name="file"
                                v-on:change="
                                  fileChangeImagemap($event.target.files)
                                "
                              />
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-text class="caption" v-else>
                        <div>
                          ชื่อผู้ติดต่อ : {{ dialogData.shipping.name }}
                        </div>
                        <div>โทรศัพท์ : {{ dialogData.shipping.phone }}</div>
                        <div>ที่อยู่ : {{ dialogData.shipping.address }}</div>
                        <v-row no-gutters v-if="dialogData.shipping.imagemap">
                          <v-col cols="2">
                            <div class="">
                              แผนที่ :
                            </div>
                          </v-col>
                          <v-col cols="10">
                            <v-card
                              outlined
                              class="d-flex align-center  justify-center"
                            >
                              <v-img
                                class="ma-3"
                                :src="
                                  `${API}/public/images/member/${dialogData.shipping.imagemap}`
                                "
                                contain
                                aspect-ratio="1.4"
                                max-width="100"
                              ></v-img>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-col class="mt-0 pt-0">
                          <div class="text-right align-right">
                            <v-btn
                              color="error"
                              class="mr-4"
                              :disabled="disableAll === true"
                              v-if="showSend.D === false"
                              @click="edit('D')"
                            >
                              แก้ไข
                            </v-btn>
                            <v-btn
                              color="error"
                              class="mr-4"
                              v-if="showSend.D === true"
                              @click="clear('D')"
                            >
                              ยกเลิก
                            </v-btn>
                            <v-btn
                              color="success"
                              class="mr-4"
                              v-if="showSend.D === true"
                              @click="sentData('D')"
                            >
                              บันทึก
                            </v-btn>
                          </div>
                        </v-col>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                  <!-- End FormD -->

                  <!--  FormC -->
                  <v-card outlined class="mt-5">
                    <v-card-title>
                      <div class="body-1 font-weight-bold">
                        ชื่อที่อยู่ในการออก "ใบส่งสินค้า ใบกำกับภาษี
                        ใบเสร็จรับเงิน"
                      </div>
                    </v-card-title>
                    <v-alert
                      outlined
                      type="success"
                      text
                      class="ml-4 mr-4 mb-0"
                      v-if="this.alert.C"
                    >
                      แก้ไขข้อมูลสำเร็จ
                    </v-alert>
                    <v-form ref="formC" lazy-validation>
                      <v-card-text class="caption" v-if="this.form.C">
                        <v-row no-gutters>
                          <v-col cols="1" class="mt-3">
                            ชื่อ :
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              class="pa-0 ma-0 mr-4 "
                              dense
                              outlined
                              required
                              :rules="Rules.nameRules"
                              v-model="dialogData.tax.name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2" class="mt-3">
                            เบอร์โทรศัพท์ :
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.phoneRules"
                              v-model="dialogData.tax.phone"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="3" class="mt-3">
                            เลขประจำตัวผู้เสียภาษี :
                          </v-col>
                          <v-col cols="9">
                            <v-text-field
                              class="pa-0 ma-0"
                              dense
                              outlined
                              required
                              :rules="Rules.taxidRules"
                              v-mask="'#-####-######-#-#'"
                              v-model="dialogData.tax.taxid"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row no-gutters>
                          <v-col cols="1" class="mt-3">
                            ที่อยู่ :
                          </v-col>
                          <v-col cols="11">
                            <v-textarea
                              class="pa-0 ma-0"
                              rows="2"
                              dense
                              outlined
                              required
                              :rules="Rules.addressRules"
                              v-model="dialogData.tax.address"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-text class="caption" v-else>
                        <div>ชื่อ : {{ dialogData.tax.name }}</div>
                        <div>เบอร์โทรศัพท์ : {{ dialogData.tax.phone }}</div>
                        <div>ที่อยู่ : {{ dialogData.tax.address }}</div>
                        <div>
                          เลขประจำตัวผู้เสียภาษี : {{ dialogData.tax.taxid }}
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-col class="mt-0 pt-0">
                          <div class="text-right align-right">
                            <v-btn
                              color="error"
                              class="mr-4"
                              :disabled="disableAll === true"
                              v-if="showSend.C === false"
                              @click="edit('C')"
                            >
                              แก้ไข
                            </v-btn>
                            <v-btn
                              color="error"
                              class="mr-4"
                              v-if="showSend.C === true"
                              @click="clear('C')"
                            >
                              ยกเลิก
                            </v-btn>
                            <v-btn
                              color="success"
                              class="mr-4"
                              v-if="showSend.C === true"
                              @click="sentData('C')"
                            >
                              บันทึก
                            </v-btn>
                          </div>
                        </v-col>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-col>
                <!-- End FormC -->
                <!-- // -->
                <!-- FormE -->
                <v-col cols="12">
                  <v-card outlined>
                    <v-card-title>
                      <div class="body-1 font-weight-bold">
                        เอกสารประกอบการสมัครสมาชิก
                      </div>
                    </v-card-title>
                    <v-alert
                      class="ml-4 mr-4 mb-0"
                      outlined
                      type="success"
                      text
                      v-if="this.alert.E"
                    >
                      แก้ไขข้อมูลสำเร็จ
                    </v-alert>
                    <v-card-text class="caption">
                      <v-form ref="formE" lazy-validation>
                        <v-row>
                          <v-col cols="2">
                            <div class="subtitle-2 text-center">
                              หน้าบัตรประชาชน
                            </div>
                            <v-card
                              outlined
                              class="d-flex align-center  justify-center"
                            >
                              <v-img
                                class="ma-3"
                                :src="
                                  `${API}/public/images/member/${dialogData.document.imageA}`
                                "
                                contain
                                aspect-ratio="1.4"
                                max-width="100"
                              ></v-img>
                            </v-card>
                            <div class="mt-2" v-if="showSend.E === true">
                              <input
                                type="file"
                                name="file"
                                v-on:change="fileChangeA($event.target.files)"
                              />
                            </div>
                          </v-col>
                          <v-col cols="2">
                            <div class="subtitle-2 text-center">
                              หลังบัตรประชาชน
                            </div>
                            <v-card
                              outlined
                              class="d-flex align-center  justify-center"
                            >
                              <v-img
                                class="ma-3"
                                :src="
                                  `${API}/public/images/member/${dialogData.document.imageB}`
                                "
                                contain
                                aspect-ratio="1.4"
                                max-width="100"
                              ></v-img>
                            </v-card>
                            <div class="mt-2" v-if="showSend.E === true">
                              <input
                                type="file"
                                name="file"
                                v-on:change="fileChangeB($event.target.files)"
                              />
                            </div>
                          </v-col>
                          <v-col cols="2">
                            <div class="subtitle-2 text-center">
                              ใบทะเบียนการค้า
                            </div>
                            <v-card
                              outlined
                              class="d-flex align-center  justify-center"
                            >
                              <v-img
                                class="ma-3"
                                :src="
                                  `${API}/public/images/member/${dialogData.document.imageC}`
                                "
                                contain
                                aspect-ratio="1.4"
                                max-width="100"
                              ></v-img>
                            </v-card>
                            <div class="mt-2" v-if="showSend.E === true">
                              <input
                                type="file"
                                name="file"
                                v-on:change="fileChangeC($event.target.files)"
                              />
                            </div>
                          </v-col>

                          <v-col cols="2">
                            <div class="subtitle-2 text-center">
                              รูปถ่ายหน้าร้าน
                            </div>
                            <v-card
                              outlined
                              class="d-flex align-center  justify-center"
                            >
                              <v-img
                                class="ma-3"
                                :src="
                                  `${API}/public/images/member/${dialogData.document.imageD}`
                                "
                                contain
                                aspect-ratio="1.4"
                                max-width="100"
                              ></v-img>
                            </v-card>
                            <div class="mt-2" v-if="showSend.E === true">
                              <input
                                type="file"
                                name="file"
                                v-on:change="fileChangeD($event.target.files)"
                              />
                            </div>
                          </v-col>
                        </v-row>
                        <v-card-actions>
                          <v-col class="mt-0 pt-0">
                            <div class="text-right align-right">
                              <v-btn
                                color="error"
                                class="mr-4"
                                :disabled="disableAll === true"
                                v-if="showSend.E === false"
                                @click="edit('E')"
                              >
                                แก้ไข
                              </v-btn>
                              <v-btn
                                color="error"
                                class="mr-4"
                                v-if="showSend.E === true"
                                @click="clear('E')"
                              >
                                ยกเลิก
                              </v-btn>
                              <v-btn
                                color="success"
                                class="mr-4"
                                v-if="showSend.E === true"
                                @click="sentData('E')"
                              >
                                บันทึก
                              </v-btn>
                            </div>
                          </v-col>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- End FormE -->
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card>
  </v-container>
</template>

<script>
import Admin from "@/Models/Admin";
import axios from "axios";
import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

export default {
  data() {
    return {
      API: "https://tadmin.carwashsupply.co.th",
      dialogData: "",
      dialogEdit: false,
      dialog: false,
      preload: false,
      headers: [
        {
          text: "รหัสสมาชิก",
          align: "start",
          sortable: false,
          value: "sku",
        },
        { text: "ชื่อร้านค้า", value: "shop" },
        { text: "ชื่อ-สกุล", value: "name" },
        { text: "เบอรโทร", value: "phone" },
        { text: "อีเมล์", value: "email" },
        { text: "ไลน์ไอดี", value: "line" },
        { text: "ดูรายละเอียด", value: "actions", sortable: false },
      ],
      members: [],
      members2: [],
      files: new FormData(),
      disableAll: false,
      form: { A: false, B: false, C: false, D: false, E: false },
      showSend: { A: false, B: false, C: false, D: false, E: false },
      alert: { A: false, B: false, C: false, D: false, E: false },
      Rules: {
        //A
        shopRules: [(v) => !!v || "กรุณากรอก ชื่อร้านค้า"],
        tradenumberRules: [
          (v) => !!v || "กรุณากรอก เลขทะเบียนการค้า",
          (v) => v && v.length == 17,
        ],
        //ABCD
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
        //D
        taxidRules: [(v) => !!v || "กรุณากรอก เลขประจำตัวผู้เสียภาษี"],
        addressRules: [(v) => !!v || "กรุณากรอก ที่อยู่"],
        //E
        nameRulesE: [(v) => !!v || "กรุณากรอก ชื่อผู้ติดต่อคนที่ 1"],
        //F
        imageDataFRules: [
          (v) => !!v || "กรุณาส่ง รูปภ่ายบัตรประชาชนตัวจริง หน้า",
        ],
        imageDataBRules: [
          (v) => !!v || "กรุณาส่ง รูปภ่ายบัตรประชาชนตัวจริง หลัง",
        ],
        imageDataCRules: [(v) => !!v || "กรุณาส่ง บทะเบียนการค้า"],
        imageDataSRules: [(v) => !!v || "กรุณาส่ง รูปถ่ายหน้าร้านจำนวน 1 ภาพ"],
      },
    };
  },
  computed: {
    Admins() {
      return Admin.all();
    },
  },
  methods: {
    open(item) {
      this.dialogData = "";
      this.dialog = true;
      this.dialogData = item;
    },
    async loadMember() {
      // console.log(this.Admins[0].id)
      this.preload = true;
      try {
        const response = await fetch(
          this.API + "/api/v1/agent/member/" + this.Admins[0].id
        );
        const data = await response.json();

        this.members = JSON.parse(JSON.stringify(data.success.data));
        this.members2 = JSON.parse(JSON.stringify(data.success.data));
        this.preload = false;
      } catch (error) {
        console.error(error);
      }
    },
    async sentData(step) {
      if (
        this.$refs.formA.validate() &&
        this.$refs.formB.validate() &&
        this.$refs.formC.validate() &&
        this.$refs.formD.validate() &&
        this.$refs.formE.validate()
      ) {
        this.$confirm("Are you sure?")
          .then(async () => {
            let form = [];
            let subPath = "";
            if (step === "A") {
              console.log("++++++ form A member ++++++");
              subPath = `/api/v1/member/${this.members[0].id}/update`;
              form = {
                id: this.members[0].id,
                subbranch: this.members[0].subbranch, //ชื่อร้านค้า
                shop: this.members[0].shop, //ชื่อร้านค้า
                tradenumber: this.members[0].tradenumber, //เลขทะเบียนการค้า
                title: this.members[0].title, //นาย
                name: this.members[0].name, //ชื่อ
                surname: this.members[0].surname, //นามสกุล
                idcard: this.members[0].idcard, //เลขที่บัตรประชาชน
                village: this.members[0].village, //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
                floor: this.members[0].floor, //ชั้น
                roomnumber: this.members[0].roomnumber, //ห้องเลขที่
                houseon: this.members[0].houseon, //บ้านเลขที่
                villageno: this.members[0].villageno, //หมู่ที่
                road: this.members[0].road, //ถนน
                alley: this.members[0].alley, //ตรอก/ซอย
                subdistrict: this.members[0].subdistrict, //ตำบล
                district: this.members[0].district, //อำเภอ
                province: this.members[0].province, //จังหวัด
                postalcode: this.members[0].postalcode, //รหัสไปรษณีย์
                phone: this.members[0].phone, //โทรศัพท์
                phone2: this.members[0].phone2, //โทรศัพท์2
                email: this.members[0].email, //อีเมล
                line: this.members[0].line, //ไลน์
                ig: this.members[0].ig, //ไอจี
                fb: this.members[0].fb, //facebook
              };
            } else if (step === "B") {
              //  dialogData.contact
              console.log("++++++ form B contact ++++++");
              console.log(this.members[0].contact[0].id);
              subPath = `/api/v1/member/contact/${this.members[0].contact[0].id}/update`;
              form = {
                member_id: this.members[0].contact[0].member_id,
                id: this.members[0].contact[0].id,
                title: this.members[0].contact[0].title,
                name: this.members[0].contact[0].name,
                surname: this.members[0].contact[0].surname,
                phone: this.members[0].contact[0].phone,
                phone2: this.members[0].contact[0].phone2,
                email: this.members[0].contact[0].email,
                line: this.members[0].contact[0].line,
                ig: this.members[0].contact[0].ig,
                fb: this.members[0].contact[0].fb,
              };
            } else if (step === "C") {
              console.log("++++++ 3 form C tax  ++++++");
              subPath = `/api/v1/member/tax/${this.members[0].tax.id}/update`;
              form = {
                name: this.dialogData.tax.name,
                phone: this.dialogData.tax.phone,
                address: this.dialogData.tax.address,
                taxid: this.dialogData.tax.taxid,
              };
            } else if (step === "D") {
              console.log("++++++ form D shipping ++++++");
              subPath = `/api/v1/member/shipping/${this.members[0].shipping.id}/update`;
              form = {
                name: this.members[0].shipping.name,
                address: this.members[0].shipping.address,
                phone: this.members[0].shipping.phone,
                imagemap: this.members[0].shipping.imagemap,
              };
            } else if (step === "E") {
              console.log("++++++ form F document ++++++");
              subPath = `/api/v1/member/document/${this.members[0].document.id}/update`;
              form = {
                imageA: this.members[0].document.imageA,
                imageB: this.members[0].document.imageB,
                imageC: this.members[0].document.imageC,
                imageD: this.members[0].document.imageD,
                imageE: this.members[0].document.imageE,
                imageF: this.members[0].document.imageF,
              };
            }
            // console.log(subPath);
            // thisForm
            // console.log(form);

            let req = await fetch(this.API + subPath, {
              method: "POST",
              body: JSON.stringify(form),
            });
            let res = await req.json();
            if (res.success) {
              this.clear(step, true);
            }
            // this.clear(step, true);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    edit(step) {
      this.disableAll = true;
      if (step === "A") {
        // this.disableA = true;
        this.form.A = true;
        this.showSend.A = true;
      } else if (step === "B") {
        this.form.B = true;
        this.showSend.B = true;
      } else if (step === "C") {
        this.form.C = true;
        this.showSend.C = true;
      } else if (step === "D") {
        this.form.D = true;
        this.showSend.D = true;
      } else if (step === "E") {
        this.form.E = true;
        this.showSend.E = true;
      }
    },
    async clear(step, type) {
      this.disableAll = false;

      if (step === "A") {
        this.showSend.A = false;
        this.form.A = false;
      } else if (step === "B") {
        this.showSend.B = false;
        this.form.B = false;
      } else if (step === "C") {
        this.showSend.C = false;
        this.form.C = false;
      } else if (step === "D") {
        this.showSend.D = false;
        this.form.D = false;
      } else if (step === "E") {
        this.showSend.E = false;
        this.form.E = false;
      }
      if (type == true) {
        this.members2 = [];
        this.members2.push(this.dialogData);
        this.setAlert(step);
      } else {
        this.dialogData = JSON.parse(JSON.stringify(this.members2[0]));
        this.members = JSON.parse(JSON.stringify(this.members2));
      }
    },
    setAlert(step) {
      switch (step) {
        case "A":
          this.alert.A = true;
          setTimeout(() => {
            this.alert.A = false;
          }, 5000);
          break;
        case "B":
          this.alert.B = true;
          setTimeout(() => {
            this.alert.B = false;
          }, 5000);
          break;
        case "C":
          this.alert.C = true;
          setTimeout(() => {
            this.alert.C = false;
          }, 5000);
          break;
        case "D":
          this.alert.D = true;
          setTimeout(() => {
            this.alert.D = false;
          }, 5000);
          break;
        case "E":
          this.alert.E = true;
          setTimeout(() => {
            this.alert.E = false;
          }, 5000);
          break;
        case "F":
          this.alert.F = true;
          setTimeout(() => {
            this.alert.F = false;
          }, 5000);
          break;
        default:
          break;
      }
    },
    fileChangeA(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.dialogData.document.imageA = result.data.success.imageName;
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
          this.dialogData.document.imageB = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    fileChangeC(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.dialogData.document.imageC = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    fileChangeD(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.dialogData.document.imageD = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    fileChangeImagemap(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.dialogData.shipping.imagemap = result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
  created() {
    this.loadMember();
  },
};
</script>
