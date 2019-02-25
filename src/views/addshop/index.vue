<template>
  <div style="height:100vh">
    <el-scrollbar style="height:100%">
      <el-card
        shadow="never"
        class="form-container"
        style="margin:20px auto;border:1px solid #81cba2b0;"

      >
        <el-row>
          <el-col :span="18" :offset="2">
            <el-form
              :model="formData"
              :rules="rules"
              ref="formData"
              label-width="110px"
              class="demo-formData"
            >
              <el-form-item label="店铺名称" prop="storeTitle">
                <el-input v-model="formData.storeTitle"></el-input>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-amap-search-box
                  ref="test"
                  class="search-box"
                  :search-option="searchOption"
                  :on-search-result="onSearchResult"
                ></el-amap-search-box>
                <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
                  <el-amap-marker
                    :key="marker[index]"
                    v-for="(marker,index) in markers"
                    :position="marker"
                  ></el-amap-marker>
                </el-amap>
              </el-form-item>
              <el-form-item label="联系电话" prop="storePhone">
                <el-input v-model.number="formData.storePhone" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="营业执照号码" prop="storeNumber">
                <el-input v-model="formData.storeNumber"></el-input>
              </el-form-item>
              <el-form-item label="门店法人" prop="storeLegal">
                <el-input v-model="formData.storeLegal"></el-input>
              </el-form-item>
              <el-form-item label="佣金比例" prop="storeComission_radio">
                <el-input-number
                  v-model="formData.storeComission_radio"
                  :precision="1"
                  :step="0.1"
                  :max="10"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="店铺特点" style="white-space: nowrap;" prop="storeFearure">
                <el-tag
                  :key="tag"
                  v-for="tag in formData.storeFeature"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-form-item>
              <!-- <el-form-item label="上传店铺头像">
					 
              </el-form-item>-->
               <el-form-item label="上传门店照">
                <el-upload
                  action="baseUrl"
                  list-type="picture-card"
                  :http-request="upLoadInit"
                  :on-change="onFilesAdded"
                  :show-file-list="true"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload> 
               </el-form-item>
                <!-- <el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>-->
                <!-- <el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleBusinessAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>-->
              <!-- </el-form-item> -->
              <el-form-item label="上传营业执照正">
                <el-upload class="upload-file"
                    drag
                    :http-request="licenseImg"
                    :on-success="handleAvatarSuccess"
                    :action="baseUrl"
                   
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload_text">将文件拖到此处或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>

              <el-form-item label="门店等级">
                
               
                  <el-rate v-model="formData.storeVip" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
              
              </el-form-item>
              <el-form-item class="button_submit">
                <el-button type="success" @click="submitForm(formData)">立即创建</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script>
