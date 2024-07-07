describe('test with backend', () => {

  beforeEach('login to application', () => {
    cy.loginToApplication()
  })

  it.only('verify correct request and response', () => {
    
    cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')

    cy.contains(' New Article ').click()
    cy.get('[placeholder="Article Title"]').type('Test title')
    cy.get('[placeholder="What\'s this article about?"]').type('This is the body')
    cy.get('[placeholder="Write your article (in markdown)"]').type('This is my test')
    cy.get('.btn').click()

    cy.wait('@postArticles').then(xhr => {
      console.log(xhr)
      expect(xhr.response.statusCode).to.equal(201)
      expect(xhr.response.body.article.body).to.equal('This is my test')
      expect(xhr.response.body.article.description).to.equal('This is the body')
    })
  })
})