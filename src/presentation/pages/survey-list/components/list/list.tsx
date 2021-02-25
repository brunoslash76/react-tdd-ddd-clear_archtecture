import React, { useContext } from 'react'
import { SurveyModel } from '@/domain/models'
import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'
import Styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length > 0
        ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey}/>)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List
