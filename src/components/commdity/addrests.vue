<template>
    <dir>
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="规格">
    <el-input v-model="form.applicable"></el-input>
  </el-form-item>
 <el-form-item label="重量">
    <el-input v-model="form.weigh"></el-input>
  </el-form-item>
   <el-form-item label="用途">
    <el-input v-model="form.specific"></el-input>
  </el-form-item>
     <el-form-item label="尺码(选填)">
    <el-input v-model="form.size"></el-input>
  </el-form-item>
   <el-form-item label="颜色(选填)">
    <el-input v-model="form.color"></el-input>
  </el-form-item>
    <el-form-item label="适用宠物">
    <el-checkbox-group v-model="form.exclusive">
      <el-checkbox label="猫类" name="exclusive"></el-checkbox>
      <el-checkbox label="犬类" name="exclusive"></el-checkbox>
      <el-checkbox label="全猫犬" name="exclusive"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
   <el-form-item label="产地">
    <el-input v-model="form.origin"></el-input>
  </el-form-item>
     <el-form-item label="价格">
    <el-input v-model="form.price"></el-input>
  </el-form-item>
</el-form>
 <el-upload
       class="upload-demo"
       ref="upload"
       action="files/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handSuccess"
      :auto-upload="false"
      list-type="picture">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
   </el-upload>
     <el-button type="primary" @click="onSubmit">立即添加</el-button>
     <el-button @click="resetForm('form')">重置</el-button>
    </dir>
</template>




<script>
import { createNamespacedHelpers } from 'vuex'
const {mapActions} =  createNamespacedHelpers('commodity')
  export default {
      name:'addrests',
    data() {
      return {
        kind:'rests',
        form: {
          name: '',
          applicable: '',
          packaging: '',
          exclusive: [],
          specific: '',
          weigh:'',
          origin:'',
          price:'',
          size:'',
          color:''
        },
        fileList1:''
      }
    },
    methods: {
      ...mapActions(['addCommodity']),
      onSubmit() {
          const fm = JSON.parse(localStorage.user) 
        const data = {
          name:this.form.name,
          kind:this.kind,
          applicable:this.form.applicable,
          packaging:this.form.packaging,
          specific:this.form.specific,
          weight:this.form.weigh,
          origin:this.form.origin,
          price:this.form.price,
          size:this.form.size,
          color:this.form.color,
          exclusive:this.form.exclusive[0],
          picture:this.fileList1,
           userID:fm[0]._id
        }
        this.addCommodity(data)
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handSuccess(response, file, fileList){
        this.fileList1 = response
      }

    }
  }
</script>