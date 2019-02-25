<template>
  <div class="login-container">
    <div class="login-notice">
      <div class="login-bg"></div>
      <span class="login-desc2">宠物后台</span>
      <span class="login-desc3">VUE And ElementUI Based Simple Backstage Management</span>
      <span class="login-desc4">SPA system</span>
      <div class="login-sanjiao">
        <div class="login-icon-sanjiao"></div>
      </div>
    </div>
    <div class="login-tabs">
      <div class="login-tabs-title">用户登陆</div>
      <el-form ref="form" label-width="80px" :rules="loginRules" :model="form">
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入用户名"
            auotoComplete="on"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" class="el-input"></el-input>
        </el-form-item>
        <el-form-item label="账户类型">
          <el-select placeholder="账户类型" v-model="form.userType">
            <el-option label="平台管理员" value="1"></el-option>
            <el-option label="门店管理员" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="warning" @click="handleCancel" class="el-button" style="margin-right:10px">取消</el-button>
          <el-button type="warning" @click="login" :loading="loading" class="el-button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background-size: cover;
  height: 100vh;
  min-width: 454px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}
.login-notice {
  position: absolute;
  width: calc(100vw - 454px);
  min-width: 593px;
  margin-right: 454px;
  height: 100vh;
  background: url("../../assets/timg.jpg");
  background-size: cover;
  z-index: -1;
}
.login-bg {
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.login-desc2,
.login-desc3,
.login-desc4,
.login-sanjiao {
  position: absolute;
  right: 90px;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 0.67);
  font-size: 20px;
}

.login-desc2 {
  bottom: 230px;
  font-size: 56px;
  letter-spacing: 3.5px;
  color: #fff;
}

.login-desc3 {
  bottom: 190px;
  color: rgba(255, 255, 255, 0.67);
}

.login-desc4 {
  bottom: 158px;
}

/* 三角箭头 */
.login-sanjiao {
  right: 40px;
  bottom: 240px;
  height: 32px;
  width: 32px;
  background-color: rgba(175, 175, 175, 0.5);
  border-radius: 50%;
}
.login-icon-sanjiao {
  position: absolute;
  top: 10px;
  left: 12px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 12px solid white;
  transform: rotate(90deg);
}

.login-tabs {
  position: fixed;
  right: 0;
  width: 454px;
  height: 100vh;
  padding-top: calc(50vh - 170px);
  box-shadow: 0 0 30px 0 rgba(180, 180, 180, 0.5);
  background-color: #fff;
  overflow: hidden;
  z-index: 0;
}
.login-tabs-title {
  font-family: PingFangSC-Medium, "Microsoft YaHei UI Light";
  font-size: 32px;
  color: #4f64ff;
  letter-spacing: 2.8px;
  text-align: center;
  margin-bottom: 86px;
}
.login-tabs {
  position: fixed;
  right: 0;
  width: 454px;
  height: 100vh;
  padding-top: calc(50vh - 170px);
  box-shadow: 0 0 30px 0 rgba(180, 180, 180, 0.5);
  background-color: #fff;
  overflow: hidden;
  z-index: 0;
}
.login-tabs-title {
  font-family: PingFangSC-Medium, "Microsoft YaHei UI Light";
  font-size: 32px;
  color: #e6a23c;
  letter-spacing: 2.8px;
  text-align: center;
  margin-bottom: 86px;
}
.el-input {
  display: inline-block;
  height: 36px;
  width: 318px;
}
.el-button {
  box-shadow: 2px 2px 4px 0 rgba(42, 74, 215, 0.35);
  width: 120px;
  letter-spacing: 1px;
}
.el-button :nth-of-type(1) {
  margin-right: 35px;
}
</style>

// <script>
import { createNamespacedHelpers } from "vuex";
let { mapMutations, mapState, mapActions } = createNamespacedHelpers("user");

export default {
  name: "login",
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        userName: "",
        password: "",
        userType: ""
      },
      loading: false,
      loginRules: {
        userName: [
          { required: true, trigger: "blur", validator: checkUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: checkPass }]
      }
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(valid => {
        console.log(this.form);
        if (valid) {
          this.loading = false;
          this.loginAsync(this.form).then(({ data }) => {
            // console.log(data);
           
            if (data.msg) {
              localStorage.setItem("user",JSON.stringify(data.data));
              // this.getUserInfo(data.data);
             // console.log(this.$store.state)
              this.$message({
                message: "登陆成功",
                type: "success"
              });
              this.$router.push('/')
            } else {
              this.loading = false;
              this.$router.push("/404");
            }
          });
        }
      });
    },

    ...mapActions(["loginAsync"]),
    // ...mapMutations(['getUserInfo']),
    handleCancel() {
      this.loading = false;
      this.$refs["form"].resetFields();
    }
    // ...mapMutations(['loginIn']),
  }
};
</script>
