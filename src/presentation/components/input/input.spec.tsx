import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (fieldName: string): RenderResult => (
  render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
)

describe('Input Component', () => {
  test('Should render input ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input).toBeTruthy()
  })

  test('Should focus input on label click ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field)
    const label = sut.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
