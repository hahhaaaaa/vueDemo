import request from '../utils/request'


export function getpetsAsync({currentPage=1,eachPage=5}={}){
    return request(`pets/getPetsBypage?currentPage=${currentPage}&eachPage=${eachPage}`)
}

export function getdeleteAsync(id){
  return request(`pets/getdelete?_id=${id}`)
}


export function addpetsAsync(data){
    return request('pets/addPets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data),
    })
}


export function revisePetsAsync(data){
  return request('pets/revisePets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data),
  })
}