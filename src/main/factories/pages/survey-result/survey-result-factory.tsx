import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteSurveyResult } from '@/main/factories/usecases'
import { useParams } from 'react-router'

type Params = {
  id: any
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<Params>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteSurveyResult(id)}
    />
  )
}
