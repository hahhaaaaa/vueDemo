<template>
<div class="main">
    <el-tabs type="border-card"  >
  <el-tab-pane label="食品类添加" class="list"><CommdityAddfood/></el-tab-pane>
  <el-tab-pane label="洗浴类添加" class="list"><CommdityAddclean/></el-tab-pane>
  <el-tab-pane label="其他类添加" class="list"><CommdityAddrests/></el-tab-pane>
</el-tabs>
</div>
 
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.main{
    height: 100vh;
}
.list{
    width: 500px;
    margin: 0 auto;
}
</style>
