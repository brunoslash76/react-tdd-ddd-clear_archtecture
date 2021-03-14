import React, { useEffect } from 'react'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import Styles from './survey-result-styles.scss'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const hadleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message, isLoading: false }))
  })
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)
  const onAnswer = (answer: string): void => {
    if (state.isLoading) return
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, surveyResult, isLoading: false })))
      .catch(hadleError)
  }
  const reload = (): void => setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(hadleError)
  }, [state.reload])

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

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
