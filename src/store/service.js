import {getSerByPageAsync,upDateServiceAsnync,addServiceAsync,delOneSerAsync} from '../service/service';
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
        getSerByPage:(state,payload)=>{
            Object.assign(state,payload);//payload不能直接覆盖掉state，
            // 会将代理都覆盖掉 Object.assign(state,payload)，
            // 内部是for(let item in 对象)遍历，等同于state.data=payload.data
        },
        setCurPage:(state,currentPage)=>{
            state.currentPage=currentPage
        },
        setEachPage:(state,eachPage)=>{
            state.eachPage=eachPage
        }
    },
    getters:{
    },
    actions: { //连接后台接口backend api
        getSerByPageAsync:async ({commit,state})=>{
           const{data} =await getSerByPageAsync({
                currentPage:state.currentPage,
                eachPage:state.eachPage
            });
           commit('getSerByPage',data)
        },
        // setCurPageTrans:async({commit,dispatch},payload)=>{
        //     commit('setCurPage',payload);
        //     dispatch('getStuByPageAsync');
        // }

        upDateServiceAsnync:async ({commit},payload)=>{
            const {data}=await upDateServiceAsnync(payload);
            commit('getSerByPage',data)
            if(data){
                payload[3].cb("ok")
            }
        },
        addServiceAsync:async ({commit},payload)=>{
            const {data}=await addServiceAsync(payload);
            commit('getSerByPage',data);
            if(data){
                payload[5].cb("ok")
            }
        },
        delOneSer:async({commit},payload)=>{
            const {data}=await delOneSerAsync(payload);
            commit('getSerByPage',data)
            if(data){
                payload[4].cb("ok")
            }
        }
    }
}