import moment from 'moment'  
import axios from 'axios'
import { baseUrl, baseImgPath } from "../../../config/env";
import { createNamespacedHelpers } from "vuex";
let { mapMutations, mapState, mapActions } = createNamespacedHelpers("shop");
export default {
  created() {
    
  },
  mounted() {
   this.getToken().then(({data})=>{this.postData.token=data})
  },
  computed:{
    
   
  },
  data() {
    return {
      formData: {
        storeTitle: "",
        address: "",
        storePhone: "",
        storeNumber: "",
        storeLegal: "",
        storeComission_radio: "1",
        storeVip:null,
        storeImg:'',
        storeFeature:['标签一','标签二','标签三'],
        storeImgs:[],
        storePosition:[],
        userID:''
      },

     //  星级评分
        
      mapCenter: [104.06, 30.67],
      searchOption: {
        city: "成都",
        citylimit: true
      },
      markers: [],
      dialogImageUrl: "false",
      rules: {
        storeTitle: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        storePhone: [
          { required: true, message: "请输入联系电话" },
          { type: "number", message: "电话号码必须是数字" }
        ]
      },
      //   商品特点
      // dynamicTags: ["医院好", "高大上", "大夫赞"],
      inputVisible: false,
      inputValue: "",
      baseUrl,
      baseImgPath,
      domain: 'https://upload-z2.qiniup.com',
     		// 这是七牛云空间的外链默认域名
       qiniuaddr: 'pmqqs1q10.bkt.clouddn.com',
       postData:{
         token:''
       }
    // 地图范围
    };
    //      return{
    // 		markers: [
    //         // [121.59996, 31.197646],
    //         // [121.40018, 31.197622],
    //         // [121.69991, 31.207649]
    //       ],
    //
    //
    // 		imageUrl:"",
    // 		newFileList:[],
    // 		uptoken:"",
    // 		baseImgPath,
    // 		address_detail:null,
    // 		dialogImageUrl: '',
    // 		dialogVisible: false,
    // 		 imageUrl: '',

    // 		token: {},
    // 		// 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
    // 		
    // 		formData: {
    // 				storeTitle:'', //店铺名称
    // 				storeAddress: '', //地址
    // 				storePossion:{
    // 					x:'',
    // 					y:'',
    // 				},
    // 				// latitude: '',
    // 				// longitude: '',
    // 				storeNumber: '', //介绍
    // 				storePhone: '',
    // 				storeEmployee: '',
    // 				storeLegal: '',
    // 				storeComission_radio:'',
    // 				storeImg:'',
    // 				storeFeature:"",
    // 				storeImgs:'',

    // 					},
    // 					storeVip:'',
    // 					state:'',

    //
    // 			options: [{
    // 	          	value: '满减优惠',
    // 	          	label: '满减优惠'
    // 	        }, {
    // 	          	value: '优惠大酬宾',
    // 	          	label: '优惠大酬宾'
    // 	        }, {
    // 	          	value: '新用户立减',
    // 	          	label: '新用户立减'
    // 	        }, {
    // 	          	value: '进店领券',
    // 	          	label: '进店领券'
    // 	        }],
    //    	 		activityValue: '满减优惠',
    // 			activities: [{
    // 	        	icon_name: '减',
    // 	        	name: '满减优惠',
    // 	        	description: '满30减5，满60减8',
    // 		    }],
    // 		    // baseUrl,
    // 		    // baseImgPath,
    // 		    categoryOptions: [],
    // 		    selectedCategory: ['快餐便当', '简餐']
    // 		}
  },
  methods: {
    addMarker: function() {
      let lng = 104.06 + Math.round(Math.random() * 1000) / 100;
      let lat = 30.67 + Math.round(Math.random() * 500) / 100;
      this.markers.push([lng, lat]);
      //this.formData.storePosition=
    },
    onSearchResult(pois) {
      this.formData.storeAddress = pois[0].address;
      this.formData.storePosition=[pois[0].lng,pois[0].lat]
      console.log(this.formData)
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          // console.log(lng, lat);
          this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
    upLoadInit(req) {
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      const fileName =
        moment().format("YYYYMMDDHHmmssSSS") + Math.random() * 1000;
      const keyname = `troublepic-${fileName}.jpg`;
      this.getToken().then(({ data }) => {
        
        let formData = new FormData();
        formData.append("file", req.file);
        formData.append("token", data.uploadToken);
        formData.append("key", keyname);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios.post(this.domain, formData, config).then(res => {
          console.log(res);
          // img="http://" + this.qiniuaddr + "/" + res.data.key;
          // console.log(img,this.formData.storeimg,this.formData.storeimg)
          // console.log(this.formData.storeImgs)
          
            this.formData.storeImgs.push("http://" + this.qiniuaddr + "/" + res.data.key)
          
       });

        //console.log(imageUrl)
      });

      //formData.append("avatar",req.file);

      //console.log(req)
      //
    },
    handleRemove(file, fileList) {
      console.log(file, "123", fileList);
    },
    onFilesAdded(file, fileList) {
      if (fileList.length > 2) {
        //限制三张图片
        fileList.splice(fileList.indexOf(file), 1);
      }
      console.log(fileList);
      this.newFileList = fileList.filter(f => f.status === "ready");
      //addShop.vue console.log(this.newFileList)
    },
    // getQiniuToken() {},
    submitForm(formData) {
      formData.userID= JSON.parse(localStorage.getItem("user"))[0]._id,
      console.log(formData.userID)
      this.storeAdd(formData).then(({ data }) => {
        console.log(data);
        this.$router.push("/example/tree");
      });
    },
    ...mapActions(["getPhoto", "getToken", "storeAdd"]),
    //商铺特色
    handleClose(tag) {
      this.formData.storeFeature.splice(this.formData.storeFeature.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.formData.storeFeature.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
   
    licenseImg(req){
     let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      const fileName =
        moment().format("YYYYMMDDHHmmssSSS") + Math.random() * 1000;
      const keyname = `troublepic-${fileName}.jpg`;
      this.getToken().then(({ data }) => {
        
        let formData = new FormData();
        formData.append("file", req.file);
        formData.append("token", data.uploadToken);
        formData.append("key", keyname);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        axios.post(this.domain, formData, config).then(res => {
         // console.log(res);
          this.formData.storeImg="http://" + this.qiniuaddr + "/" + res.data.key;
         
          // this.imageUrl = "http://" + this.qiniuaddr + "/" + res.data.key;
          // console.log(this.imageUrl);
       });

        //console.log(imageUrl)
      });

    },
    handleAvatarSuccess(){}
    
  }
  // 验证文件合法性
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.button_submit {
  text-align: center;
}
.avatar-uploader {
  box-sizing: border-box;
  width: 120px;

  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-table .info-row {
  background: #c9e5f5;
}
.el-table .positive-row {
  background: #e2f0e4;
}
.amap-wrapper {
  margin-top: 10px;
  width: 100%;
  height: 200px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
/* 去掉地图左左下角的logo */
.anchorBL {
  display: none;
}
.feature {
  margin-left: 5px;
  margin-right: 10px;
}
.form-container {
  width: 800px;
  margin: 0 auto;
}
.amap-demo {
  margin-top: 10px;
  height: 200px;
}

.search-box {
  width: 100%;
}
/* tag标签 */
.el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
