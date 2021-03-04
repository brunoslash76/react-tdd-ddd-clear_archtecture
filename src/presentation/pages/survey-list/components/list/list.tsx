import React, { useContext } from 'react'
import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import Styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length > 0
        ? state.surveys.map(
          (survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey}/>
        )
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List
