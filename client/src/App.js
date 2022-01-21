import WalletCardEthers from'./components/WalletCardEthers/WalletCardEthers';
import {ethers} from 'ethers';
import NTFFoot from './artifacts/contracts/NTFFoot.sol/NTFFoot.json';
import { useEffect, useRef, useState } from 'react';
import Detail from './components/Detail/Detail';
import mergeImages from 'merge-images';
import './App.css'
import {generateName} from './lib/name';
import NftCard from './components/NftCard/NftCard'

const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, NTFFoot.abi, signer);

function App() {
  const [user, setUser] = useState(null);
  const [modified, setModified] = useState(0);
  const [currentActif, setCurrentActif] = useState(null);

  const [hairsId, setHairs] = useState(0);
  const [eyesId, setEyes] = useState(0);
  const [noseId, setNose] = useState(0);
  const [mouthId, setMouth] = useState(0);
  const [colorId, setColor] = useState(0);

  const [persos, setPersos] = useState([]);

  const face = useRef();
  const hairs = useRef();
  const eyes = useRef();
  const nose = useRef();
  const color = useRef();
  const mouth = useRef();

  useEffect(() => {
    randomizeLook();
  }, [])

  useEffect(async () => {
    let data = await contract.getPersoList();
    setPersos(await setNftImage(data));
  }, [user])

  const createNft = async () => {
    const name = generateName();
    await contract.createPerso(name, hairsId, eyesId, noseId, mouthId, colorId, modified);
  }

  const setNftImage = async (data) => {
    return await new Promise((resolve) => {
      let result= [];
      data.forEach(async elem => {
        const base = 'images/face.png';
        const hairImg = `images/hairs/${elem.idCheveux}.png`;
        const eyesImg = `images/eyes/${elem.idYeux}.png`;
        const noseImg = `images/nose/${elem.idNez}.png`;
        const mouthImg = `images/mouth/${elem.idBouche}.png`;
        const colorImg = `images/colors/${elem.idCouleur}.png`;
        const base64 = await mergeImages([colorImg, base, hairImg, eyesImg, noseImg, mouthImg])
        
        setCurrentActif(await contract.getPersoActive());

        result.push({img: base64, ...elem});
        if(result.length === data.length) {
          resolve(result);
        }
      })
    })
  }

  const setActif = async (elem) => {
    await contract.setPersoActive(elem.rang);
  }

  const randomizeLook = () => {
    const range = 2;

    setHairs(Math.round(Math.random() * range))
    setMouth(Math.round(Math.random() * range))
    setNose(Math.round(Math.random() * range))
    setEyes(Math.round(Math.random() * range))
    setColor(Math.round(Math.random() * range))
    setModified(0);
  }

  return (
    <div className="App">
      <WalletCardEthers setUser={setUser} />
      <div className='characters-builder-container'>
        <div className='characters-builder'>
          <div className='img-container'>
            <img ref={color} src={`images/colors/${colorId}.png`} />
            <img ref={face} src="images/face.png" />
            <img ref={hairs} src={`images/hairs/${hairsId}.png`} />
            <img ref={eyes} src={`images/eyes/${eyesId}.png`} />
            <img ref={nose} src={`images/nose/${noseId}.png`} />
            <img ref={mouth} src={`images/mouth/${mouthId}.png`} />
          </div>
          <div>
            <Detail categorie="hairs" setCategorie={setHairs} setModified={setModified}/>
            <Detail categorie="eyes" setCategorie={setEyes} setModified={setModified}/>
            <Detail categorie="nose" setCategorie={setNose} setModified={setModified}/>
            <Detail categorie="mouth" setCategorie={setMouth} setModified={setModified}/>
            <Detail categorie="color" setCategorie={setColor} setModified={setModified}/>
            <button onClick={randomizeLook}>Randomize</button>
          </div>
        </div>
        <button onClick={createNft}>Get this one</button>
        <h4>Your potatoes NFT: </h4>
        <div className='nftcard-grid'>
          {persos.map((elem, index) => (
            <NftCard key={index} data={elem} actif={currentActif} setActif={setActif} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;