import Web3 from 'web3';

import siteConfig from '../config/site.config';

const connect = async () => {
  const { ethereum } = window;
  if (ethereum) {
    try {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts();
      const networkId = await ethereum.request({
        method: "net_version",
      });
      if (networkId == siteConfig.NETWORK.ID) {
        if (accounts.length !== 0)
          return Promise.resolve({
            message: 'success',
            account: accounts[0]
          })
      }
      else {
        changeNetwork()
        return Promise.reject({message: `Change network to ${siteConfig.NETWORK.NAME}.`})
      }
    }
    catch (error) {
      return Promise.reject({message: "Something went wrong."})
    }
  }
  else {
    return Promise.reject({message: "Install Metamask."})
  }
}

const changeNetwork = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const web3 = new Web3(Web3.givenProvider);
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(siteConfig.NETWORK.ID) }]
      });
    } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Polygon Mainnet',
              chainId: web3.utils.toHex(siteConfig.NETWORK.ID),
              nativeCurrency: { name: siteConfig.NETWORK.NAME, decimals: siteConfig.NETWORK.DECIMALS, symbol: siteConfig.NETWORK.SYMBOL },
              rpcUrls: [siteConfig.NETWORK.RPC]
            }
          ]
        });
      }
    }
  }
  else {
    return Promise.reject({message: "Install Metamask."})
  }
}

export {
  connect,
  changeNetwork
}
