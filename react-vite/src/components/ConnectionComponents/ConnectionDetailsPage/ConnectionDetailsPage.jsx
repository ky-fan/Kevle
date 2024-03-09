import { useDispatch, useSelector } from 'react-redux'
import './ConnectionDetailsPage.css'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearConnections, thunkDeleteConnection, thunkFetchConnectionById } from '../../../redux/connection'
import { ConnectionBoard } from '../ConnectionBoard/ConnectionBoard'
import { clearComments, thunkFetchConnectionComments } from '../../../redux/comment'
import CommentsIndex from '../../CommentComponents/CommentsIndex/CommentsIndex'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem'
import DeleteConfirmationModal from '../../DeleteConfirmationModal/DeleteConfirmationModal.jsx/DeleteConfimationModal'

export function ConnectionDetailsPage() {
    const { connectionId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.session.user)
    const connection = useSelector(state => state.connections[connectionId])
    const connectionCommentsArr = useSelector(state => Object.values(state.comments)).sort((a, b) => b.id - a.id)

    const isOwner = (parseInt(user?.id) === connection?.userId)

    const [showComments, setShowComments] = useState(false)
    // const [shuffledArr, setShuffledArr] = useState([])

    useEffect(() => {
        dispatch(clearComments())
        dispatch(thunkFetchConnectionComments(connectionId))
        dispatch(thunkFetchConnectionById(connectionId))
    }, [dispatch, connectionId])

    const handleUpdate = (e) => {
        e.preventDefault()
        navigate(`/connections/${connectionId}/update`)
    }

    const handleDelete = (connectionId) => {
        dispatch(thunkDeleteConnection(connectionId)).then(() => {
            dispatch(clearConnections())
            navigate('/connections')
        })
    }

    const toggleComments = e => {
        e.preventDefault()
        setShowComments(!showComments)
    }

    if (!connection) return

    return (
        <div className='connections-details-container'>
            <div className='connections-details-body'>
                <div className='connections-details-header'>
                    <div className='connection-details-info'>
                        <h1>{connection?.title}</h1>

                        <NavLink to={`/users/${connection?.userId}`} className="connections-details-author-link">
                            <p>{connection?.authorName}</p>
                        </NavLink>
                    </div>
                    <div className='connection-details-buttons-container'>
                        {isOwner && <FaRegEdit className='connection-details-button' onClick={handleUpdate} title='Update' />}
                        {isOwner && <OpenModalMenuItem icon={<MdDeleteOutline className='connection-details-button' title='Delete' />} modalComponent={<DeleteConfirmationModal handleDelete={handleDelete} gameId={connectionId} />} />}
                        {/* {isOwner && <MdDeleteOutline className='connection-details-button' onClick={handleDelete} title='Delete' />} */}
                    </div>
                </div>

                <div className='connections-details-game-board'>
                    <ConnectionBoard connection={connection} />
                </div>

            </div>

            <div className='connection-details-comments-container'>
                <div className='connection-details-toggle-comments-button-container'>
                    <button onClick={toggleComments} title='toggleComments'>{showComments ? 'Hide Comments' : 'Show Comments'}</button>
                </div>
                {showComments && <CommentsIndex commentsArr={connectionCommentsArr} connectionId={connectionId} />}
            </div>
        </div>
    )
}
