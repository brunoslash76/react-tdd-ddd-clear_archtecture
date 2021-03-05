import faker from 'faker'
import {
  testInputStatus,
  testMainError
} from '../support/form-helpers'
import * as Helper from '../support/helpers'
import {
  mockInvalidCredentialsError,
  mockUnexpectedError,
  mockOk
} from '../support/login-mocks'

describe('Private Routes', () => {
  it('Should logout ifsurvey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
