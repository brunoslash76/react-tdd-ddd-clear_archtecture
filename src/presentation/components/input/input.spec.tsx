import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import faker from 'faker'
import Input from './input'
import { RecoilRoot } from 'recoil'
const makeSut = (fieldName: string): RenderResult => (
  render(
    <RecoilRoot>
      <Input
        name={fieldName}
        state={{}}
        setState={null}
      />
    </RecoilRoot>
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
