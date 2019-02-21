<template>
   
     <el-menu 
     mode="vertical"
      unique-opened 
     :default-active="$route.path" 
     background-color="#81cba2b0" 
     text-color="#fff" 
    active-text-color="#ffd04b"
    >
      <sidebar-item ></sidebar-item>
    </el-menu> 
    
</template>

<script>
 import sidebarItem from './SidebarItem.vue'
  import { store } from "vuex";
export default {

   components: { sidebarItem },
  computed: {
    
   
  }
}

</script>
<style scoped>


/* a{
  text-decoration: none
} */
</style>
