<template>
  <div>
    <v-container fluid>
      <v-card elevation="0" class="mb-3">
        <h3>เปลี่ยนรหัสผ่าน</h3>
      </v-card>

      <v-progress-linear
        v-if="preload"
        indeterminate
        color="blue darken-3"
      ></v-progress-linear>
      <v-row>
        <v-col cols="12" >
          <v-card>
            <v-card-text class="pt-12">
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col cols="4" class="text-right">
                    ปัจจุบัน
                  </v-col>
                  <v-col cols="4" class="my-0 py-0">
                    <v-text-field
                      v-model="oldPass"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'oldPass'"
                      name="input-10-1"
                      hint="At least 8 characters"
                      outlined
                      dense
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-right">
                    รหัสผ่านใหม่
                  </v-col>
                  <!-- label="รหัสผ่านใหม่" -->
                  <v-col cols="4" class="my-0 py-0">
                    <v-text-field
                      v-model="newPass"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'newPass'"
                      name="input-10-1"
                      hint="At least 8 characters"
                      outlined
                      dense
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" class="text-right">
                    รหัสผ่านใหม่อีกครั้ง
                  </v-col>
                  <v-col cols="4" class="my-0 py-0">
                    <v-text-field
                      v-model="reNewPass"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show3 ? 'text' : 'reNewPass'"
                      name="input-10-1"
                      hint="At least 8 characters"
                      outlined
                      dense
                      @click:append="show3 = !show3"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="10">
                    <div class="text-right align-center">
                      <v-btn color="success" class="mr-4" @click="sentData()">
                        บันทึก
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preload: false,
      show1: false,
      show2: false,
      show3: false,

      oldPass: "",
      newPass: "",
      reNewPass: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
  methods: {
    sentData() {
      console.log("oldPass = ", this.oldPass);
      console.log("newPass = ", this.newPass);
      console.log("reNewPass = ", this.reNewPass);
    },
  },
};
</script>

<style></style>
