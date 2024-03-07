import './ConnectionAnswerBar.css'

export function ConnectionAnswerBar({ category }) {

    // Takes in [categoryNumber, category, answer1, answer2, answer3, answer4]
    const categoryColorId = category[0]
    let categoryColor = ""

    switch (categoryColorId) {
        case 1: {
            categoryColor = "yellow-answer-bar"
            break
        }
        case 2: {
            categoryColor = "green-answer-bar"
            break
        }
        case 3: {
            categoryColor = "cyan-answer-bar"
            break
        }
        case 4: {
            categoryColor = "pink-answer-bar"
            break
        }
        default:
            break
    }

    return (
        <div className={`connection-answer-bar-container`} id={categoryColor}>
            <div className='connection-answer-bar-tile'>
                <h2>{category[1]?.toUpperCase()} </h2>
                <p>{`${category[2]?.toUpperCase()}, ${category[3]?.toUpperCase()}, ${category[4]?.toUpperCase()}, ${category[5]?.toUpperCase()}`}</p>
            </div>

        </div>
    )
}

export default ConnectionAnswerBar
