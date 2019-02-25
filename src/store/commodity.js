import {addCommodity,getCommodity,removeCommodity,updataCommodity,getkind} from '../service/commodity'
import { async } from 'q';

export default{
    namespaced:true,
    state:{
        pageSize:1,
        eachPage:5,
        totalPage:0,
        count:0,
        data:[],
        updata:[],
    },
    mutations:{
      getCommodityByPage:(state,payload)=>{
        Object.assign(state,payload)
      },
      setPage:(state,payload)=>{
         state.pageSize = payload
           
      },
      setEach:(state,payload)=>{
        state.eachPage = payload
    }
    },
    actions:{
      getCommodityByPageAsync: async ({commit,state},payload)=>{

        const {data} = await getCommodity({
            pageSize:state.pageSize,
            eachPage:state.eachPage,
            userID:payload
        })
        commit('getCommodityByPage',data)
     },
      addCommodity: async ({dispatch},payload)=>{
         await addCommodity(payload)
      },
      removeCommodity:async ({dispatch},payload)=>{
         await removeCommodity(payload)
         dispatch('getCommodityByPageAsync')
      },
      updataCommodityAsync:async ({dispatch},payload)=>{
        await updataCommodity(payload)
        dispatch('getCommodityByPageAsync')
      },
      getKindAsync:async({dispatch},payload)=>{
         return await getkind();
      }
    }
}