import { useDispatch, useSelector } from 'react-redux'
import './ConnectionDetailsPage.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { thunkFetchConnectionById } from '../../../redux/connection'


export function ConnectionDetailsPage() {
    const { connectionId } = useParams()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const connection = useSelector(state => state.connections[connectionId])

    const isOwner = (parseInt(user?.id === connection?.userId))

    useEffect(() => {
        dispatch(thunkFetchConnectionById(connectionId))
    }, [dispatch, connectionId])

    let categoryArr = connection?.categories
    let answerArr = connection?.answers

    const category1Answers = answerArr?.slice(4)
    const category2Answers = answerArr?.slice(4, 8)
    const category3Answers = answerArr?.slice(8, 12)
    const category4Answers = answerArr?.slice(12, 16)

    return (
        <div className='connection-details-body'>
            <div>
                <p>{connection?.title}</p>
                <p>{connection?.authorName}</p>
            </div>

            <div>
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
            </div>
        </div>
    )
}
