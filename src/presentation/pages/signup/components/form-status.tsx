
import React from 'react'
import { FormStatusBase } from '@/presentation/components'
import { signupState } from './atoms'
import { useRecoilValue } from 'recoil'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signupState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
