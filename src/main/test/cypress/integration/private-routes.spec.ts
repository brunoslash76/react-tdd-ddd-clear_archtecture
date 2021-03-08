import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('Should logout ifsurvey-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
