<template>
  <el-card shadow="always" style="width: 90%;margin:0 auto;margin-top:20px">
    <el-table
      :data="rows.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column label="用户ID" prop="_id"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="用户密码" prop="name"></el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="75px" height="75px">
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="eachPage"
        :page-sizes="[3, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("user");
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      const _id = row._id;
    }
  },
  mounted() {
    //渲染完成后自动调用该函数
    this.getUsersAsnync();
  },
  computed: {
    //拿state
    ...mapState(["currentPage", "eachPage", "count", "rows", "totalPage"])
  },
  methods: {
    ...mapMutations(["setCurentPage", "setEeachPage"]),
    ...mapActions(["getUsersAsnync"]),
     handleSizeChange(val) {
      this.setEeachPage(val);
    },
    handleCurrentChange(val) {
      this.getUsersAsnync(val);
    }
  },
   watch: {
    currentPage(oldvalue, value) {
      this.getUsersAsnync();
    },
    eachPage() {
      this.getUsersAsnync();
    }
  }
};
</script>