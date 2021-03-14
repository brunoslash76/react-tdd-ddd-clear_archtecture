
import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { signupState } from './atoms'
import { useRecoilState } from 'recoil'

type Props = {
  text: string
}

const Input: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(signupState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default Input
