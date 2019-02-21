<template>
  <div>
    <el-card style="width:90%;margin:40px auto 0">
      <div class="search">
        <el-form :inline="true" :model="formSearch">
          <el-form-item label="地址">
            <el-input v-model="formSearch.keywords" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="serachHadler" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>共100家</div>
      <div class="amap-page-container">
        <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo">
          <el-amap-marker
            v-for="(marker,index) in markers"
            :position="marker.position"
            :events="marker.events"
            :key="index"
          ></el-amap-marker>
          <el-amap-info-window
            v-if="window"
            :position="window.position"
            :visible="window.visible"
            :content="window.content"
          ></el-amap-info-window>
        </el-amap>
      </div>
    </el-card>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
let { mapMutations, mapState, mapActions } = createNamespacedHelpers("chartMap");
export default {
    
  data() {
    return {
      zoom: 16,
      center: [121.59996, 31.197646],
      markers: [],
      windows: [],
      window: "",
      formSearch: {
        keywords: ""
      }
    };
  },

  mounted() {
    let markers = [];
    let windows = [];

    let num = 10;
    let self = this;
//    在mounted中获取所有地址
// 

    for (let i = 0; i < num; i++) {
      markers.push({
        position: [121.59996, 31.197646 + i * 0.001],
        events: {
          click() {
            self.windows.forEach(window => {
              window.visible = false;
            });

            self.window = self.windows[i];
            self.$nextTick(() => {
              self.window.visible = true;
            });
          }
        }
      });

      windows.push({
        position: [121.59996, 31.197646 + i * 0.001],
        content: `<div class="prompt">${i}</div>`,
        visible: false
      });
    }

    this.markers = markers;
    this.windows = windows;
  }
};
</script>
<style scoped>
.search{
    margin-bottom: 20px;
}
.amap-demo {
  height: 500px;
}
.prompt {
  background: white;
  width: 100px;
  height: 30px;
  text-align: center;
}
</style>


