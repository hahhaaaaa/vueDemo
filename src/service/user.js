import {getData,request} from './request';


 export const loginAsync=(data)=>{
   return getData('/users/login',data)
 }
 export const getUsersAsync=({currentPage=1,eachPage=5}={})=>{
  return request(`/users/getUserBypage?currentPage=${currentPage}&eachPage=${eachPage}`)
 }
 export const getdeleteAsync=(_id)=>{
  return getData('/users/delete',_id)
 }
 export const isLoginAsync=()=>{
   return request(`/users/isLogin`)
 }
 export const logOut=()=>{
   return request(`users/logout`)
 }
 