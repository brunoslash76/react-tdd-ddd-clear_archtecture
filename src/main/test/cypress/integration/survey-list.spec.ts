import faker from 'faker'
import * as Http from '../support/survey-list-mocks'
import * as Helper from '../support/helpers'
import {
  mockInvalidCredentialsError,
  mockUnexpectedError,
  mockOk
} from '../support/login-mocks'

describe('Survey List', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.random.uuid(), name: faker.name.findName() })
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('Should present correct username', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    Http.mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})