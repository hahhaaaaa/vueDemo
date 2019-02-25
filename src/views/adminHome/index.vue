<template>
  <div class="m-home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="fa fa-tasks" style="color: #F56C6C;"></i>
          </div>
          <div class="m-content">
            <p>等待申请门店</p>
            <p class="m-count">未知</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="fa fa-envelope-o fa-fw" style="color: #E6A23C;"></i>
          </div>
          <div class="m-content">
            <p>当前门店数</p>
            <p class="m-count">未知</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="fa fa-file-code-o" style="color: #67C23A;"></i>
          </div>
          <div class="m-content">
            <p>代码量</p>
            <p class="m-count">未知</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="m-box-card" shadow="hover">
          <div class="m-icon">
            <i class="fa fa-snowflake-o" style="color: #409EFF;"></i>
          </div>
          <div class="m-content">
            <p>天气</p>
            <p>{{ info.weather }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- <el-col :sm="24" :lg="18">
        <el-card class="m-box-card" shadow="hover">
          <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
        </el-card>
      </el-col> -->
      <el-col :sm="24" :lg="6">
        <el-row :gutter="20" align>
          <el-col :sm="12" :lg="24">
            <el-card class="m-box-card" shadow="hover"
                     style="height: 215px;background-color: rgb(143, 201, 251);color:#ffffff;">
              <div slot="header">
                <p style="text-align: center">
                  <i class="fa fa-address-card-o" style="color: #F56C6C;font-size: 35px;"></i>
                </p>
                <div style="padding-top: 10px;">
                  <p>账号：{{ user.name }}</p>
                  <p>姓名{{ user.username }}</p>
                 
                </div>
              </div>
              <div style="font-size: 12px;">
                <p>上次登录时间：{{ user.lastTime }}</p>
                <p>上次登录地址：{{ user.lastIp }}</p>
              </div>
            </el-card>
          </el-col>
          <!-- <el-col :sm="12" :lg="24">
            <el-card class="m-box-card" shadow="hover">
              <div style="height: 215px; margin: -20px;background-color: rgb(247, 151, 214);color:#ffffff;">
                <vue-scroll>
                  <div style="padding: 20px;">
                    <p style="font-weight: bold;text-align: center">重要通知</p>
                    <p v-for="index in 20" :key="index">{{index}}. 帅哥/美女出没，请注意！</p>
                    <p>~(˘▾˘~)~(˘▾˘~)</p>
                    <p>对面的帅哥/美女，你好啊。</p>
                  </div>
                </vue-scroll>
              </div>
            </el-card>
          </el-col> -->
        </el-row>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import axios from 'axios'
let { mapMutations, mapState, mapActions } = createNamespacedHelpers("shop");
export default {
  // name: 'FuncHome',
  components: {
    // VeLine,
    // VeScatter
  },
  data () {
    return {
      info: {
        // tasks: parseFloat(12).toLocaleString(),
        // message: parseFloat(6).toLocaleString(),
        // code: parseFloat(5234).toLocaleString(),
        weather: '',
      },
      
      user: {
        name:"",
        username:""
        
      },
     
     
     
     
    }
  },
  methods: {
    ...mapActions(['weather']),
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  },
  mounted(){
    
   axios.get(`http://restapi.amap.com/v3/weather/weatherInfo?city=510100&key=6ca7b720f2ab2a48f749c1e19c3d1c47`).then(({data})=>{
     this.info.weather=`${data.lives[0].province}  ${data.lives[0].city}
      ${data.lives[0].weather}
     `
   }),
     //console.log(localStorage.getItem('user'))
     this.user.name=JSON.parse(localStorage.getItem('user'))[0].userName
     this.user.username=JSON.parse(localStorage.getItem('user'))[0].name
     
  }
}
</script>

<style scoped lang="scss">
.m-home {
   width: 90%;
   margin: 20px auto;
  .m-box-card {
    margin-bottom: 10px;
    color: #666666;
    .m-icon {
      float: left;
      width: 60px;
      i {
        font-size: 40px;
      }
    }
    .m-content {
      margin-left: 60px;
      .m-count {
        font-size: 20px;
      }
    }
  }
  .m-task-box {
    margin-bottom: 20px;
    .m-task-text {
      float: left;
      line-height: 16px;
    }
    .m-task-pro {
      margin-left: 60px;
    }
  }
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
