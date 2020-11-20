import React from 'react'
import Login from './login'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Validation } from '../../protocols/validations'
type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return { sut, validationSpy }
}

describe('Login Component', () => {
  afterEach(cleanup)

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

  test('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })
})
