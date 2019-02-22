import request from '../utils/request'


export function getpetsAsync({currentPage=1,eachPage=5,userID}={}){
    return request(`pets/getPetsBypage?currentPage=${currentPage}&eachPage=${eachPage}&userID=${userID}`)
}

export function getdeleteAsync(id){
  return request(`pets/getdelete?_id=${id}`)
}

export function getfindPetAsync({userID}){
  return request(`store/findPet?userID=${userID}`)
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