import { ethers } from 'ethers';
import FastJsonRpcSigner from '../FastJsonRpcSigner';
import store from '../store';

export function init() {
  return function(dispatch) {
    initPromise().then((response) => {}).catch((error) => {});
  }
}

export async function initPromise() {
  if (window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    try {
      await window.ethereum.enable();
    }
    catch (err) {
      console.log(err);
    }
  }
  
  if (typeof window.ethersProvider === "undefined" && typeof window.ethereum !== "undefined") {
    window.ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethersFastSigner = new FastJsonRpcSigner(window.ethersProvider.getSigner());
  }
}

export function getTokenContract() {
  const tokenAddress = "0x8d8df3ec3ca5d0b23f465754830b866238c43b7e";

  const minABI = [
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // transfer
    {
      "constant":false,
      "inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
      "name":"transfer",
      "outputs":[{"name":"","type":"bool"}],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
    },
    // approve
    {
      "constant": false,
      "inputs": [{"name": "_spender","type": "address"},{"name": "_value","type": "uint256"}],
      "name": "approve",
      "outputs": [{"name": "","type": "bool"}],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    // allowance
    {
      "constant": true,
      "inputs": [{"name": "_owner","type": "address"},{"name": "_spender","type": "address"}],
      "name": "allowance",
      "outputs": [{"name": "","type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
  ];

  if (typeof window.tokenContract === "undefined") {
    const baseContract = new ethers.Contract(tokenAddress, minABI, window.ethersProvider);
    window.tokenContract = baseContract.connect(window.ethersFastSigner);
  }

  return window.tokenContract;
}

export function transferToken(unitsToTransfer) {
  return function(dispatch) {
    transferTokenPromise(unitsToTransfer).then((response) => {}).catch((error) => {});
  }
}

export async function transferTokenPromise(unitsToTransfer) {
  const contract = getTokenContract();
  const toAddress = "0x4ccf52796898c8dcda481290e0b2263fca5be78a";
  let receipt = null;

  store.dispatch({
    type: "TX_STATUS",
    payload: "prompt user"
  })

  try {
    const txObj = await contract.transfer(toAddress, unitsToTransfer);

    store.dispatch({
      type: "TX_STATUS",
      payload: "user interacted"
    })

    const hash = txObj ? txObj.hash : "";

    store.dispatch({
      type: "TX_STATUS",
      payload: "has hash"
    })

    receipt = await window.ethersProvider.waitForTransaction(hash);

    store.dispatch({
      type: "TX_STATUS",
      payload: "has receipt"
    })
  }
  catch (err) {
    store.dispatch({
      type: "TX_STATUS",
      payload: "has error"
    })
    console.log(err);
    receipt = null;
  }

  return receipt;
}