import { async } from "q";
import {getAddressAsync} from '../service/shop'
import { stat } from "fs";
import store from "../store";
export default {//创建仓库
    namespaced:true,
    state: {
        // currentPage:1,//当前页
        // eachPage:5,//每页显示条数
        // totalPage:1,//总页数
        count:0,//总条数
        marker:[]//数据
    },
    mutations: {//同步更新
        getAddress:(state,paylocd)=>{
           
            state.count=paylocd.count
            // state.markers=paylocd.markers.storePosition
            // for(let i in paylocd.markers){
            //    //console.log(paylocd.markers[i].storePosition)
            //    state.marker.push(paylocd.markers[i].storePosition)
               
            // }
            Object.assign(state.marker,paylocd.markers)
          
           
            console.log(state)
        }
    },
    actions: { //连接后台接口backend api
        getAddressAsync:async ({commit,state},paylocd)=>{
            let userID=JSON.parse(localStorage.getItem('user'))[0]._id
            // console.log(userID,paylocd)
           let {data}=await getAddressAsync({
                userID,
                value:paylocd
             });
            //  console.log(data)
             commit("getAddress",data)
            // console.log(data)
           //  commit('getUserByPageAsync',data)
         },
    }
}