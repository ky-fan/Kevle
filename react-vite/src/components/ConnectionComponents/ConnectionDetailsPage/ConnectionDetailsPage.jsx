import { useDispatch, useSelector } from 'react-redux'
import './ConnectionDetailsPage.css'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearConnections, thunkDeleteConnection, thunkFetchConnectionById } from '../../../redux/connection'
import { ConnectionBoard } from '../ConnectionBoard/ConnectionBoard'
import { thunkFetchConnectionComments } from '../../../redux/comment'
import CommentsIndex from '../../CommentComponents/CommentsIndex/CommentsIndex'


export function ConnectionDetailsPage() {
    const { connectionId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.session.user)
    const connection = useSelector(state => state.connections[connectionId])
    const connectionCommentsArr = useSelector(state => Object.values(state.comments).filter(comment => parseInt(connectionId) === comment.connectionId))

    const isOwner = (parseInt(user?.id) === connection?.userId)

    const [showComments, setShowComments] = useState(false)

    // Fetch comments thunk must go first (not sure why)
    useEffect(() => {
        console.log('useEffect triggered')
        dispatch(thunkFetchConnectionComments(connectionId))
        dispatch(thunkFetchConnectionById(connectionId))
    }, [dispatch, connectionId])

    const handleUpdate = (e) => {
        e.preventDefault()
        navigate(`/connections/${connectionId}/update`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
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
                    <h1>{connection?.title}</h1>

                    <NavLink to={`/users/${connection?.userId}`} className="connections-details-author-link">
                        <p>{connection?.authorName}</p>
                    </NavLink>
                </div>

                <div className='connections-details-game-board'>
                    <ConnectionBoard connection={connection} />
                </div>

                {isOwner && <button onClick={handleUpdate} title='Update'>Update</button>}
                {isOwner && <button onClick={handleDelete} title='Delete'>Delete</button>}
            </div>

            <div>
                {showComments && <button onClick={toggleComments}>Hide Comments</button>}
                {!showComments && <button onClick={toggleComments} title='showComments'>Show Comments</button>}
                {showComments && <CommentsIndex commentsArr={connectionCommentsArr} />}
            </div>
        </div>
    )
}
