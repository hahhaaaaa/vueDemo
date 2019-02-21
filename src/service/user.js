import {getData} from './request';

 export const loginAsync=(data)=>{
   return getData('/users/login',data)
 }