
<template>
  <div>
    <el-table
      :data="rows.filter(data => !search || data.petstype.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="店铺" prop="name"></el-table-column>
      <el-table-column label="出生年月" prop="birthday"></el-table-column>
      <el-table-column label="品种" prop="petstype"></el-table-column>
      <el-table-column label="性格" prop="character"></el-table-column>
      <el-table-column label="毛色" prop="haircolor"></el-table-column>
      <el-table-column label="价格" prop="petsprice"></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style=" display: flex;justify-content: center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="eachPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
    <el-dialog title="信息修改" :visible.sync="dialogTableVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="marginTop:30px; width:600px;"
      >
        <el-form-item label="选择店铺" prop="shop">
          <el-select v-model="ruleForm.shop" placeholder="请选择要添加的店铺">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="宠物性格" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio-button label="温驯"></el-radio-button>
            <el-radio-button label="狂野"></el-radio-button>
            <el-radio-button label="攻击性"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="外观毛色" prop="desc">
          <el-input
            placeholder="请输入宠物的毛色或外观色"
            v-model="ruleForm.desc"
            clearable
            style="width:250px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="出售价格" prop="petsprices">
          <el-input
            placeholder="请输入出售价格"
            v-model="ruleForm.petsprices"
            clearable
            style="width:250px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "Animals"
);
export default {
  name: "petslist",
  data() {
    return {
      search: "",
      dialogTableVisible: false,
      ruleForm: {
        shop: "",
        resource: "",
        desc: "",
        petsprices:""
      },
      rowsde:{},
      rules: {
        shop: [
          { required: true, message: "请选择要添加的店铺", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择宠物性格", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写宠物毛色或外观色", trigger: "blur" }
        ],
         petsprices: [
          { required: true, message: "请填写出售价格", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    //渲染完成后自动调用该函数
    this.getpetsAsnync();
  },
  methods: {
    ...mapActions(["getpetsAsnync","getdeleteAsync","revisePetsAsync"]),
    ...mapMutations(["setCurPage", "setEachPage"]),
    handleEdit(index, row) {
      this.dialogTableVisible = true;
      this.ruleForm.resource=row.character;
      this.ruleForm.desc=row.haircolor;
      this.ruleForm.petsprices=row.petsprice;
      this.rowsde=row
    },
    handleDelete(index, row) {
      this.getdeleteAsync(row._id)
    },
    handkaishi() {
      this.dialogTableVisible = true;
    },
    handleSizeChange(val) {
      this.setEachPage(val);
      this.getpetsAsnync();
    },
    handleCurrentChange(val) {
      this.setCurPage(val);
      this.getpetsAsnync();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.rowsde.character=this.ruleForm.resource;
          this.rowsde.haircolor=this.ruleForm.desc;
          this.rowsde.petsprice=this.ruleForm.petsprices;
          this.revisePetsAsync(this.rowsde)
          alert("修改成功!");
           this.$refs[formName].resetFields();
           this.dialogTableVisible=false;
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    //拿state
    ...mapState(["currentPage", "eachPage", "count", "rows", "totalPage"])
  }
};
</script>