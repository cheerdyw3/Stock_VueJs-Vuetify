<template>
  <v-list dense>
    <v-row no-gutters class="my-5">
      <v-col cols="12" class="d-flex d-flex-block align-center justify-center">
        <h1>ยินดีต้อนรับ</h1>
      </v-col>
      <v-col cols="12" class="d-flex d-flex-block align-center justify-center">
        <h3>ตัวแทนจำหน่าย</h3>
      </v-col>
      <v-col cols="12" class="d-flex d-flex-block align-center justify-center">
        <h4>{{ Admins[0].sku }}</h4>
      </v-col>
    </v-row>
    <div v-for="(item, index) in items" :key="index">
      <v-row class="grey lighten-1 text-left pl-3" dark>
        <v-col class="caption py-2"> {{ index + 1 }}. {{ item.name }} </v-col>
      </v-row>
      <template v-for="(item2, indexData) in item.data">
        <v-divider :key="indexData" :inset="item2.inset"></v-divider>
        <v-list-item :key="item2.text" link>
          <v-list-item-content @click="Menu(item2.action)">
            <v-list-item-title class="caption">
              {{ item2.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </div>
  </v-list>
</template>

<script>
import Admin from "@/Models/Admin";
export default {
  props: {
    source: String,
  },
  computed: {
    Admins() {
      return Admin.all();
    },
  },
  data: () => ({
    dialog: false,
    drawer: true,
    items: [
      {
        name: "แก้ไข/เพิ่มเติม/เปลี่ยนแปลงข้อมูล",
        data: [
          { action: "Profile", text: "แก้ไข/ข้อมูลส่วนตัว" },
          { action: "ChangePassword", text: "เปลี่ยนรหัสผ่าน" },
        ],
      },
      {
        name: "ประวัติการทำธุระกรรมกับตัวแทนจำหน่าย",
        data: [
          { action: "Member", text: "ประวัติการสั่งซื้อสินค้า" },
          { action: "Member", text: "ประวัติการรับค่าคอมมิชั่น" },
          { action: "Member", text: "ประวัติการเคลมสินค้า" },
          { action: "Member", text: "ประวัติการสนทนา" },
        ],
      },

      {
        name: "ประวัติการการออกเอกสาร",
        data: [
          { action: "Member", text: "ประวัติการขายสินค้า" },
          { action: "Member", text: "ประวัติการเปิดใบเสนอราคา" },
          { action: "Member", text: "ประวัติการติดตั้งและซ่อมบำรุง" },
          { action: "Member", text: "ประวัติการเคลมสินค้า" },
          { action: "Member", text: "ฐานข้อมูลสมาชิก" },
          { action: "Member", text: "ประวัติการสนทนา" },
        ],
      },

      {
        name: "การออกเอกสาร",
        data: [
          { action: "PurchaseOrder", text: "เปิดใบสั่งซื้อให้ CWS" },
          { action: "", text: "ส่งใบโอนเงิน" },
          { action: "Quotation", text: "เปิดใบเสนอราคา" },
          { action: "Invoice", text: "เปิดใบส่งสินค้า" },
          { action: "TemporaryReceipt", text: "เปิดใบรับเงินชั่วคราว" },
          {
            action: "TaxInvoiceReceipt",
            text: "เปิดใบกำกับภาษี/ใบเสร็จรับเงิน",
          },
        ],
      },
      {
        name: "ติดต่อสอบถาม",
      },
    ],
  }),
  methods: {
    Menu(url) {
      this.$router.push({ path: url }, () => {});
    },
  },
};
</script>
