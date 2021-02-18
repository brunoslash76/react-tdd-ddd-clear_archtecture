import faker from 'faker'
import {
  testHttpCallsCount,
  testInputStatus,
  testLocalStorageItem,
  testMainError,
  testUrl
} from '../support/form-helper'
import {
  mockEmailInUseError,
  mockInvalidData,
  mockUnexpectedError,
  mockOk
} from '../support/signup-mocks'

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(7))
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(7)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('Should load with correct initial state', () => {
    testInputStatus('name', 'Campo obrigatório')
    testInputStatus('email', 'Campo obrigatório')
    testInputStatus('password', 'Campo obrigatório')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('name', 'Valor inválido')
    cy.getByTestId('email').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
    testInputStatus('passwordConfirmation', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    testInputStatus('name')
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    testInputStatus('password')
    cy.getByTestId('passwordConfirmation').focus().type(password)
    testInputStatus('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUse on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    testMainError('Esse e-mail já está em uso')
    testUrl('/signup')
  })

  it('Should present UnexpectedError on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    cy.getByTestId('error-wrap')
    testMainError('Algo de errado aconteceu. Tente novamente')
    testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    mockInvalidData()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente')
    testUrl('/signup')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    testUrl('/')
    testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    mockOk()
    populateFields()
    cy.getByTestId('submit').dblclick()
    testHttpCallsCount(1)
  })
})
