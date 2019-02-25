import {request,getData,getFormData} from './request';
export  const   getShopsBypage=({start=1,count=10,name="",value="",userID=''}={})=> {
  return  request(`/store/list?start=${start}&count=${count}&name=${name}&value=${value}&userID=${userID}`);
}
export const getShopAddress=(queryString)=>{
  return request(`/store/getAddress?storeAddress=${queryString}`)
}
 export const getShopDelete=(_id)=>{
   return getData('/store/delete',_id)
 }
export const  getPhoto=async(formData)=>{
  
   return  await getFormData('https://upload-z2.qiniup.com',formData)
  
       //return formData.get("avatar")
        
 // return getFormData('/upload',formData)
}
export const updateAsync=(data)=>{
  return getData('/store/update',data)
}
export const getAllSearch=(data)=>{
  //getData('/https://upload-z2.qiniup.com',for)
  return getData('/store/search',data)
}
export const getToken=()=>{
return request('/token')}
export const storeAdd=(data)=>{
  console.log(data)
 return getData('/store/add',data)
}
export const getAllmarkes=()=>{
 // return request('')
}
export const storeNoListAsync=({start=1,count=10,name="",value=""}={})=>{
  return request(`/store/storeNoList?start=${start}&count=${count}`)
}
export const getAddressAsync=(data)=>{
  return  getData('/store/storeAddress',data)
}  
export const IsUpdate=(data)=>{
  return getData('/store/Isupdate',data)
}
// export const weather=()=>{
//   return getFormData(`http://i.tianqi.com/index.php?c=code&id=1&icon=1&py=chengdu&wind=0&num=1&site=14`)
// }