<template>
  <el-card shadow="always" style="width: 90%;margin:0 auto;margin-top:20px">
    <el-table :data="rows" style="width: 100%">
      <el-table-column label="日期" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.storeTitle }}</p>
            <p>住址: {{ scope.row.storeAddress }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.storeTitle }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="未申请门店处理">
        <template slot-scope="scope">
          <el-switch
            active-text="注册"
            inactive-text="未注册"
            v-model="scope.row.isShelve"
            @change="handleIsShelveType(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="审请状态">
      
      </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let { mapMutations, mapState, mapActions } = createNamespacedHelpers("shop");
export default {
  data() {
    return {
     
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄"
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄"
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄"
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄"
      //   }
      // ]
    };
  },
   mounted() {
      
        this.storeNoListAsync()
          // console.log(this.rows)
      },
      computed: {
        ...mapState(["start","count", "total", "rows", "totalPage"])
      },
  methods: {
    ...mapActions(['storeNoListAsync',"IsUpdate"]),
  
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleIsShelveType(row) {
      //修改上架状态
     // console.log(row.isShelve);
      this.IsUpdate({_id:row._id})
      // this.upDateServiceAsnync([row, {
      //     currentPage: this.currentPage
      //   }, {
      //     eachPage: this.eachPage
      //   }, {
      //     cb: (data) => {
      //       if (data === "ok") {
      //         this.$message({
      //           message: '修改成功！',
      //           type: 'success'
      //         });
      //       }
      //     }
      //   }])
    }
  }
};
</script>
