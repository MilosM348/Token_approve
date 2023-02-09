import Web3 from 'web3';

export const hasMethod = async (contractAddress, signature) => {
  const web3 = new Web3(Web3.givenProvider);
  const code = await web3.eth.getCode(contractAddress);
  const functionSignature = web3.eth.abi.encodeFunctionSignature(signature);
  // remove "0x" prefixed in 0x<4bytes-selector>
  return code.indexOf(functionSignature.slice(2, functionSignature.length)) > 0;
}