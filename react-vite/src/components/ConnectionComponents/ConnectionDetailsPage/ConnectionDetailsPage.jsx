import { useDispatch, useSelector } from 'react-redux'
import './ConnectionDetailsPage.css'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { clearConnections, thunkDeleteConnection, thunkFetchConnectionById } from '../../../redux/connection'
import { ConnectionBoard } from '../ConnectionBoard/ConnectionBoard'


export function ConnectionDetailsPage() {
    const { connectionId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state => state.session.user)
    const connection = useSelector(state => state.connections[connectionId])

    const isOwner = (parseInt(user?.id) === connection?.userId)

    useEffect(() => {
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

    const categoryArr = connection?.categories
    const answerArr = connection?.answers

    const category1Answers = answerArr?.slice(0, 4)
    const category2Answers = answerArr?.slice(4, 8)
    const category3Answers = answerArr?.slice(8, 12)
    const category4Answers = answerArr?.slice(12, 16)

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

                {/* <div>
                    <p>Category 1 is {categoryArr && categoryArr[0]}</p>
                    <p>Answers are: {category1Answers?.map(answer => <p key={answer}>{answer}</p>)}</p>
                </div>
                <div>
                    <p>Category 2 is {categoryArr && categoryArr[1]}</p>
                    <p>Answers are: {category2Answers?.map(answer => <p key={answer}>{answer}</p>)}</p>
                </div>
                <div>
                    <p>Category 3 is {categoryArr && categoryArr[2]}</p>
                    <p>Answers are: {category3Answers?.map(answer => <p key={answer}>{answer}</p>)}</p>
                </div>
                <div>
                    <p>Category 4 is {categoryArr && categoryArr[3]}</p>
                    <p>Answers are: {category4Answers?.map(answer => <p key={answer}>{answer}</p>)}</p>
                </div> */}

                {isOwner && <button onClick={handleUpdate} title='Update'>Update</button>}
                {isOwner && <button onClick={handleDelete} title='Delete'>Delete</button>}
            </div>
        </div>
    )
}
