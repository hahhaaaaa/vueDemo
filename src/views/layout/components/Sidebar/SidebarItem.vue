<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template  v-if="!item.hidden&&item.children">
      <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <span v-if="item.children[0].meta&&item.children[0].meta.title"><span :class="item.children[0].meta.icon"></span>{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
           <span :class="item.meta.icon"></span>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" >
          <template v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
          </template>
        </template>
      </el-submenu>
    </template> 
    </template>
  </div>
  
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'sidebarItem',
  props: {
    // routes: {
    //   type: Array
    // },
    isNest: {
      type: Boolean,
      default: false
    }
  },
 
  computed:{
    
    // ...mapGetters('antRouter')
    routes:function(){
      return this.$store.getters.antRouter
      // console.log(state)
    }
    // routes:this.store.getters.antRouter 
  }
}
</script>
<style scoped>
.el-submenu__title i {
    color: white;
}
a{
  text-decoration: none
}
</style>
