import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => (
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name="input" />
    </Context.Provider>
  )
)

describe('Input Component', () => {
  test('Should render input ', () => {
    const sut = makeSut()
    const input = sut.getByTestId('input')
    expect(input).toBeTruthy()
  })
})
