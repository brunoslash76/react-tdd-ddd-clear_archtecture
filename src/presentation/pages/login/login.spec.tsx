import React from 'react'
import Login from './login'
import { render, RenderResult } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return { sut }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailInput = sut.getByTestId('email-status')
    expect(emailInput.title).toBe('Campo obrigatório')
    expect(emailInput.textContent).toBe('🔴')
    const passwordInput = sut.getByTestId('password-status')
    expect(passwordInput.title).toBe('Campo obrigatório')
    expect(passwordInput.textContent).toBe('🔴')
  })
})
