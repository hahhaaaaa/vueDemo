import request from '../utils/request'



export function addCommodity(data) {
   var addcommodity = {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
   }
   return request('/products/addcommodity',addcommodity)
}




export function getCommodity({
   pageSize = 1,
   eachPage = 5,
   userID
} = {}) {
   return request(`/products/getCommodity?pageSize=${pageSize}&eachPage=${eachPage}&userID=${userID}`);
}


export function removeCommodity(id) {
   return request(`/products/removeCommodity?_id=${id}`);
}


export function updataCommodity(data) {
   console.log(data)
   var uodatacommodity = {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
   }
   return request('/products/updataCommodity',uodatacommodity)
}