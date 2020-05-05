describe('Logs out user and redirects to login page', function () {
  //Arrange
  it('Visits the Allay site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });
  it('should navigate to Dashboard after login', function () {
    // select element and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('[data-cy=loginSubmit]').as('loginSubmit');
    // interact with element
    cy.get('@emailText').type('testing123@gmail.com');
    cy.get('@passwordText').type('password');
    cy.get('@loginSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
  it('Opens the hamburger menu and logs out', function () {
    // click hamburger button
    cy.get('[data-cy=hamburger]').click();
    // logout upon button click and redirects to login page
    cy.get('[data-cy=signOut]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
