import { apiDelete, apiGet, apiPost, apiPut } from './index'

async function create(data) {
  try {
    await apiPost(`/api/token`, data)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function update(data) {
  try {
    await apiPut(`/api/token/${data._id}`, data)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function remove(id) {
  try {
    await apiDelete(`/api/token/${id}`)
    return Promise.resolve({message: 'success'})
  } catch(error) {
    return Promise.reject(error)
  }
}

async function get(id) {
  try {
    let res = await apiGet(`/api/token/${id}`)
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

async function getAll() {
  try {
    let res = await apiGet(`/api/token`)
    return Promise.resolve(res)
  } catch(error) {
    return Promise.reject(error)
  }
}

export {
  create,
  update,
  remove,
  get,
  getAll,
}