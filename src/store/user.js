import { async, reject } from "q";
import {loginAsync} from '../service/user'

export default{
    namespaced:true,
    state:{
      userName :"",
      password :"",
      name:"",
      userType :'',
      phone : "",
      mail : "",
      picUrl : "",
      createTime: "",
      updateTime: "",
      status : "0"
    },
   
    mutations:{
     
       getUserInfo:(state,[payload])=>{
        state.name=payload.name;
        state.picUrl=payload.picUrl
        //  Object.assign(state,payload)
        // state.userName= payload.userName;
        // state.picUrl=payload.picUrl
       }
    
    },

   


   
    
    actions:{
      loginAsync:async({commit},payload)=>{
         return  await loginAsync(payload)
      },
      
    
}
}