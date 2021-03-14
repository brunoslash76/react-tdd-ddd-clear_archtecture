
import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { loginState } from './atoms'
import { useRecoilValue } from 'recoil'

type Props = {
  text: string
}

const Input: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default Input
