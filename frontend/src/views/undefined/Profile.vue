<template>
  <div>
    <v-container>
      <v-card elevation="0" class="mb-3">
        <h3>ข้อมูลส่วนตัว</h3>
      </v-card>
      <v-progress-linear
        v-if="preload"
        indeterminate
        color="blue darken-3"
      ></v-progress-linear>

      <div v-else>
        <v-container fluid class="grey lighten-5">
          <v-col class="pa-0 ma-0" cols="12">
            <v-form ref="formA" lazy-validation>
              <v-row no-gutters>
                <v-col cols="12" class="body-1 font-weight-bold">
                  ชื่อกิจการและชื่อเจ้าของกิจการ (ใช้ในการจัดส่งเอกสารทุกชนิด)
                </v-col>
              </v-row>
              <v-alert
                outlined
                type="success"
                text
                class="mt-3"
                v-if="this.alert.A"
              >
                แก้ไขข้อมูลสำเร็จ
              </v-alert>
              <v-row class="mt-2">
                <v-col class="my-0 py-0 mt-2 d-flex flex-row" cols="2">
                  ชื่อนิติบุคคล*
                </v-col>
                <v-col class="my-0 py-0 ml-n2" cols="6">
                  <v-text-field
                    :disabled="disableA === false"
                    v-model="members.member[0].shop"
                    :rules="Rules.shopRules"
                    dense
                    outlined
                    label="ชื่อร้าน*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="2" class="mt-2">
                  <span>เลขทะเบียน*</span>
                </v-col>
                <v-col class="my-0 py-0 d-flex flex-row" cols="4">
                  <v-text-field
                    :disabled="disableA === false"
                    v-model="members.member[0].tradenumber"
                    :rules="Rules.tradenumberRules"
                    dense
                    outlined
                    label="เลขทะเบียน"
                    v-mask="'#-####-######-#-#'"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col class="mt-2" cols="4">
                  <span>ข้อมูลที่อยู่ตามหนังสือรับรองบริษัท</span>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <v-col class="my-0 py-0" cols="8">
                      <v-text-field
                        :disabled="disableA === false"
                        v-model="members.member[0].village"
                        dense
                        outlined
                        label="ชื่อหมู่บ้าน,คอนโด,อาคาร ฯลฯ"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                      <v-text-field
                        :disabled="disableA === false"
                        dense
                        outlined
                        label="ชั้น"
                        v-model="members.member[0].floor"
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                      <v-text-field
                        :disabled="disableA === false"
                        dense
                        outlined
                        label="ห้องเลขที่"
                        v-model="members.member[0].roomnumber"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                      <v-text-field
                        :disabled="disableA === false"
                        :rules="Rules.houseonRules"
                        dense
                        outlined
                        label="บ้านเลขที่*"
                        v-model="members.member[0].houseon"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="2">
                      <v-text-field
                        :disabled="disableA === false"
                        dense
                        outlined
                        label="หมู่ที่"
                        v-model="members.member[0].villageno"
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="4">
                      <v-text-field
                        :disabled="disableA === false"
                        dense
                        outlined
                        label="ตรอก/ซอย"
                        v-model="members.member[0].alley"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="4">
                      <v-text-field
                        :disabled="disableA === false"
                        dense
                        outlined
                        label="ถนน"
                        v-model="members.member[0].road"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="3">
                      <v-text-field
                        :disabled="disableA === false"
                        :rules="Rules.subdistrictRules"
                        dense
                        outlined
                        label="แขวง/ตำบล*"
                        v-model="members.member[0].subdistrict"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="3">
                      <v-text-field
                        :disabled="disableA === false"
                        :rules="Rules.districtRules"
                        dense
                        outlined
                        label="เขต/อำเภอ*"
                        v-model="members.member[0].district"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="3">
                      <v-text-field
                        dense
                        outlined
                        label="จังหวัด*"
                        v-model="members.member[0].province"
                        required
                        :disabled="disableA === false"
                        :rules="Rules.provinceRules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="3">
                      <v-text-field
                        :disabled="disableA === false"
                        :rules="Rules.postalcodeRules"
                        dense
                        outlined
                        v-mask="'#####'"
                        required
                        label="รหัสไปรษณีย์*"
                        v-model="members.member[0].postalcode"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="4" class="mt-2">
                  <span>เบอร์โทรศัพท์</span>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col class="my-0 py-0" cols="4">
                      <v-text-field
                        :disabled="disableA === false"
                        :rules="Rules.phoneRules"
                        dense
                        outlined
                        label="เบอร์โทรศัพท์ 1*"
                        v-model="members.member[0].phone"
                        v-mask="'0##-###-####'"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="4">
                      <v-text-field
                        :disabled="disableA === false"
                        dense
                        outlined
                        label="เบอร์โทรศัพท์ 2"
                        v-model="members.member[0].phone2"
                        v-mask="'0##-###-####'"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="4" class="mt-2">
                  <span>โทรสาร</span>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col class="my-0 py-0" cols="4">
                      <v-text-field
                        :disabled="disableA === false"
                        :rules="Rules.faxRules"
                        dense
                        outlined
                        label="โทรสาร"
                        v-model="members.member[0].fax"
                        v-mask="'0##-###-###'"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <div class="text-right align-center">
                    <v-btn
                      :disabled="disableAll === true"
                      v-if="showSendA === false"
                      color="error"
                      class="mr-4"
                      @click="edit('A')"
                    >
                      แก้ไข
                    </v-btn>
                    <v-btn
                      v-if="showSendA === true"
                      color="error"
                      class="mr-4"
                      @click="clear('A')"
                    >
                      ยกเลิก
                    </v-btn>
                    <v-btn
                      v-if="showSendA === true"
                      color="success"
                      class="mr-4"
                      @click="sentData('A')"
                    >
                      บันทึก
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-container>
        <!-- " form B ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ " -->

        <v-container
          fluid
          class="grey lighten-5 mt-5"
          v-bind:class="{ 'blue lighten-5 mt-5': this.showSendB }"
        >
          <v-col class="pa-0 ma-0" cols="12">
            <v-row no-gutters>
              <v-col cols="12" class="body-1 font-weight-bold">
                ชื่อกรรมการผู้มีอำนาจ
              </v-col>
            </v-row>
            <v-alert
              outlined
              type="success"
              text
              class="mt-3"
              v-if="this.alert.B"
            >
              แก้ไขข้อมูลสำเร็จ
            </v-alert>
            <!-- com B -->
            <v-row
              no-gutters
              class="mt-3"
              v-for="(item, i) in members.member[0].committee"
              :key="i"
            >
              <formMemberB
                :count="++i"
                :id="item.id"
                :data="item"
                :disableAll="disableAll"
                @alertFormB="setAlert($event)"
                @disableInB="changeStatusDisableB($event)"
              >
              </formMemberB>
            </v-row>
            <!-- com B -->
          </v-col>
        </v-container>

        <!-- " form C ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ " -->

        <v-container fluid class="grey lighten-5 mt-5">
          <v-col class="pa-0 ma-0" cols="12">
            <v-row no-gutters>
              <v-col cols="12" class="body-1 font-weight-bold">
                รายชื่อผู้ติดต่อ
              </v-col>
            </v-row>
            <v-alert
              outlined
              type="success"
              text
              class="mt-3"
              v-if="this.alert.C"
            >
              แก้ไขข้อมูลสำเร็จ
            </v-alert>
            <v-form ref="formC" lazy-validation>
              <v-row>
                <v-col class="my-0 py-0 mt-n3 d-flex flex-row" cols="4">
                  <v-radio-group
                    v-model="members.member[0].contact[0].title"
                    :disabled="disableC === false"
                    row
                  >
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
                    v-model="members.member[0].contact[0].name"
                    :rules="Rules.nameRules"
                    :disabled="disableC === false"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="my-0 py-0" cols="4">
                  <v-text-field
                    dense
                    outlined
                    v-model="members.member[0].contact[0].surname"
                    :rules="Rules.surnameRules"
                    label="นามสกุล*"
                    :disabled="disableC === false"
                    required
                  >
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
                      <v-text-field
                        dense
                        outlined
                        label="เบอร์โทรศัพท์ 1*"
                        v-mask="'0##-###-####'"
                        v-model="members.member[0].contact[0].phone"
                        :rules="Rules.phoneRules"
                        :disabled="disableC === false"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="4">
                      <v-text-field
                        dense
                        outlined
                        label="เบอร์โทรศัพท์ 2"
                        v-mask="'0##-###-####'"
                        v-model="members.member[0].contact[0].phone2"
                        :disabled="disableC === false"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="4" class="body-1 font-weight-bold">
                  <span>ข้อมูลการติดต่อ</span>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col class="my-0 py-0" cols="6">
                      <v-text-field
                        dense
                        outlined
                        label="Email*"
                        v-model="members.member[0].contact[0].email"
                        :rules="Rules.emailRules"
                        :disabled="disableC === false"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="6">
                      <v-text-field
                        dense
                        outlined
                        label="ID Line*"
                        v-model="members.member[0].contact[0].line"
                        :rules="Rules.lineRules"
                        :disabled="disableC === false"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="6">
                      <v-text-field
                        dense
                        outlined
                        label="Instagram"
                        v-model="members.member[0].contact[0].ig"
                        :disabled="disableC === false"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="6">
                      <v-text-field
                        dense
                        outlined
                        label="Facebook"
                        v-model="members.member[0].contact[0].fb"
                        :disabled="disableC === false"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-right align-center">
                    <v-btn
                      :disabled="disableAll === true"
                      v-if="showSendC === false"
                      color="error"
                      class="mr-4"
                      @click="edit('C')"
                    >
                      แก้ไข
                    </v-btn>
                    <v-btn
                      v-if="showSendC === true"
                      color="error"
                      class="mr-4"
                      @click="clear('C')"
                    >
                      ยกเลิก
                    </v-btn>
                    <v-btn
                      v-if="showSendC === true"
                      color="success"
                      class="mr-4"
                      @click="sentData('C')"
                    >
                      บันทึก
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-container>

        <!-- " form D  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ " -->

        <v-container fluid class=" pa-0  mt-5">
          <v-row>
            <v-col cols="6" class="pt-0">
              <div class="grey lighten-5 pa-5">
                <v-col class="pa-0 ma-0" cols="12">
                  <v-row no-gutters>
                    <v-col cols="12" class="body-1 font-weight-bold">
                      ชื่อที่อยู่ในการออก "ใบส่งสินค้า ใบกำกับภาษี
                      ใบเสร็จรับเงิน"
                    </v-col>
                  </v-row>
                  <v-alert
                    outlined
                    type="success"
                    text
                    class="mt-3"
                    v-if="this.alert.D"
                  >
                    แก้ไขข้อมูลสำเร็จ
                  </v-alert>
                  <v-form ref="formD" lazy-validation class="mt-3">
                    <v-row>
                      <v-col class="my-0 py-0" cols="6">
                        <v-text-field
                          dense
                          outlined
                          label="ชื่อ-สกุล*"
                          v-model="members.member[0].tax.name"
                          :rules="Rules.nameRules"
                          :disabled="disableD === false"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="my-0 py-0" cols="12">
                        <v-text-field
                          dense
                          outlined
                          label="ที่อยู่*"
                          v-model="members.member[0].tax.address"
                          :rules="Rules.addressRules"
                          :disabled="disableD === false"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="my-0 py-0" cols="6">
                        <v-text-field
                          dense
                          outlined
                          label="โทรศัพท์*"
                          v-mask="'0##-###-####'"
                          v-model="members.member[0].tax.phone"
                          :rules="Rules.phoneRules"
                          :disabled="disableD === false"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="my-0 py-0" cols="6">
                        <v-text-field
                          dense
                          outlined
                          label="เลขประจำตัวผู้เสียภาษี*"
                          v-mask="'#-####-######-#-#'"
                          v-model="members.member[0].tax.taxid"
                          :rules="Rules.taxidRules"
                          :disabled="disableD === false"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- button -->
                    <v-row>
                      <v-col>
                        <div class="text-right align-center">
                          <v-btn
                            :disabled="disableAll === true"
                            v-if="showSendD === false"
                            color="error"
                            class="mr-4"
                            @click="edit('D')"
                          >
                            แก้ไข
                          </v-btn>
                          <v-btn
                            v-if="showSendD === true"
                            color="error"
                            class="mr-4"
                            @click="clear('D')"
                          >
                            ยกเลิก
                          </v-btn>
                          <v-btn
                            v-if="showSendD === true"
                            color="success"
                            class="mr-4"
                            @click="sentData('D')"
                          >
                            บันทึก
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </div>
            </v-col>

            <!-- " form E++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ " -->

            <v-col cols="6" class="pt-0">
              <div class="grey lighten-5 pa-5">
                <v-col class="pa-0 ma-0" cols="12">
                  <v-row no-gutters>
                    <v-col cols="12" class="body-1 font-weight-bold">
                      ชื่อและที่อยู่ในการจัดส่งสินค้า
                    </v-col>
                  </v-row>
                  <v-alert
                    outlined
                    type="success"
                    text
                    class="mt-3"
                    v-if="this.alert.E"
                  >
                    แก้ไขข้อมูลสำเร็จ
                  </v-alert>
                  <v-form ref="formE" lazy-validation class="mt-3">
                    <v-row no-gutters>
                      <v-col cols="2" class="mt-2">
                        <span>ชื่อผู้ติดต่อคนที่ 1</span>
                      </v-col>
                      <v-col cols="8">
                        <v-row>
                          <v-col class="my-0 py-0" cols="6">
                            <v-text-field
                              dense
                              outlined
                              label="ชื่อ-สกุล*"
                              v-model="members.member[0].shipping.name"
                              :rules="Rules.nameRules"
                              :disabled="disableE === false"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col class="my-0 py-0" cols="6">
                            <v-text-field
                              dense
                              outlined
                              label="โทรศัพท์*"
                              v-mask="'0##-###-####'"
                              v-model="members.member[0].shipping.phone"
                              :rules="Rules.phoneRules"
                              :disabled="disableE === false"
                              required
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="2"></v-col>
                    </v-row>
                    <v-row>
                      <v-col class="my-0 py-0" cols="12">
                        <v-text-field
                          dense
                          outlined
                          label="ที่อยู่*"
                          v-model="members.member[0].shipping.address"
                          :rules="Rules.addressRules"
                          :disabled="disableE === false"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col cols="3" class="mt-1 body-1 font-weight-bold">
                        <span>รูปภาพแผนที่ตั้งร้าน</span>
                      </v-col>
                      <v-col cols="8">
                        <v-row>
                          <v-col class="my-0 py-0" cols="6">
                            <input
                              type="file"
                              name="file"
                              :disabled="disableE === false"
                              v-on:change="fileChangeA($event.target.files)"
                            />
                            <v-img
                              v-if="members.member[0].shipping.imagemap"
                              :src="
                                `${API}/public/images/member/${members.member[0].shipping.imagemap}`
                              "
                              class="mx-auto ma-3"
                              max-width="200"
                            ></v-img>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="2"></v-col>
                    </v-row>

                    <!-- button -->
                    <v-row>
                      <v-col>
                        <div class="text-right align-center">
                          <v-btn
                            :disabled="disableAll === true"
                            v-if="showSendE === false"
                            color="error"
                            class="mr-4"
                            @click="edit('E')"
                          >
                            แก้ไข
                          </v-btn>
                          <v-btn
                            v-if="showSendE === true"
                            color="error"
                            class="mr-4"
                            @click="clear('E')"
                          >
                            ยกเลิก
                          </v-btn>
                          <v-btn
                            v-if="showSendE === true"
                            color="success"
                            class="mr-4"
                            @click="sentData('E')"
                          >
                            บันทึก
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <v-container fluid class=" pa-0  mt-5">
          <v-row>
            <v-col cols="6" class="pt-0">
              <div class="grey lighten-5 pa-5">
                <v-col class="pa-0 ma-0" cols="12">
                  <v-row no-gutters>
                    <v-col cols="12" class="body-1 font-weight-bold">
                      บัญชี
                    </v-col>
                  </v-row>
                  <v-alert
                    outlined
                    type="success"
                    text
                    class="mt-3"
                    v-if="this.alert.G"
                  >
                    แก้ไขข้อมูลสำเร็จ
                  </v-alert>
                  <v-form ref="formG" lazy-validation class="mt-3">
                    <v-row>
                      <v-col class="my-0 py-0" cols="8">
                        <v-text-field
                          dense
                          outlined
                          label="บัญชีธนาคาร"
                          v-model="members.member[0].bank.account_bank"
                          :rules="Rules.nameRules"
                          :disabled="disableG === false"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="my-0 py-0" cols="8">
                        <v-text-field
                          dense
                          outlined
                          label="ชื่อบัญชีธนาคาร"
                          v-model="members.member[0].bank.account_name"
                          :disabled="disableG === false"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="my-0 py-0" cols="8">
                        <v-text-field
                          dense
                          outlined
                          label="หมายเลขบัญชี"
                          v-model="members.member[0].bank.account_number"
                          :disabled="disableG === false"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <!-- button -->
                    <v-row>
                      <v-col>
                        <div class="text-right align-center">
                          <v-btn
                            :disabled="disableAll === true"
                            v-if="showSendG === false"
                            color="error"
                            class="mr-4"
                            @click="edit('G')"
                          >
                            แก้ไข
                          </v-btn>
                          <v-btn
                            v-if="showSendG === true"
                            color="error"
                            class="mr-4"
                            @click="clear('G')"
                          >
                            ยกเลิก
                          </v-btn>
                          <v-btn
                            v-if="showSendG === true"
                            color="success"
                            class="mr-4"
                            @click="sentData('G')"
                          >
                            บันทึก
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <!-- " form F ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ " -->

        <v-container fluid class="grey lighten-5  mt-5">
          <v-col class="pa-0 ma-0" cols="12">
            <v-row no-gutters>
              <v-col cols="12" class="body-1 font-weight-bold">
                เอกสารประกอบการสมัครเป็นตัวแทนจำหน่ายประเภท "นิติบุคคล"
              </v-col>
            </v-row>
            <v-alert
              outlined
              type="success"
              text
              class="mt-3"
              v-if="this.alert.F"
            >
              แก้ไขข้อมูลสำเร็จ
            </v-alert>
            <v-form ref="formF" lazy-validation>
              <v-row justify="space-around">
                <v-col cols="2">
                  1. ใบ กพ.20
                </v-col>
                <v-col cols="4">
                  <div class="subheading pb-4">
                    <input
                      type="file"
                      name="file"
                      :disabled="disableF === false"
                      v-on:change="fileChangeC($event.target.files)"
                    />
                  </div>
                  <v-img
                    v-if="members.member[0].document.imageC"
                    :src="
                      `${API}/public/images/member/${members.member[0].document.imageC}`
                    "
                    contain
                    class="mx-auto ma-3"
                    max-width="350"
                  ></v-img>
                </v-col>
                <v-col cols="2">
                  2. รูปถ่ายหน้าร้านจำนวน 1 ภาพ
                </v-col>
                <v-col cols="4">
                  <div class="subheading pb-4">
                    <input
                      type="file"
                      name="file"
                      :disabled="disableF === false"
                      v-on:change="fileChangeD($event.target.files)"
                    />
                  </div>
                  <v-img
                    v-if="members.member[0].document.imageD"
                    :src="
                      `${API}/public/images/member/${members.member[0].document.imageD}`
                    "
                    contain
                    class="mx-auto ma-3"
                    max-width="350"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row justify="space-around">
                <v-col cols="2">
                  3. รูปถ่ายหน้าสมุดบัญชีจำนวน 1 ภาพ
                </v-col>
                <v-col cols="4">
                  <div class="subheading pb-4">
                    <input
                      type="file"
                      name="file"
                      :disabled="disableF === false"
                      v-on:change="fileChangeE($event.target.files)"
                    />
                  </div>
                  <v-img
                    v-if="members.member[0].document.imageE"
                    :src="
                      `${API}/public/images/member/${members.member[0].document.imageE}`
                    "
                    contain
                    class="mx-auto ma-3"
                    max-width="350"
                  ></v-img>
                </v-col>
                <v-col cols="2">
                  4. รูปถ่ายโลโก้ร้านจำนวน 1 ภาพ
                </v-col>
                <v-col cols="4">
                  <div class="subheading pb-4">
                    <input
                      type="file"
                      name="file"
                      :disabled="disableF === false"
                      v-on:change="fileChangeF($event.target.files)"
                    />
                  </div>
                  <v-img
                    v-if="members.member[0].document.imageF"
                    :src="
                      `${API}/public/images/member/${members.member[0].document.imageF}`
                    "
                    contain
                    class="mx-auto ma-3"
                    max-width="350"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-right align-center">
                    <v-btn
                      :disabled="disableAll === true"
                      v-if="showSendF === false"
                      color="error"
                      class="mr-4"
                      @click="edit('F')"
                    >
                      แก้ไข
                    </v-btn>
                    <v-btn
                      v-if="showSendF === true"
                      color="error"
                      class="mr-4"
                      @click="clear('F')"
                    >
                      ยกเลิก
                    </v-btn>
                    <v-btn
                      v-if="showSendF === true"
                      color="success"
                      class="mr-4"
                      @click="sentData('F')"
                    >
                      บันทึก
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
import axios from "axios";
import formMemberB from "@/components/Agent/editFormMemberB";
import Committee from "@/Models/Committee";

