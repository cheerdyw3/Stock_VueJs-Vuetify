<template>
 
<section>
    <AppBar :title="title"></AppBar> 
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row>
                <v-col align="center" justify="center">
                    <v-img src="@/assets/logo.png" width="250"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col align="center" justify="center">
                    <v-btn class="ma-2" outlined large fab color="indigo">
                    <v-icon size="50">mdi-check</v-icon>
                    </v-btn>
                </v-col> 
            </v-row>
            <v-row >
                 <v-col align="center" justify="center">
                    <h1>เพิ่มข้อมูลการลงทะเบียนสำเร็จ</h1>
                    <h2>โปรดรอการแจ้งยืนยันผลทาง อีเมล์ ที่ลงทะเบียนไว้ภายใน 30 นาที</h2>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</section>
 
</template>


<script>   
import AppBar from '@/components/AppBar' 

  export default { 
       data: () => ({  
            title: "การลงทะเบียนสำเร็จ",
      }),
     components: {
      AppBar,  
    },
  }
</script>
 