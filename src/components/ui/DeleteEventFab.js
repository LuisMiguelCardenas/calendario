import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events'

export const DeleteEventFab = () => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        console.log('object')
        dispatch(eventStartDelete())
    }
    return (
        <button 
            className = "btn btn-danger fab-danger"
            onClick = {handleDelete}
            >
            <FontAwesomeIcon icon={faTrash} />
            <span> Borrar evento</span>
        </button>
    )
}
