import logo from './logo.svg';
import './App.css';
import WalletCardEthers from'./WalletCardEthers';
import {ethers} from 'ethers';
import NTFFoot from './artifacts/contracts/NTFFoot.sol/NTFFoot.json';
import { useEffect, useState } from 'react';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, NTFFoot.abi, signer);

function App() {
  const [value, setValue] = useState(0);

  const changeValue = async () => {
    await contract.store(12);
  }

  useEffect(async () => {
    console.log(contract);
    const number = await contract.retrieve();
    setValue(parseInt(number._hex, 16));
  }, [])

  return (
    <div className="App">
      <WalletCardEthers />
      <button onClick={changeValue}>change value to 12</button>
      {value}
    </div>
  );
}

export default App;