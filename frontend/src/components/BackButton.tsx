import {useNavigate} from 'react-router-dom'

function BackButton(){
    const navigate = useNavigate()
    return(
        <button className="absolute top-4 left-4" onClick={()=> navigate(-1)}>&larr;</button>
    )
}

export default BackButton