import './Detail.css';
import React, {useState} from 'react'

const Detail = ({categorie, setCategorie, setModified}) => {
    const [Id, setId] = useState(0);

    const changeValue = (value) => {
        if ((Id > 0 && value === -1) || (Id < 3 && value === +1)){
            setId(Id + value);
            setCategorie(Id + value);
            setModified(1);
        }
    }
    return(
        <>
            <div className="lineaire">
                <p>{categorie}</p>
                <button onClick={() => changeValue(-1)}> - </button>
                <p>{Id + 1}</p>
                <button onClick={() => changeValue(+1)}> + </button>
            </div>
        </>
    )
}

export default Detail;