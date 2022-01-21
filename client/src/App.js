import WalletCardEthers from'./components/WalletCardEthers/WalletCardEthers';
import {ethers} from 'ethers';
import NTFFoot from './artifacts/contracts/NTFFoot.sol/NTFFoot.json';
import { useEffect, useRef, useState } from 'react';
import Detail from './components/Detail/Detail';
import mergeImages from 'merge-images';
import './App.css'
import {generateName} from './lib/name';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, NTFFoot.abi, signer);


function App() {
  const [user, setUser] = useState(null);
  const [hairsId, setHairs] = useState(0);
  const [eyesId, setEyes] = useState(0);
  const [noseId, setNose] = useState(0);
  const [mouthId, setMouth] = useState(0);
  const [identity, setIdentity] = useState("");

  const face = useRef();
  const hairs = useRef();
  const eyes = useRef();
  const nose = useRef();
  const mouth = useRef();
  const final = useRef();

  useEffect(() => {
    console.log(contract);
  }, [user])

  const createNft = async () => {
    const base64 = await mergeImages([face.current.src, hairs.current.src, eyes.current.src, nose.current.src, mouth.current.src])
    final.current.src = base64;
    setIdentity(generateName());
  }

  return (
    <div className="App">
      <WalletCardEthers setUser={setUser} />
      <div className='characters-builder-container'>
        <div className='characters-builder'>
          <div className='img-container'>
            <img ref={face} src="images/face.png" />
            <img ref={hairs} src={`images/hairs/${hairsId}.png`} />
            <img ref={eyes} src={`images/eyes/${eyesId}.png`} />
            <img ref={nose} src={`images/nose/${noseId}.png`} />
            <img ref={mouth} src={`images/mouth/${mouthId}.png`} />
          </div>
          <div>
            <Detail categorie="hairs" setCategorie={setHairs} />
            <Detail categorie="eyes" setCategorie={setEyes}/>
            <Detail categorie="nose" setCategorie={setNose}/>
            <Detail categorie="mouth" setCategorie={setMouth}/>
          </div>
        </div>
        <button onClick={createNft}>Get this one</button>
        {identity}
        <img ref={final} />
      </div>
    </div>
  );
}

export default App;