import * as Http from '../utils/http-mocks'
import * as Helper from '../utils/helpers'

const path = /surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-result')
const mockAccessDeniedError = (): void => Http.mockUnauthorizedError(path)

describe('Survey Result', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account',account)
    })
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.getByTestId('question').should('exist')
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('/surveys/any_id')
    Helper.testUrl('/login')
  })
})
