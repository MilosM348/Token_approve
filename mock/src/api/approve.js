import { apiPost, apiPut } from './index'

async function create(data) {
  try {
    await apiPost(`/api/approve`, data)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await apiPut(`/api/approve/${data._id}`, data)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getFilter(data) {
  try {
    let res = await apiPost(`/api/approve/filter`, data)
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  getFilter,
}