<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
    style="marginTop:30px; width:600px;"
  >
    <el-form-item label="选择店铺" prop="store">
     
      <el-select v-model="ruleForm.store" placeholder="请选择要添加的店铺">
        <el-option
          v-for="item in liebiao"
          :key="item._id"
          :label="item.storeTitle"
          :value="item._id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="选择品种" required prop="category">
      <el-cascader
        :options="options"
        :show-all-levels="false"
        v-model="ruleForm.category"
        filterable
      ></el-cascader>
    </el-form-item>

    <el-form-item label="宠物性格" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio-button label="温驯"></el-radio-button>
        <el-radio-button label="狂野"></el-radio-button>
        <el-radio-button label="攻击性"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="出生年月" prop="date1">
      <el-date-picker
        v-model="ruleForm.date1"
        type="month"
        placeholder="选择年月"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        @change="getSTime"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="外观毛色" prop="desc">
      <el-input placeholder="请输入宠物的毛色或外观色" v-model="ruleForm.desc" clearable style="width:250px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "Animals"
);
export default {
  name: "addpets",
  data() {
    return {
      ruleForm: {
        store: "",
        category: [],
        categorys: "",
        date1: "",
        resource: "",
        desc: ""
      },
      rules: {
        store: [
          { required: true, message: "请选择要添加的店铺", trigger: "change" }
        ],
        category: [
          { required: true, message: "请选择品类", trigger: "change" }
        ],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择宠物性格", trigger: "change" }
        ],
        desc: [
          { required: true, message: "请填写宠物毛色或外观色", trigger: "blur" }
        ]
      },
      options: [
        {
          value: "cats",
          label: "猫",
          children: [
            {
              value: "miniature",
              label: "小型",
              children: [
                {
                  value: { name: "新加坡猫", urls: "123456789" },
                  label: "新加坡猫"
                },
                {
                  value: { name: "柯尼斯卷毛猫", urls: "123456789" },
                  label: "柯尼斯卷毛猫"
                },
                {
                  value: { name: "东方猫", urls: "123456789" },
                  label: "东方猫"
                }
              ]
            },
            {
              value: "midsize",
              label: "中型",
              children: [
                {
                  value: { name: "暹罗猫", urls: "123456789" },
                  label: "暹罗猫"
                },
                {
                  value: { name: "苏格兰折耳猫", urls: "123456789" },
                  label: "苏格兰折耳猫"
                },
                {
                  value: { name: "英国短毛猫", urls: "123456789" },
                  label: "英国短毛猫"
                },
                {
                  value: { name: "波斯猫", urls: "123456789" },
                  label: "波斯猫"
                },
                {
                  value: { name: "俄罗斯蓝猫", urls: "123456789" },
                  label: "俄罗斯蓝猫"
                },
                {
                  value: { name: "美国短毛猫", urls: "123456789" },
                  label: "美国短毛猫"
                },
                {
                  value: { name: "异国短毛猫", urls: "123456789" },
                  label: "异国短毛猫"
                },
                {
                  value: { name: "挪威森林猫", urls: "123456789" },
                  label: "挪威森林猫"
                },
                {
                  value: { name: "埃及猫", urls: "123456789" },
                  label: "埃及猫"
                },
                {
                  value: { name: "伯曼猫", urls: "123456789" },
                  label: "伯曼猫"
                },
                {
                  value: { name: "斯芬克斯猫", urls: "123456789" },
                  label: "斯芬克斯猫"
                },
                {
                  value: { name: "缅甸猫", urls: "123456789" },
                  label: "缅甸猫"
                },
                {
                  value: { name: "阿比西尼亚猫", urls: "123456789" },
                  label: "阿比西尼亚猫"
                },
                {
                  value: { name: "土耳其梵猫", urls: "123456789" },
                  label: "土耳其梵猫"
                },
                {
                  value: { name: "美国短尾猫", urls: "123456789" },
                  label: "美国短尾猫"
                },
                {
                  value: { name: "日本短尾猫", urls: "123456789" },
                  label: "日本短尾猫"
                },
                {
                  value: { name: "巴厘猫", urls: "123456789" },
                  label: "巴厘猫"
                },
                {
                  value: { name: "褴褛猫", urls: "123456789" },
                  label: "褴褛猫"
                },
                {
                  value: { name: "东奇尼猫", urls: "123456789" },
                  label: "东奇尼猫"
                },
                {
                  value: { name: "马恩岛猫", urls: "123456789" },
                  label: "马恩岛猫"
                },
                {
                  value: { name: "奥西猫", urls: "123456789" },
                  label: "奥西猫"
                },
                {
                  value: { name: "德文卷毛猫", urls: "123456789" },
                  label: "德文卷毛猫"
                },
                {
                  value: { name: "美国刚毛猫", urls: "123456789" },
                  label: "美国刚毛猫"
                },
                {
                  value: { name: "哈瓦那棕猫", urls: "123456789" },
                  label: "哈瓦那棕猫"
                },
                {
                  value: { name: "重点色短毛猫", urls: "123456789" },
                  label: "重点色短毛猫"
                },
                {
                  value: { name: "塞尔凯克卷毛猫", urls: "123456789" },
                  label: "塞尔凯克卷毛猫"
                },
                {
                  value: { name: "美国卷毛猫", urls: "123456789" },
                  label: "美国卷毛猫"
                }
              ]
            },
            {
              value: "daohang",
              label: "大型",
              children: [
                {
                  value: { name: "布偶猫", urls: "123456789" },
                  label: "布偶猫"
                },
                {
                  value: { name: "英国短毛猫", urls: "123456789" },
                  label: "英国短毛猫"
                },
                {
                  value: { name: "波斯猫", urls: "123456789" },
                  label: "波斯猫"
                },
                {
                  value: { name: "美国短毛猫", urls: "123456789" },
                  label: "美国短毛猫"
                },
                {
                  value: { name: "沙特尔猫", urls: "123456789" },
                  label: "沙特尔猫"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "犬",
          children: [
            {
              value: "miniature",
              label: "小型",
              children: [
                {
                  value: "xinjiapomao",
                  label: "新加坡猫"
                },
                {
                  value: "kenishimao",
                  label: "柯尼斯卷毛猫"
                },
                {
                  value: "dongfangmao",
                  label: "东方猫"
                }
              ]
            },
            {
              value: "midsize",
              label: "中型",
              children: [
                {
                  value: "ziluomao",
                  label: "暹罗猫"
                },
                {
                  value: "shugelanmao",
                  label: "苏格兰折耳猫"
                },
                {
                  value: "yingduan",
                  label: "英国短毛猫"
                },
                {
                  value: "boshimoao",
                  label: "波斯猫"
                },
                {
                  value: "eluosimao",
                  label: "俄罗斯蓝猫"
                },
                {
                  value: "meiguoduanmao",
                  label: "美国短毛猫"
                },
                {
                  value: "yiguoduanmao",
                  label: "异国短毛猫"
                },
                {
                  value: "luoshilingmao",
                  label: "挪威森林猫"
                },
                {
                  value: "aijimao",
                  label: "埃及猫"
                },
                {
                  value: "bomanmao",
                  label: "伯曼猫"
                },
                {
                  value: "shifenkemao",
                  label: "斯芬克斯猫"
                },
                {
                  value: "miandanmao",
                  label: "缅甸猫"
                },
                {
                  value: "abixinimao",
                  label: "阿比西尼亚猫"
                },
                {
                  value: "tuerqifanmao",
                  label: "土耳其梵猫"
                },
                {
                  value: "usduanweimao",
                  label: "美国短尾猫"
                },
                {
                  value: "janpanduanweimao",
                  label: "日本短尾猫"
                },
                {
                  value: "balimao",
                  label: "巴厘猫"
                },
                {
                  value: "lannvmao",
                  label: "褴褛猫"
                },
                {
                  value: "dongqinimao",
                  label: "东奇尼猫"
                },
                {
                  value: "maendaomao",
                  label: "马恩岛猫"
                },
                {
                  value: "aoximao",
                  label: "奥西猫"
                },
                {
                  value: "dewenjuanmao",
                  label: "德文卷毛猫"
                },
                {
                  value: "usgangmao",
                  label: "美国刚毛猫"
                },
                {
                  value: "hawanamao",
                  label: "哈瓦那棕猫"
                },
                {
                  value: "zhongdianmao",
                  label: "重点色短毛猫"
                },
                {
                  value: "sanerkemao",
                  label: "塞尔凯克卷毛猫"
                },
                {
                  value: "meiguojuanmao",
                  label: "美国卷毛猫"
                }
              ]
            },
            {
              value: "daohang",
              label: "大型",
              children: [
                {
                  value: "buoumao",
                  label: "布偶猫"
                },
                {
                  value: "yingduan",
                  label: "英国短毛猫"
                },
                {
                  value: "boshimao",
                  label: "波斯猫"
                },
                {
                  value: "meiduanmao",
                  label: "美国短毛猫"
                },
                {
                  value: "shatermao",
                  label: "沙特尔猫"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    //渲染完成后自动调用该函数
    const fm = JSON.parse(localStorage.user)[0]._id;
    this.getSerByPage({userID: fm});
    this.getfindPetAsync({ userID: fm });
 
  },
  methods: {
    shishi() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const fm = JSON.parse(localStorage.user);
          this.addpetsAsync({
            petstype: this.ruleForm.category[2].name,
            haircolor: this.ruleForm.desc,
            birthday: this.ruleForm.date1,
            character: this.ruleForm.resource,
            userID: fm[0]._id,
            storeCityId: this.ruleForm.store
          });
          this.$refs[formName].resetFields();
          alert("成功!");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getSTime(val) {
      this.date1 = val; //这个sTime是在data中声明的，也就是v-model绑定的值
    },
    ...mapActions(["addpetsAsync", "getfindPetAsync"]),
    ...mapMutations(["getSerByPage"])
  },
  computed: {
    //拿state
    ...mapState(["liebiao"])
  }
};
</script>