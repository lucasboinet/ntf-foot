import logo from './logo.svg';
import './App.css';
import WalletCardEthers from'./WalletCardEthers';
import {ethers} from 'ethers';
import NTFFoot from './artifacts/contracts/NTFFoot.sol/NTFFoot.json';
import { useEffect, useRef, useState } from 'react';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, NTFFoot.abi, signer);

function App() {
  const [value, setValue] = useState(0);
  const contractValue = useRef();

  const changeValue = async () => {
    const newNumber = contractValue.current.value;
    if(newNumber !== value) {
      await contract.store(newNumber);
    }
  }

  const getCurrentValue = async () => {
    const number = await contract.retrieve();
    setValue(parseInt(number._hex, 16));
  }

  useEffect(() => {
    console.log(contract);
    getCurrentValue();
  }, [])

  return (
    <div className="App">
      <WalletCardEthers />
      <input type="number" min="0" placeholder='new number value' ref={contractValue} />
      <button onClick={changeValue}>change value</button>
      <p>Current value : {value}</p>
    </div>
  );
}

export default App;