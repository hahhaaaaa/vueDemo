import {request,getData,getFormData} from './request';
export  const   getShopsBypage=({start=1,count=10,name="",value=""}={})=> {
  return  request(`/store/list?start=${start}&count=${count}&name=${name}&value=${value}`);
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