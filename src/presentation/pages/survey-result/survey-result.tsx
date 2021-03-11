import React, { useState, useEffect } from 'react'
import { LoadSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import Styles from './survey-result-styles.scss'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const hadleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const reload = (): void => setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(hadleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload}/>}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
