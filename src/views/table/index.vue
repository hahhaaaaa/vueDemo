<template>
  <div>
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="kind" label="种类"></el-table-column>
      <el-table-column prop="texture" label="材质"></el-table-column>
      <el-table-column prop="applicable" label="规格"></el-table-column>
      <el-table-column prop="exclusive" label="专属"></el-table-column>
      <el-table-column prop="packaging" label="包装"></el-table-column>
      <el-table-column prop="flavor" label="口味"></el-table-column>
      <el-table-column prop="specific" label="特殊"></el-table-column>
      <el-table-column prop="origin" label="产地"></el-table-column>
      <el-table-column prop="expiration" label="保质期"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="picture.url" label="图片">
      <template slot-scope="scope">
      <img  :src="scope.row.picture.url" alt="" style="width: 50px;height: 50px">
       </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="updataCommodityData(scope.row)">更新</el-button>
          <el-button size="mini" type="danger" @click="removeCommodity(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      background
      layout="total, prev, pager, next , sizes"
      :page-sizes="eachPageSize"
      :total="count"
      :page-size="eachPage"
    ></el-pagination>
    <div>
      <el-dialog title="更新" :visible.sync="dialogTableVisible">
          <el-form   ref="form" :model="form" label-width="100px">
            <el-form-item label="商品名称:"> <el-input v-model="form.name"  ref="name"  ></el-input></el-form-item>
        <el-form-item label="商品材质:"> <el-input v-model="form.texture"  ref="texture"  ></el-input></el-form-item>
     <el-form-item label="商品规格:"> <el-input v-model="form.applicable"  ref="applicable"   ></el-input></el-form-item>
     <el-form-item label="商品专属:"> <el-input v-model="form.exclusive"  ref="exclusive" ></el-input></el-form-item>
     <el-form-item label="商品包装:"> <el-input v-model="form.packaging"  ref="packaging" ></el-input></el-form-item>
     <el-form-item label="商品口味:"> <el-input  v-model="form.flavor"   ref="flavor" ></el-input></el-form-item>
     <el-form-item label="商品特殊:"> <el-input   v-model="form.specific"  ref="specific" ></el-input></el-form-item>
     <el-form-item label="商品产地:"> <el-input v-model="form.origin"  ref="origin" ></el-input></el-form-item>
     <el-form-item label="保质期限:"> <el-input v-model="form.expiration" ref="expiration"   ></el-input></el-form-item>
     <el-form-item label="商品价格:"> <el-input v-model="form.price" ref="price"  ></el-input></el-form-item>
     </el-form>
     <el-row>
       <el-button type="success" @click="updataCommodit" round>确认</el-button>
       <el-button type="info" round @click="dialogTableVisible=false">取消</el-button>
     </el-row>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "commodity"
);
export default {
  name: "commodityTable",
  data() {
    return {
      search: "",
      dialogTableVisible:false,
      form:{},
      id:''
    };
  },
  mounted() {
    const fm =JSON.parse(localStorage.user)
    this.id = fm[0]._id
    this.getCommodityByPageAsync(this.id);
  },
  watch: {
    pageSize() {
      this.getCommodityByPageAsync(this.id);
    },
    eachPage() {
      this.getCommodityByPageAsync(this.id);
    }
  },
  computed: {
    ...mapState(["pageSize", "eachPage", "totalPage", "count", "data"])
  },
  methods: {
    ...mapActions(["getCommodityByPageAsync", "removeCommodity",'updataCommodityAsync']),
    ...mapMutations(["setPage", "setEach"]),
    handleCurrentChange(val) {
      this.setPage(val);
    },
    handleSizeChange(val) {
      this.setEach(val);
    },
    updataCommodityData(data) {
      this.dialogTableVisible = true
      this.form = data
      
    },updataCommodit(){
      this.updataCommodityAsync(this.form)
      this.dialogTableVisible = false;

    }
  },
  props: {
    eachPageSize: {
      type: Array,
      default: () => [1, 5, 6, 7, 8]
    }
  }
};
</script>
