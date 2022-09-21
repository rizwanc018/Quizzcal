import { useState, useEffect } from "react"
import "./style.css"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"

export default function App() {
    const [showStartpage, setShowStartpage] = useState(true)
    const [questions, setQuestions] = useState([])
    const [showAnswers, setShowAnswers] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [api, setApi] = useState("https://opentdb.com/api.php?amount=5")

    function startQuiz(query) {
        query.category !== "any" && setApi(prev => (prev = prev + `&category=${query.category}`))
        query.difficulty !== "any" && setApi(prev => (prev = prev + `&difficulty=${query.difficulty}`))
        query.type !== "any" && setApi(prev => (prev = prev + `&type=${query.type}`))
        setShowStartpage(false)
    }

    function selectedAnswer(qstnId, optionId) {
        setQuestions((prev) => {
            return (prev.map((qstn, id) => {
                if (id === qstnId) {
                    return ({ ...qstn, selected_answer: optionId })
                } else {
                    return qstn
                }
            }))
        })
    }

    useEffect(() => {
        // setShowAnswers(true)
        let count = 0
        questions.forEach(qstn => {
            qstn.selected_answer !== null &&
                qstn.choices[qstn.selected_answer] === qstn.correct_answer &&
                count++
        })
        setCorrectAnswers(count)
    }, [questions])


    function checkAnswer() {
        setShowAnswers(true)
    }

    function playAgain() {
        setShowStartpage(true)
        setShowAnswers(false)
        setQuestions([])
        setApi("https://opentdb.com/api.php?amount=5")
    }


    useEffect(function () {
        if (showStartpage === false) {
            fetch(api)
                .then(res => res.json())
                .then(data => setQuestions(data.results.map((qstn => {
                    return ({
                        question: qstn.question,
                        choices: qstn.incorrect_answers
                            .concat([qstn.correct_answer])
                            .sort()
                            .reverse(),
                        correct_answer: qstn.correct_answer,
                        selected_answer: null,

                    })
                }))))
        }
    }, [api,showStartpage])

    const quizQuestions = questions.map((qstn, i) => {
        return (
            < QuizPage
                key={i}
                id={i}
                qstn={qstn}
                selectedAnswer={selectedAnswer}
                showAnswers={showAnswers}
            />
        )
    })

    return (
        <>
            {showStartpage && <StartPage start={startQuiz} />}
            {!showStartpage && quizQuestions}
            {!showStartpage && !showAnswers && <div className="checkAnswer-container">
                <button
                    className="action-button checkAnswer"
                    onClick={checkAnswer}
                >
                    Check Answer
                </button>
            </div>}
            {showAnswers &&
                <div className="after-game">
                    <div className="score">
                        <div className="score-bar">
                            <div style={{flex: correctAnswers}}className="correct"></div>
                            <div style={{flex: 5 - correctAnswers}}className="wrong"></div>
                        </div>
                        <h3 className="score-board">You scored {correctAnswers}/5 correct answers</h3>
                    </div>
                    <button className="action-button"
                        onClick={playAgain}
                    >
                        Play again
                    </button>
                </div>
            }
        </>
    )
}