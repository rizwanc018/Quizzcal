import { useState } from "react"

export default function StartPage(props) {
    const [query, setQuery] = useState(
        {
            category: "any",
            difficulty: "any",
            type: "any"
        }
    )

    function handleChange(event) {
        const { name, value } = event.target
        setQuery(prevQuery => {
            return {
                ...prevQuery,
                [name]: value
            }
        })

    }

    return (
        <div className="startpage-section">
            <h1>Quizzical</h1>
            <p className="quote">Train your Brain</p>
            <div className="quiz-options">
                {/* <form > */}
                <div>
                    <label htmlFor="category">Select Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={query.category}
                        onChange={handleChange}
                    >
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="difficulty">Select Difficulty:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={query.difficulty}
                        onChange={handleChange}
                    >
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="type">Select Type:</label>
                    <select
                        id="type"
                        name="type"
                        value={query.category}
                        onChange={handleChange}
                    >
                        <option value="any">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
            </div>
            <button
                className="action-button start-button"
                onClick={() => props.start(query)}
            >
                Start Quiz</button>
        </div>
    )

}