export default {
  data() {
    return {
      API: "https://tadmin.carwashsupply.co.th",
      dialogData: "",
      dialog: false,
      preload: false,
      alert: {
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
        F: false,
        G: false,
      },
      members: [],
      members2: [],
      disableA: false,
      disableB: false,
      disableC: false,
      disableD: false,
      disableE: false,
      disableF: false,
      disableG: false,

      showSendA: false,
      showSendB: false,
      showSendC: false,
      showSendD: false,
      showSendE: false,
      showSendF: false,
      showSendG: false,

      subDisableB: false,

      disableAll: false,
      files: new FormData(),
      count: 1,
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
  components: {
    formMemberB,
  },
  computed: {
    Committees() {
      return Committee.all();
    },
  },
  methods: {
    changeStatusDisableB(e) {
      console.log(e);
      if (e.type === "edit") {
        this.disableAll = true;
      } else if (e.type === "clear") {
        this.disableAll = false;
      } else if (e.type === "send") {
        this.disableAll = false;
      }
    },
    async loadMember() {
      this.preload = true;
      try {
        const response = await fetch(this.API + "/api/v1/profile/1");
        const data = await response.json();

        this.members = JSON.parse(JSON.stringify(data.success));
        this.members2 = JSON.parse(JSON.stringify(data.success));
        this.preload = false;
      } catch (error) {
        console.error(error);
      }
    },
    edit(step) {
      this.disableAll = true;
      if (step === "A") {
        this.disableA = true;
        this.showSendA = true;
      } else if (step === "B") {
        this.disableB = true;
        this.showSendB = true;
      } else if (step === "C") {
        this.disableC = true;
        this.showSendC = true;
      } else if (step === "D") {
        this.disableD = true;
        this.showSendD = true;
      } else if (step === "E") {
        this.disableE = true;
        this.showSendE = true;
      } else if (step === "F") {
        this.disableF = true;
        this.showSendF = true;
      } else if (step === "G") {
        this.disableG = true;
        this.showSendG = true;
      }
    },
    async clear(step, type) {
      this.disableAll = false;

      if (step === "A") {
        this.disableA = false;
        this.showSendA = false;
      } else if (step === "B") {
        this.disableB = false;
        this.showSendB = false;
      } else if (step === "C") {
        this.disableC = false;
        this.showSendC = false;
      } else if (step === "D") {
        this.disableD = false;
        this.showSendD = false;
      } else if (step === "E") {
        this.disableE = false;
        this.showSendE = false;
      } else if (step === "F") {
        this.disableF = false;
        this.showSendF = false;
      } else if (step === "G") {
        this.disableG = false;
        this.showSendG = false;
      }
      if (type) {
        this.setAlert(step);
        this.members2 = JSON.parse(JSON.stringify(this.members));
      } else {
        this.members = JSON.parse(JSON.stringify(this.members2));
      }
      // this.loadMember();
    },
    async sentData(step, data) {
      console.log("step");
      console.log(step);
      console.log(data);
      console.log("step");
      if (
        this.$refs.formA.validate() &&
        this.$refs.formC.validate() &&
        this.$refs.formD.validate() &&
        this.$refs.formE.validate() &&
        this.$refs.formF.validate() &&
        this.$refs.formG.validate()
      ) {
        this.$confirm("Are you sure?")
          .then(async () => {
            let form = [];
            let subPath = "";
            if (step === "A") {
              console.log("++++++ form A ++++++");
              subPath = `/api/v1/member/${this.members.member[0].id}/update`;
              form = {
                shop: this.members.member[0].shop, //ชื่อร้านค้า
                tradenumber: this.members.member[0].tradenumber, //เลขทะเบียนการค้า
                title: this.members.member[0].title, //นาย
                name: this.members.member[0].name, //ชื่อ
                surname: this.members.member[0].surname, //นามสกุล
                idcard: this.members.member[0].idcard, //เลขที่บัตรประชาชน
                village: this.members.member[0].village, //ชื่อหมู่บ้าน, คอนโด, อาคาร ฯลฯ
                floor: this.members.member[0].floor, //ชั้น
                roomnumber: this.members.member[0].roomnumber, //ห้องเลขที่
                houseon: this.members.member[0].houseon, //บ้านเลขที่
                villageno: this.members.member[0].villageno, //หมู่ที่
                road: this.members.member[0].road, //ถนน
                alley: this.members.member[0].alley, //ตรอก/ซอย
                subdistrict: this.members.member[0].subdistrict, //ตำบล
                district: this.members.member[0].district, //อำเภอ
                province: this.members.member[0].province, //จังหวัด
                postalcode: this.members.member[0].postalcode, //รหัสไปรษณีย์
                phone: this.members.member[0].phone, //โทรศัพท์
                phone2: this.members.member[0].phone2, //โทรศัพท์2
                email: this.members.member[0].email, //อีเมล
                line: this.members.member[0].line, //ไลน์
                ig: this.members.member[0].ig, //ไอจี
                fb: this.members.member[0].fb, //facebook
              };
            } else if (step === "B") {
              console.log("++++++ form B ++++++");
              console.log(data);

              // subPath = `api/v1/member/contact/${}/update`;
              // this.members.member[0].committee.forEach((el) => form.push(el));
            } else if (step === "C") {
              console.log("++++++ 3 form C Contact  ++++++");
              subPath = `/api/v1/member/contact/${this.members.member[0].contact[0].id}/update`;
              form = {
                member_id: this.members.member[0].contact[0].member_id, //นาย
                id: this.members.member[0].contact[0].id, //นาย
                title: this.members.member[0].contact[0].title, //นาย
                name: this.members.member[0].contact[0].name, //ชื่อ
                surname: this.members.member[0].contact[0].surname, //นามสกุล
                phone: this.members.member[0].contact[0].phone, //โทรศัพท์
                phone2: this.members.member[0].contact[0].phone2, //โทรศัพท์2
                email: this.members.member[0].contact[0].email, //อีเมล
                line: this.members.member[0].contact[0].line, //ไลน์
                ig: this.members.member[0].contact[0].ig, //ไอจี
                fb: this.members.member[0].contact[0].fb, //facebook
                created_at: this.members.member[0].contact[0].created_at, //ไอจี
                updated_at: this.members.member[0].contact[0].updated_at, //facebook
              };
            } else if (step === "D") {
              console.log("++++++ form D ++++++");
              subPath = `/api/v1/member/tax/${this.members.member[0].tax.id}/update`;
              form = {
                name: this.members.member[0].tax.name,
                address: this.members.member[0].tax.address,
                phone: this.members.member[0].tax.phone,
                taxid: this.members.member[0].tax.taxid,
              };
            } else if (step === "E") {
              console.log("++++++ form E ++++++");
              subPath = `/api/v1/member/shipping/${this.members.member[0].shipping.id}/update`;
              form = {
                name: this.members.member[0].shipping.name,
                address: this.members.member[0].shipping.address,
                phone: this.members.member[0].shipping.phone,
                imagemap: this.members.member[0].shipping.imagemap,
                brands: [],
              };
            } else if (step === "F") {
              console.log("++++++ form F ++++++");
              subPath = `/api/v1/member/document/${this.members.member[0].document.id}/update`;
              form = {
                imageA: this.members.member[0].document.imageA,
                imageB: this.members.member[0].document.imageB,
                imageC: this.members.member[0].document.imageC,
                imageD: this.members.member[0].document.imageD,
                imageE: this.members.member[0].document.imageE,
                imageF: this.members.member[0].document.imageF,
              };
            } else if (step === "G") {
              console.log("++++++ form G ++++++");
              subPath = `/api/v1/member/bank/${this.members.member[0].bank.id}/update`;
              form = {
                account_number: this.members.member[0].bank.account_number,
                account_name: this.members.member[0].bank.account_name,
                account_bank: this.members.member[0].bank.account_bank,
              };
            }
            console.log(subPath);
            console.log(form);

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
    fileChangeA(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.members.member[0].shipping.imagemap =
            result.data.success.imageName;
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
          this.members.member[0].document.imageC =
            result.data.success.imageName;
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
          this.members.member[0].document.imageD =
            result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    fileChangeE(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.members.member[0].document.imageE =
            result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    fileChangeF(fileList) {
      this.files.append("file", fileList[0], fileList[0].name);
      axios({
        method: "POST",
        url: this.API + "/api/v1/upload",
        data: this.files,
      }).then(
        (result) => {
          this.members.member[0].document.imageF =
            result.data.success.imageName;
        },
        (error) => {
          console.error(error);
        }
      );
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
        case "G":
          this.alert.G = true;
          setTimeout(() => {
            this.alert.G = false;
          }, 5000);
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.loadMember();
  },
};
</script>

<style></style>
