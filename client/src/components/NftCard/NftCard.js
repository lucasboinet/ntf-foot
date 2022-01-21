import { useEffect, useState } from 'react';
import './NftCard.css';

const NftCard = ({data, actif, setActif}) => {
    const [isActif, setIsActif] = useState(false);

    useEffect(() => {
        setIsActif(data.rang == actif.rang)
    }, [data, actif])
    
    return (
        <div className='nftcard'>
            <div className='ntfcard-img-container'>
                <img src={data.img} />
                {!isActif && <button onClick={() => setActif(data)}>Activate</button>}
            </div>
            <p className={isActif ? 'name actif' : 'name'}>{data.name}</p>
            <div className='spec'>
                <p>Force {data.force}</p>
                <p>Vitesse {data.vitesse}</p>
                <p>Technique {data.technique}</p>
            </div>
        </div>
    )
}

export default NftCard;