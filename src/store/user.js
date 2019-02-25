// import { async, reject } from "q";
import {loginAsync,getUsersAsync,isLoginAsync,logOut,} from '../service/user' 
import { async } from 'q';
export default {//创建仓库
    namespaced:true,
    state: {
        currentPage:1,//当前页
        eachPage:5,//每页显示条数
        totalPage:1,//总页数
        count:0,//总条数
        rows:[]//数据
    },
    mutations: {//同步更新
      getUserByPageAsync:(state,payload)=>{
            Object.assign(state,payload);//payload不能直接覆盖掉state，
            // 会将代理都覆盖掉 Object.assign(state,payload)，
            console.log(state)
            // 内部是for(let item in 对象)遍历，等同于state.data=payload.data
        },
        setCurrentPage:(state,currentPage)=>{
            state.currentPage=currentPage
        },
        setEeachPage:(state,eachPage)=>{
            state.eachPage=eachPage
        }
    },
    getters:{
    },
    actions: { //连接后台接口backend api
        // addpetsAsync:async ({dispatch},payload)=>{
        //    await addpetsAsync(payload);
        //     dispatch("getpetsAsnync")
        // },
        getUsersAsnync:async ({commit,state})=>{
            const {data}=await getUsersAsync({
                currentPage:state.currentPage,
                eachPage:state.eachPage
            });
            commit('getUserByPageAsync',data)
        },
        getdeleteAsync:async ({commit,dispatch},payload)=>{
            await getdeleteAsync(payload);
            // commit('getSerByPage',data);
           // dispatch("getUsersAsnync")
        },
      //   revisePetsAsync:async ({commit,dispatch},payload)=>{
      //       const {data}=await revisePetsAsync(payload);
      //       // commit('getSerByPage',data);
      //       dispatch("getpetsAsnync")
      //   },
      loginAsync:async({commit},payload)=>{
         return  await loginAsync(payload)
      },
      isLoginAsync:async({commit},payload)=>{
          return await isLoginAsync()
         
        // console.log(data)
        // return data
      },
      logOut:async({commit})=>{
          return await logOut()
      },
     
    }
}