<template> 
<section>
    <AppBar :title="title"></AppBar> 
    <v-content>
        <v-container class="fill-height" fluid>
            
        </v-container>
    </v-content>
</section>
 
</template>


<script>   
import AppBar from '@/components/AppBar' 

  export default { 
       data: () => ({  
            title: "ตัวแทนจำหน่าย",
      }),
     components: {
      AppBar,  
    },
  }
</script>
 