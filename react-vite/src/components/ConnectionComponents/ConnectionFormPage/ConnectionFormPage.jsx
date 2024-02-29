import { useNavigate, useParams } from 'react-router-dom'
import './ConnectionFormPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { thunkCreateConnection, thunkFetchConnectionById, thunkUpdateConnection } from '../../../redux/connection'

export function ConnectionFormPage() {
    const { connectionId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")
    const [category3, setCategory3] = useState("")
    const [category4, setCategory4] = useState("")
    const [answers1, setAnswers1] = useState("")
    const [answers2, setAnswers2] = useState("")
    const [answers3, setAnswers3] = useState("")
    const [answers4, setAnswers4] = useState("")

    // const [isUpdate, setIsUpdate] = useState(false)
    // const [hasSubmitted, setHasSubmitted] = useState(false)
    const [valErrors, setValErrors] = useState({})
    const currentUser = useSelector(state => state.session['user'])

    useEffect(() => {
        if (connectionId) {
            // setIsUpdate(true)
            dispatch(thunkFetchConnectionById(connectionId)).then((oldConnection) => {
                if (!(currentUser.id === oldConnection.userId)) navigate('/connections')
                setTitle(oldConnection.title)
                setCategory1(oldConnection.categories[0])
                setAnswers1(oldConnection.answers.slice(0, 4).join(','))

                setCategory2(oldConnection.categories[1])
                setAnswers2(oldConnection.answers.slice(4, 8).join(','))

                setCategory3(oldConnection.categories[2])
                setAnswers3(oldConnection.answers.slice(8, 12).join(','))

                setCategory4(oldConnection.categories[3])
                setAnswers4(oldConnection.answers.slice(12, 16).join(','))
            })
        }
    }, [dispatch, navigate, currentUser, connectionId])

    useEffect(() => {
        if (!currentUser) navigate('/connections')
    }, [navigate, currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setHasSubmitted(false)

        const errObj = {}
        if (title.length >= 50) errObj.title = "Title must be less than 50 characters"
        if (category1.length >= 50) errObj.category1 = "First category must be less than 30 characters"
        if (category2.length >= 50) errObj.category2 = "Second category must be less than 30 characters"
        if (category3.length >= 50) errObj.category3 = "Third category must be less than 30 characters"
        if (category4.length >= 50) errObj.category4 = "Fourth category must be less than 30 characters"

        const answer1Arr = answers1.split(',')
        if (answer1Arr.length !== 4) errObj.answer1Length = "The required 4 answers must be separated by commas"
        for (let answer of answer1Arr) {
            if (answer.length >= 16) errObj.answer1 = "All answers must be less than 16 characters"
        }

        const answer2Arr = answers2.split(',')
        if (answer2Arr.length !== 4) errObj.answer2Length = "The required 4 answers must be separated by commas"
        for (let answer of answer2Arr) {
            if (answer.length >= 16) errObj.answer2 = "All answers must be less than 16 characters"
        }

        const answer3Arr = answers3.split(',')
        if (answer3Arr.length !== 4) errObj.answer3Length = "The required 4 answers must be separated by commas"
        for (let answer of answer3Arr) {
            if (answer.length >= 16) errObj.answer3 = "All answers must be less than 16 characters"
        }

        const answer4Arr = answers4.split(',')
        if (answer4Arr.length !== 4) errObj.answer4Length = "The required 4 answers must be separated by commas"
        for (let answer of answer4Arr) {
            if (answer.length >= 16) errObj.answer4 = "All answers must be less than 16 characters"
        }

        const allAnswersArr = answer1Arr.concat(answer2Arr, answer3Arr, answer4Arr)
        if (new Set(allAnswersArr).size !== allAnswersArr.length) errObj.uniqueAnswers = "All answers must be unique"
        console.log(new Set(allAnswersArr), allAnswersArr)

        const allCategoriesArr = [category1, category2, category3, category4]
        if (new Set(allCategoriesArr).size !== allCategoriesArr.length) errObj.uniqueCategories = "All categories must be unique"
        console.log(new Set(allCategoriesArr), allCategoriesArr)

        if (Object.values(errObj).length) {
            setValErrors(errObj)
        } else {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('categories', `${category1},${category2},${category3},${category4}`)
            formData.append('answers', `${answers1},${answers2},${answers3},${answers4}`)

            if (connectionId) {
                dispatch(thunkUpdateConnection(connectionId, formData)).then(() => navigate(`/connections/${connectionId}`))
            } else {
                dispatch(thunkCreateConnection(formData)).then(newConnection => navigate(`/connections/${newConnection.id}`))
            }
        }
    }

    return (
        <div>
            <h1>New Connections Game</h1>
            <form onSubmit={handleSubmit}>
                {valErrors.uniqueCategories && <p>{valErrors.uniqueCategories}</p>}
                {valErrors.uniqueAnswers && <p>{valErrors.uniqueAnswers}</p>}
                <div>
                    {valErrors.title && <p>{valErrors.title}</p>}
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    {valErrors.category1 && <p>{valErrors.category1}</p>}
                    <label htmlFor="category1">Category Description</label>
                    <input type="text" id='category1' name='first category' value={category1} onChange={(e) => setCategory1(e.target.value)} required />

                    {valErrors.answer1Length && <p>{valErrors.answer1Length}</p>}
                    {valErrors.answer1 && <p>{valErrors.answer1}</p>}
                    <label htmlFor="answers1">Answers (Comma-separated)</label>
                    <input type="text" id='answers1' name='first category answers' value={answers1} onChange={(e) => setAnswers1(e.target.value)} required />
                </div>

                <div>
                    {valErrors.category2 && <p>{valErrors.category2}</p>}
                    <label htmlFor="category2">Category Description</label>
                    <input type="text" id='category2' name='second category' value={category2} onChange={(e) => setCategory2(e.target.value)} required />

                    {valErrors.answer2Length && <p>{valErrors.answer2Length}</p>}
                    {valErrors.answer2 && <p>{valErrors.answer2}</p>}
                    <label htmlFor="answers2">Answers (Comma-separated)</label>
                    <input type="text" id='answers2' name='second category answers' value={answers2} onChange={(e) => setAnswers2(e.target.value)} required />
                </div>

                <div>
                    {valErrors.category3 && <p>{valErrors.category3}</p>}
                    <label htmlFor="category3">Category Description</label>
                    <input type="text" id='category3' name='third category' value={category3} onChange={(e) => setCategory3(e.target.value)} required />

                    {valErrors.answer3Length && <p>{valErrors.answer3Length}</p>}
                    {valErrors.answer3 && <p>{valErrors.answer3}</p>}
                    <label htmlFor="answers3">Answers (Comma-separated)</label>
                    <input type="text" id='answers3' name='third category answers' value={answers3} onChange={(e) => setAnswers3(e.target.value)} required />
                </div>
                <div>
                    {valErrors.category4 && <p>{valErrors.category4}</p>}
                    <label htmlFor="category4">Category Description</label>
                    <input type="text" id='category4' name='fourth category' value={category4} onChange={(e) => setCategory4(e.target.value)} required />

                    {valErrors.answer4Length && <p>{valErrors.answer4Length}</p>}
                    {valErrors.answer4 && <p>{valErrors.answer4}</p>}
                    <label htmlFor="answers4">Answers (Comma-separated)</label>
                    <input type="text" id='answers4' name='fourth category answers' value={answers4} onChange={(e) => setAnswers4(e.target.value)} required />
                </div>

                <button type='submit'>Generate</button>
            </form>
        </div>
    )
}

export default ConnectionFormPage
