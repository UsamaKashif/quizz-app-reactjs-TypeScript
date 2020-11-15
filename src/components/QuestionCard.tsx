import React from 'react'

import {AnswerObject} from "../App"

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
    question: string
    answers: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNr: number
    totalQuestions: number
}

const useStyles = makeStyles((theme) => ({
    question: {
        textAlign: "center"
    },
    answers: {
        margin: '0 auto',
        width: "50%",
        display: "grid",
        gridTemplateColumns: 'repeat(2, 1fr)',
        rowGap: "15px"
    },
    answer: {
        display: "flex",
        justifyContent: "center"
    }
}))

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    const classes = useStyles();

    return (
        <div>
            <p className={classes.question} dangerouslySetInnerHTML={{ __html: question}} />
            <div className={classes.answers}>
                {answers.map(answer => (
                    <div key={answer} className={classes.answer}>
                        <Button variant="contained"  disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}} />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard
