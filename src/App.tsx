import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions} from "./Api"
import {QuestionsState, Difficulty} from "./Api"


import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)

  }

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 0,
      margin: '0 auto'
    },
    title:{
      textAlign: "center"
    },
    startBtn: {
      widtj: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "15px"
    },
    header: {
      display: "flex",
      justifyContent: 'center'
    },
    score: {
      width: "170px",
      height: "40px",
      marginRight: "5px"
    },
    ques: {
      width: "170px",
      height: "40px",
      marginLeft: '5px'
    },
    s: {
      textAlign:"center",
      alignSelf:"center",
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    },
    q: {
      textAlign:"center",
      alignSelf:"center",
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    },
    nextBtn: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px"
    },
    loading: {
      textAlign: "center",
      color: "red"
    }
  }))

  const checkAnswer= (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      // users answer
      const answer = e.currentTarget.value
      const correct  = questions[number].correct_answer === answer
      if (correct){
        setScore(prev => prev + 1)
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion == TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <h1 className={classes.title}>Simple Quiz App</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <div className={classes.startBtn}>
          <Button variant="contained" color="primary" className="start" onClick={startTrivia}>Start</Button>
        </div>

      ) : null}


      {!gameOver ? 

      <div className={classes.header}>
        <Card className={classes.score}>
          <Typography className={classes.s}>Score: {score} </Typography> 
        </Card>

        <Card className={classes.ques}>
          <Typography className={classes.q}>Question: {number + 1} / {TOTAL_QUESTIONS} </Typography>
        </Card>
      </div>
      : null}

      {loading ? 
        <div className={classes.loading}>
          <h3 style={{fontSize: "25px"}}>Loading Questions</h3> 
        </div>
        : null}

      {!loading && !gameOver && (
          <QuestionCard 
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
        />
      ) }
      
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <div className={classes.nextBtn}>
            <Button variant="contained" color="primary" className="next" onClick={nextQuestion}>Next Question</Button>
        </div>
      ) : null}
    </Container>
  );
}

export default App;
