import Web3 from 'web3';
import siteConfig from '../config/site.config';
import ABI from '../config/abi.json'
import { getCookie } from '../service/cookie'

const getContractInstance = () => {
  const web3 = new Web3(Web3.givenProvider);
  let res = new web3.eth.Contract(ABI, siteConfig.CONTRACT_ADDRESS);
  return res
}

function api(url, method, headers, body) {
  try {
    return window
      .fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })
      .then(async (response) => {
        const res = await response.json();
        const {data} = res
        if (response.ok) {
          return data;
        } else {
          const error = {
            message: res.message,
          };
          return Promise.reject(error);
        }
      });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

async function apiGet(url) {
  try {
    const res = await api(`${siteConfig.apiUrl}${url}`, "GET");
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiGetToken(url) {
  try {
    const token = getCookie('token')
    if (token) {
      const res = await api(`${siteConfig.apiUrl}${url}`, "GET", {
        authorization: token,
      });
      return Promise.resolve(res);
    }
    else {
      return Promise.reject({ message: "Empty token" });
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiPost(url, data) {
  try {
    const res = await api(
      `${siteConfig.apiUrl}${url}`,
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      JSON.stringify(data)
    );
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiPostToken(url, data) {
  try {
    const token = getCookie("token");
    const res = await api(
      `${siteConfig.apiUrl}${url}`,
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
      JSON.stringify(data)
    );
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiPut(url, data) {
  try {
    const res = await api(
      `${siteConfig.apiUrl}${url}`,
      "PUT",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      JSON.stringify(data)
    );
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiPutToken(url, data) {
  try {
    const token = getCookie("token");
    const res = await api(
      `${siteConfig.apiUrl}${url}`,
      "PUT",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
      JSON.stringify(data)
    );
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiDelete(url, data) {
  try {
    const res = await api(
      `${siteConfig.apiUrl}${url}`,
      "DELETE",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      JSON.stringify(data)
    );
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function apiDeleteToken(url, data) {
  try {
    const token = getCookie("token");
    const res = await api(
      `${siteConfig.apiUrl}${url}`,
      "DELETE",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token,
      },
      JSON.stringify(data)
    );
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  getContractInstance,
  api,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiGetToken,
  apiPostToken,
  apiPutToken,
  apiDeleteToken,
};