import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { uiOpenModal } from '../../actions/ui'
import { useDispatch } from 'react-redux'

export const AddNewFab = () => {

    const dispatch = useDispatch()
    
    const handleClickNew = () => {
        dispatch(uiOpenModal())
    }
    
    return (
        <button
            className="btn"
            //onClick={console.log('object')}
        >
             <FontAwesomeIcon 
                className= "text-primary fab"
                icon={faPlusCircle} 
                onClick={handleClickNew}
                />
        </button>
    )
}
