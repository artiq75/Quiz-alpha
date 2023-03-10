import { useEffect, useMemo, useRef, useState } from 'react'
import { QuestionItem } from './components/QuestionItem'
import { useTimer } from './hooks/useTimer'

const DURATION = 1000 * 3

export function App() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isEndGame, setIsEndGame] = useState(false)

  const endTime = useRef(Date.now() + DURATION)

  const { timer: currentTime, stop: stopTimer } = useTimer()

  useEffect(() => {
    fetch('http://localhost:5173/datas.json')
      .then((response) => response.json())
      .then(setQuestions)
      .catch(console.error)
  }, [])

  useEffect(() => {
    endTime.current = Date.now() + DURATION
  }, [currentQuestionIndex])

  const question = useMemo(() => {
    return questions[currentQuestionIndex]
  }, [questions, currentQuestionIndex])

  const isLastQuestion = useMemo(() => {
    return currentQuestionIndex === questions.length - 1
  }, [questions, currentQuestionIndex])

  const timer = useMemo(() => {
    return Math.ceil((endTime.current - currentTime) / 1000)
  }, [currentTime])

  const isEndTimer = useMemo(() => {
    return timer <= 0
  }, [currentTime])

  const handleNextQuestion = function (e) {
    setCurrentQuestionIndex((oldIndex) => oldIndex + 1)
  }

  const handleEndGame = function (e) {
    setIsEndGame(true)
    stopTimer()
  }

  return (
    <div className="App">
      {!isEndGame && (
        <>
          <p className="timer">Timer: {timer >= 0 ? timer : 0}</p>

          {question && (
            <QuestionItem question={question} isEndTimer={isEndTimer} />
          )}

          <br />

          {isEndTimer && (
            <>
              {!isLastQuestion && (
                <button onClick={handleNextQuestion}>prochaine question</button>
              )}

              {isLastQuestion && (
                <button onClick={handleEndGame}>afficher les résultats</button>
              )}
            </>
          )}
        </>
      )}

      {isEndGame && <Results />}
    </div>
  )
}

function Results() {
  return (
    <>
      <h1>Fin de la partie</h1>
      <h3>Affichage des résultats</h3>
    </>
  )
}
