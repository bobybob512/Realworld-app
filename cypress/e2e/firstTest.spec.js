describe('test with backend', () => {

  beforeEach('login to application', () => {
    cy.loginToApplication()
  })
  it('first test', () => {
    cy.visit('You are logged in')
  })
})