import { memo, useCallback, useState } from "react"

export const QuestionItem = memo(({ question, isEndTimer }) => {
  const [hasGamed, setHasGamed] = useState(false)

  const handleValidate = useCallback(function () {
    setHasGamed(true)
  }, [])

  return (
    <fieldset>
      <legend>
        {question.title} {question.id}
      </legend>
      <ul id="answers">
        {question.answers.map((answer) => (
          <AnswerItem
            key={answer.id}
            answer={answer}
            isEndTimer={isEndTimer}
            hasGamed={hasGamed}
            onClick={handleValidate}
          />
        ))}
      </ul>
    </fieldset>
  )
})

const AnswerItem = memo(({ answer, isEndTimer, hasGamed, onClick }) => {
  const className =
    (isEndTimer || hasGamed) && answer.is_valid ? 'is-valid' : ''

  return (
    <li className={className} key={answer.id} onClick={onClick}>
      {answer.title}
    </li>
  )
})