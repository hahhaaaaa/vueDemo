import request from '../utils/request';

export function getSerByPageAsync({currentPage=1,eachPage=5}={}) {
  return request(`serviceRou/getServiceBypage?currentPage=${currentPage}&eachPage=${eachPage}`)
}
export function addStudentAsync({name='zhansan',age='10',gender='123',phone='12312312311'}={}){
  return request('/api/students/addstudents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({name,age,gender,phone}),
  })
}

export function delOneSerAsync(payload){
  return request('serviceRou/delOneSer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload),
  })
}
export function upDateServiceAsnync(payload){
  return request('serviceRou/upDateService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload),
  })
}
export function addServiceAsync(payload){
  return request('serviceRou/addService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload),
  })
}

