import './Detail.css';
import React, {useState} from 'react'

const Detail = ({categorie}) => {
    const [Id, setId] = useState(0);

    const changeValue = (value) => {
        if ((Id > 0 && value === -1) || (Id < 5 && value === +1)){
            setId(Id + value);
        }
    }
    return(
        <>
            <div className="lineaire">
                <p>{categorie}</p>
                <button onClick={() => changeValue(-1)}> - </button>
                <p>{Id}</p>
                <button onClick={() => changeValue(+1)}> + </button>
            </div>
        </>
    )
}

export default Detail;