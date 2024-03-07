import { useDispatch, useSelector } from 'react-redux'
import './ConnectionDetailsPage.css'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearConnections, thunkDeleteConnection, thunkFetchConnectionById } from '../../../redux/connection'
import { ConnectionBoard } from '../ConnectionBoard/ConnectionBoard'
import { clearComments, thunkFetchConnectionComments } from '../../../redux/comment'
import CommentsIndex from '../../CommentComponents/CommentsIndex/CommentsIndex'


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

    // Fetch comments thunk must go first (not sure why)
    useEffect(() => {
        dispatch(clearComments())
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

    // function shuffle(arr) {
    //     if (arr) {
    //         const returnArr = arr.slice(0)
    //         for (let i = returnArr.length - 1; i > 0; i--) {
    //             let j = Math.floor(Math.random() * (i + 1))
    //             let temp = returnArr[i]
    //             returnArr[i] = returnArr[j]
    //             returnArr[j] = temp
    //         }
    //         return returnArr
    //     }
    // }

    // useEffect(() => {
    //     setShuffledArr(shuffle(connection.answers))
    // }, [connection])




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

            <div className='connection-details-toggle-comments-button-container'>
                <button onClick={toggleComments} title='toggleComments'>{showComments ? 'Hide Comments' : 'Show Comments'}</button>
            </div>

            <div className='.connection-details-comments-container'>
                {showComments && <CommentsIndex commentsArr={connectionCommentsArr} connectionId={connectionId} />}
            </div>
        </div>
    )
}
