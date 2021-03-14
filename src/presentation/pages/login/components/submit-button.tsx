
import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'
import { loginState } from './atoms'
import { useRecoilState } from 'recoil'

type Props = {
  text: string
}

const Input: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(loginState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export default Input
