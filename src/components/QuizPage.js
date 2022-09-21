export default function QuizPage(props) {

    function htmlDecode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    function style(option, i) {
        if (props.showAnswers) {
            if (props.qstn.correct_answer === option) {
                return (
                    {
                        backgroundColor: "#94D7A2",
                        border: "none"
                    }
                )
            } else if (props.qstn.selected_answer === i) {
                return (
                    {
                        backgroundColor: "#F8BCBC",
                        border: "none"
                    }
                )
            } else {
                return (
                    {
                        backgroundColor: "#F5F7FB",
                        color: "#4055bfe0",
                        border: "1px solid #4055bf7a"

                    }
                )
            }
        } else {
            return props.qstn.selected_answer === i ?
                {
                    backgroundColor: "#D6DBF5",
                    border: "none"

                }
                : {
                    backgroundColor: "#F5F7FB",

                }
        }
    }

    const options = props.qstn.choices.map((option, i) => {
        return (
            <button
                key={i}
                dangerouslySetInnerHTML={{ __html: htmlDecode(option) }}
                onClick={() => props.selectedAnswer(props.id, i)}
                style={style(option, i)}
                disabled={props.showAnswers}
            />
        )
    });

    return (
        <div className="quizPage">
            <h3>{htmlDecode(props.qstn.question)}</h3>
            <div className="answers">
                {options}
            </div>
        </div>

    )
}