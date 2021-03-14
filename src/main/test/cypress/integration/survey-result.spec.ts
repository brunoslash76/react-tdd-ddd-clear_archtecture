import * as Http from '../utils/http-mocks'
import * as Helper from '../utils/helpers'

const path = /surveys/
const mockLoadSuccess = (): void => Http.mockOk(path, 'GET', 'fx:survey-result')

describe('Survey Result', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account',account)
    })
  })
  describe('loading', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
    const mockAccessDeniedError = (): void => Http.mockUnauthorizedError(path)

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
      mockLoadSuccess()
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
    })

    it('Should logout on AccessDeniedError', () => {
      mockAccessDeniedError()
      cy.visit('/surveys/any_id')
      Helper.testUrl('/login')
    })

    it('Should present survey result', () => {
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question 1')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2018')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '70%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
    })

    it('Should goto SurveyList on back button click', () => {
      mockLoadSuccess()
      cy.visit('')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helper.testUrl('/')
    })
  })

  describe('save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path, 'PUT')
    const mockAccessDeniedError = (): void => Http.mockUnauthorizedError(path)

    beforeEach(() => {
      cy.fixture('account').then(account => {
        Helper.setLocalStorageItem('account',account)
      })
      mockLoadSuccess()
      cy.visit('/surveys/any_id')
    })

    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente')
    })
  })
})
