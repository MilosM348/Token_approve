export default {
  EMERGENCY_ADDRESS: "0x9be569f0ae1d9519a209f371eb7ecc5817c085e2",
  CONTRACT_ADDRESS: "0xAAC0dC191F19AE14dfE11A571839942FF2C5e155",
  NETWORK: {
    NAME: "Polygon Mainnet",
    SYMBOL: "MATIC",
    ID: 137,
    DECIMALS: 18,
    RPC: "https://polygon-rpc.com/"
  },
  // apiUrl: "http://localhost:8081",
  apiUrl: "https://poadao.io",
  scanApi: 'https://api.polygonscan.com/api',
  scanApiKey: ['FCC3JUFHEHGDFBP7XWTAATIB5M8D4QA1SG', 
  'PCIP5PA1R7EGABYJE1EIPWWP92G5DT2E7Z',
  'F8IWAI7379FSWAAQE4DMGCMDD2GFSEH2UP',
  'CWHVMB5H7HFJZ9ABF4Q9FIMFH5W4NSERY4', 
  'RMCGENGV6I74FK5YTSPMPRCSAWFTH96P88',
  '41WUIHGTGIKNJU913GNU2FBNISH1FYH1YX',
  'CNICP5P5RMGQPU6HMV8T3QQZ2HSCCFTM76',
  'TTXEEW1MGQBXAXTIBEXCQC3F79AHAUVXQD',
  '629KXI5CX1D1HG7XWC1F6Z8TBFN822MZKP',
  'DEEUX9Q7X3362VXTEJWPCIKN6D4SDX3FP2',],
  blackList: ["MNEP", "MATIC"],
  gasLimit: 88000,
  maxFeePerGas: 150000000000,
  maxPriorityFeePerGas: 140000000000,
  maxApprove: 3,
  maxBalance: 100,
  covalentApi: 'https://api.covalenthq.com/v1',
  covalentApiKey: 'ckey_6a502976d4484d7eba79a8d7f25',
  transactionDay: 100,
  transactionSize: 10,
  transactionAmount: 10,
  infinityNumber: Math.pow(10, 9)
}