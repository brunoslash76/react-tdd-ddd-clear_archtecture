
import React from 'react'
import { FormStatusBase } from '@/presentation/components'
import { signupState } from './atoms'
import { useRecoilState } from 'recoil'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signupState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
