<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新增宠物" name="first"><PetsAddpets /></el-tab-pane>
    <el-tab-pane label="宠物列表" name="second"> <PetsPetslist /></el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>