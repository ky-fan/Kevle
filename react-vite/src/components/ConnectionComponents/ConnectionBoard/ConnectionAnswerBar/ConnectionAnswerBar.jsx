import './ConnectionAnswerBar.css'

export function ConnectionAnswerBar({ category }) {

    const categoryColorId = category[0]

    // switch

    return (
        <div className={`connection-answer-bar-container`}>
            <h2>{category[1]} </h2>
            <p>{`${category[2]}, ${category[3]}, ${category[4]}, ${category[5]}`}</p>

        </div>
    )
}

export default ConnectionAnswerBar
