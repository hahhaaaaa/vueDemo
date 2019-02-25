<template>
  <div>
      <!-- 轮播 -->
    <div class="photoBlock" id="photoBlock" style="display: none">
    <img @click='closeCarousel' src="https://p0.meituan.net/education/1bcf4b282ab1721887398c164c76f65a385.png" alt="删除按钮" style="position: relative;right: -300px;top: 50px;">
       
      <el-carousel height="280px" >
        <el-carousel-item >
            <img :src='form.photoWall1' alt="相册照片1">
        </el-carousel-item>
        <el-carousel-item >
            <img :src="form.photoWall2" alt="相册照片2">
        </el-carousel-item>
        <el-carousel-item >
            <img :src="form.photoWall3" alt="相册照片3">
        </el-carousel-item>
        <el-carousel-item >
            <img :src="form.photoWall4" alt="相册照片4">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 表格头部包含新增按钮 -->
    <el-header style="text-align: center; font-size: 12px;position: relative;">
      <h1>宠物服务</h1>
      <el-button type="primary" @click="openForm( null, null,'add')" style="position: absolute;top: 20px;left: 25px;">
        新增服务
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-header>
    <el-table :data="rows" >
      <el-table-column :show-overflow-tooltip="true" prop="name" label="服务名称" width="100"></el-table-column>
      <el-table-column  label="封面照片">
        <template scope="scope" prop="img">
          <img :src="scope.row.img" width="80" height="80" class="head_pic">
        </template>
      </el-table-column>
      <el-table-column label="相片集">
        <template scope="scope" prop="photoWall1">

          <div style="position: relative;">
            <div style="position: absolute;
             top: 50%;left: 50%;
             transform: translate(-40%,-56%);
             width: 30px;height: 30px;
             background: #0000009e;
             border-radius: 30px;
             "><span
                class="photoWall1Bg" @click='openCarousel(scope.$index,scope.row)' style="color:#fff;font-size: 30px;line-height: 13px; cursor: pointer;">...</span></div>
            <img :src="scope.row.photoWall1" width="80" height="80" class="head_pic photoWall1">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="species" label="服务种类" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="plan" label="时间段" width="100" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="weight" label="宠物的大小" width="60"></el-table-column>
      <el-table-column prop="service" label="服务规格：普修，精修" width="60"></el-table-column>
      <el-table-column prop="time" label="耗时：正常耗时" width="100"></el-table-column>
      <el-table-column prop="waiter" label="服务员等级：普通，高级" width="60"></el-table-column>
      <el-table-column prop="price" label="价格：基准价格" width="60"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openForm(scope.$index, scope.row,'upDate')">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,'upDate')">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="上，下架（默认激活蓝色，已上架）">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isShelve" @change='handleIsShelveType(scope.row)'></el-switch>
          </template>
        </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="eachPage" :page-sizes="[3, 5, 10]" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
    <!-- 表单弹窗 -->
    <el-dialog title="服务信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="服务名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面照片：" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="照片集：" :label-width="formLabelWidth">
          <el-input v-model="form.photoWall1" placeholder="照片1" autocomplete="off"></el-input>
          <el-input v-model="form.photoWall2" placeholder="照片2" autocomplete="off"></el-input>
          <el-input v-model="form.photoWall3" placeholder="照片3" autocomplete="off"></el-input>
          <el-input v-model="form.photoWall4" placeholder="照片4" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务种类：" :label-width="formLabelWidth">
          <el-input v-model="form.species" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间段：" :label-width="formLabelWidth">
          <el-input v-model="form.plan" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宠物的大小:" :label-width="formLabelWidth">
          <el-input v-model="form.weight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务规格:" :label-width="formLabelWidth" style="text-align: left;">
          <el-radio-group v-model="form.service" size="small">
            <el-radio label="普修">普修</el-radio>
            <el-radio label="精修">精修</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="耗时,正常耗时:" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务员等级：" :label-width="formLabelWidth" style="text-align: left;">
          <el-radio-group v-model="form.waiter" size="small">
            <el-radio label="普通">普通</el-radio>
            <el-radio label="高级">高级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="价格:" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePetInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    createNamespacedHelpers
  } from "vuex";
  const {
    mapActions,
    mapState,
    mapMutations
  } = createNamespacedHelpers(
    "service"
  );
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: "", //服务类别
          img: "", //图片路径
          photoWall1: "https://p1.meituan.net/dpdeal/9fb2aaadf8bf005361b73c85573e479a144425.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0", //相册
          photoWall2: "https://p1.meituan.net/dpdeal/9fb2aaadf8bf005361b73c85573e479a144425.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0", //相册
          photoWall3: "https://p1.meituan.net/dpdeal/9fb2aaadf8bf005361b73c85573e479a144425.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0", //相册
          photoWall4: "https://p1.meituan.net/dpdeal/9fb2aaadf8bf005361b73c85573e479a144425.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0", //相册
          species: "", //品类：服务类别（关联定义）
          plan: "", //排期：按时间段
          weight: "", //适用规格：按体重范围等；
          service: "", //服务规格：普修，精修等；
          time: "", //耗时：正常耗时；
          waiter: "", //服务员等级：普通，高级价格不同
          price: "", //价格：基准价格，会员价和活动价都以它为基准
          isShelve:true,//是否上架
          _id: "",
        },
        formLabelWidth: "120px",
        type: '',//新增或修改
      };
    },
    mounted() {
      //渲染完成后自动调用该函数
      this.getSerByPageAsync();
  
    },
    computed: {
      //拿state
      ...mapState(["currentPage", "eachPage", "count", "rows", "totalPage"])
    },
    methods: {
      //拿同步异步方法 在这儿写函数
      handleIsShelveType(row){//修改上架状态
        this.upDateServiceAsnync([row, {
            currentPage: this.currentPage
          }, {
            eachPage: this.eachPage
          }, {
            cb: (data) => {
              if (data === "ok") {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
              }
            }
          }])
      },
      openCarousel(index, row) {//打开走马灯
        const {photoWall1,photoWall2,photoWall3,photoWall4}=row;
        this.form.photoWall1=photoWall1;
        this.form.photoWall2=photoWall2;
        this.form.photoWall3=photoWall3;
        this.form.photoWall4=photoWall4;
        document.getElementById('photoBlock').style.cssText="width: 100%;height: 100%;background: #000;opacity: .8;position: fixed;z-index: 99;"
      },
      closeCarousel(){//关闭走马灯
        document.getElementById('photoBlock').style.cssText="display:none"
      },
      handleClose(done) { //关闭表单窗口
        this.$confirm("确认关闭？")
          .then(_ => {
            this.form.name = "";
            this.form.img = "";
            this.form.species = "";
            this.form.plan = "";
            this.form.weight = "";
            this.form.service = "";
            this.form.service = "";
            this.form.time = "";
            this.form.waiter = "";
            this.form.price = "";
            this.form.photoWall1 = "";
            this.form.photoWall2 = "";
            this.form.photoWall3 = "";
            this.form.photoWall4 = "";
            this.form.isShelve = "";
            this.form._id = "";
            if (this.type === 'addService') {
              this.$message('取消新增');
            } else {
              this.$message('取消修改');
            }
            done();
          })
          .catch(_ => {
            console.log("取消");
          });
      },
      ...mapActions([
        "getSerByPageAsync",
        "addServiceAsync",
        //    'setCurPageTrans'
        "upDateServiceAsnync",
        "delOneSer"
      ]),
      ...mapMutations(["setCurPage", "setEachPage"]),
     
      openForm(index, row, type) {
        this.dialogFormVisible = true;
        if (type === "add") {
          this.type = "addService";
        } else {
          this.type = "updateService"
          this.handleUpDatePet(index, row);
        }
      },
      handleUpDatePet(index, row) { //打开表单，将请求的数据放到data里
        this.dialogFormVisible = true;
        this.form.name = row.name;
        this.form.img = row.img;
        this.form.species = row.species;
        this.form.plan = row.plan;
        this.form.weight = row.weight;
        this.form.service = row.service;
        this.form.service = row.service;
        this.form.time = row.time;
        this.form.waiter = row.waiter;
        this.form.price = row.price;
        this.form.photoWall1 = row.photoWall1;
        this.form.photoWall2 = row.photoWall2;
        this.form.photoWall3 = row.photoWall3;
        this.form.photoWall4 = row.photoWall4;
        this.form.isShelve = row.isShelve;
        this.form._id = row._id;
      },
      handlePetInfo() { //连接模块，新增，修改，调用异步方法
        this.dialogFormVisible = false;
        if (this.type === "addService") { //新增
          const {
            name,
            img,
            species,
            photoWall1,
            photoWall2,
            photoWall3,
            photoWall4,
            plan,
            weight,
            service,
            time,
            waiter,
            price
          } = this.form;
          this.addServiceAsync([{
              name,
              img,
              photoWall1,
              photoWall2,
              photoWall3,
              photoWall4,
              species,
              plan,
              weight,
              service,
              time,
              waiter,
              price
            },
            {
              eachPage: this.eachPage
            },
            {
              currentPage: this.currentPage
            },
            {
              count: this.count
            },
            {
              totalPage: this.totalPage
            },
            {
              cb: (data) => {
                if (data === "ok") {
                  this.$message({
                    message: '新增成功！',
                    type: 'success'
                  })
                }
              }
            }
          ])
        } else { //修改
          this.upDateServiceAsnync([this.form, {
            currentPage: this.currentPage
          }, {
            eachPage: this.eachPage
          }, {
            cb: (data) => {
              if (data === "ok") {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
              }
            }
          }])
        }
      },
      handleDelete(index, row) { //删除数据！！
        const _id = row._id;
        this.delOneSer([{
          _id
        }, {
          currentPage: this.currentPage
        }, {
          eachPage: this.eachPage
        }, {
          count: this.count
        }, {
          cb: (data) => {
            if (data) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          }
        }])

      },
      handleSizeChange(val) {
        this.setEachPage(val);
        this.getSerByPageAsync();
      },
      handleCurrentChange(val) {
        this.setCurPage(val);
        this.getSerByPageAsync();
      }
    },
    watch: {
      //监听 state里面东西修改触发
      currentPage() {
        console.log("currentPage");
      },
      eachPage() {
        console.log("eachPage");
      }
    }
  };
</script>
<style>
  .el-dialog {
    width: 33%;
  }
  .el-button+.el-button{
    margin: 0;
  }
  .el-table td,
  .el-table th {
    text-align: center;
  }

  .el-main {
    height: 99vh;
    padding: 0 20px;
  }

  .el-pagination {
    text-align: left;
  }
  .el-carousel{
    width: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>