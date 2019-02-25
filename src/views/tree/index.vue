<template>
  <div class="table_container">
    <!-- 搜索 -->
    <div class="search">
      <el-form :inline="true" :model="formSearch">
        <el-form-item label>
          <el-select v-model="formSearch.classname" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="formSearch.keywords" placeholder="查询商品名称、条形码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="serachHadler" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table 
    :data="rows" 
   
    :row-class-name="tableRowClassName"
 
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{scope.row.storeTitle}}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{scope.row.storeAddress}}</span>
            </el-form-item>
            <el-form-item label="门店介绍">
              <span>{{scope.row.storeFeature.join('-')}}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{scope.row._id}}</span>
            </el-form-item>
            <el-form-item label="营业执照号码">
              <span>{{scope.row.storeNumber}}</span>
            </el-form-item>
            <el-form-item label="营业执照图片">
              <span>
                <img title="营业执照" :src='scope.row.storeImg' width="50px" height="50px">
              </span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{scope.row.storeVip}}</span>
            
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="storeTitle"></el-table-column>
      <el-table-column label="店铺地址" prop="storeAddress"></el-table-column>
      <el-table-column label="店铺介绍" prop="storeFeature"></el-table-column>
      <el-table-column label="店铺图片" prop="storeImgs">
      <template slot-scope="scope">
        <img :src="scope.row.storeImgs" width="75px" height="75px">
      </template>
      </el-table-column>
      <el-table-column label="店铺ID" prop="_id"></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="Success" @click="addFood(scope.$index, scope.row)">添加食品</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!--修改页面 -->
    <el-dialog title="修改店铺信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="selectTable" ref="form">
        <el-form-item label="店铺名称" label-width="100px">
          <el-input v-model="selectTable.storeTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-autocomplete
            v-model="selectTable.storeAddress"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入地址"
            style="width: 100%;"
            @select="addressSelect"
          ></el-autocomplete>
          <!-- <span>当前城市</span> -->
        </el-form-item>
        <el-form-item label="店铺特色" label-width="100px">
          <el-tag
            :key="tag"
            v-for="tag in selectTable.storeFeature"
            closable
            :disable-transitions="false"
            @close="TagsClose(tag)"
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
          <!-- <el-input v-model="selectTable.description"></el-input> -->
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="selectTable.storePhone"></el-input>
        </el-form-item>
        <el-form-item label="商品法人" label-width="100px">
          <el-input v-model="selectTable.storeLegal"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button @click='update'>确 定</el-button>
      </div>
    </el-dialog>

    <div class="Pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="start"
        :page-sizes="[2,10,15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

let { mapMutations, mapState, mapActions } = createNamespacedHelpers("shop");
export default {
  mounted() {
    this.getShopsBypage();
  },
  computed: {
    ...mapState(["start", "count", "total", "rows", "totalPage"])
  },
  data() {
    return {
      dialogVisible: false,
      address: "",
      selectTable: {
        storeTitle: "", 
        storeFeature:[],
        storePhone: "",
        storeAdress: "",
        storeLegal: ""
      },
      options: [
        {
          value: "storeTitle",
          label: "店铺名称"
        },
        {
          value: "storeAddress",
          label: "店铺地址"
        }
      ],
      formSearch: {
        classname: "",
        keywords: ""
      },
      inputVisible:false,
      inputValue:'',
    };
  },
  methods: {
    
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.selectTable = row;
      console.log(this.selectTable,'123213')
      //   console.log(index, row);
    },
    tableRowClassName({row, rowIndex}) {
      
    
        if (row.state =='0') {
          // console.log(true)
          return 'warning-row';
        }
        return '';
          
      },
    handleDelete(index, row) {
      console.log(index, row);
      this.getShopDelete({ _id: row._id });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 搜索查询
    querySearchAsync(queryString, cb) {
      if (queryString == undefined || queryString == "") {
        cb([]);
        return;
      }
      this.queryLoading(queryString).then(data => {
        cb(data);
      });
      // let list=[{value:1},{value:2}]
    },

    handleSizeChange(val) {
      // console.log(val)
      this.setEeachPage(val);
    },
    handleCurrentChange(val) {
      this.setCurentPage(val);
      // this.currentPage = val;
      // this.offset = (val - 1)*this.limit;
      // this.getResturants()
    },
    //模糊查询
    serachHadler() {
      //console.log(this.formSearch.classname,this.formSearch.keywords)
      this.getShopsBypage({
        name: this.formSearch.classname,
        value: this.formSearch.keywords
      });

      //console.log()
    },

    addressSelect(value) {
      //console.log(value)
      this.selectTable.storeAdress = value;
      //是选中某一列触发的事件,在这里item为选中字段所在的对象
      // const {address, latitude, longitude} = vale;
      // this.address = {address, latitude, longitude};
    },
    // 标签的删除
    TagsClose(){
      //标签数组的删除
    this.selectTable.storeFeature.splice(this.selectTable.storeFeature.indexOf(tag), 1)
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
          this.selectTable.storeFeature.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
     update(){
     this.updateAsync(this.selectTable).then(({data})=>{
       //console.log(res)
       this.dialogVisible=false;
       if(data.ok==1){
          this.$notify({
            title: "修改结果",
            message: "修改成功",
            type: "success"
          });
          this.getShopsBypage();
       }
         

     })
     },
    ...mapMutations(["setCurentPage", "setEeachPage"]),
    ...mapActions([
      "getShopsBypage",
      "queryLoading",
      "getShopDelete",
      "getAllSearch",
       'updateAsync'
    ])
  },
  watch: {
    start(oldvalue, value) {
      this.getShopsBypage();
    },
    count() {
      this.getShopsBypage();
    }
  }
};
</script>
<style>

.search {
  margin-top: 20px;
}
 /* .el-table .warning-row {
    background: oldlace;
} */
/* .el-table__row .warning-row{
  background: rebeccapurple
} */
.el-table__row.warning-row {
   background: #f0f9eb;
}
</style>


