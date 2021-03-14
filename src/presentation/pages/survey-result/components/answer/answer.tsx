import React from 'react'
import { useRecoilValue } from 'recoil'
import { SurveyResultAnswerModel } from '@/domain/models'
import * as Styles from './answer-styles.scss'
import { onSurveyAnswerState } from '../atoms/atoms'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)
  const activeClassName = answer.isCurrentAccountAnswer ? 'active' : ''
  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains('active')) return
    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
